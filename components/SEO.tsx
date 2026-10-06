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
  /**
   * Skip rendering <link rel="canonical">. Set on pages backed by a Plasmic
   * page component, which emits its own canonical — this avoids a duplicate.
   * Leave off for standalone pages (privacy, terms) so SEO owns the canonical.
   */
  skipCanonical?: boolean;

  // ── JSON-LD structured data (AEO / GEO) ──
  /** Type of the page-level node in the @graph */
  jsonLdType?:
    | "WebPage"
    | "AboutPage"
    | "ContactPage"
    | "CollectionPage"
    | "BlogPosting";
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
  /**
   * Breadcrumb trail (root → current), rendered as a BreadcrumbList node.
   * `url` may be absolute or site-relative; the last item is the current page.
   */
  breadcrumbs?: { name: string; url: string }[];
  /**
   * Blog-listing posts — rendered as an ItemList (the page's mainEntity).
   * Each becomes a BlogPosting entry with url + headline + datePublished.
   */
  itemList?: { title: string; url: string; datePublished?: string }[];

  // ── Article / BlogPosting (used when jsonLdType === "BlogPosting") ──
  /** Article headline for the BlogPosting node (defaults to title/pageName) */
  headline?: string;
  /** Article author. If the name matches the site founder, the existing
   *  Person node is referenced instead of duplicating it. */
  articleAuthor?: {
    name: string;
    url?: string;
    image?: string;
    sameAs?: string[];
  };
  /** Article image (absolute or site-relative); falls back to the OG image */
  articleImage?: string;
  /** Plain-text article body (AEO signal; answer engines parse articleBody) */
  articleBody?: string;
  /** Word count of the article body */
  wordCount?: number;
  /** Section/category the article belongs to */
  articleSection?: string;
  /** Article keywords/tags */
  keywords?: string[];
}

