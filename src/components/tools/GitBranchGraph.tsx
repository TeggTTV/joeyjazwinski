import React from 'react';

interface GitBranchGraphProps {
	graphType: 'undo_soft' | 'undo_hard' | 'branch_create' | 'rebase' | 'worktree' | 'submodule' | 'cherry_pick';
}

export default function GitBranchGraph({ graphType }: GitBranchGraphProps) {
	return (
		<div className="p-4 rounded-xl border border-border bg-background/80 flex flex-col items-center justify-center min-h-40 overflow-hidden">
			<div className="w-full flex items-center justify-between text-[11px] font-mono text-muted-foreground pb-2 border-b border-border/40 mb-3">
				<span className="font-semibold text-foreground">Visual History Graph</span>
				<span>{graphType.replace('_', ' ').toUpperCase()}</span>
			</div>

			<svg viewBox="0 0 480 120" className="w-full max-w-md h-auto select-none" xmlns="http://www.w3.org/2000/svg">
				{/* Background Grid Accent */}
				<defs>
					<linearGradient id="gitGrad" x1="0%" y1="0%" x2="100%" y2="0%">
						<stop offset="0%" stopColor="#3b82f6" />
						<stop offset="100%" stopColor="#10b981" />
					</linearGradient>
				</defs>

				{/* Graphs based on graphType */}
				{graphType === 'undo_soft' && (
					<g>
						{/* Main trunk line */}
						<line x1="50" y1="60" x2="350" y2="60" stroke="currentColor" strokeWidth="3" className="text-border" />
						{/* C1 */}
						<circle cx="80" cy="60" r="14" className="fill-card stroke-primary stroke-2" />
						<text x="80" y="64" textAnchor="middle" className="text-[10px] font-mono fill-foreground font-bold">C1</text>
						{/* C2 (New HEAD) */}
						<circle cx="200" cy="60" r="16" className="fill-primary stroke-background stroke-2" />
						<text x="200" y="64" textAnchor="middle" className="text-[10px] font-mono fill-primary-foreground font-bold">HEAD</text>
						{/* C3 (Undone commit, preserved changes) */}
						<circle cx="320" cy="60" r="14" strokeDasharray="3 3" className="fill-amber-500/20 stroke-amber-500 stroke-2" />
						<text x="320" y="64" textAnchor="middle" className="text-[9px] font-mono fill-amber-500 font-bold">STAGED</text>
						{/* Arrow showing rollback */}
						<path d="M 305 40 Q 260 20 215 40" fill="none" stroke="#f59e0b" strokeWidth="2" strokeDasharray="4 2" />
						<polygon points="215,40 223,34 223,43" fill="#f59e0b" />
						<text x="260" y="25" textAnchor="middle" className="text-[9px] font-mono fill-amber-500 font-bold">soft reset</text>
					</g>
				)}

				{graphType === 'undo_hard' && (
					<g>
						<line x1="50" y1="60" x2="350" y2="60" stroke="currentColor" strokeWidth="3" className="text-border" />
						<circle cx="80" cy="60" r="14" className="fill-card stroke-primary stroke-2" />
						<text x="80" y="64" textAnchor="middle" className="text-[10px] font-mono fill-foreground font-bold">C1</text>
						{/* C2 (HEAD) */}
						<circle cx="200" cy="60" r="16" className="fill-emerald-500 stroke-background stroke-2" />
						<text x="200" y="64" textAnchor="middle" className="text-[10px] font-mono fill-white font-bold">HEAD</text>
						{/* Discarded C3 */}
						<circle cx="320" cy="60" r="14" className="fill-rose-500/20 stroke-rose-500 stroke-2" />
						<line x1="310" y1="50" x2="330" y2="70" stroke="#f43f5e" strokeWidth="2" />
						<line x1="330" y1="50" x2="310" y2="70" stroke="#f43f5e" strokeWidth="2" />
						<text x="320" y="90" textAnchor="middle" className="text-[9px] font-mono fill-rose-500 font-bold">DISCARDED</text>
					</g>
				)}

				{graphType === 'branch_create' && (
					<g>
						{/* Main line */}
						<line x1="50" y1="75" x2="380" y2="75" stroke="currentColor" strokeWidth="3" className="text-border" />
						<circle cx="90" cy="75" r="12" className="fill-card stroke-primary stroke-2" />
						<text x="90" y="79" textAnchor="middle" className="text-[10px] font-mono fill-foreground font-bold">C1</text>
						<circle cx="200" cy="75" r="12" className="fill-card stroke-primary stroke-2" />
						<text x="200" y="79" textAnchor="middle" className="text-[10px] font-mono fill-foreground font-bold">C2</text>
						{/* Fork path */}
						<path d="M 200 75 C 240 75, 240 35, 280 35 L 380 35" fill="none" stroke="#3b82f6" strokeWidth="2.5" />
						<circle cx="320" cy="35" r="14" className="fill-primary stroke-background stroke-2" />
						<text x="320" y="39" textAnchor="middle" className="text-[9px] font-mono fill-primary-foreground font-bold">NEW</text>
						{/* Branch labels */}
						<rect x="345" y="65" width="55" height="18" rx="4" className="fill-secondary stroke-border" />
						<text x="372" y="78" textAnchor="middle" className="text-[9px] font-mono fill-muted-foreground font-bold">main</text>
						<rect x="345" y="25" width="60" height="18" rx="4" className="fill-primary/20 stroke-primary/50" />
						<text x="375" y="38" textAnchor="middle" className="text-[9px] font-mono fill-primary font-bold">feature</text>
					</g>
				)}

				{graphType === 'rebase' && (
					<g>
						{/* Base line */}
						<line x1="50" y1="80" x2="380" y2="80" stroke="currentColor" strokeWidth="3" className="text-border" />
						<circle cx="90" cy="80" r="12" className="fill-card stroke-border stroke-2" />
						<text x="90" y="84" textAnchor="middle" className="text-[9px] font-mono fill-muted-foreground">C1</text>
						<circle cx="200" cy="80" r="12" className="fill-card stroke-border stroke-2" />
						<text x="200" y="84" textAnchor="middle" className="text-[9px] font-mono fill-muted-foreground">C2</text>
						{/* New rebased linear commits */}
						<circle cx="280" cy="80" r="14" className="fill-emerald-500 stroke-background stroke-2" />
						<text x="280" y="84" textAnchor="middle" className="text-[9px] font-mono fill-white font-bold">C3&apos;</text>
						<circle cx="360" cy="80" r="14" className="fill-emerald-500 stroke-background stroke-2" />
						<text x="360" y="84" textAnchor="middle" className="text-[9px] font-mono fill-white font-bold">C4&apos;</text>
						{/* Ghost old commits */}
						<path d="M 90 80 C 130 80, 130 35, 170 35 L 250 35" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="3 3" className="text-border" />
						<circle cx="170" cy="35" r="10" strokeDasharray="2 2" className="fill-card stroke-muted-foreground stroke-1 opacity-60" />
						<text x="170" y="38" textAnchor="middle" className="text-[8px] font-mono fill-muted-foreground">C3</text>
						<text x="270" y="25" textAnchor="middle" className="text-[10px] font-mono fill-emerald-500 font-bold">linear history</text>
					</g>
				)}

				{graphType === 'cherry_pick' && (
					<g>
						<line x1="50" y1="80" x2="380" y2="80" stroke="currentColor" strokeWidth="2.5" className="text-border" />
						<line x1="50" y1="35" x2="380" y2="35" stroke="#8b5cf6" strokeWidth="2" strokeDasharray="4 2" />
						{/* Source commit */}
						<circle cx="160" cy="35" r="14" className="fill-violet-500 stroke-background stroke-2" />
						<text x="160" y="39" textAnchor="middle" className="text-[9px] font-mono fill-white font-bold">HOTFIX</text>
						{/* Destination cherry pick */}
						<path d="M 160 50 Q 230 70 290 75" fill="none" stroke="#8b5cf6" strokeWidth="2.5" />
						<polygon points="290,75 280,72 284,80" fill="#8b5cf6" />
						<circle cx="310" cy="80" r="14" className="fill-violet-500 stroke-background stroke-2" />
						<text x="310" y="84" textAnchor="middle" className="text-[9px] font-mono fill-white font-bold">APPLIED</text>
					</g>
				)}

				{graphType === 'worktree' && (
					<g>
						{/* Main git directory */}
						<rect x="40" y="30" width="160" height="60" rx="10" className="fill-card stroke-primary stroke-2" />
						<text x="120" y="55" textAnchor="middle" className="text-[11px] font-bold fill-foreground">.git / Main Tree</text>
						<text x="120" y="72" textAnchor="middle" className="text-[9px] font-mono fill-muted-foreground">branch: main</text>
						{/* Connector */}
						<line x1="200" y1="60" x2="270" y2="60" stroke="#3b82f6" strokeWidth="2.5" strokeDasharray="4 3" />
						{/* Secondary worktree folder */}
						<rect x="270" y="30" width="170" height="60" rx="10" className="fill-primary/10 stroke-primary stroke-2" />
						<text x="355" y="55" textAnchor="middle" className="text-[11px] font-bold fill-primary">Linked Worktree</text>
						<text x="355" y="72" textAnchor="middle" className="text-[9px] font-mono fill-foreground">branch: hotfix</text>
					</g>
				)}

				{graphType === 'submodule' && (
					<g>
						{/* Outer repo */}
						<rect x="40" y="20" width="400" height="80" rx="12" className="fill-card stroke-border stroke-2" />
						<text x="60" y="42" className="text-[11px] font-bold fill-foreground">Root Repository (git clone)</text>
						{/* Nested Submodule */}
						<rect x="180" y="46" width="240" height="44" rx="8" className="fill-primary/15 stroke-primary stroke-2" />
						<text x="200" y="66" className="text-[10px] font-bold fill-primary">Submodule: packages/ui-kit</text>
						<text x="200" y="80" className="text-[9px] font-mono fill-muted-foreground">pinned to commit sha @ 4a9f1b</text>
					</g>
				)}
			</svg>
		</div>
	);
}
