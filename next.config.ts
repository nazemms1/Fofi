import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The site is fully static (every page is prerendered), so it is exported as
  // plain HTML/CSS/JS files that Cloudflare Pages can host for free.
  output: "export",
  images: {
    // Static export has no image optimizer server; images are served as-is.
    unoptimized: true,
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
