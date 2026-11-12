import { InstagramIcon, WhatsAppIcon } from "@/components/icons";
import { Reveal } from "@/components/reveal";
import { SITE } from "@/data/site";
import { whatsappGreetingUrl } from "@/lib/whatsapp";

export function ContactBand() {
  return (
    <section className="mx-auto max-w-7xl px-5 pb-6 md:px-8">
      <Reveal>
        <div className="relative overflow-hidden rounded-[2.5rem] bg-sage-deep px-6 py-14 text-center text-bg md:px-16 md:py-20">
          <div
            aria-hidden="true"
            className="absolute -start-20 -top-20 size-72 rounded-full bg-sage/30 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="absolute -bottom-24 -end-16 size-80 rounded-full bg-yellow/20 blur-3xl"
          />

          <div className="relative mx-auto max-w-2xl">
            <h2 className="display text-4xl md:text-6xl">
              Have a question before you order?
            </h2>
            <p className="mt-5 text-lg leading-8 text-bg/85">
              Message us directly on WhatsApp, or follow the latest colours and
              looks on Instagram.
            </p>

            <div className="mt-10 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
              <a
                href={whatsappGreetingUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-yellow"
              >
                <WhatsAppIcon className="size-5" />
                <span dir="ltr">{SITE.whatsappDisplay}</span>
              </a>
              <a
                href={SITE.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn border border-bg/40 bg-transparent text-bg hover:bg-bg hover:text-ink"
              >
                <InstagramIcon className="size-5" />
                <span dir="ltr">{SITE.instagramHandle}</span>
              </a>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
