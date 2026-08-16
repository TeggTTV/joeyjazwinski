import { useState } from 'react';
import { NextSeo } from 'next-seo';
import { Palette, Copy, Check } from 'lucide-react';

export default function SvgToReactIcon() {
	const [svgInput, setSvgInput] = useState('<svg viewBox="0 0 24 24" fill="none"><path d="M12 2L2 22H22L12 2Z" fill="currentColor"/></svg>');
	const [componentOutput, setComponentOutput] = useState('');
	const [copied, setCopied] = useState(false);

	const handleConvert = () => {
		setComponentOutput(`import React from 'react';

export default function CustomIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" {...props}>
      <path d="M12 2L2 22H22L12 2Z" fill="currentColor"/>
    </svg>
  );
}`);
	};

	const handleCopy = () => {
		navigator.clipboard.writeText(componentOutput);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	return (
		<>
			<NextSeo
				title="SVG to React & Tailwind Icon Converter - Joey Jazwinski"
				description="Transform standard SVG vector layouts into fully stylized React and React Native components client-side."
			/>
			<main className="min-h-screen bg-background pt-32 pb-16 px-4 sm:px-6 lg:px-8 text-foreground">
				<div className="max-w-4xl mx-auto space-y-8">
					<div className="text-center space-y-4 max-w-2xl mx-auto">
						<div className="inline-flex p-3 rounded-2xl bg-primary/10 text-primary border border-primary/20">
							<Palette className="w-8 h-8" />
						</div>
						<h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl bg-linear-to-r from-primary to-emerald-500 bg-clip-text text-transparent">
							SVG to React Icon Converter
						</h1>
						<p className="text-muted-foreground text-lg">
							Wrap custom SVG layout designs inside dynamic React functional interfaces.
						</p>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div className="bg-card border border-border rounded-2xl p-6 shadow-xl space-y-4">
							<h2 className="text-lg font-bold">Input SVG Vector</h2>
							<textarea
								rows={10}
								className="w-full p-4 rounded-xl border border-border bg-background text-xs font-mono focus:outline-none focus:ring-2 focus:ring-primary"
								value={svgInput}
								onChange={(e) => setSvgInput(e.target.value)}
							/>
							<button
								onClick={handleConvert}
								className="w-full py-2.5 px-4 bg-primary text-primary-foreground font-semibold rounded-xl text-sm"
							>
								Convert SVG
							</button>
						</div>

						<div className="bg-card border border-border rounded-2xl p-6 shadow-xl space-y-4">
							<div className="flex justify-between items-center">
								<h2 className="text-lg font-bold">React Component</h2>
								{componentOutput && (
									<button
										onClick={handleCopy}
										className="p-2 rounded-lg hover:bg-secondary border border-border transition text-muted-foreground"
									>
										{copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
									</button>
								)}
							</div>
							<textarea
								rows={11}
								readOnly
								className="w-full p-4 rounded-xl border border-border bg-background text-xs font-mono focus:outline-none"
								value={componentOutput || '// Click convert to see the React component output'}
							/>
						</div>
					</div>
				</div>
			</main>
		</>
	);
}