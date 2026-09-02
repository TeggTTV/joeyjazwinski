import React, { useState, useMemo, useRef } from 'react';
import { NextSeo } from 'next-seo';
import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
	FileText,
	Copy,
	Check,
	Trash2,
	Upload,
	Download,
	Sparkles,
	Clock,
	Mic,
	BookOpen,
	BarChart3,
	Target,
	ArrowRight,
	Type,
	AlignLeft,
} from 'lucide-react';

interface MetricCardProps {
	label: string;
	value: string | number;
	subtitle?: string;
	icon: React.ReactNode;
	highlight?: boolean;
}

function MetricCard({ label, value, subtitle, icon, highlight }: MetricCardProps) {
	return (
		<div
			className={`group relative p-1.5 rounded-[1.5rem] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
				highlight
					? 'bg-linear-to-br from-primary/20 via-primary/5 to-transparent border border-primary/30 shadow-[0_8px_30px_rgb(0,0,0,0.06)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.25)]'
					: 'bg-black/3 dark:bg-white/4 border border-black/5 dark:border-white/8 hover:border-black/10 dark:hover:border-white/15'
			}`}
		>
			<div className="h-full bg-card/90 dark:bg-card/70 backdrop-blur-md rounded-[calc(1.5rem-0.375rem)] p-4 sm:p-5 flex flex-col justify-between transition-transform duration-300 group-hover:-translate-y-0.5">
				<div className="flex items-center justify-between gap-2 mb-3">
					<span className="text-[11px] font-mono uppercase tracking-[0.16em] text-muted-foreground font-semibold">
						{label}
					</span>
					<div
						className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors duration-300 ${
							highlight
								? 'bg-primary/15 text-primary'
								: 'bg-secondary text-muted-foreground group-hover:text-foreground'
						}`}
					>
						{icon}
					</div>
				</div>
				<div>
					<motion.div
						key={String(value)}
						initial={{ opacity: 0.5, y: 3 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.25 }}
						className={`text-2xl sm:text-3xl font-black tracking-tight ${
							highlight ? 'text-primary' : 'text-foreground'
						}`}
					>
						{value}
					</motion.div>
					{subtitle && (
						<p className="text-[11px] text-muted-foreground mt-0.5 truncate font-medium">
							{subtitle}
						</p>
					)}
				</div>
			</div>
		</div>
	);
}

const SAMPLE_TEXT = `Modern digital experiences require balance between clarity, rhythm, and purpose. When authors craft technical documentation, essays, or long-form thought leadership, understanding pacing is paramount. 

A concise paragraph of 60 to 90 words keeps readers attentive. By tracking word count, character density, and estimated speaking duration in real time, you can tailor your tone for social channels, keynotes, or comprehensive engineering whitepapers.`;

const TARGET_PRESETS = [
	{ label: 'Social Post', words: 50, chars: 280 },
	{ label: 'Short Essay', words: 500, chars: 3000 },
	{ label: 'Blog Post', words: 1200, chars: 7500 },
	{ label: 'Whitepaper', words: 2500, chars: 15000 },
];

export default function WordCounter() {
	const [text, setText] = useState('');
	const [copied, setCopied] = useState(false);
	const [selectedTarget, setSelectedTarget] = useState<number | null>(null);
	const [customTarget, setCustomTarget] = useState<number>(500);
	const fileInputRef = useRef<HTMLInputElement>(null);

	// Compute metrics accurately
	const stats = useMemo(() => {
		const rawChars = text.length;
		const charsNoSpaces = text.replace(/\s/g, '').length;
		
		// Trim & clean words
		const trimmed = text.trim();
		const wordsArray = trimmed ? trimmed.split(/\s+/).filter(Boolean) : [];
		const wordCount = wordsArray.length;

		// Sentences: match by ., !, ? followed by space or end of string
		const sentences = trimmed
			? (trimmed.match(/[^.!?]+[.!?]+(\s|$)/g) || [trimmed]).filter((s) => s.trim().length > 0)
			: [];
		const sentenceCount = trimmed ? Math.max(1, sentences.length) : 0;

		// Paragraphs: split by 2 or more newlines or single non-empty newlines
		const paragraphs = trimmed
			? trimmed.split(/\n+/).filter((p) => p.trim().length > 0)
			: [];
		const paragraphCount = paragraphs.length;

		// Lines
		const lineCount = text ? text.split('\n').length : 0;

		// Reading time: standard 200 WPM
		const readingMinutes = wordCount > 0 ? Math.ceil((wordCount / 200) * 10) / 10 : 0;
		const readingTimeDisplay =
			readingMinutes < 1
				? `${Math.ceil(readingMinutes * 60)} sec`
				: `${readingMinutes.toFixed(1)} min`;

		// Speaking time: standard 130 WPM
		const speakingMinutes = wordCount > 0 ? Math.ceil((wordCount / 130) * 10) / 10 : 0;
		const speakingTimeDisplay =
			speakingMinutes < 1
				? `${Math.ceil(speakingMinutes * 60)} sec`
				: `${speakingMinutes.toFixed(1)} min`;

		// Average word length
		const avgWordLength =
			wordCount > 0 ? (charsNoSpaces / wordCount).toFixed(1) : '0';

		// Average sentence length
		const avgSentenceWords =
			sentenceCount > 0 && wordCount > 0 ? Math.round(wordCount / sentenceCount) : 0;

		// Flesch Reading Ease approximation
		let totalSyllables = 0;
		wordsArray.forEach((w) => {
			const clean = w.toLowerCase().replace(/[^a-z]/g, '');
			if (!clean) return;
			if (clean.length <= 3) {
				totalSyllables += 1;
				return;
			}
			const syl = clean
				.replace(/(?:[^laeiouy]|ed|es|e)$/, '')
				.replace(/^y/, '')
				.match(/[aeiouy]{1,2}/g);
			totalSyllables += syl ? Math.max(1, syl.length) : 1;
		});

		let readingEase = 100;
		let gradeLevel = 'Easy';
		if (wordCount > 5 && sentenceCount > 0) {
			const asl = wordCount / sentenceCount;
			const asw = totalSyllables / wordCount;
			const score = Math.round(206.835 - 1.015 * asl - 84.6 * asw);
			readingEase = Math.max(0, Math.min(100, score));

			if (readingEase >= 80) gradeLevel = '5th-6th Grade (Very Easy)';
			else if (readingEase >= 70) gradeLevel = '7th Grade (Easy)';
			else if (readingEase >= 60) gradeLevel = '8th-9th Grade (Standard)';
			else if (readingEase >= 50) gradeLevel = '10th-12th Grade (Fairly Difficult)';
			else if (readingEase >= 30) gradeLevel = 'College Level (Difficult)';
			else gradeLevel = 'Post-Graduate (Very Technical)';
		}

		return {
			rawChars,
			charsNoSpaces,
			wordCount,
			sentenceCount,
			paragraphCount,
			lineCount,
			readingTimeDisplay,
			speakingTimeDisplay,
			avgWordLength,
			avgSentenceWords,
			readingEase,
			gradeLevel,
		};
	}, [text]);

	const targetGoal = selectedTarget ?? customTarget;
	const progressPercent = Math.min(
		100,
		targetGoal > 0 ? Math.round((stats.wordCount / targetGoal) * 100) : 0
	);

	const handleCopy = async () => {
		if (!text) return;
		await navigator.clipboard.writeText(text);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	const handleClear = () => {
		setText('');
	};

	const handleLoadSample = () => {
		setText(SAMPLE_TEXT);
	};

	const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;
		const reader = new FileReader();
		reader.onload = (event) => {
			const content = event.target?.result as string;
			if (content) setText(content);
		};
		reader.readAsText(file);
		e.target.value = '';
	};

	const handleDownload = () => {
		if (!text) return;
		const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
		const url = URL.createObjectURL(blob);
		const link = document.createElement('a');
		link.href = url;
		link.download = `document-${stats.wordCount}-words.txt`;
		link.click();
		URL.revokeObjectURL(url);
	};

	// Text Transformation Helpers
	const transformCase = (type: 'upper' | 'lower' | 'title' | 'sentence' | 'clean') => {
		if (!text) return;
		switch (type) {
			case 'upper':
				setText(text.toUpperCase());
				break;
			case 'lower':
				setText(text.toLowerCase());
				break;
			case 'title':
				setText(
					text.replace(
						/\w\S*/g,
						(txt) => txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase()
					)
				);
				break;
			case 'sentence':
				setText(
					text
						.toLowerCase()
						.replace(/(^\s*\w|[.!?]\s*\w)/g, (c) => c.toUpperCase())
				);
				break;
			case 'clean':
				setText(text.replace(/[ \t]+/g, ' ').replace(/\n{3,}/g, '\n\n').trim());
				break;
		}
	};

	const structuredSchema = {
		'@context': 'https://schema.org',
		'@graph': [
			{
				'@type': 'SoftwareApplication',
				name: 'Word & Character Counter',
				operatingSystem: 'Any',
				applicationCategory: 'UtilitiesApplication',
				offers: {
					'@type': 'Offer',
					price: '0',
					priceCurrency: 'USD',
				},
				description:
					'Professional client-side word count, character count, readability checker, reading time estimator, and text formatting tool.',
				url: 'https://joeyjazwinski.com/developer-tools/word-counter',
			},
			{
				'@type': 'BreadcrumbList',
				itemListElement: [
					{
						'@type': 'ListItem',
						position: 1,
						name: 'Home',
						item: 'https://joeyjazwinski.com',
					},
					{
						'@type': 'ListItem',
						position: 2,
						name: 'Developer Tools',
						item: 'https://joeyjazwinski.com/developer-tools',
					},
					{
						'@type': 'ListItem',
						position: 3,
						name: 'Word & Character Counter',
						item: 'https://joeyjazwinski.com/developer-tools/word-counter',
					},
				],
			},
		],
	};

	return (
		<>
			<NextSeo
				title="Word & Character Counter Tool - Joey Jazwinski"
				description="Free real-time word counter, character counter, reading time estimator, and readability index calculator. Analyze documents client-side with zero latency."
				canonical="https://joeyjazwinski.com/developer-tools/word-counter"
				openGraph={{
					title: 'Word & Character Counter Tool - Joey Jazwinski',
					description:
						'Real-time word count, character metrics, reading times, readability analysis, and text transformation tools.',
					url: 'https://joeyjazwinski.com/developer-tools/word-counter',
					type: 'website',
				}}
				twitter={{
					handle: '@joeyjazwinski',
					site: '@joeyjazwinski',
					cardType: 'summary_large_image',
				}}
			/>
			<Head>
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredSchema) }}
				/>
			</Head>

			<main className="min-h-[100dvh] bg-background text-foreground pt-28 pb-20 px-4 sm:px-6 lg:px-8">
				<div className="max-w-7xl mx-auto space-y-10">
					{/* Breadcrumbs */}
					<nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-muted-foreground">
						<Link href="/developer-tools" className="hover:text-foreground transition-colors flex items-center gap-1">
							<AlignLeft className="w-3.5 h-3.5" />
							Developer Tools
						</Link>
						<span>/</span>
						<span className="text-foreground font-medium">Word Counter</span>
					</nav>

					{/* Header Section */}
					<div className="text-center space-y-4 max-w-3xl mx-auto">
						<div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20 text-xs font-mono font-medium tracking-wide">
							<Sparkles className="w-3.5 h-3.5" />
							<span>Real-Time Content Analytics</span>
						</div>
						<h1 className="text-4xl sm:text-5xl font-black tracking-tight bg-linear-to-r from-primary via-indigo-500 to-purple-500 bg-clip-text text-transparent">
							Word & Character Counter
						</h1>
						<p className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
							Accurate, private client-side metrics for essays, articles, and copy. Track characters, sentences, reading duration, and grade level instantly.
						</p>
					</div>

					{/* Primary Metric Highlights Grid */}
					<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
						<MetricCard
							label="Words"
							value={stats.wordCount}
							subtitle={stats.wordCount > 0 ? `${stats.avgWordLength} chars/word` : undefined}
							icon={<FileText className="w-4 h-4" />}
							highlight
						/>
						<MetricCard
							label="Characters"
							value={stats.rawChars}
							subtitle={`${stats.charsNoSpaces} without spaces`}
							icon={<Type className="w-4 h-4" />}
						/>
						<MetricCard
							label="Sentences"
							value={stats.sentenceCount}
							subtitle={stats.sentenceCount > 0 ? `~${stats.avgSentenceWords} words/sentence` : undefined}
							icon={<AlignLeft className="w-4 h-4" />}
						/>
						<MetricCard
							label="Paragraphs"
							value={stats.paragraphCount}
							subtitle={`${stats.lineCount} total lines`}
							icon={<BookOpen className="w-4 h-4" />}
						/>
						<MetricCard
							label="Read Time"
							value={stats.readingTimeDisplay}
							subtitle="At 200 WPM pace"
							icon={<Clock className="w-4 h-4" />}
						/>
						<MetricCard
							label="Speak Time"
							value={stats.speakingTimeDisplay}
							subtitle="At 130 WPM speech"
							icon={<Mic className="w-4 h-4" />}
						/>
					</div>

					{/* Main Workspace Layout */}
					<div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
						{/* Editor Area (8 cols) */}
						<div className="lg:col-span-8 space-y-4">
							{/* Double-Bezel Card Enclosure */}
							<div className="p-1.5 rounded-[2rem] bg-black/4 dark:bg-white/5 border border-black/8 dark:border-white/10 shadow-xl">
								<div className="bg-card rounded-[calc(2rem-0.375rem)] p-4 sm:p-6 space-y-4 border border-border/50">
									{/* Editor Toolbar */}
									<div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/50 pb-3.5">
										<div className="flex items-center gap-2">
											<span className="text-xs font-mono font-semibold text-muted-foreground uppercase tracking-wider">
												Document Editor
											</span>
											{stats.wordCount > 0 && (
												<span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-primary/10 text-primary font-bold">
													{stats.wordCount} words
												</span>
											)}
										</div>

										<div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
											<button
												onClick={handleLoadSample}
												className="px-2.5 py-1.5 rounded-lg text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
												title="Load sample test copy"
											>
												Sample
											</button>
											<input
												type="file"
												ref={fileInputRef}
												onChange={handleFileUpload}
												accept=".txt,.md,.markdown,.json"
												className="hidden"
											/>
											<button
												onClick={() => fileInputRef.current?.click()}
												className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-lg text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors flex items-center gap-1.5"
												title="Upload text or markdown file"
											>
												<Upload className="w-3.5 h-3.5" />
												<span className="hidden sm:inline">Upload</span>
											</button>
											<button
												onClick={handleDownload}
												disabled={!text}
												className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-lg text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-secondary disabled:opacity-40 disabled:pointer-events-none transition-colors flex items-center gap-1.5"
												title="Download text file"
											>
												<Download className="w-3.5 h-3.5" />
												<span className="hidden sm:inline">Export</span>
											</button>
											<button
												onClick={handleCopy}
												disabled={!text}
												className="p-1.5 sm:px-3 sm:py-1.5 rounded-lg text-xs font-semibold bg-secondary hover:bg-secondary/80 text-foreground disabled:opacity-40 disabled:pointer-events-none transition-colors flex items-center gap-1.5"
												title="Copy text to clipboard"
											>
												{copied ? (
													<>
														<Check className="w-3.5 h-3.5 text-emerald-500" />
														<span className="text-emerald-500">Copied</span>
													</>
												) : (
													<>
														<Copy className="w-3.5 h-3.5" />
														<span>Copy</span>
													</>
												)}
											</button>
											<button
												onClick={handleClear}
												disabled={!text}
												className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-lg text-xs font-medium text-rose-500/80 hover:text-rose-600 hover:bg-rose-500/10 disabled:opacity-40 disabled:pointer-events-none transition-colors flex items-center gap-1"
												title="Clear text"
											>
												<Trash2 className="w-3.5 h-3.5" />
												<span className="hidden sm:inline">Clear</span>
											</button>
										</div>
									</div>

									{/* Textarea */}
									<div className="relative">
										<textarea
											rows={14}
											value={text}
											onChange={(e) => setText(e.target.value)}
											placeholder="Paste or type your text here to begin instant word, character, and readability analysis..."
											aria-label="Text content for word count analysis"
											className="w-full p-4 rounded-xl border border-border/80 bg-background/80 text-foreground placeholder:text-muted-foreground/60 text-sm leading-relaxed resize-y focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all font-sans"
										/>
									</div>

									{/* Quick Format Action Toolbar */}
									<div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-border/40 text-xs">
										<span className="text-muted-foreground font-mono text-[11px]">Transform:</span>
										<div className="flex flex-wrap items-center gap-1.5">
											<button
												onClick={() => transformCase('upper')}
												disabled={!text}
												className="px-2 py-1 rounded-md bg-secondary/60 hover:bg-secondary text-foreground text-[11px] font-semibold disabled:opacity-40 transition-colors"
											>
												UPPERCASE
											</button>
											<button
												onClick={() => transformCase('lower')}
												disabled={!text}
												className="px-2 py-1 rounded-md bg-secondary/60 hover:bg-secondary text-foreground text-[11px] font-semibold disabled:opacity-40 transition-colors"
											>
												lowercase
											</button>
											<button
												onClick={() => transformCase('title')}
												disabled={!text}
												className="px-2 py-1 rounded-md bg-secondary/60 hover:bg-secondary text-foreground text-[11px] font-semibold disabled:opacity-40 transition-colors"
											>
												Title Case
											</button>
											<button
												onClick={() => transformCase('sentence')}
												disabled={!text}
												className="px-2 py-1 rounded-md bg-secondary/60 hover:bg-secondary text-foreground text-[11px] font-semibold disabled:opacity-40 transition-colors"
											>
												Sentence case
											</button>
											<button
												onClick={() => transformCase('clean')}
												disabled={!text}
												className="px-2 py-1 rounded-md bg-secondary/60 hover:bg-secondary text-foreground text-[11px] font-semibold disabled:opacity-40 transition-colors"
											>
												Trim Spaces
											</button>
										</div>
									</div>
								</div>
							</div>
						</div>

						{/* Analytics & Goal Sidebar (4 cols) */}
						<div className="lg:col-span-4 space-y-6">
							{/* Target Progress Card */}
							<div className="p-1.5 rounded-[2rem] bg-black/4 dark:bg-white/5 border border-black/8 dark:border-white/10 shadow-lg">
								<div className="bg-card rounded-[calc(2rem-0.375rem)] p-5 space-y-4 border border-border/50">
									<div className="flex items-center justify-between border-b border-border/40 pb-2.5">
										<div className="flex items-center gap-2">
											<Target className="w-4 h-4 text-primary" />
											<h2 className="text-sm font-bold tracking-tight">Writing Target</h2>
										</div>
										<span className="text-xs font-mono font-bold text-primary">
											{progressPercent}%
										</span>
									</div>

									{/* Progress bar */}
									<div className="space-y-1.5">
										<div className="flex justify-between text-xs font-medium text-muted-foreground">
											<span>{stats.wordCount} words written</span>
											<span>Goal: {targetGoal}</span>
										</div>
										<div className="w-full bg-secondary h-2.5 rounded-full overflow-hidden p-0.5">
											<motion.div
												className="bg-linear-to-r from-primary to-indigo-500 h-full rounded-full transition-all duration-300"
												style={{ width: `${progressPercent}%` }}
											/>
										</div>
									</div>

									{/* Target Presets */}
									<div className="space-y-2 pt-1">
										<span className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground font-semibold">
											Presets
										</span>
										<div className="grid grid-cols-2 gap-2">
											{TARGET_PRESETS.map((preset) => (
												<button
													key={preset.label}
													onClick={() => {
														setSelectedTarget(preset.words);
														setCustomTarget(preset.words);
													}}
													className={`p-2 rounded-xl text-left border text-xs transition-all ${
														targetGoal === preset.words
															? 'bg-primary/10 border-primary text-primary font-bold'
															: 'bg-background hover:bg-secondary border-border/70 text-foreground'
													}`}
												>
													<div className="font-semibold truncate">{preset.label}</div>
													<div className="text-[10px] text-muted-foreground font-mono">
														{preset.words} words
													</div>
												</button>
											))}
										</div>
									</div>
								</div>
							</div>

							{/* Readability & Content Health */}
							<div className="p-1.5 rounded-[2rem] bg-black/4 dark:bg-white/5 border border-black/8 dark:border-white/10 shadow-lg">
								<div className="bg-card rounded-[calc(2rem-0.375rem)] p-5 space-y-4 border border-border/50">
									<div className="flex items-center justify-between border-b border-border/40 pb-2.5">
										<div className="flex items-center gap-2">
											<BarChart3 className="w-4 h-4 text-primary" />
											<h2 className="text-sm font-bold tracking-tight">Readability Score</h2>
										</div>
										<span className="text-xs font-mono font-bold text-primary">
											{stats.readingEase}/100
										</span>
									</div>

									<div className="space-y-3">
										<div className="p-3 bg-secondary/40 rounded-xl border border-border/50">
											<div className="text-xs text-muted-foreground font-medium">Estimated Reading Level</div>
											<div className="text-sm font-bold text-foreground mt-0.5">
												{stats.gradeLevel}
											</div>
										</div>

										<div className="grid grid-cols-2 gap-2 text-xs">
											<div className="p-2.5 bg-secondary/30 rounded-xl border border-border/40">
												<span className="block text-muted-foreground text-[10px] font-mono">AVG WORD LENGTH</span>
												<span className="text-base font-bold text-foreground">
													{stats.avgWordLength} <span className="text-xs font-normal text-muted-foreground">chars</span>
												</span>
											</div>
											<div className="p-2.5 bg-secondary/30 rounded-xl border border-border/40">
												<span className="block text-muted-foreground text-[10px] font-mono">AVG SENTENCE</span>
												<span className="text-base font-bold text-foreground">
													{stats.avgSentenceWords} <span className="text-xs font-normal text-muted-foreground">words</span>
												</span>
											</div>
										</div>
									</div>
								</div>
							</div>

							{/* Related Tool Link */}
							<div className="p-4 rounded-2xl bg-secondary/30 border border-border/60 flex items-center justify-between gap-3">
								<div className="space-y-0.5">
									<div className="text-xs font-bold text-foreground">Looking for Term Frequency?</div>
									<div className="text-[11px] text-muted-foreground">Check the Keyword Density Analyzer</div>
								</div>
								<Link
									href="/developer-tools/keyword-density"
									className="px-3 py-1.5 rounded-xl bg-primary/10 hover:bg-primary/20 text-primary text-xs font-semibold flex items-center gap-1 transition-colors shrink-0"
								>
									<span>View</span>
									<ArrowRight className="w-3.5 h-3.5" />
								</Link>
							</div>
						</div>
					</div>

					{/* FAQ & Information Section (SEO Rich Content) */}
					<div className="pt-10 border-t border-border/40 space-y-6">
						<div className="text-center space-y-2 max-w-2xl mx-auto">
							<h2 className="text-2xl font-black tracking-tight">Frequently Asked Questions</h2>
							<p className="text-sm text-muted-foreground">
								Everything you need to know about word counts, reading speeds, and content limits.
							</p>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
							<div className="p-5 rounded-2xl bg-card border border-border/70 space-y-2">
								<h3 className="text-sm font-bold text-foreground">How are reading and speaking times calculated?</h3>
								<p className="text-xs text-muted-foreground leading-relaxed">
									Reading duration assumes an average adult silent reading speed of 200 words per minute (WPM). Speaking duration is computed at a standard keynote presentation cadence of 130 WPM.
								</p>
							</div>
							<div className="p-5 rounded-2xl bg-card border border-border/70 space-y-2">
								<h3 className="text-sm font-bold text-foreground">Is my typed document text kept private?</h3>
								<p className="text-xs text-muted-foreground leading-relaxed">
									Yes. All character parsing, syllable counting, and text manipulations execute 100% locally in your browser. Zero text data is ever stored, uploaded, or transmitted to any server.
								</p>
							</div>
							<div className="p-5 rounded-2xl bg-card border border-border/70 space-y-2">
								<h3 className="text-sm font-bold text-foreground">What is the Flesch Reading Ease score?</h3>
								<p className="text-xs text-muted-foreground leading-relaxed">
									The Flesch Reading Ease test measures text readability from 0 to 100. Higher scores (60-100) denote easily understood conversational copy, while lower scores (0-50) reflect complex academic or technical prose.
								</p>
							</div>
							<div className="p-5 rounded-2xl bg-card border border-border/70 space-y-2">
								<h3 className="text-sm font-bold text-foreground">What are standard character limits for social media?</h3>
								<p className="text-xs text-muted-foreground leading-relaxed">
									Twitter/X posts support 280 characters. LinkedIn posts recommend 1,000 to 3,000 characters for optimal algorithmic engagement. Meta descriptions for SEO should remain under 160 characters.
								</p>
							</div>
						</div>
					</div>
				</div>
			</main>
		</>
	);
}
