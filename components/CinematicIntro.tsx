'use client';

import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowRight, ArrowUpRight, Play } from '@phosphor-icons/react';
import { useAppContext } from '@/components/AppProviders';

const INTRO_STORAGE_KEY = 'hga_intro_choice_v3';

export function CinematicIntro() {
  const { setScrollLocked } = useAppContext();
  const [mode, setMode] = useState<'hidden' | 'choice' | 'showreel'>('hidden');
  const [reelKind, setReelKind] = useState<'intro' | 'full'>('intro');
  const [isMobilePortrait, setIsMobilePortrait] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    setScrollLocked(mode !== 'hidden');
    return () => setScrollLocked(false);
  }, [mode, setScrollLocked]);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px) and (orientation: portrait)');
    const syncOrientation = () => setIsMobilePortrait(mq.matches);
    syncOrientation();
    mq.addEventListener('change', syncOrientation);

    try {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const seen = sessionStorage.getItem(INTRO_STORAGE_KEY) === '1';
      if (!reduced && !seen) {
        setReelKind('intro');
        setMode('choice');
        sessionStorage.setItem(INTRO_STORAGE_KEY, '1');
      }
    } catch {
      // Ignore storage failures
    }

    const onReplay = () => {
      setProgress(0);
      setVideoReady(false);
      setReelKind('full');
      setMode('showreel');
    };
    window.addEventListener('hga:replay-showreel', onReplay);
    return () => {
      mq.removeEventListener('change', syncOrientation);
      window.removeEventListener('hga:replay-showreel', onReplay);
    };
  }, []);

  useEffect(() => {
    if (mode === 'hidden') return undefined;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMode('hidden');
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [mode]);

  const handleEnterShowreel = () => {
    setProgress(0);
    setVideoReady(false);
    setReelKind('intro');
    setMode('showreel');
  };

  const handleClose = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
    setMode('hidden');
  };

  return (
    <AnimatePresence>
      {mode !== 'hidden' && (
        <motion.div
          key="cinematic-intro-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } }}
          className="fixed inset-0 z-[90] flex flex-col items-center justify-center overflow-y-auto bg-[#08080a] px-4 py-6 text-white sm:px-6"
          role="dialog"
          aria-modal="true"
          aria-label="Haidar Ghazy Arkan portfolio entrance"
        >
          {/* Warm studio ambient glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(255,90,38,0.14),transparent_60%)]"
          />

          {mode === 'choice' && (
            <motion.div
              key="choice-screen"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-10 flex w-full max-w-xl flex-col items-center text-center"
            >
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-medium tracking-[0.16em] uppercase text-white/85">
                <span className="h-2 w-2 rounded-full bg-[#ff5a26]" aria-hidden="true" />
                <span>Haidar Ghazy Arkan</span>
              </div>

              <h2 className="font-display text-3xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl">
                I turn ideas into stories, campaigns, and creative systems.
              </h2>

              <p className="mt-4 max-w-md text-sm leading-relaxed text-[#b8b8c0] sm:text-base">
                Choose how you want to explore — watch a 10-second animated world intro or jump straight into the portfolio.
              </p>

              <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center sm:gap-4">
                <button
                  type="button"
                  onClick={handleEnterShowreel}
                  className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-[#ff5a26] px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-[#ff5a26]/25 transition-colors hover:bg-[#ff7447] sm:text-base"
                >
                  <Play size={16} weight="fill" />
                  <span>Explore My World</span>
                  <ArrowUpRight size={16} weight="bold" />
                </button>

                <button
                  type="button"
                  onClick={handleClose}
                  className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-7 py-3 text-sm font-semibold text-white transition-colors hover:border-[#ff5a26]/70 hover:bg-white/10 sm:text-base"
                >
                  <span>View Portfolio</span>
                  <ArrowRight size={16} weight="bold" />
                </button>
              </div>
            </motion.div>
          )}

          {mode === 'showreel' && (() => {
            const usePortraitFull = reelKind === 'full' && isMobilePortrait;
            const videoSrc =
              reelKind === 'intro'
                ? '/assets/video/haidar-intro.mp4'
                : usePortraitFull
                  ? '/assets/video/haidar-showreel-social.mp4'
                  : '/assets/video/haidar-showreel.mp4';
            const durationLabel = reelKind === 'intro' ? '10 sec' : '30 sec';

            return (
              <motion.div
                key="showreel-stage"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className={`relative z-10 flex w-full flex-col items-center ${usePortraitFull ? 'max-w-[360px]' : 'max-w-4xl'}`}
              >
                {/* Top synced progress bar */}
                <div className="fixed inset-x-0 top-0 h-[3px] bg-white/10">
                  <div
                    className="h-full bg-[#ff5a26] transition-[width] duration-100 ease-linear"
                    style={{ width: `${Math.min(100, Math.max(0, progress * 100))}%` }}
                  />
                </div>

                <div className="w-full overflow-hidden rounded-2xl border border-white/15 bg-black shadow-2xl sm:rounded-[24px]">
                  <video
                    key={videoSrc}
                    ref={videoRef}
                    src={videoSrc}
                    autoPlay
                    muted
                    playsInline
                    preload="auto"
                    onLoadedData={() => setVideoReady(true)}
                    onTimeUpdate={(e) => {
                      const v = e.currentTarget;
                      if (v.duration > 0) setProgress(v.currentTime / v.duration);
                    }}
                    onEnded={handleClose}
                    onError={handleClose}
                    className={`transition-opacity duration-300 ${videoReady ? 'opacity-100' : 'opacity-0'} ${
                      usePortraitFull ? 'aspect-[9/16] max-h-[75dvh] w-full object-cover' : 'aspect-video max-h-[75dvh] w-full object-cover'
                    }`}
                  />
                </div>

                <div className="mt-4 flex w-full items-center justify-between text-xs text-white/70">
                  <span>Inside Haidar&apos;s Creative World · {durationLabel}</span>
                  <button
                    type="button"
                    onClick={handleClose}
                    className="inline-flex min-h-[44px] items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold text-white transition-colors hover:border-[#ff5a26] hover:text-white"
                  >
                    <span>Skip to Portfolio</span>
                    <ArrowRight size={13} weight="bold" />
                  </button>
                </div>
              </motion.div>
            );
          })()}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
