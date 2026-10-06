/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://thedirtagency.com",
  generateRobotsTxt: true,
  robotsTxtOptions: {
    // Blog articles are emitted by the dynamic, server-rendered sitemap below
    // (so CMS-published articles appear without a redeploy).
    additionalSitemaps: [
      "https://thedirtagency.com/server-sitemap-blog.xml",
    ],
    policies: [
      { userAgent: "*", allow: "/" },
    ],
  },
  // /blog/* is owned by the dynamic sitemap; exclude the article pages (and the
  // sitemap route itself) from the static sitemap to avoid duplicate URLs.
  exclude: ["/plasmic-host", "/blog/*", "/server-sitemap-blog.xml"],
};
