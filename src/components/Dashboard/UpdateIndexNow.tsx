import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getFullUrl } from '@/utils/db';
import { notifyIndexNow } from '@/utils/indexNowNotifier';
import Select from 'react-select';

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
		for (const blogId of selectedBlogs) {
			const blog = blogs.find((b) => b.id === blogId);
			if (blog) {
				const blogUrl = `https://joeyjazwinski.vercel.app/blogs/${blog.slug}`;
				await notifyIndexNow(blogUrl);
			}
		}
		console.log('IndexNow updated for selected blogs.');
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
						selectedOptions.map((option) => option.value)
					)
				}
			/>
			<button
				onClick={updateIndexNow}
				className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
			>
				Update IndexNow
			</button>
		</motion.section>
	);
}
