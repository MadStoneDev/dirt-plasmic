import Head from "next/head";
import { useRouter } from "next/router";
import { seoDefaults } from "@/config/seo-defaults";

export interface SEOProps {
  /** Page title — leave empty to let Plasmic handle it */
  title?: string;
  /** Meta description — crucial for search snippets */
  description?: string;
  /** Open Graph image URL (absolute or relative to siteUrl) */
  ogImage?: string;
  /** Override the canonical URL if needed */
  canonical?: string;
  /** Page type for Open Graph (default: "website") */
  ogType?: "website" | "article";
  /** Set to true for pages that shouldn't be indexed (e.g. plasmic-host) */
  noIndex?: boolean;

  // ── JSON-LD structured data (AEO / GEO) ──
  /** Type of the page-level node in the @graph */
  jsonLdType?: "WebPage" | "AboutPage" | "ContactPage" | "CollectionPage";
  /** Name of the page node in JSON-LD (falls back to title, then siteName) */
  pageName?: string;
  /** Which sitewide entity this page is "about" (default: organization) */
  pageAbout?: "organization" | "nikita" | "none";
  /** Primary entity of the page — e.g. the About page is about the founder */
  mainEntity?: "organization" | "nikita";
  /** Reference the logo as the page's primary image (e.g. homepage) */
  primaryImageOfPage?: boolean;
  /** FAQ items — adds a FAQPage node. Answers MUST match visible on-page text. */
  faqItems?: { question: string; answer: string }[];
  /** Page dates for freshness signals */
  datePublished?: string;
  dateModified?: string;
}

export function SEO({
  title,
  description,
  ogImage,
  canonical,
  ogType = "website",
  noIndex = false,
  jsonLdType = "WebPage",
  pageName,
  pageAbout = "organization",
  mainEntity,
  primaryImageOfPage = false,
  faqItems,
  datePublished,
  dateModified,
}: SEOProps) {
  const router = useRouter();
  const {
    siteName,
    siteUrl,
    inLanguage,
    locale,
    defaultDescription,
    defaultOgImage,
    twitterHandle,
    logo,
    organization,
    founder,
  } = seoDefaults;

  const metaDescription = description || defaultDescription;
  const metaOgImage = resolveUrl(ogImage || defaultOgImage, siteUrl);
  const canonicalUrl = canonical || `${siteUrl}${router.asPath.split("?")[0]}`;

  // ── Stable @id anchors for cross-references within the graph ──
  const orgId = `${siteUrl}/#organization`;
  const logoId = `${siteUrl}/#logo`;
  const personId = `${siteUrl}/#nikita`;
  const websiteId = `${siteUrl}/#website`;

  // ── Organization ──
  const organizationNode: Record<string, unknown> = {
    // Multi-typed: Organization is the primary identity; ProfessionalService
    // adds "service business" semantics for AI engines without committing to
    // the LocalBusiness (physical-address) expectations.
    "@type": ["Organization", "ProfessionalService"],
    "@id": orgId,
    name: organization.name,
    alternateName: organization.alternateName,
    legalName: organization.legalName,
    url: siteUrl,
    logo: {
      "@type": "ImageObject",
      "@id": logoId,
      url: resolveUrl(logo, siteUrl),
      caption: organization.name,
    },
    image: { "@id": logoId },
    description: organization.description,
    email: organization.email,
    foundingDate: organization.foundingDate,
    founder: { "@id": personId },
    areaServed: { "@type": "Place", name: organization.areaServed },
    knowsAbout: organization.knowsAbout,
    sameAs: organization.sameAs,
  };

  // ── Person (founder) ──
  const personNode: Record<string, unknown> = {
    "@type": "Person",
    "@id": personId,
    name: founder.name,
    jobTitle: founder.jobTitle,
    description: founder.description,
    worksFor: { "@id": orgId },
    knowsAbout: founder.knowsAbout,
    sameAs: founder.sameAs,
  };

  // ── WebSite ──
  const websiteNode: Record<string, unknown> = {
    "@type": "WebSite",
    "@id": websiteId,
    name: siteName,
    url: siteUrl,
    publisher: { "@id": orgId },
    inLanguage,
  };

  // ── Page-level node ──
  const aboutId =
    pageAbout === "none" ? null : pageAbout === "nikita" ? personId : orgId;
  const mainEntityId =
    mainEntity === "nikita"
      ? personId
      : mainEntity === "organization"
        ? orgId
        : null;

  const pageNode: Record<string, unknown> = {
    "@type": jsonLdType,
    "@id": `${canonicalUrl}#webpage`,
    url: canonicalUrl,
    name: pageName || title || siteName,
    description: metaDescription,
    isPartOf: { "@id": websiteId },
    ...(aboutId && { about: { "@id": aboutId } }),
    ...(mainEntityId && { mainEntity: { "@id": mainEntityId } }),
    ...(primaryImageOfPage && { primaryImageOfPage: { "@id": logoId } }),
    inLanguage,
    ...(datePublished && { datePublished }),
    ...(dateModified && { dateModified }),
  };

  // ── FAQ node (GEO / AI-answer signal; no longer drives Google snippets) ──
  const faqNode =
    faqItems && faqItems.length > 0
      ? {
          "@type": "FAQPage",
          "@id": `${canonicalUrl}#faq`,
          mainEntity: faqItems.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: { "@type": "Answer", text: item.answer },
          })),
        }
      : null;

  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      organizationNode,
      personNode,
      websiteNode,
      pageNode,
      ...(faqNode ? [faqNode] : []),
    ],
  };

  return (
    <Head>
      {/* ── Core meta ── */}
      <meta name="description" content={metaDescription} />
      <link rel="canonical" href={canonicalUrl} />
      {noIndex && <meta name="robots" content="noindex, nofollow" />}

      {/* ── Open Graph ── */}
      <meta property="og:site_name" content={siteName} />
      <meta property="og:type" content={ogType} />
      {title && <meta property="og:title" content={title} />}
      <meta property="og:description" content={metaDescription} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={metaOgImage} />
      <meta property="og:locale" content={locale} />

      {/* ── Twitter Card ── */}
      <meta name="twitter:card" content="summary_large_image" />
      {twitterHandle && <meta name="twitter:site" content={twitterHandle} />}
      {title && <meta name="twitter:title" content={title} />}
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={metaOgImage} />

      {/* ── GEO / AEO signals ── */}
      <meta name="author" content={organization.name} />

      {/* ── JSON-LD structured data (single linked graph) ── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
      />
    </Head>
  );
}

function resolveUrl(path: string, baseUrl: string): string {
  if (path.startsWith("http")) return path;
  return `${baseUrl}${path.startsWith("/") ? "" : "/"}${path}`;
}
