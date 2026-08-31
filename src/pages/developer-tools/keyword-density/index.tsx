import { useState } from 'react';
import { NextSeo } from 'next-seo';
import { Sparkles, Copy, Check } from 'lucide-react';

const COMMON_STOPWORDS = new Set([
	'i', 'me', 'my', 'myself', 'we', 'our', 'ours', 'ourselves', 'you', 'your', 'yours', 'yourself', 'yourselves',
	'he', 'him', 'his', 'himself', 'she', 'her', 'hers', 'herself', 'it', 'its', 'itself', 'they', 'them', 'their',
	'theirs', 'themselves', 'what', 'which', 'who', 'whom', 'this', 'that', 'these', 'those', 'am', 'is', 'are', 'was',
	'were', 'be', 'been', 'being', 'have', 'has', 'had', 'having', 'do', 'does', 'did', 'doing', 'a', 'an', 'the',
	'and', 'but', 'if', 'or', 'because', 'as', 'until', 'while', 'of', 'at', 'by', 'for', 'with', 'about', 'against',
	'between', 'into', 'through', 'during', 'before', 'after', 'above', 'below', 'to', 'from', 'up', 'down', 'in',
	'out', 'on', 'off', 'over', 'under', 'again', 'further', 'then', 'once', 'here', 'there', 'when', 'where', 'why',
	'how', 'all', 'any', 'both', 'each', 'few', 'more', 'most', 'other', 'some', 'such', 'no', 'nor', 'not', 'only',
	'own', 'same', 'so', 'than', 'too', 'very', 's', 't', 'can', 'will', 'just', 'don', 'should', 'now'
]);

interface KeywordFreq {
	phrase: string;
	count: number;
	density: number;
}

