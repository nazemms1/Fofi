"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState, type CSSProperties } from "react";
import { ArrowRight } from "lucide-react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { EASE } from "@/components/motion";
import { AVAILABLE_PRODUCTS, type Product } from "@/data/products";
import { SITE } from "@/data/site";

/**
 * A pinned, scroll-driven showcase: as the visitor scrolls, the page holds still
 * while the colours change one after another.
 */
export function ColorShowcase() {
  const products: Product[] = AVAILABLE_PRODUCTS;
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    mass: 0.4,
  });

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const next = Math.min(products.length - 1, Math.floor(p * products.length));
    setIndex((current) => (current === next ? current : next));
  });

  const photoScale = useTransform(progress, [0, 1], [1.12, 1]);
  const headlineShift = useTransform(progress, [0, 1], [0, -120]);
  const current = products[index];

  return (
    <section
      ref={ref}
      aria-label="Choose your colour"
      className="relative lg:h-(--showcase-h)"
      style={
        reduce
          ? undefined
          : ({ "--showcase-h": `${products.length * 60}vh` } as CSSProperties)
      }
    >
      {/* phone & tablet: every colour in a swipeable rail, no pinned scrolling */}
      <div className="py-16 lg:hidden">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <p className="eyebrow mb-4">The collection</p>
          <h2 className="display text-5xl text-ink">Choose your colour</h2>
        </div>

        <ul className="no-scrollbar mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-5 px-5 pb-4 md:scroll-px-8 md:px-8">
          {products.map((p) => (
            <li
              key={p.slug}
              className="w-[68vw] max-w-72 shrink-0 snap-start md:w-72"
            >
              <Link href={`/shop/${p.slug}`} className="group block">
                <div className="relative aspect-[3/4] overflow-hidden rounded-[2rem] bg-sage-soft shadow-[0_24px_50px_-30px_rgb(20_23_26/0.55)]">
                  <Image
                    src={p.image}
                    alt={`${p.name}, ${p.color}`}
                    fill
                    sizes="(min-width: 768px) 288px, 68vw"
                    className="object-cover"
                  />
                </div>
                <div className="mt-4 flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="font-display text-2xl font-black leading-tight">
                      {p.name.replace(" Fofi", "")}
                      <span className="text-sage-deep"> Fofi</span>
                    </p>
                    <p className="mt-1 flex items-center gap-2 text-muted">
                      <span
                        aria-hidden="true"
                        className="inline-block size-3.5 rounded-full ring-1 ring-ink/15"
                        style={{ backgroundColor: p.swatch }}
                      />
                      {p.color}
                    </p>
                  </div>
                  <span className="shrink-0 rounded-full bg-ink px-3 py-1 text-sm font-black text-yellow">
                    ${SITE.price}
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* desktop: the pinned showcase */}
      <div className="sticky top-0 hidden h-screen max-h-[980px] min-h-[640px] items-center overflow-hidden lg:flex">
        <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-10 px-5 md:px-8 lg:grid-cols-2 lg:gap-16">
          {/* text side */}
          <div className="order-2 lg:order-1">
            <p className="eyebrow mb-5">The collection</p>

            <div className="relative h-[7.5rem] overflow-hidden md:h-[10rem]">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.h2
                  key={current.slug}
                  initial={
                    reduce
                      ? false
                      : { y: "100%", opacity: 0, filter: "blur(10px)" }
                  }
                  animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                  exit={
                    reduce
                      ? undefined
                      : { y: "-100%", opacity: 0, filter: "blur(10px)" }
                  }
                  transition={{ duration: 0.7, ease: EASE }}
                  className="display absolute inset-0 text-6xl text-ink md:text-8xl"
                >
                  {current.name.replace(" Fofi", "")}
                  <span className="text-sage-deep"> Fofi</span>
                </motion.h2>
              </AnimatePresence>
            </div>

            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={`${current.slug}-meta`}
                initial={reduce ? false : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, y: -14 }}
                transition={{ duration: 0.45, ease: EASE }}
                className="mt-6 flex flex-wrap items-center gap-4"
              >
                <span
                  className="size-8 rounded-full ring-2 ring-ink/15"
                  style={{ backgroundColor: current.swatch }}
                />
                <span className="text-xl font-bold">{current.color}</span>
                <span className="rounded-full bg-ink px-4 py-1.5 text-sm font-black text-yellow">
                  ${SITE.price}
                </span>
              </motion.div>
            </AnimatePresence>

            {/* swatch rail: shows where you are in the sequence */}
            <div className="mt-10 flex items-center gap-2" aria-hidden="true">
              {products.map((p, i) => (
                <span
                  key={p.slug}
                  className="relative h-2 flex-1 overflow-hidden rounded-full bg-ink/15 md:max-w-14"
                >
                  <motion.span
                    className="absolute inset-0 origin-left rounded-full bg-ink"
                    initial={false}
                    animate={{ scaleX: i <= index ? 1 : 0 }}
                    transition={{ duration: 0.5, ease: EASE }}
                  />
                </span>
              ))}
            </div>
            <p className="mt-3 text-sm font-bold text-muted">
              {String(index + 1).padStart(2, "0")} /{" "}
              {String(products.length).padStart(2, "0")}
            </p>

            <Link
              href={`/shop/${current.slug}`}
              className="btn btn-primary group mt-10"
            >
              Order this colour
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>

          {/* photo side */}
          <motion.div
            style={{ y: reduce ? 0 : headlineShift }}
            className="relative order-1 mx-auto aspect-[3/4] w-full max-w-sm overflow-hidden rounded-[2.5rem] bg-sage-soft shadow-[0_40px_80px_-35px_rgb(20_23_26/0.55)] lg:order-2 lg:max-w-md"
          >
            <AnimatePresence initial={false}>
              <motion.div
                key={current.slug}
                className="absolute inset-0"
                initial={reduce ? false : { clipPath: "inset(100% 0% 0% 0%)" }}
                animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
                exit={reduce ? undefined : { opacity: 0 }}
                transition={{ duration: 0.9, ease: EASE }}
              >
                <motion.div
                  style={{ scale: reduce ? 1 : photoScale }}
                  className="absolute inset-0"
                >
                  <Image
                    src={current.image}
                    alt={`${current.name}, ${current.color}`}
                    fill
                    sizes="(min-width: 1024px) 30vw, 90vw"
                    className="object-cover"
                  />
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
