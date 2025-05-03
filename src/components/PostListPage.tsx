import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { PostData } from '../lib/mdx';
import { BlogPostData, createTutorialPost, TutorialData } from '@/utils/db';
import { motion } from 'framer-motion';

interface PostListPageProps {
	title: string;
	posts: BlogPostData[] | TutorialData[] | PostData[];
	type: 'blogs' | 'tutorials';
	enableTags?: boolean;
	selectedTags?: string[];
	suggestedPosts?: PostData[];
}
const PostListPage: React.FC<PostListPageProps> = ({
	title,
	posts,
	type,
	selectedTags: defaultSelectedTags = [],
	enableTags = false,
	suggestedPosts = [],
}) => {
	const [searchTerm, setSearchTerm] = useState('');
	const [selectedTags, setSelectedTags] =
		useState<string[]>(defaultSelectedTags);
	const router = useRouter();

	useEffect(() => {
		const query = router.query;

		if (query.query) {
			setSearchTerm(query.query as string);
		}
	}, [router.query]);

	let tags: string[] = [];
	posts.forEach((post) => {
		if (post.tags) {
			tags = [...tags, ...post.tags];
			// alphabetyiclka
			tags = tags.sort((a, b) => a.localeCompare(b));
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
			enableTags && selectedTags.length > 0
				? `&tags=${selectedTags.join(',')}`
				: '';
		router.push(base + tagsParam);
	};

	// function createBlog() {
	// 	createBlogPost({
	// 		title: 'New Blog Post',
	// 		description: 'Write your blog description here...',
	// 		content: 'Write your blog content here...',
	// 		tags: [],
	// 		createdAt: new Date(),
	// 		updatedAt: new Date(),
	// 	})
	// 		.then(() => router.push('/blogs'))
	// 		.catch((err) => {
	// 			console.error('Error creating blog post:', err);
	// 			alert('Failed to create blog post. Please try again.');
	// 		});
	// }

	function createTutorial() {
		createTutorialPost({
			title: 'New Tutorial Post',
			description: 'Write your tutorial description here...',
			content: 'Write your tutorial content here...',
			tags: [],
			createdAt: new Date(),
			updatedAt: new Date(),
			difficulty: 'Beginner',
		})
			.then(() => router.push('/tutorials'))
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
		<main className="max-w-5xl px-10 mx-auto py-8 space-y-8">
			<motion.h1
				className="text-3xl font-bold"
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
			>
				{title}
			</motion.h1>

			<form onSubmit={handleSearch} className="flex mb-4 space-x-2">
				<input
					type="text"
					placeholder={`Search ${type}...`}
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
					className="flex-grow border rounded-l px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
				/>
				<motion.button
					whileFocus={{ scale: 0.95 }}
					whileTap={{ scale: 0.95 }}
					whileHover={{ scale: 1.02 }}
					transition={{ duration: 0.2 }}
					type="submit"
					className="cursor-pointer bg-primary-600 hover:bg-blue-700 text-white px-4 rounded"
				>
					Search
				</motion.button>
			</form>

			{enableTags && (
				<motion.div
					className="flex flex-wrap gap-2 mb-4"
					initial="hidden"
					animate="visible"
					variants={{
						hidden: {},
						visible: {
							transition: { staggerChildren: 0.05 },
						},
					}}
				>
					{allTags.map((tag) => (
						<motion.span
							key={tag}
							onClick={() => toggleTag(tag)}
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
							initial={{ opacity: 0, scale: 0.8 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{ duration: 0.3 }}
							className={`px-3 py-1 rounded-full cursor-pointer transition-colors ${
								selectedTags.includes(tag)
									? 'bg-primary-500 text-white'
									: 'bg-gray-200 text-gray-700'
							}`}
						>
							{tag}
						</motion.span>
					))}
				</motion.div>
			)}

			{/* Post Cards */}
			<motion.div
				className="space-y-4"
				initial="hidden"
				animate="visible"
				variants={{
					hidden: {},
					visible: { transition: { staggerChildren: 0.1 } },
				}}
			>
				{filteredPosts.map((post, index) => (
					<motion.div
						key={index}
						className="border rounded-lg p-4 hover:shadow-md transition bg-white"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.4 }}
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

						{/* {type === 'blogs' && ( */}
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
						{/* )} */}

						{type === 'tutorials' && 'difficulty' in post && (
							<div className="flex items-center justify-end text-sm mt-2">
								<span
									className={`px-2 py-1 rounded-full text-xs font-semibold ${
										(
											post as TutorialData
										).difficulty?.toLowerCase() ===
										'beginner'
											? 'bg-green-100 text-green-700'
											: (
													post as TutorialData
											  ).difficulty?.toLowerCase() ===
											  'intermediate'
											? 'bg-yellow-100 text-yellow-700'
											: (
													post as TutorialData
											  ).difficulty?.toLowerCase() ===
											  'advanced'
											? 'bg-red-100 text-red-700'
											: 'bg-gray-100 text-gray-700'
									}`}
								>
									{(post as TutorialData).difficulty}
								</span>
							</div>
						)}
					</motion.div>
				))}
			</motion.div>

			{/* Suggested Posts */}
			{suggestedPosts.length > 0 && (
				<motion.div
					className="mt-8"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.5 }}
				>
					<h2 className="text-xl font-semibold mb-4">
						Popular {title.toLowerCase()}:
					</h2>
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
						{suggestedPosts
							.slice(0, 2)
							.map(({ slug, frontMatter }) => (
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
				</motion.div>
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
