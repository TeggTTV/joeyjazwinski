import React from 'react';
import Link from 'next/link';
import {
	BookOpen,
	Wrench,
	ArrowUpRight,
	CheckCircle2,
	Layers,
	Compass,
} from 'lucide-react';

const PLATFORM_PILLARS = [
	{
		id: 'tools',
		badge: '01 / ONLINE UTILITIES',
		title: 'Free Browser Tools',
		description:
			'Over 35 simple utilities you can use right away. Resize photos, compare drafts, format text, and generate assets without downloading anything.',
		highlights: [
			'Image tools to compress photos and convert formats',
			'Text tools to compare document drafts and check patterns',
			'Safe and private, your files never leave your computer',
		],
		link: '/developer-tools',
		linkLabel: 'Browse All Free Tools',
		icon: Wrench,
	},
	{
		id: 'blog',
		badge: '02 / ARTICLES & GUIDES',
		title: 'Helpful Articles',
		description:
			'Clear explanations and tutorials covering web design, modern software, practical problem solving, and building creative projects.',
		highlights: [
			'Step-by-step guides written in plain English',
			'Tips for web design, performance, and accessibility',
			'Beginner-friendly breakdowns of modern technologies',
		],
		link: '/developer-blog',
		linkLabel: 'Read the Articles',
		icon: BookOpen,
	},
	{
		id: 'projects',
		badge: '03 / CREATIVE WORK',
		title: 'Interactive Projects',
		description:
			'Web applications and creative software experiments built to solve real-world problems and share with the open-source community.',
		highlights: [
			'Thoughtfully crafted web applications',
			'Clean, accessible design on desktop and mobile',
			'Open source code that anyone can look at and learn from',
		],
		link: '/projects',
		linkLabel: 'View All Projects',
		icon: Layers,
	},
];

const LearningFeaturesSection: React.FC = () => {
	return (
		<section className="w-full py-16 sm:py-24 border-b border-border bg-muted/20">
			<div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
				{/* Section Header */}
				<div className="max-w-2xl mb-12 sm:mb-16">
					<div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-primary/10 border border-primary/20 text-primary text-xs font-mono font-medium mb-4">
						<Compass className="w-3.5 h-3.5" />
						<span>WHAT I MAKE</span>
					</div>

					<h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground font-display mb-4">
						Tools, articles, and creative projects.
					</h2>

					<p className="text-base text-muted-foreground leading-relaxed font-sans">
						Everything here is built to be simple to use, open to everyone, and respectful of your privacy.
					</p>
				</div>

				{/* 3-Column Grid */}
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
					{PLATFORM_PILLARS.map((pillar) => {
						const Icon = pillar.icon;
						return (
							<div
								key={pillar.id}
								className="flex flex-col justify-between rounded-xl border border-border bg-card p-6 sm:p-8 shadow-xs hover:border-primary/40 transition-colors"
							>
								<div>
									{/* Top Badge & Icon */}
									<div className="flex items-center justify-between mb-6 pb-4 border-b border-border">
										<span className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground font-semibold">
											{pillar.badge}
										</span>
										<div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
											<Icon className="w-4 h-4" />
										</div>
									</div>

									{/* Title and Description */}
									<h3 className="text-xl font-bold text-foreground font-display mb-3">
										{pillar.title}
									</h3>

									<p className="text-sm text-muted-foreground leading-relaxed mb-6 font-sans">
										{pillar.description}
									</p>

									{/* Highlights List */}
									<ul className="space-y-2.5 mb-8">
										{pillar.highlights.map((item) => (
											<li
												key={item}
												className="flex items-start gap-2.5 text-xs text-foreground/90 font-sans"
											>
												<CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
												<span>{item}</span>
											</li>
										))}
									</ul>
								</div>

								{/* Action Link */}
								<div className="pt-4 border-t border-border">
									<Link
										href={pillar.link}
										className="inline-flex items-center gap-2 text-xs font-semibold text-primary hover:text-primary/80 transition-colors group"
									>
										<span>{pillar.linkLabel}</span>
										<ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
									</Link>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</section>
	);
};

export default LearningFeaturesSection;
