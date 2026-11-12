"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "motion/react";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/logo";
import { WhatsAppIcon } from "@/components/icons";
import { EASE, Magnetic } from "@/components/motion";
import { whatsappGreetingUrl } from "@/lib/whatsapp";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/#offers", label: "Offers" },
  { href: "/#about", label: "About" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Shrink and add depth to the header once the page has moved.
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 24));

  // Lock page scroll while the mobile menu is open.
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  return (
    <>
      <motion.header
        initial={reduce ? false : { y: -90, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
        className={`sticky top-0 z-50 border-b transition-[background-color,box-shadow,border-color] duration-500 ${
          scrolled
            ? "border-line bg-bg/95 shadow-[0_12px_30px_-18px_rgb(20_23_26/0.35)] backdrop-blur-xl"
            : "border-transparent bg-bg/70 backdrop-blur-md"
        }`}
      >
        <div
          className={`mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 transition-[height] duration-500 md:px-8 ${
            scrolled ? "h-14 md:h-16" : "h-16 md:h-20"
          }`}
        >
          <Logo
            className={`transition-[height] duration-500 ${scrolled ? "h-8 md:h-9" : "h-9 md:h-11"}`}
            priority
          />

          <nav
            aria-label="Main navigation"
            className="hidden items-center gap-1 md:flex"
          >
            {NAV.map((item) => {
              const active = item.href === pathname;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`group relative rounded-full px-4 py-2 text-[0.95rem] font-bold transition-colors ${
                    active ? "text-ink" : "text-muted hover:text-ink"
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 -z-10 rounded-full bg-sage-soft"
                      transition={{
                        type: "spring",
                        stiffness: 420,
                        damping: 34,
                      }}
                    />
                  )}
                  <span className="absolute inset-0 -z-10 scale-75 rounded-full bg-sage-soft opacity-0 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <Magnetic className="hidden md:inline-flex">
              <a
                href={whatsappGreetingUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp text-sm"
              >
                <WhatsAppIcon className="size-4" />
                WhatsApp
              </a>
            </Magnetic>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="relative grid size-11 place-items-center overflow-hidden rounded-full bg-ink text-bg md:hidden"
            >
              <AnimatePresence initial={false} mode="wait">
                <motion.span
                  key={open ? "close" : "open"}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="grid place-items-center"
                >
                  {open ? (
                    <X className="size-5" />
                  ) : (
                    <Menu className="size-5" />
                  )}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, clipPath: "circle(0% at 92% 4%)" }}
            animate={{ opacity: 1, clipPath: "circle(150% at 92% 4%)" }}
            exit={{ opacity: 0, clipPath: "circle(0% at 92% 4%)" }}
            transition={{ duration: 0.6, ease: EASE }}
            className="fixed inset-0 z-40 flex flex-col bg-bg pt-16 md:hidden"
          >
            <motion.nav
              aria-label="Mobile navigation"
              className="flex flex-col gap-1 p-4"
              initial="hidden"
              animate="show"
              variants={{
                hidden: {},
                show: {
                  transition: { staggerChildren: 0.07, delayChildren: 0.2 },
                },
              }}
            >
              {NAV.map((item, i) => (
                <motion.div
                  key={item.href}
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    show: { opacity: 1, y: 0 },
                  }}
                  transition={{ duration: 0.6, ease: EASE }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="group flex items-center justify-between rounded-2xl px-5 py-4 font-display text-4xl font-black transition-colors hover:bg-sage-soft"
                  >
                    {item.label}
                    <span className="font-sans text-sm font-bold text-muted transition-transform group-hover:translate-x-1">
                      0{i + 1}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </motion.nav>
            <motion.div
              className="mt-auto p-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6, ease: EASE }}
            >
              <a
                href={whatsappGreetingUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp w-full"
              >
                <WhatsAppIcon className="size-5" />
                Chat with us on WhatsApp
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
