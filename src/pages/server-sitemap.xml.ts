// pages/server-sitemap.xml/index.ts
import { BlogPost } from '@/generated/prisma';
import { getFullUrl } from '@/utils/db';
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

	try {
		// Fetch blog posts
		const postsResponse = await fetch(getFullUrl('/api/getBlogPosts'));
		if (postsResponse.ok) {
			const postsData = await postsResponse.json();
			const blogFields = postsData.blogPosts.map((post: BlogPost) => ({
				loc: `${baseUrl}/blogs/${post.slug}`,
				lastmod: post.updatedAt || new Date().toISOString(),
				changefreq: 'weekly' as const,
				priority: 0.7,
			}));
			fields.push(...blogFields);
		} else {
			console.warn(
				`Failed to fetch blog posts: ${postsResponse.status} ${postsResponse.statusText}`,
			);
		}
	} catch (error) {
		console.error('Error fetching blog posts for sitemap:', error);
	}

	try {
		// Fetch courses
		const coursesResponse = await fetch(getFullUrl('/api/getCourses'));
		if (coursesResponse.ok) {
			const coursesData = await coursesResponse.json();
			const courseFields = coursesData.courses.map((course: Course) => ({
				loc: `${baseUrl}/courses/${course.slug}`,
				lastmod: course.updatedAt || new Date().toISOString(),
				changefreq: 'weekly' as const,
				priority: 0.8,
			}));
			fields.push(...courseFields);
		} else {
			console.warn(
				`Failed to fetch courses: ${coursesResponse.status} ${coursesResponse.statusText}`,
			);
		}
	} catch (error) {
		console.error('Error fetching courses for sitemap:', error);
	}

	return getServerSideSitemapLegacy(ctx, fields);
}

export default function Sitemap() {}
