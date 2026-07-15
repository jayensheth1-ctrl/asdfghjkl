import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';

const LAND_URL =
  'https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_110m_land.geojson';

// Founder hubs (lat/lng) — arc endpoints + interactive hover targets
const HUBS = [
  { name: 'New York', lat: 40.7, lng: -74.0 },
  { name: 'London', lat: 51.5, lng: -0.1 },
  { name: 'Tokyo', lat: 35.7, lng: 139.7 },
  { name: 'Cape Town', lat: -33.9, lng: 18.4 },
  { name: 'Delhi', lat: 28.6, lng: 77.2 },
  { name: 'Singapore', lat: 1.3, lng: 103.8 },
  { name: 'São Paulo', lat: -23.5, lng: -46.6 },
  { name: 'Sydney', lat: -33.9, lng: 151.2 },
];

// Arcs in varied brand tones: bright green, amber/cream, deep green, lime
const ARCS = [
  { a: 0, b: 1, color: 0x4ade80 },
  { a: 1, b: 4, color: 0x22d67f },
  { a: 0, b: 6, color: 0x0fa968 },
  { a: 5, b: 7, color: 0xa3e635 },
  { a: 3, b: 1, color: 0x4ade80 },
  { a: 4, b: 5, color: 0x22d67f },
];

function latLngToVec3(lat, lng, r) {
  const phi = ((90 - lat) * Math.PI) / 180;
  const theta = ((lng + 180) * Math.PI) / 180;
  return new THREE.Vector3(
    -r * Math.sin(phi) * Math.cos(theta),
    r * Math.cos(phi),
    r * Math.sin(phi) * Math.sin(theta)
  );
}

function makeDotTexture(inner, outer) {
  const c = document.createElement('canvas');
  c.width = c.height = 64;
  const ctx = c.getContext('2d');
  const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 30);
  g.addColorStop(0, inner);
  g.addColorStop(0.6, outer);
  g.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 64, 64);
  return new THREE.CanvasTexture(c);
}

