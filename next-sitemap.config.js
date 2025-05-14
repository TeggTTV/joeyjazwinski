/** @type {import('next-sitemap').IConfig} */
module.exports = {
	siteUrl:
		process.env.NEXT_PUBLIC_SITE_URL || 'https://joeyjazwinski.vercel.app',
	generateRobotsTxt: true,
	sitemapSize: 5000,
	additionalSitemaps: ['https://joeyjazwinski.vercel.app/server-sitemap.xml'],
};
