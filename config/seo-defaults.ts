/**
 * Site-wide SEO defaults.
 * Update these once — every page inherits them via <SEO />.
 */

export const seoDefaults = {
  siteName: "DIRT",
  siteUrl: "https://thedirtagency.com",
  locale: "en_AU",
  defaultTitle: "DIRT — We dig brands out of the dirt",
  defaultDescription:
    "DIRT is a strategy-led branding and positioning agency for construction, AEC software, property development, and building material companies in Australia. Fresh messaging, brand identity, and websites built from the ground up.",
  defaultOgImage: "/og-default.jpg",
  twitterHandle: "",
  // JSON-LD Organization (used on every page for AEO/GEO)
  organization: {
    name: "DIRT",
    alternateName: "DIRT Agency",
    url: "https://thedirtagency.com",
    logo: "https://thedirtagency.com/logo.png",
    description:
      "DIRT is a strategy-led branding and positioning agency for construction, AEC software, property development, and building material businesses. Based in Sydney, Australia.",
    sameAs: [
      "https://www.instagram.com/thedirt.agency/",
    ],
    founder: {
      name: "Nikita Morell",
    },
    areaServed: "AU",
    knowsAbout: [
      "Construction branding",
      "AEC software marketing",
      "Property development branding",
      "Building materials marketing",
      "Brand positioning",
      "Brand strategy",
    ],
  },
};
