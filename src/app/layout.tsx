import type { Metadata } from "next";
import { Figtree, Fraunces } from "next/font/google";
import "./globals.css";
import "@/styles/effects.css";
import "@/styles/texture.css";
import { CursorFollower } from "@/components/cursor-follower";
import { Intro } from "@/components/intro";
import { ScrollProgress } from "@/components/scroll-progress";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { WhatsAppFloat } from "@/components/whatsapp-float";
import { SITE } from "@/data/site";

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: "variable",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url || "http://localhost:3000"),
  title: {
    default: "Fofi | The blanket you can wear",
    template: "%s | Fofi",
  },
  description: SITE.description,
  applicationName: "Fofi",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Fofi",
    title: "Fofi | The blanket you can wear",
    description: SITE.description,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${figtree.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <Intro />
        <CursorFollower />
        <ScrollProgress />
        <SiteHeader />
        <main className="flex-1 overflow-x-clip">{children}</main>
        <SiteFooter />
        <WhatsAppFloat />
      </body>
    </html>
  );
}
