import { useState, useEffect } from 'react';
import { NextSeo } from 'next-seo';
import { Palette, ShieldAlert, CheckCircle } from 'lucide-react';

export default function ContrastChecker() {
	const [foregroundColor, setForegroundColor] = useState('#10B981');
	const [backgroundColor, setBackgroundColor] = useState('#0F172A');
	const [contrastRatio, setContrastRatio] = useState(0);
	const [passes, setPasses] = useState({
		aaNormal: false,
		aaLarge: false,
		aaaNormal: false,
		aaaLarge: false,
	});

	// Relative luminance calculation helper
	const getLuminance = (hex: string) => {
		const cleanHex = hex.replace('#', '');
		const r = parseInt(cleanHex.substring(0, 2), 16) / 255;
		const g = parseInt(cleanHex.substring(2, 4), 16) / 255;
		const b = parseInt(cleanHex.substring(4, 6), 16) / 255;

		const a = [r, g, b].map((v) => {
			return v <= 0.03928
				? v / 12.92
				: Math.pow((v + 0.055) / 1.055, 2.4);
		});

		return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
	};

	useEffect(() => {
		try {
			const lum1 = getLuminance(foregroundColor);
			const lum2 = getLuminance(backgroundColor);

			const brightest = Math.max(lum1, lum2);
			const darkest = Math.min(lum1, lum2);
			const ratio = (brightest + 0.05) / (darkest + 0.05);

			setContrastRatio(parseFloat(ratio.toFixed(2)));

			setPasses({
				aaNormal: ratio >= 4.5,
				aaLarge: ratio >= 3.0,
				aaaNormal: ratio >= 7.0,
				aaaLarge: ratio >= 4.5,
			});
		} catch (e) {
			// Fail-safe default
		}
	}, [foregroundColor, backgroundColor]);

	return (
		<>
			<NextSeo
				title="WCAG Color Contrast Checker - Joey Jazwinski"
				description="Check foreground and background color combinations for accessibility contrast ratio according to WCAG requirements."
			/>
			<main className="min-h-screen bg-background pt-32 pb-16 px-4 sm:px-6 lg:px-8 text-foreground">
				<div className="max-w-6xl mx-auto space-y-12">
					{/* Header */}
					<div className="text-center space-y-4 max-w-2xl mx-auto">
						<div className="inline-flex p-3 rounded-2xl bg-primary/10 text-primary border border-primary/20">
							<Palette className="w-8 h-8" />
						</div>
						<h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl bg-linear-to-r from-primary to-cyan-500 bg-clip-text text-transparent">
							WCAG Contrast Checker
						</h1>
						<p className="text-muted-foreground text-lg">
							Ensure web design accessibility. Compare relative
							luminance values of colors to satisfy WCAG AA & AAA
							readability rules.
						</p>
					</div>

					{/* Layout */}
					<div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
						{/* Configuration and Controls */}
						<div className="lg:col-span-5 bg-card/60 backdrop-blur-xl border border-border/80 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
							<h2 className="text-xl font-bold border-b border-border/50 pb-3">
								Color Selections
							</h2>

							<div className="space-y-4">
								{/* Foreground input */}
								<div className="space-y-1.5">
									<label
										htmlFor="fg-color"
										className="block text-sm font-semibold text-muted-foreground"
									>
										Foreground Color
									</label>
									<div className="flex items-center gap-3">
										<input
											id="fg-color"
											type="color"
											value={foregroundColor}
											onChange={(e) =>
												setForegroundColor(
													e.target.value,
												)
											}
											className="w-12 h-12 rounded-xl border border-border cursor-pointer bg-transparent"
										/>
										<input
											type="text"
											value={foregroundColor}
											onChange={(e) =>
												setForegroundColor(
													e.target.value,
												)
											}
											className="grow px-4 py-2.5 rounded-xl border border-border bg-background font-mono text-sm uppercase focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
										/>
									</div>
								</div>

								{/* Background input */}
								<div className="space-y-1.5">
									<label
										htmlFor="bg-color"
										className="block text-sm font-semibold text-muted-foreground"
									>
										Background Color
									</label>
									<div className="flex items-center gap-3">
										<input
											id="bg-color"
											type="color"
											value={backgroundColor}
											onChange={(e) =>
												setBackgroundColor(
													e.target.value,
												)
											}
											className="w-12 h-12 rounded-xl border border-border cursor-pointer bg-transparent"
										/>
										<input
											type="text"
											value={backgroundColor}
											onChange={(e) =>
												setBackgroundColor(
													e.target.value,
												)
											}
											className="grow px-4 py-2.5 rounded-xl border border-border bg-background font-mono text-sm uppercase focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
										/>
									</div>
								</div>
							</div>

							{/* Compliance score */}
							<div className="pt-4 border-t border-border/50 space-y-4">
								<div className="text-center p-6 rounded-2xl bg-secondary/40 border border-border/40">
									<span className="text-xs text-muted-foreground uppercase font-bold tracking-wider">
										Contrast Ratio
									</span>
									<span className="block text-5xl font-black mt-2 text-primary">
										{contrastRatio}:1
									</span>
								</div>
							</div>
						</div>

						{/* Results & Preview Column */}
						<div className="lg:col-span-7 space-y-6">
							{/* Live preview */}
							<div
								className="rounded-2xl p-8 border shadow-xl flex flex-col justify-center min-h-40 transition-all duration-300"
								style={{
									color: foregroundColor,
									backgroundColor: backgroundColor,
									borderColor: foregroundColor + '30',
								}}
							>
								<span className="text-xs uppercase font-bold tracking-wider opacity-60 mb-2">
									Live Text Preview
								</span>
								<h3 className="text-2xl font-bold mb-2">
									Lorem Ipsum Title (Large Text)
								</h3>
								<p className="text-sm">
									This is a live preview paragraph for
									normal-sized text. Standard web components
									like body text, descriptions, and lists must
									meet 4.5:1 ratio contrast goals under
									standard guidelines.
								</p>
							</div>

							{/* Checklist */}
							<div className="bg-card/60 backdrop-blur-xl border border-border/80 rounded-2xl p-6 sm:p-8 space-y-4 shadow-xl">
								<h2 className="text-lg font-bold border-b border-border/50 pb-2">
									WCAG Verification Checklist
								</h2>

								<div className="space-y-3">
									<div className="flex items-center justify-between p-3 rounded-xl bg-secondary/30 border border-border/40">
										<div>
											<span className="text-sm font-semibold block">
												WCAG AA Large Text
											</span>
											<span className="text-xs text-muted-foreground">
												Requires contrast ratio of 3.0:1
												or higher
											</span>
										</div>
										{passes.aaLarge ? (
											<span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-500">
												<CheckCircle className="w-5 h-5" />{' '}
												PASS
											</span>
										) : (
											<span className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-500">
												<ShieldAlert className="w-5 h-5" />{' '}
												FAIL
											</span>
										)}
									</div>

									<div className="flex items-center justify-between p-3 rounded-xl bg-secondary/30 border border-border/40">
										<div>
											<span className="text-sm font-semibold block">
												WCAG AA Normal Text
											</span>
											<span className="text-xs text-muted-foreground">
												Requires contrast ratio of 4.5:1
												or higher
											</span>
										</div>
										{passes.aaNormal ? (
											<span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-500">
												<CheckCircle className="w-5 h-5" />{' '}
												PASS
											</span>
										) : (
											<span className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-500">
												<ShieldAlert className="w-5 h-5" />{' '}
												FAIL
											</span>
										)}
									</div>

									<div className="flex items-center justify-between p-3 rounded-xl bg-secondary/30 border border-border/40">
										<div>
											<span className="text-sm font-semibold block">
												WCAG AAA Large Text
											</span>
											<span className="text-xs text-muted-foreground">
												Requires contrast ratio of 4.5:1
												or higher
											</span>
										</div>
										{passes.aaaLarge ? (
											<span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-500">
												<CheckCircle className="w-5 h-5" />{' '}
												PASS
											</span>
										) : (
											<span className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-500">
												<ShieldAlert className="w-5 h-5" />{' '}
												FAIL
											</span>
										)}
									</div>

									<div className="flex items-center justify-between p-3 rounded-xl bg-secondary/30 border border-border/40">
										<div>
											<span className="text-sm font-semibold block">
												WCAG AAA Normal Text
											</span>
											<span className="text-xs text-muted-foreground">
												Requires contrast ratio of 7.0:1
												or higher
											</span>
										</div>
										{passes.aaaNormal ? (
											<span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-500">
												<CheckCircle className="w-5 h-5" />{' '}
												PASS
											</span>
										) : (
											<span className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-500">
												<ShieldAlert className="w-5 h-5" />{' '}
												FAIL
											</span>
										)}
									</div>
								</div>
							</div>
						</div>
					</div>

					{/* Explainer / Guide for SEO */}
					<div className="bg-card/40 border border-border/60 rounded-2xl p-8 space-y-6 mt-12">
						<h2 className="text-2xl font-bold text-foreground">Understanding Web Accessibility & Contrast Ratios</h2>
						<p className="text-sm text-muted-foreground leading-relaxed">
							Web accessibility is a core aspect of modern site engineering, ensuring content is usable and readable for people with visual impairments, color blindness, or situational reading challenges. Contrast ratio checks verify the brightness difference between the text color (foreground) and the behind element background container.
						</p>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
							<div className="space-y-2">
								<h3 className="text-base font-semibold text-foreground">WCAG AA vs. AAA Standards</h3>
								<p className="text-xs text-muted-foreground leading-relaxed">
									The Web Content Accessibility Guidelines (WCAG) specify two levels of contrast verification: AA and AAA. Level AA represents the standard requirement for most web pages, requiring a 4.5:1 ratio for normal body text and 3:1 for large headers. Level AAA represents the highest accessibility goal, demanding a 7:1 ratio for body copy and 4.5:1 for headers.
								</p>
							</div>
							<div className="space-y-2">
								<h3 className="text-base font-semibold text-foreground">Relative Luminance Calculation</h3>
								<p className="text-xs text-muted-foreground leading-relaxed">
									Luminance values represent the perceived brightness of a color relative to pure white. It is calculated by normalizing sRGB channels and weighing them according to human spectral sensitivity (green contributes most, blue least). The contrast ratio is then defined as `(L1 + 0.05) / (L2 + 0.05)`, yielding a score from 1:1 (no contrast) up to 21:1 (maximum contrast).
								</p>
							</div>
						</div>
					</div>
				</div>
			</main>
		</>
	);
}
