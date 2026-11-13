'use client';

import React from 'react';

interface CountUpProps {
  target: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  delay?: number;
  isTransform?: boolean;
  displayEnd?: string;
  className?: string;
}

/**
 * Renders final verified metric values immediately without interim placeholder counting.
 */
export function CountUp({
  target,
  decimals = 0,
  prefix = '',
  suffix = '',
  isTransform = false,
  displayEnd,
  className = ''
}: CountUpProps) {
  if (isTransform && displayEnd) {
    return <span className={`tabular-nums ${className}`}>{displayEnd}</span>;
  }

  const formatted =
    decimals > 0
      ? target.toFixed(decimals)
      : Math.round(target).toLocaleString('en-US');

  return (
    <span className={`tabular-nums ${className}`}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}
