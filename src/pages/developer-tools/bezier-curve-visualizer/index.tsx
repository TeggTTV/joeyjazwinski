import { useState } from 'react';
import { NextSeo } from 'next-seo';
import { Palette, Copy, Check } from 'lucide-react';

export default function BezierCurveVisualizer() {
	const [p1, setP1] = useState(0.42);
	const [p2, setP2] = useState(0);
	const [p3, setP3] = useState(0.58);
	const [p4, setP4] = useState(1);
	const [copied, setCopied] = useState(false);

	const getCss = () => {
		return `transition-timing-function: cubic-bezier(${p1}, ${p2}, ${p3}, ${p4});`;
	};

	const handleCopy = () => {
		navigator.clipboard.writeText(getCss());
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	return (
		<>
			<NextSeo
				title="CSS Bezier Curve Cubic Visualizer - Joey Jazwinski"
				description="Interactive timing function cubic-bezier curve designer to model CSS animations client-side."
			/>
			<main className="min-h-screen bg-background pt-32 pb-16 px-4 sm:px-6 lg:px-8 text-foreground">
				<div className="max-w-4xl mx-auto space-y-8">
					<div className="text-center space-y-4 max-w-2xl mx-auto">
						<div className="inline-flex p-3 rounded-2xl bg-primary/10 text-primary border border-primary/20">
							<Palette className="w-8 h-8" />
						</div>
						<h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl bg-linear-to-r from-primary to-indigo-500 bg-clip-text text-transparent">
							CSS Bezier Curve Visualizer
						</h1>
						<p className="text-muted-foreground text-lg">
							Visualize timing curves for smooth frontend transition delays and copy cubic parameters.
						</p>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div className="bg-card border border-border rounded-2xl p-6 shadow-xl space-y-4">
							<h2 className="text-lg font-bold">Adjust Control Points</h2>
							<div className="space-y-2">
								<label className="text-xs font-semibold text-muted-foreground">P1 (${p1})</label>
								<input type="range" min="0" max="1" step="0.01" className="w-full" value={p1} onChange={(e) => setP1(Number(e.target.value))} />
								<label className="text-xs font-semibold text-muted-foreground">P2 (${p2})</label>
								<input type="range" min="-0.5" max="1.5" step="0.01" className="w-full" value={p2} onChange={(e) => setP2(Number(e.target.value))} />
							</div>
						</div>

						<div className="bg-card border border-border rounded-2xl p-6 shadow-xl flex flex-col justify-between space-y-4">
							<div>
								<div className="flex justify-between items-center mb-4">
									<h2 className="text-lg font-bold">Timing Property</h2>
									<button
										onClick={handleCopy}
										className="p-2 rounded-lg hover:bg-secondary border border-border transition text-muted-foreground"
									>
										{copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
									</button>
								</div>
								<pre className="p-4 rounded-xl border border-border bg-background text-xs font-mono text-primary break-all">
									{getCss()}
								</pre>
							</div>
						</div>
					</div>
				</div>
			</main>
		</>
	);
}