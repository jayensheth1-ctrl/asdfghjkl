/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
  	extend: {
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			},
  			sidebar: {
  				DEFAULT: 'hsl(var(--sidebar-background))',
  				foreground: 'hsl(var(--sidebar-foreground))',
  				primary: 'hsl(var(--sidebar-primary))',
  				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
  				accent: 'hsl(var(--sidebar-accent))',
  				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
  				border: 'hsl(var(--sidebar-border))',
  				ring: 'hsl(var(--sidebar-ring))'
  			}
  		},
  		fontFamily: {
  			heading: ["'Fraunces'", 'ui-serif', 'Georgia', 'Times New Roman', 'serif'],
  			body: ["'Manrope'", 'ui-sans-serif', 'system-ui', 'sans-serif'],
  			display: ["'Syne'", "'Space Grotesk'", 'ui-sans-serif', 'system-ui', 'sans-serif'],
  			mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace']
  		},
  		keyframes: {
  			'aurora-drift-1': {
  				'0%, 100%': { transform: 'translate(0px, 0px) scale(1)' },
  				'33%': { transform: 'translate(220px, 160px) scale(1.2)' },
  				'66%': { transform: 'translate(-140px, 240px) scale(0.9)' },
  			},
  			'aurora-drift-2': {
  				'0%, 100%': { transform: 'translate(0px, 0px) scale(1)' },
  				'50%': { transform: 'translate(-260px, -200px) scale(1.25)' },
  			},
  			'aurora-drift-3': {
  				'0%, 100%': { transform: 'translate(0px, 0px) scale(1)' },
  				'40%': { transform: 'translate(200px, -240px) scale(0.85)' },
  				'75%': { transform: 'translate(-180px, -80px) scale(1.15)' },
  			},
  			'aurora-drift-4': {
  				'0%, 100%': { transform: 'translate(0px, 0px) scale(1)' },
  				'60%': { transform: 'translate(-220px, 180px) scale(1.2)' },
  			},
  			'aurora-drift-5': {
  				'0%, 100%': { transform: 'translate(0px, 0px) scale(1)' },
  				'45%': { transform: 'translate(180px, 220px) scale(1.15)' },
  				'80%': { transform: 'translate(-200px, 60px) scale(0.9)' },
  			},
  			'typewriter-blink': {
  				'0%, 49%': { opacity: '1' },
  				'50%, 100%': { opacity: '0' },
  			},
  			'pulse-slow': {
  				'0%, 100%': { opacity: '1' },
  				'50%': { opacity: '0.55' },
  			},
  			'spin-slow': {
  				'0%': { transform: 'rotate(0deg)' },
  				'100%': { transform: 'rotate(360deg)' },
  			},
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out',
  			'typewriter-blink': 'typewriter-blink 1.06s steps(1) infinite',
  			'pulse-slow': 'pulse-slow 2s ease-in-out infinite',
  			'spin-slow': 'spin-slow 12s linear infinite',
  			'aurora-1': 'aurora-drift-1 16s ease-in-out infinite',
  			'aurora-2': 'aurora-drift-2 22s ease-in-out infinite',
  			'aurora-3': 'aurora-drift-3 27s ease-in-out infinite',
  			'aurora-4': 'aurora-drift-4 30s ease-in-out infinite',
  			'aurora-5': 'aurora-drift-5 19s ease-in-out infinite'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
}
