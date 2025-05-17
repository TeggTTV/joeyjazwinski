import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BlogPostData } from '@/utils/db';
import { getFullUrl } from '@/utils/db';
import { ChevronDownIcon } from 'lucide-react';
import { toast } from 'react-toastify';

export default function ManageBlogs() {
	const [blogs, setBlogs] = useState<BlogPostData[]>([]);
	const [expandedBlogs, setExpandedBlogs] = useState<string[]>([]);

	useEffect(() => {
		async function fetchBlogs() {
			try {
				const response = await fetch(getFullUrl('/api/getBlogPosts'));
				if (!response.ok) {
					throw new Error('Failed to fetch blogs');
				}
				const data = await response.json();
				setBlogs(data.blogPosts || []);
			} catch (error) {
				console.error('Error fetching blogs:', error);
			}
		}
		fetchBlogs();
	}, []);

	const toggleBlog = (blogSlug: string) => {
		setExpandedBlogs((prev) =>
			prev.includes(blogSlug)
				? prev.filter((slug) => slug !== blogSlug)
				: [...prev, blogSlug]
		);
	};

	const handleDeleteBlog = async (blogSlug: string) => {
		try {
			const response = await fetch(`/api/deleteBlog`, {
				method: 'POST',
				credentials: 'include',
				body: blogSlug,
			});
			if (!response.ok) {
				throw new Error('Failed to delete blog');
			}
			setBlogs((prevBlogs) =>
				prevBlogs.filter((blog) => blog.slug !== blogSlug)
			);
		} catch (error) {
			console.error('Error deleting blog:', error);
		}
	};

	// Ensure tags is handled correctly based on its type
	const handleBlogChange = (blogSlug: string, field: string, value: string | string[]) => {
		if (field === 'tags') {
			if (Array.isArray(value)) {
				value = value.filter((tag) => tag.trim() !== ''); // Ensure no empty tags
			}
		}
		setBlogs((prevBlogs) =>
			prevBlogs.map((blog) =>
				blog.slug === blogSlug ? { ...blog, [field]: value } : blog
			)
		);
	};

	const saveChanges = async () => {
		try {
			const response = await fetch(getFullUrl('/api/updateBlogPosts'), {
				method: 'POST',
				credentials: 'include',
				body: JSON.stringify(blogs),
			});
			if (!response.ok) {
				throw new Error('Failed to save changes');
			}
			toast.success('Changes saved successfully!');
		} catch (error) {
			console.error('Error saving changes:', error);
			toast.error('Failed to save changes. Please try again later.');
		}
	};

	return (
		<motion.section
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
		>
			<h2 className="text-2xl font-bold mb-4">Manage Blogs</h2>
			<div className="space-y-6">
				{blogs.length === 0 ? (
					<p className="text-gray-500">No blogs available.</p>
				) : (
					blogs.map((blog) => (
						<div
							key={blog.slug}
							className="border rounded-lg p-4 bg-white shadow-sm"
						>
							<div
								className="cursor-pointer font-medium text-lg flex items-center gap-2"
								onClick={() => toggleBlog(blog.slug!)}
							>
								<span
									className={`inline-block transition-transform duration-75 ${
										expandedBlogs.includes(blog.slug!)
											? 'rotate-0'
											: '-rotate-90'
									}`}
								>
									<ChevronDownIcon className="w-5 h-5" />
								</span>
								{blog.title}
							</div>
							{expandedBlogs.includes(blog.slug!) && (
								<div className="ml-4 mt-4 space-y-4">
									<div className="space-y-2">
										<label
											htmlFor={`blog-description-${blog.slug}`}
											className="block font-medium"
										>
											Blog Description
										</label>
										<textarea
											id={`blog-description-${blog.slug}`}
											className="w-full px-3 py-2 border rounded"
											placeholder="Blog Description"
											value={blog.description || ''}
											onChange={(e) =>
												handleBlogChange(
													blog.slug!,
													'description',
													e.target.value
												)
											}
										/>
									</div>
									<div className="space-y-2">
										<label
											htmlFor={`blog-tags-${blog.slug}`}
											className="block font-medium"
										>
											Tags
										</label>
										<input
											id={`blog-tags-${blog.slug}`}
											type="text"
											className="w-full px-3 py-2 border rounded"
											placeholder="Tags"
											value={
												blog.tags?.join(', ') || ''
											}
											onChange={(e) =>
												handleBlogChange(
													blog.slug!,
													'tags',
													e.target.value
														.split(',')
														.map((tag) =>
															tag.trim()
														)
												)
											}
										/>
									</div>
									<div className="flex gap-2">
										<button
											onClick={() =>
												handleDeleteBlog(blog.slug!)
											}
											className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
										>
											Delete
										</button>
									</div>
								</div>
							)}
						</div>
					))
				)}
			</div>
			<motion.button
				whileHover={{ scale: 1.02 }}
				whileTap={{ scale: 0.95 }}
				transition={{ duration: 0.2 }}
				onClick={saveChanges}
				className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded"
			>
				Save Changes
			</motion.button>
		</motion.section>
	);
}
