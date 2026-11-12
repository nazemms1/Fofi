import type { Metadata } from "next";
import Image from "next/image";
import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { OrderForm } from "@/components/order-form";
import { Reveal } from "@/components/reveal";
import { SplitWords } from "@/components/motion";
import { AVAILABLE_PRODUCTS, getProduct } from "@/data/products";
import { SITE } from "@/data/site";

export function generateStaticParams() {
  return AVAILABLE_PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(
  props: PageProps<"/shop/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const product = getProduct(slug);
  if (!product) return { title: "Not found" };

  return {
    title: `${product.name}, ${product.color}`,
    description: `${product.name} from Fofi, ${product.color}. $${SITE.price} per piece. Order directly on WhatsApp.`,
    openGraph: {
      images: [{ url: product.image, alt: product.name }],
    },
  };
}

export default function ProductPage(props: PageProps<"/shop/[slug]">) {
  // Pass the whole props object down so `params` is only read inside the Suspense boundary.
  return (
    <Suspense fallback={<ProductSkeleton />}>
      <ProductDetails pageProps={props} />
    </Suspense>
  );
}

function ProductSkeleton() {
  return (
    <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-5 pt-8 md:px-8 md:pt-14 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
      <div className="aspect-[4/5] animate-pulse rounded-[2.5rem] bg-sage-soft" />
      <div className="space-y-6 pt-4">
        <div className="h-4 w-24 animate-pulse rounded-full bg-sage-soft" />
        <div className="h-16 w-3/4 animate-pulse rounded-2xl bg-sage-soft" />
        <div className="h-96 animate-pulse rounded-[2.5rem] bg-sage-soft" />
      </div>
    </div>
  );
}

async function ProductDetails({
  pageProps,
}: {
  pageProps: PageProps<"/shop/[slug]">;
}) {
  const { slug } = await pageProps.params;
  const product = getProduct(slug);
  if (!product) notFound();

  const others = AVAILABLE_PRODUCTS.filter((p) => p.slug !== product.slug);

  return (
    <div className="mx-auto max-w-7xl px-5 pb-32 pt-8 md:px-8 md:pb-28 md:pt-14">
      <nav aria-label="Breadcrumb" className="mb-8 text-sm text-muted">
        <Link href="/" className="hover:text-ink">
          Home
        </Link>
        <span className="mx-2">/</span>
        <Link href="/shop" className="hover:text-ink">
          Shop
        </Link>
        <span className="mx-2">/</span>
        <span className="font-bold text-ink">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
        {/* gallery */}
        <Reveal
          variant="blur"
          duration={1.1}
          className="min-w-0 lg:sticky lg:top-28 lg:self-start"
        >
          <div className="group relative aspect-[4/5] overflow-hidden rounded-[2.5rem] bg-sage-soft shadow-[0_30px_60px_-30px_rgb(20_23_26/0.5)]">
            <Image
              src={product.image}
              alt={`${product.name}, ${product.color}`}
              fill
              priority
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-105"
            />
            <span className="absolute start-5 top-5 rounded-full bg-bg/95 px-4 py-2 text-sm font-bold text-ink shadow">
              {product.color}
            </span>
          </div>

          <div className="mt-6">
            <p className="mb-3 text-sm font-bold text-muted">Other colours</p>
            <ul className="no-scrollbar -mx-5 flex gap-3 overflow-x-auto px-5 pb-2 md:mx-0 md:px-0">
              {others.map((p) => (
                <li key={p.slug} className="shrink-0">
                  <Link
                    href={`/shop/${p.slug}`}
                    aria-label={p.name}
                    title={p.name}
                    className="group block"
                  >
                    <span className="relative block size-16 overflow-hidden rounded-2xl ring-2 ring-transparent transition-all group-hover:ring-ink md:size-20">
                      <Image
                        src={p.image}
                        alt=""
                        fill
                        sizes="80px"
                        className="object-cover"
                      />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        {/* details + order */}
        <div className="min-w-0">
          <Reveal>
            <p className="eyebrow mb-4">Fofi</p>
            <h1 className="display text-5xl text-ink sm:text-6xl md:text-7xl">
              <SplitWords text={product.name} delay={0.1} />
            </h1>

            <p className="mt-4 flex items-center gap-3 text-lg text-muted">
              <span
                aria-hidden="true"
                className="inline-block size-5 rounded-full ring-1 ring-ink/15"
                style={{ backgroundColor: product.swatch }}
              />
              {product.color}
            </p>

            <div className="mt-8 flex items-end gap-4 border-b border-line pb-8">
              <p className="font-display text-6xl font-black leading-none">
                ${SITE.price}
              </p>
              <p className="pb-1 text-base font-bold text-muted">per piece</p>
            </div>

            <p className="mt-8 text-base leading-8 text-ink/80 md:text-lg md:leading-9">
              A hooded blanket with a soft, thick lining inside and an elegant{" "}
              <span className="font-bold text-ink">
                {product.color.toLowerCase()}
              </span>{" "}
              outer shell. Choose your offer and delivery area, then send your
              order on WhatsApp in a minute.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-10 rounded-[2.5rem] border border-line bg-surface p-5 shadow-[0_24px_60px_-40px_rgb(20_23_26/0.5)] md:p-8">
              <h2 className="display text-3xl md:text-4xl">
                Complete your order
              </h2>
              <p className="mt-2 text-muted">
                Fill in your details and we will receive the order directly on
                WhatsApp.
              </p>
              <OrderForm product={product} />
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
