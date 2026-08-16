import { PrismaClient } from '../generated/prisma/client';
import { GetServerSidePropsContext } from 'next';
import { getServerSideSitemapLegacy, ISitemapField } from 'next-sitemap';

// Define Course type (adjust based on your actual course type)
interface Course {
	slug: string;
	updatedAt: string;
	publishedAt?: string;
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
	const fields: ISitemapField[] = [];
	const baseUrl =
		process.env.NEXT_PUBLIC_SITE_URL || 'https://joeyjazwinski.com';

	const prisma = new PrismaClient();
	try {
		// Fetch blog posts directly from DB
		const blogPosts = await prisma.blogPost.findMany({
			select: {
				slug: true,
				updatedAt: true,
			},
		});

		const blogFields = blogPosts.map((post) => ({
			loc: `${baseUrl}/developer-blog/${post.slug}`,
			lastmod: post.updatedAt ? post.updatedAt.toISOString() : new Date().toISOString(),
			changefreq: 'weekly' as const,
			priority: 0.7,
		}));
		fields.push(...blogFields);
	} catch (error) {
		console.error('Error fetching blog posts for sitemap:', error);
	} finally {
		await prisma.$disconnect();
	}

	return getServerSideSitemapLegacy(ctx, fields);
}

export default function Sitemap() {}
