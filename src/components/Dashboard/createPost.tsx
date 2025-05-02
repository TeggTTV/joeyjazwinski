import { motion } from 'framer-motion';
import Image from 'next/image';
import renderTagInput from './renderTagInput';
import contentAndPreview from './contentAndPreview';
import { addTag, removeTag } from './helpers';
import { useState } from 'react';

export function createPost() {
	const [content, setContent] = useState('');
	const [previewMode, setPreviewMode] = useState<'edit' | 'split'>('edit');

	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [tags, setTags] = useState<string[]>([]);
	const [image, setImage] = useState('');

    const [tagInput, setTagInput] = useState('');

	
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
                description,
				tags,
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
				image,
				status: 'draft',
			}),
		});
		const data = await response.json();
		alert(data.message || 'Post saved as draft successfully!');
	};

	return (
		<section>
			{/* <motion.div
				className="flex justify-between items-center"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 0.2 }}
			>
				<h1 className="text-3xl font-bold">Create New Blog Post</h1>
				<span className="text-sm text-gray-500 flex items-center gap-1">
					<motion.span
						className="w-2 h-2 rounded-full bg-green-400"
						animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
						transition={{ repeat: Infinity, duration: 1.5 }}
					/>
					{autosaveMsg}
				</span>
			</motion.div> */}
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
					<label className="block font-medium mb-1">Title</label>
					<input
						type="text"
						className="w-full border px-3 py-2 rounded shadow-sm"
						value={title}
						onChange={(e) => setDescription(e.target.value)}
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
				{renderTagInput(
					tagInput,
					setTagInput,
					addTag(tagInput, tags, setTags, setTagInput),
					tags,
					removeTag(setTags, tags)
				)}
				{contentAndPreview(setPreviewMode, previewMode, setContent)}
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
		</section>
	);
}
