// pages/server-sitemap.xml.js

import { getFullUrl } from '@/utils/db';
import { getServerSideSitemap, getServerSideSitemapLegacy } from 'next-sitemap';

export async function getServerSideProps(ctx) {
	const posts = await fetch(getFullUrl('/api/getBlogPosts')).then((e) => {
		if (!e.ok) {
			throw new Error(
				`Failed to fetch blog posts: ${e.status} ${e.statusText}`
			);
		}
		return e.json();
	});

	// console.log('posts recieved', posts.blogPosts);

	const fields = posts.blogPosts.map((post) => ({
		loc:
			process.env.NEXT_PUBLIC_VERCEL_ENV === 'local'
				? `https://localhost:3000/blog/${post.slug}`
				: `https://joeyjazwinski.vercel.app/blog/${post.slug}`,
		lastmod: post.updatedAt, // Use ISO string if available
		changefreq: 'weekly',
		priority: 0.7,
	}));

	console.log('Is fields an array?', Array.isArray(fields));

	return getServerSideSitemapLegacy(ctx, fields);
}

export default function Sitemap() {}
