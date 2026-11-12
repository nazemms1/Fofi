"use client";

import { useEffect } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";

/** Shows a number that glides to its new value whenever `value` changes. */
export function AnimatedNumber({
  value,
  className,
}: {
  value: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const target = useMotionValue(value);
  const spring = useSpring(target, { stiffness: 220, damping: 26, mass: 0.8 });
  const rounded = useTransform(spring, (v) => Math.round(v));

  useEffect(() => {
    target.set(value);
  }, [value, target]);

  if (reduce) return <span className={className}>{value}</span>;

  return <motion.span className={className}>{rounded}</motion.span>;
}
