import React from 'react';
import { Code2, Layout, Database, Wrench, CheckCircle2 } from 'lucide-react';

interface SkillGroup {
	title: string;
	category: string;
	icon: React.ComponentType<{ className?: string }>;
	description: string;
	skills: { name: string; note: string }[];
}

const SKILL_GROUPS: SkillGroup[] = [
	{
		title: 'Programming Languages',
		category: 'CORE CODE',
		icon: Code2,
		description:
			'The languages I use to write software and automation tools.',
		skills: [
			{
				name: 'TypeScript',
				note: 'Reliable, error-resistant code for web apps',
			},
			{
				name: 'Python',
				note: 'Writing scripts, automating tasks, and parsing data',
			},
			{
				name: 'JavaScript',
				note: 'Creating interactive features in web browsers',
			},
			{
				name: 'SQL',
				note: 'Organizing and querying database information',
			},
		],
	},
	{
		title: 'Building for the Web',
		category: 'INTERFACES & DESIGN',
		icon: Layout,
		description: 'Tools for creating fast, responsive websites and pages.',
		skills: [
			{
				name: 'React & Next.js',
				note: 'Building modern, snappy web pages that load quickly',
			},
			{
				name: 'Modern CSS & Tailwind',
				note: 'Crafting clean typography, colors, and layout rules',
			},
			{
				name: 'Responsive Layouts',
				note: 'Making sure pages look great on phones, tablets, and computers',
			},
			{
				name: 'Web Accessibility',
				note: 'Ensuring sites are usable for people with screen readers',
			},
		],
	},
	{
		title: 'Databases & Servers',
		category: 'DATA & STORAGE',
		icon: Database,
		description:
			'Technologies that manage accounts, store content, and deliver pages.',
		skills: [
			{
				name: 'Node.js',
				note: 'Running software and tools behind the scenes',
			},
			{
				name: 'MongoDB & Databases',
				note: 'Storing information safely and reliably',
			},
			{
				name: 'Cloud Hosting',
				note: 'Deploying websites with high availability and speed',
			},
			{
				name: 'Web APIs',
				note: 'Connecting different services and sharing data',
			},
		],
	},
	{
		title: 'Product & Craft',
		category: 'HOW I WORK',
		icon: Wrench,
		description:
			'Practices that ensure code quality, smooth teamwork, and fast sites.',
		skills: [
			{
				name: 'Git & Version Control',
				note: 'Keeping a careful history of every change made',
			},
			{
				name: 'Design Systems',
				note: 'Consistent fonts, spacing, and colors across whole sites',
			},
			{
				name: 'Testing',
				note: 'Verifying that tools work correctly before publishing',
			},
			{
				name: 'Performance Optimization',
				note: 'Making pages light so they load without delay',
			},
		],
	},
];

const SkillsSection: React.FC = () => {
	return (
		<section className="w-full py-16 sm:py-24 border-b border-border bg-background">
			<div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
				{/* Section Header */}
				<div className="max-w-2xl mb-12 sm:mb-16">
					<div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-primary/10 border border-primary/20 text-primary text-xs font-mono font-medium mb-4">
						<Wrench className="w-3.5 h-3.5" />
						<span>SKILLS & CRAFT</span>
					</div>

					<h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground font-display mb-4">
						What I Work With
					</h2>

					<p className="text-base text-muted-foreground leading-relaxed font-sans">
						The programming languages, web technologies, and design
						practices I use to build projects and tools.
					</p>
				</div>

				{/* 4-Quadrant Skills Grid */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
					{SKILL_GROUPS.map((group) => {
						const Icon = group.icon;
						return (
							<div
								key={group.title}
								className="rounded-xl border border-border bg-card p-6 sm:p-8 shadow-xs hover:border-primary/40 transition-colors"
							>
								{/* Header */}
								<div className="flex items-center justify-between pb-4 border-b border-border mb-4">
									<div className="flex items-center gap-3">
										<div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
											<Icon className="w-4 h-4" />
										</div>
										<div>
											<span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider block font-semibold">
												{group.category}
											</span>
											<h3 className="text-lg font-bold text-foreground font-display">
												{group.title}
											</h3>
										</div>
									</div>
								</div>

								<p className="text-xs text-muted-foreground mb-6 font-sans leading-relaxed">
									{group.description}
								</p>

								{/* Skills List */}
								<div className="space-y-3">
									{group.skills.map((skill) => (
										<div
											key={skill.name}
											className="p-3 rounded-lg border border-border bg-muted/20 flex items-start gap-2.5"
										>
											<CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
											<div className="min-w-0">
												<span className="text-xs font-semibold text-foreground font-sans block">
													{skill.name}
												</span>
												<span className="text-[11px] text-muted-foreground block mt-0.5">
													{skill.note}
												</span>
											</div>
										</div>
									))}
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</section>
	);
};

export default SkillsSection;
