'use client';

import React from 'react';
import { ArrowUpRight } from '@phosphor-icons/react';
import { Reveal } from '@/components/Reveal';

const FEATURED_PROJECTS = [
  {
    id: 'oppo',
    brand: 'OPPO Diologtech',
    category: 'Campaign Strategy & AI Video',
    summary:
      'Grew an AI tech-reviewer channel through comparison and review content built for short-form audiences.',
    metric: '7.9M post views',
    period: 'Apr 2025 – Mar 2026',
    image: '/assets/projects/oppo-diologtech/oppo-tile-01.webp',
    href: '#oppo-diologtech'
  },
  {
    id: 'cic',
    brand: 'Cak Investment Club',
    category: 'Content & Conversion',
    summary:
      'Dual AI persona slideshow strategy that sparked investing conversations and drove inbound membership inquiries.',
    metric: '~60% DM-to-member',
    period: '1.1M & 1.2M post views',
    image: '/assets/projects/cak-investment-club/cic-featured-cover.webp',
    href: '#cak-investment-club'
  },
  {
    id: 'systems',
    brand: 'CAKETING & CakVisual',
    category: 'Workflow & Tools',
    summary:
      'Connected research, scripting, and batch video generation so teams could move faster across client brands.',
    metric: '~5 days → ~5 hrs',
    period: 'Weekly KPI production',
    image: '/assets/projects/cakvisual/cakvisual-featured-crop.webp',
    href: '#systems'
  },
  {
    id: 'craft',
    brand: 'Hayo Loh! & Luminara',
    category: 'Film, VFX & Visual Direction',
    summary:
      'Worked across narrative short films, VFX, 3D visual mapping, and commercial projects across directing and production roles.',
    metric: 'Festival & Commercial',
    period: 'Directing, 3D & Motion',
    image: '/assets/projects/hayo-loh/still-04.webp',
    href: '#craft'
  }
];

export function FeaturedWorkSection() {
  return (
    <section className="border-b border-line bg-surface/20 py-16 lg:py-24">
      <div className="container-shell">
        <div className="mb-10 flex flex-col justify-between gap-4 border-b border-line pb-8 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">
              Selected Work
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-ink sm:text-5xl">
              Visual output &amp; measurable results.
            </h2>
          </div>
          <div className="flex flex-col items-start gap-3 md:items-end">
            <p className="max-w-md text-sm leading-relaxed text-muted sm:text-base md:text-right">
              A quick look at the campaigns, production systems, and visual direction before diving into the full case studies.
            </p>
            <a
              href="#gallery"
              className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface/80 px-4 py-2 text-xs font-semibold text-ink transition-colors hover:border-accent/60 hover:text-accent"
            >
              <span>View Creative Gallery</span>
              <ArrowUpRight size={14} weight="bold" />
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {FEATURED_PROJECTS.map((item, idx) => (
            <Reveal key={item.id} delayMs={idx * 55}>
              <a
                href={item.href}
                className="apple-surface apple-surface-interactive group flex h-full flex-col overflow-hidden rounded-[28px]"
              >
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-elevated">
                <img
                  src={item.image}
                  alt={item.brand}
                  loading="lazy"
                  className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/80 to-transparent"
                />
                <span className="absolute bottom-3 left-4 rounded-full border border-white/15 bg-black/75 px-3 py-1 text-xs font-bold text-white backdrop-blur-md">
                  {item.metric}
                </span>
              </div>

              <div className="flex flex-1 flex-col justify-between p-6">
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-semibold text-accent">
                      {item.category}
                    </span>
                    <ArrowUpRight
                      size={16}
                      weight="bold"
                      className="text-muted transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
                    />
                  </div>
                  <h3 className="mt-2 font-display text-2xl font-bold text-ink">
                    {item.brand}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {item.summary}
                  </p>
                </div>

                <p className="mt-5 border-t border-line pt-3 text-xs font-medium text-ink/80">
                  {item.period} · View Case Study
                </p>
              </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
