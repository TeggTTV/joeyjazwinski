import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@/generated/prisma';

export interface SitePageNode {
	id: string;
	title: string;
	path: string;
	url: string;
	category: string;
	priority: string;
	changefreq: string;
	lastmod?: string;
	subpages?: SitePageNode[];
}

export interface SiteHierarchyGroup {
	category: string;
	description: string;
	iconName: string;
	pages: SitePageNode[];
}

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	if (req.method !== 'GET') {
		return res.status(405).json({ message: 'Method not allowed' });
	}

	const baseUrl = 'https://joeyjazwinski.com';
	const prisma = new PrismaClient();

	try {
		// 1. Core / Main Static Pages
		const mainPages: SitePageNode[] = [
			{
				id: 'home',
				title: 'Home Page',
				path: '/',
				url: baseUrl + '/',
				category: 'Core',
				priority: '1.0',
				changefreq: 'weekly',
			},
			{
				id: 'about',
				title: 'About Joey Jazwinski',
				path: '/about',
				url: baseUrl + '/about',
				category: 'Core',
				priority: '0.8',
				changefreq: 'monthly',
			},
			{
				id: 'projects',
				title: 'Projects Portfolio',
				path: '/projects',
				url: baseUrl + '/projects',
				category: 'Core',
				priority: '0.9',
				changefreq: 'weekly',
			},
			{
				id: 'patch-notes',
				title: 'Patch Notes & Releases',
				path: '/patch-notes',
				url: baseUrl + '/patch-notes',
				category: 'Core',
				priority: '0.8',
				changefreq: 'daily',
			},
			{
				id: 'contact',
				title: 'Contact Joey',
				path: '/contact',
				url: baseUrl + '/contact',
				category: 'Core',
				priority: '0.8',
				changefreq: 'monthly',
			},
		];

		// 2. Developer Tools (All 36+ tools catalogued)
		const developerTools: SitePageNode[] = [
			{
				id: 'tool-hub',
				title: 'Developer Tools Directory',
				path: '/developer-tools',
				url: baseUrl + '/developer-tools',
				category: 'Developer Tools',
				priority: '0.8',
				changefreq: 'weekly',
			},
			{
				id: 'tool-qrcode',
				title: 'QR Code Generator',
				path: '/developer-tools/qrcode-generator',
				url: baseUrl + '/developer-tools/qrcode-generator',
				category: 'Developer Tools',
				priority: '0.8',
				changefreq: 'monthly',
			},
			{
				id: 'tool-password',
				title: 'Password Generator',
				path: '/developer-tools/password-generator',
				url: baseUrl + '/developer-tools/password-generator',
				category: 'Developer Tools',
				priority: '0.8',
				changefreq: 'monthly',
			},
			{
				id: 'tool-word-counter',
				title: 'Word & Character Counter',
				path: '/developer-tools/word-counter',
				url: baseUrl + '/developer-tools/word-counter',
				category: 'Developer Tools',
				priority: '0.8',
				changefreq: 'monthly',
			},
			{
				id: 'tool-json-formatter',
				title: 'JSON Formatter & Validator',
				path: '/developer-tools/json-formatter',
				url: baseUrl + '/developer-tools/json-formatter',
				category: 'Developer Tools',
				priority: '0.8',
				changefreq: 'monthly',
			},
			{
				id: 'tool-encoder-decoder',
				title: 'Base64 & URL Encoder / Decoder',
				path: '/developer-tools/encoder-decoder',
				url: baseUrl + '/developer-tools/encoder-decoder',
				category: 'Developer Tools',
				priority: '0.8',
				changefreq: 'monthly',
			},
			{
				id: 'tool-diff-checker',
				title: 'Text & Code Diff Checker',
				path: '/developer-tools/diff-checker',
				url: baseUrl + '/developer-tools/diff-checker',
				category: 'Developer Tools',
				priority: '0.8',
				changefreq: 'monthly',
			},
			{
				id: 'tool-contrast-checker',
				title: 'WCAG Color Contrast Checker',
				path: '/developer-tools/contrast-checker',
				url: baseUrl + '/developer-tools/contrast-checker',
				category: 'Developer Tools',
				priority: '0.8',
				changefreq: 'monthly',
			},
			{
				id: 'tool-regex-tester',
				title: 'RegEx Tester & Analyzer',
				path: '/developer-tools/regex-tester',
				url: baseUrl + '/developer-tools/regex-tester',
				category: 'Developer Tools',
				priority: '0.8',
				changefreq: 'monthly',
			},
			{
				id: 'tool-jwt-debugger',
				title: 'JSON Web Token (JWT) Debugger',
				path: '/developer-tools/jwt-debugger',
				url: baseUrl + '/developer-tools/jwt-debugger',
				category: 'Developer Tools',
				priority: '0.8',
				changefreq: 'monthly',
			},
			{
				id: 'tool-code-sandbox',
				title: 'Live HTML & CSS Sandbox',
				path: '/developer-tools/code-sandbox',
				url: baseUrl + '/developer-tools/code-sandbox',
				category: 'Developer Tools',
				priority: '0.8',
				changefreq: 'monthly',
			},
			{
				id: 'tool-hash-generator',
				title: 'Hash & HMAC Generator',
				path: '/developer-tools/hash-generator',
				url: baseUrl + '/developer-tools/hash-generator',
				category: 'Developer Tools',
				priority: '0.8',
				changefreq: 'monthly',
			},
			{
				id: 'tool-svg-optimizer',
				title: 'SVG Optimizer & Exporter',
				path: '/developer-tools/svg-optimizer',
				url: baseUrl + '/developer-tools/svg-optimizer',
				category: 'Developer Tools',
				priority: '0.8',
				changefreq: 'monthly',
			},
			{
				id: 'tool-image-compressor',
				title: 'Image Compressor & Converter',
				path: '/developer-tools/image-compressor',
				url: baseUrl + '/developer-tools/image-compressor',
				category: 'Developer Tools',
				priority: '0.8',
				changefreq: 'monthly',
			},
			{
				id: 'tool-gif-generator',
				title: 'GIF Generator & Video Converter',
				path: '/developer-tools/gif-generator',
				url: baseUrl + '/developer-tools/gif-generator',
				category: 'Developer Tools',
				priority: '0.8',
				changefreq: 'monthly',
			},
			{
				id: 'tool-json-to-zod',
				title: 'JSON to Zod & TypeScript Generator',
				path: '/developer-tools/json-to-zod-ts',
				url: baseUrl + '/developer-tools/json-to-zod-ts',
				category: 'Developer Tools',
				priority: '0.8',
				changefreq: 'monthly',
			},
			{
				id: 'tool-git-command-builder',
				title: 'Git Scenario & Command Builder',
				path: '/developer-tools/git-command-builder',
				url: baseUrl + '/developer-tools/git-command-builder',
				category: 'Developer Tools',
				priority: '0.8',
				changefreq: 'monthly',
			},
			{
				id: 'tool-pem-jwk-converter',
				title: 'PEM to JWK Converter',
				path: '/developer-tools/pem-jwk-converter',
				url: baseUrl + '/developer-tools/pem-jwk-converter',
				category: 'Developer Tools',
				priority: '0.8',
				changefreq: 'monthly',
			},
			{
				id: 'tool-curl-converter',
				title: 'cURL Command Converter',
				path: '/developer-tools/curl-converter',
				url: baseUrl + '/developer-tools/curl-converter',
				category: 'Developer Tools',
				priority: '0.8',
				changefreq: 'monthly',
			},
			{
				id: 'tool-mongodb-uri-builder',
				title: 'MongoDB Connection URI Builder',
				path: '/developer-tools/mongodb-uri-builder',
				url: baseUrl + '/developer-tools/mongodb-uri-builder',
				category: 'Developer Tools',
				priority: '0.8',
				changefreq: 'monthly',
			},
			{
				id: 'tool-user-agent-inspector',
				title: 'Client Header & User Agent Inspector',
				path: '/developer-tools/user-agent-inspector',
				url: baseUrl + '/developer-tools/user-agent-inspector',
				category: 'Developer Tools',
				priority: '0.8',
				changefreq: 'monthly',
			},
			{
				id: 'tool-cron-visualizer',
				title: 'Cron Pattern Visualizer',
				path: '/developer-tools/cron-visualizer',
				url: baseUrl + '/developer-tools/cron-visualizer',
				category: 'Developer Tools',
				priority: '0.8',
				changefreq: 'monthly',
			},
			{
				id: 'tool-sql-to-prisma',
				title: 'SQL to Prisma Schema Converter',
				path: '/developer-tools/sql-to-prisma',
				url: baseUrl + '/developer-tools/sql-to-prisma',
				category: 'Developer Tools',
				priority: '0.8',
				changefreq: 'monthly',
			},
			{
				id: 'tool-json-to-sql-insert',
				title: 'JSON to SQL Insert Formatter',
				path: '/developer-tools/json-to-sql-insert',
				url: baseUrl + '/developer-tools/json-to-sql-insert',
				category: 'Developer Tools',
				priority: '0.8',
				changefreq: 'monthly',
			},
			{
				id: 'tool-csv-to-markdown',
				title: 'CSV to Markdown Table Formatter',
				path: '/developer-tools/csv-to-markdown',
				url: baseUrl + '/developer-tools/csv-to-markdown',
				category: 'Developer Tools',
				priority: '0.8',
				changefreq: 'monthly',
			},
			{
				id: 'tool-tailwind-config-generator',
				title: 'Tailwind Config Maker',
				path: '/developer-tools/tailwind-config-generator',
				url: baseUrl + '/developer-tools/tailwind-config-generator',
				category: 'Developer Tools',
				priority: '0.8',
				changefreq: 'monthly',
			},
			{
				id: 'tool-sitemap-splitter',
				title: 'Sitemap Splitter & Validator',
				path: '/developer-tools/sitemap-splitter',
				url: baseUrl + '/developer-tools/sitemap-splitter',
				category: 'Developer Tools',
				priority: '0.8',
				changefreq: 'monthly',
			},
			{
				id: 'tool-robots-generator',
				title: 'Robots.txt Generator',
				path: '/developer-tools/robots-generator',
				url: baseUrl + '/developer-tools/robots-generator',
				category: 'Developer Tools',
				priority: '0.8',
				changefreq: 'monthly',
			},
			{
				id: 'tool-sitemap-generator',
				title: 'XML Sitemap Generator',
				path: '/developer-tools/sitemap-generator',
				url: baseUrl + '/developer-tools/sitemap-generator',
				category: 'Developer Tools',
				priority: '0.8',
				changefreq: 'monthly',
			},
			{
				id: 'tool-meta-tag-generator',
				title: 'Meta Tag & OpenGraph Generator',
				path: '/developer-tools/meta-tag-generator',
				url: baseUrl + '/developer-tools/meta-tag-generator',
				category: 'Developer Tools',
				priority: '0.8',
				changefreq: 'monthly',
			},
			{
				id: 'tool-schema-generator',
				title: 'JSON-LD Schema Markup Generator',
				path: '/developer-tools/schema-generator',
				url: baseUrl + '/developer-tools/schema-generator',
				category: 'Developer Tools',
				priority: '0.8',
				changefreq: 'monthly',
			},
			{
				id: 'tool-url-slug-generator',
				title: 'URL Slug Generator',
				path: '/developer-tools/url-slug-generator',
				url: baseUrl + '/developer-tools/url-slug-generator',
				category: 'Developer Tools',
				priority: '0.8',
				changefreq: 'monthly',
			},
			{
				id: 'tool-redirect-rules',
				title: 'Redirect Rules Generator (Nginx, Next, Apache)',
				path: '/developer-tools/redirect-rules',
				url: baseUrl + '/developer-tools/redirect-rules',
				category: 'Developer Tools',
				priority: '0.8',
				changefreq: 'monthly',
			},
			{
				id: 'tool-html-head-analyzer',
				title: 'HTML Head SEO Analyzer',
				path: '/developer-tools/html-head-analyzer',
				url: baseUrl + '/developer-tools/html-head-analyzer',
				category: 'Developer Tools',
				priority: '0.8',
				changefreq: 'monthly',
			},
			{
				id: 'tool-keyword-density',
				title: 'Keyword Density & Content Analyzer',
				path: '/developer-tools/keyword-density',
				url: baseUrl + '/developer-tools/keyword-density',
				category: 'Developer Tools',
				priority: '0.8',
				changefreq: 'monthly',
			},
			{
				id: 'tool-serp-preview',
				title: 'Google SERP Snippet Previewer',
				path: '/developer-tools/serp-preview',
				url: baseUrl + '/developer-tools/serp-preview',
				category: 'Developer Tools',
				priority: '0.8',
				changefreq: 'monthly',
			},
		];

		// 3. Dynamic Developer Blog Posts from MongoDB
		const blogHub: SitePageNode = {
			id: 'blog-hub',
			title: 'Developer Blog Index',
			path: '/developer-blog',
			url: baseUrl + '/developer-blog',
			category: 'Developer Blog',
			priority: '0.8',
			changefreq: 'daily',
		};

		let blogPages: SitePageNode[] = [blogHub];
		try {
			const blogPosts = await prisma.blogPost.findMany({
				select: {
					id: true,
					title: true,
					slug: true,
					updatedAt: true,
				},
				orderBy: {
					createdAt: 'desc',
				},
			});

			const postNodes: SitePageNode[] = blogPosts.map((post) => ({
				id: `blog-${post.slug}`,
				title: post.title,
				path: `/developer-blog/${post.slug}`,
				url: `${baseUrl}/developer-blog/${post.slug}`,
				category: 'Developer Blog',
				priority: '0.7',
				changefreq: 'weekly',
				lastmod: post.updatedAt
					? post.updatedAt.toISOString()
					: undefined,
			}));

			blogPages = [blogHub, ...postNodes];
		} catch (blogErr) {
			console.error(
				'Error fetching blog posts for IndexNow hierarchy:',
				blogErr,
			);
		}

		// 4. Interactive Courses & Tracks
		const coursesHub: SitePageNode = {
			id: 'courses-hub',
			title: 'Interactive Courses Catalog',
			path: '/courses',
			url: `${baseUrl}/courses`,
			category: 'Courses',
			priority: '0.8',
			changefreq: 'weekly',
		};

		let coursePages: SitePageNode[] = [coursesHub];
		try {
			const courses = await prisma.course.findMany({
				select: {
					id: true,
					title: true,
					slug: true,
					lessons: {
						select: {
							id: true,
							title: true,
							slug: true,
						},
					},
				},
			});

			const courseNodes: SitePageNode[] = courses.map((course) => ({
				id: `course-${course.slug}`,
				title: course.title,
				path: `/courses/${course.slug}`,
				url: `${baseUrl}/courses/${course.slug}`,
				category: 'Courses',
				priority: '0.7',
				changefreq: 'monthly',
				subpages: (course.lessons || []).map((lesson) => ({
					id: `lesson-${course.slug}-${lesson.slug}`,
					title: lesson.title,
					path: `/courses/${course.slug}/${lesson.slug}`,
					url: `${baseUrl}/courses/${course.slug}/${lesson.slug}`,
					category: 'Courses',
					priority: '0.6',
					changefreq: 'monthly',
				})),
			}));

			coursePages = [coursesHub, ...courseNodes];
		} catch (courseErr) {
			console.error(
				'Error fetching courses for IndexNow hierarchy:',
				courseErr,
			);
		}

		// 5. Legal & Trust Pages
		const legalPages: SitePageNode[] = [
			{
				id: 'legal-privacy',
				title: 'Privacy Policy & Data Rights',
				path: '/privacy',
				url: baseUrl + '/privacy',
				category: 'Legal & Trust',
				priority: '0.7',
				changefreq: 'monthly',
			},
			{
				id: 'legal-terms',
				title: 'Terms of Service & Agreements',
				path: '/terms',
				url: baseUrl + '/terms',
				category: 'Legal & Trust',
				priority: '0.7',
				changefreq: 'monthly',
			},
		];

		// Group hierarchy
		const hierarchy: SiteHierarchyGroup[] = [
			{
				category: 'Core Pages',
				description: 'Primary landing, portfolio, and identity pages',
				iconName: 'Globe',
				pages: mainPages,
			},
			{
				category: 'Developer Tools Suite',
				description:
					'Fast, client-side utility suite and SEO generators',
				iconName: 'Code',
				pages: developerTools,
			},
			{
				category: 'Developer Blog Articles',
				description: 'Deep dives, tutorials, and technical writeups',
				iconName: 'BookOpen',
				pages: blogPages,
			},
			{
				category: 'Interactive Courses & Lessons',
				description: 'Curriculum tracks and hands-on developer lessons',
				iconName: 'GraduationCap',
				pages: coursePages,
			},
			{
				category: 'Legal & Compliance',
				description: 'Privacy policy, trust, and regulatory notices',
				iconName: 'Shield',
				pages: legalPages,
			},
		];

		// Flattened list of all individual URLs for quick counting / bulk submission
		const allUrls: string[] = [];
		const traverse = (pages: SitePageNode[]) => {
			for (const p of pages) {
				allUrls.push(p.url);
				if (p.subpages && p.subpages.length > 0) {
					traverse(p.subpages);
				}
			}
		};

		hierarchy.forEach((h) => traverse(h.pages));
		const uniqueUrls = Array.from(new Set(allUrls));

		res.setHeader(
			'Cache-Control',
			'public, s-maxage=30, stale-while-revalidate=60',
		);
		return res.status(200).json({
			totalCount: uniqueUrls.length,
			allUrls: uniqueUrls,
			hierarchy,
		});
	} catch (error: any) {
		console.error('Error compiling site pages hierarchy:', error);
		return res.status(500).json({
			message: 'Internal server error while loading site pages',
			error: error?.message || String(error),
		});
	} finally {
		await prisma.$disconnect();
	}
}
