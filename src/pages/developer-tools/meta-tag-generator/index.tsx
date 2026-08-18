import { useState } from 'react';
import { NextSeo } from 'next-seo';
import { Sparkles, Copy, Check } from 'lucide-react';

export default function MetaTagGenerator() {
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [keywords, setKeywords] = useState('');
	const [author, setAuthor] = useState('');
	const [canonical, setCanonical] = useState('');

	const [ogEnabled, setOgEnabled] = useState(true);
	const [ogTitle, setOgTitle] = useState('');
	const [ogDescription, setOgDescription] = useState('');
	const [ogImage, setOgImage] = useState('');
	const [ogUrl, setOgUrl] = useState('');

	const [twitterEnabled, setTwitterEnabled] = useState(true);
	const [twitterTitle, setTwitterTitle] = useState('');
	const [twitterDescription, setTwitterDescription] = useState('');
	const [twitterImage, setTwitterImage] = useState('');
	const [twitterCard, setTwitterCard] = useState('summary_large_image');

	const [copied, setCopied] = useState(false);

	const generateMetaTags = () => {
		let tags: string[] = [];

		if (title) tags.push(`<title>${title}</title>`);
		tags.push(`<meta name="title" content="${title || 'Page Title'}" />`);
		if (description)
			tags.push(`<meta name="description" content="${description}" />`);
		if (keywords)
			tags.push(`<meta name="keywords" content="${keywords}" />`);
		if (author) tags.push(`<meta name="author" content="${author}" />`);
		if (canonical)
			tags.push(`<link rel="canonical" href="${canonical}" />`);

		if (ogEnabled) {
			tags.push('');
			tags.push('<!-- Open Graph / Facebook -->');
			tags.push(`<meta property="og:type" content="website" />`);
			tags.push(
				`<meta property="og:url" content="${ogUrl || canonical || ''}" />`,
			);
			tags.push(
				`<meta property="og:title" content="${ogTitle || title || ''}" />`,
			);
			tags.push(
				`<meta property="og:description" content="${ogDescription || description || ''}" />`,
			);
			if (ogImage)
				tags.push(`<meta property="og:image" content="${ogImage}" />`);
		}

		if (twitterEnabled) {
			tags.push('');
			tags.push('<!-- Twitter -->');
			tags.push(
				`<meta property="twitter:card" content="${twitterCard}" />`,
			);
			tags.push(
				`<meta property="twitter:url" content="${ogUrl || canonical || ''}" />`,
			);
			tags.push(
				`<meta property="twitter:title" content="${twitterTitle || title || ''}" />`,
			);
			tags.push(
				`<meta property="twitter:description" content="${twitterDescription || description || ''}" />`,
			);
			if (twitterImage || ogImage) {
				tags.push(
					`<meta property="twitter:image" content="${twitterImage || ogImage}" />`,
				);
			}
		}

		return tags.join('\n');
	};

	const handleCopy = () => {
		navigator.clipboard.writeText(generateMetaTags());
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	return (
		<>
			<NextSeo
				title="Meta Tag Generator - Joey Jazwinski"
				description="Construct index-friendly meta elements client-side. Create search, OpenGraph, and Twitter tags block options ready to paste."
			/>
			<main className="min-h-screen bg-background pt-32 pb-16 px-4 sm:px-6 lg:px-8 text-foreground animate-fade-in">
				<div className="max-w-6xl mx-auto space-y-12">
					{/* Header */}
					<div className="text-center space-y-4 max-w-2xl mx-auto">
						<div className="inline-flex p-3 rounded-2xl bg-primary/10 text-primary border border-primary/20">
							<Sparkles className="w-8 h-8" />
						</div>
						<h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl bg-linear-to-r from-primary to-rose-500 bg-clip-text text-transparent">
							Meta Tag Generator
						</h1>
						<p className="text-muted-foreground text-lg">
							Create social previews and indexable search
							snippets. Generate standard tags block instantly.
						</p>
					</div>

					{/* Workspace */}
					<div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
						{/* Configuration Form */}
						<div className="lg:col-span-6 space-y-6">
							{/* Basic Meta */}
							<div className="bg-card border border-border/80 rounded-2xl p-6 shadow-xl space-y-4">
								<h2 className="text-lg font-bold border-b border-border/40 pb-2">
									Basic Meta Tags
								</h2>
								<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
									<div>
										<label className="block text-xs font-semibold mb-1">
											Title
										</label>
										<input
											type="text"
											className="w-full p-2.5 rounded-lg border bg-background text-xs focus:ring-1 focus:ring-primary focus:outline-none"
											value={title}
											onChange={(e) =>
												setTitle(e.target.value)
											}
											placeholder="e.g. My Awesome Website"
										/>
									</div>
									<div>
										<label className="block text-xs font-semibold mb-1">
											Author
										</label>
										<input
											type="text"
											className="w-full p-2.5 rounded-lg border bg-background text-xs focus:ring-1 focus:ring-primary focus:outline-none"
											value={author}
											onChange={(e) =>
												setAuthor(e.target.value)
											}
											placeholder="e.g. John Doe"
										/>
									</div>
								</div>
								<div>
									<label className="block text-xs font-semibold mb-1">
										Meta Description
									</label>
									<textarea
										rows={2}
										className="w-full p-2.5 rounded-lg border bg-background text-xs focus:ring-1 focus:ring-primary focus:outline-none"
										value={description}
										onChange={(e) =>
											setDescription(e.target.value)
										}
										placeholder="Describe your page content under 160 characters..."
									/>
								</div>
								<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
									<div>
										<label className="block text-xs font-semibold mb-1">
											Keywords
										</label>
										<input
											type="text"
											className="w-full p-2.5 rounded-lg border bg-background text-xs focus:ring-1 focus:ring-primary focus:outline-none"
											value={keywords}
											onChange={(e) =>
												setKeywords(e.target.value)
											}
											placeholder="seo, developer, portfolio"
										/>
									</div>
									<div>
										<label className="block text-xs font-semibold mb-1">
											Canonical URL
										</label>
										<input
											type="url"
											className="w-full p-2.5 rounded-lg border bg-background text-xs focus:ring-1 focus:ring-primary focus:outline-none"
											value={canonical}
											onChange={(e) =>
												setCanonical(e.target.value)
											}
											placeholder="https://example.com/page"
										/>
									</div>
								</div>
							</div>

							{/* OpenGraph */}
							<div className="bg-card border border-border/80 rounded-2xl p-6 shadow-xl space-y-4">
								<div className="flex justify-between items-center border-b border-border/40 pb-2">
									<h2 className="text-lg font-bold">
										Open Graph (Facebook/LinkedIn)
									</h2>
									<input
										type="checkbox"
										checked={ogEnabled}
										onChange={(e) =>
											setOgEnabled(e.target.checked)
										}
										className="rounded text-primary focus:ring-primary"
									/>
								</div>
								{ogEnabled && (
									<div className="space-y-3">
										<div className="grid grid-cols-1 md:grid-cols-2 gap-3">
											<div>
												<label className="block text-[11px] font-semibold mb-1">
													OG Title
												</label>
												<input
													type="text"
													className="w-full p-2 rounded-lg border bg-background text-xs focus:ring-1 focus:ring-primary"
													value={ogTitle}
													onChange={(e) =>
														setOgTitle(
															e.target.value,
														)
													}
													placeholder="Defaults to Page Title"
												/>
											</div>
											<div>
												<label className="block text-[11px] font-semibold mb-1">
													OG Share URL
												</label>
												<input
													type="url"
													className="w-full p-2 rounded-lg border bg-background text-xs focus:ring-1 focus:ring-primary"
													value={ogUrl}
													onChange={(e) =>
														setOgUrl(e.target.value)
													}
													placeholder="https://example.com/page"
												/>
											</div>
										</div>
										<div>
											<label className="block text-[11px] font-semibold mb-1">
												OG Image URL
											</label>
											<input
												type="url"
												className="w-full p-2 rounded-lg border bg-background text-xs focus:ring-1 focus:ring-primary"
												value={ogImage}
												onChange={(e) =>
													setOgImage(e.target.value)
												}
												placeholder="https://example.com/og-image.png"
											/>
										</div>
										<div>
											<label className="block text-[11px] font-semibold mb-1">
												OG Description
											</label>
											<textarea
												rows={2}
												className="w-full p-2 rounded-lg border bg-background text-xs focus:ring-1 focus:ring-primary"
												value={ogDescription}
												onChange={(e) =>
													setOgDescription(
														e.target.value,
													)
												}
												placeholder="Defaults to Meta Description"
											/>
										</div>
									</div>
								)}
							</div>

							{/* Twitter Cards */}
							<div className="bg-card border border-border/80 rounded-2xl p-6 shadow-xl space-y-4">
								<div className="flex justify-between items-center border-b border-border/40 pb-2">
									<h2 className="text-lg font-bold">
										Twitter Cards
									</h2>
									<input
										type="checkbox"
										checked={twitterEnabled}
										onChange={(e) =>
											setTwitterEnabled(e.target.checked)
										}
										className="rounded text-primary focus:ring-primary"
									/>
								</div>
								{twitterEnabled && (
									<div className="space-y-3">
										<div className="grid grid-cols-1 md:grid-cols-2 gap-3">
											<div>
												<label className="block text-[11px] font-semibold mb-1">
													Twitter Title
												</label>
												<input
													type="text"
													className="w-full p-2 rounded-lg border bg-background text-xs focus:ring-1 focus:ring-primary"
													value={twitterTitle}
													onChange={(e) =>
														setTwitterTitle(
															e.target.value,
														)
													}
													placeholder="Defaults to Page Title"
												/>
											</div>
											<div>
												<label className="block text-[11px] font-semibold mb-1">
													Card Layout
												</label>
												<select
													className="w-full p-2 rounded-lg border bg-background text-xs focus:ring-1 focus:ring-primary"
													value={twitterCard}
													onChange={(e) =>
														setTwitterCard(
															e.target.value,
														)
													}
												>
													<option value="summary">
														Summary Card (Small
														Image)
													</option>
													<option value="summary_large_image">
														Summary Card (Large
														Image)
													</option>
												</select>
											</div>
										</div>
										<div>
											<label className="block text-[11px] font-semibold mb-1">
												Twitter Image URL
											</label>
											<input
												type="url"
												className="w-full p-2 rounded-lg border bg-background text-xs focus:ring-1 focus:ring-primary"
												value={twitterImage}
												onChange={(e) =>
													setTwitterImage(
														e.target.value,
													)
												}
												placeholder="https://example.com/twitter-image.png"
											/>
										</div>
										<div>
											<label className="block text-[11px] font-semibold mb-1">
												Twitter Description
											</label>
											<textarea
												rows={2}
												className="w-full p-2 rounded-lg border bg-background text-xs focus:ring-1 focus:ring-primary"
												value={twitterDescription}
												onChange={(e) =>
													setTwitterDescription(
														e.target.value,
													)
												}
												placeholder="Defaults to Meta Description"
											/>
										</div>
									</div>
								)}
							</div>
						</div>

						{/* Output Workspace */}
						<div className="lg:col-span-6 bg-card border border-border/80 rounded-2xl p-6 shadow-xl flex flex-col justify-between h-full min-h-125">
							<div className="space-y-4 flex-1 flex flex-col">
								<div className="flex justify-between items-center border-b border-border/40 pb-3">
									<h2 className="text-xl font-bold">
										Generated Meta Blocks
									</h2>
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
												Copy Code
											</>
										)}
									</button>
								</div>

								<div className="flex-1 min-h-100 bg-background border border-border rounded-xl p-4 font-mono text-[11px] overflow-auto select-all whitespace-pre-wrap">
									{generateMetaTags()}
								</div>
							</div>
						</div>
					</div>
				</div>
			</main>
		</>
	);
}
