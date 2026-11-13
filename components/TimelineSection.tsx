'use client';

import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  ArrowRight,
  Briefcase,
  CheckCircle,
  Lightning,
  Sparkle
} from '@phosphor-icons/react';
import { experienceTimeline } from '@/content/experience';
import { pick } from '@/content/i18n';
import { useAppContext } from '@/components/AppProviders';

export function TimelineSection() {
  const { locale, reducedMotion } = useAppContext();
  const [selectedId, setSelectedId] = useState<string>(experienceTimeline[0].id);

  const activeRole =
    experienceTimeline.find((item) => item.id === selectedId) ??
    experienceTimeline[0];

  return (
    <section id="experience" className="border-b border-line py-20 lg:py-28">
      <div className="container-shell">
        <div className="mb-12 flex flex-col justify-between gap-4 border-b border-line pb-8 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">
              Career &amp; Impact
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-ink sm:text-5xl">
              What I owned, solved, and delivered.
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-muted sm:text-base">
            Select any role to inspect the exact job scope, the bottleneck on the table, and the measurable impact shipped.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
          {/* Left Role Selector Rail */}
          <div
            className="flex flex-col gap-3 lg:col-span-4"
            role="tablist"
            aria-label="Career roles"
          >
            {experienceTimeline.map((item) => {
              const isSelected = item.id === activeRole.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setSelectedId(item.id)}
                  className={`group flex w-full items-center justify-between gap-3 rounded-2xl border p-4 text-left transition-all duration-200 ${
                    isSelected
                      ? 'border-accent/60 bg-surface shadow-lg'
                      : 'border-line bg-surface/40 hover:border-white/20 hover:bg-surface/80'
                  }`}
                >
                  <div className="min-w-0">
                    <p
                      className={`text-xs font-semibold ${
                        isSelected ? 'text-accent' : 'text-muted'
                      }`}
                    >
                      {item.company} · {pick(item.period, locale)}
                    </p>
                    <p className="mt-1 truncate font-display text-base font-bold text-ink">
                      {pick(item.role, locale)}
                    </p>
                  </div>
                  <ArrowRight
                    size={16}
                    weight="bold"
                    className={`shrink-0 transition-transform ${
                      isSelected
                        ? 'translate-x-0.5 text-accent'
                        : 'text-muted group-hover:translate-x-0.5 group-hover:text-ink'
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Right Detailed Editorial Role Stage */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.article
                key={activeRole.id}
                initial={reducedMotion ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reducedMotion ? undefined : { opacity: 0, y: -8 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                className="apple-surface rounded-[28px] p-6 sm:p-10"
              >
                {/* Header */}
                <div className="flex flex-wrap items-start justify-between gap-4 border-b border-line pb-6">
                  <div>
                    <div className="inline-flex items-center gap-2 text-xs font-semibold text-accent">
                      <Briefcase size={15} weight="bold" />
                      <span>
                        {activeRole.company} · {activeRole.location}
                      </span>
                    </div>
                    <h3 className="mt-2 font-display text-2xl font-bold text-ink sm:text-4xl">
                      {pick(activeRole.role, locale)}
                    </h3>
                  </div>
                  <span className="rounded-full border border-line bg-canvas px-4 py-1.5 text-xs font-medium text-muted">
                    {pick(activeRole.period, locale)}
                  </span>
                </div>

                {/* Headline Impact Banner */}
                <div className="mt-6 rounded-2xl border border-accent/30 bg-accent/[0.06] p-5">
                  <p className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.08em] text-accent">
                    <Sparkle size={14} weight="fill" />
                    <span>Headline Impact</span>
                  </p>
                  <p className="mt-1.5 font-display text-lg font-bold leading-snug text-ink sm:text-xl">
                    {activeRole.headlineImpact}
                  </p>
                </div>

                {/* Job Description (What I Owned) */}
                <div className="mt-7">
                  <h4 className="text-xs font-semibold uppercase tracking-[0.1em] text-muted">
                    Job Description — What I Owned
                  </h4>
                  <ul className="mt-3 space-y-2.5">
                    {activeRole.jobDescription.map((line, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2.5 text-sm leading-relaxed text-ink/90 sm:text-base"
                      >
                        <CheckCircle
                          size={18}
                          weight="fill"
                          className="mt-1 shrink-0 text-accent"
                        />
                        <span>{line}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Challenge Solved + Value Brought */}
                <div className="mt-8 grid grid-cols-1 gap-6 border-t border-line pt-7 md:grid-cols-2">
                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-[0.1em] text-muted">
                      Problem Solved
                    </h4>
                    <p className="mt-2 text-sm leading-relaxed text-muted sm:text-[15px]">
                      {activeRole.problemSolved}
                    </p>
                  </div>

                  <div>
                    <h4 className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.1em] text-accent">
                      <Lightning size={14} weight="bold" />
                      <span>What I Brought to the Company</span>
                    </h4>
                    <p className="mt-2 text-sm leading-relaxed text-ink/90 sm:text-[15px]">
                      {activeRole.valueBrought}
                    </p>
                  </div>
                </div>

                {/* Key Outcome Pills */}
                <div className="mt-7 flex flex-wrap gap-2 border-t border-line pt-6">
                  {activeRole.highlights.map((hl) => (
                    <span
                      key={hl}
                      className="rounded-full border border-line bg-canvas px-3.5 py-1.5 text-xs font-medium text-ink"
                    >
                      {hl}
                    </span>
                  ))}
                </div>
              </motion.article>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
