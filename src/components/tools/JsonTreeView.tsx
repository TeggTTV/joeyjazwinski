import React, { useState, useMemo } from 'react';
import { ChevronRight, ChevronDown, Copy, Check, Search, Minimize2, Maximize2 } from 'lucide-react';

interface JsonTreeViewProps {
	data: unknown;
}

interface TreeNodeProps {
	keyName?: string;
	value: unknown;
	path: string;
	depth: number;
	filterQuery: string;
	collapsedState: Record<string, boolean>;
	toggleCollapse: (path: string) => void;
	onCopy: (text: string) => void;
}

function TreeNode({
	keyName,
	value,
	path,
	depth,
	filterQuery,
	collapsedState,
	toggleCollapse,
	onCopy,
}: TreeNodeProps) {
	const isObject = value !== null && typeof value === 'object';
	const isArray = Array.isArray(value);
	const isCollapsed = collapsedState[path] ?? (depth > 2);

	const entries = useMemo(() => {
		if (!isObject) return [];
		if (isArray) {
			return (value as unknown[]).map((v, i) => [String(i), v] as const);
		}
		return Object.entries(value as Record<string, unknown>);
	}, [isObject, isArray, value]);

	// Filter highlight
	const isMatch = useMemo(() => {
		if (!filterQuery) return true;
		const query = filterQuery.toLowerCase();
		if (keyName && keyName.toLowerCase().includes(query)) return true;
		if (!isObject && String(value).toLowerCase().includes(query)) return true;
		return false;
	}, [filterQuery, keyName, isObject, value]);

	const renderValue = () => {
		if (value === null) {
			return <span className="text-rose-500 font-mono text-xs">null</span>;
		}
		if (typeof value === 'boolean') {
			return (
				<span className="text-purple-500 font-mono text-xs">
					{value ? 'true' : 'false'}
				</span>
			);
		}
		if (typeof value === 'number') {
			return (
				<span className="text-amber-500 font-mono text-xs">{value}</span>
			);
		}
		if (typeof value === 'string') {
			return (
				<span className="text-emerald-500 dark:text-emerald-400 font-mono text-xs break-all">
					"{value}"
				</span>
			);
		}
		return null;
	};

	return (
		<div className="text-xs font-mono select-text">
			<div
				className={`group flex items-center gap-1.5 py-1 px-1.5 rounded hover:bg-muted/50 transition-colors ${
					isMatch && filterQuery ? 'bg-primary/10' : ''
				}`}
				style={{ paddingLeft: `${depth * 14 + 6}px` }}
			>
				{isObject ? (
					<button
						onClick={() => toggleCollapse(path)}
						className="p-0.5 text-muted-foreground hover:text-foreground cursor-pointer rounded transition"
						aria-label={isCollapsed ? 'Expand node' : 'Collapse node'}
					>
						{isCollapsed ? (
							<ChevronRight className="w-3.5 h-3.5" />
						) : (
							<ChevronDown className="w-3.5 h-3.5" />
						)}
					</button>
				) : (
					<span className="w-3.5" />
				)}

				{keyName !== undefined && (
					<span className="text-foreground/90 font-medium">
						{isArray ? `[${keyName}]` : `"${keyName}"`}:
					</span>
				)}

				{isObject ? (
					<span
						onClick={() => toggleCollapse(path)}
						className="cursor-pointer text-muted-foreground hover:text-foreground"
					>
						{isArray ? `Array(${entries.length})` : `Object{${entries.length}}`}
					</span>
				) : (
					renderValue()
				)}

				{/* Action badges on hover */}
				<div className="opacity-0 group-hover:opacity-100 transition-opacity ml-auto flex items-center gap-1 shrink-0">
					<button
						onClick={(e) => {
							e.stopPropagation();
							onCopy(path);
						}}
						className="px-1.5 py-0.5 text-[10px] rounded bg-secondary hover:bg-secondary/80 border border-border text-muted-foreground hover:text-foreground cursor-pointer transition"
						title="Copy JSON path"
					>
						path
					</button>
					<button
						onClick={(e) => {
							e.stopPropagation();
							onCopy(
								isObject
									? JSON.stringify(value, null, 2)
									: String(value),
							);
						}}
						className="px-1.5 py-0.5 text-[10px] rounded bg-secondary hover:bg-secondary/80 border border-border text-muted-foreground hover:text-foreground cursor-pointer transition"
						title="Copy value"
					>
						value
					</button>
				</div>
			</div>

			{isObject && !isCollapsed && (
				<div>
					{entries.map(([childKey, childValue]) => {
						const childPath = path
							? isArray
								? `${path}[${childKey}]`
								: `${path}.${childKey}`
							: childKey;
						return (
							<TreeNode
								key={childKey}
								keyName={childKey}
								value={childValue}
								path={childPath}
								depth={depth + 1}
								filterQuery={filterQuery}
								collapsedState={collapsedState}
								toggleCollapse={toggleCollapse}
								onCopy={onCopy}
							/>
						);
					})}
				</div>
			)}
		</div>
	);
}

