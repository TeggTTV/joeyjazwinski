import { motion } from 'framer-motion';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { useEffect, useState, useRef } from 'react';
import { serialize } from 'next-mdx-remote/serialize';
import {
	Bold,
	Italic,
	Link,
	Code,
	List,
	Heading1,
	Heading2,
	Quote,
} from 'lucide-react';

interface ContentAndPreviewProps {
	previewMode: 'edit' | 'split';
	setPreviewMode: React.Dispatch<React.SetStateAction<'edit' | 'split'>>;
	content: string;
	setContent: React.Dispatch<React.SetStateAction<string>>;
}

const ContentAndPreview: React.FC<ContentAndPreviewProps> = ({
	previewMode,
	setPreviewMode,
	content,
	setContent,
}) => {
	const [mdxContent, setMdxContent] =
		useState<MDXRemoteSerializeResult | null>(null);
	const textareaRef = useRef<HTMLTextAreaElement>(null);

	useEffect(() => {
		const updateMdx = async () => {
			const serialized = await serialize(content || '');
			setMdxContent(serialized);
		};

		// Debounce serialization
		const timeoutId = setTimeout(() => {
			updateMdx();
		}, 500);

		return () => clearTimeout(timeoutId);
	}, [content]);

	// Helper to insert markdown syntax
	const insertMarkdown = (prefix: string, suffix: string = '') => {
		if (!textareaRef.current) return;

		const start = textareaRef.current.selectionStart;
		const end = textareaRef.current.selectionEnd;
		const text = textareaRef.current.value;

		const before = text.substring(0, start);
		const selection = text.substring(start, end);
		const after = text.substring(end);

		const newText = `${before}${prefix}${selection}${suffix}${after}`;

		setContent(newText);

		// Restore focus and selection
		setTimeout(() => {
			if (textareaRef.current) {
				textareaRef.current.focus();
				textareaRef.current.setSelectionRange(
					start + prefix.length,
					end + prefix.length
				);
			}
		}, 0);
	};

	return (
		<motion.div
			variants={{
				hidden: { opacity: 0, y: 20 },
				visible: { opacity: 1, y: 0 },
			}}
		>
			<div className="flex justify-between items-center mb-2">
				<label className="block font-medium">Content</label>
				<button
					onClick={() =>
						setPreviewMode(
							previewMode === 'edit' ? 'split' : 'edit'
						)
					}
					className="text-sm underline text-primary hover:text-primary/80"
				>
					Toggle {previewMode === 'edit' ? 'Preview' : 'Editor'}
				</button>
			</div>

			{/* Markdown Toolbar */}
			<div className="flex gap-1 mb-2 p-1.5 bg-secondary/30 rounded-lg border border-border/50 overflow-x-auto">
				<ToolbarButton
					icon={<Bold size={16} />}
					onClick={() => insertMarkdown('**', '**')}
					label="Bold"
				/>
				<ToolbarButton
					icon={<Italic size={16} />}
					onClick={() => insertMarkdown('*', '*')}
					label="Italic"
				/>
				<div className="w-px h-5 bg-border mx-1 self-center" />
				<ToolbarButton
					icon={<Heading1 size={16} />}
					onClick={() => insertMarkdown('# ')}
					label="H1"
				/>
				<ToolbarButton
					icon={<Heading2 size={16} />}
					onClick={() => insertMarkdown('## ')}
					label="H2"
				/>
				<div className="w-px h-5 bg-border mx-1 self-center" />
				<ToolbarButton
					icon={<Code size={16} />}
					onClick={() => insertMarkdown('```\n', '\n```')}
					label="Code Block"
				/>
				<ToolbarButton
					icon={<Quote size={16} />}
					onClick={() => insertMarkdown('> ')}
					label="Quote"
				/>
				<ToolbarButton
					icon={<List size={16} />}
					onClick={() => insertMarkdown('- ')}
					label="List"
				/>
				<div className="w-px h-5 bg-border mx-1 self-center" />
				<ToolbarButton
					icon={<Link size={16} />}
					onClick={() => insertMarkdown('[', '](url)')}
					label="Link"
				/>
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
					ref={textareaRef}
					aria-label="Post Content"
					placeholder="Write your content here..."
					rows={16}
					className="w-full p-3 border rounded shadow-sm font-mono bg-card text-foreground focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all"
					value={content}
					onChange={(e) => setContent(e.target.value)}
					animate={{
						width: previewMode === 'split' ? '100%' : '100%',
					}}
					transition={{ duration: 0.5 }}
				/>

				{previewMode === 'split' && (
					<motion.div
						className="p-4 border rounded bg-card prose dark:prose-invert max-w-none overflow-auto max-h-[500px]"
						initial={{ opacity: 0, x: 50 }}
						animate={{ opacity: 1, x: 0 }}
						exit={{ opacity: 0, x: 50 }}
						transition={{ duration: 0.5 }}
					>
						{mdxContent ? (
							<MDXRemote {...mdxContent} />
						) : (
							<p className="text-muted-foreground italic">
								Start writing to see preview...
							</p>
						)}
					</motion.div>
				)}
			</motion.div>

			<p className="text-sm text-muted-foreground mt-2">
				{content.length} characters,{' '}
				{
					content
						.trim()
						.split(/\s+/)
						.filter((w) => w.length > 0).length
				}{' '}
				words,{' '}
				{content.split('\n').filter((p) => p.trim().length > 0).length}{' '}
				paragraphs
			</p>
		</motion.div>
	);
};

interface ToolbarButtonProps {
	icon: React.ReactNode;
	onClick: () => void;
	label: string;
}

const ToolbarButton: React.FC<ToolbarButtonProps> = ({
	icon,
	onClick,
	label,
}) => (
	<button
		onClick={onClick}
		title={label}
		className="p-1.5 rounded-md hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
		type="button"
	>
		{icon}
	</button>
);

export default ContentAndPreview;