export function SEO({
  title,
  description,
  ogImage,
  canonical,
  ogType = "website",
  noIndex = false,
  skipCanonical = false,
  jsonLdType = "WebPage",
  pageName,
  pageAbout = "organization",
  mainEntity,
  primaryImageOfPage = false,
  faqItems,
  datePublished,
  dateModified,
  breadcrumbs,
  itemList,
  headline,
  articleAuthor,
  articleImage,
  articleBody,
  wordCount,
  articleSection,
  keywords,
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
    ...(founder.url && { url: founder.url }),
    ...(founder.image && {
      image: {
        "@type": "ImageObject",
        url: resolveUrl(founder.image, siteUrl),
        caption: founder.name,
      },
    }),
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

  const isBlogPosting = jsonLdType === "BlogPosting";

  // Reuse the founder Person node when the author is Nikita; otherwise emit an
  // inline Person so the article still credits a named human.
  const articleAuthorRef = articleAuthor
    ? articleAuthor.name === founder.name
      ? { "@id": personId }
      : {
          "@type": "Person",
          name: articleAuthor.name,
          ...(articleAuthor.url && { url: articleAuthor.url }),
          ...(articleAuthor.image && {
            image: {
              "@type": "ImageObject",
              url: resolveUrl(articleAuthor.image, siteUrl),
              caption: articleAuthor.name,
            },
          }),
          ...(articleAuthor.sameAs &&
            articleAuthor.sameAs.length > 0 && {
              sameAs: articleAuthor.sameAs,
            }),
        }
    : { "@id": orgId };

  // Build an ItemList of posts for the blog listing (the page's mainEntity).
  const itemListEntity =
    itemList && itemList.length > 0
      ? {
          "@type": "ItemList",
          itemListElement: itemList.map((post, i) => ({
            "@type": "ListItem",
            position: i + 1,
            url: resolveUrl(post.url, siteUrl),
            item: {
              "@type": "BlogPosting",
              "@id": `${resolveUrl(post.url, siteUrl)}#webpage`,
              headline: post.title,
              url: resolveUrl(post.url, siteUrl),
              ...(post.datePublished && { datePublished: post.datePublished }),
            },
          })),
        }
      : null;

  const pageNode: Record<string, unknown> = {
    "@type": jsonLdType,
    "@id": `${canonicalUrl}#webpage`,
    url: canonicalUrl,
    name: pageName || title || siteName,
    description: metaDescription,
    isPartOf: { "@id": websiteId },
    ...(breadcrumbs &&
      breadcrumbs.length > 0 && {
        breadcrumb: { "@id": `${canonicalUrl}#breadcrumb` },
      }),
    ...(aboutId && { about: { "@id": aboutId } }),
    ...(mainEntityId
      ? { mainEntity: { "@id": mainEntityId } }
      : itemListEntity && { mainEntity: itemListEntity }),
    ...(primaryImageOfPage && { primaryImageOfPage: { "@id": logoId } }),
    inLanguage,
    ...(datePublished && { datePublished }),
    ...(dateModified && { dateModified }),
    ...(isBlogPosting && {
      headline: headline || title || pageName || siteName,
      author: articleAuthorRef,
      publisher: { "@id": orgId },
      image: resolveUrl(articleImage || ogImage || defaultOgImage, siteUrl),
      mainEntityOfPage: { "@id": `${canonicalUrl}#webpage` },
      ...(articleBody && { articleBody }),
      ...(typeof wordCount === "number" &&
        wordCount > 0 && { wordCount }),
      ...(articleSection && { articleSection }),
      ...(keywords && keywords.length > 0 && { keywords }),
    }),
  };

  // ── Breadcrumbs ──
  const breadcrumbNode =
    breadcrumbs && breadcrumbs.length > 0
      ? {
          "@type": "BreadcrumbList",
          "@id": `${canonicalUrl}#breadcrumb`,
          itemListElement: breadcrumbs.map((crumb, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: crumb.name,
            item: resolveUrl(crumb.url, siteUrl),
          })),
        }
      : null;

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
      ...(breadcrumbNode ? [breadcrumbNode] : []),
      ...(faqNode ? [faqNode] : []),
    ],
  };

  return (
    <Head>
      {/* ── Core meta ── */}
      {/*
        Title/description keys below match the keys Plasmic's generated <Head>
        uses. next/head dedupes by key and the Plasmic page component renders
        after this one, so on Plasmic-backed pages the Studio-edited value wins;
        on standalone pages (privacy, terms) these are the only source. The
        plain name="description" is intentionally left unkeyed — Plasmic emits a
        non-standard property="description" that crawlers ignore, so we keep ours.
      */}
      {/*
        <title> is emitted only when an explicit title is passed. Plasmic-backed
        pages leave this to Studio's <title key="title"> (which renders after and
        wins by key). Dynamic pages whose Plasmic component emits an empty <Head>
        (e.g. the article template) pass `title` so SEO owns the document title.
      */}
      {title && <title key="title">{title}</title>}
      <meta name="description" content={metaDescription} />
      {!skipCanonical && <link rel="canonical" href={canonicalUrl} />}
      {noIndex && <meta name="robots" content="noindex, nofollow" />}

      {/* ── Open Graph ── */}
      <meta property="og:site_name" content={siteName} />
      <meta property="og:type" content={ogType} />
      {title && <meta key="og:title" property="og:title" content={title} />}
      <meta key="og:description" property="og:description" content={metaDescription} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={metaOgImage} />
      <meta property="og:locale" content={locale} />
      {ogType === "article" && datePublished && (
        <meta property="article:published_time" content={datePublished} />
      )}
      {ogType === "article" && dateModified && (
        <meta property="article:modified_time" content={dateModified} />
      )}
      {ogType === "article" && articleAuthor?.name && (
        <meta property="article:author" content={articleAuthor.name} />
      )}

      {/* ── Twitter Card ── */}
      <meta name="twitter:card" content="summary_large_image" />
      {twitterHandle && <meta name="twitter:site" content={twitterHandle} />}
      {title && <meta key="twitter:title" name="twitter:title" content={title} />}
      <meta key="twitter:description" name="twitter:description" content={metaDescription} />
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
