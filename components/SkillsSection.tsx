'use client';

import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { CheckCircle, Sparkle } from '@phosphor-icons/react';
import { signatureSkills, skillGroups } from '@/content/skills';
import { pick } from '@/content/i18n';
import { useAppContext } from '@/components/AppProviders';
import { trackEvent } from '@/lib/analytics';

export function SkillsSection() {
  const { locale, reducedMotion } = useAppContext();
  const [activeGroupId, setActiveGroupId] = useState<string>(skillGroups[0].id);

  const activeGroup =
    skillGroups.find((g) => g.id === activeGroupId) ?? skillGroups[0];

  const handleSelectGroup = (id: string) => {
    setActiveGroupId(id);
    trackEvent('skill_select', { group: id });
  };

  return (
    <section id="skills" className="border-b border-line bg-surface/25 py-20 lg:py-28">
      <div className="container-shell">
        <div className="mb-12 flex flex-col justify-between gap-4 border-b border-line pb-8 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">
              Capabilities
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-ink sm:text-5xl">
              What I do best.
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-muted sm:text-base">
            Four core strengths backed by live campaigns, followed by an interactive breakdown of each skill pillar.
          </p>
        </div>

        {/* 4 Standout Core Strengths — Clean Apple Bento Tiles */}
        <div className="mb-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {signatureSkills.map((item) => (
            <article
              key={item.id}
              className="apple-surface apple-surface-interactive flex flex-col justify-between rounded-[24px] p-6"
            >
              <div>
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent">
                  <Sparkle size={13} weight="fill" />
                  <span>{item.badge}</span>
                </span>
                <h3 className="mt-3 font-display text-xl font-bold leading-snug text-ink">
                  {item.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-muted">
                  {item.summary}
                </p>
              </div>

              <div className="mt-6 border-t border-line pt-4">
                <p className="text-xs font-semibold text-ink">{item.proof}</p>
              </div>
            </article>
          ))}
        </div>

        {/* Interactive Segmented Capability Explorer (Zero Nested Box Clutter) */}
        <div className="apple-surface rounded-[28px] p-6 sm:p-10">
          <div className="flex flex-col justify-between gap-4 border-b border-line pb-6 lg:flex-row lg:items-center">
            <div>
              <h3 className="font-display text-2xl font-bold text-ink">
                Explore by Skill Pillar
              </h3>
              <p className="mt-1 text-sm text-muted">
                {activeGroup.subtitle}
              </p>
            </div>

            <div
              className="flex flex-wrap gap-2 rounded-2xl border border-line bg-canvas p-1.5"
              role="tablist"
              aria-label="Skill categories"
            >
              {skillGroups.map((group) => {
                const active = activeGroupId === group.id;
                return (
                  <button
                    key={group.id}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => handleSelectGroup(group.id)}
                    className={`rounded-xl px-4 py-2 text-xs font-semibold transition-all sm:text-sm ${
                      active
                        ? 'bg-accent text-accent-ink shadow-sm'
                        : 'text-muted hover:text-ink'
                    }`}
                  >
                    {pick(group.title, locale)}
                  </button>
                );
              })}
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeGroup.id}
              initial={reducedMotion ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reducedMotion ? undefined : { opacity: 0, y: -6 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 grid grid-cols-1 gap-x-10 gap-y-7 md:grid-cols-2"
            >
              {activeGroup.items.map((skill) => (
                <div key={skill.name} className="flex items-start gap-3">
                  <CheckCircle
                    size={20}
                    weight="fill"
                    className="mt-0.5 shrink-0 text-accent"
                  />
                  <div>
                    <h4 className="font-display text-lg font-bold text-ink">
                      {skill.name}
                    </h4>
                    <p className="mt-1 text-sm leading-relaxed text-muted">
                      {skill.description}
                    </p>
                    <p className="mt-2 text-xs font-medium text-ink/75">
                      Shipped in: {skill.usedIn.join(' · ')}
                    </p>
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
