import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProductCard } from "@/components/product-card";
import { Reveal } from "@/components/reveal";
import { PRODUCTS, AVAILABLE_PRODUCTS } from "@/data/products";
import { OFFERS, SITE } from "@/data/site";

export const metadata: Metadata = {
  title: "Shop",
  description: `Choose your colour from the Fofi collection: ${AVAILABLE_PRODUCTS.length} colours at $${SITE.price} per piece. Order directly on WhatsApp.`,
};

export default function ShopPage() {
  return (
    <>
      <section className="mx-auto max-w-7xl px-5 pb-10 pt-12 md:px-8 md:pb-14 md:pt-20">
        <Reveal>
          <nav aria-label="Breadcrumb" className="mb-6 text-sm text-muted">
            <Link href="/" className="hover:text-ink">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="font-bold text-ink">Shop</span>
          </nav>

          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="eyebrow mb-4">Fofi</p>
              <h1 className="display text-6xl text-ink md:text-8xl">Shop</h1>
              <p className="mt-5 max-w-xl text-lg leading-8 text-muted">
                {AVAILABLE_PRODUCTS.length} colours available now, each at $
                {SITE.price}. Pick a colour, choose your offer and delivery
                area, then order on WhatsApp.
              </p>
            </div>

            <Link
              href="/#offers"
              className="group flex items-center gap-4 rounded-full bg-yellow py-2 pe-6 ps-2 text-ink transition-transform hover:-translate-y-0.5"
            >
              <span className="grid size-12 place-items-center rounded-full bg-ink text-yellow">
                <ArrowRight className="size-5" />
              </span>
              <span className="text-left">
                <span className="block text-sm font-bold opacity-75">
                  Special offer
                </span>
                <span className="block font-black">
                  3 pieces for ${OFFERS[2].total}
                </span>
              </span>
            </Link>
          </div>
        </Reveal>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-24 md:px-8 md:pb-32">
        <div className="grid grid-cols-2 gap-x-4 gap-y-12 md:grid-cols-3 md:gap-x-7 xl:grid-cols-4">
          {PRODUCTS.map((product, i) => (
            <Reveal key={product.slug} delay={Math.min(i, 6) * 0.05}>
              <ProductCard product={product} priority={i < 2} />
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
