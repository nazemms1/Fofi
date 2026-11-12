import Link from "next/link";
import { InstagramIcon, WhatsAppIcon } from "@/components/icons";
import { Logo } from "@/components/logo";
import { SITE } from "@/data/site";
import { whatsappGreetingUrl } from "@/lib/whatsapp";

export function SiteFooter() {
  return (
    <footer className="mt-24 bg-ink text-bg">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-5 py-16 md:grid-cols-12 md:px-8 md:py-20">
        <div className="md:col-span-5">
          <Logo variant="cream" className="h-16 md:h-20" />
          <p className="mt-6 max-w-sm text-base leading-8 text-bg/70">
            A hooded wearable blanket with a soft, thick lining. Warmth, comfort
            and style in one piece, ordered in seconds on WhatsApp.
          </p>
        </div>

        <nav aria-label="Quick links" className="md:col-span-3">
          <h2 className="text-sm font-bold tracking-wider text-yellow">
            Explore
          </h2>
          <ul className="mt-5 space-y-3 text-base">
            <li>
              <Link
                href="/"
                className="text-bg/80 transition-colors hover:text-yellow"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/shop"
                className="text-bg/80 transition-colors hover:text-yellow"
              >
                Shop
              </Link>
            </li>
            <li>
              <Link
                href="/#offers"
                className="text-bg/80 transition-colors hover:text-yellow"
              >
                Offers
              </Link>
            </li>
            <li>
              <Link
                href="/#about"
                className="text-bg/80 transition-colors hover:text-yellow"
              >
                About Fofi
              </Link>
            </li>
          </ul>
        </nav>

        <div className="md:col-span-4">
          <h2 className="text-sm font-bold tracking-wider text-yellow">
            Contact us
          </h2>
          <div className="mt-5 flex flex-col gap-3">
            <a
              href={whatsappGreetingUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 rounded-2xl bg-bg/[0.06] p-4 transition-colors hover:bg-bg/[0.12]"
            >
              <span className="grid size-10 place-items-center rounded-full bg-whatsapp text-white">
                <WhatsAppIcon className="size-5" />
              </span>
              <span>
                <span className="block text-sm text-bg/60">WhatsApp</span>
                <span dir="ltr" className="block text-base font-bold">
                  {SITE.whatsappDisplay}
                </span>
              </span>
            </a>
            <a
              href={SITE.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 rounded-2xl bg-bg/[0.06] p-4 transition-colors hover:bg-bg/[0.12]"
            >
              <span className="grid size-10 place-items-center rounded-full bg-yellow text-ink">
                <InstagramIcon className="size-5" />
              </span>
              <span>
                <span className="block text-sm text-bg/60">Instagram</span>
                <span dir="ltr" className="block text-base font-bold">
                  {SITE.instagramHandle}
                </span>
              </span>
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-bg/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-5 py-6 text-sm text-bg/55 md:flex-row md:px-8">
          <p>© Fofi. All rights reserved.</p>
          <p>Fofi, the wearable blanket</p>
        </div>
      </div>
    </footer>
  );
}
