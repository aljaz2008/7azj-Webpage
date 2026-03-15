'use client';

import { AnimatePresence, motion } from 'framer-motion';

type ProjectModalProps = {
  open: boolean;
  title: string;
  onClose: () => void;
  Article: React.ComponentType | null;
};

export default function ProjectModal({ open, title, onClose, Article }: ProjectModalProps) {
  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/80 p-2 sm:p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 30, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="relative max-h-[88vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-border bg-card p-4 sm:p-6 md:p-8"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 rounded border border-border px-3 py-1 text-xs text-secondary transition hover:text-primary"
            >
              CLOSE
            </button>
            <h3 className="mb-5 pr-14 font-heading text-2xl sm:text-3xl">{title}</h3>
            <div className="mdx-content space-y-4 text-secondary">{Article ? <Article /> : null}</div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