// Rasterize land polygons to an equirectangular alpha mask, then sample for dense dots
function sampleLandDots(features, W, H, stride, R) {
  const canvas = document.createElement('canvas');
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, W, H);
  ctx.fillStyle = '#000';

  const polys = [];
  features.forEach((f) => {
    const g = f.geometry;
    if (!g) return;
    if (g.type === 'Polygon') polys.push(g.coordinates);
    else if (g.type === 'MultiPolygon') g.coordinates.forEach((p) => polys.push(p));
  });

  polys.forEach((rings) => {
    rings.forEach((ring, ri) => {
      ctx.beginPath();
      ring.forEach((pt, i) => {
        const x = ((pt[0] + 180) / 360) * W;
        const y = ((90 - pt[1]) / 180) * H;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.closePath();
      if (ri === 0) ctx.fill();
      else {
        ctx.save();
        ctx.globalCompositeOperation = 'destination-out';
        ctx.fill();
        ctx.restore();
      }
    });
  });

  const img = ctx.getImageData(0, 0, W, H).data;
  const pts = [];
  for (let y = 0; y < H; y += stride) {
    for (let x = 0; x < W; x += stride) {
      const a = img[(y * W + x) * 4 + 3];
      if (a > 128) {
        const jx = (Math.random() - 0.5) * stride * 0.5;
        const jy = (Math.random() - 0.5) * stride * 0.5;
        const lng = ((x + jx) / W) * 360 - 180;
        const lat = 90 - ((y + jy) / H) * 180;
        pts.push(latLngToVec3(lat, lng, R));
      }
    }
  }
  return pts;
}

// Extract coastline line segments from polygon rings (skip antimeridian wraps)
function extractCoastline(features, R) {
  const segs = [];
  features.forEach((f) => {
    const g = f.geometry;
    if (!g) return;
    let rings = [];
    if (g.type === 'Polygon') rings = g.coordinates;
    else if (g.type === 'MultiPolygon') g.coordinates.forEach((p) => rings.push(...p));
    rings.forEach((ring) => {
      for (let i = 0; i < ring.length - 1; i++) {
        const p0 = ring[i];
        const p1 = ring[i + 1];
        if (Math.abs(p0[0] - p1[0]) > 180) continue; // skip antimeridian jump
        segs.push(latLngToVec3(p0[1], p0[0], R), latLngToVec3(p1[1], p1[0], R));
      }
    });
  });
  return segs;
}

export default function InteractiveGlobe3D() {
  const mountRef = useRef(null);
  const tooltipRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth < 768;
    const dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1.5 : 2);

    let width = mount.clientWidth;
    let height = mount.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0, 3.5);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(dpr);
    renderer.setSize(width, height);
    mount.appendChild(renderer.domElement);

    const globeGroup = new THREE.Group();
    scene.add(globeGroup);
    const R = 1;

    // Dark emerald base sphere — dots/glow pop against it
    const baseGeo = new THREE.SphereGeometry(R * 0.995, 64, 64);
    const baseMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const base = new THREE.Mesh(baseGeo, baseMat);
    globeGroup.add(base);

    // Tight fresnel rim — subtle, hugs the edge
    const rimGeo = new THREE.SphereGeometry(R * 1.004, 48, 48);
    const rimMat = new THREE.ShaderMaterial({
      transparent: true,
      side: THREE.BackSide,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: { uColor: { value: new THREE.Color(0x0fa968) } },
      vertexShader: `
        varying vec3 vNormal; varying vec3 vView;
        void main() {
          vec4 mv = modelViewMatrix * vec4(position, 1.0);
          vNormal = normalize(normalMatrix * normal);
          vView = normalize(-mv.xyz);
          gl_Position = projectionMatrix * mv;
        }`,
      fragmentShader: `
        varying vec3 vNormal; varying vec3 vView; uniform vec3 uColor;
        void main() {
          float rim = pow(1.0 - max(dot(vNormal, vView), 0.0), 2.5);
          gl_FragColor = vec4(uColor, rim * 0.42);
        }`,
    });
    const rim = new THREE.Mesh(rimGeo, rimMat);
    globeGroup.add(rim);

    const disposables = [];
    let dotPoints = null;

    // Hubs (added before data loads; static)
    const hubMeshes = [];
    const hubSprites = [];
    HUBS.forEach((h) => {
      const pos = latLngToVec3(h.lat, h.lng, R * 1.01);
      const mGeo = new THREE.SphereGeometry(0.022, 12, 12);
      const mMat = new THREE.MeshBasicMaterial({ color: 0x0fa968 });
      const m = new THREE.Mesh(mGeo, mMat);
      m.position.copy(pos);
      m.userData = { hub: h };
      globeGroup.add(m);
      hubMeshes.push(m);

      const gTex = makeDotTexture('rgba(15,169,104,0.8)', 'rgba(15,169,104,0.3)');
      const sprMat = new THREE.SpriteMaterial({
        map: gTex, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
      });
      const spr = new THREE.Sprite(sprMat);
      spr.position.copy(pos);
      spr.scale.set(0.09, 0.09, 1);
      globeGroup.add(spr);
      hubSprites.push(spr);
      disposables.push(gTex, sprMat);
    });

    // Arcs
    const arcObjects = [];
    ARCS.forEach((arc, idx) => {
      const va = latLngToVec3(HUBS[arc.a].lat, HUBS[arc.a].lng, R);
      const vb = latLngToVec3(HUBS[arc.b].lat, HUBS[arc.b].lng, R);
      const dist = va.distanceTo(vb);
      const mid = va.clone().add(vb).multiplyScalar(0.5).normalize().multiplyScalar(R + dist * 0.4);
      const curve = new THREE.QuadraticBezierCurve3(va, mid, vb);
      const pts = curve.getPoints(64);
      const geo = new THREE.BufferGeometry().setFromPoints(pts);
      const mat = new THREE.LineBasicMaterial({ color: arc.color, transparent: true, opacity: 0 });
      const line = new THREE.Line(geo, mat);
      globeGroup.add(line);

      const pTex = makeDotTexture('rgba(255,255,255,1)', 'rgba(255,255,255,0.6)');
      const pMat = new THREE.SpriteMaterial({
        map: pTex, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
      });
      const pulse = new THREE.Sprite(pMat);
      pulse.scale.set(0.05, 0.05, 1);
      pulse.visible = false;
      globeGroup.add(pulse);

      arcObjects.push({ curve, line, mat, pulse, idx });
      disposables.push(geo, mat, pTex, pMat);
    });

    // --- Interaction ---
    let dragging = false;
    let lastX = 0, lastY = 0;
    let rotY = 0, rotX = 0.35;
    let autoRotate = true;
    let autoTimer;
    const mouse = new THREE.Vector2(-2, -2);
    const raycaster = new THREE.Raycaster();
    let hovered = null;
    let overCanvas = false;

    const onDown = (e) => {
      dragging = true; lastX = e.clientX; lastY = e.clientY; autoRotate = false;
      renderer.domElement.style.cursor = 'grabbing';
    };
    const onUp = () => {
      dragging = false;
      renderer.domElement.style.cursor = 'grab';
      clearTimeout(autoTimer);
      autoTimer = setTimeout(() => { autoRotate = true; }, 2500);
    };
    const onMove = (e) => {
      const rect = renderer.domElement.getBoundingClientRect();
      overCanvas =
        e.clientX >= rect.left && e.clientX <= rect.right &&
        e.clientY >= rect.top && e.clientY <= rect.bottom;
      if (dragging) {
        rotY += (e.clientX - lastX) * 0.006;
        rotX += (e.clientY - lastY) * 0.006;
        rotX = Math.max(-1.2, Math.min(1.2, rotX));
        lastX = e.clientX; lastY = e.clientY;
      }
      if (overCanvas) {
        mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      } else {
        mouse.set(-2, -2);
      }
    };
    renderer.domElement.addEventListener('pointerdown', onDown);
    window.addEventListener('pointerup', onUp);
    window.addEventListener('pointermove', onMove);

    const onResize = () => {
      width = mount.clientWidth; height = mount.clientHeight;
      camera.aspect = width / height; camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', onResize);

    let raf;
    let running = true;
    const io = new IntersectionObserver(([entry]) => {
      running = entry.isIntersecting;
      if (running) animate();
      else cancelAnimationFrame(raf);
    }, { threshold: 0 });
    io.observe(mount);

    const clock = new THREE.Clock();

    function animate() {
      if (!running) return;
      raf = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      if (autoRotate && !prefersReduced) rotY += 0.0018;
      globeGroup.rotation.y = rotY;
      globeGroup.rotation.x = rotX;

      // Hover
      if (overCanvas) {
        raycaster.setFromCamera(mouse, camera);
        const hits = raycaster.intersectObjects(hubMeshes, false);
        const hit = hits.length ? hits[0].object : null;
        if (hit !== hovered) {
          hovered = hit;
          if (tooltipRef.current) {
            tooltipRef.current.textContent = hit ? hit.userData.hub.name : '';
            tooltipRef.current.style.opacity = hit ? '1' : '0';
          }
        }
      } else if (hovered) {
        hovered = null;
        if (tooltipRef.current) tooltipRef.current.style.opacity = '0';
      }
      if (hovered && tooltipRef.current) {
        const v = hovered.getWorldPosition(new THREE.Vector3()).project(camera);
        const sx = (v.x * 0.5 + 0.5) * width;
        const sy = (-v.y * 0.5 + 0.5) * height;
        tooltipRef.current.style.transform = `translate(${sx}px, ${sy - 14}px) translate(-50%, -100%)`;
      }

      // Hub pulse + hover scale
      hubMeshes.forEach((m, i) => {
        const isHover = m === hovered;
        m.scale.setScalar(isHover ? 1.7 : 1 + Math.sin(t * 2.4 + i * 0.7) * 0.2);
        hubSprites[i].scale.setScalar(isHover ? 0.17 : 0.10);
      });

      // Arc animation: draw → hold → fade → gap, staggered
      if (!prefersReduced) {
        const cycle = 6;
        const DRAW = 0.3, HOLD = 0.4, FADE = 0.2;
        arcObjects.forEach((a) => {
          const phase = ((t + a.idx * (cycle / ARCS.length)) % cycle) / cycle;
          let opacity, pulseT;
          if (phase < DRAW) { opacity = (phase / DRAW) * 0.7; pulseT = phase / DRAW; }
          else if (phase < DRAW + HOLD) { opacity = 0.7; pulseT = 1; }
          else if (phase < DRAW + HOLD + FADE) {
            opacity = 0.7 * (1 - (phase - DRAW - HOLD) / FADE); pulseT = 1;
          } else { opacity = 0; pulseT = -1; }
          a.mat.opacity = opacity;
          if (pulseT >= 0) {
            a.pulse.visible = true;
            a.pulse.position.copy(a.curve.getPointAt(pulseT));
            a.pulse.material.opacity = Math.min(1, opacity * 1.5);
          } else a.pulse.visible = false;
        });
      } else {
        arcObjects.forEach((a) => { a.mat.opacity = 0.6; a.pulse.visible = false; });
      }

      renderer.render(scene, camera);
    }
    animate();

    // --- Fetch land data and build dots + coastline ---
    let cancelled = false;
    fetch(LAND_URL)
      .then((r) => r.json())
      .then((geo) => {
        if (cancelled) return;
        const features = geo.features || [];

        // (dense land dots removed — clean line-art globe for light mode)

        // Glowing coastline — core + two halos for bloom
        const coastVerts = extractCoastline(features, R * 1.002);
        const coastGeo = new THREE.BufferGeometry();
        coastGeo.setAttribute('position', new THREE.Float32BufferAttribute(
          coastVerts.flatMap((v) => [v.x, v.y, v.z]), 3
        ));
        const coreMat = new THREE.LineBasicMaterial({
          color: 0x0fa968, transparent: true, opacity: 0.82,
        });
        const core = new THREE.LineSegments(coastGeo, coreMat);
        globeGroup.add(core);
        const halo1Mat = new THREE.LineBasicMaterial({
          color: 0x0fa968, transparent: true, opacity: 0.22, blending: THREE.AdditiveBlending,
        });
        const halo1 = new THREE.LineSegments(coastGeo, halo1Mat);
        halo1.scale.setScalar(1.01);
        globeGroup.add(halo1);
        const halo2Mat = new THREE.LineBasicMaterial({
          color: 0x0fa968, transparent: true, opacity: 0.13, blending: THREE.AdditiveBlending,
        });
        const halo2 = new THREE.LineSegments(coastGeo, halo2Mat);
        halo2.scale.setScalar(1.02);
        globeGroup.add(halo2);
        disposables.push(coastGeo, coreMat, halo1Mat, halo2Mat);

        setLoading(false);
      })
      .catch(() => {
        if (!cancelled) { setFailed(true); setLoading(false); }
      });

    return () => {
      cancelled = true;
      running = false;
      cancelAnimationFrame(raf);
      clearTimeout(autoTimer);
      io.disconnect();
      renderer.domElement.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerup', onUp);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('resize', onResize);
      if (renderer.domElement.parentNode === mount) mount.removeChild(renderer.domElement);
      disposables.forEach((d) => d.dispose && d.dispose());
      baseGeo.dispose(); baseMat.dispose(); rimGeo.dispose(); rimMat.dispose();
      hubMeshes.forEach((m) => { m.geometry.dispose(); m.material.dispose(); });
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-full">
      {/* Circular soft green halo only — fully transparent outside the circle, no rectangle */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className="rounded-full"
          style={{
            width: '128%',
            height: '128%',
            background:
              'radial-gradient(circle, rgba(15,169,104,0.07) 0%, rgba(15,169,104,0.03) 42%, rgba(15,169,104,0) 70%)',
          }}
        />
      </div>
      <div ref={mountRef} className="absolute inset-0" style={{ cursor: 'grab' }} />
      <div
        ref={tooltipRef}
        className="absolute top-0 left-0 pointer-events-none px-2.5 py-1 rounded-md text-[11px] font-semibold text-foreground bg-card border border-primary/40 shadow-sm whitespace-nowrap z-30"
        style={{ opacity: 0, transition: 'opacity 0.15s', willChange: 'transform' }}
      />
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-10 h-10 rounded-full border-2 border-primary/30 border-t-primary animate-spin" />
        </div>
      )}
      {failed && (
        <div className="absolute inset-0 flex items-center justify-center px-6 text-center">
          <p className="text-xs text-primary">Loading global network…</p>
        </div>
      )}
    </div>
  );
}
