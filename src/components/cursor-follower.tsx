"use client";

import { useEffect, useState } from "react";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";

const INTERACTIVE = "a, button, [role='tab'], select, input, textarea, label";

/**
 * A small dot with a trailing ring that follows the mouse. The ring grows over
 * links and buttons. Only shown on desktop with a fine pointer.
 */
export function CursorFollower() {
  const reduce = useReducedMotion();
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const dotX = useSpring(x, { stiffness: 700, damping: 45, mass: 0.2 });
  const dotY = useSpring(y, { stiffness: 700, damping: 45, mass: 0.2 });
  const ringX = useSpring(x, { stiffness: 180, damping: 20, mass: 0.6 });
  const ringY = useSpring(y, { stiffness: 180, damping: 20, mass: 0.6 });
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    if (reduce || !window.matchMedia("(pointer: fine)").matches) return;

    function onMove(e: PointerEvent) {
      x.set(e.clientX);
      y.set(e.clientY);
      const target = e.target as Element | null;
      setHovering(Boolean(target?.closest?.(INTERACTIVE)));
    }
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduce, x, y]);

  if (reduce) return null;

  return (
    <>
      <motion.div
        aria-hidden="true"
        style={{ x: dotX, y: dotY }}
        className="pointer-events-none fixed start-0 top-0 z-[75] hidden size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ink md:block"
      />
      <motion.div
        aria-hidden="true"
        style={{ x: ringX, y: ringY }}
        animate={{
          width: hovering ? 64 : 40,
          height: hovering ? 64 : 40,
          backgroundColor: hovering
            ? "rgb(236 225 64 / 0.35)"
            : "rgb(236 225 64 / 0)",
          borderColor: hovering
            ? "rgb(236 225 64 / 0.9)"
            : "rgb(20 23 26 / 0.55)",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 26 }}
        className="pointer-events-none fixed start-0 top-0 z-[74] hidden -translate-x-1/2 -translate-y-1/2 rounded-full border-2 md:block"
      />
    </>
  );
}
