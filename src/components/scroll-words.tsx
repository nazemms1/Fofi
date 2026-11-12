"use client";

import { useRef, type ReactNode } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";

/**
 * A paragraph whose words light up one by one as you scroll through it.
 */
export function ScrollWords({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.92", "end 0.55"],
  });

  const words = text.split(" ");

  return (
    <p ref={ref} className={className} aria-label={text}>
      {words.map((word, i) => {
        const start = i / words.length;
        const end = Math.min(1, start + 1 / words.length + 0.04);
        return (
          <Word
            key={`${word}-${i}`}
            progress={scrollYProgress}
            start={start}
            end={end}
            reduce={!!reduce}
          >
            {word}
          </Word>
        );
      })}
    </p>
  );
}

function Word({
  children,
  progress,
  start,
  end,
  reduce,
}: {
  children: ReactNode;
  progress: MotionValue<number>;
  start: number;
  end: number;
  reduce: boolean;
}) {
  const opacity = useTransform(progress, [start, end], [0.18, 1]);
  const color = useTransform(
    progress,
    [start, end],
    ["rgb(20 23 26 / 0.18)", "rgb(20 23 26 / 1)"],
  );
  return (
    <motion.span
      aria-hidden="true"
      className="inline-block me-[0.25em]"
      style={reduce ? undefined : { opacity, color }}
    >
      {children}
    </motion.span>
  );
}
