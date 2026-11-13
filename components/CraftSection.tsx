'use client';

import React, { useRef } from 'react';
import {
  ArrowUpRight,
  CaretLeft,
  CaretRight,
  FilmSlate,
  Trophy
} from '@phosphor-icons/react';
import { craftAwards, craftWorks } from '@/content/craft';
import { pick } from '@/content/i18n';
import { useAppContext } from '@/components/AppProviders';

export function CraftSection() {
  const { locale } = useAppContext();
  const scrollerRef = useRef<HTMLDivElement | null>(null);

  const scrollDeck = (direction: 'prev' | 'next') => {
    const el = scrollerRef.current;
    if (!el) return;
    const step = Math.min(el.clientWidth * 0.8, 720);
    el.scrollBy({
      left: direction === 'next' ? step : -step,
      behavior: 'smooth'
    });
  };

  return (
    <section id="craft" className="border-b border-line bg-surface/30 py-20 lg:py-28">
      <div className="container-shell">
        <div className="mb-10 flex flex-col justify-between gap-6 border-b border-line pb-8 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">
              Film, 3D &amp; Direction
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-ink sm:text-5xl">
              Before AI systems, I directed on set.
            </h2>
          </div>

          <div className="flex flex-col gap-4 md:items-end">
            <p className="max-w-md text-sm leading-relaxed text-muted md:text-right">
              Five years of directing short films, 3D worlds, live stage projection mapping, and
              broadcast TV built the visual pacing and hook instincts behind every AI campaign.
            </p>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => scrollDeck('prev')}
                aria-label="Scroll filmstrip left"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line bg-surface text-ink transition-colors hover:border-accent hover:text-accent"
              >
                <CaretLeft size={18} weight="bold" />
              </button>
              <button
                type="button"
                onClick={() => scrollDeck('next')}
                aria-label="Scroll filmstrip right"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line bg-surface text-ink transition-colors hover:border-accent hover:text-accent"
              >
                <CaretRight size={18} weight="bold" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Apple-Style Interactive Horizontal Showcase (Smooth Snap + Prev/Next Controls) */}
      <div
        ref={scrollerRef}
        className="no-scrollbar w-full overflow-x-auto scroll-pl-4 px-4 sm:scroll-pl-8 sm:px-8 lg:scroll-pl-[max(2rem,calc((100vw-77.5rem)/2+2rem))] lg:px-[max(2rem,calc((100vw-77.5rem)/2+2rem))]"
      >
        <div className="flex w-max snap-x snap-mandatory gap-5 pb-4">
          {craftWorks.map((work) => (
            <a
              key={work.id}
              href={work.url}
              target="_blank"
              rel="noopener noreferrer"
              className="apple-surface apple-surface-interactive group flex w-[82vw] max-w-[360px] shrink-0 snap-start flex-col overflow-hidden rounded-[28px] sm:w-[350px]"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-elevated">
                <img
                  src={work.image}
                  alt={work.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/75 to-transparent"
                />
                <div className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-black/75 px-3 py-1 text-[11px] font-medium text-white backdrop-blur-md">
                  <FilmSlate size={12} weight="bold" className="text-accent" />
                  <span>{pick(work.medium, locale)}</span>
                </div>
                <span className="absolute bottom-3 right-3 rounded-full border border-white/15 bg-black/75 px-2.5 py-0.5 text-[11px] font-semibold text-white backdrop-blur-md">
                  {work.year}
                </span>
              </div>

              <div className="flex flex-1 flex-col justify-between p-6">
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-display text-lg font-bold leading-snug text-ink transition-colors group-hover:text-accent">
                      {work.title}
                    </h3>
                    <ArrowUpRight
                      size={16}
                      weight="bold"
                      className="mt-1 shrink-0 text-muted transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
                    />
                  </div>
                  <p className="mt-2 text-xs font-medium text-muted">
                    {pick(work.role, locale)}
                  </p>
                </div>

                {work.highlight && (
                  <p className="mt-4 rounded-xl border border-accent/25 bg-accent-soft px-3.5 py-2 text-xs font-medium text-accent">
                    {pick(work.highlight, locale)}
                  </p>
                )}
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Recognition & Festival Honors */}
      <div className="container-shell mt-10">
        <div className="apple-surface rounded-[24px] p-6">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.12em] text-accent">
            Recognition &amp; Festival Selections
          </p>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {craftAwards.map((award, idx) => (
              <div
                key={idx}
                className="flex items-start gap-2.5 rounded-2xl border border-line bg-canvas/70 px-4 py-3"
              >
                <Trophy size={17} weight="bold" className="mt-0.5 shrink-0 text-accent" />
                <p className="text-xs font-medium leading-relaxed text-ink/90 sm:text-sm">
                  {pick(award, locale)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
