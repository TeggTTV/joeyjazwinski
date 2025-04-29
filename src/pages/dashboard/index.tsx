'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXClient } from 'next-mdx-remote-client';

const DashboardPage = () => {
	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');
	const [tags, setTags] = useState<string[]>([]);
	const [tagInput, setTagInput] = useState('');
	const [autosaveMsg, setAutosaveMsg] = useState('');
	const [lastSaved, setLastSaved] = useState<number>(Date.now());
	const [image, setImage] = useState<string | null>(null);
	const [previewMode, setPreviewMode] = useState<'edit' | 'split'>('edit');
	const [postType, setPostType] = useState<'blog' | 'tutorial'>('blog');
	const [difficulty, setDifficulty] = useState<
		'beginner' | 'intermediate' | 'advanced'
	>('beginner');
	const [mdxContent, setMdxContent] =
		useState<MDXRemoteSerializeResult | null>(null);

	// Add tag suggestions
	// const suggestedTags = ['React', 'JavaScript', 'CSS', 'Next.js', 'Tutorial'];

	async function handleMDXUpdate(text: string) {
		setContent(text);
		setMdxContent(await serialize(text));
	}

	// Simulate autosave
	useEffect(() => {
		const timer = setTimeout(() => {
			setAutosaveMsg(`Saved at ${new Date().toLocaleTimeString()}`);
			setLastSaved(Date.now());
		}, 1500);
		return () => clearTimeout(timer);
	}, [title, content, tags]);

	useEffect(() => {
		const updateMdx = async () => {
			const serialized = await serialize(content);
			setMdxContent(serialized);
		};
		updateMdx();
	}, [content]);

	const addTag = () => {
		if (tagInput.trim() && !tags.includes(tagInput.trim())) {
			setTags([...tags, tagInput.trim()]);
		}
		setTagInput('');
	};

	const removeTag = (tag: string) => {
		setTags(tags.filter((t) => t !== tag));
	};

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files[0]) {
			const reader = new FileReader();
			reader.onload = (ev) => {
				if (ev.target?.result) setImage(ev.target.result as string);
			};
			reader.readAsDataURL(e.target.files[0]);
		}
	};

	// Add drag-and-drop functionality for image upload
	const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		if (e.dataTransfer.files && e.dataTransfer.files[0]) {
			const reader = new FileReader();
			reader.onload = (ev) => {
				if (ev.target?.result) setImage(ev.target.result as string);
			};
			reader.readAsDataURL(e.dataTransfer.files[0]);
		}
	};

	const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
	};

	const handleSave = async () => {
		const response = await fetch('/api/savePost', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				title,
				content,
				tags,
				postType,
				difficulty,
				image,
				status: 'published',
			}),
		});
		const data = await response.json();
		alert(data.message || 'Post saved successfully!');
	};

	const handleSaveAsDraft = async () => {
		const response = await fetch('/api/savePost', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				title,
				content,
				tags,
				postType,
				difficulty,
				image,
				status: 'draft',
			}),
		});
		const data = await response.json();
		alert(data.message || 'Post saved as draft successfully!');
	};

	useEffect(() => {
		const autoSave = async () => {
			if (Date.now() - lastSaved > 5000) {
				await fetch('/api/savePost', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({
						title,
						content,
						tags,
						postType,
						difficulty,
						image,
						status: 'draft',
					}),
				});
				setLastSaved(Date.now());
				setAutosaveMsg(`Autosaved at ${new Date().toLocaleTimeString()}`);
			}
		};
		const timer = setInterval(autoSave, 5000);
		return () => clearInterval(timer);
	}, [title, content, tags, postType, difficulty, image, lastSaved]);

	return (
		<motion.div
			className="py-8 max-w-5xl mx-auto space-y-8"
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
		>
			<motion.div
				className="flex justify-between items-center"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 0.2 }}
			>
				<h1 className="text-3xl font-bold">Create New Post</h1>
				<span className="text-sm text-gray-500 flex items-center gap-1">
					<motion.span
						className="w-2 h-2 rounded-full bg-green-400"
						animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
						transition={{ repeat: Infinity, duration: 1.5 }}
					/>
					{autosaveMsg}
				</span>
			</motion.div>

			<motion.div
				className="grid gap-6"
				initial="hidden"
				animate="visible"
				variants={{
					hidden: { opacity: 0, y: 20 },
					visible: {
						opacity: 1,
						y: 0,
						transition: {
							staggerChildren: 0.1,
						},
					},
				}}
			>
				<motion.div
					variants={{
						hidden: { opacity: 0, y: 20 },
						visible: { opacity: 1, y: 0 },
					}}
				>
					<label className="block font-medium mb-1">Post Type</label>
					<select
						className="w-full border px-3 py-2 rounded shadow-sm"
						value={postType}
						onChange={(e) =>
							setPostType(e.target.value as 'blog' | 'tutorial')
						}
						aria-label="Post Type"
					>
						<option value="blog">Blog</option>
						<option value="tutorial">Tutorial</option>
					</select>
				</motion.div>

				{postType === 'tutorial' && (
					<motion.div
						variants={{
							hidden: { opacity: 0, y: 20 },
							visible: { opacity: 1, y: 0 },
						}}
					>
						<label className="block font-medium mb-1">
							Difficulty
						</label>
						<select
							className="w-full border px-3 py-2 rounded shadow-sm"
							value={difficulty}
							onChange={(e) =>
								setDifficulty(
									e.target.value as
										| 'beginner'
										| 'intermediate'
										| 'advanced'
								)
							}
							aria-label="Select difficulty level"
						>
							<option value="beginner">Beginner</option>
							<option value="intermediate">Intermediate</option>
							<option value="advanced">Advanced</option>
						</select>
					</motion.div>
				)}

				<motion.div
					variants={{
						hidden: { opacity: 0, y: 20 },
						visible: { opacity: 1, y: 0 },
					}}
				>
					<label className="block font-medium mb-1">Title</label>
					<input
						type="text"
						className="w-full border px-3 py-2 rounded shadow-sm"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						aria-label="Post Title"
					/>
				</motion.div>

				<motion.div
					variants={{
						hidden: { opacity: 0, y: 20 },
						visible: { opacity: 1, y: 0 },
					}}
				>
					<label className="block font-medium mb-1">
						Thumbnail Image
					</label>
					<div
						onDrop={handleDrop}
						onDragOver={handleDragOver}
						className="border-dashed border-2 border-gray-300 p-4 rounded text-center"
					>
						<p>Drag and drop an image here, or click to upload</p>
						<input
							aria-label="Upload Thumbnail"
							type="file"
							accept="image/*"
							onChange={handleImageChange}
							className="hidden"
						/>
					</div>
					{image && (
						<Image
							src={image}
							alt="Thumbnail"
							className="mt-2 max-h-48 rounded border"
						/>
					)}
				</motion.div>

				<motion.div
					variants={{
						hidden: { opacity: 0, y: 20 },
						visible: { opacity: 1, y: 0 },
					}}
				>
					<label className="block font-medium mb-1">Tags</label>
					<div className="flex gap-2 mb-2">
						<input
							type="text"
							value={tagInput}
							onChange={(e) => setTagInput(e.target.value)}
							className="border px-3 py-1 rounded w-full"
							placeholder="Add tag"
							onKeyDown={(e) =>
								e.key === 'Enter' &&
								(e.preventDefault(), addTag())
							}
						/>
						<button
							onClick={addTag}
							className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 cursor-pointer"
						>
							Add
						</button>
					</div>
					<div className="flex flex-wrap gap-2">
						{tags.map((tag) => (
							<span
								key={tag}
								className="border px-2 py-1 rounded text-sm"
							>
								{tag}{' '}
								<button
									onClick={() => removeTag(tag)}
									className="ml-1 text-red-500"
								>
									×
								</button>
							</span>
						))}
					</div>
					{/* <div className="flex flex-wrap gap-2">
                        {suggestedTags.map(tag => (
                            <button
                                key={tag}
                                onClick={() => !tags.includes(tag) && setTags([...tags, tag])}
                                className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-sm hover:bg-blue-200"
                            >
                                {tag}
                            </button>
                        ))}
                    </div> */}
				</motion.div>

				<motion.div
					variants={{
						hidden: { opacity: 0, y: 20 },
						visible: { opacity: 1, y: 0 },
					}}
				>
					<div className="flex justify-between items-center">
						<label className="block font-medium mb-1">
							Content
						</label>
						<button
							onClick={() =>
								setPreviewMode(
									previewMode === 'edit' ? 'split' : 'edit'
								)
							}
							className="text-sm underline"
						>
							Toggle {previewMode === 'edit' ? 'Preview' : 'Editor'}
						</button>
					</div>

					<motion.div
						className="grid gap-4"
						animate={{
							gridTemplateColumns:
								previewMode === 'split' ? '1fr 1fr' : '1fr',
						}}
						transition={{ duration: 0.5 }}
					>
						<motion.textarea
							aria-label="Post Content"
							placeholder="Write your content here..."
							rows={16}
							className="w-full p-3 border rounded shadow-sm font-mono"
							value={content}
							onChange={(e) => setContent(e.target.value)}
							animate={{
								width: previewMode === 'split' ? '100%' : '100%',
							}}
							transition={{ duration: 0.5 }}
						/>

						{previewMode === 'split' && (
							<motion.div
								className="p-4 border rounded bg-gray-50 prose max-w-none overflow-auto"
								initial={{ opacity: 0, x: 50 }}
								animate={{ opacity: 1, x: 0 }}
								exit={{ opacity: 0, x: 50 }}
								transition={{ duration: 0.5 }}
							>
								<h1 className="text-2xl font-bold mb-2">{title}</h1>
								<div>
									{mdxContent ? <MDXRemote {...mdxContent} /> : 'Start writing your content here...'}
								</div>
							</motion.div>
						)}
					</motion.div>

					<p className="text-sm text-gray-400">
						{content.length} characters, {content.trim().split(/\s+/).length} words, {content.split('\n').length} paragraphs
					</p>
				</motion.div>
			</motion.div>
			<div className="flex gap-4 float-right">
				<button
					onClick={handleSaveAsDraft}
					className="cursor-pointer border text-blue-600 border-blue-500 px-4 py-2 rounded"
				>
					Save as Draft
				</button>
				<button
					onClick={handleSave}
					className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
				>
					Save
				</button>
			</div>
		</motion.div>
	);
};

export default DashboardPage;
