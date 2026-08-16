import { motion } from 'framer-motion';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { useEffect, useState, useRef } from 'react';
import { serialize } from 'next-mdx-remote/serialize';
import remarkGfm from 'remark-gfm';
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
			const serialized = await serialize(content || '', {
				mdxOptions: {
					remarkPlugins: [remarkGfm],
				},
			});
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
					end + prefix.length,
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
			className="space-y-3"
		>
			<div className="flex justify-between items-center mb-1">
				<label className="block text-sm font-semibold text-foreground/80">
					Content
				</label>
				<button
					onClick={() =>
						setPreviewMode(
							previewMode === 'edit' ? 'split' : 'edit',
						)
					}
					className="text-xs font-medium px-3 py-1.5 rounded-lg bg-secondary/50 hover:bg-secondary text-primary transition-colors flex items-center gap-1.5"
				>
					{previewMode === 'edit' ? (
						<>
							<span className="w-2 h-2 rounded-full bg-muted-foreground"></span>
							Editor Mode
						</>
					) : (
						<>
							<span className="w-2 h-2 rounded-full bg-green-500"></span>
							Split View
						</>
					)}
				</button>
			</div>

			<div className="group relative border border-border rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary transition-all bg-card shadow-sm">
				{/* Markdown Toolbar */}
				<div className="flex gap-1 p-2 bg-muted/30 border-b border-border overflow-x-auto items-center">
					<ToolbarButton
						icon={<Bold size={15} />}
						onClick={() => insertMarkdown('**', '**')}
						label="Bold"
					/>
					<ToolbarButton
						icon={<Italic size={15} />}
						onClick={() => insertMarkdown('*', '*')}
						label="Italic"
					/>
					<div className="w-px h-4 bg-border mx-1" />
					<ToolbarButton
						icon={<Heading1 size={15} />}
						onClick={() => insertMarkdown('# ')}
						label="H1"
					/>
					<ToolbarButton
						icon={<Heading2 size={15} />}
						onClick={() => insertMarkdown('## ')}
						label="H2"
					/>
					<div className="w-px h-4 bg-border mx-1" />
					<ToolbarButton
						icon={<Code size={15} />}
						onClick={() => insertMarkdown('```\n', '\n```')}
						label="Code Block"
					/>
					<ToolbarButton
						icon={<Quote size={15} />}
						onClick={() => insertMarkdown('> ')}
						label="Quote"
					/>
					<ToolbarButton
						icon={<List size={15} />}
						onClick={() => insertMarkdown('- ')}
						label="List"
					/>
					<div className="w-px h-4 bg-border mx-1" />
					<ToolbarButton
						icon={<Link size={15} />}
						onClick={() => insertMarkdown('[', '](url)')}
						label="Link"
					/>
				</div>

				<motion.div
					className="grid"
					animate={{
						gridTemplateColumns:
							previewMode === 'split' ? '1fr 1fr' : '1fr',
					}}
					transition={{ duration: 0.4, ease: 'easeInOut' }}
				>
					<div className="relative">
						<textarea
							ref={textareaRef}
							aria-label="Post Content"
							placeholder="Write your amazing content here..."
							rows={18}
							className="w-full p-4 font-mono text-sm bg-transparent outline-none resize-none"
							value={content}
							onChange={(e) => setContent(e.target.value)}
						/>
					</div>

					{previewMode === 'split' && (
						<motion.div
							className="p-4 bg-background/50 border-l border-border prose dark:prose-invert max-w-none overflow-y-auto max-h-[500px] text-sm"
							initial={{ opacity: 0, width: 0 }}
							animate={{ opacity: 1, width: 'auto' }}
							exit={{ opacity: 0, width: 0 }}
							transition={{ duration: 0.4 }}
						>
							<div className="sticky top-0 bg-background/95 backdrop-blur py-2 border-b border-border/50 mb-4 z-10 text-xs font-bold text-muted-foreground uppercase tracking-wider">
								Preview
							</div>
							{mdxContent ? (
								<MDXRemote {...(mdxContent as any)} />
							) : (
								<p className="text-muted-foreground italic text-center py-10 opacity-50">
									Start writing to see preview...
								</p>
							)}
						</motion.div>
					)}
				</motion.div>
			</div>

			<div className="flex justify-between text-xs text-muted-foreground px-1">
				<p>Supports Markdown & GFM</p>
				<p>
					{content.length} chars •{' '}
					{
						content
							.trim()
							.split(/\s+/)
							.filter((w) => w.length > 0).length
					}{' '}
					words
				</p>
			</div>
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
