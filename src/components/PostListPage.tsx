import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { PostData } from '../lib/mdx';
import {
	BlogPostData,
	createBlogPost,
	createTutorialPost,
	TutorialData,
} from '@/utils/db';

interface PostListPageProps {
	title: string;
	posts: BlogPostData[] | TutorialData[];
	type: 'blogs' | 'tutorials';
	enableTags?: boolean;
	suggestedPosts?: PostData[]; // New parameter for suggested posts
}

const PostListPage: React.FC<PostListPageProps> = ({
	title,
	posts,
	type,
	enableTags = false,
	suggestedPosts = [],
}) => {
	const [searchTerm, setSearchTerm] = useState('');
	const [selectedTags, setSelectedTags] = useState<string[]>([]);
	const router = useRouter();

	console.log(posts);

	let tags: string[] = [];
	posts.forEach((post) => {
		if (post.tags) {
			tags = [...tags, ...post.tags];
		}
	});
	const allTags = Array.from(new Set(tags));
	const toggleTag = (tag: string) => {
		setSelectedTags((prev) =>
			prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
		);
	};

	const handleSearch = (e: React.FormEvent) => {
		e.preventDefault();
		const base = `/${type}/search?query=${encodeURIComponent(searchTerm)}`;
		const tagsParam =
			enableTags && selectedTags.length
				? `&tags=${selectedTags.join(',')}`
				: '';
		router.push(base + tagsParam);
	};

	function createBlog() {
		createBlogPost({
			title: 'New Blog Post',
			description: 'Write your blog description here...',
			content: 'Write your blog content here...',
			tags: [],
			createdAt: new Date(),
			updatedAt: new Date(),
		})
			.then(() => {
				router.push('/blogs'); // Redirect to blogs page after creation
			})
			.catch((err) => {
				console.error('Error creating blog post:', err);
				alert('Failed to create blog post. Please try again.');
			});
	}

	function createTutorial() {
		createTutorialPost({
			title: 'New Tutorial Post',
			description: 'Write your tutorial description here...',
			content: 'Write your tutorial content here...',
			tags: [],
			createdAt: new Date(),
			updatedAt: new Date(),
			difficulty: 'Beginner', // Default difficulty
		})
			.then(() => {
				router.push('/tutorials'); // Redirect to tutorials page after creation
			})
			.catch((err) => {
				console.error('Error creating tutorial post:', err);
				alert('Failed to create tutorial post. Please try again.');
			});
	}

	const filteredPosts = posts.filter((post) => {
		if (!enableTags || selectedTags.length === 0) return true;
		return selectedTags.every((tag) => post.tags?.includes(tag));
	});

	return (
		<main className="max-w-3xl mx-auto py-8 space-y-4">
			<h1 className="text-3xl font-bold">{title}</h1>

			{/* Search Form */}
			<form onSubmit={handleSearch} className="flex mb-4 space-x-2">
				<input
					type="text"
					placeholder={`Search ${type}...`}
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
					className="flex-grow border rounded-l px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
				/>
				<button
					type="submit"
					className="bg-primary-500 text-white px-4 rounded"
				>
					Search
				</button>
			</form>

			{/* Tags (Only for Blogs) */}
			{enableTags && (
				<div className="flex flex-wrap gap-2 mb-4">
					{allTags.map((tag) => (
						<span
							key={tag}
							onClick={() => toggleTag(tag)}
							className={`px-3 py-1 rounded-full cursor-pointer ${selectedTags.includes(tag)
								? 'bg-primary-500 text-white'
								: 'bg-gray-200 text-gray-700'
								}`}
						>
							{tag}
						</span>
					))}
				</div>
			)}

			{/* Post Cards */}
			{filteredPosts.map((post, index) => (
				<div
					key={index}
					className="border rounded-lg p-4 hover:shadow-md transition bg-white"
				>
					<Link
						href={`/${type}/${post.slug}`}
						className="text-2xl font-semibold text-primary hover:underline"
					>
						{post.title}
					</Link>
					<p className="text-sm text-gray-500 mb-2">
						{post.createdAt
							? new Date(post.createdAt).toLocaleDateString()
							: 'Unknown date'}
					</p>
					<p className="text-gray-700 mb-3">{post.description}</p>

					{type === 'blogs' && (
						<div className="flex gap-2 flex-wrap">
							{post.tags?.map((tag: string) => (
								<span
									key={tag}
									className="text-xs bg-gray-200 rounded-full px-3 py-1"
								>
									{tag}
								</span>
							))}
						</div>
					)}

					{type === 'tutorials' && 'difficulty' in post && (
						<div className="flex items-center justify-end text-sm">
							{(post.difficulty?.toLowerCase() ?? '') ===
								'beginner' ? (
								<span className="bg-emerald-100 text-emerald-700 rounded px-2 py-1">
									{String(post.difficulty)}
								</span>
							) : (post.difficulty?.toLowerCase() ?? '') ===
								'intermediate' ? (
								<span className="bg-yellow-100 text-yellow-700 rounded px-2 py-1">
									{String(post.difficulty)}
								</span>
							) : (post.difficulty?.toLowerCase() ?? '') ===
								'advanced' ? (
								<span className="bg-red-100 text-red-700 rounded px-2 py-1">
									{String(post.difficulty)}
								</span>
							) : (
								<span className="bg-gray-100 text-gray-700 rounded px-2 py-1">
									{String(post.difficulty)}
								</span>
							)}
						</div>
					)}
				</div>
			))}

			{posts.length === 0 && (
				<p className="text-gray-500">No {title.toLowerCase()} found.</p>
			)}

			<div className="mt-8">
				<h2 className="text-xl font-semibold mb-4">
					Popular {title.toLowerCase()}:
				</h2>
				<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
					{suggestedPosts.slice(0, 2).map(({ slug, frontMatter }) => (
						<div
							key={slug}
							className="border rounded-lg p-4 hover:shadow-md transition bg-white"
						>
							<Link
								href={`/${type}/${slug}`}
								className="text-lg font-semibold text-primary hover:underline"
							>
								{frontMatter.title}
							</Link>
							<p className="text-sm text-gray-500 mb-2">
								{new Date(
									frontMatter.updatedAt
								).toLocaleDateString()}
							</p>
							<p className="text-gray-700">
								{frontMatter.description}
							</p>
						</div>
					))}
				</div>
			</div>

			{/* create blog button */}
			{type === 'blogs' && (
				<div className="mt-8 text-center">
					<button
						onClick={createBlog}
						className="px-6 py-3 bg-blue-600 text-white rounded-full hover:scale-[1.02] transition-transform shadow-md"
					>
						Create New Blog
					</button>
				</div>
			)}
			{type === 'tutorials' && (
				<div className="mt-8 text-center">
					<button
						onClick={createTutorial}
						className="px-6 py-3 bg-blue-600 text-white rounded-full hover:scale-[1.02] transition-transform shadow-md"
					>
						Create New Tutorial
					</button>
				</div>
			)}

			{/* Footer */}
			<div className="mt-8 text-center text-gray-500 text-sm">
				<p>
					Hi, I&apos;m Joey — a passionate coder sharing my journey 🚀
				</p>
				<p>
					Explore more on my{' '}
					<Link href="/" className="text-primary hover:underline">
						homepage
					</Link>
					.
				</p>
			</div>
		</main>
	);
};

export default PostListPage;