export default function JsonTreeView({ data }: JsonTreeViewProps) {
	const [filterQuery, setFilterQuery] = useState('');
	const [collapsedState, setCollapsedState] = useState<Record<string, boolean>>({});
	const [copiedNotice, setCopiedNotice] = useState<string | null>(null);

	const toggleCollapse = (path: string) => {
		setCollapsedState((prev) => ({
			...prev,
			[path]: !prev[path],
		}));
	};

	const collapseAll = () => {
		const collectPaths = (val: unknown, currentPath = '', acc: Record<string, boolean> = {}) => {
			if (val !== null && typeof val === 'object') {
				acc[currentPath] = true;
				if (Array.isArray(val)) {
					val.forEach((item, i) =>
						collectPaths(item, currentPath ? `${currentPath}[${i}]` : String(i), acc),
					);
				} else {
					Object.entries(val as Record<string, unknown>).forEach(([k, v]) =>
						collectPaths(v, currentPath ? `${currentPath}.${k}` : k, acc),
					);
				}
			}
			return acc;
		};
		setCollapsedState(collectPaths(data));
	};

	const expandAll = () => {
		setCollapsedState({});
	};

	const handleCopy = (text: string) => {
		navigator.clipboard.writeText(text);
		setCopiedNotice(text);
		setTimeout(() => setCopiedNotice(null), 1800);
	};

	return (
		<div className="flex flex-col h-full space-y-2">
			{/* Controls */}
			<div className="flex flex-wrap items-center justify-between gap-2 p-2 bg-secondary/30 rounded-xl border border-border/50">
				<div className="relative flex-1 min-w-[140px]">
					<Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
					<input
						type="text"
						placeholder="Search keys or values..."
						value={filterQuery}
						onChange={(e) => setFilterQuery(e.target.value)}
						className="w-full pl-8 pr-2.5 py-1 text-xs bg-background border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-primary"
					/>
				</div>
				<div className="flex items-center gap-1.5">
					<button
						onClick={expandAll}
						className="flex items-center gap-1 px-2 py-1 text-xs rounded-lg bg-secondary hover:bg-secondary/80 border border-border text-muted-foreground hover:text-foreground cursor-pointer transition"
						title="Expand All"
					>
						<Maximize2 className="w-3 h-3" />
						<span>Expand</span>
					</button>
					<button
						onClick={collapseAll}
						className="flex items-center gap-1 px-2 py-1 text-xs rounded-lg bg-secondary hover:bg-secondary/80 border border-border text-muted-foreground hover:text-foreground cursor-pointer transition"
						title="Collapse All"
					>
						<Minimize2 className="w-3 h-3" />
						<span>Collapse</span>
					</button>
				</div>
			</div>

			{copiedNotice && (
				<div className="flex items-center gap-1.5 px-2.5 py-1 text-xs text-emerald-500 bg-emerald-500/10 border border-emerald-500/20 rounded-lg animate-in fade-in duration-150">
					<Check className="w-3.5 h-3.5" />
					<span className="truncate">Copied: {copiedNotice}</span>
				</div>
			)}

			{/* Tree Render */}
			<div className="flex-1 overflow-y-auto max-h-[380px] p-2 bg-background/50 border border-border/60 rounded-xl font-mono text-xs">
				<TreeNode
					value={data}
					path=""
					depth={0}
					filterQuery={filterQuery}
					collapsedState={collapsedState}
					toggleCollapse={toggleCollapse}
					onCopy={handleCopy}
				/>
			</div>
		</div>
	);
}
