import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';
import remarkGfm from 'remark-gfm';

import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

const root = process.cwd();

export interface PostFrontMatter {
	title: string;
	description?: string;
	tags?: string[];
	updatedAt: string;
	createdAt: string;
	author?: string;
	difficulty?: 'beginner' | 'intermediate' | 'advanced';
	thumbnail?: string;
	thumbnailAlt?: string;

	[key: string]: unknown;
}

export interface PostData {
	slug: string;
	tags?: string[];
	createdAt?: string;
	updatedAt?: string;
	description?: string;
	title: string;
	author?: string;
	difficulty?: 'beginner' | 'intermediate' | 'advanced';
	frontMatter: PostFrontMatter;
}

export interface PostContent extends PostData {
	content: string;
	source: any; // MDXRemoteSerializeResult
}

function getPostFiles(type: 'blogs' | 'tutorials'): string[] {
	const contentDir = path.join(root, 'src', 'content', type);
	return fs.readdirSync(contentDir).filter((file) => file.endsWith('.mdx'));
}

export function getAllPosts(type: 'blogs' | 'tutorials'): PostData[] {
	const files = getPostFiles(type);
	const posts = files.map((filename) => {
		const filePath = path.join(root, 'src', 'content', type, filename);
		const fileContents = fs.readFileSync(filePath, 'utf8');
		const { data } = matter(fileContents);
		return {
			slug: filename.replace(/\.mdx$/, ''),
			frontMatter: data as PostFrontMatter,
			title: data.title,
			tags: data.tags || [],
			createdAt: data.createdAt,
			updatedAt: data.updatedAt,
			description: data.description,
			author: data.author,
			difficulty: data.difficulty,
		};
	});
	// sort by date descending
	return posts.sort(
		(a, b) =>
			new Date(b.frontMatter.updatedAt).getTime() -
			new Date(a.frontMatter.updatedAt).getTime()
	);
}

export async function getPostBySlug(
	type: 'blogs' | 'tutorials',
	slug: string
): Promise<PostContent> {
	const filePath = path.join(root, 'src', 'content', type, `${slug}.mdx`);
	const fileContents = fs.readFileSync(filePath, 'utf8');
	const { data, content } = matter(fileContents);
	const mdxSource = await serialize(content, {
		mdxOptions: {
			remarkPlugins: [remarkGfm],
			rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings],
			format: 'mdx',
		},
		scope: data,
	});
	return {
		slug,
		tags: data.tags || [],
		createdAt: data.createdAt || null,
		updatedAt: data.updatedAt || null,
		description: data.description || null,
		title: data.title || null,
		frontMatter: data as PostFrontMatter,
		content,
		source: mdxSource,
	};
}
export interface Lesson {
	id?: string;
	slug: string;
	courseSlug: string;
	title: string;
	description: string;
	exercises: Exercise[];
	duration?: number;
	completed?: boolean;
}

export interface Exercise {
	id?: string;
	question: string;
	type: string;
	options?: string;
	correctAnswer: string;
	hint: string;
}

export interface Course {
	id?: string;
	title: string;
	description: string;
	slug: string;
	progressional: boolean;
	lessons: Lesson[];
	order: string[];
}

export interface UserCourseData {
	courses: Course[];
}
export interface Change {
	type: 'course' | 'lesson' | 'exercise';
	id: string;
	field: string;
	value: string;
}
