"use client";

import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "motion/react";
import { AVAILABLE_PRODUCTS } from "@/data/products";

/**
 * An endless strip of product photos. It runs on its own and tilts slightly
 * with scroll velocity. The track is built from two identical halves, so the
 * -50% loop is seamless and there is never a gap at the end.
 */
export function ProductMarquee() {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const skew = useSpring(useTransform(velocity, [-2500, 2500], [-4, 4]), {
    stiffness: 140,
    damping: 22,
  });

  const half = AVAILABLE_PRODUCTS;
  const row = [...half, ...half];

  return (
    <section
      aria-label="Fofi colours"
      className="relative overflow-hidden py-10 md:py-14"
    >
      <motion.div
        style={{ skewX: reduce ? 0 : skew }}
        className="will-change-transform"
      >
        <motion.div
          className="flex w-max gap-5 md:gap-7"
          animate={reduce ? undefined : { x: ["0%", "-50%"] }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        >
          {row.map((p, i) => (
            <Link
              key={`${p.slug}-${i}`}
              href={`/shop/${p.slug}`}
              aria-label={`${p.name}, ${p.color}`}
              tabIndex={i >= half.length ? -1 : 0}
              className="group/card relative block h-72 w-52 shrink-0 overflow-hidden rounded-[1.75rem] bg-sage-soft md:h-96 md:w-72"
            >
              <Image
                src={p.image}
                alt=""
                fill
                loading="eager"
                sizes="(min-width: 768px) 288px, 208px"
                className="object-cover transition-transform duration-[1.2s] ease-out group-hover/card:scale-110"
              />
              <span className="absolute inset-x-3 bottom-3 flex items-center justify-between rounded-full bg-bg/90 px-4 py-2 text-sm font-bold text-ink opacity-0 translate-y-2 transition-all duration-500 group-hover/card:translate-y-0 group-hover/card:opacity-100">
                {p.color}
                <span
                  className="size-3.5 rounded-full ring-1 ring-ink/20"
                  style={{ backgroundColor: p.swatch }}
                />
              </span>
            </Link>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
