import { motion } from 'framer-motion';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';

export default function contentAndPreview(
	setPreviewMode: React.Dispatch<React.SetStateAction<'split' | 'edit'>>,
	previewMode: string,
	content: string,
	setContent: React.Dispatch<React.SetStateAction<string>>,
	title: string,
	mdxContent: MDXRemoteSerializeResult | null
) {
	return (
		<motion.div
			variants={{
				hidden: { opacity: 0, y: 20 },
				visible: { opacity: 1, y: 0 },
			}}
		>
			<div className="flex justify-between items-center">
				<label className="block font-medium mb-1">Content</label>
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
							{mdxContent ? (
								<MDXRemote {...mdxContent} />
							) : (
								'Start writing your content here...'
							)}
						</div>
					</motion.div>
				)}
			</motion.div>

			<p className="text-sm text-gray-400">
				{content.length} characters,{' '}
				{content.trim().split(/\s+/).length} words,{' '}
				{content.split('\n').length} paragraphs
			</p>
		</motion.div>
	);
}
