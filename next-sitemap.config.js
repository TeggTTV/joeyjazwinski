/** @type {import('next-sitemap').IConfig} */
module.exports = {
	siteUrl: 'https://joeyjazwinski.com',
	generateRobotsTxt: true,
	sitemapSize: 5000,

	// Dynamic content is handled by server-sitemap.xml (blogs, courses)
	additionalPaths: async (config) => {
		const result = [];

		// Add static pages with custom priorities and change frequencies
		const staticPages = [
			{ loc: '/', priority: 1.0, changefreq: 'weekly' },
			{ loc: '/about', priority: 0.8, changefreq: 'monthly' },
			{ loc: '/projects', priority: 0.9, changefreq: 'weekly' },
			// { loc: '/photography', priority: 0.8, changefreq: 'weekly' },
			{ loc: '/blogs', priority: 0.9, changefreq: 'daily' },
			{ loc: '/courses', priority: 0.9, changefreq: 'weekly' },
			{ loc: '/contact', priority: 0.7, changefreq: 'monthly' },
			{ loc: '/leaderboard', priority: 0.6, changefreq: 'daily' },
			{ loc: '/patch-notes', priority: 0.5, changefreq: 'weekly' },
			{ loc: '/analytics', priority: 0.4, changefreq: 'monthly' },
		];

		staticPages.forEach((page) => {
			result.push({
				loc: page.loc,
				changefreq: page.changefreq,
				priority: page.priority,
				lastmod: new Date().toISOString(),
			});
		});

		return result;
	},

	// Exclude API routes, auth pages, and server-side dynamic routes
	exclude: [
		'/api/*',
		'/server-sitemap.xml',
		'/login',
		'/signup',
		'/dashboard',
		'/dashboard/*',
		'/settings',
		'/settings/*',
		'/profile',
		'/profile/*',
		'/u/*',
		'/blogs/*', // Handled by server-sitemap.xml
		'/courses/*', // Handled by server-sitemap.xml
		'/tracks/*',
		'/demos/*',
		'gallery/*',
	],

	robotsTxtOptions: {
		policies: [
			{
				userAgent: '*',
				allow: '/',
				disallow: [
					'/api/',
					'/dashboard/',
					'/settings/',
					'/login/',
					'/signup/',
				],
			},
		],
		additionalSitemaps: ['https://joeyjazwinski.com/server-sitemap.xml'],
	},
};
