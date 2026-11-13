'use client';

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionConfig } from 'motion/react';
import type { Locale } from '@/content/i18n';
import { trackEvent } from '@/lib/analytics';

gsap.registerPlugin(ScrollTrigger);

export type Theme = 'dark' | 'light';

interface AppContextValue {
  locale: Locale;
  setLocale: (next: Locale) => void;
  toggleLocale: () => void;
  theme: Theme;
  setTheme: (next: Theme) => void;
  toggleTheme: () => void;
  customCursorEnabled: boolean;
  toggleCustomCursor: () => void;
  reducedMotion: boolean;
  setScrollLocked: (locked: boolean) => void;
  scrollToHash: (hash: string) => void;
}

const AppContext = createContext<AppContextValue | null>(null);

const LOCALE_STORAGE_KEY = 'hga_locale';
const THEME_STORAGE_KEY = 'hga_theme';
const CURSOR_STORAGE_KEY = 'hga_custom_cursor';

function isIndonesianEnvironment(): boolean {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
    if (
      tz === 'Asia/Jakarta' ||
      tz === 'Asia/Makassar' ||
      tz === 'Asia/Jayapura' ||
      tz === 'Asia/Pontianak'
    ) {
      return true;
    }
    const lang = (navigator.language || '').toLowerCase();
    return lang.startsWith('id');
  } catch {
    return true;
  }
}

export function AppProviders({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('en');
  const [theme, setThemeState] = useState<Theme>('dark');
  const [customCursorEnabled, setCustomCursorEnabled] = useState<boolean>(true);
  const [reducedMotion, setReducedMotion] = useState<boolean>(false);
  const [scrollLocked, setScrollLocked] = useState<boolean>(false);
  const lenisRef = useRef<Lenis | null>(null);

  // Sync reduced-motion media query and initial user preferences on mount.
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const applyMq = () => setReducedMotion(mq.matches);
    applyMq();
    mq.addEventListener('change', applyMq);

    try {
      setLocaleState('en');
      document.documentElement.lang = 'en';

      const savedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
      if (savedTheme === 'light' || savedTheme === 'dark') {
        setThemeState(savedTheme);
        document.documentElement.dataset.theme = savedTheme;
      } else {
        document.documentElement.dataset.theme = 'dark';
      }

      const savedCursor = window.localStorage.getItem(CURSOR_STORAGE_KEY);
      if (savedCursor === 'false') {
        setCustomCursorEnabled(false);
      }
    } catch {
      document.documentElement.dataset.theme = 'dark';
    }

    return () => {
      mq.removeEventListener('change', applyMq);
    };
  }, []);

  // Keep html[lang] synced with active locale.
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  // Manage Lenis smooth scroll on desktop fine-pointer devices; keep native 120Hz touch scroll on mobile.
  useEffect(() => {
    const isCoarsePointer =
      typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches;

    if (reducedMotion || scrollLocked || isCoarsePointer) {
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }
      return;
    }

    const lenis = new Lenis({
      duration: 0.72,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      syncTouch: false
    });

    lenisRef.current = lenis;
    lenis.on('scroll', ScrollTrigger.update);

    const tick = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    const refreshTimer = window.setTimeout(() => {
      ScrollTrigger.refresh();
    }, 280);

    return () => {
      window.clearTimeout(refreshTimer);
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [reducedMotion, scrollLocked]);

  // Recompute ScrollTrigger positions after language updates alter copy length.
  useEffect(() => {
    const id = window.requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });
    return () => window.cancelAnimationFrame(id);
  }, [locale]);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    try {
      window.localStorage.setItem(LOCALE_STORAGE_KEY, next);
    } catch {
      // Ignore storage errors in restricted browsing modes.
    }
    trackEvent('locale_change', { locale: next });
  }, []);

  const toggleLocale = useCallback(() => {
    setLocale(locale === 'id' ? 'en' : 'id');
  }, [locale, setLocale]);

  const setTheme = useCallback((next: Theme) => {
    setThemeState(next);
    document.documentElement.dataset.theme = next;
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // Ignore storage errors.
    }
    trackEvent('theme_change', { theme: next });
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  }, [theme, setTheme]);

  const toggleCustomCursor = useCallback(() => {
    setCustomCursorEnabled((prev) => {
      const next = !prev;
      try {
        window.localStorage.setItem(CURSOR_STORAGE_KEY, String(next));
      } catch {
        // Ignore storage errors.
      }
      return next;
    });
  }, []);

  const scrollToHash = useCallback(
    (hash: string) => {
      const target = document.querySelector(hash);
      if (!target) return;

      if (lenisRef.current && !reducedMotion) {
        lenisRef.current.scrollTo(target as HTMLElement, { offset: -72 });
      } else {
        target.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' });
      }
    },
    [reducedMotion]
  );

  const value = useMemo<AppContextValue>(
    () => ({
      locale,
      setLocale,
      toggleLocale,
      theme,
      setTheme,
      toggleTheme,
      customCursorEnabled,
      toggleCustomCursor,
      reducedMotion,
      setScrollLocked,
      scrollToHash
    }),
    [
      locale,
      setLocale,
      toggleLocale,
      theme,
      setTheme,
      toggleTheme,
      customCursorEnabled,
      toggleCustomCursor,
      reducedMotion,
      scrollToHash
    ]
  );

  return (
    <AppContext.Provider value={value}>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </AppContext.Provider>
  );
}

export function useAppContext(): AppContextValue {
  const ctx = useContext(AppContext);
  if (!ctx) {
    throw new Error('useAppContext must be used inside AppProviders');
  }
  return ctx;
}
