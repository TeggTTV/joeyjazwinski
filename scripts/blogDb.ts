import { PrismaClient } from '../src/generated/prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

const INDEX_NOW_KEY = '5v3zcfx3c5vxhmctq733ryjw3u8va7f4';
const SITE_HOST = 'joeyjazwinski.com';
const SITE_BASE_URL = 'https://joeyjazwinski.com';

// IndexNow endpoint list (Bing and IndexNow API endpoints share across search engines)
const INDEXNOW_ENDPOINTS = [
	'https://api.indexnow.org/indexnow',
	'https://www.bing.com/indexnow',
	'https://yandex.com/indexnow',
];

export interface BlogPostData {
	title: string;
	description: string;
	slug: string;
	content: string;
	tags?: string[];
	image?: string | null;
	isAI?: boolean;
}

/**
 * Submits a single URL or list of URLs to IndexNow
 */
export async function submitToIndexNow(urls: string | string[]): Promise<void> {
	const urlList = Array.isArray(urls) ? urls : [urls];
	console.log(`\n📡 Submitting ${urlList.length} URL(s) to IndexNow...`);

	for (const endpoint of INDEXNOW_ENDPOINTS) {
		try {
			const payload = {
				host: SITE_HOST,
				key: INDEX_NOW_KEY,
				keyLocation: `${SITE_BASE_URL}/${INDEX_NOW_KEY}.txt`,
				urlList: urlList,
			};

			const response = await fetch(endpoint, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json; charset=utf-8',
				},
				body: JSON.stringify(payload),
			});

			if (response.ok || response.status === 202) {
				console.log(`  ✅ [${endpoint}] Submitted successfully (HTTP ${response.status})`);
			} else {
				console.warn(
					`  ⚠️  [${endpoint}] Response status: ${response.status} ${response.statusText}`
				);
			}
		} catch (error: any) {
			console.error(`  ❌ [${endpoint}] Error submitting:`, error?.message || error);
		}
	}
}

/**
 * Lists all blog posts from MongoDB
 */
export async function listPosts() {
	return await prisma.blogPost.findMany({
		orderBy: { createdAt: 'desc' },
	});
}

/**
 * Gets a specific post by slug
 */
export async function getPostBySlug(slug: string) {
	return await prisma.blogPost.findUnique({
		where: { slug },
	});
}

/**
 * Deletes a post from MongoDB by slug
 */
export async function deletePostBySlug(slug: string) {
	return await prisma.blogPost.delete({
		where: { slug },
	});
}

/**
 * Exports all posts from MongoDB into local markdown files
 */
export async function exportPostsToLocal(outDir = 'content/blog') {
	const posts = await listPosts();
	const targetDir = path.resolve(process.cwd(), outDir);

	if (!fs.existsSync(targetDir)) {
		fs.mkdirSync(targetDir, { recursive: true });
	}

	const exportedFiles: string[] = [];

	for (const post of posts) {
		const filePath = path.join(targetDir, `${post.slug}.md`);
		const frontmatter = [
			'---',
			`title: ${JSON.stringify(post.title)}`,
			`description: ${JSON.stringify(post.description || '')}`,
			`slug: ${JSON.stringify(post.slug)}`,
			`tags: [${post.tags.map((t) => JSON.stringify(t)).join(', ')}]`,
			post.image ? `thumbnail: ${JSON.stringify(post.image)}` : null,
			`isAI: ${Boolean(post.isAI)}`,
			`createdAt: ${JSON.stringify(post.createdAt.toISOString())}`,
			`updatedAt: ${JSON.stringify(post.updatedAt.toISOString())}`,
			'---',
			'',
			post.content || '',
		]
			.filter((line) => line !== null)
			.join('\n');

		fs.writeFileSync(filePath, frontmatter, 'utf-8');
		exportedFiles.push(filePath);
	}

	return exportedFiles;
}

/**
 * Creates or updates a blog post directly in MongoDB and optionally triggers IndexNow
 */
export async function upsertBlogPost(
	data: BlogPostData,
	options: { notifyIndexNow?: boolean } = { notifyIndexNow: true }
) {
	const tags = data.tags || [];
	const post = await prisma.blogPost.upsert({
		where: { slug: data.slug },
		update: {
			title: data.title,
			description: data.description,
			content: data.content,
			tags,
			image: data.image,
			isAI: data.isAI ?? true,
			updatedAt: new Date(),
		},
		create: {
			title: data.title,
			description: data.description,
			slug: data.slug,
			content: data.content,
			tags,
			image: data.image,
			isAI: data.isAI ?? true,
		},
	});

	const blogUrl = `${SITE_BASE_URL}/developer-blog/${post.slug}`;

	if (options.notifyIndexNow) {
		await submitToIndexNow(blogUrl);
	}

	return { post, blogUrl };
}

/**
 * Parses a markdown or MDX file with YAML frontmatter
 */
