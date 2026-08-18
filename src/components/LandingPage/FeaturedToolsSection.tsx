import React from 'react';
import { motion } from 'framer-motion';
import { 
	Terminal, 
	Sparkles, 
	Image as ImageIcon, 
	Video, 
	GitCompare, 
	Code, 
	ArrowRight 
} from 'lucide-react';
import Link from 'next/link';

const featuredTools = [
	{
		title: 'RegEx Tester',
		description: 'Test and debug regular expressions with interactive color match highlights and groups capture.',
		link: '/developer-tools/regex-tester',
		icon: Terminal,
		color: 'from-amber-500 to-yellow-400',
		shadowColor: 'shadow-amber-500/20',
		iconBg: 'bg-amber-500/10',
		iconColor: 'text-amber-500',
	},
	{
		title: 'Keyword Density',
		description: 'Audit copy length, words count, estimated reading duration, and keyword repetitions details.',
		link: '/developer-tools/keyword-density',
		icon: Sparkles,
		color: 'from-indigo-500 to-purple-400',
		shadowColor: 'shadow-indigo-500/20',
		iconBg: 'bg-indigo-500/10',
		iconColor: 'text-indigo-500',
	},
	{
		title: 'Image Compressor',
		description: 'Resize and compress PNG, JPEG, and WebP media client-side with quality sliders configuration.',
		link: '/developer-tools/image-compressor',
		icon: ImageIcon,
		color: 'from-emerald-500 to-teal-400',
		shadowColor: 'shadow-emerald-500/20',
		iconBg: 'bg-emerald-500/10',
		iconColor: 'text-emerald-500',
	},
	{
		title: 'GIF Generator',
		description: 'Transcode local video files into high-framerate animated GIFs completely client-side in browser.',
		link: '/developer-tools/gif-generator',
		icon: Video,
		color: 'from-blue-500 to-cyan-400',
		shadowColor: 'shadow-blue-500/20',
		iconBg: 'bg-blue-500/10',
		iconColor: 'text-blue-500',
	},
	{
		title: 'Diff Checker',
		description: 'Review differences between text payloads side-by-side using LCS string matching engine.',
		link: '/developer-tools/diff-checker',
		icon: GitCompare,
		color: 'from-rose-500 to-pink-400',
		shadowColor: 'shadow-rose-500/20',
		iconBg: 'bg-rose-500/10',
		iconColor: 'text-rose-500',
	},
	{
		title: 'Code Sandbox',
		description: 'Write raw HTML templates and custom CSS styles to inspect live iframe renderings instantly.',
		link: '/developer-tools/code-sandbox',
		icon: Code,
		color: 'from-violet-500 to-purple-500',
		shadowColor: 'shadow-violet-500/20',
		iconBg: 'bg-violet-500/10',
		iconColor: 'text-violet-500',
	},
];

const FeaturedToolsSection: React.FC = () => {
	return (
		<section className="py-24 px-4 sm:px-6 md:px-8 bg-background relative overflow-hidden border-t border-border/40">
			{/* Decorative glows */}
			<div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
			<div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

			<div className="max-w-7xl mx-auto relative z-10">
				{/* Section Header */}
				<div className="text-center max-w-3xl mx-auto mb-16">
					<motion.span
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						className="inline-block px-4 py-1.5 rounded-full bg-linear-to-r from-primary/10 to-emerald-500/10 text-primary text-sm font-medium mb-4 border border-primary/20"
					>
						🛠️ Toolbox Spotlight
					</motion.span>
					<motion.h2
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ delay: 0.1 }}
						className="text-3xl md:text-5xl font-bold mb-6"
					>
						Featured <span className="gradient-text">Developer Utilities</span>
					</motion.h2>
					<motion.p
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ delay: 0.2 }}
						className="text-lg text-muted-foreground leading-relaxed"
					>
						A handful of our most popular browser tools to accelerate your design and development workflow. 100% free and fully client-side.
					</motion.p>
				</div>

				{/* Tools Grid */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{featuredTools.map((tool, idx) => {
						const IconComponent = tool.icon;
						return (
							<motion.div
								key={tool.title}
								initial={{ opacity: 0, y: 30 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ delay: idx * 0.05 }}
							>
								<Link
									href={tool.link}
									className="group flex flex-col justify-between p-6 bg-card/40 backdrop-blur-xl border border-border/80 rounded-2xl hover:border-primary/50 transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-1 h-full relative overflow-hidden"
								>
									<div className="absolute inset-0 bg-linear-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-350 pointer-events-none" />

									<div className="space-y-4 relative z-10">
										<div className="flex justify-between items-start">
											<div className={`p-3 rounded-xl ${tool.iconBg} ${tool.iconColor}`}>
												<IconComponent className="w-6 h-6" />
											</div>
											<span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
												Client-Side
											</span>
										</div>

										<div className="space-y-2">
											<h3 className="text-xl font-bold group-hover:text-primary transition-colors">
												{tool.title}
											</h3>
											<p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
												{tool.description}
											</p>
										</div>
									</div>

									<div className="flex items-center gap-1.5 text-xs font-semibold text-primary mt-6 group-hover:translate-x-1.5 transition-transform relative z-10">
										Launch Utility <ArrowRight className="w-4 h-4" />
									</div>
								</Link>
							</motion.div>
						);
					})}
				</div>

				{/* Directory CTA */}
				<div className="text-center mt-12">
					<Link
						href="/developer-tools"
						className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/95 transition shadow-lg hover:shadow-xl shadow-primary/20"
					>
						Browse All Tools <ArrowRight className="w-4 h-4" />
					</Link>
				</div>
			</div>
		</section>
	);
};

export default FeaturedToolsSection;
