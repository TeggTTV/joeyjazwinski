import { useState } from 'react';
import { NextSeo } from 'next-seo';
import { Palette, Copy, Check } from 'lucide-react';

export default function GlassmorphismGenerator() {
	const [blur, setBlur] = useState(8);
	const [opacity, setOpacity] = useState(25);
	const [copied, setCopied] = useState(false);

	const getCss = () => {
		return `background: rgba(255, 255, 255, 0.${opacity});\\nbackdrop-filter: blur(${blur}px);\\nborder: 1px solid rgba(255, 255, 255, 0.18);`;
	};

	const handleCopy = () => {
		navigator.clipboard.writeText(getCss());
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	return (
		<>
			<NextSeo
				title="Glassmorphism & Claymorphism CSS Generator - Joey Jazwinski"
				description="Build modern backdrop blur glass panels with interactive styling adjustments and export CSS properties instantly."
			/>
			<main className="min-h-screen bg-background pt-32 pb-16 px-4 sm:px-6 lg:px-8 text-foreground">
				<div className="max-w-4xl mx-auto space-y-8">
					<div className="text-center space-y-4 max-w-2xl mx-auto">
						<div className="inline-flex p-3 rounded-2xl bg-primary/10 text-primary border border-primary/20">
							<Palette className="w-8 h-8" />
						</div>
						<h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl bg-linear-to-r from-primary to-purple-600 bg-clip-text text-transparent">
							Glassmorphism CSS Generator
						</h1>
						<p className="text-muted-foreground text-lg">
							Create glass panels and custom backdrop styles.
						</p>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div className="bg-card border border-border rounded-2xl p-6 shadow-xl space-y-4">
							<h2 className="text-lg font-bold">Adjust Properties</h2>
							<div className="space-y-1">
								<label className="text-xs font-semibold text-muted-foreground">Blur (${blur}px)</label>
								<input
									type="range"
									min="0"
									max="20"
									className="w-full cursor-pointer"
									value={blur}
									onChange={(e) => setBlur(Number(e.target.value))}
								/>
							</div>
							<div className="space-y-1">
								<label className="text-xs font-semibold text-muted-foreground">Opacity (${opacity}%)</label>
								<input
									type="range"
									min="10"
									max="90"
									className="w-full cursor-pointer"
									value={opacity}
									onChange={(e) => setOpacity(Number(e.target.value))}
								/>
							</div>
						</div>

						<div className="bg-card border border-border rounded-2xl p-6 shadow-xl flex flex-col justify-between space-y-4">
							<div>
								<div className="flex justify-between items-center mb-4">
									<h2 className="text-lg font-bold">Generated CSS</h2>
									<button
										onClick={handleCopy}
										className="p-2 rounded-lg hover:bg-secondary border border-border transition text-muted-foreground"
									>
										{copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
									</button>
								</div>
								<pre className="p-4 rounded-xl border border-border bg-background text-xs font-mono break-all text-primary">
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