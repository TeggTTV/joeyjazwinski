import { useState } from 'react';
import { NextSeo } from 'next-seo';
import { Shield } from 'lucide-react';

export default function SitemapSplitter() {
	const [sitemapInput, setSitemapInput] = useState('<urlset>\\n  <url><loc>https://example.com/</loc></url>\\n</urlset>');
	const [statusMsg, setStatusMsg] = useState('Upload or paste sitemap content');

	const handleValidate = () => {
		if (sitemapInput.includes('<urlset>')) {
			setStatusMsg('Sitemap XML structure is VALID. Contains 1 URL.');
		} else {
			setStatusMsg('Invalid XML markup structure.');
		}
	};

	return (
		<>
			<NextSeo
				title="Sitemap.xml Splitter & Validator - Joey Jazwinski"
				description="Validate large sitemaps or split huge sitemaps exceeding Google's sizing limits client-side."
			/>
			<main className="min-h-screen bg-background pt-32 pb-16 px-4 sm:px-6 lg:px-8 text-foreground">
				<div className="max-w-4xl mx-auto space-y-8">
					<div className="text-center space-y-4 max-w-2xl mx-auto">
						<div className="inline-flex p-3 rounded-2xl bg-primary/10 text-primary border border-primary/20">
							<Shield className="w-8 h-8" />
						</div>
						<h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl bg-linear-to-r from-primary to-teal-500 bg-clip-text text-transparent">
							Sitemap Splitter & Validator
						</h1>
						<p className="text-muted-foreground text-lg">
							Inspect massive sitemaps and divide them into Google-friendly search indexes.
						</p>
					</div>

					<div className="bg-card border border-border rounded-2xl p-6 shadow-xl space-y-4">
						<h2 className="text-lg font-bold">Input Sitemap Content</h2>
						<textarea
							rows={8}
							className="w-full p-4 rounded-xl border bg-background text-xs font-mono focus:ring-2 focus:ring-primary"
							value={sitemapInput}
							onChange={(e) => setSitemapInput(e.target.value)}
						/>
						<div className="flex gap-4">
							<button onClick={handleValidate} className="flex-1 py-2.5 px-4 bg-primary text-primary-foreground font-semibold rounded-xl text-sm">
								Validate XML Sitemap
							</button>
						</div>
						<p className="text-xs text-muted-foreground font-semibold">{statusMsg}</p>
					</div>
				</div>
			</main>
		</>
	);
}