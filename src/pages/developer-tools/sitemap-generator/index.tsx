import { useState } from 'react';
import { NextSeo } from 'next-seo';
import { FileCode, Plus, Trash, Copy, Download, Check } from 'lucide-react';

interface SitemapUrl {
	id: string;
	loc: string;
	lastmod: string;
	changefreq: string;
	priority: string;
}

export default function SitemapGenerator() {
	const [urls, setUrls] = useState<SitemapUrl[]>([
		{
			id: '1',
			loc: 'https://example.com/',
			lastmod: new Date().toISOString().split('T')[0],
			changefreq: 'daily',
			priority: '1.0',
		},
		{
			id: '2',
			loc: 'https://example.com/about',
			lastmod: new Date().toISOString().split('T')[0],
			changefreq: 'monthly',
			priority: '0.8',
		},
	]);
	const [copied, setCopied] = useState(false);

	const addUrl = () => {
		const newId = Math.random().toString(36).substring(2, 9);
		setUrls([
			...urls,
			{
				id: newId,
				loc: '',
				lastmod: new Date().toISOString().split('T')[0],
				changefreq: 'weekly',
				priority: '0.5',
			},
		]);
	};

	const removeUrl = (id: string) => {
		setUrls(urls.filter((u) => u.id !== id));
	};

	const updateUrl = (id: string, field: keyof SitemapUrl, value: string) => {
		setUrls(urls.map((u) => (u.id === id ? { ...u, [field]: value } : u)));
	};

	const generateSitemapXml = () => {
		let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
		xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

		urls.forEach((url) => {
			if (url.loc.trim()) {
				xml += `  <url>\n`;
				xml += `    <loc>${url.loc.trim()}</loc>\n`;
				if (url.lastmod) {
					xml += `    <lastmod>${url.lastmod}</lastmod>\n`;
				}
				if (url.changefreq) {
					xml += `    <changefreq>${url.changefreq}</changefreq>\n`;
				}
				if (url.priority) {
					xml += `    <priority>${url.priority}</priority>\n`;
				}
				xml += `  </url>\n`;
			}
		});

		xml += `</urlset>`;
		return xml;
	};

	const handleCopy = () => {
		navigator.clipboard.writeText(generateSitemapXml());
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	const handleDownload = () => {
		const element = document.createElement('a');
		const file = new Blob([generateSitemapXml()], { type: 'text/xml' });
		element.href = URL.createObjectURL(file);
		element.download = 'sitemap.xml';
		document.body.appendChild(element);
		element.click();
		document.body.removeChild(element);
	};

	return (
		<>
			<NextSeo
				title="XML Sitemap Generator - Joey Jazwinski"
				description="Generate standard-compliant XML sitemaps client-side. Define page locations, crawl priority indexes, update frequencies, and export ready for search engines."
			/>
			<main className="min-h-screen bg-background pt-32 pb-16 px-4 sm:px-6 lg:px-8 text-foreground animate-fade-in">
				<div className="max-w-6xl mx-auto space-y-12">
					{/* Header */}
					<div className="text-center space-y-4 max-w-2xl mx-auto">
						<div className="inline-flex p-3 rounded-2xl bg-primary/10 text-primary border border-primary/20">
							<FileCode className="w-8 h-8" />
						</div>
						<h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl bg-linear-to-r from-primary to-emerald-500 bg-clip-text text-transparent">
							XML Sitemap Generator
						</h1>
						<p className="text-muted-foreground text-lg">
							Compile list items into search index layouts. Build
							and preview compliant sitemaps client-side.
						</p>
					</div>

					{/* Workspace */}
					<div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
						{/* Configuration Form */}
						<div className="lg:col-span-7 bg-card border border-border/80 rounded-2xl p-6 shadow-xl space-y-6">
							<div className="flex justify-between items-center border-b border-border/40 pb-3">
								<h2 className="text-xl font-bold">
									Map Directory Links
								</h2>
								<button
									type="button"
									onClick={addUrl}
									className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:text-primary/80 transition"
								>
									<Plus className="w-3.5 h-3.5" /> Add URL
								</button>
							</div>

							<div className="space-y-4 max-h-125 overflow-y-auto pr-1">
								{urls.map((url, idx) => (
									<div
										key={url.id}
										className="p-4 rounded-xl border bg-background/50 space-y-3 relative group"
									>
										<div className="flex justify-between items-center">
											<span className="text-xs font-bold text-muted-foreground">
												URL #{idx + 1}
											</span>
											<button
												type="button"
												onClick={() =>
													removeUrl(url.id)
												}
												className="text-rose-500 hover:bg-rose-500/10 p-1.5 rounded-lg transition"
											>
												<Trash className="w-3.5 h-3.5" />
											</button>
										</div>

										<div className="grid grid-cols-1 md:grid-cols-12 gap-3">
											<div className="md:col-span-6">
												<label className="block text-[11px] font-semibold mb-1">
													Location URL
												</label>
												<input
													type="url"
													className="w-full p-2.5 rounded-lg border bg-background text-xs focus:ring-1 focus:ring-primary focus:outline-none transition"
													value={url.loc}
													onChange={(e) =>
														updateUrl(
															url.id,
															'loc',
															e.target.value,
														)
													}
													placeholder="https://example.com/page"
												/>
											</div>

											<div className="md:col-span-2">
												<label className="block text-[11px] font-semibold mb-1">
													Priority
												</label>
												<select
													className="w-full p-2.5 rounded-lg border bg-background text-xs focus:ring-1 focus:ring-primary focus:outline-none transition"
													value={url.priority}
													onChange={(e) =>
														updateUrl(
															url.id,
															'priority',
															e.target.value,
														)
													}
												>
													<option value="1.0">
														1.0 (High)
													</option>
													<option value="0.8">
														0.8
													</option>
													<option value="0.5">
														0.5 (Mid)
													</option>
													<option value="0.3">
														0.3
													</option>
													<option value="0.1">
														0.1 (Low)
													</option>
												</select>
											</div>

											<div className="md:col-span-2">
												<label className="block text-[11px] font-semibold mb-1">
													Frequency
												</label>
												<select
													className="w-full p-2.5 rounded-lg border bg-background text-xs focus:ring-1 focus:ring-primary focus:outline-none transition"
													value={url.changefreq}
													onChange={(e) =>
														updateUrl(
															url.id,
															'changefreq',
															e.target.value,
														)
													}
												>
													<option value="always">
														always
													</option>
													<option value="hourly">
														hourly
													</option>
													<option value="daily">
														daily
													</option>
													<option value="weekly">
														weekly
													</option>
													<option value="monthly">
														monthly
													</option>
													<option value="yearly">
														yearly
													</option>
													<option value="never">
														never
													</option>
												</select>
											</div>

											<div className="md:col-span-2">
												<label className="block text-[11px] font-semibold mb-1">
													Last Mod
												</label>
												<input
													type="date"
													className="w-full p-2 rounded-lg border bg-background text-xs focus:ring-1 focus:ring-primary focus:outline-none transition"
													value={url.lastmod}
													onChange={(e) =>
														updateUrl(
															url.id,
															'lastmod',
															e.target.value,
														)
													}
												/>
											</div>
										</div>
									</div>
								))}
							</div>
						</div>

						{/* Output View */}
						<div className="lg:col-span-5 bg-card border border-border/80 rounded-2xl p-6 shadow-xl flex flex-col justify-between h-full min-h-112.5">
							<div className="space-y-4 flex-1 flex flex-col">
								<div className="flex justify-between items-center border-b border-border/40 pb-3">
									<h2 className="text-xl font-bold">
										XML Preview
									</h2>
									<div className="flex gap-2">
										<button
											onClick={handleCopy}
											className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border bg-background hover:bg-secondary text-xs font-semibold transition"
										>
											{copied ? (
												<>
													<Check className="w-3.5 h-3.5 text-emerald-500" />{' '}
													Copied
												</>
											) : (
												<>
													<Copy className="w-3.5 h-3.5" />{' '}
													Copy
												</>
											)}
										</button>
										<button
											onClick={handleDownload}
											className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border bg-background hover:bg-secondary text-xs font-semibold transition"
										>
											<Download className="w-3.5 h-3.5" />{' '}
											Download
										</button>
									</div>
								</div>

								<div className="flex-1 min-h-75 bg-background border border-border rounded-xl p-4 font-mono text-[11px] overflow-auto select-all whitespace-pre">
									{generateSitemapXml()}
								</div>
							</div>
						</div>
					</div>
				</div>
			</main>
		</>
	);
}
