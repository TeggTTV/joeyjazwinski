'use client';
import { motion } from 'framer-motion';
import RenderTagInput from './RenderTagInput';
import { addTag, removeTag } from './helpers';
import { useState, useEffect } from 'react';
import ContentAndPreview from './ContentAndPreview';

import { toast } from 'react-toastify';

export default function CreatePost() {
	const [content, setContent] = useState('');
	const [previewMode, setPreviewMode] = useState<'edit' | 'split'>('edit');

	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [tags, setTags] = useState<string[]>([]);
	const [image, setImage] = useState('');
	const [status, setStatus] = useState('draft');

	const [tagInput, setTagInput] = useState('');

	const [slug, setSlug] = useState('');

	// Autosave State
	const [lastSaved, setLastSaved] = useState<Date | null>(null);
	const [isSaving, setIsSaving] = useState(false);

	// Load from local storage on mount
	useEffect(() => {
		const savedData = localStorage.getItem('createPost_draft');
		if (savedData) {
			try {
				const parsed = JSON.parse(savedData);
				setTitle(parsed.title || '');
				setSlug(parsed.slug || '');
				setContent(parsed.content || '');
				setDescription(parsed.description || '');
				setTags(parsed.tags || []);
				setImage(parsed.image || '');
				setLastSaved(new Date(parsed.timestamp));
				toast.info('Restored draft from local storage');
			} catch (e) {
				console.error('Failed to parse draft', e);
			}
		}
	}, []);

	// Autosave logic
	useEffect(() => {
		const saveData = () => {
			if (!title && !content) return; // Don't save empty

			setIsSaving(true);
			const dataToSave = {
				title,
				slug,
				content,
				description,
				tags,
				image,
				timestamp: new Date().toISOString(),
			};
			localStorage.setItem(
				'createPost_draft',
				JSON.stringify(dataToSave)
			);

			setTimeout(() => {
				setLastSaved(new Date());
				setIsSaving(false);
			}, 500); // Simulate network delay / minimum visual time
		};

		const timeoutId = setTimeout(saveData, 2000); // Debounce autosave 2s
		return () => clearTimeout(timeoutId);
	}, [title, slug, content, description, tags, image]);

	// Auto-generate slug from title
	const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const val = e.target.value;
		setTitle(val);
		// Only auto-generate if user hasn't manually edited slug
		if (
			!slug ||
			slug ===
				val
					.slice(0, -1)
					.toLowerCase()
					.replace(/[^a-z0-9]+/g, '-')
					.replace(/(^-|-$)+/g, '')
		) {
			setSlug(
				val
					.toLowerCase()
					.replace(/[^a-z0-9]+/g, '-')
					.replace(/(^-|-$)+/g, '')
			);
		}
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

	const handleSave = async (postStatus: 'draft' | 'published') => {
		try {
			const response = await fetch('/api/savePost', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					title,
					slug,
					content,
					description,
					tags,
					image,
					status: postStatus,
				}),
			});
			const data = await response.json();
			if (response.ok) {
				toast.success(data.message || `Post saved as ${postStatus}!`);
				if (postStatus === 'published') {
					// Clear draft on publish
					localStorage.removeItem('createPost_draft');
				}
			} else {
				toast.error(data.message || 'Failed to save post.');
			}
		} catch (error) {
			console.error(error);
			toast.error('An error occurred while saving.');
		}
	};

	const isDraggingOver = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		e.currentTarget.classList.add('border-primary');
		e.currentTarget.classList.add('bg-primary/5');
	};

	const isDraggingLeave = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		e.currentTarget.classList.remove('border-primary');
		e.currentTarget.classList.remove('bg-primary/5');
	};

	return (
		<section className="relative">
			<motion.div
				className="flex justify-between items-center mb-6"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 0.2 }}
			>
				<h1 className="text-3xl font-bold">Create New Blog Post</h1>
				<div className="text-sm text-gray-500 flex items-center gap-2">
					{isSaving ? (
						<span className="flex items-center gap-1 text-primary">
							<motion.div
								className="w-2 h-2 rounded-full bg-primary"
								animate={{ scale: [1, 1.2, 1] }}
								transition={{ repeat: Infinity, duration: 1 }}
							/>
							Saving...
						</span>
					) : lastSaved ? (
						<span>Saved {lastSaved.toLocaleTimeString()}</span>
					) : null}
				</div>
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
					<label className="block font-medium mb-1">Title</label>
					<input
						type="text"
						className="w-full border px-3 py-2 rounded shadow-sm focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none"
						value={title}
						onChange={handleTitleChange}
						aria-label="Post Title"
					/>
				</motion.div>
				<motion.div
					variants={{
						hidden: { opacity: 0, y: 20 },
						visible: { opacity: 1, y: 0 },
					}}
				>
					<label className="block font-medium mb-1">Slug</label>
					<input
						type="text"
						className="w-full border px-3 py-2 rounded shadow-sm focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none"
						value={slug}
						onChange={(e) => setSlug(e.target.value)}
						aria-label="Post Slug"
					/>
				</motion.div>
				<motion.div
					variants={{
						hidden: { opacity: 0, y: 20 },
						visible: { opacity: 1, y: 0 },
					}}
				>
					<label className="block font-medium mb-1">
						Description
					</label>
					<input
						type="text"
						className="w-full border px-3 py-2 rounded shadow-sm focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none"
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						aria-label="Post Description"
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
					<div className="mb-2">
						<input
							type="text"
							placeholder="Image URL"
							className="w-full border px-3 py-2 rounded shadow-sm mb-2 focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none"
							value={image}
							onChange={(e) => setImage(e.target.value)}
							aria-label="Image URL"
						/>
						<div className="text-center text-sm text-gray-500 mb-2">
							- OR -
						</div>
					</div>
					<div
						onDrop={(e) => {
							handleDrop(e);
							isDraggingLeave(e);
						}}
						onDragOver={isDraggingOver}
						onDragLeave={isDraggingLeave}
						onClick={() =>
							document.getElementById('imageInput')?.click()
						}
						className="border-dashed border-2 border-gray-300 p-8 rounded text-center cursor-pointer hover:bg-secondary/50 transition-colors"
					>
						<p className="text-muted-foreground">
							Drag and drop an image here, or click to upload
						</p>
						<input
							id="imageInput"
							aria-label="Upload Thumbnail"
							type="file"
							accept="image/*"
							onChange={handleImageChange}
							className="hidden"
						/>
					</div>
					{image && (
						<div className="mt-4 text-center">
							<span className="block text-sm text-gray-500 mb-2">
								Preview:
							</span>
							<img
								src={image}
								alt="Thumbnail"
								className="max-h-64 rounded-xl border mx-auto shadow-sm"
							/>
						</div>
					)}
				</motion.div>

				<RenderTagInput
					tagInput={tagInput}
					setTagInput={setTagInput}
					addTag={addTag(tagInput, tags, setTags)}
					tags={tags}
					removeTag={(tag) => removeTag(setTags, tags)(tag)}
				/>

				<ContentAndPreview
					previewMode={previewMode}
					setPreviewMode={setPreviewMode}
					content={content}
					setContent={setContent}
				/>
			</motion.div>
			<div className="flex gap-4 justify-end mt-8">
				<button
					onClick={() => handleSave('draft')}
					className="cursor-pointer border border-primary text-primary px-6 py-2.5 rounded-xl font-medium hover:bg-primary/5 transition-colors"
				>
					Save as Draft
				</button>
				<button
					onClick={() => handleSave('published')}
					className="cursor-pointer bg-primary text-primary-foreground px-6 py-2.5 rounded-xl font-medium hover:bg-primary/90 transition-colors shadow-lg shadow-primary/25"
				>
					Publish Post
				</button>
			</div>
		</section>
	);
}
