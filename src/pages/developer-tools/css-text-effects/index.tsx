import { useState } from 'react';
import { NextSeo } from 'next-seo';
import { Palette, Copy, Check } from 'lucide-react';

export default function CssTextEffects() {
	const [glow, setGlow] = useState(4);
	const [shadowColor, setShadowColor] = useState('#3b82f6');
	const [copied, setCopied] = useState(false);

	const getCss = () => {
		return `text-shadow: 0 0 ${glow}px ${shadowColor}, 0 0 ${glow * 2}px ${shadowColor};`;
	};

	const handleCopy = () => {
		navigator.clipboard.writeText(getCss());
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	return (
		<>
			<NextSeo
				title="CSS Text Effects & Typography Styler - Joey Jazwinski"
				description="Design neon text effects, custom gradients, and overlapping header typography styles client-side."
			/>
			<main className="min-h-screen bg-background pt-32 pb-16 px-4 sm:px-6 lg:px-8 text-foreground">
				<div className="max-w-4xl mx-auto space-y-8">
					<div className="text-center space-y-4 max-w-2xl mx-auto">
						<div className="inline-flex p-3 rounded-2xl bg-primary/10 text-primary border border-primary/20">
							<Palette className="w-8 h-8" />
						</div>
						<h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl bg-linear-to-r from-primary to-teal-500 bg-clip-text text-transparent">
							Typography & Text Styler
						</h1>
						<p className="text-muted-foreground text-lg">
							Create typography filters and text-shadow properties visually.
						</p>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div className="bg-card border border-border rounded-2xl p-6 shadow-xl space-y-4">
							<h2 className="text-lg font-bold">Typography Filters</h2>
							<div className="space-y-2">
								<label className="text-xs font-semibold text-muted-foreground">Neon Glow Radius (${glow}px)</label>
								<input type="range" min="1" max="15" className="w-full" value={glow} onChange={(e) => setGlow(Number(e.target.value))} />
							</div>
							<div className="space-y-2">
								<label htmlFor="shadow-color" className="text-xs font-semibold text-muted-foreground">Glow Color</label>
								<input id="shadow-color" type="color" className="w-full h-10 rounded border" value={shadowColor} onChange={(e) => setShadowColor(e.target.value)} />
							</div>
						</div>

						<div className="bg-card border border-border rounded-2xl p-6 shadow-xl flex flex-col justify-between space-y-4">
							<div className="flex items-center justify-center p-6 border rounded-xl bg-background">
								<h2 className="text-3xl font-extrabold" style={{ textShadow: `0 0 ${glow}px ${shadowColor}` }}>
									Glow Text
								</h2>
							</div>
							<div>
								<div className="flex justify-between items-center mb-2">
									<span className="text-xs font-bold text-muted-foreground">Output CSS</span>
									<button onClick={handleCopy} className="p-1 rounded border">
										{copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
									</button>
								</div>
								<pre className="p-3 text-xs font-mono bg-background border rounded">{getCss()}</pre>
							</div>
						</div>
					</div>
				</div>
			</main>
		</>
	);
}