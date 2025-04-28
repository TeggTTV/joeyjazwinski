/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://myfullname.vercel.app',
  generateRobotsTxt: true,
  sitemapSize: 5000,
};