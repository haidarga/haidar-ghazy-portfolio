'use client';

import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';
import { useAppContext } from '@/components/AppProviders';

/**
 * Subtle desktop-only contextual pointer follower powered by GPU motion values.
 */
export function CustomCursor() {
  const { customCursorEnabled, reducedMotion } = useAppContext();
  const [active, setActive] = useState(false);
  const [visible, setVisible] = useState(false);
  const [cursorLabel, setCursorLabel] = useState<string | null>(null);
  const [isInteractive, setIsInteractive] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const ringX = useSpring(mouseX, { stiffness: 360, damping: 28, mass: 0.35 });
  const ringY = useSpring(mouseY, { stiffness: 360, damping: 28, mass: 0.35 });

  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)');
    const sync = () => setActive(mq.matches && customCursorEnabled && !reducedMotion);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, [customCursorEnabled, reducedMotion]);

  useEffect(() => {
    const root = document.documentElement;
    if (active) {
      root.classList.add('has-custom-cursor');
    } else {
      root.classList.remove('has-custom-cursor');
      return;
    }

    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      setVisible(true);

      const target = e.target as HTMLElement | null;
      if (!target) return;
      const labeledEl = target.closest<HTMLElement>('[data-cursor-label]');
      const interactiveEl = target.closest('a, button, [role="button"], summary');
      setCursorLabel(labeledEl?.dataset.cursorLabel || null);
      setIsInteractive(Boolean(interactiveEl || labeledEl));
    };

    const onLeave = () => setVisible(false);

    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseleave', onLeave);

    return () => {
      root.classList.remove('has-custom-cursor');
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
    };
  }, [active, mouseX, mouseY]);

  if (!active || !visible) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[90] -translate-x-1/2 -translate-y-1/2"
      style={{ x: ringX, y: ringY }}
    >
      <div
        className={`flex items-center justify-center rounded-full border transition-all duration-150 ${
          cursorLabel
            ? 'h-9 min-w-[68px] border-accent bg-accent px-3 text-[11px] font-mono font-medium uppercase tracking-[0.08em] text-accent-ink shadow-md'
            : isInteractive
            ? 'h-7 w-7 border-accent bg-accent/20'
            : 'h-3.5 w-3.5 border-ink/70 bg-accent/80'
        }`}
      >
        {cursorLabel ? <span>{cursorLabel}</span> : null}
      </div>
    </motion.div>
  );
}
