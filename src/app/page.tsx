import { About } from "@/components/about";
import { ColorShowcase } from "@/components/color-showcase";
import { ContactBand } from "@/components/contact-band";
import { Hero } from "@/components/hero";
import { Marquee } from "@/components/marquee";
import { Offers } from "@/components/offers";
import { ProductMarquee } from "@/components/product-marquee";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee />
      <ProductMarquee />
      <ColorShowcase />
      <Offers />
      <About />
      <div className="pt-6 pb-20 md:pb-28">
        <ContactBand />
      </div>
    </>
  );
}
