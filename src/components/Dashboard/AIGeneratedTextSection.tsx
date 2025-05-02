import React, { useState } from 'react';
import { motion } from 'framer-motion';
import contentAndPreview from './contentAndPreview';
import { MDXRemoteSerializeResult } from 'next-mdx-remote';

const AIGeneratedTextSection = () => {
	const [content, setContent] = useState('');
	const [previewMode, setPreviewMode] = useState<'edit' | 'split'>('edit');
	const [mdxContent, setMdxContent] =
		useState<MDXRemoteSerializeResult | null>(null);

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
			} else {
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

	return (
		<motion.section
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
			className="py-8 max-w-5xl mx-auto space-y-8"
		>
			<div className="space-y-4">
				{contentAndPreview(setPreviewMode, previewMode, setContent)}
				<div className="flex gap-4">
					<button
						onClick={handleSaveAsDraft}
						className="bg-gray-600 hover:bg-gray-700 text-white font-medium px-4 py-2 rounded"
					>
						Save as Draft
					</button>
					<button
						onClick={handleSave}
						className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded"
					>
						Save
					</button>
				</div>
			</div>
		</motion.section>
	);
};

export default AIGeneratedTextSection;
