import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Product } from "@/data/products";
import { SITE } from "@/data/site";
import { Tilt } from "@/components/motion";

export function ProductCard({
  product,
  priority = false,
}: {
  product: Product;
  priority?: boolean;
}) {
  if (product.status === "soon") {
    return (
      <div className="flex flex-col">
        <div className="relative grid aspect-[3/4] place-items-center overflow-hidden rounded-[1.75rem] bg-sage text-bg">
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-30 [background-image:repeating-linear-gradient(135deg,transparent_0_18px,rgb(255_255_255/0.35)_18px_19px)]"
          />
          <p className="font-display relative text-3xl font-black md:text-4xl">
            Coming soon
          </p>
        </div>
        <div className="mt-4 px-1">
          <p className="font-display text-2xl font-black text-muted">
            New piece
          </p>
          <p className="mt-1 text-base font-bold text-muted">
            Stay tuned for the launch
          </p>
        </div>
      </div>
    );
  }

  return (
    <Tilt className="relative h-full [transform-style:preserve-3d]">
      <Link
        href={`/shop/${product.slug}`}
        className="group flex h-full flex-col rounded-[2rem] outline-none"
        aria-label={`${product.name}, ${product.color}, $${SITE.price}`}
      >
        <div className="relative aspect-[3/4] overflow-hidden rounded-[1.75rem] bg-sage-soft shadow-[0_18px_40px_-24px_rgb(20_23_26/0.45)] transition-transform duration-500 group-hover:-translate-y-1">
          <Image
            src={product.image}
            alt={`${product.name}, ${product.color}`}
            fill
            priority={priority}
            sizes="(min-width: 1280px) 22vw, (min-width: 768px) 30vw, 46vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <span className="absolute bottom-3 end-3 inline-flex items-center gap-2 rounded-full bg-bg/95 px-4 py-2.5 text-sm font-bold text-ink shadow-md transition-all duration-300 md:translate-y-3 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100 md:group-focus-visible:translate-y-0 md:group-focus-visible:opacity-100">
            Order now
            <ArrowRight className="size-4" />
          </span>
        </div>

        {/* phones: name, colour and price stack so nothing gets cut off */}
        <div className="mt-4 flex flex-col gap-1 px-1 md:flex-row md:items-start md:justify-between md:gap-3">
          <div className="min-w-0">
            <h3 className="font-display text-xl font-black leading-tight md:truncate md:text-[1.7rem]">
              {product.name}
            </h3>
            <p className="mt-1 flex items-center gap-2 text-sm text-muted md:text-[0.95rem]">
              <span
                aria-hidden="true"
                className="inline-block size-3.5 shrink-0 rounded-full ring-1 ring-ink/15"
                style={{ backgroundColor: product.swatch }}
              />
              {product.color}
            </p>
          </div>
          <p className="text-lg font-black md:shrink-0 md:pt-1 md:text-xl">
            ${SITE.price}
          </p>
        </div>
      </Link>
    </Tilt>
  );
}
