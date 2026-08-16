'use client';
import { motion, AnimatePresence } from 'framer-motion';
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
	const [] = useState('draft');

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
				JSON.stringify(dataToSave),
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
					.replace(/(^-|-$)+/g, ''),
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
		<section className="relative max-w-5xl mx-auto">
			<motion.div
				className="flex justify-between items-center mb-8"
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
			>
				<div>
					<h1 className="text-3xl font-bold bg-clip-text text-transparent bg-linear-to-r from-primary to-purple-600">
						Create New Blog Post
					</h1>
					<p className="text-muted-foreground mt-1">
						Share your knowledge with the world
					</p>
				</div>
				<div className="flex items-center gap-3">
					<AnimatePresence>
						{isSaving && (
							<motion.div
								initial={{ opacity: 0, x: 10 }}
								animate={{ opacity: 1, x: 0 }}
								exit={{ opacity: 0 }}
								className="flex items-center gap-2 text-sm text-muted-foreground bg-background/50 border border-border px-3 py-1.5 rounded-full"
							>
								<div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
								Saving...
							</motion.div>
						)}
					</AnimatePresence>
					{lastSaved && !isSaving && (
						<span className="text-xs text-muted-foreground">
							Saved {lastSaved.toLocaleTimeString()}
						</span>
					)}
				</div>
			</motion.div>

			<motion.div
				className="bg-card border border-border rounded-2xl shadow-lg shadow-black/5 overflow-hidden"
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
				<div className="p-6 md:p-8 space-y-8">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<motion.div
							variants={{
								hidden: { opacity: 0, y: 20 },
								visible: { opacity: 1, y: 0 },
							}}
							className="space-y-2"
						>
							<label className="block text-sm font-semibold text-foreground/80">
								Title
							</label>
							<input
								type="text"
								className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder:text-muted-foreground/50 shadow-sm text-lg font-medium"
								value={title}
								onChange={handleTitleChange}
								placeholder="e.g. The Future of Web Development"
								aria-label="Post Title"
							/>
						</motion.div>

						<motion.div
							variants={{
								hidden: { opacity: 0, y: 20 },
								visible: { opacity: 1, y: 0 },
							}}
							className="space-y-2"
						>
							<label className="block text-sm font-semibold text-foreground/80">
								Slug
							</label>
							<input
								type="text"
								className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder:text-muted-foreground/50 shadow-sm font-mono text-sm text-muted-foreground"
								value={slug}
								onChange={(e) => setSlug(e.target.value)}
								placeholder="the-future-of-web-development"
								aria-label="Post Slug"
							/>
						</motion.div>
					</div>

					<motion.div
						variants={{
							hidden: { opacity: 0, y: 20 },
							visible: { opacity: 1, y: 0 },
						}}
						className="space-y-2"
					>
						<label className="block text-sm font-semibold text-foreground/80">
							Description
						</label>
						<input
							type="text"
							className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder:text-muted-foreground/50 shadow-sm"
							value={description}
							onChange={(e) => setDescription(e.target.value)}
							placeholder="A breif summary of what this post is about..."
							aria-label="Post Description"
						/>
					</motion.div>

					<motion.div
						variants={{
							hidden: { opacity: 0, y: 20 },
							visible: { opacity: 1, y: 0 },
						}}
						className="space-y-2"
					>
						<label className="block text-sm font-semibold text-foreground/80">
							Cover Image
						</label>

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
							className="relative group border-2 border-dashed border-border rounded-2xl p-8 text-center cursor-pointer hover:bg-secondary/30 transition-all duration-300 overflow-hidden"
						>
							<div className="flex flex-col items-center justify-center gap-3">
								<div className="p-4 rounded-full bg-primary/5 text-primary group-hover:scale-110 transition-transform duration-300">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="24"
										height="24"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										strokeWidth="2"
										strokeLinecap="round"
										strokeLinejoin="round"
									>
										<rect
											width="18"
											height="18"
											x="3"
											y="3"
											rx="2"
											ry="2"
										/>
										<circle cx="9" cy="9" r="2" />
										<path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
									</svg>
								</div>
								<div>
									<p className="text-sm font-medium text-foreground">
										Click to upload or drag and drop
									</p>
									<p className="text-xs text-muted-foreground mt-1">
										SVG, PNG, JPG or GIF (max. 5MB)
									</p>
								</div>
							</div>
							<input
								id="imageInput"
								type="file"
								accept="image/*"
								onChange={handleImageChange}
								className="hidden"
							/>

							{image && (
								<div className="absolute inset-0 z-10 bg-background/90 backdrop-blur-sm flex items-center justify-center">
									<img
										src={image}
										alt="Preview"
										className="h-full w-full object-cover opacity-50 absolute inset-0"
									/>
									<div className="relative z-20 flex flex-col items-center">
										<img
											src={image}
											alt="Thumbnail"
											className="h-32 w-auto object-contain rounded-lg shadow-lg border border-border"
										/>
										<p className="text-xs text-foreground mt-2 font-medium bg-background/80 px-2 py-1 rounded">
											Click to change
										</p>
									</div>
								</div>
							)}
						</div>

						<div className="flex items-center gap-2 mt-2">
							<div className="h-px bg-border grow" />
							<span className="text-xs text-muted-foreground uppercase">
								OR
							</span>
							<div className="h-px bg-border grow" />
						</div>

						<input
							type="text"
							placeholder="Paste an Image URL instead..."
							className="w-full text-sm px-4 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder:text-muted-foreground/50"
							value={image}
							onChange={(e) => setImage(e.target.value)}
						/>
					</motion.div>

					<RenderTagInput
						tagInput={tagInput}
						setTagInput={setTagInput}
						addTag={() => {
							if (tagInput.trim()) {
								addTag(tagInput, tags, setTags)();
								setTagInput('');
							}
						}}
						tags={tags}
						removeTag={(tag) => removeTag(setTags, tags)(tag)}
					/>

					<ContentAndPreview
						previewMode={previewMode}
						setPreviewMode={setPreviewMode}
						content={content}
						setContent={setContent}
					/>
				</div>

				<div className="px-6 py-4 bg-muted/30 border-t border-border flex justify-end gap-3">
					<button
						onClick={() => handleSave('draft')}
						disabled={isSaving}
						className="px-6 py-2.5 rounded-xl font-semibold text-sm border border-border bg-background hover:bg-secondary text-foreground transition-colors disabled:opacity-50"
					>
						Save Draft
					</button>
					<button
						onClick={() => handleSave('published')}
						disabled={isSaving}
						className="px-6 py-2.5 rounded-xl font-semibold text-sm bg-linear-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-white shadow-lg shadow-primary/25 transition-all hover:-translate-y-0.5 disabled:opacity-50 disabled:translate-y-0"
					>
						Publish Post
					</button>
				</div>
			</motion.div>
		</section>
	);
}
