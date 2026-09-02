import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { getRelatedTools, ALL_TOOLS } from '@/config/tools';
import { ArrowRight, Wrench, Sparkles } from 'lucide-react';

interface RelatedToolsProps {
	currentHref?: string;
	title?: string;
	count?: number;
}

export default function RelatedTools({
	currentHref,
	title = 'Explore Related Developer Utilities',
	count = 4,
}: RelatedToolsProps) {
	const router = useRouter();
	const activePath = currentHref || router.pathname;
	const tools = getRelatedTools(activePath, count);

	if (!tools || tools.length === 0) return null;

	return (
		<section className="mt-16 pt-10 border-t border-border/60">
			<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
				<div className="flex items-center gap-2">
					<div className="p-2 rounded-xl bg-primary/10 text-primary border border-primary/20">
						<Wrench className="w-5 h-5" />
					</div>
					<div>
						<h3 className="text-lg sm:text-xl font-bold text-foreground">
							{title}
						</h3>
						<p className="text-xs sm:text-sm text-muted-foreground">
							Fast, browser-based utilities to streamline your daily engineering workflow.
						</p>
					</div>
				</div>

				<Link
					href="/developer-tools"
					className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline shrink-0"
				>
					View all {ALL_TOOLS.length} tools
					<ArrowRight className="w-3.5 h-3.5" />
				</Link>
			</div>

			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
				{tools.map((tool) => (
					<Link
						key={tool.href}
						href={tool.href}
						className="group flex flex-col justify-between p-4 rounded-xl bg-card/60 hover:bg-card border border-border/70 hover:border-primary/50 transition-all duration-200 shadow-sm hover:shadow-md hover:-translate-y-0.5"
					>
						<div className="space-y-2">
							<div className="flex items-center justify-between">
								<span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
									{tool.category}
								</span>
								{tool.badge && (
									<span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
										{tool.badge}
									</span>
								)}
							</div>

							<h4 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors line-clamp-1">
								{tool.title}
							</h4>

							<p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
								{tool.description}
							</p>
						</div>

						<div className="flex items-center gap-1 text-[11px] font-medium text-primary mt-4 pt-2 border-t border-border/40 group-hover:translate-x-0.5 transition-transform">
							Open Tool
							<ArrowRight className="w-3 h-3" />
						</div>
					</Link>
				))}
			</div>
		</section>
	);
}
