'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, useMotionValue, useSpring } from 'motion/react';
import { ArrowDownRight, ArrowUpRight, MapPin, Play } from '@phosphor-icons/react';
import { heroCopy, heroMetrics, siteIdentity } from '@/content/site-data';
import { pick, pickMaybe } from '@/content/i18n';
import { useAppContext } from '@/components/AppProviders';
import { CountUp } from '@/components/CountUp';
import { MagneticButton } from '@/components/MagneticButton';
import { trackEvent } from '@/lib/analytics';

gsap.registerPlugin(ScrollTrigger);

export function HeroSection() {
  const { locale, reducedMotion, scrollToHash } = useAppContext();
  const sectionRef = useRef<HTMLElement | null>(null);
  const portraitWrapRef = useRef<HTMLDivElement | null>(null);
  const hasAnimatedRef = useRef(false);
  const [finePointer, setFinePointer] = useState(false);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const portraitX = useSpring(rawX, { stiffness: 160, damping: 24, mass: 0.6 });
  const portraitY = useSpring(rawY, { stiffness: 160, damping: 24, mass: 0.6 });

  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)');
    const sync = () => setFinePointer(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const portrait = portraitWrapRef.current;
    if (!section || reducedMotion) return;

    const ctx = gsap.context(() => {
      if (!hasAnimatedRef.current) {
        hasAnimatedRef.current = true;
        // Subtle GPU slide without opacity: 0 snap so LCP headline renders immediately on paint
        const words = section.querySelectorAll('.hero-word');
        if (words.length > 0) {
          gsap.from(words, {
            yPercent: 28,
            duration: 0.56,
            stagger: 0.022,
            ease: 'power3.out',
            clearProps: 'transform'
          });
        }
      }

      if (portrait && window.matchMedia('(min-width: 1024px)').matches) {
        gsap.to(portrait, {
          yPercent: -5,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: 'bottom top',
            scrub: true
          }
        });
      }
    }, section);

    return () => ctx.revert();
  }, [reducedMotion]);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!finePointer || reducedMotion || !sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const normX = (e.clientX - rect.left) / rect.width - 0.5;
    const normY = (e.clientY - rect.top) / rect.height - 0.5;
    rawX.set(normX * 10);
    rawY.set(normY * 8);
  };

  const handleMouseLeave = () => {
    rawX.set(0);
    rawY.set(0);
  };

  const headlineWords = pick(heroCopy.headline, locale).split(' ');

  return (
    <section
      id="hero"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative flex items-center overflow-hidden border-b border-line pb-12 pt-24 lg:min-h-[calc(100dvh-12px)] lg:pb-20 lg:pt-28"
    >
      {/* Subtle Apple-style studio ambient glow (warm-only, unified across light & dark) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 top-12 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(255,90,38,0.11)_0%,rgba(255,90,38,0.03)_45%,transparent_72%)]"
      />

      <div className="container-shell relative z-10 w-full">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-14">
          {/* Narrative & Key Impact (7 columns) */}
          <div className="lg:col-span-7">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-line bg-surface/80 px-4 py-1.5 text-xs font-medium text-muted apple-glass">
              <span className="h-2 w-2 rounded-full bg-accent" aria-hidden="true" />
              <span>{pick(heroCopy.eyebrow, locale)}</span>
            </div>

            <p className="mb-2 text-sm font-semibold tracking-tight text-accent sm:text-base">
              Hi, I’m Haidar Ghazy Arkan.
            </p>

            <h1 className="font-display text-[clamp(2.25rem,4.9vw,4.5rem)] font-bold leading-[1.03] tracking-[-0.035em] text-ink">
              {headlineWords.map((word, idx) => (
                <React.Fragment key={`${idx}-${word}`}>
                  <span className="word-mask">
                    <span className="word-inner hero-word">{word}</span>
                  </span>
                  {idx < headlineWords.length - 1 ? ' ' : ''}
                </React.Fragment>
              ))}
            </h1>

            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted sm:mt-6 sm:text-xl sm:leading-relaxed">
              {pick(heroCopy.subheadline, locale)}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3 sm:mt-8 sm:gap-4">
              <MagneticButton
                as="a"
                href="#work"
                cursorLabel="Explore"
                onClick={(e) => {
                  e.preventDefault();
                  trackEvent('cta_click', { location: 'hero', target: 'work' });
                  scrollToHash('#work');
                }}
                className="gap-2 rounded-full bg-accent px-7 py-3.5 text-sm font-semibold text-accent-ink shadow-lg shadow-accent/20 hover:bg-accent-hover sm:text-base"
              >
                <span>{pick(heroCopy.primaryCta, locale)}</span>
                <ArrowDownRight size={18} weight="bold" />
              </MagneticButton>

              <MagneticButton
                as="a"
                href={siteIdentity.cvPath}
                download="Haidar_Ghazy_Arkan_CV.pdf"
                onClick={() => trackEvent('cv_download', { location: 'hero' })}
                className="gap-2 rounded-full border border-line bg-surface/80 px-7 py-3.5 text-sm font-semibold text-ink apple-glass hover:border-accent/60 hover:text-accent sm:text-base"
              >
                <span>{pick(heroCopy.secondaryCta, locale)}</span>
                <ArrowUpRight size={18} weight="bold" />
              </MagneticButton>

              <button
                type="button"
                onClick={() => window.dispatchEvent(new CustomEvent('hga:replay-showreel'))}
                className="inline-flex min-h-[44px] items-center gap-1.5 rounded-full px-3 py-2 text-xs font-semibold text-muted transition-colors hover:text-accent sm:text-sm"
              >
                <Play size={14} weight="fill" className="text-accent" />
                <span>Watch Full Film (30s)</span>
              </button>
            </div>

            {/* 3 Open Typographic Hero Proof Numbers (No card monotony) */}
            <div className="mt-8 grid grid-cols-1 gap-4 border-t border-line pt-6 sm:mt-12 sm:grid-cols-3 sm:gap-6 sm:pt-8">
              {heroMetrics.map((metric, idx) => (
                <div
                  key={metric.id}
                  className={idx > 0 ? 'sm:border-l sm:border-line sm:pl-6' : ''}
                >
                  <div className="font-display text-3xl font-bold tracking-tight text-ink sm:text-[2.2rem]">
                    <CountUp
                      target={metric.target}
                      decimals={metric.decimals}
                      prefix={metric.prefix}
                      suffix={pickMaybe(metric.suffix, locale)}
                      isTransform={metric.isTransform}
                      displayEnd={metric.displayEnd ? pickMaybe(metric.displayEnd, locale) : undefined}
                    />
                  </div>
                  <p className="mt-1.5 text-sm font-medium leading-snug text-muted">
                    {pick(metric.label, locale)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Editorial Portrait + Integrated Visual Proof Strip (5 columns) */}
          <div className="lg:col-span-5">
            <div ref={portraitWrapRef} className="apple-surface mx-auto max-w-md overflow-hidden rounded-[28px] p-2.5 lg:ml-auto">
              {/* Main Portrait Frame */}
              <div className="relative overflow-hidden rounded-[20px]">
                <motion.div
                  style={
                    finePointer && !reducedMotion
                      ? { x: portraitX, y: portraitY }
                      : undefined
                  }
                  className="relative aspect-square w-full overflow-hidden bg-[#111115]"
                >
                  <img
                    src={siteIdentity.heroPortrait}
                    alt="Haidar Ghazy Arkan in his AI creative workspace"
                    width={960}
                    height={960}
                    loading="eager"
                    fetchPriority="high"
                    decoding="async"
                    className="h-full w-full scale-[1.03] object-cover object-center"
                  />
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/80 via-black/30 to-transparent"
                  />
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between rounded-xl border border-white/15 bg-black/75 px-3.5 py-2 text-[11px] font-medium text-white backdrop-blur-md">
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin size={14} weight="fill" className="text-accent" />
                      <span>Tangerang, Greater Jakarta · Strategy, AI &amp; Direction</span>
                    </span>
                  </div>
                </motion.div>
              </div>

              {/* Integrated 2-Frame Proof Strip */}
              <div className="mt-2.5 grid grid-cols-2 gap-2.5">
                <a
                  href="#oppo-diologtech"
                  className="group relative overflow-hidden rounded-2xl border border-line bg-canvas p-1.5 transition-colors hover:border-accent/50"
                >
                  <div className="aspect-[16/10] w-full overflow-hidden rounded-xl bg-black">
                    <img
                      src="/assets/projects/oppo-diologtech/oppo-tile-01.webp"
                      alt="OPPO Diologtech AI campaign frame"
                      className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </div>
                  <p className="mt-1.5 px-1 text-[11px] font-semibold leading-tight text-ink">
                    @diologtech
                  </p>
                  <p className="px-1 pb-0.5 text-[10px] text-muted">
                    7.9M account post views
                  </p>
                </a>

                <a
                  href="#craft"
                  className="group relative overflow-hidden rounded-2xl border border-line bg-canvas p-1.5 transition-colors hover:border-accent/50"
                >
                  <div className="aspect-[16/10] w-full overflow-hidden rounded-xl bg-black">
                    <img
                      src={siteIdentity.aboutPhoto}
                      alt="Haidar directing on set"
                      className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </div>
                  <p className="mt-1.5 px-1 text-[11px] font-semibold leading-tight text-ink">
                    Film Directing
                  </p>
                  <p className="px-1 pb-0.5 text-[10px] text-muted">
                    On-set narrative &amp; 3D
                  </p>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
