import { useState, useEffect, useMemo, useCallback } from 'react';
import Link from 'next/link';
import { NextSeo } from 'next-seo';
import ToolJsonLd from '@/components/seo/ToolJsonLd';
import ToolFaqSection from '@/components/tools/ToolFaqSection';
import {
	Clock,
	Copy,
	Check,
	Calendar,
	Sparkles,
	Globe,
	Info,
	Sliders,
	Code2,
} from 'lucide-react';
import {
	translateCron,
	calculateNextRuns,
	parseCronExpression,
} from '@/lib/cronHelper';

const CRON_FAQS = [
	{
		question: 'How do standard 5-part cron expressions work?',
		answer:
			'Standard cron syntax consists of five fields: minute (0-59), hour (0-23), day of the month (1-31), month (1-12), and day of the week (0-7, where both 0 and 7 represent Sunday).',
	},
	{
		question: 'What do asterisks and slashes mean in cron?',
		answer:
			'An asterisk (*) represents every possible value. A step slash (e.g. */15) matches values at recurring intervals, such as every 15 minutes.',
	},
	{
		question: 'Can I view upcoming executions in UTC?',
		answer:
			'Yes. Toggle between your browser local timezone and UTC to review accurate scheduled run timestamps across cloud servers and serverless environments.',
	},
];

const PRESETS = [
	{ label: 'Every 5 Mins', cron: '*/5 * * * *' },
	{ label: 'Every 15 Mins', cron: '*/15 * * * *' },
	{ label: 'Hourly on :00', cron: '0 * * * *' },
	{ label: 'Daily at Midnight', cron: '0 0 * * *' },
	{ label: 'Weekdays at 9 AM', cron: '0 9 * * 1-5' },
	{ label: 'Weekly on Sunday', cron: '0 0 * * 0' },
	{ label: 'Monthly on 1st', cron: '0 0 1 * *' },
];

