/**
 * Site-wide SEO defaults.
 * Update these once — every page inherits them via <SEO />.
 *
 * The <SEO /> component assembles these into a single JSON-LD `@graph`
 * (Organization + Person + WebSite + the page node), linked by `@id`.
 */

export const seoDefaults = {
  siteName: "DIRT",
  siteUrl: "https://thedirtagency.com",
  /** BCP-47 language tag — matches <Html lang> in _document.tsx */
  inLanguage: "en-AU",
  /** Open Graph locale (underscore form) */
  locale: "en_AU",
  defaultTitle: "DIRT — We dig brands out of the dirt",
  defaultDescription:
    "DIRT is a strategy-led branding and positioning agency for construction, AEC software, property development, and building material companies. Fresh messaging, brand identity, and websites built from the ground up.",
  defaultOgImage: "/og-default.jpg",
  twitterHandle: "",
  /** Logo file (verified to exist in /public); resolved to absolute for JSON-LD */
  logo: "/logo.png",

  // ── JSON-LD Organization (used on every page for AEO/GEO) ──
  organization: {
    name: "DIRT",
    alternateName: "DIRT Agency",
    legalName: "Dirt Creative Pty Ltd",
    email: "hello@thedirtagency.com",
    foundingDate: "2025-09-02",
    description:
      "DIRT is a strategy-led branding and positioning agency for construction, AEC software, property, and building-material companies. Messaging-led, bold, and built for firms that want to stop sounding like everyone else.",
    /** Global by design — DIRT serves clients worldwide */
    areaServed: "Worldwide",
    knowsAbout: [
      "Brand positioning",
      "Messaging strategy",
      "Brand strategy",
      "Construction branding",
      "AEC software marketing",
      "ConTech marketing",
      "PropTech marketing",
      "Property development branding",
      "Building materials marketing",
      "Copywriting for the built environment",
    ],
    sameAs: ["https://www.linkedin.com/company/thedirtagency"],
  },

  // ── JSON-LD Person (founder — strengthens the entity link for GEO) ──
  founder: {
    name: "Nikita Morell",
    jobTitle: "Founder",
    description:
      "Nikita Morell is the founder of DIRT and has spent over a decade helping firms in the built environment sharpen their positioning and messaging to win more work. She previously built a successful agency specialising in copywriting and brand strategy for architects.",
    /** Canonical personal site — doubles as the Person node's url. */
    url: "https://nikitamorell.com",
    /** Headshot (Plasmic CDN asset); surfaces as the Person node's image. */
    image: "https://site-assets.plasmic.app/e6fec99b55d4e4b1b72654ea80fa0c1e.png",
    knowsAbout: [
      "Brand positioning",
      "Messaging strategy",
      "Copywriting",
      "Branding for the built environment",
      "Marketing for architects and AEC firms",
    ],
    // nikitamorell.com bridges her established authority to the DIRT entity.
    sameAs: [
      "https://au.linkedin.com/in/nikita-morell",
      "https://nikitamorell.com",
    ],
  },
};
