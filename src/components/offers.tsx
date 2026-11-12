"use client";

import Link from "next/link";
import { useRef } from "react";
import { Check } from "lucide-react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { OFFERS, SITE } from "@/data/site";
import {
  CountUp,
  Reveal,
  Stagger,
  StaggerItem,
  SplitWords,
} from "@/components/motion";

export function Offers() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  // A giant outlined price line drifts sideways as the section scrolls past.
  const watermarkX = useTransform(
    scrollYProgress,
    [0, 1],
    reduce ? [0, 0] : [-160, 160],
  );

  return (
    <section
      id="offers"
      ref={ref}
      className="relative scroll-mt-20 overflow-hidden rounded-t-[3rem] bg-yellow px-5 py-20 md:rounded-t-[6rem] md:px-8 md:py-28"
    >
      <motion.p
        aria-hidden="true"
        style={{ x: watermarkX }}
        className="font-display pointer-events-none absolute -bottom-10 start-0 select-none whitespace-nowrap text-[9rem] font-black leading-none text-transparent [-webkit-text-stroke:2px_rgb(20_23_26/0.12)] md:text-[16rem]"
      >
        $39 — $75 — $100
      </motion.p>

      <div className="relative mx-auto max-w-7xl">
        <Reveal>
          <p className="eyebrow mb-4 text-ink/70">Offers</p>
        </Reveal>
        <h2 className="display text-6xl text-ink md:text-8xl">
          <SplitWords text="Bundle & save" />
        </h2>
        <Reveal delay={0.2}>
          <p className="mt-5 max-w-xl text-lg leading-8 text-ink/75">
            The more pieces you order, the less each one costs. Pick your offer
            on any product page.
          </p>
        </Reveal>

        <Stagger
          className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-6"
          stagger={0.12}
        >
          {OFFERS.map((offer) => {
            const best = offer.qty === 3;
            return (
              <StaggerItem key={offer.qty} variant="scale">
                <motion.article
                  whileHover={{ y: -8 }}
                  transition={{ type: "spring", stiffness: 300, damping: 22 }}
                  className={`relative flex h-full flex-col rounded-[2.25rem] p-7 md:p-9 ${
                    best ? "bg-ink text-bg" : "bg-bg text-ink"
                  }`}
                >
                  {best && (
                    <motion.span
                      aria-hidden="true"
                      className="absolute -top-3 start-7 rounded-full bg-yellow px-4 py-1.5 text-sm font-black text-ink"
                      animate={{ rotate: [-3, 3, -3] }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      Best value
                    </motion.span>
                  )}
                  <p className="text-lg font-bold opacity-80">{offer.label}</p>
                  <p className="font-display mt-3 flex items-end gap-1 text-7xl font-black leading-none md:text-8xl">
                    <span className="pb-2 text-3xl md:text-4xl">
                      {SITE.currency}
                    </span>
                    <CountUp to={offer.total} duration={1.6} />
                  </p>
                  <p
                    className={`mt-5 inline-flex items-center gap-2 text-base font-bold ${
                      best ? "text-yellow" : "text-sage-deep"
                    }`}
                  >
                    <Check className="size-5" />
                    {offer.note}
                  </p>
                  <div className="mt-auto pt-10">
                    <Link
                      href="/shop"
                      className={`btn w-full ${best ? "btn-yellow" : "btn-primary"}`}
                    >
                      Choose your colour
                    </Link>
                  </div>
                </motion.article>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
