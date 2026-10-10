"use client";
import { LazyMotion, domAnimation, m, useReducedMotion } from "motion/react";
export function Reveal({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();
  return (
    <LazyMotion features={domAnimation}>
      <m.div
        initial={reduce ? false : { y: 12 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.45 }}
      >
        {children}
      </m.div>
    </LazyMotion>
  );
}
