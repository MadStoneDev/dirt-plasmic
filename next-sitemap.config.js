/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://thedirtagency.com",
  generateRobotsTxt: true,
  robotsTxtOptions: {
    additionalSitemaps: [],
    policies: [
      { userAgent: "*", allow: "/" },
    ],
  },
  exclude: ["/plasmic-host"],
};
