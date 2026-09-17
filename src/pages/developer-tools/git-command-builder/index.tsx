import { useState, useMemo } from 'react';
import Link from 'next/link';
import { NextSeo } from 'next-seo';
import ToolJsonLd from '@/components/seo/ToolJsonLd';
import ToolFaqSection from '@/components/tools/ToolFaqSection';
import {
	GitBranch,
	Copy,
	Check,
	AlertTriangle,
	Sparkles,
	Terminal,
	Layers,
} from 'lucide-react';
import { GIT_SCENARIOS, GitScenario } from '@/lib/gitScenarioHelper';
import GitBranchGraph from '@/components/tools/GitBranchGraph';

const GIT_FAQS = [
	{
		question: 'How do I undo the most recent Git commit safely?',
		answer:
			'Run `git reset --soft HEAD~1` to undo the commit while keeping all your changed files staged, or `git reset --hard HEAD~1` to discard all changes completely.',
	},
	{
		question: 'What is the difference between Git merge and Git rebase?',
		answer:
			'Merge creates a new commit joining two histories together, preserving branch context. Rebase rewrites commit history on top of another branch for a linear log.',
	},
	{
		question: 'How do I recover deleted or lost Git commits?',
		answer:
			'Use `git reflog` to view a full history of HEAD movements and locate the lost commit SHA, then run `git branch recover-branch <SHA>`.',
	},
];

