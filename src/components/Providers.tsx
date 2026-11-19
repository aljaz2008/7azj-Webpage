'use client';

import { MotionConfig } from 'framer-motion';
import type { ReactNode } from 'react';

// reducedMotion="user" makes every animation respect the OS "reduce motion" setting
// without components branching on it (which caused a hydration mismatch).
export default function Providers({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
