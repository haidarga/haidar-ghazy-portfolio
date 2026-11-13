'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Cpu, ArrowRight, MagnifyingGlassPlus, ShieldCheck } from '@phosphor-icons/react';
import { systemsData } from '@/content/systems';
import { pick, pickMaybe } from '@/content/i18n';
import { useAppContext } from '@/components/AppProviders';
import { CountUp } from '@/components/CountUp';
import { ImageLightbox } from '@/components/ImageLightbox';

gsap.registerPlugin(ScrollTrigger);

export function SystemsSection() {
  const { locale, reducedMotion } = useAppContext();
  const sectionRef = useRef<HTMLElement | null>(null);
  const [zoomSystem, setZoomSystem] = useState<{
    src: string;
    alt: string;
    caption: string;
  } | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || reducedMotion) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>('.system-card', section);
      cards.forEach((card) => {
        const line = card.querySelector<SVGPathElement>('.flow-svg-line');
        if (line) {
          const length = line.getTotalLength ? line.getTotalLength() : 280;
          gsap.set(line, { strokeDasharray: length, strokeDashoffset: length });
          gsap.to(line, {
            strokeDashoffset: 0,
            duration: 1.0,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 78%',
              once: true
            }
          });
        }

        const nodes = card.querySelectorAll<HTMLElement>('.flow-node');
        if (nodes.length > 0) {
          gsap.from(nodes, {
            y: 10,
            opacity: 0.75,
            duration: 0.28,
            stagger: 0.04,
            ease: 'power2.out',
            clearProps: 'transform,opacity',
            scrollTrigger: {
              trigger: card,
              start: 'top 96%',
              once: true
            }
          });
        }
      });
    }, section);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      id="systems"
      ref={sectionRef}
      className="border-b border-line bg-surface/40 py-20 lg:py-28"
    >
      <div className="container-shell">
        <div className="mb-12 flex flex-col justify-between gap-4 border-b border-line pb-8 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">
              Systems Built
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-ink sm:text-5xl">
              Internal AI studios, not one-off prompts.
            </h2>
          </div>
          <div className="apple-glass inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-xs font-medium text-muted">
            <ShieldCheck size={16} weight="bold" className="text-accent" />
            <span>Dual-Pass AI Quality Control for brand safety</span>
          </div>
        </div>

        <div className="space-y-10">
          {systemsData.map((sys, idx) => (
            <article
              key={sys.id}
              className="system-card apple-surface apple-surface-interactive overflow-hidden rounded-[28px] p-6 sm:p-8 lg:p-10"
            >
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center lg:gap-10">
                {/* Left Column: Narrative + Metrics + Pipeline Diagram */}
                <div className={idx % 2 === 1 ? 'lg:order-2 lg:col-span-6' : 'lg:col-span-6'}>
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="inline-flex items-center gap-1.5 rounded-md bg-accent-soft px-2.5 py-1 font-mono text-xs font-semibold text-accent">
                      <Cpu size={14} weight="bold" />
                      <span>{sys.name}</span>
                    </span>
                    <span className="font-mono text-xs text-muted">{pick(sys.tag, locale)}</span>
                  </div>

                  <h3 className="mt-4 font-display text-2xl font-bold leading-snug text-ink sm:text-3xl">
                    {pick(sys.headline, locale)}
                  </h3>

                  <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
                    {pick(sys.description, locale)}
                  </p>

                  {/* Oversized Metric Highlight */}
                  <div className="mt-6 flex flex-wrap items-baseline gap-x-6 gap-y-2 border-y border-line py-4">
                    <div className="font-display text-4xl font-bold tracking-tight text-accent sm:text-5xl">
                      <CountUp
                        target={sys.bigNumber}
                        prefix={sys.bigPrefix}
                        suffix={pickMaybe(sys.bigSuffix, locale)}
                      />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-ink">{pick(sys.bigLabel, locale)}</p>
                      <p className="font-mono text-xs text-muted">
                        {pick(sys.secondaryStat, locale)}
                      </p>
                    </div>
                  </div>

                  {/* Animated 4-Step Pipeline Flow Diagram */}
                  <div className="relative mt-6">
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 600 12"
                      preserveAspectRatio="none"
                      className="mb-3 hidden h-3 w-full sm:block"
                    >
                      <path
                        d="M 12 6 L 588 6"
                        stroke="var(--border-line)"
                        strokeWidth="2"
                        fill="none"
                      />
                      <path
                        className="flow-svg-line"
                        d="M 12 6 L 588 6"
                        stroke="var(--accent)"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        fill="none"
                      />
                    </svg>

                    <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                      {sys.flowNodes.map((node, nIdx) => (
                        <div
                          key={`${sys.id}-node-${nIdx}`}
                          className="flow-node relative rounded-xl border border-line bg-canvas p-3"
                        >
                          <span className="font-mono text-[10px] font-semibold text-accent">
                            0{nIdx + 1}
                          </span>
                          <p className="mt-1 text-xs font-semibold leading-tight text-ink">
                            {pick(node.label, locale)}
                          </p>
                          <p className="mt-1 font-mono text-[11px] leading-tight text-muted">
                            {pick(node.sub, locale)}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Technical Stack */}
                  <div className="mt-5 flex flex-wrap gap-2">
                    {sys.stack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-md border border-line bg-elevated/70 px-2.5 py-1 font-mono text-[11px] text-ink/90"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right Column: Clean UI Mockup or System Architecture Panel */}
                <div className={idx % 2 === 1 ? 'lg:order-1 lg:col-span-6' : 'lg:col-span-6'}>
                  {sys.screenshot ? (
                    <button
                      type="button"
                      onClick={() =>
                        setZoomSystem({
                          src: sys.screenshot!,
                          alt: sys.screenshotAlt ? pick(sys.screenshotAlt, locale) : sys.name,
                          caption: `${sys.name} · ${pick(sys.headline, locale)}`
                        })
                      }
                      className="group relative block w-full cursor-zoom-in overflow-hidden rounded-2xl border border-line bg-canvas p-3 text-left transition-transform duration-300 hover:-translate-y-1"
                    >
                      <div className="mb-2.5 flex items-center justify-between px-1 text-xs text-muted">
                        <span className="font-medium">{sys.name} · Workspace UI</span>
                        <span className="inline-flex items-center gap-1 font-medium text-accent">
                          <MagnifyingGlassPlus size={14} weight="bold" />
                          <span>Zoom</span>
                        </span>
                      </div>
                      <div className="overflow-hidden rounded-xl border border-line bg-elevated">
                        <img
                          src={sys.screenshot}
                          alt={sys.screenshotAlt ? pick(sys.screenshotAlt, locale) : sys.name}
                          loading="lazy"
                          className="aspect-[16/10] w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                        />
                      </div>
                    </button>
                  ) : sys.architecture ? (
                    <div className="rounded-2xl border border-line bg-canvas p-6 sm:p-8">
                      <div className="flex items-center justify-between border-b border-line pb-4">
                        <div>
                          <span className="font-mono text-xs uppercase tracking-[0.08em] text-accent">
                            {pick(sys.architecture.badge, locale)}
                          </span>
                          <h4 className="mt-1 font-display text-lg font-bold text-ink">
                            {pick(sys.architecture.title, locale)}
                          </h4>
                        </div>
                        <ArrowRight size={20} weight="bold" className="text-accent" />
                      </div>

                      <div className="mt-5 space-y-3 font-mono text-xs">
                        {sys.architecture.rows.map((row, rIdx) => (
                          <div
                            key={`${sys.id}-arch-${rIdx}`}
                            className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-line bg-surface px-4 py-3"
                          >
                            <span className="text-muted">{pick(row.key, locale)}</span>
                            <span className={row.highlight ? 'font-semibold text-accent' : 'text-ink'}>
                              {pick(row.value, locale)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <ImageLightbox
        src={zoomSystem?.src ?? null}
        alt={zoomSystem?.alt ?? ''}
        caption={zoomSystem?.caption}
        onClose={() => setZoomSystem(null)}
      />
    </section>
  );
}
