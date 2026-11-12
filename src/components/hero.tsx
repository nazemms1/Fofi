"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type PointerEvent } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { Logo } from "@/components/logo";
import { WhatsAppIcon } from "@/components/icons";
import { EASE, Magnetic, SplitWords } from "@/components/motion";
import { AVAILABLE_PRODUCTS, type Product } from "@/data/products";
import { SITE } from "@/data/site";
import { whatsappGreetingUrl } from "@/lib/whatsapp";

const MAIN_SLUGS = ["mauve", "cloud", "berry", "midnight"];
const SECOND_SLUGS = ["sand", "olive", "ochean", "mocha"];

function pick(slugs: string[]): Product[] {
  return slugs
    .map((slug) => AVAILABLE_PRODUCTS.find((p) => p.slug === slug))
    .filter((p): p is Product => Boolean(p));
}

const MAIN = pick(MAIN_SLUGS);
const SECOND = pick(SECOND_SLUGS);
const CYCLE_MS = 3800;

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);

  // Cycle the featured photos (paused for reduced motion).
  useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(
      () => setIndex((v) => (v + 1) % MAIN.length),
      CYCLE_MS,
    );
    return () => window.clearInterval(id);
  }, [reduce]);

  // ── scroll: the hero drifts apart as you leave it ──────────────────────
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.5,
  });
  const k = reduce ? 0 : 1;
  const textY = useTransform(progress, [0, 1], [0, -110 * k]);
  const textOpacity = useTransform(progress, [0, 0.6], [1, 1 - k]);
  const logoScale = useTransform(progress, [0, 1], [1, 1 - 0.2 * k]);
  const mainYScroll = useTransform(progress, [0, 1], [0, -170 * k]);
  const secondYScroll = useTransform(progress, [0, 1], [0, 220 * k]);
  const secondRotate = useTransform(progress, [0, 1], [0, 12 * k]);
  const stickerYScroll = useTransform(progress, [0, 1], [0, -150 * k]);
  const cueOpacity = useTransform(progress, [0, 0.12], [1, 0]);
  const ringRotate = useTransform(progress, [0, 1], [0, 140 * k]);

  // ── pointer: the photos sit at different depths and follow the mouse ───
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 110, damping: 18, mass: 0.6 });
  const sy = useSpring(my, { stiffness: 110, damping: 18, mass: 0.6 });
  const mainX = useTransform(sx, [-0.5, 0.5], [-14, 14]);
  const mainTilt = useTransform(sy, [-0.5, 0.5], [-3, 3]);
  const secondX = useTransform(sx, [-0.5, 0.5], [24, -24]);
  const stickerX = useTransform(sx, [-0.5, 0.5], [34, -34]);
  const stickerY = useTransform(sy, [-0.5, 0.5], [-20, 20]);

  function onStagePointer(e: PointerEvent<HTMLDivElement>) {
    if (reduce || e.pointerType !== "mouse" || !stageRef.current) return;
    const r = stageRef.current.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  }
  function onStageLeave() {
    mx.set(0);
    my.set(0);
  }

  const enter = (delay: number, y = 34) => ({
    initial: reduce ? false : { opacity: 0, y },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 1, delay, ease: EASE },
  });

  const main = MAIN[index];
  const second = SECOND[index % SECOND.length];

  return (
    <section
      ref={ref}
      className="relative isolate overflow-hidden rounded-b-[3rem] bg-sage md:rounded-b-[6rem]"
    >
      {/* drifting background shapes */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -start-24 top-16 size-80 rounded-full bg-yellow/35 blur-3xl"
        animate={reduce ? undefined : { x: [0, 40, 0], y: [0, 30, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -end-20 bottom-10 size-96 rounded-full bg-sage-deep/30 blur-3xl"
        animate={reduce ? undefined : { x: [0, -36, 0], y: [0, -26, 0] }}
        transition={{ duration: 17, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 px-5 pb-28 pt-10 md:gap-16 md:px-8 md:pb-36 md:pt-16 lg:grid-cols-2">
        {/* ── text column ─────────────────────────────────────────── */}
        <motion.div
          style={{ y: textY, opacity: textOpacity }}
          className="order-1"
        >
          <motion.div
            style={{ scale: logoScale, transformOrigin: "left center" }}
          >
            <motion.div
              initial={
                reduce
                  ? false
                  : { clipPath: "inset(0% 0% 100% 0%)", opacity: 0 }
              }
              animate={{ clipPath: "inset(0% 0% 0% 0%)", opacity: 1 }}
              transition={{ duration: 1.1, ease: EASE }}
            >
              <Logo
                variant="cream"
                href={null}
                className="h-24 md:h-32"
                priority
              />
            </motion.div>
          </motion.div>

          <motion.p
            {...enter(0.25)}
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2 text-sm font-bold text-bg"
          >
            <span className="relative flex size-2">
              {!reduce && (
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-yellow opacity-75" />
              )}
              <span className="relative inline-flex size-2 rounded-full bg-yellow" />
            </span>
            {SITE.tagline}
          </motion.p>

          <h1 className="display mt-6 text-5xl text-ink sm:text-6xl lg:text-7xl">
            <span className="block">
              <SplitWords
                text="Warmth you can wear,"
                delay={0.35}
                stagger={0.12}
              />
            </span>
            <span className="block">
              <SplitWords
                text="comfort you can feel"
                delay={0.6}
                stagger={0.12}
              />
            </span>
          </h1>

          <motion.p
            {...enter(0.85)}
            className="mt-6 max-w-lg text-lg leading-9 text-ink/80"
          >
            A hooded blanket with a soft, thick lining that keeps you warm and
            still looks sharp everywhere you go. Choose from 10 colours and
            order in a minute on WhatsApp.
          </motion.p>

          <motion.div
            {...enter(1)}
            className="mt-10 flex flex-col gap-3 sm:flex-row"
          >
            <Magnetic className="w-full sm:w-auto">
              <Link
                href="/shop"
                className="btn btn-primary group w-full sm:w-auto"
              >
                Shop the collection
                <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Magnetic>
            <Magnetic className="w-full sm:w-auto">
              <a
                href={whatsappGreetingUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost w-full sm:w-auto"
              >
                <WhatsAppIcon className="size-4" />
                Order on WhatsApp
              </a>
            </Magnetic>
          </motion.div>
        </motion.div>

        {/* ── visual stage ────────────────────────────────────────── */}
        <div
          ref={stageRef}
          onPointerMove={onStagePointer}
          onPointerLeave={onStageLeave}
          className="relative order-2 mx-auto h-[480px] w-full max-w-md sm:h-[580px] md:max-w-lg"
        >
          {/* rotating dashed ring behind the photos */}
          <motion.div
            aria-hidden="true"
            style={{ rotate: ringRotate }}
            className="pointer-events-none absolute inset-x-[4%] top-[6%] aspect-square rounded-full border-2 border-dashed border-ink/25"
          />

          {/* main photo: clip-reveal on load, depth on pointer, drift on scroll */}
          <motion.div
            style={{ x: mainX, y: mainYScroll, rotate: mainTilt }}
            className="absolute start-0 top-0 h-[84%] w-[72%]"
          >
            <motion.div
              className="absolute inset-0 overflow-hidden rounded-[2.5rem] shadow-2xl shadow-ink/30"
              initial={
                reduce
                  ? false
                  : { clipPath: "inset(100% 0% 0% 0% round 2.5rem)" }
              }
              animate={{ clipPath: "inset(0% 0% 0% 0% round 2.5rem)" }}
              transition={{ duration: 1.3, delay: 0.2, ease: EASE }}
            >
              <AnimatePresence initial={false}>
                <motion.div
                  key={main.slug}
                  className="absolute inset-0"
                  initial={{ opacity: 0, scale: 1.12 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 1.1, ease: EASE }}
                >
                  <Image
                    src={main.image}
                    alt={`${main.name}, ${main.color}`}
                    fill
                    priority={index === 0}
                    sizes="(min-width: 1024px) 30vw, 70vw"
                    className="object-cover"
                  />
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </motion.div>

          {/* second photo: rises in, drifts the other way, cycles on its own rhythm */}
          <motion.div
            style={{ x: secondX, y: secondYScroll, rotate: secondRotate }}
            className="absolute bottom-0 end-0 w-[46%]"
          >
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 80, rotate: 6 }}
              animate={{ opacity: 1, y: 0, rotate: 0 }}
              transition={{ duration: 1.2, delay: 0.55, ease: EASE }}
              className="aspect-[3/4] overflow-hidden rounded-[2rem] border-[7px] border-bg shadow-2xl shadow-ink/30"
            >
              <AnimatePresence initial={false}>
                <motion.div
                  key={second.slug}
                  className="absolute inset-0"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.9, ease: EASE }}
                >
                  <Image
                    src={second.image}
                    alt={second.name}
                    priority
                    fill
                    sizes="(min-width: 1024px) 14vw, 32vw"
                    className="object-cover"
                  />
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </motion.div>

          {/* price badge: spring pop-in, rotating ring of text, pointer depth */}
          <motion.div
            style={{ x: stickerX, y: stickerYScroll }}
            className="absolute end-0 top-2 md:end-2"
          >
            <motion.div
              style={{ y: stickerY }}
              initial={reduce ? false : { scale: 0, rotate: -40 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                type: "spring",
                stiffness: 240,
                damping: 14,
                delay: 1.1,
              }}
              className="relative grid size-32 place-items-center text-ink sm:size-36"
            >
              <motion.svg
                aria-hidden="true"
                viewBox="0 0 200 200"
                className="absolute inset-0 size-full"
                animate={reduce ? undefined : { rotate: 360 }}
                transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
              >
                <defs>
                  <path
                    id="hero-badge-path"
                    d="M100,100 m-80,0 a80,80 0 1,1 160,0 a80,80 0 1,1 -160,0"
                  />
                </defs>
                <circle cx="100" cy="100" r="98" className="fill-yellow" />
                <text
                  fontSize="17"
                  fontWeight="800"
                  letterSpacing="5"
                  className="fill-ink"
                >
                  <textPath href="#hero-badge-path">
                    WARM • SOFT • FOFI • WEAR IT •
                  </textPath>
                </text>
              </motion.svg>
              <div className="relative grid size-[62%] place-items-center rounded-full bg-ink text-center text-yellow">
                <div>
                  <p className="text-[0.7rem] font-bold text-bg/80">
                    Starting at
                  </p>
                  <p className="font-display text-3xl font-black leading-none">
                    ${SITE.price}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* caption + dots: follow the cycling photo */}
          <div className="absolute bottom-0 start-0 flex flex-col items-start gap-3">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={main.slug}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.4, ease: EASE }}
                className="flex items-center gap-2.5 rounded-full bg-bg/95 py-2 pe-4 ps-2 text-sm font-bold text-ink shadow-lg"
              >
                <span
                  className="size-5 rounded-full ring-1 ring-ink/20"
                  style={{ backgroundColor: main.swatch }}
                />
                {main.name}
                <span className="text-muted">· {main.color}</span>
              </motion.div>
            </AnimatePresence>

            <div
              className="flex items-center gap-1.5 ps-2"
              role="tablist"
              aria-label="Featured colours"
            >
              {MAIN.map((p, i) => (
                <button
                  key={p.slug}
                  type="button"
                  role="tab"
                  aria-selected={i === index}
                  aria-label={p.name}
                  onClick={() => setIndex(i)}
                  className="relative h-2 w-6 overflow-hidden rounded-full bg-ink/25 transition-colors hover:bg-ink/50"
                >
                  {i === index && (
                    <motion.span
                      layoutId="hero-dot"
                      className="absolute inset-0 rounded-full bg-ink"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 32,
                      }}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* scroll cue */}
      <motion.div
        aria-hidden="true"
        style={{ opacity: cueOpacity }}
        className="pointer-events-none absolute bottom-5 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1 text-ink/70 md:flex"
      >
        <span className="text-xs font-bold tracking-widest">SCROLL</span>
        <motion.span
          animate={reduce ? undefined : { y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="size-5" />
        </motion.span>
      </motion.div>
    </section>
  );
}
