'use client';

import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowRight, ArrowUpRight, FilmStrip, Play, SpeakerHigh, SpeakerSlash } from '@phosphor-icons/react';
import { useAppContext } from '@/components/AppProviders';

const INTRO_STORAGE_KEY = 'hga_intro_choice_v5';

export function CinematicIntro() {
  const { setScrollLocked } = useAppContext();
  const [mode, setMode] = useState<'hidden' | 'choice' | 'showreel'>('hidden');
  const [reelKind, setReelKind] = useState<'intro' | 'full'>('intro');
  const [isMobilePortrait, setIsMobilePortrait] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
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
      setIsMuted(false);
      setReelKind('full');
      setMode('showreel');
    };
    const onReplayIntro = () => {
      setProgress(0);
      setVideoReady(false);
      setIsMuted(false);
      setReelKind('intro');
      setMode('showreel');
    };
    window.addEventListener('hga:replay-showreel', onReplay);
    window.addEventListener('hga:replay-intro', onReplayIntro);
    return () => {
      mq.removeEventListener('change', syncOrientation);
      window.removeEventListener('hga:replay-showreel', onReplay);
      window.removeEventListener('hga:replay-intro', onReplayIntro);
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

  const handleEnterShowreel = (kind: 'intro' | 'full' = 'intro') => {
    setProgress(0);
    setVideoReady(false);
    setIsMuted(false);
    setReelKind(kind);
    setMode('showreel');
  };

  const handleToggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    if (videoRef.current) {
      videoRef.current.muted = nextMuted;
      if (!nextMuted) {
        videoRef.current.volume = 1.0;
        videoRef.current.play().catch(() => {});
      }
    }
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
          className="fixed inset-0 z-[90] flex flex-col items-center justify-center overflow-y-auto bg-[#07070a] px-4 py-6 text-white sm:px-6"
          role="dialog"
          aria-modal="true"
          aria-label="Haidar Ghazy Arkan portfolio entrance"
        >
          {/* Warm studio ambient glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(255,90,38,0.16),transparent_62%)]"
          />

          {mode === 'choice' && (
            <motion.div
              key="choice-screen"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-10 flex w-full max-w-2xl flex-col items-center text-center"
            >
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#ff5a26]/40 bg-[#ff5a26]/10 px-4 py-1.5 text-xs font-semibold tracking-[0.16em] uppercase text-[#ff855e]">
                <span className="h-2 w-2 rounded-full bg-[#ff5a26]" aria-hidden="true" />
                <span>Haidar Ghazy Arkan · Audio-Visual Experience</span>
              </div>

              <h2 className="font-display text-3xl font-bold leading-[1.06] tracking-tight text-white sm:text-5xl">
                Film Director’s Eye. AI Growth Brain. Systems Builder.
              </h2>

              <p className="mt-4 max-w-xl text-sm leading-relaxed text-[#b8b8c0] sm:text-base">
                Step inside Haidar&apos;s world — from directing on-set cinema, 3D &amp; VFX to driving <strong className="text-white">7.9M+ AI views</strong>, <strong className="text-white">~60% DM conversions</strong>, and building <strong className="text-white">CAKETING &amp; CakVisual</strong>.
              </p>

              <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-3.5">
                <button
                  type="button"
                  onClick={() => handleEnterShowreel('intro')}
                  className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-[#ff5a26] px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-[#ff5a26]/25 transition-colors hover:bg-[#ff7447] sm:text-base"
                >
                  <Play size={16} weight="fill" />
                  <span>Enter My World (20s Intro · Sound On)</span>
                  <ArrowUpRight size={16} weight="bold" />
                </button>

                <button
                  type="button"
                  onClick={() => handleEnterShowreel('full')}
                  className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full border border-[#ff5a26]/50 bg-[#ff5a26]/10 px-6 py-3 text-sm font-semibold text-[#ffb088] transition-colors hover:border-[#ff5a26] hover:bg-[#ff5a26]/20 hover:text-white sm:text-base"
                >
                  <FilmStrip size={17} weight="duotone" />
                  <span>Full Director&apos;s Cut (60s)</span>
                </button>

                <button
                  type="button"
                  onClick={handleClose}
                  className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-white/50 hover:bg-white/10 sm:text-base"
                >
                  <span>Skip to Portfolio</span>
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
            const durationLabel = reelKind === 'intro' ? '20s Website Intro' : '60s Director’s Cut';

            return (
              <motion.div
                key="showreel-stage"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className={`relative z-10 flex w-full flex-col items-center ${usePortraitFull ? 'max-w-[380px]' : 'max-w-5xl'}`}
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
                    muted={isMuted}
                    playsInline
                    preload="auto"
                    onLoadedData={(e) => {
                      setVideoReady(true);
                      const v = e.currentTarget;
                      v.muted = isMuted;
                      v.volume = 1.0;
                      v.play().catch(() => {
                        // Fallback if browser blocks unmuted autoplay without gesture
                        setIsMuted(true);
                        v.muted = true;
                        v.play().catch(() => {});
                      });
                    }}
                    onTimeUpdate={(e) => {
                      const v = e.currentTarget;
                      if (v.duration > 0) setProgress(v.currentTime / v.duration);
                    }}
                    onEnded={handleClose}
                    onError={handleClose}
                    className={`transition-opacity duration-300 ${videoReady ? 'opacity-100' : 'opacity-0'} ${
                      usePortraitFull ? 'aspect-[9/16] max-h-[76dvh] w-full object-cover' : 'aspect-video max-h-[76dvh] w-full object-cover'
                    }`}
                  />
                </div>

                <div className="mt-4 flex w-full flex-wrap items-center justify-between gap-2 text-xs text-white/75">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-white">
                      {reelKind === 'intro' ? 'Warp Drive — Inside Haidar’s World' : 'Inside Haidar’s World'} · {durationLabel}
                    </span>
                    <button
                      type="button"
                      onClick={handleToggleMute}
                      className="inline-flex min-h-[38px] items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-xs font-semibold text-white transition-colors hover:border-[#ff5a26]"
                    >
                      {isMuted ? (
                        <>
                          <SpeakerSlash size={14} weight="fill" className="text-[#ff5a26]" />
                          <span>Unmute Audio</span>
                        </>
                      ) : (
                        <>
                          <SpeakerHigh size={14} weight="fill" className="text-[#34d399]" />
                          <span>Sound On</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleEnterShowreel(reelKind === 'intro' ? 'full' : 'intro')}
                      className="inline-flex min-h-[40px] items-center gap-1.5 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-xs font-semibold text-white/90 transition-colors hover:border-[#ff5a26] hover:text-white"
                    >
                      <FilmStrip size={14} weight="bold" />
                      <span>{reelKind === 'intro' ? 'Switch to 60s Full Cut' : 'Switch to 20s Intro'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleClose}
                      className="inline-flex min-h-[40px] items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold text-white transition-colors hover:border-[#ff5a26] hover:text-white"
                    >
                      <span>Skip to Portfolio</span>
                      <ArrowRight size={13} weight="bold" />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })()}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
