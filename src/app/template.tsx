"use client";

import { LazyMotion, domAnimation, m, useReducedMotion } from "framer-motion";

export default function Template({ children }: { children: React.ReactNode }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <LazyMotion features={domAnimation}>
      <m.div
        className="flex min-h-full flex-1"
        initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: 24 }}
        animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, x: 0 }}
        transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </m.div>
    </LazyMotion>
  );
}
