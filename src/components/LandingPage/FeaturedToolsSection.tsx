import React, { useState } from 'react';
import Link from 'next/link';
import {
	Image as ImageIcon,
	GitCompare,
	Search,
	Code,
	ArrowUpRight,
	Wrench,
	CheckCircle2,
	Lock,
} from 'lucide-react';

interface ToolModule {
	id: string;
	title: string;
	category: string;
	badge: string;
	link: string;
	icon: React.ComponentType<{ className?: string }>;
	description: string;
}

const TOOL_MODULES: ToolModule[] = [
	{
		id: 'compressor',
		title: 'Image Compressor',
		category: 'Photos & Graphics',
		badge: 'Save Space',
		link: '/developer-tools/image-compressor',
		icon: ImageIcon,
		description:
			'Make large photos and pictures smaller so they are fast to email or upload, without losing visible quality.',
	},
	{
		id: 'diff',
		title: 'Text Diff Checker',
		category: 'Writing & Editing',
		badge: 'Compare Drafts',
		link: '/developer-tools/diff-checker',
		icon: GitCompare,
		description:
			'Compare two versions of an essay, document, or email to see exactly what was added, removed, or changed.',
	},
	{
		id: 'regex',
		title: 'Text Pattern Finder',
		category: 'Search & Match',
		badge: 'Find Patterns',
		link: '/developer-tools/regex-tester',
		icon: Search,
		description:
			'Quickly find and match specific text patterns, like email addresses, phone numbers, or dates, in long documents.',
	},
	{
		id: 'sandbox',
		title: 'Web Playground',
		category: 'Creative Coding',
		badge: 'Live Preview',
		link: '/developer-tools/code-sandbox',
		icon: Code,
		description:
			'A friendly scratchpad to try out web design ideas, HTML, and styling with an instant live preview.',
	},
];

