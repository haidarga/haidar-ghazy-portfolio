'use client';

import React from 'react';
import { ArrowRight } from '@phosphor-icons/react';
import { Reveal } from '@/components/Reveal';

const PILLARS = [
  {
    index: '01',
    title: 'Content that struggles to reach the right audience',
    description:
      'I develop content strategies and AI creator personas built around audience interests, platform behavior, and brand goals.',
    work: 'OPPO Diologtech · Cak Investment Club',
    href: '#work'
  },
  {
    index: '02',
    title: 'Attention that needs a clearer path to action',
    description:
      'I develop content angles that encourage audience conversations and support business goals, including inbound inquiries and membership sign-ups.',
    work: 'Cak Investment Club · ~60% DM-to-member',
    href: '#work'
  },
  {
    index: '03',
    title: 'Production workflows that take too long',
    description:
      'I build and refine AI-powered production workflows that help teams move from research and scripting to published content much faster.',
    work: 'CAKETING · CakVisual · CakAI Pro',
    href: '#systems'
  }
];

export function ValuePillarsSection() {
  return (
    <section className="border-b border-line py-16 lg:py-24">
      <div className="container-shell">
        <div className="mb-10 flex flex-col justify-between gap-4 border-b border-line pb-8 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">
              What I Help Businesses Solve
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-ink sm:text-5xl">
              The problems I help solve.
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-muted sm:text-base">
            I work across content strategy, creative production, and AI workflows—helping teams grow audiences, ship faster, and turn views into results.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
          {PILLARS.map((pillar, idx) => (
            <Reveal key={pillar.index} delayMs={idx * 60}>
              <a
                href={pillar.href}
                className="apple-surface apple-surface-interactive group flex h-full flex-col justify-between rounded-[28px] p-7"
              >
              <div>
                <span className="text-xs font-semibold text-accent">{pillar.index}</span>
                <h3 className="mt-3 font-display text-xl font-bold leading-snug text-ink sm:text-2xl">
                  {pillar.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted sm:text-[15px]">
                  {pillar.description}
                </p>
              </div>

              <div className="mt-6 flex items-center justify-between gap-2 border-t border-line pt-4 text-xs font-semibold text-ink/90">
                <span>{pillar.work}</span>
                <ArrowRight
                  size={15}
                  weight="bold"
                  className="shrink-0 text-accent transition-transform group-hover:translate-x-1"
                />
              </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
