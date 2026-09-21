import React from 'react';
import Link from 'next/link';
import {
	ArrowUpRight,
	ChevronRight,
	Wrench,
	BookOpen,
	Layers,
	ShieldCheck,
	Sparkles,
} from 'lucide-react';

const HIGHLIGHTS = [
	'Free for everyone',
	'Runs in your browser',
	'No account needed',
	'Your data stays private',
];

const HeroSection: React.FC = () => {
	return (
		<section className="relative w-full py-16 sm:py-24 border-b border-border bg-background">
			<div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
					{/* Left Column: Friendly Introduction and Action Buttons */}
					<div className="lg:col-span-7 flex flex-col items-start">
						<h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground font-display leading-[1.1] my-6">
							Building simple, useful tools and web experiences
							for everyone.
						</h1>

						<p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-8 max-w-2xl font-sans">
							Hi, I&apos;m{' '}
							<strong className="text-foreground font-semibold">
								Joey Jazwinski
							</strong>
							. I make web applications, write clear guides, and
							share a collection of 35+ free tools you can use
							directly on your computer or phone.
						</p>

						<div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto mb-10">
							<Link
								href="/developer-tools"
								className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-primary text-primary-foreground font-medium text-sm transition-colors hover:bg-primary/90 active:scale-[0.99] shadow-xs"
							>
								<span>Explore Free Tools</span>
								<ArrowUpRight className="w-4 h-4" />
							</Link>

							<Link
								href="/contact"
								className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg border border-border bg-card text-foreground font-medium text-sm transition-colors hover:bg-muted/60 active:scale-[0.99]"
							>
								<span>Send a Message</span>
								<ChevronRight className="w-4 h-4 text-muted-foreground" />
							</Link>
						</div>

						{/* Simple reassurance tags */}
						<div className="w-full pt-6 border-t border-border">
							<div className="flex flex-wrap gap-2">
								{HIGHLIGHTS.map((item) => (
									<div
										key={item}
										className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-muted/30 text-foreground text-xs font-medium"
									>
										<span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
										<span>{item}</span>
									</div>
								))}
							</div>
						</div>
					</div>

					{/* Right Column: Clear Overview of What Visitors Can Find */}
					<div className="lg:col-span-5 w-full">
						<div className="rounded-xl border border-border bg-card shadow-xs overflow-hidden p-6 sm:p-7 space-y-5">
							<div className="border-b border-border pb-4">
								<span className="text-xs font-mono uppercase tracking-wider text-muted-foreground font-semibold block mb-1">
									Welcome
								</span>
								<h2 className="text-lg font-bold text-foreground font-display">
									What you will find here
								</h2>
							</div>

							<div className="space-y-4">
								<div className="flex items-start gap-3.5">
									<div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0 mt-0.5">
										<Wrench className="w-4 h-4" />
									</div>
									<div>
										<h3 className="text-sm font-semibold text-foreground font-display">
											35+ Free Browser Tools
										</h3>
										<p className="text-xs text-muted-foreground leading-relaxed mt-0.5 font-sans">
											Shrink image sizes, compare text
											differences, and format documents
											right in your browser.
										</p>
									</div>
								</div>

								<div className="flex items-start gap-3.5">
									<div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0 mt-0.5">
										<BookOpen className="w-4 h-4" />
									</div>
									<div>
										<h3 className="text-sm font-semibold text-foreground font-display">
											Helpful Articles & Guides
										</h3>
										<p className="text-xs text-muted-foreground leading-relaxed mt-0.5 font-sans">
											Clear, plain-language walkthroughs
											covering web development, design
											ideas, and problem solving.
										</p>
									</div>
								</div>

								<div className="flex items-start gap-3.5">
									<div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0 mt-0.5">
										<Layers className="w-4 h-4" />
									</div>
									<div>
										<h3 className="text-sm font-semibold text-foreground font-display">
											Creative Projects
										</h3>
										<p className="text-xs text-muted-foreground leading-relaxed mt-0.5 font-sans">
											Interactive apps, design
											experiments, and open-source
											software built for anyone to
											explore.
										</p>
									</div>
								</div>
							</div>

							<div className="pt-4 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
								<span className="flex items-center gap-1.5">
									<ShieldCheck className="w-4 h-4 text-emerald-500" />
									<span>No tracking cookies</span>
								</span>
								<Link
									href="/about"
									className="text-primary font-semibold hover:underline inline-flex items-center gap-1"
								>
									<span>About Joey</span>
									<ChevronRight className="w-3 h-3" />
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default HeroSection;
