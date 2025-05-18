import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getFullUrl } from '@/utils/db';
import Select from 'react-select';
import { toast } from 'react-toastify';

interface BlogPost {
	id: string;
	title: string;
	slug: string;
}

export default function UpdateIndexNow() {
	const [blogs, setBlogs] = useState<BlogPost[]>([]);
	const [selectedBlogs, setSelectedBlogs] = useState<string[]>([]);

	useEffect(() => {
		async function fetchBlogs() {
			const response = await fetch(getFullUrl('/api/getBlogPosts'), {
				method: 'GET',
				credentials: 'include',
			});
			const data = await response.json();
			setBlogs(data.blogPosts);
		}
		fetchBlogs();
	}, []);

	const updateIndexNow = async () => {
		try {
			const blogUrls = selectedBlogs
				.map((blogId) => {
					const blog = blogs.find((b) => b.id === blogId);
					return blog
						? `https://joeyjazwinski.vercel.app/blogs/${blog.slug}`
						: null;
				})
				.filter((url): url is string => url !== null);

			const response = await fetch(getFullUrl('/api/notifyIndexNow'), {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ blogUrls }),
			});

			if (!response.ok) {
				throw new Error('Failed to notify IndexNow');
			}
			toast.success('IndexNow updated successfully! 🚀');
			console.log('IndexNow updated for selected blogs.');
		} catch (error) {
			console.error('Error updating IndexNow:', error);
		}
	};

	const toggleSelectAll = () => {
		if (selectedBlogs.length === blogs.length) {
			setSelectedBlogs([]);
		} else {
			setSelectedBlogs(blogs.map((blog) => blog.id));
		}
	};

	return (
		<motion.section
			className="mb-4"
			initial={{ opacity: 0, y: -20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.2 }}
			exit={{ opacity: 0, y: -20 }}
		>
			<h2 className="text-2xl font-bold mb-4">Update IndexNow</h2>
			<label className="block text-sm font-medium text-gray-700">
				Select Blog Posts
			</label>
			<div className="flex items-center gap-2">
				<Select
					isMulti
					options={blogs.map((blog) => ({
						value: blog.id,
						label: blog.title,
					}))}
					value={selectedBlogs.map((blogId) => {
						const blog = blogs.find((b) => b.id === blogId);
						return blog ? { value: blog.id, label: blog.title } : null;
					})}
					onChange={(selectedOptions) =>
						setSelectedBlogs(
							selectedOptions.map((option) => option!.value)
						)
					}
				/>
				<button
					onClick={toggleSelectAll}
					className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded"
				>
					{selectedBlogs.length === blogs.length
						? 'Deselect All'
						: 'Select All'}
				</button>
			</div>
			<button
				onClick={updateIndexNow}
				className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
			>
				Update IndexNow
			</button>
		</motion.section>
	);
}
