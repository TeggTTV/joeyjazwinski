import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Code2, ArrowUpRight, Wrench, Sparkles } from 'lucide-react';
import Link from 'next/link';

const MOTION_EASE = [0.32, 0.72, 0, 1] as const;

const pillars = [
	{
		icon: Code2,
		title: 'Featured Projects',
		description:
			'Explore production web applications, SaaS tools, and open-source packages crafted with modern stacks.',
		link: '/projects',
		badge: 'Showcase',
		accent: 'from-blue-500/20 via-blue-500/5 to-transparent',
		iconBg: 'bg-blue-500/10 border-blue-500/20 text-blue-400',
		highlight: 'Live Deployments & Repos',
	},
	{
		icon: BookOpen,
		title: 'Engineering Blog',
		description:
			'Deep architectural dissections of React internals, TypeScript mechanics, and full-stack performance.',
		link: '/developer-blog',
		badge: 'Dispatches',
		accent: 'from-purple-500/20 via-purple-500/5 to-transparent',
		iconBg: 'bg-purple-500/10 border-purple-500/20 text-purple-400',
		highlight: 'Fresh Technical Guides',
	},
	{
		icon: Wrench,
		title: 'Developer Utilities',
		description:
			'In-browser developer tools: regular expression testers, media compressors, diff checkers, and sandboxes.',
		link: '/developer-tools',
		badge: 'Toolbox',
		accent: 'from-emerald-500/20 via-emerald-500/5 to-transparent',
		iconBg: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400',
		highlight: 'Zero-Latency Client Tools',
	},
];

const LearningFeaturesSection: React.FC = () => {
	return (
		<section className="py-28 px-4 sm:px-6 md:px-8 bg-background relative overflow-hidden">
			{/* Ambient glows */}
			<div className="absolute top-1/2 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />
			<div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

			<div className="max-w-6xl mx-auto relative z-10">
				{/* Section Header */}
				<div className="text-center max-w-2xl mx-auto mb-16">
					<motion.div
						initial={{ opacity: 0, y: 15 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6, ease: MOTION_EASE }}
						className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/4 border border-white/10 text-primary text-[10px] font-semibold tracking-[0.2em] uppercase mb-4"
					>
						<Sparkles className="w-3 h-3 text-primary" />
						Platform Ecosystem
					</motion.div>

					<motion.h2
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{
							delay: 0.1,
							duration: 0.6,
							ease: MOTION_EASE,
						}}
						className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4"
					>
						Projects, insights, and{' '}
						<span className="bg-linear-to-r from-primary via-purple-400 to-indigo-400 bg-clip-text text-transparent">
							developer tools.
						</span>
					</motion.h2>

					<motion.p
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{
							delay: 0.2,
							duration: 0.6,
							ease: MOTION_EASE,
						}}
						className="text-sm sm:text-base text-muted-foreground leading-relaxed font-normal"
					>
						Dive into real-world codebases, technical research
						articles, and high-performance in-browser developer
						utilities.
					</motion.p>
				</div>

				{/* Double-Bezel 3-Card Bento Grid */}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
					{pillars.map((pillar, i) => (
						<motion.div
							key={pillar.title}
							initial={{ opacity: 0, y: 24 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{
								delay: i * 0.12,
								duration: 0.7,
								ease: MOTION_EASE,
							}}
							className="p-1.5 rounded-[2.25rem] bg-white/3 dark:bg-white/2 border border-white/10 hover:border-white/20 transition-all duration-500 shadow-2xl flex flex-col"
						>
							<div className="relative h-full p-7 md:p-8 rounded-[calc(2.25rem-0.375rem)] bg-card/90 backdrop-blur-xl border border-white/5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)] flex flex-col justify-between overflow-hidden group">
								{/* Ambient hover glow */}
								<div
									className={`absolute inset-0 bg-linear-to-br ${pillar.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`}
								/>

								<div className="relative z-10">
									<div className="flex items-center justify-between mb-6">
										<div
											className={`w-12 h-12 rounded-2xl flex items-center justify-center border ${pillar.iconBg} transition-transform duration-500 group-hover:scale-105`}
										>
											<pillar.icon className="w-6 h-6" />
										</div>
										<span className="text-[10px] font-mono uppercase tracking-widest px-3 py-1 rounded-full bg-white/5 border border-white/10 text-muted-foreground">
											{pillar.badge}
										</span>
									</div>

									<h3 className="text-lg md:text-xl font-bold tracking-tight text-foreground mb-3 group-hover:text-primary transition-colors">
										{pillar.title}
									</h3>
									<p className="text-xs text-muted-foreground leading-relaxed mb-6 font-normal">
										{pillar.description}
									</p>
								</div>

								<div className="relative z-10 pt-5 border-t border-border/40 flex items-center justify-between">
									<span className="text-[11px] font-mono text-muted-foreground/80 flex items-center gap-1.5">
										<span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
										{pillar.highlight}
									</span>

									<Link
										href={pillar.link}
										className="inline-flex items-center gap-1.5 text-xs font-semibold text-foreground group-hover:text-primary transition-colors"
									>
										<span>View</span>
										<div className="w-6 h-6 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300">
											<ArrowUpRight className="w-3.5 h-3.5" />
										</div>
									</Link>
								</div>
							</div>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
};

export default LearningFeaturesSection;
