import { useState } from 'react';
import { NextSeo } from 'next-seo';
import ToolJsonLd from '@/components/seo/ToolJsonLd';
import { Link2, Copy, Check } from 'lucide-react';

const STOP_WORDS = new Set([
	'a',
	'about',
	'above',
	'after',
	'again',
	'against',
	'all',
	'am',
	'an',
	'and',
	'any',
	'are',
	'arent',
	'as',
	'at',
	'be',
	'because',
	'been',
	'before',
	'being',
	'below',
	'between',
	'both',
	'but',
	'by',
	'cant',
	'cannot',
	'could',
	'couldnt',
	'did',
	'didnt',
	'do',
	'does',
	'doesnt',
	'doing',
	'dont',
	'down',
	'during',
	'each',
	'few',
	'for',
	'from',
	'further',
	'had',
	'hadnt',
	'has',
	'hasnt',
	'have',
	'havent',
	'having',
	'he',
	'hed',
	'hell',
	'hes',
	'her',
	'here',
	'heres',
	'hers',
	'herself',
	'him',
	'himself',
	'his',
	'how',
	'hows',
	'i',
	'id',
	'ill',
	'im',
	'ive',
	'if',
	'in',
	'into',
	'is',
	'isnt',
	'it',
	'its',
	'itself',
	'lets',
	'me',
	'more',
	'most',
	'mustnt',
	'my',
	'myself',
	'no',
	'nor',
	'not',
	'of',
	'off',
	'on',
	'once',
	'only',
	'or',
	'other',
	'ought',
	'our',
	'ours',
	'ourselves',
	'out',
	'over',
	'own',
	'same',
	'shant',
	'she',
	'shed',
	'shell',
	'shes',
	'should',
	'shouldnt',
	'so',
	'some',
	'such',
	'than',
	'that',
	'thats',
	'the',
	'their',
	'theirs',
	'them',
	'themselves',
	'then',
	'there',
	'theres',
	'these',
	'they',
	'theyd',
	'theyll',
	'theyre',
	'theyve',
	'this',
	'those',
	'through',
	'to',
	'too',
	'under',
	'until',
	'up',
	'very',
	'was',
	'wasnt',
	'we',
	'wed',
	'well',
	'were',
	'weve',
	'werent',
	'what',
	'whats',
	'when',
	'whens',
	'where',
	'wheres',
	'which',
	'while',
	'who',
	'whos',
	'whom',
	'why',
	'whys',
	'with',
	'wont',
	'would',
	'wouldnt',
	'you',
	'youd',
	'youll',
	'youre',
	'youve',
	'your',
	'yours',
	'yourself',
	'yourselves',
]);

