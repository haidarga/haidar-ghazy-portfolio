'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useAppContext } from '@/components/AppProviders';

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delayMs?: number;
}

/**
 * Lightweight GPU-composited scroll entrance using a single IntersectionObserver.
 * Falls back immediately on reduced motion or elements already within the viewport.
 */
export function Reveal({ children, className = '', delayMs = 0 }: RevealProps) {
  const { reducedMotion } = useAppContext();
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (reducedMotion) {
      setVisible(true);
      return;
    }

    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.96) {
      setVisible(true);
      return;
    }

    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
            break;
          }
        }
      },
      { threshold: 0.06, rootMargin: '0px 0px -24px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [reducedMotion]);

  return (
    <div
      ref={ref}
      style={delayMs > 0 && !reducedMotion ? { transitionDelay: `${delayMs}ms` } : undefined}
      className={`reveal-block ${visible || reducedMotion ? 'is-visible' : ''} ${className}`}
    >
      {children}
    </div>
  );
}
