import React from 'react';
import { LucideIcon } from 'lucide-react';

export interface HowItWorksStep {
	step: string;
	title: string;
	description: string;
	icon?: LucideIcon;
}

interface ToolHowItWorksProps {
	title?: string;
	subtitle?: string;
	steps: HowItWorksStep[];
}

export default function ToolHowItWorks({
	title = 'How It Works',
	subtitle = '100% client-side processing directly in your browser. No files or inputs are sent to remote servers.',
	steps,
}: ToolHowItWorksProps) {
	if (!steps || steps.length === 0) return null;

	return (
		<section className="bg-card/50 border border-border/80 rounded-2xl p-6 sm:p-8 mt-12 space-y-6 backdrop-blur-sm shadow-xs">
			<div className="space-y-1 border-b border-border/60 pb-4">
				<h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground font-display">
					{title}
				</h2>
				{subtitle && (
					<p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
						{subtitle}
					</p>
				)}
			</div>

			<div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
				{steps.map((item, idx) => {
					const Icon = item.icon;
					return (
						<div
							key={idx}
							className="relative flex flex-col p-5 rounded-xl border border-border/70 bg-background/60 space-y-3"
						>
							<div className="flex items-center justify-between">
								<span className="text-xs font-mono font-bold px-2 py-0.5 rounded-md bg-primary/10 text-primary border border-primary/20">
									Step {item.step || idx + 1}
								</span>
								{Icon && (
									<Icon className="w-5 h-5 text-muted-foreground" />
								)}
							</div>
							<h3 className="text-sm font-semibold text-foreground font-display">
								{item.title}
							</h3>
							<p className="text-xs text-muted-foreground leading-relaxed">
								{item.description}
							</p>
						</div>
					);
				})}
			</div>
		</section>
	);
}
