'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useEffect, useRef, useSyncExternalStore } from 'react';
import { createPortal } from 'react-dom';

const noopSubscribe = () => () => {};

type ProjectModalProps = {
  open: boolean;
  title: string;
  onClose: () => void;
  Article: React.ComponentType | null;
};

export default function ProjectModal({ open, title, onClose, Article }: ProjectModalProps) {
  const closeRef = useRef<HTMLButtonElement>(null);
  // true only in the browser; avoids touching document during SSR
  const mounted = useSyncExternalStore(noopSubscribe, () => true, () => false);

  // Close on Escape, focus the close button, restore focus afterwards
  useEffect(() => {
    if (!open) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      previouslyFocused?.focus();
    };
  }, [open, onClose]);

  if (!mounted) return null;

  // Portal to <body> so the modal escapes <main>'s stacking context and covers the navbar
  return createPortal(
    <AnimatePresence>
      {open ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 30, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="relative max-h-[88vh] w-full max-w-3xl overflow-y-auto overscroll-contain rounded-3xl border border-border bg-card p-6 md:p-10"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="Close article"
              className="sticky top-0 float-right -mr-2 -mt-2 rounded-full border border-border bg-card-strong p-2 text-secondary transition hover:border-accent/60 hover:text-accent"
            >
              <X size={16} />
            </button>
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-accent">Project log</p>
            <h3 id="project-modal-title" className="mb-6 mt-2 pr-12 font-heading text-3xl font-bold">
              {title}
            </h3>
            <div className="mdx-content space-y-4 text-secondary">{Article ? <Article /> : null}</div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body
  );
}
