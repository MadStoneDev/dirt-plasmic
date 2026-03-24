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
  /** JSON-LD page type — adds rich structured data for AI engines */
  jsonLdType?: "WebPage" | "AboutPage" | "ContactPage" | "FAQPage";
  /** FAQ items for FAQPage schema — great for AEO featured snippets */
  faqItems?: { question: string; answer: string }[];
  /** Article/page date for freshness signals */
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
  faqItems,
  datePublished,
  dateModified,
}: SEOProps) {
  const router = useRouter();
  const {
    siteName,
    siteUrl,
    locale,
    defaultDescription,
    defaultOgImage,
    twitterHandle,
    organization,
  } = seoDefaults;

  const metaDescription = description || defaultDescription;
  const metaOgImage = resolveUrl(ogImage || defaultOgImage, siteUrl);
  const canonicalUrl = canonical || `${siteUrl}${router.asPath.split("?")[0]}`;

  // ── Organization JSON-LD (every page) ──
  const organizationLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: organization.name,
    url: organization.url,
    logo: organization.logo,
    ...(organization.sameAs.length > 0 && { sameAs: organization.sameAs }),
  };

  // ── Page-level JSON-LD ──
  const pageLd: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": jsonLdType,
    name: title || siteName,
    description: metaDescription,
    url: canonicalUrl,
    isPartOf: { "@type": "WebSite", name: siteName, url: siteUrl },
    ...(datePublished && { datePublished }),
    ...(dateModified && { dateModified }),
    publisher: {
      "@type": "Organization",
      name: organization.name,
      logo: { "@type": "ImageObject", url: organization.logo },
    },
  };

  // ── FAQ JSON-LD (AEO gold — drives featured snippets & AI answers) ──
  const faqLd =
    faqItems && faqItems.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqItems.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: item.answer,
            },
          })),
        }
      : null;

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

      {/* ── JSON-LD Structured Data ── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageLd) }}
      />
      {faqLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
        />
      )}
    </Head>
  );
}

function resolveUrl(path: string, baseUrl: string): string {
  if (path.startsWith("http")) return path;
  return `${baseUrl}${path.startsWith("/") ? "" : "/"}${path}`;
}
