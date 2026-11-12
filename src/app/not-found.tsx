import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[70vh] max-w-3xl flex-col items-center justify-center px-5 py-20 text-center">
      <p className="font-display text-[7rem] font-black leading-none text-sage-deep md:text-[10rem]">
        404
      </p>
      <h1 className="display mt-4 text-4xl md:text-5xl">
        This page could not be found
      </h1>
      <p className="mt-4 max-w-md text-lg leading-8 text-muted">
        The link may be broken or the page may have moved. Keep exploring our
        collection.
      </p>
      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        <Link href="/" className="btn btn-primary">
          Home
        </Link>
        <Link href="/shop" className="btn btn-ghost">
          Shop the collection
          <ArrowRight className="size-4" />
        </Link>
      </div>
    </section>
  );
}
