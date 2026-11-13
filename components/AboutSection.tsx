'use client';

import React from 'react';
import { GraduationCap } from '@phosphor-icons/react';
import { aboutContent, siteIdentity } from '@/content/site-data';
import { pick } from '@/content/i18n';
import { useAppContext } from '@/components/AppProviders';
import { Reveal } from '@/components/Reveal';

export function AboutSection() {
  const { locale } = useAppContext();

  return (
    <section id="about" className="border-b border-line py-20 lg:py-28">
      <div className="container-shell">
        <Reveal>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center lg:gap-12">
          {/* Photography Collage (5 cols) */}
          <div className="space-y-4 lg:col-span-5">
            <div className="apple-surface overflow-hidden rounded-[28px]">
              <img
                src={siteIdentity.aboutPhoto}
                alt="Haidar Ghazy Arkan directing on set with camera"
                loading="lazy"
                className="aspect-[4/3] w-full object-cover"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="apple-surface overflow-hidden rounded-2xl">
                <img
                  src={siteIdentity.aboutCrewPhoto}
                  alt="Haidar directing crew behind the scenes"
                  loading="lazy"
                  className="aspect-[16/10] w-full object-cover"
                />
              </div>
              <div className="apple-surface flex flex-col justify-center rounded-2xl p-5">
                <span className="font-display text-3xl font-bold text-accent">3.86</span>
                <span className="mt-1 text-xs font-medium text-ink">
                  GPA Cum Laude · 3.5 Years
                </span>
              </div>
            </div>
          </div>

          {/* Story & Academic Foundation (7 cols) */}
          <div className="lg:col-span-7">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">
              About Haidar
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-ink sm:text-5xl">
              {pick(aboutContent.heading, locale)}
            </h2>
            <p className="mt-5 text-lg font-medium leading-relaxed text-ink/95">
              {pick(aboutContent.lead, locale)}
            </p>

            <div className="mt-4 space-y-4 text-sm leading-relaxed text-muted sm:text-base">
              {aboutContent.paragraphs.map((p, idx) => (
                <p key={idx}>{pick(p, locale)}</p>
              ))}
            </div>

            {/* Education Cards */}
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {aboutContent.education.map((edu) => (
                <div
                  key={edu.school}
                  className="apple-surface apple-surface-interactive rounded-2xl p-5"
                >
                  <div className="flex items-center justify-between gap-2">
                    <GraduationCap size={19} weight="bold" className="text-accent" />
                    <span className="text-xs font-medium text-muted">{edu.period}</span>
                  </div>
                  <h3 className="mt-2.5 font-display text-base font-bold text-ink">
                    {edu.school}
                  </h3>
                  <p className="mt-1 text-xs text-muted">{pick(edu.degree, locale)}</p>
                  {edu.gpa && (
                    <p className="mt-2 text-xs font-semibold text-accent">{edu.gpa}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
