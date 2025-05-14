/** @type {import('next-sitemap').IConfig} */
module.exports = {
	siteUrl:
		process.env.NEXT_PUBLIC_VERCEL_ENV || 'https://joeyjazwinski.vercel.app',
		sitemapSize: 5000,	
		additionalSitemaps: ['https://joeyjazwinski.vercel.app/server-sitemap.xml'],

		generateRobotsTxt: true,
		robotsTxtOptions: {
			additionalSitemaps: [
				'https://joeyjazwinski.vercel.app/server-sitemap.xml',
			],
			UserAgent: '*',
			Host: 'https://joeyjazwinski.vercel.app',
			Disallow: '/api/',
			Allow: '/',
		},
};
