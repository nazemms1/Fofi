export type Product = {
  slug: string;
  name: string;
  /** Short description of the colour, shown next to the product name. */
  color: string;
  /** Approximate colour, used for the swatch dot. */
  swatch: string;
  /** Image path inside /public. */
  image: string;
  status: "available" | "soon";
};

export const PRODUCTS: Product[] = [
  {
    slug: "mauve",
    name: "Mauve Fofi",
    color: "Calm mauve",
    swatch: "#8C7A8C",
    image: "/products/mauve.jpg",
    status: "available",
  },
  {
    slug: "mocha",
    name: "Mocha Fofi",
    color: "Mocha brown",
    swatch: "#9A7A66",
    image: "/products/mocha.jpg",
    status: "available",
  },
  {
    slug: "wolf",
    name: "Wolf Fofi",
    color: "Wolf grey",
    swatch: "#6E7872",
    image: "/products/wolf.jpg",
    status: "available",
  },
  {
    slug: "midnight",
    name: "Midnight Fofi",
    color: "Midnight black",
    swatch: "#1E2024",
    image: "/products/midnight.jpg",
    status: "available",
  },
  {
    slug: "berry",
    name: "Berry Fofi",
    color: "Deep berry red",
    swatch: "#7A1F33",
    image: "/products/berry.jpg",
    status: "available",
  },
  {
    slug: "olive",
    name: "Olive Fofi",
    color: "Olive green",
    swatch: "#5B6B3E",
    image: "/products/olive.jpg",
    status: "available",
  },
  {
    slug: "sage",
    name: "Sage Fofi",
    color: "Sage green",
    swatch: "#8C9C8B",
    image: "/products/sage.jpg",
    status: "available",
  },
  {
    slug: "ochean",
    name: "Ochean Fofi",
    color: "Blue-grey",
    swatch: "#5E7A86",
    image: "/products/ochean.jpg",
    status: "available",
  },
  {
    slug: "cloud",
    name: "Cloud Fofi",
    color: "Cloud white",
    swatch: "#EFEBDD",
    image: "/products/cloud.jpg",
    status: "available",
  },
  {
    slug: "sand",
    name: "Sand Fofi",
    color: "Sand beige",
    swatch: "#C2B39A",
    image: "/products/sand.jpg",
    status: "available",
  },
  {
    slug: "soon-1",
    name: "Coming soon",
    color: "New piece",
    swatch: "#8C9C8B",
    image: "",
    status: "soon",
  },
  {
    slug: "soon-2",
    name: "Coming soon",
    color: "New piece",
    swatch: "#8C9C8B",
    image: "",
    status: "soon",
  },
];

export const AVAILABLE_PRODUCTS = PRODUCTS.filter(
  (p) => p.status === "available",
);

export function getProduct(slug: string) {
  return PRODUCTS.find((p) => p.slug === slug && p.status === "available");
}
