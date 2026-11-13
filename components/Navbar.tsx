'use client';

import React, { useEffect, useRef, useState } from 'react';
import { List, Moon, Sun, X, ArrowUpRight } from '@phosphor-icons/react';
import { useAppContext } from '@/components/AppProviders';
import { trackEvent } from '@/lib/analytics';

const NAV_ITEMS = [
  { id: 'work', href: '#work', label: { id: 'Studi Kasus', en: 'Case Studies' } },
  { id: 'systems', href: '#systems', label: { id: 'Sistem AI', en: 'AI Systems' } },
  { id: 'gallery', href: '#gallery', label: { id: 'Galeri', en: 'Gallery' } },
  { id: 'craft', href: '#craft', label: { id: 'Craft', en: 'Craft' } },
  { id: 'about', href: '#about', label: { id: 'Tentang', en: 'About' } }
];

export function Navbar() {
  const { locale, theme, toggleTheme, scrollToHash, setScrollLocked } =
    useAppContext();

  const [activeId, setActiveId] = useState<string>('work');
  const [hidden, setHidden] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const progressBarRef = useRef<HTMLDivElement | null>(null);

  // Track scroll progress (GPU scaleX) and hide/reveal direction via rAF with minimal state churn.
  useEffect(() => {
    let lastY = window.scrollY;
    let rafId = 0;

    const update = () => {
      rafId = 0;
      const y = window.scrollY;
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      if (progressBarRef.current) {
        progressBarRef.current.style.transform = `scaleX(${Math.min(1, Math.max(0, y / maxScroll))})`;
      }

      const nextScrolled = y > 24;
      setScrolled((prev) => (prev === nextScrolled ? prev : nextScrolled));

      if (drawerOpen || y < 80) {
        setHidden((prev) => (prev ? false : prev));
      } else if (y > lastY + 10) {
        setHidden((prev) => (prev ? prev : true));
      } else if (y < lastY - 10) {
        setHidden((prev) => (prev ? false : prev));
      }
      lastY = y;
    };

    const onScroll = () => {
      if (!rafId) {
        rafId = window.requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      if (rafId) window.cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', onScroll);
    };
  }, [drawerOpen]);

  // Observe sections to highlight the active navigation link.
  useEffect(() => {
    const sections = NAV_ITEMS.map((item) => document.getElementById(item.id)).filter(
      Boolean
    ) as HTMLElement[];
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: '-38% 0px -50% 0px', threshold: 0.01 }
    );

    sections.forEach((sec) => observer.observe(sec));
    return () => observer.disconnect();
  }, []);

  // Lock background scroll and listen for Escape when mobile drawer is open.
  useEffect(() => {
    setScrollLocked(drawerOpen);
    if (!drawerOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setDrawerOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [drawerOpen, setScrollLocked]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setDrawerOpen(false);
    scrollToHash(href);
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 h-[68px] transition-transform duration-300 ${
          hidden ? '-translate-y-full' : 'translate-y-0'
        } ${
          scrolled
            ? 'apple-glass border-b border-line'
            : 'border-b border-transparent bg-canvas/40 backdrop-blur-md'
        }`}
      >
        <div
          ref={progressBarRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-[2px] origin-left bg-accent/85"
          style={{ transform: 'scaleX(0)' }}
        />
        <div className="container-shell flex h-full items-center justify-between gap-4">
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, '#hero')}
            className="flex shrink-0 items-center gap-2.5 whitespace-nowrap font-display text-sm font-semibold tracking-tight text-ink sm:text-base"
          >
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-accent font-mono text-xs font-semibold text-accent-ink">
              HG
            </span>
            <span>Haidar G. A.</span>
          </a>

          <nav
            aria-label={locale === 'id' ? 'Navigasi utama' : 'Main navigation'}
            className="hidden items-center gap-1 lg:flex"
          >
            {NAV_ITEMS.map((item) => {
              const isActive = activeId === item.id;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`whitespace-nowrap rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-accent-soft text-accent'
                      : 'text-muted hover:bg-surface hover:text-ink'
                  }`}
                >
                  {item.label[locale]}
                </a>
              );
            })}
          </nav>

          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-line bg-surface text-ink transition-colors hover:border-accent hover:text-accent"
            >
              {theme === 'dark' ? <Sun size={17} weight="bold" /> : <Moon size={17} weight="bold" />}
            </button>

            <a
              href="#contact"
              onClick={(e) => {
                trackEvent('cta_click', { location: 'navbar', target: 'contact' });
                handleNavClick(e, '#contact');
              }}
              className="hidden whitespace-nowrap rounded-full bg-accent px-4 py-2 text-sm font-semibold text-accent-ink transition-colors hover:bg-accent-hover sm:inline-flex sm:items-center sm:gap-1.5"
            >
              <span>{locale === 'id' ? 'Hubungi Saya' : 'Contact Me'}</span>
              <ArrowUpRight size={15} weight="bold" />
            </a>

            <button
              type="button"
              onClick={() => setDrawerOpen((v) => !v)}
              aria-expanded={drawerOpen}
              aria-controls="mobile-nav-drawer"
              aria-label={locale === 'id' ? 'Menu navigasi' : 'Navigation menu'}
              className="inline-flex h-9 items-center gap-1.5 rounded-full border border-line bg-surface px-3 text-xs font-medium text-ink lg:hidden"
            >
              {drawerOpen ? <X size={16} weight="bold" /> : <List size={16} weight="bold" />}
              <span>{drawerOpen ? (locale === 'id' ? 'Tutup' : 'Close') : 'Menu'}</span>
            </button>
          </div>
        </div>
      </header>

      {drawerOpen && (
        <div
          id="mobile-nav-drawer"
          role="dialog"
          aria-modal="true"
          aria-label={locale === 'id' ? 'Menu mobile' : 'Mobile menu'}
          className="fixed inset-0 z-40 flex flex-col justify-between bg-canvas px-6 pb-10 pt-24 lg:hidden"
        >
          <nav className="flex flex-col gap-3">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="flex items-center justify-between border-b border-line py-3 font-display text-2xl font-semibold text-ink hover:text-accent"
              >
                <span>{item.label[locale]}</span>
                <ArrowUpRight size={20} weight="bold" className="text-muted" />
              </a>
            ))}
          </nav>

          <a
            href="#contact"
            onClick={(e) => {
              trackEvent('cta_click', { location: 'mobile_drawer', target: 'contact' });
              handleNavClick(e, '#contact');
            }}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-6 py-4 text-base font-semibold text-accent-ink"
          >
            <span>{locale === 'id' ? 'Hubungi Saya' : 'Contact Me'}</span>
            <ArrowUpRight size={18} weight="bold" />
          </a>
        </div>
      )}
    </>
  );
}
