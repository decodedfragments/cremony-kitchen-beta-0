import type { NextConfig } from "next";

// Legacy Shopify URLs from ceremonykitchen.com -> new routes, so existing links
// (Google results, Instagram bio, WhatsApp shares) keep working after migration.
// Product URLs (/products/:handle) are kept identical.
const legacy: [string, string][] = [
  ["/pages/about-us", "/about"],
  ["/pages/contact-1", "/contact"],
  ["/pages/contact", "/contact"],
  ["/pages/corporate", "/corporate"],
  ["/collections", "/shop"],
  ["/collections/all", "/shop"],
  ["/collections/bestsellers", "/bestsellers"],
  ["/collections/cakes", "/shop/cakes"],
  ["/collections/celebration-cakes", "/shop/cakes?type=Celebration%20Cakes"],
  ["/collections/tea-cakes", "/shop/cakes?type=Tea%20Cakes"],
  ["/collections/gluten-free-cakes", "/shop/cakes?diet=Gluten%20Free"],
  ["/collections/sugar-free-cakes", "/shop/cakes?diet=Sugar%20Free"],
  ["/collections/keto-cakes", "/shop/cakes?diet=Keto"],
  ["/collections/eggless-cake", "/shop/cakes?diet=Eggless"],
  ["/collections/chocolate", "/shop/chocolate"],
  ["/collections/chocolate-rituals", "/shop/chocolate"],
  ["/collections/brownies-1", "/shop/chocolate?type=Brownies"],
  ["/collections/chocolate-mix", "/shop/chocolate?type=Drinking%20Chocolate"],
  ["/collections/pantry", "/shop/pantry"],
  ["/collections/morning-rituals", "/shop/pantry"],
  ["/collections/gathering-essentials", "/shop/pantry"],
  ["/collections/daily-delights", "/shop"],
  ["/collections/granola", "/shop/pantry?type=Granola"],
  ["/collections/crackers", "/shop/pantry?type=Crackers"],
  ["/collections/cookie", "/shop?type=Cookies"],
  ["/collections/spreads", "/shop?type=Spreads"],
  ["/collections/sauces", "/shop/pantry?type=Sauces%20%26%20Jams"],
  ["/collections/gifting", "/shop/gifting"],
  ["/collections/gift-collections", "/shop/gifting"],
  ["/collections/corporate", "/corporate"],
  ["/collections/dietary-range", "/shop"],
  ["/collections/gluten-free", "/shop?diet=Gluten%20Free"],
  ["/collections/sugar-free", "/shop?diet=Sugar%20Free"],
  ["/collections/keto", "/shop?diet=Keto"],
  ["/collections/vegan", "/shop?diet=Vegan"],
  ["/collections/eggless", "/shop?diet=Eggless"],
  ["/cart", "/checkout"],
];

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cdn.shopify.com" },
      { protocol: "https", hostname: "ceremonykitchen.com" },
    ],
  },
  async redirects() {
    return [
      ...legacy.map(([source, destination]) => ({ source, destination, permanent: true })),
      { source: "/collections/:c/products/:handle", destination: "/products/:handle", permanent: true },
    ];
  },
};

export default nextConfig;
