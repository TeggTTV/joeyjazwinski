import { motion } from 'framer-motion';
import { MDXRemoteSerializeResult } from 'next-mdx-remote';
import Image from 'next/image';
import renderTagInput from './renderTagInput';
import contentAndPreview from './contentAndPreview';
import { addTag, removeTag } from './helpers';

interface CreatePostProps {
	autosaveMsg: string;
	title: string;
	setTitle: React.Dispatch<React.SetStateAction<string>>;
	handleDrop: (e: React.DragEvent<HTMLDivElement>) => void;
	handleDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
	handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	image: string | null;
	tagInput: string;
	setTagInput: React.Dispatch<React.SetStateAction<string>>;
	tags: string[];
	setTags: React.Dispatch<React.SetStateAction<string[]>>;
	setPreviewMode: React.Dispatch<React.SetStateAction<'edit' | 'split'>>;
	previewMode: string;
	content: string;
	setContent: React.Dispatch<React.SetStateAction<string>>;
	mdxContent: MDXRemoteSerializeResult | null;
	handleSaveAsDraft: () => Promise<void>;
	handleSave: () => Promise<void>;
	setMdxContent: React.Dispatch<
		React.SetStateAction<MDXRemoteSerializeResult | null>
	>;
}

export function createPost({
	autosaveMsg,
	title,
	setTitle,
	handleDrop,
	handleDragOver,
	handleImageChange,
	image,
	tagInput,
	setTagInput,
	tags,
	setTags,
	setPreviewMode,
	previewMode,
	handleSaveAsDraft,
	handleSave,
}: CreatePostProps) {
	return (
		<section>
			<motion.div
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
				{renderTagInput(
					tagInput,
					setTagInput,
					addTag(tagInput, tags, setTags, setTagInput),
					tags,
					removeTag(setTags, tags)
				)}
				{contentAndPreview(setPreviewMode, previewMode)}
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
