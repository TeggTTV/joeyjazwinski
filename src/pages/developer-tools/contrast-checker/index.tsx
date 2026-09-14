import { useState, useEffect, useMemo } from 'react';
import { NextSeo } from 'next-seo';
import ToolJsonLd from '@/components/seo/ToolJsonLd';
import {
	Palette,
	ShieldAlert,
	CheckCircle,
	ArrowLeftRight,
	Wrench,
	Eye,
	Sparkles,
	Check,
} from 'lucide-react';
import {
	getContrastRatio,
	suggestCompliantColor,
	simulateColorblindness,
	ColorblindMode,
} from '@/lib/contrastHelper';

const PRESETS = [
	{ label: 'Dark Sky', fg: '#38BDF8', bg: '#0F172A' },
	{ label: 'Clean Light', fg: '#0F172A', bg: '#F8FAFC' },
	{ label: 'Emerald Deep', fg: '#34D399', bg: '#064E3B' },
	{ label: 'Amber Dark', fg: '#FBBF24', bg: '#18181B' },
	{ label: 'Low Contrast Fix', fg: '#94A3B8', bg: '#FFFFFF' },
];

export default function ContrastChecker() {
	const [foregroundColor, setForegroundColor] = useState('#10B981');
	const [backgroundColor, setBackgroundColor] = useState('#0F172A');
	const [colorblindMode, setColorblindMode] = useState<ColorblindMode>('normal');

	// Swap colors
	const swapColors = () => {
		const temp = foregroundColor;
		setForegroundColor(backgroundColor);
		setBackgroundColor(temp);
	};

	// Simulated colors for preview
	const simFg = useMemo(() => {
		return simulateColorblindness(foregroundColor, colorblindMode);
	}, [foregroundColor, colorblindMode]);

	const simBg = useMemo(() => {
		return simulateColorblindness(backgroundColor, colorblindMode);
	}, [backgroundColor, colorblindMode]);

	// Contrast ratios
	const contrastRatio = useMemo(() => {
		return getContrastRatio(foregroundColor, backgroundColor);
	}, [foregroundColor, backgroundColor]);

	const simContrastRatio = useMemo(() => {
		return getContrastRatio(simFg, simBg);
	}, [simFg, simBg]);

	const passes = useMemo(() => {
		return {
			aaNormal: contrastRatio >= 4.5,
			aaLarge: contrastRatio >= 3.0,
			aaaNormal: contrastRatio >= 7.0,
			aaaLarge: contrastRatio >= 4.5,
		};
	}, [contrastRatio]);

	// Smart Suggestions
	const suggestedAa = useMemo(() => {
		return suggestCompliantColor(foregroundColor, backgroundColor, 4.5);
	}, [foregroundColor, backgroundColor]);

	const suggestedAaa = useMemo(() => {
		return suggestCompliantColor(foregroundColor, backgroundColor, 7.0);
	}, [foregroundColor, backgroundColor]);

	return (
		<>
			<NextSeo
				title="WCAG Color Contrast Checker, Simulator & Suggestion Engine"
				description="Check WCAG 2.1 AA/AAA compliance, simulate Protanopia, Deuteranopia, and Tritanopia color blindness, and auto-generate compliant color suggestions."
				canonical="https://joeyjazwinski.com/developer-tools/contrast-checker"
				openGraph={{
					title: 'WCAG Color Contrast Checker, Simulator & Suggestion Engine',
					description:
						'Check WCAG 2.1 AA/AAA compliance, simulate Protanopia, Deuteranopia, and Tritanopia color blindness, and auto-generate compliant color suggestions.',
					url: 'https://joeyjazwinski.com/developer-tools/contrast-checker',
					type: 'website',
					images: [
						{
							url: 'https://joeyjazwinski.com/ogimage.png',
							width: 1200,
							height: 630,
							alt: 'WCAG Color Contrast Checker',
						},
					],
				}}
				twitter={{
					handle: '@JoeyJazwinski',
					site: '@JoeyJazwinski',
					cardType: 'summary_large_image',
				}}
			/>
			<ToolJsonLd
				name="WCAG Color Contrast Checker"
				description="Check WCAG 2.1 AA/AAA compliance, simulate Protanopia, Deuteranopia, and Tritanopia color blindness, and auto-generate compliant color suggestions."
				url="https://joeyjazwinski.com/developer-tools/contrast-checker"
				category="DesignApplication"
			/>
			<main className="bg-background pt-32 pb-16 px-4 sm:px-6 lg:px-8 text-foreground">
				<div className="max-w-6xl mx-auto space-y-10">
					{/* Header */}
					<div className="text-center space-y-4 max-w-2xl mx-auto">
						<div className="inline-flex p-3 rounded-2xl bg-primary/10 text-primary border border-primary/20">
							<Palette className="w-8 h-8" />
						</div>
						<h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl bg-linear-to-r from-primary to-cyan-500 bg-clip-text text-transparent">
							WCAG Contrast Checker
						</h1>
						<p className="text-muted-foreground text-lg">
							Validate WCAG 2.1 AA &amp; AAA accessibility standards, simulate color blindness,
							and discover auto-adjusted compliant color recommendations.
						</p>
					</div>

					{/* Presets Bar */}
					<div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-card/70 border border-border/80 rounded-2xl backdrop-blur-md">
						<div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground">
							<Sparkles className="w-4 h-4 text-primary" />
							<span>Color Presets:</span>
						</div>
						<div className="flex flex-wrap items-center gap-1.5">
							{PRESETS.map((p) => (
								<button
									key={p.label}
									onClick={() => {
										setForegroundColor(p.fg);
										setBackgroundColor(p.bg);
									}}
									className="flex items-center gap-1.5 px-3 py-1 text-xs rounded-lg bg-secondary hover:bg-secondary/80 border border-border text-foreground transition cursor-pointer"
								>
									<span
										className="w-3 h-3 rounded-full border border-border"
										style={{ backgroundColor: p.fg }}
									/>
									<span
										className="w-3 h-3 rounded-full border border-border -ml-2"
										style={{ backgroundColor: p.bg }}
									/>
									<span className="ml-1 font-medium">{p.label}</span>
								</button>
							))}
						</div>
					</div>

					{/* Layout */}
					<div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
						{/* Left Controls */}
						<div className="lg:col-span-5 bg-card/60 backdrop-blur-xl border border-border/80 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
							<div className="flex justify-between items-center border-b border-border/50 pb-3">
								<h2 className="text-base font-bold">Color Pickers</h2>
								<button
									onClick={swapColors}
									className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-lg bg-secondary hover:bg-secondary/80 border border-border text-muted-foreground hover:text-foreground transition cursor-pointer font-medium"
									title="Swap Foreground and Background"
								>
									<ArrowLeftRight className="w-3 h-3" />
									<span>Swap</span>
								</button>
							</div>

							<div className="space-y-4">
								{/* Foreground input */}
								<div className="space-y-1.5">
									<label htmlFor="fg-color" className="block text-xs font-semibold text-muted-foreground">
										Foreground / Text Color
									</label>
									<div className="flex items-center gap-3">
										<input
											id="fg-color"
											type="color"
											value={foregroundColor}
											onChange={(e) => setForegroundColor(e.target.value)}
											className="w-12 h-12 rounded-xl border border-border cursor-pointer bg-transparent"
										/>
										<input
											type="text"
											value={foregroundColor}
											onChange={(e) => setForegroundColor(e.target.value)}
											className="grow px-4 py-2.5 rounded-xl border border-border bg-background font-mono text-xs uppercase focus:outline-none focus:ring-2 focus:ring-primary transition"
										/>
									</div>
								</div>

								{/* Background input */}
								<div className="space-y-1.5">
									<label htmlFor="bg-color" className="block text-xs font-semibold text-muted-foreground">
										Background Color
									</label>
									<div className="flex items-center gap-3">
										<input
											id="bg-color"
											type="color"
											value={backgroundColor}
											onChange={(e) => setBackgroundColor(e.target.value)}
											className="w-12 h-12 rounded-xl border border-border cursor-pointer bg-transparent"
										/>
										<input
											type="text"
											value={backgroundColor}
											onChange={(e) => setBackgroundColor(e.target.value)}
											className="grow px-4 py-2.5 rounded-xl border border-border bg-background font-mono text-xs uppercase focus:outline-none focus:ring-2 focus:ring-primary transition"
										/>
									</div>
								</div>
							</div>

							{/* Contrast ratio display */}
							<div className="pt-2 space-y-4">
								<div className="text-center p-6 rounded-2xl bg-secondary/40 border border-border/40">
									<span className="text-xs text-muted-foreground uppercase font-bold tracking-wider">
										Contrast Ratio
									</span>
									<span className="block text-5xl font-black mt-2 text-primary font-mono">
										{contrastRatio}:1
									</span>
									<span className="text-xs text-muted-foreground mt-1 block">
										{passes.aaNormal
											? 'Meets WCAG AA standard requirements'
											: 'Fails standard WCAG AA body text contrast'}
									</span>
								</div>
							</div>

							{/* Auto-Suggestion Fix Engine */}
							{(suggestedAa || suggestedAaa) && (
								<div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 space-y-3">
									<div className="flex items-center gap-1.5 text-xs font-bold text-amber-600 dark:text-amber-400">
										<Wrench className="w-3.5 h-3.5" />
										<span>Suggested Accessible Adjustments</span>
									</div>
									<p className="text-[11px] text-muted-foreground">
										One-click fix to shift the text color to the closest passing shade:
									</p>
									<div className="flex flex-col gap-2">
										{suggestedAa && (
											<button
												onClick={() => setForegroundColor(suggestedAa)}
												className="flex items-center justify-between p-2 rounded-lg bg-background border border-border text-xs hover:border-primary transition cursor-pointer"
											>
												<span className="flex items-center gap-2">
													<span
														className="w-3.5 h-3.5 rounded-full border border-border"
														style={{ backgroundColor: suggestedAa }}
													/>
													<span className="font-mono font-bold">{suggestedAa}</span>
													<span className="text-muted-foreground text-[11px]">(AA 4.5:1)</span>
												</span>
												<span className="text-primary font-semibold text-[11px]">Apply Fix</span>
											</button>
										)}
										{suggestedAaa && (
											<button
												onClick={() => setForegroundColor(suggestedAaa)}
												className="flex items-center justify-between p-2 rounded-lg bg-background border border-border text-xs hover:border-primary transition cursor-pointer"
											>
												<span className="flex items-center gap-2">
													<span
														className="w-3.5 h-3.5 rounded-full border border-border"
														style={{ backgroundColor: suggestedAaa }}
													/>
													<span className="font-mono font-bold">{suggestedAaa}</span>
													<span className="text-muted-foreground text-[11px]">(AAA 7.0:1)</span>
												</span>
												<span className="text-primary font-semibold text-[11px]">Apply Fix</span>
											</button>
										)}
									</div>
								</div>
							)}
						</div>

						{/* Right Results & Preview Column */}
						<div className="lg:col-span-7 space-y-6">
							{/* Colorblindness Simulator Bar */}
							<div className="flex flex-wrap items-center justify-between gap-2 p-2 rounded-xl bg-secondary/50 border border-border text-xs">
								<div className="flex items-center gap-1.5 text-muted-foreground font-semibold px-2">
									<Eye className="w-3.5 h-3.5 text-primary" />
									<span>Vision Simulator:</span>
								</div>
								<div className="flex flex-wrap gap-1">
									{(
										[
											{ id: 'normal', label: 'Normal' },
											{ id: 'protanopia', label: 'Red-blind' },
											{ id: 'deuteranopia', label: 'Green-blind' },
											{ id: 'tritanopia', label: 'Blue-blind' },
											{ id: 'achromatopsia', label: 'Monochrome' },
										] as const
									).map((mode) => (
										<button
											key={mode.id}
											onClick={() => setColorblindMode(mode.id)}
											className={`px-2.5 py-1 rounded-lg text-xs font-medium transition cursor-pointer ${
												colorblindMode === mode.id
													? 'bg-primary text-primary-foreground font-semibold shadow-xs'
													: 'hover:bg-secondary text-muted-foreground hover:text-foreground'
											}`}
										>
											{mode.label}
										</button>
									))}
								</div>
							</div>

							{/* Live preview */}
							<div
								className="rounded-2xl p-8 border shadow-xl flex flex-col justify-center min-h-48 transition-all duration-300"
								style={{
									color: simFg,
									backgroundColor: simBg,
									borderColor: simFg + '30',
								}}
							>
								<div className="flex justify-between items-center mb-2">
									<span className="text-xs uppercase font-bold tracking-wider opacity-70">
										{colorblindMode === 'normal'
											? 'Live Text Preview'
											: `Simulated: ${colorblindMode.toUpperCase()}`}
									</span>
									{colorblindMode !== 'normal' && (
										<span className="text-xs font-mono font-bold opacity-80">
											Sim Ratio: {simContrastRatio}:1
										</span>
									)}
								</div>
								<h3 className="text-2xl font-bold mb-2">
									Readable Header Elements
								</h3>
								<p className="text-sm leading-relaxed max-w-xl">
									Standard body copy, paragraphs, and descriptions should satisfy WCAG AA (4.5:1)
									to guarantee comfortable readability across all lighting environments and devices.
								</p>
							</div>

							{/* Verification Checklist */}
							<div className="bg-card/60 backdrop-blur-xl border border-border/80 rounded-2xl p-6 sm:p-8 space-y-4 shadow-xl">
								<h2 className="text-base font-bold border-b border-border/50 pb-2">
									WCAG 2.1 Verification Checklist
								</h2>

								<div className="space-y-3">
									<div className="flex items-center justify-between p-3.5 rounded-xl bg-secondary/30 border border-border/40">
										<div>
											<span className="text-sm font-semibold block text-foreground">
												WCAG AA Large Text (&gt;18pt or bold &gt;14pt)
											</span>
											<span className="text-xs text-muted-foreground">
												Requires contrast ratio of 3.0:1 or higher
											</span>
										</div>
										{passes.aaLarge ? (
											<span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-500 bg-emerald-500/10 px-2.5 py-1 rounded-lg">
												<CheckCircle className="w-4 h-4" /> PASS
											</span>
										) : (
											<span className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-500 bg-rose-500/10 px-2.5 py-1 rounded-lg">
												<ShieldAlert className="w-4 h-4" /> FAIL
											</span>
										)}
									</div>

									<div className="flex items-center justify-between p-3.5 rounded-xl bg-secondary/30 border border-border/40">
										<div>
											<span className="text-sm font-semibold block text-foreground">
												WCAG AA Normal Text (Standard Body Copy)
											</span>
											<span className="text-xs text-muted-foreground">
												Requires contrast ratio of 4.5:1 or higher
											</span>
										</div>
										{passes.aaNormal ? (
											<span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-500 bg-emerald-500/10 px-2.5 py-1 rounded-lg">
												<CheckCircle className="w-4 h-4" /> PASS
											</span>
										) : (
											<span className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-500 bg-rose-500/10 px-2.5 py-1 rounded-lg">
												<ShieldAlert className="w-4 h-4" /> FAIL
											</span>
										)}
									</div>

									<div className="flex items-center justify-between p-3.5 rounded-xl bg-secondary/30 border border-border/40">
										<div>
											<span className="text-sm font-semibold block text-foreground">
												WCAG AAA Large Text
											</span>
											<span className="text-xs text-muted-foreground">
												Requires contrast ratio of 4.5:1 or higher
											</span>
										</div>
										{passes.aaaLarge ? (
											<span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-500 bg-emerald-500/10 px-2.5 py-1 rounded-lg">
												<CheckCircle className="w-4 h-4" /> PASS
											</span>
										) : (
											<span className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-500 bg-rose-500/10 px-2.5 py-1 rounded-lg">
												<ShieldAlert className="w-4 h-4" /> FAIL
											</span>
										)}
									</div>

									<div className="flex items-center justify-between p-3.5 rounded-xl bg-secondary/30 border border-border/40">
										<div>
											<span className="text-sm font-semibold block text-foreground">
												WCAG AAA Normal Text (Maximum Accessibility)
											</span>
											<span className="text-xs text-muted-foreground">
												Requires contrast ratio of 7.0:1 or higher
											</span>
										</div>
										{passes.aaaNormal ? (
											<span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-500 bg-emerald-500/10 px-2.5 py-1 rounded-lg">
												<CheckCircle className="w-4 h-4" /> PASS
											</span>
										) : (
											<span className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-500 bg-rose-500/10 px-2.5 py-1 rounded-lg">
												<ShieldAlert className="w-4 h-4" /> FAIL
											</span>
										)}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</main>
		</>
	);
}
