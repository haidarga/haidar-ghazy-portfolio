'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FastForward } from '@phosphor-icons/react';
import { useAppContext } from '@/components/AppProviders';

const SESSION_KEY = 'hga_intro_seen_v1';

/**
 * Brief <= 1.2s editorial opening slate shown once per session and skipped under reduced-motion.
 */
export function IntroLoader() {
  const { locale, reducedMotion } = useAppContext();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reducedMotion || prefersReduced) {
      setVisible(false);
      return;
    }

    try {
      const seen = window.sessionStorage.getItem(SESSION_KEY);
      if (seen === '1') return;

      setVisible(true);
      window.sessionStorage.setItem(SESSION_KEY, '1');
    } catch {
      return;
    }

    const timer = window.setTimeout(() => {
      setVisible(false);
    }, 1050);

    return () => window.clearTimeout(timer);
  }, [reducedMotion]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } }}
          className="fixed inset-0 z-[100] flex flex-col justify-between bg-canvas px-6 py-8 text-ink"
          role="dialog"
          aria-modal="false"
          aria-label="Haidar Ghazy Arkan"
        >
          <div className="flex items-center justify-between font-mono text-xs uppercase tracking-[0.1em] text-muted">
            <span>Haidar Ghazy Arkan</span>
            <span>AI Growth · Creative Tech</span>
          </div>

          <div className="mx-auto max-w-2xl text-center">
            <motion.p
              initial={{ y: 18, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-3xl font-semibold tracking-tight text-ink sm:text-5xl"
            >
              7.9M views. 60% DM-to-member.
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.22, duration: 0.35 }}
              className="mt-3 font-mono text-xs uppercase tracking-[0.12em] text-accent"
            >
              {locale === 'id' ? 'Sistem Konten & Persona AI' : 'AI Persona & Content Systems'}
            </motion.p>
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => setVisible(false)}
              className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3.5 py-1.5 font-mono text-xs text-muted transition-colors hover:border-accent hover:text-ink"
            >
              <FastForward size={14} weight="bold" />
              <span>{locale === 'id' ? 'Lewati' : 'Skip'}</span>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
