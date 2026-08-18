import { useState } from 'react';
import { NextSeo } from 'next-seo';
import { Search, Monitor, Tablet } from 'lucide-react';

export default function SerpPreview() {
	const [title, setTitle] = useState(
		'My Awesome Page Title - Joey Jazwinski',
	);
	const [desc, setDesc] = useState(
		'Discover how to build rich, modern portfolios and design client-side utilities that load instantly and offer beautiful user experiences.',
	);
	const [url, setUrl] = useState(
		'https://joeyjazwinski.com/developer-tools/serp-preview',
	);
	const [device, setDevice] = useState<'desktop' | 'mobile'>('desktop');

	const titleLength = title.length;
	const descLength = desc.length;

	return (
		<>
			<NextSeo
				title="SERP Snippet Preview Tool - Joey Jazwinski"
				description="Simulate search engine results pages (SERPs) client-side. Live preview how titles, descriptions, and URL structures look on Google desktop and mobile feeds."
			/>
			<main className="min-h-screen bg-background pt-32 pb-16 px-4 sm:px-6 lg:px-8 text-foreground animate-fade-in">
				<div className="max-w-4xl mx-auto space-y-12">
					{/* Header */}
					<div className="text-center space-y-4 max-w-2xl mx-auto">
						<div className="inline-flex p-3 rounded-2xl bg-primary/10 text-primary border border-primary/20">
							<Search className="w-8 h-8" />
						</div>
						<h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl bg-linear-to-r from-primary to-blue-500 bg-clip-text text-transparent">
							SERP Snippet Preview
						</h1>
						<p className="text-muted-foreground text-lg">
							Visualize Google search results feeds. Adjust title
							and description lengths for optimal index displays.
						</p>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-12 gap-8">
						{/* Configuration Form */}
						<div className="md:col-span-6 bg-card border border-border/80 rounded-2xl p-6 shadow-xl space-y-4">
							<h2 className="text-xl font-bold border-b border-border/40 pb-2">
								Snippet Config
							</h2>

							<div className="space-y-3">
								<div>
									<div className="flex justify-between items-center mb-1">
										<label className="text-xs font-semibold">
											SEO Title
										</label>
										<span
											className={`text-[10px] font-bold ${titleLength > 60 ? 'text-rose-500' : 'text-emerald-500'}`}
										>
											{titleLength} / 60 chars
										</span>
									</div>
									<input
										type="text"
										className="w-full p-2.5 rounded-lg border bg-background text-xs focus:ring-1 focus:ring-primary focus:outline-none"
										value={title}
										onChange={(e) =>
											setTitle(e.target.value)
										}
										placeholder="e.g. Page Title"
									/>
								</div>

								<div>
									<div className="flex justify-between items-center mb-1">
										<label className="text-xs font-semibold">
											Meta Description
										</label>
										<span
											className={`text-[10px] font-bold ${descLength > 160 ? 'text-rose-500' : 'text-emerald-500'}`}
										>
											{descLength} / 160 chars
										</span>
									</div>
									<textarea
										rows={4}
										className="w-full p-2.5 rounded-lg border bg-background text-xs focus:ring-1 focus:ring-primary focus:outline-none"
										value={desc}
										onChange={(e) =>
											setDesc(e.target.value)
										}
										placeholder="e.g. Page description text block..."
									/>
								</div>

								<div>
									<label className="block text-xs font-semibold mb-1">
										Target URL Path
									</label>
									<input
										type="url"
										className="w-full p-2.5 rounded-lg border bg-background text-xs focus:ring-1 focus:ring-primary focus:outline-none"
										value={url}
										onChange={(e) => setUrl(e.target.value)}
										placeholder="https://example.com/sub-page"
									/>
								</div>
							</div>
						</div>

						{/* Live Preview View */}
						<div className="md:col-span-6 bg-card border border-border/80 rounded-2xl p-6 shadow-xl flex flex-col justify-between min-h-87.5">
							<div className="space-y-4 flex-1">
								<div className="flex justify-between items-center border-b border-border/40 pb-2 mb-4">
									<h2 className="text-base font-bold">
										Google Search Preview
									</h2>

									<div className="flex border rounded-lg overflow-hidden bg-background">
										<button
											onClick={() => setDevice('desktop')}
											className={`p-2 transition ${device === 'desktop' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-secondary'}`}
											title="Desktop View"
										>
											<Monitor className="w-3.5 h-3.5" />
										</button>
										<button
											onClick={() => setDevice('mobile')}
											className={`p-2 transition ${device === 'mobile' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-secondary'}`}
											title="Mobile View"
										>
											<Tablet className="w-3.5 h-3.5" />
										</button>
									</div>
								</div>

								{/* Snippet Render Simulation */}
								<div className="p-4 bg-white dark:bg-zinc-900 border rounded-xl shadow-inner font-sans min-h-40">
									{device === 'desktop' ? (
										// Desktop Snippet
										<div className="space-y-1 text-left">
											<div className="text-xs text-zinc-600 dark:text-zinc-400 truncate font-mono">
												{url || 'https://example.com'}
											</div>
											<h3 className="text-[19px] text-[#1a0dab] dark:text-[#8ab4f8] hover:underline cursor-pointer font-medium leading-tight truncate">
												{title ||
													'Please enter page title'}
											</h3>
											<p className="text-sm text-zinc-800 dark:text-zinc-300 leading-normal line-clamp-2">
												{desc ||
													'Please enter page meta description.'}
											</p>
										</div>
									) : (
										// Mobile Snippet
										<div className="space-y-1.5 text-left max-w-sm mx-auto">
											<div className="flex items-center gap-2">
												<div className="w-6 h-6 rounded-full bg-zinc-100 dark:bg-zinc-800 border flex items-center justify-center text-[10px] font-bold text-zinc-500">
													G
												</div>
												<div>
													<span className="block text-xs font-semibold text-zinc-800 dark:text-zinc-200">
														Google
													</span>
													<span className="block text-[9px] text-zinc-500 truncate">
														{url ||
															'https://example.com'}
													</span>
												</div>
											</div>
											<h3 className="text-base text-[#15c] dark:text-[#8ab4f8] hover:underline cursor-pointer font-medium leading-snug">
												{title ||
													'Please enter page title'}
											</h3>
											<p className="text-xs text-zinc-800 dark:text-zinc-300 leading-normal line-clamp-3">
												{desc ||
													'Please enter page meta description.'}
											</p>
										</div>
									)}
								</div>
							</div>
						</div>
					</div>
				</div>
			</main>
		</>
	);
}
