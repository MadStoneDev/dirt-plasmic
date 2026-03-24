/**
 * Site-wide SEO defaults.
 * Update these once — every page inherits them via <SEO />.
 */

export const seoDefaults = {
  siteName: "DIRT",
  siteUrl: "https://www.wearethedirt.com",
  locale: "en_AU",
  defaultTitle: "DIRT — We dig brands out of the dirt",
  defaultDescription:
    "DIRT is a brand and marketing consultancy that helps businesses uncover what makes them different, build strategy that sticks, and grow with intention.",
  defaultOgImage: "/og-default.jpg",
  twitterHandle: "",
  // JSON-LD Organization (used on every page for AEO/GEO)
  organization: {
    name: "DIRT",
    url: "https://www.wearethedirt.com",
    logo: "https://www.wearethedirt.com/logo.png",
    sameAs: [
      // Add social profiles here — these help AI engines and Google Knowledge Panel
      // "https://www.linkedin.com/company/dirt",
      // "https://www.instagram.com/wearethedirt",
    ],
  },
};