export function parseMarkdownFile(filePath: string): BlogPostData {
	const raw = fs.readFileSync(filePath, 'utf-8');
	let title = path.basename(filePath, path.extname(filePath));
	let description = '';
	let slug = path
		.basename(filePath, path.extname(filePath))
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-');
	let tags: string[] = ['Developer', 'Web Development'];
	let isAI = true;
	let image: string | null = null;
	let content = raw;

	if (raw.startsWith('---')) {
		const endIdx = raw.indexOf('---', 3);
		if (endIdx !== -1) {
			const fm = raw.slice(3, endIdx);
			content = raw.slice(endIdx + 3).trim();

			const titleMatch = fm.match(/title:\s*["']?([^"'\n\r]+)["']?/);
			if (titleMatch) title = titleMatch[1].trim();

			const descMatch = fm.match(/description:\s*["']?([^"'\n\r]+)["']?/);
			if (descMatch) description = descMatch[1].trim();

			const slugMatch = fm.match(/slug:\s*["']?([^"'\n\r]+)["']?/);
			if (slugMatch) slug = slugMatch[1].trim();

			const imageMatch = fm.match(/(?:thumbnail|image):\s*["']?([^"'\n\r]+)["']?/);
			if (imageMatch) image = imageMatch[1].trim();

			const isAIMatch = fm.match(/isAI:\s*(true|false)/i);
			if (isAIMatch) isAI = isAIMatch[1].toLowerCase() === 'true';

			const tagsMatch = fm.match(/tags:\s*\[(.*?)\]/);
			if (tagsMatch) {
				tags = tagsMatch[1].split(',').map((t) => t.replace(/["'\s]/g, ''));
			}
		}
	}

	if (!description) {
		description = content.slice(0, 160).replace(/[#*`_]/g, '').trim();
	}

	return {
		title,
		description,
		slug,
		content,
		tags,
		image,
		isAI,
	};
}

// CLI handler
async function main() {
	const args = process.argv.slice(2);
	const command = args[0];

	switch (command) {
		case 'list': {
			const posts = await listPosts();
			console.log(`\n📚 Total MongoDB Blog Posts: ${posts.length}\n`);
			posts.forEach((p, i) => {
				console.log(
					`${i + 1}. [${p.slug}] ${p.title}\n   Tags: ${p.tags.join(', ')} | AI: ${p.isAI} | Updated: ${p.updatedAt.toISOString()}`
				);
			});
			break;
		}

		case 'read': {
			const slug = args[1];
			if (!slug) {
				console.error('Error: Please specify a slug. e.g. read <slug>');
				process.exit(1);
			}
			const post = await getPostBySlug(slug);
			if (!post) {
				console.error(`Error: Post with slug "${slug}" not found.`);
				process.exit(1);
			}
			console.log(JSON.stringify(post, null, 2));
			break;
		}

		case 'export': {
			const outDir = args[1] || 'content/blog';
			const files = await exportPostsToLocal(outDir);
			console.log(`\n✅ Exported ${files.length} posts to ${outDir}/`);
			break;
		}

		case 'publish-file': {
			const filePath = args[1];
			const skipIndexNow = args.includes('--no-indexnow');

			if (!filePath || !fs.existsSync(filePath)) {
				console.error(`Error: File "${filePath}" does not exist.`);
				process.exit(1);
			}

			const parsedData = parseMarkdownFile(filePath);
			const { post, blogUrl } = await upsertBlogPost(parsedData, {
				notifyIndexNow: !skipIndexNow,
			});

			console.log(`\n🚀 Successfully Published to MongoDB & Live Site:`);
			console.log(`- Title:       ${post.title}`);
			console.log(`- Slug:        ${post.slug}`);
			console.log(`- URL:         ${blogUrl}`);
			console.log(`- IndexNow:    ${!skipIndexNow ? 'Notified 📡' : 'Skipped'}`);
			break;
		}

		case 'indexnow': {
			const slugOrUrl = args[1];
			if (!slugOrUrl) {
				// Submit all published posts in DB
				const posts = await listPosts();
				const allUrls = posts.map((p) => `${SITE_BASE_URL}/developer-blog/${p.slug}`);
				console.log(`Submitting all ${allUrls.length} blog post URLs to IndexNow...`);
				await submitToIndexNow(allUrls);
			} else {
				const targetUrl = slugOrUrl.startsWith('http')
					? slugOrUrl
					: `${SITE_BASE_URL}/developer-blog/${slugOrUrl}`;
				await submitToIndexNow(targetUrl);
			}
			break;
		}

		case 'delete': {
			const slug = args[1];
			if (!slug) {
				console.error('Error: Please specify a slug to delete.');
				process.exit(1);
			}
			await deletePostBySlug(slug);
			console.log(`🗑️ Deleted post with slug "${slug}" from MongoDB.`);
			break;
		}

		default: {
			console.log(`
Master Blog & IndexNow Management CLI

Commands:
  npx tsx scripts/blogDb.ts list                      List all posts in MongoDB
  npx tsx scripts/blogDb.ts read <slug>               Read a single post JSON from MongoDB
  npx tsx scripts/blogDb.ts export [outDir]           Export DB posts to local markdown files
  npx tsx scripts/blogDb.ts publish-file <file>       Upsert markdown/MDX to DB & ping IndexNow
  npx tsx scripts/blogDb.ts indexnow [slug-or-url]    Ping IndexNow for a post (or all DB posts)
  npx tsx scripts/blogDb.ts delete <slug>             Delete a post from MongoDB
			`);
		}
	}
}

if (require.main === module) {
	main()
		.catch(console.error)
		.finally(async () => {
			await prisma.$disconnect();
		});
}
