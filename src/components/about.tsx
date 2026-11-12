"use client";

import Image from "next/image";
import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { Reveal, SplitWords, Stagger, StaggerItem } from "@/components/motion";
import { ScrollWords } from "@/components/scroll-words";

const STEPS = [
  {
    title: "Pick your colour",
    text: "Browse all 10 colours and open the one you love.",
  },
  {
    title: "Choose your offer and delivery area",
    text: "Select how many pieces you want, then your governorate and address.",
  },
  {
    title: "Send your order on WhatsApp",
    text: "A chat opens with your order details and photo ready. Just tap send.",
  },
];

export function About() {
  const collageRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  // Photos in the collage drift at different speeds as you scroll past.
  const { scrollYProgress: collageProgress } = useScroll({
    target: collageRef,
    offset: ["start end", "end start"],
  });
  const big = useSpring(
    useTransform(collageProgress, [0, 1], reduce ? [0, 0] : [60, -60]),
    {
      stiffness: 120,
      damping: 25,
    },
  );
  const small = useSpring(
    useTransform(collageProgress, [0, 1], reduce ? [0, 0] : [-70, 70]),
    {
      stiffness: 120,
      damping: 25,
    },
  );

  // The timeline line fills as you read down the steps.
  const { scrollYProgress: timelineProgress } = useScroll({
    target: timelineRef,
    offset: ["start 75%", "end 60%"],
  });
  const lineScale = useSpring(timelineProgress, {
    stiffness: 120,
    damping: 26,
  });

  return (
    <section
      id="about"
      className="mx-auto max-w-7xl scroll-mt-20 px-5 py-20 md:px-8 md:py-28"
    >
      <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <div ref={collageRef} className="relative">
          <Reveal variant="scale" duration={1.1}>
            <div className="grid grid-cols-5 gap-4">
              <motion.div
                style={{ y: big }}
                className="relative col-span-3 aspect-[3/4] overflow-hidden rounded-[2rem] shadow-[0_30px_60px_-30px_rgb(20_23_26/0.5)]"
              >
                <Image
                  src="/products/olive.jpg"
                  priority
                  alt="Olive Fofi"
                  fill
                  sizes="(min-width: 1024px) 30vw, 60vw"
                  className="object-cover transition-transform duration-[1.2s] hover:scale-105"
                />
              </motion.div>
              <motion.div
                style={{ y: small }}
                className="col-span-2 flex flex-col gap-4 pt-12"
              >
                <div className="relative aspect-[3/4] overflow-hidden rounded-[1.75rem] shadow-[0_30px_60px_-30px_rgb(20_23_26/0.5)]">
                  <Image
                    src="/products/cloud.jpg"
                    alt="Cloud Fofi"
                    fill
                    sizes="(min-width: 1024px) 15vw, 30vw"
                    className="object-cover transition-transform duration-[1.2s] hover:scale-105"
                  />
                </div>
              </motion.div>
            </div>
          </Reveal>
        </div>

        <div>
          <Reveal>
            <p className="eyebrow mb-4">About Fofi</p>
          </Reveal>
          <h2 className="display text-5xl text-ink md:text-6xl">
            <SplitWords text="Not just a blanket," />
            <br />
            <SplitWords text="a piece you wear" delay={0.25} />
          </h2>
          <ScrollWords
            className="mt-6 text-base leading-8 font-bold md:text-lg md:leading-9"
            text="Fofi combines the warmth of a blanket with the freedom of clothing. A soft lining on the inside, a hood that keeps the wind off, and a simple design that works every day, at home or out."
          />

          <div className="relative mt-10">
            {/* track + filling line */}
            <div
              aria-hidden="true"
              className="absolute start-[1.55rem] top-6 bottom-6 w-px bg-ink/15"
            />
            <motion.div
              aria-hidden="true"
              style={{ scaleY: lineScale }}
              className="absolute start-[1.55rem] top-6 bottom-6 w-px origin-top bg-ink"
            />

            <div ref={timelineRef}>
              <Stagger className="relative space-y-5" stagger={0.14}>
                {STEPS.map((step, i) => (
                  <StaggerItem key={step.title} variant="left">
                    <div className="flex gap-5 rounded-3xl bg-surface p-5 shadow-[0_12px_30px_-20px_rgb(20_23_26/0.35)] transition-transform duration-500 hover:-translate-y-1 md:p-6">
                      <span className="font-display grid size-12 shrink-0 place-items-center rounded-full bg-ink text-xl font-black text-yellow ring-4 ring-bg">
                        {i + 1}
                      </span>
                      <div>
                        <h3 className="text-xl font-black">{step.title}</h3>
                        <p className="mt-1 leading-7 text-muted">{step.text}</p>
                      </div>
                    </div>
                  </StaggerItem>
                ))}
              </Stagger>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