export default function CronVisualizer() {
	const [cronInput, setCronInput] = useState('*/15 9-17 * * 1-5');
	const [useUtc, setUseUtc] = useState(false);
	const [copied, setCopied] = useState(false);

	// Visual Builder states
	const [builderMode, setBuilderMode] = useState<'visual' | 'manual'>('manual');
	const [buildMinute, setBuildMinute] = useState('*/15');
	const [buildHour, setBuildHour] = useState('9-17');
	const [buildDom, setBuildDom] = useState('*');
	const [buildMonth, setBuildMonth] = useState('*');
	const [buildDow, setBuildDow] = useState('1-5');

	// Sync builder to input
	const syncFromBuilder = (m: string, h: string, dom: string, mon: string, dow: string) => {
		const expr = `${m} ${h} ${dom} ${mon} ${dow}`;
		setCronInput(expr);
	};

	const parsedParts = useMemo(() => {
		return parseCronExpression(cronInput);
	}, [cronInput]);

	const description = useMemo(() => {
		return translateCron(cronInput);
	}, [cronInput]);

	const upcomingRuns = useMemo(() => {
		return calculateNextRuns(cronInput, 5, useUtc);
	}, [cronInput, useUtc]);

	const copyCron = () => {
		navigator.clipboard.writeText(cronInput);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	const loadPreset = (expr: string) => {
		setCronInput(expr);
		const parts = parseCronExpression(expr);
		if (parts) {
			setBuildMinute(parts.minute);
			setBuildHour(parts.hour);
			setBuildDom(parts.dayOfMonth);
			setBuildMonth(parts.month);
			setBuildDow(parts.dayOfWeek);
		}
	};

	return (
		<>
			<NextSeo
				title="Cron Expression Visualizer & Schedule Builder - Joey Jazwinski"
				description="Parse cron syntax into plain English, visually build 5-part cron schedules, and inspect upcoming execution timestamps in local time or UTC."
				canonical="https://joeyjazwinski.com/developer-tools/cron-visualizer"
				openGraph={{
					title: 'Cron Expression Visualizer & Schedule Builder - Joey Jazwinski',
					description:
						'Parse cron syntax into plain English, visually build 5-part cron schedules, and inspect upcoming execution timestamps in local time or UTC.',
					url: 'https://joeyjazwinski.com/developer-tools/cron-visualizer',
					type: 'website',
					images: [
						{
							url: 'https://joeyjazwinski.com/ogimage.png',
							width: 1200,
							height: 630,
							alt: 'Cron Expression Visualizer',
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
				name="Cron Expression Visualizer"
				description="Parse cron syntax into plain English, visually build 5-part cron schedules, and inspect upcoming execution timestamps in local time or UTC."
				url="https://joeyjazwinski.com/developer-tools/cron-visualizer"
				category="DeveloperApplication"
				faqs={CRON_FAQS}
			/>
			<main className="bg-background pt-32 pb-16 px-4 sm:px-6 lg:px-8 text-foreground">
				<div className="max-w-5xl mx-auto space-y-10">
					<div className="mb-2">
						<Link
							href="/developer-tools"
							className="inline-flex items-center text-xs font-semibold text-muted-foreground hover:text-primary transition"
						>
							← Back to all developer tools
						</Link>
					</div>

					{/* Header */}
					<div className="text-center space-y-4 max-w-2xl mx-auto">
						<div className="inline-flex p-3 rounded-2xl bg-primary/10 text-primary border border-primary/20">
							<Clock className="w-8 h-8" />
						</div>
						<h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl bg-linear-to-r from-primary to-amber-500 bg-clip-text text-transparent">
							Cron Expression Visualizer
						</h1>
						<p className="text-muted-foreground text-lg">
							Translate cron expressions into human language, build schedules visually, and calculate upcoming runtimes client-side.
						</p>
					</div>

					{/* Presets Bar */}
					<div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-card/70 border border-border/80 rounded-2xl backdrop-blur-md">
						<div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground">
							<Sparkles className="w-4 h-4 text-primary" />
							<span>Quick Presets:</span>
						</div>
						<div className="flex flex-wrap items-center gap-1.5">
							{PRESETS.map((p) => (
								<button
									key={p.label}
									onClick={() => loadPreset(p.cron)}
									className={`px-2.5 py-1 text-xs rounded-lg border transition cursor-pointer ${
										cronInput === p.cron
											? 'bg-primary text-primary-foreground border-primary font-semibold'
											: 'bg-secondary hover:bg-secondary/80 border-border text-foreground'
									}`}
								>
									{p.label}
								</button>
							))}
						</div>
					</div>

					{/* Workspace */}
					<div className="bg-card/60 backdrop-blur-xl border border-border/80 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
						{/* Mode Toggle */}
						<div className="flex justify-between items-center border-b border-border/50 pb-3">
							<div className="inline-flex p-0.5 rounded-xl bg-secondary border border-border">
								<button
									onClick={() => setBuilderMode('manual')}
									className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
										builderMode === 'manual'
											? 'bg-background text-foreground shadow-xs'
											: 'text-muted-foreground hover:text-foreground'
									}`}
								>
									<Code2 className="w-3.5 h-3.5 text-primary" />
									Syntax Editor
								</button>
								<button
									onClick={() => setBuilderMode('visual')}
									className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
										builderMode === 'visual'
											? 'bg-background text-foreground shadow-xs'
											: 'text-muted-foreground hover:text-foreground'
									}`}
								>
									<Sliders className="w-3.5 h-3.5 text-amber-500" />
									Visual Builder
								</button>
							</div>

							<div className="flex items-center gap-2">
								<button
									onClick={copyCron}
									className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-secondary hover:bg-secondary/80 border border-border text-xs font-semibold text-foreground transition cursor-pointer"
								>
									{copied ? (
										<Check className="w-3.5 h-3.5 text-emerald-500" />
									) : (
										<Copy className="w-3.5 h-3.5" />
									)}
									<span>Copy Cron</span>
								</button>
							</div>
						</div>

						{/* Manual Expression Input */}
						{builderMode === 'manual' ? (
							<div className="space-y-4">
								<div className="space-y-1.5">
									<label htmlFor="cron-input-field" className="text-xs font-semibold text-muted-foreground">
										5-Field Cron Expression
									</label>
									<input
										id="cron-input-field"
										type="text"
										value={cronInput}
										onChange={(e) => setCronInput(e.target.value)}
										placeholder="* * * * *"
										className="w-full p-4 rounded-xl border border-border bg-background font-mono text-base sm:text-xl font-bold tracking-widest text-primary focus:outline-none focus:ring-2 focus:ring-primary shadow-inner"
									/>
								</div>

								{/* Field Legend */}
								{parsedParts && (
									<div className="grid grid-cols-5 gap-2 text-center text-xs font-mono">
										<div className="p-2 rounded-lg bg-secondary/50 border border-border">
											<div className="font-bold text-foreground">{parsedParts.minute}</div>
											<div className="text-[10px] text-muted-foreground mt-0.5">Minute (0-59)</div>
										</div>
										<div className="p-2 rounded-lg bg-secondary/50 border border-border">
											<div className="font-bold text-foreground">{parsedParts.hour}</div>
											<div className="text-[10px] text-muted-foreground mt-0.5">Hour (0-23)</div>
										</div>
										<div className="p-2 rounded-lg bg-secondary/50 border border-border">
											<div className="font-bold text-foreground">{parsedParts.dayOfMonth}</div>
											<div className="text-[10px] text-muted-foreground mt-0.5">Day (1-31)</div>
										</div>
										<div className="p-2 rounded-lg bg-secondary/50 border border-border">
											<div className="font-bold text-foreground">{parsedParts.month}</div>
											<div className="text-[10px] text-muted-foreground mt-0.5">Month (1-12)</div>
										</div>
										<div className="p-2 rounded-lg bg-secondary/50 border border-border">
											<div className="font-bold text-foreground">{parsedParts.dayOfWeek}</div>
											<div className="text-[10px] text-muted-foreground mt-0.5">Weekday (0-6)</div>
										</div>
									</div>
								)}
							</div>
						) : (
							/* Visual Builder Panel */
							<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3">
								<div className="space-y-1">
									<label className="text-xs font-semibold text-muted-foreground">Minute</label>
									<select
										value={buildMinute}
										onChange={(e) => {
											setBuildMinute(e.target.value);
											syncFromBuilder(e.target.value, buildHour, buildDom, buildMonth, buildDow);
										}}
										className="w-full p-2.5 rounded-lg border border-border bg-background text-xs font-mono"
									>
										<option value="*">Every minute (*)</option>
										<option value="*/5">Every 5 mins (*/5)</option>
										<option value="*/10">Every 10 mins (*/10)</option>
										<option value="*/15">Every 15 mins (*/15)</option>
										<option value="*/30">Every 30 mins (*/30)</option>
										<option value="0">At :00 (0)</option>
									</select>
								</div>

								<div className="space-y-1">
									<label className="text-xs font-semibold text-muted-foreground">Hour</label>
									<select
										value={buildHour}
										onChange={(e) => {
											setBuildHour(e.target.value);
											syncFromBuilder(buildMinute, e.target.value, buildDom, buildMonth, buildDow);
										}}
										className="w-full p-2.5 rounded-lg border border-border bg-background text-xs font-mono"
									>
										<option value="*">Every hour (*)</option>
										<option value="0">Midnight (0)</option>
										<option value="9">9:00 AM (9)</option>
										<option value="12">Noon (12)</option>
										<option value="17">5:00 PM (17)</option>
										<option value="9-17">Work Hours (9-17)</option>
										<option value="*/2">Every 2 hours (*/2)</option>
									</select>
								</div>

								<div className="space-y-1">
									<label className="text-xs font-semibold text-muted-foreground">Day of Month</label>
									<select
										value={buildDom}
										onChange={(e) => {
											setBuildDom(e.target.value);
											syncFromBuilder(buildMinute, buildHour, e.target.value, buildMonth, buildDow);
										}}
										className="w-full p-2.5 rounded-lg border border-border bg-background text-xs font-mono"
									>
										<option value="*">Every day (*)</option>
										<option value="1">1st of month (1)</option>
										<option value="15">15th of month (15)</option>
										<option value="*/2">Every 2 days (*/2)</option>
									</select>
								</div>

								<div className="space-y-1">
									<label className="text-xs font-semibold text-muted-foreground">Month</label>
									<select
										value={buildMonth}
										onChange={(e) => {
											setBuildMonth(e.target.value);
											syncFromBuilder(buildMinute, buildHour, buildDom, e.target.value, buildDow);
										}}
										className="w-full p-2.5 rounded-lg border border-border bg-background text-xs font-mono"
									>
										<option value="*">Every month (*)</option>
										<option value="1">January (1)</option>
										<option value="6">June (6)</option>
										<option value="12">December (12)</option>
										<option value="*/3">Quarterly (*/3)</option>
									</select>
								</div>

								<div className="space-y-1">
									<label className="text-xs font-semibold text-muted-foreground">Day of Week</label>
									<select
										value={buildDow}
										onChange={(e) => {
											setBuildDow(e.target.value);
											syncFromBuilder(buildMinute, buildHour, buildDom, buildMonth, e.target.value);
										}}
										className="w-full p-2.5 rounded-lg border border-border bg-background text-xs font-mono"
									>
										<option value="*">Every day (*)</option>
										<option value="1-5">Monday - Friday (1-5)</option>
										<option value="0,6">Weekends (0,6)</option>
										<option value="0">Sunday only (0)</option>
										<option value="1">Monday only (1)</option>
									</select>
								</div>
							</div>
						)}

						{/* Human Translation Box */}
						<div className="p-5 rounded-xl bg-linear-to-br from-primary/10 via-primary/5 to-transparent border border-primary/20 space-y-2">
							<div className="text-[11px] uppercase tracking-wider font-mono text-primary font-bold">
								Plain English Schedule
							</div>
							<div className="text-lg sm:text-xl font-extrabold text-foreground">
								&ldquo;{description}&rdquo;
							</div>
						</div>

						{/* Upcoming Runtimes */}
						<div className="space-y-3 pt-2">
							<div className="flex items-center justify-between">
								<h2 className="text-sm font-bold flex items-center gap-2">
									<Calendar className="w-4 h-4 text-emerald-500" />
									Next 5 Execution Timestamps
								</h2>

								<div className="flex items-center gap-1.5 text-xs text-muted-foreground">
									<Globe className="w-3.5 h-3.5" />
									<button
										onClick={() => setUseUtc(false)}
										className={`px-2 py-0.5 rounded transition cursor-pointer ${
											!useUtc
												? 'bg-secondary text-foreground font-semibold'
												: 'hover:text-foreground'
										}`}
									>
										Local
									</button>
									<span>/</span>
									<button
										onClick={() => setUseUtc(true)}
										className={`px-2 py-0.5 rounded transition cursor-pointer ${
											useUtc
												? 'bg-secondary text-foreground font-semibold'
												: 'hover:text-foreground'
										}`}
									>
										UTC
									</button>
								</div>
							</div>

							<div className="divide-y divide-border/60 rounded-xl border border-border overflow-hidden bg-background/50">
								{upcomingRuns.length > 0 ? (
									upcomingRuns.map((date, idx) => (
										<div
											key={idx}
											className="flex items-center justify-between p-3 text-xs font-mono hover:bg-muted/40 transition-colors"
										>
											<div className="flex items-center gap-3">
												<span className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center text-[11px] font-bold text-primary shrink-0">
													{idx + 1}
												</span>
												<span className="text-foreground">
													{useUtc
														? date.toUTCString()
														: date.toLocaleString(undefined, {
																weekday: 'short',
																year: 'numeric',
																month: 'short',
																day: 'numeric',
																hour: '2-digit',
																minute: '2-digit',
																second: '2-digit',
														  })}
												</span>
											</div>
											<span className="text-muted-foreground text-[11px] font-sans">
												{useUtc ? 'UTC' : 'Local Time'}
											</span>
										</div>
									))
								) : (
									<div className="p-4 text-center text-xs text-muted-foreground">
										No upcoming execution dates found within the next 12 months.
									</div>
								)}
							</div>
						</div>
					</div>

					<ToolFaqSection faqs={CRON_FAQS} />
				</div>
			</main>
		</>
	);
}