export default function UrlSlugGenerator() {
	const [text, setText] = useState('');
	const [separator, setSeparator] = useState('-');
	const [lowercase, setLowercase] = useState(true);
	const [removeStopwords, setRemoveStopwords] = useState(false);
	const [copied, setCopied] = useState(false);

	const generateSlug = () => {
		if (!text.trim()) return '';

		let processed = text.trim();

		// Replace accented chars
		processed = processed.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

		// Handle casing
		if (lowercase) {
			processed = processed.toLowerCase();
		}

		// Split into words/tokens
		let words = processed.split(/[^a-zA-Z0-9]+/);

		// Filter empty items
		words = words.filter(Boolean);

		// Stopwords removal
		if (removeStopwords) {
			words = words.filter((w) => !STOP_WORDS.has(w.toLowerCase()));
		}

		return words.join(separator);
	};

	const handleCopy = () => {
		navigator.clipboard.writeText(generateSlug());
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	return (
		<>
			<NextSeo
				title="Clean URL Slug Generator | SEO-Friendly Link Formatter - Joey Jazwinski"
				description="Transform titles and headlines into SEO-friendly, clean URL slugs by removing stopwords, stripping special characters, and hyphenating words."
				canonical="https://joeyjazwinski.com/developer-tools/url-slug-generator"
				openGraph={{
					title: "Clean URL Slug Generator | SEO-Friendly Link Formatter - Joey Jazwinski",
					description: "Transform titles and headlines into SEO-friendly, clean URL slugs by removing stopwords, stripping special characters, and hyphenating words.",
					url: "https://joeyjazwinski.com/developer-tools/url-slug-generator",
					type: "website",
					images: [
						{
							url: "https://joeyjazwinski.com/ogimage.png",
							width: 1200,
							height: 630,
							alt: "URL Slug Generator",
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
				name="URL Slug Generator"
				description="Transform titles and headlines into SEO-friendly, clean URL slugs by removing stopwords, stripping special characters, and hyphenating words."
				url="https://joeyjazwinski.com/developer-tools/url-slug-generator"
				category="DeveloperApplication"
			/>
			<main className="min-h-screen bg-background pt-32 pb-16 px-4 sm:px-6 lg:px-8 text-foreground animate-fade-in">
				<div className="max-w-4xl mx-auto space-y-12">
					{/* Header */}
					<div className="text-center space-y-4 max-w-2xl mx-auto">
						<div className="inline-flex p-3 rounded-2xl bg-primary/10 text-primary border border-primary/20">
							<Link2 className="w-8 h-8" />
						</div>
						<h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl bg-linear-to-r from-primary to-cyan-500 bg-clip-text text-transparent">
							URL Slug Generator
						</h1>
						<p className="text-muted-foreground text-lg">
							Form SEO-friendly page slugs. Strip complex
							characters and words for clean permalinks.
						</p>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-12 gap-8">
						{/* Configuration Form */}
						<div className="md:col-span-7 bg-card border border-border/80 rounded-2xl p-6 shadow-xl space-y-5">
							<div>
								<label className="block text-sm font-semibold mb-2">
									Input Title / String
								</label>
								<textarea
									rows={4}
									className="w-full p-3 rounded-xl border bg-background text-sm focus:ring-2 focus:ring-primary focus:outline-none"
									value={text}
									onChange={(e) => setText(e.target.value)}
									placeholder="e.g. 10 Incredible Ways to Boost Your Page SEO!"
								/>
							</div>

							<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-border/40 pt-4">
								<div>
									<label className="block text-xs font-semibold mb-2">
										Separator Character
									</label>
									<div className="flex gap-2">
										{[
											{ label: 'Hyphen (-)', value: '-' },
											{
												label: 'Underscore (_)',
												value: '_',
											},
										].map((item) => (
											<button
												key={item.value}
												type="button"
												onClick={() =>
													setSeparator(item.value)
												}
												className={`flex-1 py-2 rounded-lg text-xs font-semibold border transition ${
													separator === item.value
														? 'bg-primary text-primary-foreground border-transparent'
														: 'bg-background hover:bg-secondary text-muted-foreground'
												}`}
											>
												{item.label}
											</button>
										))}
									</div>
								</div>

								<div className="space-y-3 flex flex-col justify-center">
									<label className="flex items-center gap-2 text-xs font-semibold cursor-pointer">
										<input
											type="checkbox"
											checked={lowercase}
											onChange={(e) =>
												setLowercase(e.target.checked)
											}
											className="rounded text-primary focus:ring-primary"
										/>
										<span>Force Lowercase Slug</span>
									</label>

									<label className="flex items-center gap-2 text-xs font-semibold cursor-pointer">
										<input
											type="checkbox"
											checked={removeStopwords}
											onChange={(e) =>
												setRemoveStopwords(
													e.target.checked,
												)
											}
											className="rounded text-primary focus:ring-primary"
										/>
										<span>
											Strip Common Stopwords (a, an, the,
											etc.)
										</span>
									</label>
								</div>
							</div>
						</div>

						{/* Output Workspace */}
						<div className="md:col-span-5 bg-card border border-border/80 rounded-2xl p-6 shadow-xl flex flex-col justify-between min-h-62.5">
							<div className="space-y-4 flex-1 flex flex-col">
								<div className="flex justify-between items-center border-b border-border/40 pb-2">
									<h2 className="text-base font-bold">
										SEO Friendly Slug
									</h2>
									{generateSlug() && (
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
									)}
								</div>

								<div className="flex-1 flex items-center justify-center min-h-30 bg-background border border-border rounded-xl p-4 font-mono text-sm break-all">
									{generateSlug() || (
										<span className="text-muted-foreground italic text-xs">
											Waiting for input string...
										</span>
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
