import React, { useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { X } from 'lucide-react';

const markdownComponents = {
  h1: ({ node, ...props }) => (
    <h1 className="font-heading font-bold text-2xl md:text-3xl text-foreground mb-2 mt-0 tracking-tight" {...props} />
  ),
  h2: ({ node, ...props }) => (
    <h2 className="font-heading font-bold text-lg md:text-xl text-foreground mt-8 mb-3" {...props} />
  ),
  h3: ({ node, ...props }) => (
    <h3 className="font-heading font-semibold text-base md:text-lg text-foreground mt-6 mb-2" {...props} />
  ),
  p: ({ node, ...props }) => (
    <p className="text-sm md:text-base leading-relaxed text-foreground mb-4" {...props} />
  ),
  ul: ({ node, ...props }) => (
    <ul className="list-disc pl-5 mb-4 space-y-2 text-sm md:text-base leading-relaxed text-foreground" {...props} />
  ),
  ol: ({ node, ...props }) => (
    <ol className="list-decimal pl-5 mb-4 space-y-2 text-sm md:text-base leading-relaxed text-foreground" {...props} />
  ),
  li: ({ node, ...props }) => <li className="leading-relaxed" {...props} />,
  hr: ({ node, ...props }) => <hr className="my-6 border-border" {...props} />,
  strong: ({ node, ...props }) => <strong className="font-semibold text-foreground" {...props} />,
  a: ({ node, ...props }) => <a className="text-primary hover:underline" {...props} />,
  blockquote: ({ node, ...props }) => (
    <blockquote className="border-l-2 border-primary/40 pl-4 italic text-muted-foreground mb-4" {...props} />
  ),
};

export default function LegalModal({ title, content, onClose }) {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEsc);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div
        className="relative bg-card border border-border rounded-2xl shadow-xl w-full max-w-2xl max-h-[85vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-end px-4 py-3 border-b border-border bg-card">
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>
        <div className="overflow-y-auto px-6 md:px-10 py-6 md:py-8">
          <ReactMarkdown components={markdownComponents}>{content}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
