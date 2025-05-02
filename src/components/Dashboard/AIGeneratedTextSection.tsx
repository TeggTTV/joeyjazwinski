import React, { useState } from 'react';
import { motion } from 'framer-motion';
import contentAndPreview from './contentAndPreview';

const AIGeneratedTextSection = () => {
	const [content, setContent] = useState('');
	const [previewMode, setPreviewMode] = useState<'edit' | 'split'>('edit');
	const [isCopied, setIsCopied] = useState(false);

	const extractMetadata = (markdown: string) => {
		const lines = markdown.split('\n');
		const firstLine = lines[0];

		const metadata: {
			title?: string;
			description?: string;
			tags?: string[];
			slug?: string;
		} = {};

		firstLine.split(';').forEach((part) => {
			const [key, ...rest] = part.split(':');
			if (!key || !rest.length) return;

			const trimmedKey = key.trim().toLowerCase();
			const value = rest.join(':').trim();

			if (trimmedKey === 'tags') {
				metadata.tags = value
					.split(',')
					.map((tag) => tag.trim())
					.filter(Boolean);
			} else if (
				trimmedKey === 'title' ||
				trimmedKey === 'description' ||
				trimmedKey === 'slug'
			) {
				metadata[trimmedKey] = value;
			}
		});

		// Return both the metadata and the content (without the metadata line)
		const cleanedContent = lines.slice(1).join('\n').trim();
		console.log(lines, cleanedContent);

		return {
			metadata,
			content: cleanedContent,
		};
	};

	const handleSave = async () => {
		const extracted = extractMetadata(content);

		if (!extracted) {
			alert('Metadata block (/////) missing or malformed.');
			return;
		}

		const response = await fetch('/api/savePost', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				content: extracted.content,
				status: 'published',
				...extracted.metadata,
			}),
		});
		const data = await response.json();
		alert(data.message || 'Text saved successfully!');
	};

	const handleSaveAsDraft = async () => {
		const response = await fetch('/api/savePost', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				content,
				status: 'draft',
			}),
		});
		const data = await response.json();
		alert(data.message || 'Text saved as draft successfully!');
	};

	const handleCopy = () => {
		navigator.clipboard.writeText(content);
		setIsCopied(true);
		setTimeout(() => setIsCopied(false), 2000); // Reset after 2 seconds
	};

	return (
		<motion.section
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
			className="py-8 max-w-5xl mx-auto space-y-8"
		>
			{/* title */}
			<motion.h1 className="text-3xl font-bold">
				AI Generated Blog
			</motion.h1>
			{/* description */}
			<motion.p className="text-lg text-gray-700">
				This section allows you to generate and edit AI content.
			</motion.p>
			{/* copy prompt button */}
			<motion.button
				onClick={handleCopy}
				whileHover={{ scale: 1.052 }}
				whileTap={{ scale: 0.95 }}
				whileFocus={{ scale: 0.95 }}
				className={`cursor-pointer font-medium px-4 py-2 rounded bg-gray-600 hover:bg-gray-700'} text-white`}
			>
				{isCopied ? (
					<motion.div
						initial={{ opacity: 0, scale: 0.8 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ duration: 0.3 }}
						className="flex items-center justify-center"
					>
						Copied!
					</motion.div>
				) : (
					'Copy Prompt'
				)}
			</motion.button>

			<div className="space-y-4">
				{contentAndPreview(setPreviewMode, previewMode, setContent)}
				<div className="flex gap-4">
					<motion.button
						whileHover={{ scale: 1.02 }}
						whileTap={{ scale: 0.95 }}
						whileFocus={{ scale: 0.95 }}
						transition={{ duration: 0.2 }}
						onClick={handleSaveAsDraft}
						className="cursor-pointer bg-gray-600 hover:bg-gray-700 text-white font-medium px-4 py-2 rounded"
					>
						Save as Draft
					</motion.button>
					<motion.button
						whileHover={{ scale: 1.02 }}
						whileTap={{ scale: 0.95 }}
						whileFocus={{ scale: 0.95 }}
						transition={{ duration: 0.2 }}
						onClick={handleSave}
						className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded"
					>
						Save
					</motion.button>
				</div>
			</div>
		</motion.section>
	);
};

export default AIGeneratedTextSection;
