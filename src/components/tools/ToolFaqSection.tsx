import React from 'react';
import { HelpCircle, ChevronDown } from 'lucide-react';

export interface ToolFaq {
	question: string;
	answer: string;
}

interface ToolFaqSectionProps {
	faqs: ToolFaq[];
	title?: string;
}

export default function ToolFaqSection({
	faqs,
	title = 'Frequently Asked Questions',
}: ToolFaqSectionProps) {
	if (!faqs || faqs.length === 0) return null;

	return (
		<section className="bg-card/50 border border-border/80 rounded-2xl p-6 sm:p-8 mt-12 space-y-6 backdrop-blur-sm shadow-sm">
			<div className="flex items-center gap-3 border-b border-border/60 pb-4">
				<div className="p-2 rounded-xl bg-primary/10 text-primary">
					<HelpCircle className="w-5 h-5" />
				</div>
				<h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
					{title}
				</h2>
			</div>

			<div className="space-y-4">
				{faqs.map((faq, idx) => (
					<details
						key={idx}
						className="group rounded-xl border border-border/70 bg-background/60 p-4 transition-all duration-200 open:bg-card/80 open:border-primary/40 open:shadow-xs"
					>
						<summary className="flex cursor-pointer items-center justify-between font-semibold text-foreground text-sm sm:text-base select-none list-none">
							<span>{faq.question}</span>
							<ChevronDown className="w-4 h-4 text-muted-foreground transition-transform duration-200 group-open:rotate-180 shrink-0 ml-2" />
						</summary>
						<p className="mt-3 text-xs sm:text-sm text-muted-foreground leading-relaxed pt-2 border-t border-border/40">
							{faq.answer}
						</p>
					</details>
				))}
			</div>
		</section>
	);
}
