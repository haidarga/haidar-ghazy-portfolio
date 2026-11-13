'use client';

import React, { useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { X } from '@phosphor-icons/react';
import { useAppContext } from '@/components/AppProviders';

interface ImageLightboxProps {
  src: string | null;
  alt: string;
  caption?: string;
  onClose: () => void;
}

export function ImageLightbox({ src, alt, caption, onClose }: ImageLightboxProps) {
  const { setScrollLocked } = useAppContext();

  useEffect(() => {
    setScrollLocked(Boolean(src));
    if (!src) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      setScrollLocked(false);
    };
  }, [src, onClose, setScrollLocked]);

  return (
    <AnimatePresence>
      {src && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={alt}
          className="fixed inset-0 z-[120] flex items-center justify-center bg-black/85 p-4 backdrop-blur-xl sm:p-8"
        >
          <motion.div
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.96, opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="apple-surface relative flex max-h-[90vh] w-full max-w-5xl flex-col overflow-hidden rounded-[28px] p-4 sm:p-6"
          >
            <div className="mb-3 flex items-center justify-between gap-4">
              <p className="truncate text-sm font-medium text-muted">
                {caption || alt}
              </p>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close full-screen preview"
                className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line bg-canvas text-ink transition-colors hover:border-accent hover:text-accent"
              >
                <X size={18} weight="bold" />
              </button>
            </div>
            <div className="flex min-h-0 flex-1 items-center justify-center overflow-hidden rounded-2xl bg-canvas p-2">
              <img
                src={src}
                alt={alt}
                className="max-h-[75vh] w-auto max-w-full rounded-xl object-contain"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
