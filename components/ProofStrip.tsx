'use client';

import React from 'react';
import { proofBrands } from '@/content/site-data';
import { pick } from '@/content/i18n';
import { useAppContext } from '@/components/AppProviders';
import { Reveal } from '@/components/Reveal';

export function ProofStrip() {
  const { locale } = useAppContext();

  return (
    <section
      aria-label="Brands worked with"
      className="border-b border-line bg-surface/40 py-6"
    >
      <div className="container-shell">
        <Reveal>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {proofBrands.map((item) => (
            <div
              key={item.id}
              className="apple-surface apple-surface-interactive flex flex-col justify-between rounded-2xl px-4 py-3.5"
            >
              <p className="font-display text-sm font-bold tracking-tight text-ink">
                {item.name}
              </p>
              <p className="mt-1 text-xs font-medium text-muted">
                {pick(item.metric, locale)}
              </p>
            </div>
          ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
