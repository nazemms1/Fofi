"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Logo } from "@/components/logo";
import { EASE } from "@/components/motion";

const KEY = "fofi-intro-seen";

/**
 * A brief brand curtain on the first visit of a browser session.
 * It lifts away to reveal the page.
 */
export function Intro() {
  const reduce = useReducedMotion();
  const [show, setShow] = useState(true);

  useEffect(() => {
    let seen = false;
    try {
      seen = window.sessionStorage.getItem(KEY) === "1";
    } catch {
      seen = false;
    }
    if (seen || reduce) {
      const hide = window.setTimeout(() => setShow(false), 0);
      return () => window.clearTimeout(hide);
    }
    // Mark as seen only once the curtain has played, so a dev-mode double
    // effect run does not dismiss it early.
    const timer = window.setTimeout(() => {
      setShow(false);
      try {
        window.sessionStorage.setItem(KEY, "1");
      } catch {
        /* storage unavailable: the intro simply plays again next time */
      }
    }, 1500);
    return () => window.clearTimeout(timer);
  }, [reduce]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="intro"
          aria-hidden="true"
          className="fixed inset-0 z-[90] grid place-items-center bg-sage"
          exit={{ y: "-100%", transition: { duration: 0.95, ease: EASE } }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.86, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.9, ease: EASE }}
          >
            <Logo
              variant="cream"
              href={null}
              className="h-28 md:h-40"
              priority
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
