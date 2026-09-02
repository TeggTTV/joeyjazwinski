/** @type {import('next-sitemap').IConfig} */
module.exports = {
	siteUrl: 'https://joeyjazwinski.com',
	generateRobotsTxt: true,
	sitemapSize: 5000,

	// Dynamic content is handled by server-sitemap.xml (blogs, courses)
	additionalPaths: async (config) => {
		const result = [];

		const staticPages = [
			{ loc: '/', priority: 1.0, changefreq: 'weekly' },
			{ loc: '/about', priority: 0.8, changefreq: 'monthly' },
			{ loc: '/contact', priority: 0.8, changefreq: 'monthly' },
			{ loc: '/privacy', priority: 0.7, changefreq: 'monthly' },
			{ loc: '/terms', priority: 0.7, changefreq: 'monthly' },
			{ loc: '/developer-tools', priority: 0.8, changefreq: 'weekly' },
			{ loc: '/developer-tools/qrcode-generator', priority: 0.8, changefreq: 'monthly' },
			{ loc: '/developer-tools/password-generator', priority: 0.8, changefreq: 'monthly' },
			{ loc: '/developer-tools/word-counter', priority: 0.8, changefreq: 'monthly' },
			{ loc: '/developer-tools/json-formatter', priority: 0.8, changefreq: 'monthly' },
			{ loc: '/developer-tools/encoder-decoder', priority: 0.8, changefreq: 'monthly' },
			{ loc: '/developer-tools/diff-checker', priority: 0.8, changefreq: 'monthly' },
			{ loc: '/developer-tools/contrast-checker', priority: 0.8, changefreq: 'monthly' },
			{ loc: '/developer-tools/regex-tester', priority: 0.8, changefreq: 'monthly' },
			{ loc: '/developer-tools/jwt-debugger', priority: 0.8, changefreq: 'monthly' },
			{ loc: '/developer-tools/code-sandbox', priority: 0.8, changefreq: 'monthly' },
			{ loc: '/developer-tools/hash-generator', priority: 0.8, changefreq: 'monthly' },
			{ loc: '/developer-tools/svg-optimizer', priority: 0.8, changefreq: 'monthly' },
			{ loc: '/developer-tools/image-compressor', priority: 0.8, changefreq: 'monthly' },
			{ loc: '/developer-tools/gif-generator', priority: 0.8, changefreq: 'monthly' },
			{ loc: '/developer-tools/json-to-zod-ts', priority: 0.8, changefreq: 'monthly' },
			{ loc: '/developer-tools/git-command-builder', priority: 0.8, changefreq: 'monthly' },
			{ loc: '/developer-tools/pem-jwk-converter', priority: 0.8, changefreq: 'monthly' },
			{ loc: '/developer-tools/curl-converter', priority: 0.8, changefreq: 'monthly' },
			{ loc: '/developer-tools/mongodb-uri-builder', priority: 0.8, changefreq: 'monthly' },
			{ loc: '/developer-tools/user-agent-inspector', priority: 0.8, changefreq: 'monthly' },
			{ loc: '/developer-tools/cron-visualizer', priority: 0.8, changefreq: 'monthly' },
			{ loc: '/developer-tools/sql-to-prisma', priority: 0.8, changefreq: 'monthly' },
			{ loc: '/developer-tools/json-to-sql-insert', priority: 0.8, changefreq: 'monthly' },
			{ loc: '/developer-tools/csv-to-markdown', priority: 0.8, changefreq: 'monthly' },
			{ loc: '/developer-tools/tailwind-config-generator', priority: 0.8, changefreq: 'monthly' },
			{ loc: '/developer-tools/sitemap-splitter', priority: 0.8, changefreq: 'monthly' },
			{ loc: '/developer-tools/robots-generator', priority: 0.8, changefreq: 'monthly' },
			{ loc: '/developer-tools/sitemap-generator', priority: 0.8, changefreq: 'monthly' },
			{ loc: '/developer-tools/meta-tag-generator', priority: 0.8, changefreq: 'monthly' },
			{ loc: '/developer-tools/schema-generator', priority: 0.8, changefreq: 'monthly' },
			{ loc: '/developer-tools/url-slug-generator', priority: 0.8, changefreq: 'monthly' },
			{ loc: '/developer-tools/redirect-rules', priority: 0.8, changefreq: 'monthly' },
			{ loc: '/developer-tools/html-head-analyzer', priority: 0.8, changefreq: 'monthly' },
			{ loc: '/developer-tools/keyword-density', priority: 0.8, changefreq: 'monthly' },
			{ loc: '/developer-tools/serp-preview', priority: 0.8, changefreq: 'monthly' },
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
		'/create-account',
		'/dashboard',
		'/dashboard/*',
		'/settings',
		'/settings/*',
		'/profile',
		'/profile/*',
		'/analytics',
		'/analytics/*',
		'/u/*',
		'/developer-blog/*', // Handled by server-sitemap.xml
		'/courses',
		'/courses/*',
		'/tracks/*',
		'/demos',
		'/demos/*',
		'/gallery',
		'/gallery/*',
		'/leaderboard',
		'/projects',
		'/projects/*',
		'/patch-notes',
		'/polls/*',
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
					'/create-account/',
					'/analytics/',
					'/projects/',
					'/courses/',
					'/patch-notes/',
					'/profile/',
					'/leaderboard/',
					'/demos/',
					'/gallery/',
					'/u/',
				],
			},
		],
		additionalSitemaps: ['https://joeyjazwinski.com/server-sitemap.xml'],
	},
};
