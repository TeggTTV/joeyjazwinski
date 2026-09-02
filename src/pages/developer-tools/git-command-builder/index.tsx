import { useState } from 'react';
import { NextSeo } from 'next-seo';
import ToolJsonLd from '@/components/seo/ToolJsonLd';
import { GitBranch, Copy, Check } from 'lucide-react';

const gitScenarios = [
	{
		title: 'Undo last commit (keep changes)',
		cmd: 'git reset --soft HEAD~1',
		desc: 'Removes the last commit but leaves your files modified and staged.'
	},
	{
		title: 'Undo last commit (discard changes)',
		cmd: 'git reset --hard HEAD~1',
		desc: 'Completely deletes the last commit and discards all changes. Warning: this cannot be undone!'
	},
	{
		title: 'Rename current branch',
		cmd: 'git branch -m <new-name>',
		desc: 'Renames the branch you are currently on to a new name.'
	},
	{
		title: 'Discard local changes to a file',
		cmd: 'git checkout -- <file-path>',
		desc: 'Reverts changes to a specific file back to the state of the last commit.'
	},
	{
		title: 'Squash last N commits',
		cmd: 'git rebase -i HEAD~<N>',
		desc: 'Opens an interactive rebase screen to combine the last N commits into one.'
	},
	{
		title: 'Force pull to overwrite local branch',
		cmd: 'git fetch origin && git reset --hard origin/<branch-name>',
		desc: 'Overwrites all local changes and commits with the state of the remote branch.'
	}
];

export default function GitCommandBuilder() {
	const [scenario, setScenario] = useState(gitScenarios[0]);
	const [paramN, setParamN] = useState('3');
	const [paramName, setParamName] = useState('feature-branch');
	const [paramFile, setParamFile] = useState('src/index.js');
	const [copied, setCopied] = useState(false);

	const getCommand = () => {
		let cmd = scenario.cmd;
		cmd = cmd.replace('<N>', paramN);
		cmd = cmd.replace('<new-name>', paramName);
		cmd = cmd.replace('<branch-name>', paramName);
		cmd = cmd.replace('<file-path>', paramFile);
		return cmd;
	};

	const handleCopy = () => {
		navigator.clipboard.writeText(getCommand());
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	return (
		<>
			<NextSeo
				title="Interactive Git Command Builder & Cheat Sheet Generator - Joey Jazwinski"
				description="Generate precise Git commands for branching, staging, rebasing, stashing, and cherry-picking with visual dropdown parameter configuration."
				canonical="https://joeyjazwinski.com/developer-tools/git-command-builder"
				openGraph={{
					title: "Interactive Git Command Builder & Cheat Sheet Generator - Joey Jazwinski",
					description: "Generate precise Git commands for branching, staging, rebasing, stashing, and cherry-picking with visual dropdown parameter configuration.",
					url: "https://joeyjazwinski.com/developer-tools/git-command-builder",
					type: "website",
					images: [
						{
							url: "https://joeyjazwinski.com/ogimage.png",
							width: 1200,
							height: 630,
							alt: "Interactive Git Command Builder",
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
				name="Interactive Git Command Builder"
				description="Generate precise Git commands for branching, staging, rebasing, stashing, and cherry-picking with visual dropdown parameter configuration."
				url="https://joeyjazwinski.com/developer-tools/git-command-builder"
				category="DeveloperApplication"
			/>
			<main className="min-h-screen bg-background pt-32 pb-16 px-4 sm:px-6 lg:px-8 text-foreground">
				<div className="max-w-4xl mx-auto space-y-8">
					<div className="text-center space-y-4 max-w-2xl mx-auto">
						<div className="inline-flex p-3 rounded-2xl bg-primary/10 text-primary border border-primary/20">
							<GitBranch className="w-8 h-8" />
						</div>
						<h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl bg-linear-to-r from-primary to-emerald-500 bg-clip-text text-transparent">
							Git Command Builder
						</h1>
						<p className="text-muted-foreground text-lg">
							Choose your Git scenario, adjust parameters, and copy the clean command to your terminal safely.
						</p>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
						<div className="md:col-span-1 space-y-2">
							<h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Select Scenario</h3>
							<div className="space-y-2">
								{gitScenarios.map((s, i) => (
									<button
										key={i}
										onClick={() => setScenario(s)}
										className={`w-full text-left p-3 text-xs rounded-xl border transition ${
											scenario.title === s.title
												? 'bg-primary/10 border-primary text-primary font-semibold'
												: 'bg-card border-border hover:bg-secondary text-muted-foreground hover:text-foreground'
										}`}
									>
										{s.title}
									</button>
								))}
							</div>
						</div>

						<div className="md:col-span-2 space-y-6">
							<div className="bg-card border border-border rounded-2xl p-6 shadow-xl space-y-4">
								<h2 className="text-lg font-bold">Configure Parameters</h2>
								<p className="text-xs text-muted-foreground">{scenario.desc}</p>

								{scenario.cmd.includes('<N>') && (
									<div className="space-y-2">
										<label htmlFor="param-n" className="text-xs font-semibold text-muted-foreground">Number of Commits (N)</label>
										<input
											id="param-n"
											type="number"
											className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm"
											value={paramN}
											onChange={(e) => setParamN(e.target.value)}
										/>
									</div>
								)}

								{(scenario.cmd.includes('<new-name>') || scenario.cmd.includes('<branch-name>')) && (
									<div className="space-y-2">
										<label htmlFor="param-name" className="text-xs font-semibold text-muted-foreground">Branch Name</label>
										<input
											id="param-name"
											type="text"
											className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm"
											value={paramName}
											onChange={(e) => setParamName(e.target.value)}
										/>
									</div>
								)}

								{scenario.cmd.includes('<file-path>') && (
									<div className="space-y-2">
										<label htmlFor="param-file" className="text-xs font-semibold text-muted-foreground">File Path</label>
										<input
											id="param-file"
											type="text"
											className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm"
											value={paramFile}
											onChange={(e) => setParamFile(e.target.value)}
										/>
									</div>
								)}
							</div>

							<div className="bg-card border border-border rounded-2xl p-6 shadow-xl space-y-4">
								<div className="flex justify-between items-center">
									<h2 className="text-lg font-bold">Generated Command</h2>
									<button
										onClick={handleCopy}
										className="p-2 rounded-lg hover:bg-secondary border border-border transition text-muted-foreground"
									>
										{copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
									</button>
								</div>
								<pre className="p-4 rounded-xl border border-border bg-background text-sm font-mono overflow-x-auto text-primary">
									{getCommand()}
								</pre>
							</div>
						</div>
					</div>
				</div>
			</main>
		</>
	);
}