const FeaturedToolsSection: React.FC = () => {
	const [activeToolIndex, setActiveToolIndex] = useState(0);
	const activeTool = TOOL_MODULES[activeToolIndex];

	return (
		<section className="w-full py-16 sm:py-24 border-b border-border bg-background">
			<div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
				{/* Section Header */}
				<div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
					<div className="max-w-xl">
						<div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-primary/10 border border-primary/20 text-primary text-xs font-mono font-medium mb-4">
							<Wrench className="w-3.5 h-3.5" />
							<span>POPULAR TOOLS</span>
						</div>

						<h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground font-display mb-3">
							Simple, Free Tools You Can Use Today
						</h2>

						<p className="text-base text-muted-foreground leading-relaxed font-sans">
							Private tools that run entirely on your own computer or phone. Your pictures and documents never get uploaded to any remote server.
						</p>
					</div>

					<Link
						href="/developer-tools"
						className="inline-flex items-center gap-2 text-xs font-semibold text-primary hover:text-primary/80 transition-colors group self-start md:self-auto"
					>
						<span>See all 35+ free tools</span>
						<ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
					</Link>
				</div>

				{/* Interactive Workbench Container */}
				<div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
					{/* Left: Tool Navigation List */}
					<div className="lg:col-span-5 space-y-3">
						{TOOL_MODULES.map((module, idx) => {
							const isActive = activeToolIndex === idx;
							const Icon = module.icon;
							return (
								<button
									key={module.id}
									onClick={() => setActiveToolIndex(idx)}
									type="button"
									className={`w-full text-left p-4 rounded-xl border transition-all flex items-start gap-4 ${
										isActive
											? 'border-primary bg-primary/5 text-foreground shadow-xs'
											: 'border-border bg-card hover:bg-muted/40 text-muted-foreground hover:text-foreground'
									}`}
								>
									<div
										className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 border ${
											isActive
												? 'bg-primary text-primary-foreground border-primary'
												: 'bg-muted border-border text-muted-foreground'
										}`}
									>
										<Icon className="w-5 h-5" />
									</div>

									<div className="min-w-0 flex-1">
										<div className="flex items-center justify-between mb-1">
											<span className="text-xs font-mono uppercase tracking-wider text-muted-foreground font-semibold">
												{module.category}
											</span>
											<span className="text-[10px] font-mono px-2 py-0.5 rounded bg-muted border border-border text-foreground font-medium">
												{module.badge}
											</span>
										</div>

										<h3 className="text-base font-bold text-foreground font-display mb-1">
											{module.title}
										</h3>

										<p className="text-xs text-muted-foreground leading-relaxed line-clamp-2 font-sans">
											{module.description}
										</p>
									</div>
								</button>
							);
						})}
					</div>

					{/* Right: Live Interactive Preview */}
					<div className="lg:col-span-7">
						<div className="rounded-xl border border-border bg-card p-6 sm:p-8 shadow-xs flex flex-col justify-between min-h-105">
							<div>
								{/* Header */}
								<div className="flex items-center justify-between pb-4 border-b border-border mb-6">
									<div className="flex items-center gap-2 font-sans text-xs text-muted-foreground">
										<span className="font-semibold text-foreground">
											Live Preview:
										</span>
										<span>{activeTool.title}</span>
									</div>

									<span className="text-xs font-sans text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1.5">
										<Lock className="w-3.5 h-3.5" />
										<span>Private on your device</span>
									</span>
								</div>

								{/* Tool Content Preview based on index */}
								{activeToolIndex === 0 && (
									<div className="space-y-4 font-sans text-xs">
										<div className="grid grid-cols-2 gap-4 p-4 rounded-lg bg-muted/40 border border-border">
											<div>
												<span className="text-[11px] text-muted-foreground block mb-1 uppercase font-semibold">
													Original Photo
												</span>
												<span className="text-2xl font-bold text-foreground">
													3.4 MB
												</span>
												<span className="text-[11px] text-muted-foreground block mt-1">
													High resolution camera image
												</span>
											</div>

											<div className="border-l border-border pl-4">
												<span className="text-[11px] text-emerald-600 dark:text-emerald-400 block mb-1 uppercase font-semibold">
													Smaller Size
												</span>
												<span className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
													270 KB
												</span>
												<span className="text-[11px] text-muted-foreground block mt-1">
													92% smaller, looks identical
												</span>
											</div>
										</div>

										<div className="p-3.5 rounded-lg border border-border bg-card text-xs text-muted-foreground space-y-1.5 font-sans">
											<p className="flex items-center gap-2">
												<CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" />
												<span>Compresses photos right in your browser</span>
											</p>
											<p className="flex items-center gap-2">
												<CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" />
												<span>Your photos are never sent across the internet</span>
											</p>
										</div>
									</div>
								)}

								{activeToolIndex === 1 && (
									<div className="space-y-3 font-sans text-xs">
										<div className="rounded-lg border border-border bg-muted/30 p-4 space-y-2">
											<div className="text-xs text-muted-foreground pb-2 border-b border-border">
												Comparing two drafts of the same text:
											</div>
											<div className="text-rose-700 dark:text-rose-300 bg-rose-500/10 p-2 rounded line-through">
												Our art class meets on Friday afternoons at 4pm.
											</div>
											<div className="text-emerald-700 dark:text-emerald-300 bg-emerald-500/10 p-2 rounded">
												Our art workshop meets on Saturday mornings at 10am.
											</div>
										</div>
										<p className="text-xs text-muted-foreground">
											Great for teachers grading drafts, writers checking edits, or anyone comparing two versions of a document.
										</p>
									</div>
								)}

								{activeToolIndex === 2 && (
									<div className="space-y-4 font-sans text-xs">
										<div className="p-3.5 rounded-lg bg-muted/40 border border-border">
											<span className="text-muted-foreground block text-[11px] mb-1 font-semibold">
												Searching for email addresses:
											</span>
											<span className="text-primary font-mono font-bold break-all">
												[letters and numbers] @ [website] . [com/org/edu]
											</span>
										</div>

										<div className="p-3.5 rounded-lg bg-card border border-border space-y-2">
											<span className="text-muted-foreground block text-[11px] font-semibold">
												Found in your text:
											</span>
											<div className="p-2.5 rounded bg-muted/30 border border-border/70">
												<span>Questions? Write to us at </span>
												<span className="bg-primary/20 text-primary font-semibold px-1.5 py-0.5 rounded">
													hello@example.com
												</span>
												<span> anytime.</span>
											</div>
										</div>
									</div>
								)}

								{activeToolIndex === 3 && (
									<div className="space-y-3 font-sans text-xs">
										<div className="rounded-lg border border-border bg-muted/30 p-4 space-y-2">
											<span className="text-muted-foreground block text-[11px] font-semibold">
												Interactive Design Sandbox
											</span>
											<div className="p-4 rounded-lg bg-card border border-border flex items-center justify-between">
												<div>
													<span className="font-bold text-foreground block text-sm">
														Sample Button Preview
													</span>
													<span className="text-xs text-muted-foreground">
														Colors, layout, and font update instantly
													</span>
												</div>
												<span className="px-3 py-1.5 rounded-lg bg-primary text-primary-foreground font-semibold text-xs">
													Click Me
												</span>
											</div>
										</div>
										<p className="text-xs text-muted-foreground">
											A safe playground where anyone can experiment with visual design and web formatting.
										</p>
									</div>
								)}
							</div>

							{/* Launch Button */}
							<div className="pt-6 border-t border-border mt-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
								<span className="text-xs text-muted-foreground font-sans">
									Free tool &bull; No sign-up needed
								</span>

								<Link
									href={activeTool.link}
									className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-primary text-primary-foreground font-medium text-xs transition-colors hover:bg-primary/90"
								>
									<span>Open {activeTool.title}</span>
									<ArrowUpRight className="w-3.5 h-3.5" />
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default FeaturedToolsSection;