export default function GitCommandBuilder() {
	const [selectedCategory, setSelectedCategory] = useState<string>('Undo & Recovery');
	const [scenario, setScenario] = useState<GitScenario>(GIT_SCENARIOS[0]);
	const [paramValues, setParamValues] = useState<Record<string, string>>({
		'<N>': '1',
	});
	const [copied, setCopied] = useState(false);

	const categories = useMemo(() => {
		return Array.from(new Set(GIT_SCENARIOS.map((s) => s.category)));
	}, []);

	const filteredScenarios = useMemo(() => {
		return GIT_SCENARIOS.filter((s) => s.category === selectedCategory);
	}, [selectedCategory]);

	const handleScenarioSelect = (s: GitScenario) => {
		setScenario(s);
		const initialParams: Record<string, string> = {};
		for (const p of s.params) {
			initialParams[p.key] = p.defaultValue;
		}
		setParamValues(initialParams);
	};

	const computedCommand = useMemo(() => {
		let cmd = scenario.cmd;
		for (const [key, val] of Object.entries(paramValues)) {
			cmd = cmd.split(key).join(val || key);
		}
		return cmd;
	}, [scenario, paramValues]);

	const handleCopy = () => {
		navigator.clipboard.writeText(computedCommand);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	return (
		<>
			<NextSeo
				title="Git Command Builder & Scenario Visualizer - Joey Jazwinski"
				description="Generate safe Git commands for undoing commits, interactive rebasing, worktrees, and branch management with interactive visual graph previews."
				canonical="https://joeyjazwinski.com/developer-tools/git-command-builder"
				openGraph={{
					title: 'Git Command Builder & Scenario Visualizer - Joey Jazwinski',
					description:
						'Generate safe Git commands for undoing commits, interactive rebasing, worktrees, and branch management with interactive visual graph previews.',
					url: 'https://joeyjazwinski.com/developer-tools/git-command-builder',
					type: 'website',
					images: [
						{
							url: 'https://joeyjazwinski.com/ogimage.png',
							width: 1200,
							height: 630,
							alt: 'Git Command Builder',
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
				name="Git Command Builder"
				description="Generate safe Git commands for undoing commits, interactive rebasing, worktrees, and branch management with interactive visual graph previews."
				url="https://joeyjazwinski.com/developer-tools/git-command-builder"
				category="DeveloperApplication"
				faqs={GIT_FAQS}
			/>
			<main className="bg-background pt-32 pb-16 px-4 sm:px-6 lg:px-8 text-foreground">
				<div className="max-w-6xl mx-auto space-y-8">
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
							<GitBranch className="w-8 h-8" />
						</div>
						<h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl bg-linear-to-r from-primary via-emerald-500 to-teal-500 bg-clip-text text-transparent">
							Git Command Builder
						</h1>
						<p className="text-muted-foreground text-lg">
							Pick a workflow scenario, customize parameters, inspect branch history graphs, and copy terminal commands safely.
						</p>
					</div>

					{/* Category Tabs */}
					<div className="flex flex-wrap items-center justify-center gap-2 p-1.5 rounded-2xl bg-secondary/60 border border-border max-w-3xl mx-auto">
						{categories.map((cat) => (
							<button
								key={cat}
								onClick={() => {
									setSelectedCategory(cat);
									const firstInCat = GIT_SCENARIOS.find((s) => s.category === cat);
									if (firstInCat) handleScenarioSelect(firstInCat);
								}}
								className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
									selectedCategory === cat
										? 'bg-card text-foreground shadow-sm'
										: 'text-muted-foreground hover:text-foreground'
								}`}
							>
								{cat}
							</button>
						))}
					</div>

					{/* Workspace */}
					<div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
						{/* Left: Scenarios List */}
						<div className="lg:col-span-4 bg-card border border-border rounded-2xl p-4 shadow-xl space-y-2">
							<h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground px-2 py-1">
								{selectedCategory} Scenarios
							</h3>
							<div className="space-y-1.5 max-h-125 overflow-y-auto pr-1">
								{filteredScenarios.map((s) => (
									<button
										key={s.id}
										onClick={() => handleScenarioSelect(s)}
										className={`w-full text-left p-3 rounded-xl border text-xs transition cursor-pointer ${
											scenario.id === s.id
												? 'bg-primary/10 border-primary text-primary font-semibold shadow-xs'
												: 'bg-background hover:bg-secondary/70 border-border text-foreground'
										}`}
									>
										<div className="font-semibold">{s.title}</div>
										<div className="text-[10px] text-muted-foreground font-mono truncate mt-1">
											{s.cmd}
										</div>
									</button>
								))}
							</div>
						</div>

						{/* Right: Parameters & Visual Graph */}
						<div className="lg:col-span-8 space-y-6">
							{/* Configuration card */}
							<div className="bg-card border border-border rounded-2xl p-6 shadow-xl space-y-4">
								<div>
									<h2 className="text-base font-bold text-foreground">
										{scenario.title}
									</h2>
									<p className="text-xs text-muted-foreground mt-1">
										{scenario.desc}
									</p>
								</div>

								{scenario.warning && (
									<div className="flex items-start gap-2 p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-xs text-rose-600 dark:text-rose-400 font-medium">
										<AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
										<span>{scenario.warning}</span>
									</div>
								)}

								{/* Parameters Inputs */}
								{scenario.params.length > 0 && (
									<div className="pt-2 border-t border-border/50 space-y-3">
										<span className="text-xs font-bold uppercase tracking-wider text-muted-foreground block">
											Command Parameters
										</span>
										<div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
											{scenario.params.map((p) => (
												<div key={p.key} className="space-y-1">
													<label className="font-semibold text-foreground">
														{p.label}
													</label>
													<input
														type="text"
														value={paramValues[p.key] || ''}
														placeholder={p.placeholder}
														onChange={(e) =>
															setParamValues({
																...paramValues,
																[p.key]: e.target.value,
															})
														}
														className="w-full px-3 py-2 rounded-lg border border-border bg-background font-mono text-xs focus:ring-1 focus:ring-primary focus:outline-none"
													/>
												</div>
											))}
										</div>
									</div>
								)}

								{/* Branch Graph Visualizer */}
								<div className="pt-2 border-t border-border/50">
									<GitBranchGraph graphType={scenario.graphType} />
								</div>
							</div>

							{/* Generated Command Output */}
							<div className="bg-card border border-border rounded-2xl p-6 shadow-xl space-y-3">
								<div className="flex justify-between items-center pb-2 border-b border-border/50">
									<h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
										<Terminal className="w-3.5 h-3.5 text-primary" />
										Executable Terminal Command
									</h3>

									<button
										onClick={handleCopy}
										className="px-3 py-1.5 rounded-lg bg-primary text-primary-foreground font-semibold text-xs flex items-center gap-1.5 hover:opacity-95 transition cursor-pointer"
									>
										{copied ? (
											<>
												<Check className="w-3.5 h-3.5 text-emerald-300" />
												<span>Copied</span>
											</>
										) : (
											<>
												<Copy className="w-3.5 h-3.5" />
												<span>Copy Command</span>
											</>
										)}
									</button>
								</div>

								<div className="p-4 rounded-xl bg-background border border-border flex items-center gap-3">
									<span className="text-primary font-mono select-none font-bold">$</span>
									<pre className="text-xs font-mono text-foreground overflow-x-auto whitespace-pre-wrap flex-1">
										{computedCommand}
									</pre>
								</div>
							</div>
						</div>
					</div>

					<ToolFaqSection faqs={GIT_FAQS} />
				</div>
			</main>
		</>
	);
}
