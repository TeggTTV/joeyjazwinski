import React from 'react';
import {
	Compass,
	BookOpen,
	Award,
	Calendar,
	Sparkles,
	Heart,
	Laptop,
} from 'lucide-react';

interface Milestone {
	year: string;
	title: string;
	story: string;
	tag: string;
	icon: React.ComponentType<{ className?: string }>;
}

const MILESTONES: Milestone[] = [
	{
		year: '2018',
		title: 'The First Spark',
		story: 'In sixth grade, a classmate showed me how typing a small command into a web browser could make a pop-up message box appear. Seeing that immediate result sparked my curiosity about how computers work.',
		tag: 'First Line of Code',
		icon: Sparkles,
	},
	{
		year: '2019',
		title: 'Weekends at the Library',
		story: 'Started learning web design by writing simple HTML and CSS pages. My older brother Kevin and I spent weekends at our local library coding side by side, building a strong habit of learning through curiosity.',
		tag: 'Learning with Family',
		icon: BookOpen,
	},
	{
		year: '2020',
		title: 'Automating Repetitive Tasks',
		story: 'Taught myself Python to automate daily repetitive tasks. Realizing that a short script could save hours of manual typing opened my eyes to the practical power of programming.',
		tag: 'Problem Solving',
		icon: Laptop,
	},
	{
		year: '2021',
		title: 'First Full Web Application',
		story: 'Combined my design skills and code to build my first complete interactive web application, allowing people to create accounts and save their information online.',
		tag: 'First Web App',
		icon: Heart,
	},
	{
		year: '2022',
		title: 'Mentoring & Community Knowledge',
		story: 'Began creating tutorials and mentoring peers in coding fundamentals, discovering the joy of explaining complex architecture simply and fostering a community of fellow builders.',
		tag: 'Community',
		icon: Award,
	},
	{
		year: '2024 - Present',
		title: 'Free Tools for Everyone',
		story: 'Launched this website to share 35+ free, private browser utilities, publish clear educational articles, and make useful web technology accessible to everyone.',
		tag: 'Community Platform',
		icon: Calendar,
	},
];

const JourneySection: React.FC = () => {
	return (
		<section className="w-full py-16 sm:py-24 border-b border-border bg-muted/20">
			<div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
				{/* Section Header */}
				<div className="max-w-2xl mb-12 sm:mb-16">
					<div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-primary/10 border border-primary/20 text-primary text-xs font-mono font-medium mb-4">
						<Compass className="w-3.5 h-3.5" />
						<span>MY STORY</span>
					</div>

					<h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground font-display mb-4">
						The Journey So Far
					</h2>

					<p className="text-base text-muted-foreground leading-relaxed font-sans">
						How curiosity in a middle school computer lab turned
						into creating tools and websites used by people across
						the web.
					</p>
				</div>

				{/* Timeline Grid */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{MILESTONES.map((m) => {
						const Icon = m.icon;
						return (
							<div
								key={m.year}
								className="rounded-xl border border-border bg-card p-6 shadow-xs flex flex-col justify-between hover:border-primary/40 transition-colors"
							>
								<div>
									{/* Top Bar: Year & Tag */}
									<div className="flex items-center justify-between pb-3 border-b border-border mb-4">
										<div className="flex items-center gap-2">
											<div className="w-7 h-7 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
												<Icon className="w-3.5 h-3.5" />
											</div>
											<span className="text-sm font-sans font-bold text-foreground">
												{m.year}
											</span>
										</div>

										<span className="text-[11px] font-sans text-muted-foreground font-medium">
											{m.tag}
										</span>
									</div>

									{/* Title */}
									<h3 className="text-base font-bold text-foreground font-display mb-2">
										{m.title}
									</h3>

									{/* Narrative Story */}
									<p className="text-xs text-muted-foreground leading-relaxed font-sans mb-4">
										{m.story}
									</p>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</section>
	);
};

export default JourneySection;
