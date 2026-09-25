// Single source of truth for business details.
// All values verified against ceremonykitchen.com (Contact page + /policies/contact-information).

export const SITE = {
  name: "Cérémony Kitchen",
  legalName: "Ceremony Kitchen",
  founder: "Ruchi Vaish",
  url: "https://ceremonykitchen.com",
  tagline: "Every gathering, however small, deserves a little ceremony.",
  description:
    "Chef-crafted desserts, chocolates, pantry essentials and gifting collections by Ruchi Vaish, trained at Le Cordon Bleu Paris. Handcrafted in New Delhi without unnecessary preservatives or shortcuts.",
  phoneDisplay: "+91 72178 19276",
  phoneE164: "+917217819276",
  email: "ceremony@intheknow.co.in",
  address: {
    line1: "M7 Pushpanjali Farms, Dalmia Vihar",
    city: "New Delhi",
    region: "DL",
    postalCode: "110061",
    country: "India",
  },
  instagramHandle: "@ceremonykitchen_",
  instagramUrl: "https://www.instagram.com/ceremonykitchen_/",
  sameDayCutoff: "3 PM",
};

export const whatsappUrl = (message = "Hello! I have a question about Ceremony Kitchen.") =>
  `https://wa.me/${SITE.phoneE164.replace("+", "")}?text=${encodeURIComponent(message)}`;

export const mailtoUrl = (subject = "Enquiry — Ceremony Kitchen") =>
  `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}`;

export const telUrl = `tel:${SITE.phoneE164}`;

export const fullAddress = `${SITE.address.line1}, ${SITE.address.city} ${SITE.address.region} ${SITE.address.postalCode}, ${SITE.address.country}`;

export const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullAddress)}`;

export const POLICY_LINKS = [
  { slug: "shipping-policy", label: "Shipping" },
  { slug: "refund-policy", label: "Refunds" },
  { slug: "privacy-policy", label: "Privacy" },
  { slug: "terms-of-service", label: "Terms" },
  { slug: "contact-information", label: "Contact information" },
];
