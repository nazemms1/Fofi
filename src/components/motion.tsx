"use client";

import {
  Children,
  Fragment,
  cloneElement,
  isValidElement,
  useEffect,
  useRef,
  type ReactNode,
  type PointerEvent,
} from "react";
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useMotionTemplate,
  useTransform,
  type Variants,
} from "motion/react";

export const EASE = [0.22, 1, 0.36, 1] as const;

type Variant = "up" | "fade" | "scale" | "left" | "right" | "blur";

const VARIANTS: Record<Variant, Variants> = {
  up: {
    hidden: { opacity: 0, y: 44 },
    show: { opacity: 1, y: 0 },
  },
  fade: {
    hidden: { opacity: 0 },
    show: { opacity: 1 },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.9, y: 24 },
    show: { opacity: 1, scale: 1, y: 0 },
  },
  left: {
    hidden: { opacity: 0, x: 70 },
    show: { opacity: 1, x: 0 },
  },
  right: {
    hidden: { opacity: 0, x: -70 },
    show: { opacity: 1, x: 0 },
  },
  blur: {
    hidden: { opacity: 0, y: 30, filter: "blur(14px)" },
    show: { opacity: 1, y: 0, filter: "blur(0px)" },
  },
};

const VIEWPORT = { once: true, margin: "-80px" } as const;

/** Animates its children into view when they scroll into the viewport. */
export function Reveal({
  children,
  className,
  delay = 0,
  duration = 0.9,
  variant = "up",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  variant?: Variant;
}) {
  const reduce = useReducedMotion();
  const v = VARIANTS[variant];
  return (
    <motion.div
      className={className}
      variants={v}
      initial={reduce ? false : "hidden"}
      whileInView="show"
      viewport={VIEWPORT}
      transition={{ duration, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Wraps direct StaggerItem children and gives each one an increasing delay.
 * Every item watches its own viewport entry, so the reveal never gets stuck.
 */
export function Stagger({
  children,
  className,
  stagger = 0.1,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
}) {
  return (
    <div className={className}>
      {Children.map(children, (child, i) =>
        isValidElement<{ delay?: number }>(child)
          ? cloneElement(child, { delay: delay + i * stagger })
          : child,
      )}
    </div>
  );
}

export function StaggerItem({
  children,
  className,
  variant = "up",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  variant?: Variant;
  delay?: number;
}) {
  return (
    <Reveal
      className={className}
      variant={variant}
      delay={delay}
      duration={0.85}
    >
      {children}
    </Reveal>
  );
}

/** Reveals a line of text word by word with a soft blur-in. */
export function SplitWords({
  text,
  className,
  delay = 0,
  stagger = 0.07,
}: {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
}) {
  const reduce = useReducedMotion();
  const words = text.split(" ");
  return (
    <span className={className} aria-label={text}>
      {words.map((word, i) => (
        <Fragment key={`${word}-${i}`}>
          {i > 0 ? " " : null}
          <motion.span
            aria-hidden="true"
            className="inline-block"
            initial={
              reduce ? false : { opacity: 0, y: "0.45em", filter: "blur(10px)" }
            }
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={VIEWPORT}
            transition={{
              duration: 0.9,
              delay: delay + i * stagger,
              ease: EASE,
            }}
          >
            {word}
          </motion.span>
        </Fragment>
      ))}
    </span>
  );
}

/** Counts up to a number once it is visible. */
export function CountUp({
  to,
  duration = 1.4,
  prefix = "",
  suffix = "",
  className,
}: {
  to: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();
  const count = useMotionValue(reduce ? to : 0);
  const rounded = useTransform(count, (v) => Math.round(v));

  useEffect(() => {
    if (!inView || reduce) return;
    const controls = animate(count, to, { duration, ease: EASE });
    return () => controls.stop();
  }, [inView, reduce, to, duration, count]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
}

/** Tilts its content toward the pointer (mouse only). */
export function Tilt({
  children,
  className,
  max = 7,
}: {
  children: ReactNode;
  className?: string;
  max?: number;
}) {
  const reduce = useReducedMotion();
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rotateY = useSpring(useTransform(px, [0, 1], [-max, max]), {
    stiffness: 180,
    damping: 18,
  });
  const rotateX = useSpring(useTransform(py, [0, 1], [max, -max]), {
    stiffness: 180,
    damping: 18,
  });

  const spotX = useTransform(px, [0, 1], [0, 100]);
  const spotY = useTransform(py, [0, 1], [0, 100]);
  const spotlight = useMotionTemplate`radial-gradient(circle at ${spotX}% ${spotY}%, rgb(255 255 255 / 0.42), transparent 55%)`;

  if (reduce) return <div className={className}>{children}</div>;

  function onMove(e: PointerEvent<HTMLDivElement>) {
    if (e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  }
  function onLeave() {
    px.set(0.5);
    py.set(0.5);
  }

  return (
    <motion.div
      className={className}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
    >
      {children}
      <motion.span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10 rounded-[inherit] mix-blend-soft-light"
        style={{ background: spotlight }}
      />
    </motion.div>
  );
}

/** Nudges its child slightly toward the pointer (mouse only). */
export function Magnetic({
  children,
  className,
  strength = 0.25,
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
}) {
  const reduce = useReducedMotion();
  const x = useSpring(0, { stiffness: 260, damping: 16 });
  const y = useSpring(0, { stiffness: 260, damping: 16 });

  if (reduce) return <div className={className}>{children}</div>;

  function onMove(e: PointerEvent<HTMLDivElement>) {
    if (e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  }
  function onLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      className={`inline-flex ${className ?? ""}`}
      style={{ x, y }}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
    >
      {children}
    </motion.div>
  );
}