export default function KeywordDensity() {
	const [text, setText] = useState('');
	const [ignoreStopwords, setIgnoreStopwords] = useState(true);

	const getStats = () => {
		const chars = text.length;
		const charsNoSpaces = text.replace(/\s+/g, '').length;
		const cleanText = text.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?"']/g, '').replace(/\s+/g, ' ').trim();
		const words = cleanText ? cleanText.split(' ') : [];
		const wordCount = words.length;
		const readingTime = Math.ceil(wordCount / 200);

		return { chars, charsNoSpaces, wordCount, readingTime, words };
	};

	const getKeywords = (words: string[]): KeywordFreq[] => {
		if (words.length === 0) return [];

		const freqMap: Record<string, number> = {};
		let totalCounted = 0;

		words.forEach((w) => {
			const cleanWord = w.toLowerCase();
			if (!cleanWord || cleanWord.length < 2) return;
			if (ignoreStopwords && COMMON_STOPWORDS.has(cleanWord)) return;

			freqMap[cleanWord] = (freqMap[cleanWord] || 0) + 1;
			totalCounted++;
		});

		const list = Object.entries(freqMap).map(([phrase, count]) => ({
			phrase,
			count,
			density: totalCounted > 0 ? (count / totalCounted) * 100 : 0,
		}));

		return list.sort((a, b) => b.count - a.count).slice(0, 10);
	};

	const { chars, charsNoSpaces, wordCount, readingTime, words } = getStats();
	const topKeywords = getKeywords(words);

	return (
		<>
			<NextSeo
				title="Keyword Density & Count Analyzer - Joey Jazwinski"
				description="Analyze article word counts, character counts, reading times, and keyword densities client-side. Find content frequency scores instantly."
			/>
			<main className="min-h-screen bg-background pt-32 pb-16 px-4 sm:px-6 lg:px-8 text-foreground animate-fade-in">
				<div className="max-w-6xl mx-auto space-y-12">
					{/* Header */}
					<div className="text-center space-y-4 max-w-2xl mx-auto">
						<div className="inline-flex p-3 rounded-2xl bg-primary/10 text-primary border border-primary/20">
							<Sparkles className="w-8 h-8" />
						</div>
						<h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl bg-linear-to-r from-primary to-indigo-500 bg-clip-text text-transparent">
							Keyword Density Analyzer
						</h1>
						<p className="text-muted-foreground text-lg">
							Audit content relevance and term repetition. Parse character size and reading durations.
						</p>
					</div>

					<div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
						{/* Configuration Form */}
						<div className="lg:col-span-7 bg-card border border-border/80 rounded-2xl p-6 shadow-xl space-y-4">
							<div className="flex justify-between items-center border-b border-border/40 pb-2">
								<h2 className="text-xl font-bold">Input Content Copy</h2>
								<label className="flex items-center gap-2 text-xs font-semibold cursor-pointer">
									<input
										type="checkbox"
										checked={ignoreStopwords}
										onChange={(e) => setIgnoreStopwords(e.target.checked)}
										className="rounded text-primary focus:ring-primary"
									/>
									<span>Strip Common Stopwords</span>
								</label>
							</div>
							<textarea
								rows={12}
								aria-label="Text content for keyword density analysis"
								className="w-full p-4 rounded-xl border bg-background text-sm focus:ring-2 focus:ring-primary focus:outline-none"
								value={text}
								onChange={(e) => setText(e.target.value)}
								placeholder="Paste article, blog post, or copy here to analyze..."
							/>
						</div>

						{/* Density stats view */}
						<div className="lg:col-span-5 space-y-6">
							<div className="bg-card border border-border/80 rounded-2xl p-6 shadow-xl space-y-4">
								<h2 className="text-lg font-bold border-b border-border/40 pb-2">Metrics Summary</h2>
								<div className="grid grid-cols-2 gap-4">
									<div className="p-3 bg-secondary/35 rounded-xl border border-border/40 text-center">
										<span className="block text-2xl font-black text-primary">{wordCount}</span>
										<span className="text-[10px] text-muted-foreground font-semibold">WORDS</span>
									</div>
									<div className="p-3 bg-secondary/35 rounded-xl border border-border/40 text-center">
										<span className="block text-2xl font-black text-primary">{readingTime}m</span>
										<span className="text-[10px] text-muted-foreground font-semibold">READ TIME</span>
									</div>
									<div className="p-3 bg-secondary/35 rounded-xl border border-border/40 text-center">
										<span className="block text-xl font-bold text-foreground/90">{chars}</span>
										<span className="text-[10px] text-muted-foreground font-semibold">CHARS (WITH SPACES)</span>
									</div>
									<div className="p-3 bg-secondary/35 rounded-xl border border-border/40 text-center">
										<span className="block text-xl font-bold text-foreground/90">{charsNoSpaces}</span>
										<span className="text-[10px] text-muted-foreground font-semibold">CHARS (NO SPACES)</span>
									</div>
								</div>
							</div>

							<div className="bg-card border border-border/80 rounded-2xl p-6 shadow-xl">
								<h2 className="text-lg font-bold border-b border-border/40 pb-2 mb-4">Top Keywords Density</h2>
								{topKeywords.length > 0 ? (
									<div className="space-y-3">
										{topKeywords.map((keyword, idx) => (
											<div key={idx} className="space-y-1">
												<div className="flex justify-between text-xs font-semibold">
													<span className="font-mono bg-secondary/50 px-2 py-0.5 rounded">{keyword.phrase}</span>
													<span className="text-muted-foreground">
														{keyword.count}x ({keyword.density.toFixed(1)}%)
													</span>
												</div>
												<div className="w-full bg-secondary/50 h-2 rounded-full overflow-hidden">
													<div
														className="bg-primary h-full rounded-full transition-all"
														style={{ width: `${Math.min(keyword.density * 5, 100)}%` }}
													/>
												</div>
											</div>
										))}
									</div>
								) : (
									<span className="text-xs text-muted-foreground italic">
										Waiting for content copy input...
									</span>
								)}
							</div>
						</div>
					</div>
				</div>
			</main>
		</>
	);
}
