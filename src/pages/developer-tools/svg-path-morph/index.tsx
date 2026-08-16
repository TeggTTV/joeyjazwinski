import { useState } from 'react';
import { NextSeo } from 'next-seo';
import { Palette } from 'lucide-react';

export default function SvgPathMorph() {
	const [morphProgress, setMorphProgress] = useState(0);

	return (
		<>
			<NextSeo
				title="SVG Path Morphing Visualizer - Joey Jazwinski"
				description="Visualize transitions between custom SVG vector shapes with interactive path parameter settings."
			/>
			<main className="min-h-screen bg-background pt-32 pb-16 px-4 sm:px-6 lg:px-8 text-foreground">
				<div className="max-w-4xl mx-auto space-y-8">
					<div className="text-center space-y-4 max-w-2xl mx-auto">
						<div className="inline-flex p-3 rounded-2xl bg-primary/10 text-primary border border-primary/20">
							<Palette className="w-8 h-8" />
						</div>
						<h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl bg-linear-to-r from-primary to-purple-600 bg-clip-text text-transparent">
							SVG Path Morphing
						</h1>
						<p className="text-muted-foreground text-lg">
							Visualize SVG node layout transformations using cubic-bezier curves.
						</p>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div className="bg-card border border-border rounded-2xl p-6 shadow-xl space-y-4">
							<h2 className="text-lg font-bold">Morph Slider</h2>
							<input
								type="range"
								min="0"
								max="100"
								className="w-full cursor-pointer"
								value={morphProgress}
								onChange={(e) => setMorphProgress(Number(e.target.value))}
							/>
							<div className="flex justify-between text-xs text-muted-foreground">
								<span>Shape A</span>
								<span>Shape B</span>
							</div>
						</div>

						<div className="bg-card border border-border rounded-2xl p-6 shadow-xl flex items-center justify-center min-h-60">
							<svg className="w-32 h-32 text-primary" viewBox="0 0 100 100">
								<rect x="10" y="10" width="80" height="80" rx={morphProgress / 2} fill="currentColor" />
							</svg>
						</div>
					</div>
				</div>
			</main>
		</>
	);
}