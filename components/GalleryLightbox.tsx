'use client';

import React, { useEffect, useRef, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  ArrowSquareOut,
  FilmStrip,
  Images,
  PlayCircle,
  Robot,
  X
} from '@phosphor-icons/react';
import type { GalleryItem } from '@/content/gallery';
import { pick } from '@/content/i18n';
import { useAppContext } from '@/components/AppProviders';

interface GalleryLightboxProps {
  items: GalleryItem[];
  activeIndex: number | null;
  onClose: () => void;
  onSelectIndex: (index: number) => void;
}

export function GalleryLightbox({
  items,
  activeIndex,
  onClose,
  onSelectIndex
}: GalleryLightboxProps) {
  const { locale, setScrollLocked } = useAppContext();
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const [loadEmbed, setLoadEmbed] = useState<boolean>(false);

  const isOpen = activeIndex !== null && items[activeIndex] !== undefined;
  const activeItem = isOpen ? items[activeIndex] : null;

  // Reset on-demand embed toggle when switching slides.
  useEffect(() => {
    setLoadEmbed(false);
  }, [activeIndex]);

  // Lock background scroll, manage focus return, and handle keyboard navigation.
  useEffect(() => {
    if (!isOpen) {
      setScrollLocked(false);
      return;
    }

    previousFocusRef.current = document.activeElement as HTMLElement | null;
    setScrollLocked(true);

    const dialogEl = dialogRef.current;
    if (dialogEl) {
      const closeBtn = dialogEl.querySelector<HTMLElement>('[data-lightbox-close]');
      closeBtn?.focus();
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }

      if (e.key === 'ArrowRight' && activeIndex !== null && items.length > 1) {
        e.preventDefault();
        onSelectIndex((activeIndex + 1) % items.length);
        return;
      }

      if (e.key === 'ArrowLeft' && activeIndex !== null && items.length > 1) {
        e.preventDefault();
        onSelectIndex((activeIndex - 1 + items.length) % items.length);
        return;
      }

      // Focus trap inside the open lightbox dialog.
      if (e.key === 'Tab' && dialogEl) {
        const focusables = dialogEl.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), iframe, [tabindex]:not([tabindex="-1"])'
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      setScrollLocked(false);
      previousFocusRef.current?.focus?.();
    };
  }, [isOpen, activeIndex, items.length, onClose, onSelectIndex, setScrollLocked]);

  if (!isOpen || !activeItem || activeIndex === null) return null;

  const canEmbed = Boolean(activeItem.embedUrl);
  const isVerticalReel =
    activeItem.format === 'tiktok-video' ||
    activeItem.format === 'instagram-reel' ||
    activeItem.format === 'drive-video';

  return (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center bg-canvas/90 p-4 backdrop-blur-md sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={pick(activeItem.title, locale)}
      onClick={onClose}
    >
      <div
        ref={dialogRef}
        onClick={(e) => e.stopPropagation()}
        className="relative flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-line bg-surface shadow-2xl"
      >
        {/* Top Bar */}
        <div className="flex items-center justify-between gap-4 border-b border-line px-5 py-3.5">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-xs font-semibold text-accent">
                {activeItem.brandName}
              </span>
              {activeItem.aiFramed && (
                <span className="inline-flex items-center gap-1 rounded-full border border-accent/40 bg-accent-soft px-2 py-0.5 font-mono text-[10px] text-accent">
                  <Robot size={11} weight="bold" />
                  <span>{pick(activeItem.formatLabel, locale)}</span>
                </span>
              )}
            </div>
            <h3 className="truncate font-display text-lg font-bold text-ink">
              {pick(activeItem.title, locale)}
            </h3>
          </div>

          <button
            type="button"
            data-lightbox-close
            onClick={onClose}
            aria-label={locale === 'id' ? 'Tutup pratinjau' : 'Close preview'}
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line bg-canvas text-ink transition-colors hover:border-accent hover:text-accent"
          >
            <X size={18} weight="bold" />
          </button>
        </div>

        {/* Media Stage */}
        <div className="relative flex-1 overflow-y-auto bg-canvas p-4 sm:p-6">
          {loadEmbed && activeItem.embedUrl ? (
            <div
              className={`mx-auto overflow-hidden rounded-xl border border-line bg-elevated ${
                isVerticalReel
                  ? 'aspect-[9/16] max-h-[62vh] w-full max-w-[350px]'
                  : 'aspect-video w-full max-w-2xl'
              }`}
            >
              <iframe
                src={activeItem.embedUrl}
                title={pick(activeItem.title, locale)}
                allow="autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
                className="h-full w-full border-0"
              />
            </div>
          ) : activeItem.poster ? (
            <div className="relative mx-auto flex max-w-md flex-col items-center">
              <div className="relative w-full overflow-hidden rounded-xl border border-line bg-elevated">
                <img
                  src={activeItem.poster}
                  alt={pick(activeItem.title, locale)}
                  className="max-h-[54vh] w-full bg-canvas object-contain"
                />
              </div>
            </div>
          ) : (
            <div className="mx-auto flex max-w-lg flex-col items-center rounded-xl border border-line bg-surface px-6 py-10 text-center">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-line bg-canvas text-accent">
                {activeItem.format === 'tiktok-slideshow' ? (
                  <Images size={24} weight="duotone" />
                ) : (
                  <FilmStrip size={24} weight="duotone" />
                )}
              </div>
              <span className="font-mono text-xs uppercase tracking-[0.1em] text-accent">
                {activeItem.brandName} · {pick(activeItem.formatLabel, locale)}
              </span>
              <h4 className="mt-2 font-display text-xl font-bold text-ink">
                {pick(activeItem.title, locale)}
              </h4>
              {activeItem.creator && (
                <p className="mt-1 font-mono text-xs text-muted">{activeItem.creator}</p>
              )}
              <p className="mt-4 max-w-sm text-xs leading-relaxed text-muted">
                {canEmbed
                  ? locale === 'id'
                    ? 'Aset video tersimpan di Google Drive. Klik "Putar Embed" untuk memutar langsung atau buka di tab baru.'
                    : 'Video asset is hosted on Google Drive. Click "Load Player" to stream inline or open in a new tab.'
                  : locale === 'id'
                  ? 'Slideshow TikTok tidak mendukung embed iframe eksternal. Buka langsung di TikTok untuk menelusuri seluruh slide.'
                  : 'TikTok photo slideshows do not support external iframe embeds. Open directly on TikTok to swipe through all slides.'}
              </p>
            </div>
          )}

          {/* Action Bar & Embed Fallback Recovery */}
          <div className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-line bg-surface p-4">
            <div className="min-w-0 flex-1">
              <p className="font-mono text-xs text-muted">
                {pick(activeItem.formatLabel, locale)}
                {activeItem.creator ? ` · ${activeItem.creator}` : ''}
              </p>
              <p className="mt-1 text-xs text-muted">
                {loadEmbed
                  ? locale === 'id'
                    ? 'Player diblokir browser atau butuh izin login Drive? Gunakan tautan langsung di samping.'
                    : 'Player blocked by browser settings or Drive permissions? Open the direct link on the right.'
                  : canEmbed
                  ? locale === 'id'
                    ? 'Muat player embed di jendela ini atau buka tautan sumber.'
                    : 'Load the inline embed player or open the source link.'
                  : locale === 'id'
                  ? 'Format slideshow dibuka langsung di platform TikTok.'
                  : 'Slideshow posts open natively on TikTok.'}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              {canEmbed && (
                <button
                  type="button"
                  onClick={() => setLoadEmbed((prev) => !prev)}
                  className="inline-flex items-center gap-2 rounded-full border border-accent bg-accent-soft px-4 py-2 text-xs font-semibold text-accent transition-colors hover:bg-accent hover:text-accent-ink"
                >
                  <PlayCircle size={16} weight="bold" />
                  <span>
                    {loadEmbed
                      ? locale === 'id'
                        ? 'Tutup Player'
                        : 'Hide Player'
                      : locale === 'id'
                      ? 'Putar Embed'
                      : 'Load Player'}
                  </span>
                </button>
              )}

              <a
                href={activeItem.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-xs font-semibold text-accent-ink transition-colors hover:bg-accent-hover"
              >
                <span>{locale === 'id' ? 'Tonton di platform' : 'Open on platform'}</span>
                <ArrowSquareOut size={15} weight="bold" />
              </a>
            </div>
          </div>
        </div>

        {/* Footer Pagination */}
        <div className="flex items-center justify-between border-t border-line px-5 py-3 font-mono text-xs text-muted">
          <button
            type="button"
            onClick={() => onSelectIndex((activeIndex - 1 + items.length) % items.length)}
            className="inline-flex items-center gap-1.5 rounded-md border border-line bg-canvas px-3 py-1.5 text-ink transition-colors hover:border-accent hover:text-accent"
          >
            <ArrowLeft size={14} weight="bold" />
            <span>{locale === 'id' ? 'Sebelumnya' : 'Prev'}</span>
          </button>

          <span>
            {activeIndex + 1} / {items.length}
          </span>

          <button
            type="button"
            onClick={() => onSelectIndex((activeIndex + 1) % items.length)}
            className="inline-flex items-center gap-1.5 rounded-md border border-line bg-canvas px-3 py-1.5 text-ink transition-colors hover:border-accent hover:text-accent"
          >
            <span>{locale === 'id' ? 'Berikutnya' : 'Next'}</span>
            <ArrowRight size={14} weight="bold" />
          </button>
        </div>
      </div>
    </div>
  );
}
