'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';
import { useAppContext } from '@/components/AppProviders';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
  as?: 'a' | 'button';
  href?: string;
  target?: string;
  rel?: string;
  download?: boolean | string;
  type?: 'button' | 'submit' | 'reset';
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  ariaLabel?: string;
  cursorLabel?: string;
}

export function MagneticButton({
  children,
  className = '',
  strength = 0.24,
  as = 'button',
  href,
  target,
  rel,
  download,
  type = 'button',
  onClick,
  ariaLabel,
  cursorLabel
}: MagneticButtonProps) {
  const { reducedMotion } = useAppContext();
  const [finePointer, setFinePointer] = useState(false);
  const ref = useRef<HTMLElement | null>(null);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 280, damping: 22, mass: 0.4 });
  const y = useSpring(rawY, { stiffness: 280, damping: 22, mass: 0.4 });

  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)');
    const sync = () => setFinePointer(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!finePointer || reducedMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    rawX.set(dx * strength);
    rawY.set(dy * strength);
  };

  const handleMouseLeave = () => {
    rawX.set(0);
    rawY.set(0);
  };

  if (as === 'a') {
    return (
      <motion.a
        ref={ref as React.RefObject<HTMLAnchorElement>}
        href={href}
        target={target}
        rel={rel}
        download={download}
        onClick={onClick}
        aria-label={ariaLabel}
        data-cursor-label={cursorLabel}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={finePointer && !reducedMotion ? { x, y } : undefined}
        whileTap={reducedMotion ? undefined : { scale: 0.97 }}
        className={`inline-flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas ${className}`}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      ref={ref as React.RefObject<HTMLButtonElement>}
      type={type}
      onClick={onClick}
      aria-label={ariaLabel}
      data-cursor-label={cursorLabel}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={finePointer && !reducedMotion ? { x, y } : undefined}
      whileTap={reducedMotion ? undefined : { scale: 0.97 }}
      className={`inline-flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas ${className}`}
    >
      {children}
    </motion.button>
  );
}
