// Dynamic, server-rendered sitemap for blog articles.
//
// Blog articles are served with ISR (fallback: "blocking"), so an article
// published in the CMS goes live without a redeploy. The static next-sitemap
// output only knows the slugs that existed at build time, so it would miss
// those. This route queries the CMS on every request, so newly published
// articles appear in the sitemap immediately. The static sitemap excludes
// /blog/* (see next-sitemap.config.js) to avoid duplicating these URLs.
import type { GetServerSideProps } from "next";
import { getServerSideSitemapLegacy } from "next-sitemap";
import { getPublishedArticles } from "../../utils/plasmic-cms";
import { seoDefaults } from "@/config/seo-defaults";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const articles = await getPublishedArticles();
  const fields = articles.map((a) => ({
    loc: `${seoDefaults.siteUrl}/blog/${a.slug}`,
    lastmod: new Date(a.updatedAt || a.publishedDate).toISOString(),
    changefreq: "weekly" as const,
    priority: 0.7,
  }));
  return getServerSideSitemapLegacy(ctx, fields);
};

// Required default export for a Next.js page; the XML is produced in
// getServerSideProps, so this component never renders.
export default function BlogSitemap() {
  return null;
}
