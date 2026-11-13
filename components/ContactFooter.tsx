'use client';

import React, { useState } from 'react';
import {
  Check,
  Copy,
  DownloadSimple,
  EnvelopeSimple,
  InstagramLogo,
  LinkedinLogo
} from '@phosphor-icons/react';
import { contactContent, siteIdentity } from '@/content/site-data';
import { pick } from '@/content/i18n';
import { useAppContext } from '@/components/AppProviders';
import { MagneticButton } from '@/components/MagneticButton';
import { Reveal } from '@/components/Reveal';
import { trackEvent } from '@/lib/analytics';

export function ContactFooter() {
  const { locale } = useAppContext();
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(siteIdentity.email);
      setCopied(true);
      trackEvent('cta_click', { location: 'footer', target: 'copy_email' });
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      window.location.href = `mailto:${siteIdentity.email}`;
    }
  };

  return (
    <footer id="contact" className="bg-surface/35 py-20 lg:py-24">
      <div className="container-shell">
        <Reveal>
          <div className="apple-surface relative overflow-hidden rounded-[32px] p-8 sm:p-12 lg:p-14">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(255,90,38,0.16),transparent_70%)]"
          />

          <p className="relative text-xs font-semibold uppercase tracking-[0.14em] text-accent">
            {pick(contactContent.eyebrow, locale)}
          </p>

          <div className="relative mt-5 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <h2 className="font-display text-[clamp(2.5rem,5.5vw,4.75rem)] font-bold leading-[1.02] tracking-[-0.03em] text-ink">
                {pick(contactContent.heading, locale)}
              </h2>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted sm:text-base">
                {pick(contactContent.sub, locale)}
              </p>
            </div>

            <div className="flex flex-wrap gap-3 lg:col-span-5 lg:justify-end">
              <MagneticButton
                as="a"
                href={siteIdentity.cvPath}
                download="Haidar_Ghazy_Arkan_CV.pdf"
                onClick={() => trackEvent('cv_download', { location: 'footer' })}
                className="gap-2 rounded-full bg-accent px-7 py-3.5 text-sm font-semibold text-accent-ink shadow-lg shadow-accent/20 hover:bg-accent-hover"
              >
                <DownloadSimple size={18} weight="bold" />
                <span>{pick(contactContent.downloadCvLabel, locale)}</span>
              </MagneticButton>

              <MagneticButton
                as="button"
                onClick={handleCopyEmail}
                className="gap-2 rounded-full border border-line bg-canvas px-7 py-3.5 text-sm font-semibold text-ink hover:border-accent hover:text-accent"
              >
                {copied ? <Check size={18} weight="bold" /> : <Copy size={18} weight="bold" />}
                <span>
                  {copied
                    ? pick(contactContent.copiedEmailLabel, locale)
                    : pick(contactContent.copyEmailLabel, locale)}
                </span>
              </MagneticButton>
            </div>
          </div>

          {/* Direct Contact Channels */}
          <div className="relative mt-10 grid grid-cols-1 gap-3 border-t border-line pt-8 sm:grid-cols-3">
            <a
              href={`mailto:${siteIdentity.email}`}
              onClick={() => trackEvent('cta_click', { location: 'footer', target: 'mailto' })}
              className="flex items-center gap-3 rounded-2xl border border-line bg-canvas px-4 py-3.5 text-sm font-medium text-ink transition-colors hover:border-accent hover:text-accent"
            >
              <EnvelopeSimple size={20} weight="bold" className="text-accent" />
              <span className="truncate">{siteIdentity.email}</span>
            </a>

            <a
              href={siteIdentity.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent('cta_click', { location: 'footer', target: 'linkedin' })}
              className="flex items-center gap-3 rounded-2xl border border-line bg-canvas px-4 py-3.5 text-sm font-medium text-ink transition-colors hover:border-accent hover:text-accent"
            >
              <LinkedinLogo size={20} weight="bold" className="text-accent" />
              <span className="truncate">{siteIdentity.linkedinHandle}</span>
            </a>

            <a
              href={siteIdentity.instagram}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent('cta_click', { location: 'footer', target: 'instagram' })}
              className="flex items-center gap-3 rounded-2xl border border-line bg-canvas px-4 py-3.5 text-sm font-medium text-ink transition-colors hover:border-accent hover:text-accent"
            >
              <InstagramLogo size={20} weight="bold" className="text-accent" />
              <span className="truncate">{siteIdentity.instagramHandle}</span>
            </a>
          </div>
          </div>
        </Reveal>

        {/* Clean Colophon */}
        <div className="mt-8 flex flex-col justify-between gap-2 text-xs text-muted sm:flex-row sm:items-center">
          <p>
            © {new Date().getFullYear()} {siteIdentity.name} · {siteIdentity.location}
          </p>
          <p>AI-Native Growth Marketer &amp; Content Strategist</p>
        </div>
      </div>
    </footer>
  );
}
