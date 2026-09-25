"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useMotionValue, useSpring, useTransform, motion } from "framer-motion";

interface AnimatedCounterProps {
  value: string;
}

export function AnimatedCounter({ value }: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10px" });
  
  const numberMatch = value.match(/[\d.]+/);
  const numericValue = numberMatch ? parseFloat(numberMatch[0]) : 0;
  const suffix = value.replace(/[\d.]+/g, "");

  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 30,
    stiffness: 80,
    restDelta: 0.001,
  });

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && isInView) {
      // Small delay for better visual effect when scrolling
      const timeout = setTimeout(() => {
        motionValue.set(numericValue);
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [mounted, isInView, numericValue, motionValue]);

  const display = useTransform(springValue, (current) => {
    const hasDecimals = numericValue % 1 !== 0;
    return hasDecimals ? current.toFixed(1) : Math.round(current).toString();
  });

  return (
    <span ref={ref} className="inline-flex items-center justify-center">
      {mounted ? (
        <>
          <motion.span>{display}</motion.span>
          <span>{suffix}</span>
        </>
      ) : (
        <span>0{suffix}</span>
      )}
    </span>
  );
}
