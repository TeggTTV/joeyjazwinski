/** @type {import('next-sitemap').IConfig} */
module.exports = {
	siteUrl: 'https://joeyjazwinski.vercel.app',
	sitemapSize: 5000,
	additionalSitemaps: ['https://joeyjazwinski.vercel.app/server-sitemap.xml'],

	// generateRobotsTxt: true,
	// robotsTxtOptions: {
	// 	additionalSitemaps: [
	// 		'https://joeyjazwinski.vercel.app/server-sitemap.xml',
	// 		'https://joeyjazwinski.vercel.app/sitemap.xml',
	// 		'https://joeyjazwinski.vercel.app/sitemap-0.xml',
	// 	],
	// 	UserAgent: '*',
	// 	Host: 'https://joeyjazwinski.vercel.app',
	// 	Disallow: '/api/',
	// 	Allow: '/',
	// },
};
