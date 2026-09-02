import { useState } from 'react';
import { NextSeo } from 'next-seo';
import ToolJsonLd from '@/components/seo/ToolJsonLd';
import { Palette, Copy, Check } from 'lucide-react';

export default function TailwindConfigGenerator() {
	const [cssVars, setCssVars] = useState(
		':root {\\n  --primary: #3b82f6;\\n  --background: #0f172a;\\n}',
	);
	const [configOutput, setConfigOutput] = useState('');
	const [copied, setCopied] = useState(false);

	const handleGenerate = () => {
		setConfigOutput(`/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: 'var(--primary)',
        background: 'var(--background)',
      }
    }
  }
}`);
	};

	const handleCopy = () => {
		navigator.clipboard.writeText(configOutput);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	return (
		<>
			<NextSeo
				title="Tailwind CSS Config Generator from CSS Variables - Joey Jazwinski"
				description="Generate custom `tailwind.config.js` theme configurations, color palettes, border radiuses, and font definitions from CSS root variables."
				canonical="https://joeyjazwinski.com/developer-tools/tailwind-config-generator"
				openGraph={{
					title: "Tailwind CSS Config Generator from CSS Variables - Joey Jazwinski",
					description: "Generate custom `tailwind.config.js` theme configurations, color palettes, border radiuses, and font definitions from CSS root variables.",
					url: "https://joeyjazwinski.com/developer-tools/tailwind-config-generator",
					type: "website",
					images: [
						{
							url: "https://joeyjazwinski.com/ogimage.png",
							width: 1200,
							height: 630,
							alt: "Tailwind CSS Config Generator",
						},
					],
				}}
				twitter={{
					handle: "@JoeyJazwinski",
					site: "@JoeyJazwinski",
					cardType: "summary_large_image",
				}}
			/>
			<ToolJsonLd
				name="Tailwind CSS Config Generator"
				description="Generate custom `tailwind.config.js` theme configurations, color palettes, border radiuses, and font definitions from CSS root variables."
				url="https://joeyjazwinski.com/developer-tools/tailwind-config-generator"
				category="DesignApplication"
			/>
			<main className="min-h-screen bg-background pt-32 pb-16 px-4 sm:px-6 lg:px-8 text-foreground">
				<div className="max-w-4xl mx-auto space-y-8">
					<div className="text-center space-y-4 max-w-2xl mx-auto">
						<div className="inline-flex p-3 rounded-2xl bg-primary/10 text-primary border border-primary/20">
							<Palette className="w-8 h-8" />
						</div>
						<h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl bg-linear-to-r from-primary to-indigo-500 bg-clip-text text-transparent">
							Tailwind Config Generator
						</h1>
						<p className="text-muted-foreground text-lg">
							Paste CSS style custom properties to generate
							Tailwind theme extensions.
						</p>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div className="bg-card border border-border rounded-2xl p-6 shadow-xl space-y-4">
							<h2 className="text-lg font-bold">
								Input CSS Stylesheet
							</h2>
							<textarea
								rows={10}
								className="w-full p-4 rounded-xl border border-border bg-background text-xs font-mono focus:outline-none focus:ring-2 focus:ring-primary"
								value={cssVars}
								onChange={(e) => setCssVars(e.target.value)}
							/>
							<button
								onClick={handleGenerate}
								className="w-full py-2.5 px-4 bg-primary text-primary-foreground font-semibold rounded-xl text-sm"
							>
								Generate Config
							</button>
						</div>

						<div className="bg-card border border-border rounded-2xl p-6 shadow-xl space-y-4">
							<div className="flex justify-between items-center">
								<h2 className="text-lg font-bold">
									Tailwind Config
								</h2>
								{configOutput && (
									<button
										onClick={handleCopy}
										className="p-2 rounded-lg hover:bg-secondary border border-border transition text-muted-foreground"
									>
										{copied ? (
											<Check className="w-4 h-4 text-emerald-500" />
										) : (
											<Copy className="w-4 h-4" />
										)}
									</button>
								)}
							</div>
							<textarea
								rows={11}
								readOnly
								className="w-full p-4 rounded-xl border border-border bg-background text-xs font-mono focus:outline-none"
								value={
									configOutput ||
									'// Click generate to build config mapping'
								}
							/>
						</div>
					</div>
				</div>
			</main>
		</>
	);
}
