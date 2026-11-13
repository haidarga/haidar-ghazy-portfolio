'use client';

import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Play, Robot, ArrowUpRight, FilmStrip, Images } from '@phosphor-icons/react';
import { galleryBrands, galleryItems, type BrandVisualTone, type GalleryItem } from '@/content/gallery';
import { pick } from '@/content/i18n';
import { useAppContext } from '@/components/AppProviders';
import { GalleryLightbox } from '@/components/GalleryLightbox';
import { trackEvent } from '@/lib/analytics';

const TONE_SURFACE: Record<BrandVisualTone, string> = {
  accent: 'from-accent/20 via-surface to-canvas',
  rose: 'from-rose-500/20 via-surface to-canvas',
  sky: 'from-sky-500/20 via-surface to-canvas',
  emerald: 'from-emerald-500/20 via-surface to-canvas'
};

function EditorialCampaignCover({ item, locale }: { item: GalleryItem; locale: 'id' | 'en' }) {
  const toneClass = TONE_SURFACE[item.tone ?? 'accent'];
  const isSlideshow = item.format === 'tiktok-slideshow';

  return (
    <div
      className={`relative flex h-full w-full flex-col justify-between bg-gradient-to-br ${toneClass} p-5`}
    >
      {/* Subtle architectural grid lines */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            'linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)',
          backgroundSize: '28px 28px'
        }}
      />

      <div className="relative z-10 mt-10 flex flex-1 flex-col items-start justify-center">
        <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-canvas/85 text-accent">
          {isSlideshow ? <Images size={20} weight="duotone" /> : <FilmStrip size={20} weight="duotone" />}
        </div>
        <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-muted">
          {item.brandName}
        </p>
        <p className="mt-1 font-display text-lg font-bold leading-snug text-ink">
          {pick(item.title, locale)}
        </p>
      </div>

      <div className="relative z-10 pr-11">
        <span className="inline-block rounded-md border border-line bg-canvas/80 px-2.5 py-1 font-mono text-[10px] text-muted">
          {isSlideshow
            ? locale === 'id'
              ? 'Buka Slideshow TikTok'
              : 'Open TikTok Slideshow'
            : locale === 'id'
            ? 'Putar via Google Drive'
            : 'Stream via Google Drive'}
        </span>
      </div>
    </div>
  );
}

