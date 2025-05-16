// pages/server-sitemap.xml.js

import { BlogPost } from '@/generated/prisma';
import { getFullUrl } from '@/utils/db';
import { GetServerSidePropsContext } from 'next';
import { getServerSideSitemapLegacy } from 'next-sitemap';

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
	const posts = await fetch(getFullUrl('/api/getBlogPosts')).then((e) => {
		if (!e.ok) {
			throw new Error(
				`Failed to fetch blog posts: ${e.status} ${e.statusText}`
			);
		}
		return e.json();
	});

	const fields = posts.blogPosts.map((post: BlogPost) => ({
		loc:
			process.env.NEXT_PUBLIC_VERCEL_ENV === 'local'
				? `https://localhost:3000/blogs/${post.slug}`
				: `https://joeyjazwinski.vercel.app/blogs/${post.slug}`,
		lastmod: post.updatedAt, // Use ISO string if available
		changefreq: 'weekly',
		priority: 0.7,
	}));

	return getServerSideSitemapLegacy(ctx, fields);
}

export default function Sitemap() {}
