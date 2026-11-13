'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'motion/react';
import { CaretLeft, CaretRight, ChartLineUp, MagnifyingGlassPlus, Robot } from '@phosphor-icons/react';
import { ImageLightbox } from '@/components/ImageLightbox';
import { caseStudies } from '@/content/case-studies';
import { pick, pickMaybe } from '@/content/i18n';
import { useAppContext } from '@/components/AppProviders';
import { CountUp } from '@/components/CountUp';
import { trackEvent } from '@/lib/analytics';

gsap.registerPlugin(ScrollTrigger);

export function CaseStudiesSection() {
  const { locale, reducedMotion, scrollToHash } = useAppContext();
  const sectionRef = useRef<HTMLElement | null>(null);
  const [activeCaseIndex, setActiveCaseIndex] = useState<number>(0);
  const [activeVisualMap, setActiveVisualMap] = useState<Record<string, number>>({});
  const [zoomOpen, setZoomOpen] = useState<boolean>(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const mm = gsap.matchMedia();
    mm.add('(min-width: 1024px)', () => {
      const chapters = gsap.utils.toArray<HTMLElement>('.case-chapter', section);
      chapters.forEach((chapter, idx) => {
        ScrollTrigger.create({
          trigger: chapter,
          start: 'top 48%',
          end: 'bottom 48%',
          onEnter: () => {
            setActiveCaseIndex(idx);
            trackEvent('case_open', { id: caseStudies[idx]?.id });
          },
          onEnterBack: () => setActiveCaseIndex(idx)
        });

        if (!reducedMotion) {
          gsap.from(chapter, {
            y: 12,
            opacity: 0.75,
            duration: 0.28,
            ease: 'power2.out',
            clearProps: 'transform,opacity',
            scrollTrigger: {
              trigger: chapter,
              start: 'top 96%',
              once: true
            }
          });
        }
      });
    });

    return () => mm.revert();
  }, [reducedMotion]);

  useEffect(() => {
    const syncFromHash = () => {
      const hash = window.location.hash.replace('#', '');
      const matchIdx = caseStudies.findIndex((cs) => cs.id === hash);
      if (matchIdx >= 0) {
        setActiveCaseIndex(matchIdx);
      }
    };
    syncFromHash();
    window.addEventListener('hashchange', syncFromHash);
    return () => window.removeEventListener('hashchange', syncFromHash);
  }, []);

  const activeCase = caseStudies[activeCaseIndex] ?? caseStudies[0];
  const activeVisualIdx = activeVisualMap[activeCase.id] ?? 0;
  const activeVisual = activeCase.visuals[activeVisualIdx] ?? activeCase.visuals[0];

  const selectVisual = (caseId: string, idx: number) => {
    setActiveVisualMap((prev) => ({ ...prev, [caseId]: idx }));
  };

  return (
    <section
      id="work"
      ref={sectionRef}
      className="border-b border-line py-20 lg:py-28"
    >
      <div className="container-shell">
        {/* Section Header */}
        <div className="mb-14 flex flex-col justify-between gap-4 border-b border-line pb-8 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">
              Case Studies
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-ink sm:text-5xl">
              Proven campaigns. Real numbers.
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-muted sm:text-base">
            Selected campaigns across audience growth, DM conversion, and multi-persona production.
          </p>
        </div>

        {/* Mobile Quick Chapter Switcher (< 1024px) */}
        <div className="no-scrollbar -mx-4 mb-6 flex gap-2 overflow-x-auto px-4 pb-1 lg:hidden">
          {caseStudies.map((cs, idx) => (
            <button
              key={cs.id}
              type="button"
              onClick={() => {
                setActiveCaseIndex(idx);
                scrollToHash(`#${cs.id}`);
              }}
              className={`min-h-[40px] shrink-0 rounded-full border px-4 py-1.5 text-xs font-semibold transition-colors ${
                idx === activeCaseIndex
                  ? 'border-accent bg-accent text-accent-ink'
                  : 'border-line bg-surface text-muted hover:text-ink'
              }`}
            >
              {cs.index} · {cs.shortTabLabel}
            </button>
          ))}
        </div>

        {/* Desktop Scrollytelling Split (Sticky Evidence + Scrolling Narrative) */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Left Narrative Chapters */}
          <div className="space-y-10 lg:col-span-6 lg:space-y-16">
            {caseStudies.map((cs, idx) => {
              const isCurrent = idx === activeCaseIndex;
              const mobileVisualIdx = activeVisualMap[cs.id] ?? 0;
              const mobileVisual = cs.visuals[mobileVisualIdx] ?? cs.visuals[0];

              return (
                <article
                  key={cs.id}
                  id={cs.id}
                  onClick={() => setActiveCaseIndex(idx)}
                  className={`case-chapter apple-surface scroll-mt-24 cursor-pointer rounded-[28px] p-6 transition-all duration-300 sm:p-8 ${
                    isCurrent
                      ? 'border-accent/55 shadow-xl'
                      : 'opacity-80 hover:opacity-100'
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-xs font-semibold uppercase tracking-[0.08em] text-accent">
                      {cs.index} · {cs.brand}
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent-soft px-3 py-1 text-[11px] font-medium text-accent">
                      <Robot size={13} weight="bold" />
                      <span>{pick(cs.framingBadge, locale)}</span>
                    </span>
                  </div>

                  <h3 className="mt-4 font-display text-2xl font-bold leading-tight text-ink sm:text-3xl">
                    {pick(cs.title, locale)}
                  </h3>

                  <p className="mt-3 text-xs font-medium leading-relaxed text-accent">
                    {cs.roleSummary}
                  </p>

                  {/* Key Metrics Grid */}
                  <div className="mt-6 grid grid-cols-3 gap-3 border-y border-line py-5">
                    {cs.metrics.map((m, mIdx) => (
                      <div key={`${cs.id}-m-${mIdx}`}>
                        <div className="font-display text-2xl font-bold text-ink sm:text-[1.75rem]">
                          <CountUp
                            target={m.value}
                            decimals={m.decimals}
                            prefix={m.prefix}
                            suffix={pickMaybe(m.suffix, locale)}
                          />
                        </div>
                        <p className="mt-1 text-xs leading-snug text-muted">
                          {pick(m.label, locale)}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Problem -> Action -> Result */}
                  <dl className="mt-6 space-y-4 text-sm leading-relaxed sm:text-[15px]">
                    <div>
                      <dt className="text-xs font-semibold uppercase tracking-[0.08em] text-muted">
                        Challenge
                      </dt>
                      <dd className="mt-1 text-ink/90">{pick(cs.problem, locale)}</dd>
                    </div>
                    <div>
                      <dt className="text-xs font-semibold uppercase tracking-[0.08em] text-muted">
                        Execution
                      </dt>
                      <dd className="mt-1 text-muted">{pick(cs.action, locale)}</dd>
                    </div>
                    <div>
                      <dt className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.08em] text-accent">
                        <ChartLineUp size={14} weight="bold" />
                        <span>Outcome</span>
                      </dt>
                      <dd className="mt-1 font-medium text-ink">{pick(cs.resultSummary, locale)}</dd>
                    </div>
                  </dl>

                  {cs.brandBreakdown && cs.brandBreakdown.length > 0 && (
                    <div className="mt-6 rounded-2xl border border-line bg-canvas/70 p-4">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-accent">
                        Cross-Industry Brand Scope
                      </p>
                      <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                        {cs.brandBreakdown.map((item) => (
                          <div
                            key={item.brand}
                            className="rounded-xl border border-line/80 bg-surface/60 p-3"
                          >
                            <div className="flex items-center justify-between gap-2">
                              <span className="text-xs font-bold text-ink">{item.brand}</span>
                              <span className="text-[10px] font-medium text-accent">
                                {item.category}
                              </span>
                            </div>
                            <p className="mt-1.5 text-xs leading-relaxed text-muted">
                              {item.scope}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <p className="mt-4 border-t border-line pt-3 text-xs leading-relaxed text-muted">
                    {cs.contextNote}
                  </p>

                  {/* Mobile / Tablet Inline Visual Switcher (< 1024px) */}
                  <div className="mt-6 space-y-3 border-t border-line pt-5 lg:hidden">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveCaseIndex(idx);
                        setZoomOpen(true);
                      }}
                      className="block w-full overflow-hidden rounded-2xl border border-line bg-canvas"
                    >
                      <img
                        src={mobileVisual.src}
                        alt={pick(mobileVisual.alt, locale)}
                        className="aspect-[16/10] w-full bg-canvas object-contain"
                      />
                    </button>
                    <p className="text-xs text-muted">
                      {pick(mobileVisual.caption, locale)}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {cs.visuals.map((v, vIdx) => (
                        <button
                          key={v.src}
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            selectVisual(cs.id, vIdx);
                          }}
                          className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                            vIdx === mobileVisualIdx
                              ? 'border-accent bg-accent text-accent-ink'
                              : 'border-line bg-canvas text-muted hover:text-ink'
                          }`}
                        >
                          {v.shortLabel ?? `Proof ${vIdx + 1}`}
                        </button>
                      ))}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          {/* Right Sticky Evidence Panel (Desktop >= 1024px) */}
          <div className="hidden lg:col-span-6 lg:block">
            <div className="apple-surface sticky top-24 rounded-[28px] p-6">
              {/* Chapter Progress Bar */}
              <div className="mb-5 flex flex-wrap items-center justify-between gap-3 border-b border-line pb-4">
                <div className="flex flex-wrap items-center gap-1.5">
                  {caseStudies.map((cs, idx) => (
                    <button
                      key={cs.id}
                      type="button"
                      onClick={() => setActiveCaseIndex(idx)}
                      className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-all ${
                        idx === activeCaseIndex
                          ? 'bg-accent text-accent-ink shadow-sm'
                          : 'border border-line bg-canvas text-muted hover:text-ink'
                      }`}
                    >
                      {cs.shortTabLabel}
                    </button>
                  ))}
                </div>
                <span className="text-xs font-medium text-muted">
                  Proof {activeVisualIdx + 1}/{activeCase.visuals.length}
                </span>
              </div>

              {/* Main Visual Stage with Interactive Prev/Next & Click-to-Zoom */}
              <div className="group relative overflow-hidden rounded-2xl border border-line bg-canvas">
                <AnimatePresence mode="wait">
                  <motion.button
                    type="button"
                    key={activeVisual.src}
                    onClick={() => setZoomOpen(true)}
                    aria-label="Inspect full-screen proof"
                    initial={reducedMotion ? false : { opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={reducedMotion ? undefined : { opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                    className="flex h-[460px] xl:h-[500px] w-full cursor-zoom-in items-center justify-center bg-canvas p-2"
                  >
                    <img
                      src={activeVisual.src}
                      alt={pick(activeVisual.alt, locale)}
                      className="max-h-full max-w-full rounded-xl object-contain"
                    />
                  </motion.button>
                </AnimatePresence>

                <button
                  type="button"
                  onClick={() => setZoomOpen(true)}
                  aria-label="View original screenshot"
                  className="apple-glass absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full border border-white/15 px-3 py-1.5 text-[11px] font-medium text-ink opacity-90 transition-opacity hover:opacity-100"
                >
                  <MagnifyingGlassPlus size={14} weight="bold" className="text-accent" />
                  <span>View full screenshot ↗</span>
                </button>

                {activeCase.visuals.length > 1 && (
                  <>
                    <button
                      type="button"
                      aria-label="Previous proof"
                      onClick={() =>
                        selectVisual(
                          activeCase.id,
                          (activeVisualIdx - 1 + activeCase.visuals.length) %
                            activeCase.visuals.length
                        )
                      }
                      className="apple-glass absolute left-3 top-1/2 -translate-y-1/2 rounded-full border border-white/15 p-2 text-ink opacity-0 transition-opacity group-hover:opacity-100 focus:opacity-100"
                    >
                      <CaretLeft size={16} weight="bold" />
                    </button>
                    <button
                      type="button"
                      aria-label="Next proof"
                      onClick={() =>
                        selectVisual(
                          activeCase.id,
                          (activeVisualIdx + 1) % activeCase.visuals.length
                        )
                      }
                      className="apple-glass absolute right-3 top-1/2 -translate-y-1/2 rounded-full border border-white/15 p-2 text-ink opacity-0 transition-opacity group-hover:opacity-100 focus:opacity-100"
                    >
                      <CaretRight size={16} weight="bold" />
                    </button>
                  </>
                )}
              </div>

              <p className="mt-4 min-h-[2.75rem] text-sm leading-relaxed text-ink/90">
                {pick(activeVisual.caption, locale)}
              </p>

              {/* Thumbnail Picker */}
              <div
                className={`mt-4 grid gap-2 ${
                  activeCase.visuals.length >= 6
                    ? 'grid-cols-3 sm:grid-cols-6'
                    : activeCase.visuals.length === 5
                    ? 'grid-cols-5'
                    : activeCase.visuals.length === 2
                    ? 'grid-cols-2'
                    : 'grid-cols-3'
                }`}
              >
                {activeCase.visuals.map((v, vIdx) => {
                  const selected = vIdx === activeVisualIdx;
                  return (
                    <button
                      key={v.src}
                      type="button"
                      onClick={() => selectVisual(activeCase.id, vIdx)}
                      aria-label={pick(v.alt, locale)}
                      className={`group flex flex-col overflow-hidden rounded-xl border p-1 text-left transition-all ${
                        selected
                          ? 'border-accent bg-accent-soft ring-1 ring-accent/40'
                          : 'border-line bg-canvas hover:border-muted'
                      }`}
                    >
                      <img
                        src={v.src}
                        alt=""
                        loading="lazy"
                        className="aspect-[16/10] w-full rounded-lg object-cover object-top opacity-90 transition-opacity group-hover:opacity-100"
                      />
                      {v.shortLabel && (
                        <span
                          className={`mt-1 block truncate px-0.5 text-[10px] font-medium ${
                            selected ? 'text-accent' : 'text-muted'
                          }`}
                        >
                          {v.shortLabel}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      <ImageLightbox
        src={zoomOpen ? activeVisual.src : null}
        alt={pick(activeVisual.alt, locale)}
        caption={pick(activeVisual.caption, locale)}
        onClose={() => setZoomOpen(false)}
      />
    </section>
  );
}