export function WorkGallerySection() {
  const { locale, reducedMotion } = useAppContext();
  const [selectedBrand, setSelectedBrand] = useState<string>('featured');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const brandCounts = useMemo(() => {
    const counts: Record<string, number> = {
      featured: galleryItems.filter((item) => item.featured).length,
      all: galleryItems.length
    };
    for (const item of galleryItems) {
      counts[item.brandId] = (counts[item.brandId] ?? 0) + 1;
    }
    return counts;
  }, []);

  const filteredItems = useMemo(() => {
    if (selectedBrand === 'featured') {
      return galleryItems.filter((item) => item.featured);
    }
    if (selectedBrand === 'all') return galleryItems;
    return galleryItems.filter((item) => item.brandId === selectedBrand);
  }, [selectedBrand]);

  const handleFilterChange = (brandId: string) => {
    setSelectedBrand(brandId);
    setLightboxIndex(null);
    window.requestAnimationFrame(() => ScrollTrigger.refresh());
  };

  return (
    <section id="gallery" className="border-b border-line py-20 lg:py-28">
      <div className="container-shell">
        <div className="mb-8 flex flex-col justify-between gap-4 border-b border-line pb-8 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">
              AI Video &amp; Campaign Gallery
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-ink sm:text-5xl">
              Selected work from 100+ AI videos &amp; slideshows.
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-muted">
            Curated highlights across 6 brands—just a sample of over 100+ AI videos, UGC reels, and
            multi-persona slideshows shipped. Click any card to preview or open on platform.
          </p>
        </div>

        {/* Scale Callout Strip */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-line bg-surface/75 px-4 py-3">
          <div className="flex items-center gap-2.5 text-xs text-ink sm:text-sm">
            <span className="inline-flex items-center rounded-md bg-accent-soft px-2 py-0.5 font-mono text-[11px] font-semibold text-accent">
              100+ AI Videos Shipped
            </span>
            <span className="text-muted">
              Showing {filteredItems.length} featured examples—many more produced across active brand
              campaigns.
            </span>
          </div>
          <span className="font-mono text-[11px] text-subtle">
            TikTok · Instagram · Google Drive
          </span>
        </div>

        {/* Brand Filter Pills (Horizontal swipe strip on narrow mobile, wrapping row on >= sm) */}
        <div
          role="tablist"
          aria-label={locale === 'id' ? 'Filter brand galeri' : 'Filter gallery by brand'}
          className="no-scrollbar -mx-4 mb-8 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 sm:pb-0"
        >
          {galleryBrands.map((brand) => {
            const active = selectedBrand === brand.id;
            const count = brandCounts[brand.id] ?? 0;
            return (
              <button
                key={brand.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => handleFilterChange(brand.id)}
                className={`inline-flex min-h-[40px] shrink-0 items-center gap-2 rounded-full px-4 py-2 text-xs font-medium transition-colors sm:text-sm ${
                  active
                    ? 'bg-accent font-semibold text-accent-ink'
                    : 'border border-line bg-surface text-muted hover:border-accent/60 hover:text-ink'
                }`}
              >
                <span>{pick(brand.label, locale)}</span>
                <span
                  className={`font-mono text-[11px] ${
                    active ? 'opacity-80' : 'text-subtle'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Gallery Grid (4-col editorial vertical rhythm for 9:16/3:4 covers) */}
        <div
          className={`grid grid-cols-1 gap-5 sm:grid-cols-2 ${
            selectedBrand === 'featured'
              ? 'lg:grid-cols-3'
              : 'md:grid-cols-3 lg:grid-cols-4'
          }`}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedBrand}
              initial={reducedMotion ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reducedMotion ? undefined : { opacity: 0, y: -4 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="contents"
            >
              {filteredItems.map((item, idx) => (
                <button
                  key={item.id}
                  type="button"
                  data-cursor-label={locale === 'id' ? 'Putar' : 'Preview'}
                  onClick={() => {
                    trackEvent('lightbox_open', { id: item.id, brand: item.brandId });
                    setLightboxIndex(idx);
                  }}
                  className="apple-surface apple-surface-interactive group relative flex flex-col overflow-hidden rounded-[24px] text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-elevated">
                  {item.poster ? (
                    <>
                      <img
                        src={item.poster}
                        alt={pick(item.title, locale)}
                        loading="lazy"
                        className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      />
                      <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/80 via-black/30 to-transparent"
                      />
                    </>
                  ) : (
                    <EditorialCampaignCover item={item} locale={locale} />
                  )}

                  <div className="absolute left-3 top-3 z-20 flex flex-wrap gap-1.5">
                    <span className="rounded-md bg-black/75 px-2.5 py-1 font-mono text-[10px] font-medium text-white backdrop-blur-sm">
                      {pick(item.formatLabel, locale)}
                    </span>
                    {item.aiFramed && (
                      <span className="inline-flex items-center gap-1 rounded-md bg-accent px-2 py-1 font-mono text-[10px] font-semibold text-accent-ink">
                        <Robot size={11} weight="bold" />
                        <span>AI</span>
                      </span>
                    )}
                  </div>

                  <div className="absolute bottom-3 right-3 z-20 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-black shadow-md transition-transform duration-300 group-hover:scale-110">
                    <Play size={16} weight="fill" />
                  </div>
                </div>

                <div className="flex flex-1 flex-col justify-between p-4">
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-mono text-[11px] font-medium text-accent">
                        {item.brandName}
                      </span>
                      <ArrowUpRight
                        size={15}
                        weight="bold"
                        className="text-muted transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
                      />
                    </div>
                    <h3 className="mt-1.5 font-display text-base font-bold leading-snug text-ink">
                      {pick(item.title, locale)}
                    </h3>
                    {item.role && (
                      <p className="mt-1.5 text-xs leading-snug text-muted">
                        Role: {item.role}
                      </p>
                    )}
                  </div>

                  {item.creator && (
                    <p className="mt-3 text-xs font-medium text-ink/70">{item.creator}</p>
                  )}
                </div>
                </button>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <GalleryLightbox
        items={filteredItems}
        activeIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onSelectIndex={setLightboxIndex}
      />
    </section>
  );
}
