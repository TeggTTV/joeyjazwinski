import React from 'react';
import { motion } from 'framer-motion';
import { 
	Terminal, 
	Sparkles, 
	Image as ImageIcon, 
	Video, 
	GitCompare, 
	Code, 
	ArrowUpRight,
	Wrench
} from 'lucide-react';
import Link from 'next/link';

const MOTION_EASE = [0.32, 0.72, 0, 1] as const;

const featuredTools = [
	{
		title: 'RegEx Tester',
		description: 'Interactive regex pattern debugging with instant color match groups and capture inspect.',
		link: '/developer-tools/regex-tester',
		icon: Terminal,
		tag: 'Parser',
		accent: 'from-amber-500/20 via-amber-500/5 to-transparent',
		iconBg: 'bg-amber-500/10 border-amber-500/20 text-amber-400',
	},
	{
		title: 'Keyword Density',
		description: 'Copy length audit, lexical word frequency distribution, and estimated reading telemetry.',
		link: '/developer-tools/keyword-density',
		icon: Sparkles,
		tag: 'Analytics',
		accent: 'from-indigo-500/20 via-indigo-500/5 to-transparent',
		iconBg: 'bg-indigo-500/10 border-indigo-500/20 text-indigo-400',
	},
	{
		title: 'Image Compressor',
		description: 'Fast client-side WebP, PNG, and JPEG downscaling and quantization with dynamic sliders.',
		link: '/developer-tools/image-compressor',
		icon: ImageIcon,
		tag: 'Media',
		accent: 'from-emerald-500/20 via-emerald-500/5 to-transparent',
		iconBg: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400',
	},
	{
		title: 'GIF Transcoder',
		description: 'Convert local video files into optimized frame-rate animated GIFs fully in browser memory.',
		link: '/developer-tools/gif-generator',
		icon: Video,
		tag: 'Media',
		accent: 'from-blue-500/20 via-blue-500/5 to-transparent',
		iconBg: 'bg-blue-500/10 border-blue-500/20 text-blue-400',
	},
	{
		title: 'Diff Checker',
		description: 'Side-by-side string and payload structural comparison powered by longest common subsequence.',
		link: '/developer-tools/diff-checker',
		icon: GitCompare,
		tag: 'Diffing',
		accent: 'from-rose-500/20 via-rose-500/5 to-transparent',
		iconBg: 'bg-rose-500/10 border-rose-500/20 text-rose-400',
	},
	{
		title: 'Code Sandbox',
		description: 'Ephemeral HTML, Tailwind, and JS sandbox with instant isolated iframe rendering.',
		link: '/developer-tools/code-sandbox',
		icon: Code,
		tag: 'Runtime',
		accent: 'from-purple-500/20 via-purple-500/5 to-transparent',
		iconBg: 'bg-purple-500/10 border-purple-500/20 text-purple-400',
	},
];

const FeaturedToolsSection: React.FC = () => {
	return (
		<section className="py-28 px-4 sm:px-6 md:px-8 bg-background relative overflow-hidden">
			{/* Decorative background glows */}
			<div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />
			<div className="absolute bottom-10 right-10 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

			<div className="max-w-6xl mx-auto relative z-10">
				{/* Section Header */}
				<div className="text-center max-w-2xl mx-auto mb-16">
					<motion.div
						initial={{ opacity: 0, y: 15 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6, ease: MOTION_EASE }}
						className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/10 text-emerald-400 text-[10px] font-semibold tracking-[0.2em] uppercase mb-4"
					>
						<Wrench className="w-3 h-3 text-emerald-400" />
						Engineer Suite
					</motion.div>

					<motion.h2
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ delay: 0.1, duration: 0.6, ease: MOTION_EASE }}
						className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4"
					>
						High-speed utilities,{' '}
						<span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
							zero backend latency.
						</span>
					</motion.h2>

					<motion.p
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ delay: 0.2, duration: 0.6, ease: MOTION_EASE }}
						className="text-sm sm:text-base text-muted-foreground leading-relaxed font-normal"
					>
						A curated suite of client-side developer tools designed to speed up daily engineering workflows with maximum privacy.
					</motion.p>
				</div>

				{/* 6-Card Double-Bezel Bento Grid */}
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
					{featuredTools.map((tool, i) => (
						<motion.div
							key={tool.title}
							initial={{ opacity: 0, y: 24 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ delay: i * 0.08, duration: 0.6, ease: MOTION_EASE }}
							className="p-1.5 rounded-[2rem] bg-white/[0.03] dark:bg-white/[0.02] border border-white/10 hover:border-white/20 transition-all duration-500"
						>
							<Link
								href={tool.link}
								className="group relative h-full p-6 rounded-[calc(2rem-0.375rem)] bg-card/90 backdrop-blur-xl border border-white/5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)] flex flex-col justify-between overflow-hidden block"
							>
								{/* Ambient hover halo */}
								<div
									className={`absolute inset-0 bg-gradient-to-br ${tool.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`}
								/>

								<div className="relative z-10">
									<div className="flex items-center justify-between mb-5">
										<div
											className={`w-11 h-11 rounded-2xl flex items-center justify-center border ${tool.iconBg} transition-transform duration-500 group-hover:scale-105`}
										>
											<tool.icon className="w-5 h-5" />
										</div>
										<span className="text-[10px] font-mono uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-muted-foreground">
											{tool.tag}
										</span>
									</div>

									<h3 className="text-base font-bold tracking-tight text-foreground mb-2 group-hover:text-emerald-400 transition-colors flex items-center justify-between">
										<span>{tool.title}</span>
										<ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300 text-emerald-400" />
									</h3>

									<p className="text-xs text-muted-foreground leading-relaxed font-normal">
										{tool.description}
									</p>
								</div>

								<div className="relative z-10 pt-4 mt-5 border-t border-border/40 flex items-center justify-between text-[11px] font-medium text-muted-foreground group-hover:text-foreground transition-colors">
									<span>Launch Utility</span>
									<span className="text-emerald-400">&rarr;</span>
								</div>
							</Link>
						</motion.div>
					))}
				</div>

				{/* Footer CTA Strip */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ delay: 0.4, duration: 0.6, ease: MOTION_EASE }}
					className="mt-12 text-center"
				>
					<Link
						href="/developer-tools"
						className="group inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 text-xs font-semibold text-foreground transition-all duration-300"
					>
						<span>Browse Full 10+ Tool Suite</span>
						<ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
					</Link>
				</motion.div>
			</div>
		</section>
	);
};

export default FeaturedToolsSection;
