export const SITE = {
  name: "Fofi",
  tagline: "The blanket you can wear",
  description:
    "Fofi: a hooded wearable blanket with a soft, thick lining. Warmth, comfort and style in one piece. Choose your colour and order easily on WhatsApp.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "",
  /** WhatsApp number in international format, digits only (no +, no spaces). */
  whatsappNumber: "963988263745",
  whatsappDisplay: "+963 988 263 745",
  instagramUrl: "https://www.instagram.com/fofi.wear/",
  instagramHandle: "@fofi.wear",
  /** Price of a single piece, in USD. */
  price: 39,
  currency: "$",
} as const;

export const OFFERS = [
  { qty: 1, label: "One piece", total: 39, note: "Base price" },
  { qty: 2, label: "Two pieces", total: 75, note: "Save $3" },
  { qty: 3, label: "Three pieces", total: 100, note: "Best value: save $17" },
] as const;

export type OfferQty = (typeof OFFERS)[number]["qty"];

export const GOVERNORATES = [
  "Damascus",
  "Rif Dimashq",
  "Aleppo",
  "Homs",
  "Hama",
  "Latakia",
  "Tartus",
  "Idlib",
  "Deir ez-Zor",
  "Raqqa",
  "Al-Hasakah",
  "Daraa",
  "As-Suwayda",
  "Quneitra",
  "Outside Syria",
] as const;
