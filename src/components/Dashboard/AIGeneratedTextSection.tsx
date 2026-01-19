import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ContentAndPreview from '@/components/Dashboard/ContentAndPreview';
import { toast } from 'react-toastify';
import {
	Sparkles,
	Copy,
	Check,
	Save,
	FileText,
	Wand2,
	Zap,
	Bot,
	FileCode,
	ArrowRight,
} from 'lucide-react';

const AIGeneratedTextSection = () => {
	const [content, setContent] = useState('');
	const [previewMode, setPreviewMode] = useState<'edit' | 'split'>('edit');
	const [isCopied, setIsCopied] = useState(false);
	const [isPublishing, setIsPublishing] = useState(false);
	const [isSavingDraft, setIsSavingDraft] = useState(false);

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
			toast.error('Metadata block (/////) missing or malformed.');
			return;
		}

		setIsPublishing(true);
		try {
			const response = await fetch('/api/savePost', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					content: extracted.content,
					status: 'published',
					...extracted.metadata,
					isAI: true,
				}),
			});
			const data = await response.json();
			toast.success(data.message || 'Text saved successfully!');
		} finally {
			setIsPublishing(false);
		}
	};

	const handleSaveAsDraft = async () => {
		setIsSavingDraft(true);
		try {
			const response = await fetch('/api/savePost', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					content,
					status: 'draft',
				}),
			});
			const data = await response.json();
			toast.success(data.message || 'Text saved as draft successfully!');
		} finally {
			setIsSavingDraft(false);
		}
	};

	const handleCopy = () => {
		navigator.clipboard.writeText(content);
		setIsCopied(true);
		setTimeout(() => setIsCopied(false), 2000);
	};

	// Quick action cards for AI tools
	const quickTools = [
		{
			icon: Bot,
			title: 'Blog Generator',
			description: 'Generate full blog posts from topics',
			color: 'from-purple-500 to-pink-500',
			bgColor: 'from-purple-500/10 to-pink-500/5',
		},
		{
			icon: Wand2,
			title: 'Content Enhancer',
			description: 'Improve and polish your writing',
			color: 'from-blue-500 to-cyan-500',
			bgColor: 'from-blue-500/10 to-cyan-500/5',
		},
		{
			icon: FileCode,
			title: 'SEO Optimizer',
			description: 'Optimize content for search engines',
			color: 'from-green-500 to-emerald-500',
			bgColor: 'from-green-500/10 to-emerald-500/5',
		},
	];

	return (
		<motion.section
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
			className="space-y-8"
		>
			{/* Hero Header with Gradient */}
			<div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-600/20 via-pink-500/10 to-blue-600/20 border border-white/10 backdrop-blur-sm p-8">
				{/* Animated Background Elements */}
				<div className="absolute inset-0 overflow-hidden pointer-events-none">
					<motion.div
						className="absolute -top-20 -right-20 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl"
						animate={{
							scale: [1, 1.2, 1],
							opacity: [0.3, 0.5, 0.3],
						}}
						transition={{
							duration: 4,
							repeat: Infinity,
							ease: 'easeInOut',
						}}
					/>
					<motion.div
						className="absolute -bottom-20 -left-20 w-64 h-64 bg-pink-500/20 rounded-full blur-3xl"
						animate={{
							scale: [1.2, 1, 1.2],
							opacity: [0.3, 0.5, 0.3],
						}}
						transition={{
							duration: 4,
							repeat: Infinity,
							ease: 'easeInOut',
							delay: 2,
						}}
					/>
				</div>

				<div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
					<div className="space-y-4">
						<motion.div
							className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20"
							initial={{ opacity: 0, x: -20 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ delay: 0.2 }}
						>
							<motion.div
								animate={{ rotate: 360 }}
								transition={{
									duration: 8,
									repeat: Infinity,
									ease: 'linear',
								}}
							>
								<Sparkles className="w-4 h-4 text-purple-400" />
							</motion.div>
							<span className="text-sm font-medium text-purple-300">
								AI-Powered Content Studio
							</span>
						</motion.div>

						<h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
							AI Content Generator
						</h1>
						<p className="text-muted-foreground max-w-xl text-lg">
							Create, edit, and publish AI-generated content with
							our powerful markdown editor. Perfect for blog
							posts, articles, and documentation.
						</p>
					</div>

					<motion.button
						onClick={handleCopy}
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
						className="self-start lg:self-auto flex items-center gap-3 px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-white font-medium transition-all duration-300 shadow-lg shadow-purple-500/10"
					>
						<AnimatePresence mode="wait">
							{isCopied ? (
								<motion.div
									key="copied"
									initial={{ scale: 0 }}
									animate={{ scale: 1 }}
									exit={{ scale: 0 }}
									className="flex items-center gap-2"
								>
									<Check className="w-5 h-5 text-green-400" />
									<span>Copied!</span>
								</motion.div>
							) : (
								<motion.div
									key="copy"
									initial={{ scale: 0 }}
									animate={{ scale: 1 }}
									exit={{ scale: 0 }}
									className="flex items-center gap-2"
								>
									<Copy className="w-5 h-5" />
									<span>Copy Content</span>
								</motion.div>
							)}
						</AnimatePresence>
					</motion.button>
				</div>
			</div>

			{/* Quick Tools Grid */}
			<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
				{quickTools.map((tool, index) => (
					<motion.div
						key={tool.title}
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.1 * index }}
						whileHover={{ y: -4, scale: 1.02 }}
						className={`relative group p-6 rounded-2xl bg-gradient-to-br ${tool.bgColor} border border-white/10 backdrop-blur-sm cursor-pointer overflow-hidden`}
					>
						{/* Glow effect on hover */}
						<div
							className={`absolute inset-0 bg-gradient-to-r ${tool.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
						/>

						<div className="relative z-10">
							<div
								className={`w-12 h-12 rounded-xl bg-gradient-to-br ${tool.color} flex items-center justify-center mb-4 shadow-lg`}
							>
								<tool.icon className="w-6 h-6 text-white" />
							</div>
							<h3 className="font-bold text-lg mb-2">
								{tool.title}
							</h3>
							<p className="text-sm text-muted-foreground mb-4">
								{tool.description}
							</p>
							<div className="flex items-center gap-2 text-sm font-medium text-primary group-hover:translate-x-1 transition-transform">
								<span>Coming Soon</span>
								<ArrowRight className="w-4 h-4" />
							</div>
						</div>
					</motion.div>
				))}
			</div>

			{/* Main Editor Card */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.3 }}
				className="relative bg-card/80 backdrop-blur-sm border border-border rounded-3xl p-8 shadow-xl shadow-black/5 overflow-hidden"
			>
				{/* Subtle gradient accent */}
				<div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500" />

				<div className="space-y-6">
					{/* Editor Header */}
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-3">
							<div className="p-2.5 bg-gradient-to-br from-purple-500/20 to-pink-500/10 rounded-xl">
								<FileText className="w-5 h-5 text-purple-500" />
							</div>
							<div>
								<h2 className="font-bold text-lg">
									Content Editor
								</h2>
								<p className="text-xs text-muted-foreground">
									Write or paste AI-generated content below
								</p>
							</div>
						</div>
						<div className="flex items-center gap-2 text-xs text-muted-foreground bg-secondary/50 px-3 py-1.5 rounded-full">
							<Zap className="w-3.5 h-3.5 text-yellow-500" />
							<span>
								{content.length > 0
									? `${content.length} chars`
									: 'Ready'}
							</span>
						</div>
					</div>

					{/* Content Editor */}
					<ContentAndPreview
						previewMode={previewMode}
						setPreviewMode={setPreviewMode}
						content={content}
						setContent={setContent}
					/>

					{/* Actions Bar */}
					<div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-border">
						<div className="flex items-center gap-3 flex-1">
							<motion.button
								whileHover={{ scale: 1.02 }}
								whileTap={{ scale: 0.98 }}
								onClick={handleSaveAsDraft}
								disabled={isSavingDraft}
								className="flex items-center gap-2 px-6 py-3 bg-secondary hover:bg-secondary/80 text-foreground font-medium rounded-xl transition-all duration-300 disabled:opacity-50"
							>
								{isSavingDraft ? (
									<motion.div
										animate={{ rotate: 360 }}
										transition={{
											duration: 1,
											repeat: Infinity,
											ease: 'linear',
										}}
									>
										<FileText className="w-4 h-4" />
									</motion.div>
								) : (
									<FileText className="w-4 h-4" />
								)}
								Save as Draft
							</motion.button>

							<motion.button
								whileHover={{ scale: 1.02 }}
								whileTap={{ scale: 0.98 }}
								onClick={handleSave}
								disabled={isPublishing}
								className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium rounded-xl shadow-lg shadow-purple-500/25 transition-all duration-300 disabled:opacity-50"
							>
								{isPublishing ? (
									<motion.div
										animate={{ rotate: 360 }}
										transition={{
											duration: 1,
											repeat: Infinity,
											ease: 'linear',
										}}
									>
										<Save className="w-4 h-4" />
									</motion.div>
								) : (
									<Save className="w-4 h-4" />
								)}
								Publish Now
							</motion.button>
						</div>

						{/* Help Text */}
						<div className="flex items-center gap-2 text-xs text-muted-foreground">
							<span className="px-2 py-1 bg-secondary/50 rounded font-mono">
								title: ; description: ; tags: ; slug:
							</span>
							<span>First line format</span>
						</div>
					</div>
				</div>
			</motion.div>
		</motion.section>
	);
};

export default AIGeneratedTextSection;
