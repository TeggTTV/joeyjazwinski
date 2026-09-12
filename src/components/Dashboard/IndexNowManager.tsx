import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
	Search,
	Send,
	CheckCircle2,
	AlertCircle,
	RefreshCw,
	ChevronDown,
	ChevronRight,
	ExternalLink,
	Globe,
	Code2,
	BookOpen,
	GraduationCap,
	Shield,
	Sparkles,
	Clock,
	Copy,
	Check,
	Filter,
	Layers,
	Flame,
	CheckSquare,
	Square,
} from 'lucide-react';
import { toast } from 'react-toastify';

export interface SitePageNode {
	id: string;
	title: string;
	path: string;
	url: string;
	category: string;
	priority: string;
	changefreq: string;
	lastmod?: string;
	subpages?: SitePageNode[];
}

export interface SiteHierarchyGroup {
	category: string;
	description: string;
	iconName: string;
	pages: SitePageNode[];
}

interface IndexNowHistoryLog {
	id: string;
	urls: string[];
	urlCount: number;
	statusCode: number;
	success: boolean;
	responseMessage: string;
	submittedAt: string;
}

export default function IndexNowManager() {
	const [hierarchy, setHierarchy] = useState<SiteHierarchyGroup[]>([]);
	const [totalCount, setTotalCount] = useState<number>(0);
	const [allUrls, setAllUrls] = useState<string[]>([]);
	const [loading, setLoading] = useState(true);
	const [searchQuery, setSearchQuery] = useState('');
	const [selectedCategory, setSelectedCategory] = useState<string>('All');
	const [collapsedCategories, setCollapsedCategories] = useState<
		Record<string, boolean>
	>({});
	const [collapsedPages, setCollapsedPages] = useState<
		Record<string, boolean>
	>({});

	// Pinging & Status State
	const [pingingUrl, setPingingUrl] = useState<string | null>(null);
	const [pingStatusMap, setPingStatusMap] = useState<
		Record<
			string,
			{
				status: 'idle' | 'loading' | 'success' | 'error';
				message?: string;
				timestamp?: string;
			}
		>
	>({});
	const [batchSubmitting, setBatchSubmitting] = useState(false);

	// Custom URL submission input
	const [customUrl, setCustomUrl] = useState('');
	const [copiedUrl, setCopiedUrl] = useState<string | null>(null);

	// History Drawer / Logs
	const [logs, setLogs] = useState<IndexNowHistoryLog[]>([]);
	const [loadingLogs, setLoadingLogs] = useState(false);
	const [showHistoryModal, setShowHistoryModal] = useState(false);

	// Multi-select for mass submission
	const [selectedUrlSet, setSelectedUrlSet] = useState<Set<string>>(
		new Set(),
	);

	// Load site pages
	const fetchPages = async () => {
		setLoading(true);
		try {
			const res = await fetch('/api/admin/indexnow/pages');
			if (res.ok) {
				const data = await res.json();
				setHierarchy(data.hierarchy || []);
				setTotalCount(data.totalCount || 0);
				setAllUrls(data.allUrls || []);
			} else {
				toast.error('Failed to load site pages hierarchy');
			}
		} catch (e) {
			console.error('Error fetching hierarchy:', e);
			toast.error('Network error loading site pages');
		} finally {
			setLoading(false);
		}
	};

	// Load history
	const fetchHistory = async () => {
		setLoadingLogs(true);
		try {
			const res = await fetch('/api/admin/indexnow/history');
			if (res.ok) {
				const data = await res.json();
				setLogs(data.logs || []);
			}
		} catch (e) {
			console.error('Error fetching history:', e);
		} finally {
			setLoadingLogs(false);
		}
	};

	useEffect(() => {
		fetchPages();
		fetchHistory();
	}, []);

	const getCategoryIcon = (iconName: string) => {
		switch (iconName) {
			case 'Globe':
				return <Globe className="w-4 h-4 text-blue-400" />;
			case 'Code':
				return <Code2 className="w-4 h-4 text-emerald-400" />;
			case 'BookOpen':
				return <BookOpen className="w-4 h-4 text-purple-400" />;
			case 'GraduationCap':
				return <GraduationCap className="w-4 h-4 text-amber-400" />;
			case 'Shield':
				return <Shield className="w-4 h-4 text-rose-400" />;
			default:
				return <Layers className="w-4 h-4 text-indigo-400" />;
		}
	};

	const toggleCategoryCollapse = (catName: string) => {
		setCollapsedCategories((prev) => ({
			...prev,
			[catName]: !prev[catName],
		}));
	};

	const togglePageCollapse = (pageId: string) => {
		setCollapsedPages((prev) => ({
			...prev,
			[pageId]: !prev[pageId],
		}));
	};

	// Single URL submission
	const submitSingleUrl = async (url: string) => {
		setPingingUrl(url);
		setPingStatusMap((prev) => ({
			...prev,
			[url]: { status: 'loading' },
		}));

		try {
			const res = await fetch('/api/notifyIndexNow', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ url }),
			});

			const data = await res.json();
			if (res.ok && data.success) {
				setPingStatusMap((prev) => ({
					...prev,
					[url]: {
						status: 'success',
						message: data.message || 'Indexed',
						timestamp: new Date().toLocaleTimeString(),
					},
				}));
				toast.success(
					`IndexNow pinged: ${url.replace('https://joeyjazwinski.com', '') || '/'}`,
				);
				fetchHistory();
			} else {
				throw new Error(data.message || 'IndexNow request rejected');
			}
		} catch (error: any) {
			console.error('Error submitting URL to IndexNow:', error);
			setPingStatusMap((prev) => ({
				...prev,
				[url]: {
					status: 'error',
					message: error?.message || 'Failed',
					timestamp: new Date().toLocaleTimeString(),
				},
			}));
			toast.error(`Failed to ping IndexNow for ${url}`);
		} finally {
			setPingingUrl(null);
		}
	};

	// Batch submission helper
	const submitUrlBatch = async (urlsToSubmit: string[], label: string) => {
		if (urlsToSubmit.length === 0) {
			toast.warning('No URLs selected to submit');
			return;
		}

		setBatchSubmitting(true);
		setPingStatusMap((prev) => {
			const next = { ...prev };
			for (const u of urlsToSubmit) {
				next[u] = { status: 'loading' };
			}
			return next;
		});

		try {
			const res = await fetch('/api/notifyIndexNow', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ urls: urlsToSubmit }),
			});

			const data = await res.json();
			if (res.ok && data.success) {
				const nowStr = new Date().toLocaleTimeString();
				setPingStatusMap((prev) => {
					const next = { ...prev };
					for (const u of urlsToSubmit) {
						next[u] = {
							status: 'success',
							message: 'Batch Indexed',
							timestamp: nowStr,
						};
					}
					return next;
				});
				toast.success(
					`IndexNow batch complete! Submitted ${urlsToSubmit.length} URLs for ${label}.`,
				);
				fetchHistory();
			} else {
				throw new Error(data.message || 'Batch request error');
			}
		} catch (error: any) {
			console.error('Batch error:', error);
			setPingStatusMap((prev) => {
				const next = { ...prev };
				for (const u of urlsToSubmit) {
					next[u] = {
						status: 'error',
						message: 'Batch failed',
						timestamp: new Date().toLocaleTimeString(),
					};
				}
				return next;
			});
			toast.error(
				`IndexNow submission failed: ${error?.message || 'Error'}`,
			);
		} finally {
			setBatchSubmitting(false);
		}
	};

	const handleCustomUrlSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (!customUrl.trim()) return;

		let formatted = customUrl.trim();
		if (
			!formatted.startsWith('http://') &&
			!formatted.startsWith('https://')
		) {
			if (formatted.startsWith('/')) {
				formatted = `https://joeyjazwinski.com${formatted}`;
			} else {
				formatted = `https://joeyjazwinski.com/${formatted}`;
			}
		}

		submitSingleUrl(formatted);
		setCustomUrl('');
	};

	const copyToClipboard = (text: string) => {
		navigator.clipboard.writeText(text);
		setCopiedUrl(text);
		setTimeout(() => setCopiedUrl(null), 2000);
	};

	// Toggle single checkbox
	const toggleSelectUrl = (url: string) => {
		setSelectedUrlSet((prev) => {
			const next = new Set(prev);
			if (next.has(url)) {
				next.delete(url);
			} else {
				next.add(url);
			}
			return next;
		});
	};

	// Filtered hierarchy
	const filteredHierarchy = useMemo(() => {
		const query = searchQuery.toLowerCase().trim();
		return hierarchy
			.filter((group) => {
				if (selectedCategory === 'All') return true;
				return group.category === selectedCategory;
			})
			.map((group) => {
				if (!query) return group;

				const matchedPages: SitePageNode[] = [];
				for (const p of group.pages) {
					const pageMatch =
						p.title.toLowerCase().includes(query) ||
						p.path.toLowerCase().includes(query) ||
						p.url.toLowerCase().includes(query);

					const matchedSubs = (p.subpages || []).filter(
						(sub) =>
							sub.title.toLowerCase().includes(query) ||
							sub.path.toLowerCase().includes(query) ||
							sub.url.toLowerCase().includes(query),
					);

					if (pageMatch || matchedSubs.length > 0) {
						matchedPages.push({
							...p,
							subpages:
								matchedSubs.length > 0
									? matchedSubs
									: p.subpages,
						});
					}
				}

				return {
					...group,
					pages: matchedPages,
				};
			})
			.filter((group) => group.pages.length > 0);
	}, [hierarchy, searchQuery, selectedCategory]);

	// Extract all URLs from a specific category
	const getCategoryUrls = (group: SiteHierarchyGroup): string[] => {
		const list: string[] = [];
		const extract = (pages: SitePageNode[]) => {
			for (const p of pages) {
				list.push(p.url);
				if (p.subpages) extract(p.subpages);
			}
		};
		extract(group.pages);
		return Array.from(new Set(list));
	};

	// Toggle select all in category
	const toggleCategorySelect = (group: SiteHierarchyGroup) => {
		const catUrls = getCategoryUrls(group);
		const allSelected = catUrls.every((u) => selectedUrlSet.has(u));

		setSelectedUrlSet((prev) => {
			const next = new Set(prev);
			if (allSelected) {
				catUrls.forEach((u) => next.delete(u));
			} else {
				catUrls.forEach((u) => next.add(u));
			}
			return next;
		});
	};

	// Select all visible pages
	const toggleSelectAllVisible = () => {
		const visibleUrls: string[] = [];
		filteredHierarchy.forEach((g) => {
			visibleUrls.push(...getCategoryUrls(g));
		});

		const allSelected =
			visibleUrls.length > 0 &&
			visibleUrls.every((u) => selectedUrlSet.has(u));
		setSelectedUrlSet((prev) => {
			const next = new Set(prev);
			if (allSelected) {
				visibleUrls.forEach((u) => next.delete(u));
			} else {
				visibleUrls.forEach((u) => next.add(u));
			}
			return next;
		});
	};

	const renderPageRow = (page: SitePageNode, depth = 0) => {
		const isPinging = pingingUrl === page.url || batchSubmitting;
		const statusObj = pingStatusMap[page.url];
		const hasSubpages = Boolean(page.subpages && page.subpages.length > 0);
		const isCollapsed = collapsedPages[page.id];
		const isSelected = selectedUrlSet.has(page.url);

		return (
			<div key={page.id} className="group/row transition-colors">
				<div
					className={`flex flex-wrap items-center justify-between gap-3 py-2.5 px-3 rounded-xl border transition-all duration-200 ${
						depth > 0
							? 'ml-6 md:ml-8 bg-white/2 dark:bg-white/1 border-white/5'
							: 'bg-card/60 hover:bg-card border-border/40 hover:border-border/80'
					} ${isSelected ? 'border-primary/40 bg-primary/5' : ''}`}
				>
					{/* Left Information */}
					<div className="flex items-center gap-2.5 min-w-0 flex-1">
						{/* Checkbox */}
						<button
							type="button"
							onClick={() => toggleSelectUrl(page.url)}
							className="text-muted-foreground hover:text-foreground shrink-0 focus:outline-none"
						>
							{isSelected ? (
								<CheckSquare className="w-4 h-4 text-primary" />
							) : (
								<Square className="w-4 h-4 opacity-40 hover:opacity-100" />
							)}
						</button>

						{/* Subpage Expand Toggle */}
						{hasSubpages ? (
							<button
								type="button"
								onClick={() => togglePageCollapse(page.id)}
								className="p-1 text-muted-foreground hover:text-foreground shrink-0 rounded transition-transform"
							>
								{isCollapsed ? (
									<ChevronRight className="w-3.5 h-3.5" />
								) : (
									<ChevronDown className="w-3.5 h-3.5" />
								)}
							</button>
						) : (
							<span className="w-5 h-5 flex items-center justify-center shrink-0">
								<span className="w-1.5 h-1.5 rounded-full bg-border" />
							</span>
						)}

						{/* Page Title & Path */}
						<div className="min-w-0">
							<div className="flex items-center gap-2 flex-wrap">
								<span className="text-xs font-semibold text-foreground truncate">
									{page.title}
								</span>
								<span className="font-mono text-[11px] text-muted-foreground px-1.5 py-0.5 rounded bg-white/5 border border-white/5 truncate max-w-72 sm:max-w-md">
									{page.path}
								</span>
								{page.priority && (
									<span className="hidden sm:inline text-[10px] font-mono font-medium text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
										P: {page.priority}
									</span>
								)}
							</div>
						</div>
					</div>

					{/* Right Actions & Status Badges */}
					<div className="flex items-center gap-2 shrink-0">
						{/* Status feedback chip */}
						{statusObj && statusObj.status === 'success' && (
							<span className="inline-flex items-center gap-1 text-[11px] text-emerald-400 font-medium px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
								<CheckCircle2 className="w-3 h-3" />
								{statusObj.timestamp || 'Indexed'}
							</span>
						)}

						{statusObj && statusObj.status === 'error' && (
							<span className="inline-flex items-center gap-1 text-[11px] text-rose-400 font-medium px-2 py-0.5 rounded-full bg-rose-500/10 border border-rose-500/20">
								<AlertCircle className="w-3 h-3" />
								Failed
							</span>
						)}

						{/* Copy Link Button */}
						<button
							onClick={() => copyToClipboard(page.url)}
							title="Copy full URL"
							className="p-1.5 text-muted-foreground hover:text-foreground rounded-lg hover:bg-white/5 transition-all"
						>
							{copiedUrl === page.url ? (
								<Check className="w-3.5 h-3.5 text-emerald-400" />
							) : (
								<Copy className="w-3.5 h-3.5" />
							)}
						</button>

						{/* External Browser Link */}
						<a
							href={page.url}
							target="_blank"
							rel="noopener noreferrer"
							title="Open page in new tab"
							className="p-1.5 text-muted-foreground hover:text-primary rounded-lg hover:bg-white/5 transition-all"
						>
							<ExternalLink className="w-3.5 h-3.5" />
						</a>

						{/* Dedicated IndexNow Instant Ping Button */}
						<button
							onClick={() => submitSingleUrl(page.url)}
							disabled={isPinging}
							className="group/btn relative inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-primary/10 hover:bg-primary text-primary hover:text-primary-foreground border border-primary/30 text-xs font-semibold shadow-xs hover:shadow-primary/20 transition-all duration-200 active:scale-95 disabled:opacity-50"
						>
							{statusObj?.status === 'loading' ? (
								<>
									<RefreshCw className="w-3 h-3 animate-spin" />
									<span>Pinging...</span>
								</>
							) : (
								<>
									<Send className="w-3 h-3 transition-transform group-hover/btn:translate-x-0.5" />
									<span>IndexNow</span>
								</>
							)}
						</button>
					</div>
				</div>

				{/* Render Nested Subpages if expanded */}
				{hasSubpages && !isCollapsed && page.subpages && (
					<div className="mt-1.5 space-y-1.5 pl-3 border-l-2 border-primary/20 ml-3">
						{page.subpages.map((sub) =>
							renderPageRow(sub, depth + 1),
						)}
					</div>
				)}
			</div>
		);
	};

	return (
		<div className="space-y-6">
			{/* Top Hero & Quick Metrics Panel */}
			<div className="p-1.5 rounded-4xl bg-white/3 dark:bg-white/2 border border-white/10 shadow-2xl">
				<div className="p-6 md:p-8 rounded-[calc(2rem-0.375rem)] bg-card/95 backdrop-blur-2xl border border-white/5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)]">
					<div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-border/50">
						<div className="space-y-1.5">
							<div className="flex items-center gap-2.5">
								<div className="p-2.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
									<Sparkles className="w-5 h-5" />
								</div>
								<div>
									<h2 className="text-xl md:text-2xl font-bold tracking-tight text-foreground">
										IndexNow SEO Protocol Manager
									</h2>
									<p className="text-xs text-muted-foreground">
										Instantaneously broadcast URL changes,
										creations, and updates to Microsoft
										Bing, Yandex, Seznam, and partner
										engines.
									</p>
								</div>
							</div>
						</div>

						<div className="flex flex-wrap items-center gap-2.5">
							{/* Refresh Pages */}
							<button
								onClick={() => {
									fetchPages();
									fetchHistory();
								}}
								disabled={loading}
								className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-foreground transition-all"
							>
								<RefreshCw
									className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-primary' : ''}`}
								/>
								<span>Reload Structure</span>
							</button>

							{/* Open History Modal */}
							<button
								onClick={() => setShowHistoryModal(true)}
								className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-secondary/80 hover:bg-secondary text-foreground border border-border text-xs font-semibold transition-all"
							>
								<Clock className="w-3.5 h-3.5 text-primary" />
								<span>Audit History ({logs.length})</span>
							</button>

							{/* Submit All Visible / Selected Batch */}
							{selectedUrlSet.size > 0 ? (
								<button
									onClick={() =>
										submitUrlBatch(
											Array.from(selectedUrlSet),
											`${selectedUrlSet.size} Selected Pages`,
										)
									}
									disabled={batchSubmitting}
									className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-primary text-primary-foreground font-semibold text-xs shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all duration-300 active:scale-95 disabled:opacity-50"
								>
									{batchSubmitting ? (
										<RefreshCw className="w-3.5 h-3.5 animate-spin" />
									) : (
										<Send className="w-3.5 h-3.5" />
									)}
									<span>
										Submit {selectedUrlSet.size} Selected
									</span>
								</button>
							) : (
								<button
									onClick={() =>
										submitUrlBatch(allUrls, 'Entire Site')
									}
									disabled={
										batchSubmitting || allUrls.length === 0
									}
									className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-primary text-white font-semibold text-xs shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all duration-300 active:scale-95 disabled:opacity-50"
								>
									{batchSubmitting ? (
										<RefreshCw className="w-3.5 h-3.5 animate-spin" />
									) : (
										<Flame className="w-3.5 h-3.5" />
									)}
									<span>Submit All {totalCount} Pages</span>
								</button>
							)}
						</div>
					</div>

					{/* Custom Single-URL Dispatcher Bar */}
					<form
						onSubmit={handleCustomUrlSubmit}
						className="mt-6 flex flex-col sm:flex-row gap-3"
					>
						<div className="relative flex-1">
							<Search className="w-4 h-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2" />
							<input
								type="text"
								placeholder="Enter custom URL or path (e.g. /developer-blog/new-post or https://joeyjazwinski.com/...) "
								value={customUrl}
								onChange={(e) => setCustomUrl(e.target.value)}
								className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white/4 border border-white/10 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
							/>
						</div>
						<button
							type="submit"
							disabled={
								!customUrl.trim() || pingingUrl === customUrl
							}
							className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-semibold shadow-md shadow-primary/20 transition-all active:scale-95 disabled:opacity-40"
						>
							<Send className="w-3.5 h-3.5" />
							<span>Instant Ping</span>
						</button>
					</form>
				</div>
			</div>

			{/* Filter & Search Island */}
			<div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
				{/* Categories Pills */}
				<div className="flex flex-wrap gap-2 w-full sm:w-auto">
					{['All', ...hierarchy.map((g) => g.category)].map((cat) => {
						const isActive = selectedCategory === cat;
						return (
							<button
								key={cat}
								onClick={() => setSelectedCategory(cat)}
								className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
									isActive
										? 'bg-primary text-primary-foreground shadow-md shadow-primary/20'
										: 'bg-white/4 hover:bg-white/8 text-muted-foreground hover:text-foreground border border-white/5'
								}`}
							>
								{cat}
							</button>
						);
					})}
				</div>

				{/* Search and Multi-Select Tooling */}
				<div className="flex items-center gap-2.5 w-full sm:w-auto justify-between sm:justify-end">
					<div className="relative w-full sm:w-64">
						<Filter className="w-3.5 h-3.5 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
						<input
							type="text"
							placeholder="Filter by title or route..."
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-card border border-border/80 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50"
						/>
					</div>

					<button
						onClick={toggleSelectAllVisible}
						title="Toggle select all visible"
						className="px-3 py-1.5 rounded-xl bg-white/4 hover:bg-white/8 border border-white/5 text-xs text-muted-foreground hover:text-foreground shrink-0 flex items-center gap-1.5"
					>
						<CheckSquare className="w-3.5 h-3.5" />
						<span className="hidden sm:inline">Toggle Visible</span>
					</button>
				</div>
			</div>

			{/* Site Hierarchy Accordion Trees */}
			{loading ? (
				<div className="p-12 text-center text-muted-foreground text-xs flex flex-col items-center gap-3">
					<RefreshCw className="w-8 h-8 text-primary animate-spin" />
					<span>Discovering pages and structured routes...</span>
				</div>
			) : filteredHierarchy.length === 0 ? (
				<div className="p-12 text-center text-muted-foreground text-xs rounded-2xl bg-card border border-border">
					No pages matched your search query or selected category.
				</div>
			) : (
				<div className="space-y-6">
					{filteredHierarchy.map((group) => {
						const isCollapsed = collapsedCategories[group.category];
						const groupUrls = getCategoryUrls(group);
						const allCatSelected =
							groupUrls.length > 0 &&
							groupUrls.every((u) => selectedUrlSet.has(u));

						return (
							<div
								key={group.category}
								className="p-1.5 rounded-3xl bg-white/2 dark:bg-white/1 border border-white/10 shadow-lg"
							>
								<div className="p-4 md:p-6 rounded-[calc(1.5rem-0.375rem)] bg-card/90 border border-white/5 shadow-inner">
									{/* Category Header Bar */}
									<div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-border/50">
										<div className="flex items-center gap-3">
											<button
												onClick={() =>
													toggleCategoryCollapse(
														group.category,
													)
												}
												className="p-1 text-muted-foreground hover:text-foreground rounded transition-transform"
											>
												{isCollapsed ? (
													<ChevronRight className="w-4 h-4" />
												) : (
													<ChevronDown className="w-4 h-4" />
												)}
											</button>
											<div className="p-2 rounded-xl bg-white/5 border border-white/10">
												{getCategoryIcon(
													group.iconName,
												)}
											</div>
											<div>
												<div className="flex items-center gap-2">
													<h3 className="text-base font-bold text-foreground">
														{group.category}
													</h3>
													<span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20 font-bold">
														{group.pages.length}{' '}
														Pages
													</span>
												</div>
												<p className="text-xs text-muted-foreground">
													{group.description}
												</p>
											</div>
										</div>

										<div className="flex items-center gap-2">
											<button
												type="button"
												onClick={() =>
													toggleCategorySelect(group)
												}
												className="px-3 py-1.5 rounded-lg bg-white/4 hover:bg-white/8 border border-white/5 text-[11px] font-medium text-muted-foreground hover:text-foreground flex items-center gap-1.5 transition-all"
											>
												{allCatSelected ? (
													<CheckSquare className="w-3.5 h-3.5 text-primary" />
												) : (
													<Square className="w-3.5 h-3.5 opacity-60" />
												)}
												<span>Select All</span>
											</button>

											<button
												onClick={() =>
													submitUrlBatch(
														groupUrls,
														group.category,
													)
												}
												disabled={batchSubmitting}
												className="px-3 py-1.5 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 text-[11px] font-semibold flex items-center gap-1.5 transition-all active:scale-95 disabled:opacity-50"
											>
												<Send className="w-3 h-3" />
												<span>
													Submit Group (
													{groupUrls.length})
												</span>
											</button>
										</div>
									</div>

									{/* List of Pages */}
									{!isCollapsed && (
										<div className="pt-4 space-y-2">
											{group.pages.map((page) =>
												renderPageRow(page, 0),
											)}
										</div>
									)}
								</div>
							</div>
						);
					})}
				</div>
			)}

			{/* History Drawer Modal */}
			<AnimatePresence>
				{showHistoryModal && (
					<div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
						<motion.div
							initial={{ opacity: 0, scale: 0.95 }}
							animate={{ opacity: 1, scale: 1 }}
							exit={{ opacity: 0, scale: 0.95 }}
							transition={{ duration: 0.2 }}
							className="w-full max-w-2xl max-h-[85vh] p-1.5 rounded-3xl bg-white/3 border border-white/10 shadow-2xl flex flex-col"
						>
							<div className="p-6 rounded-[calc(1.5rem-0.375rem)] bg-card border border-white/5 flex flex-col h-full overflow-hidden">
								<div className="flex items-center justify-between pb-4 border-b border-border">
									<div className="flex items-center gap-2.5">
										<div className="p-2 rounded-xl bg-primary/10 text-primary border border-primary/20">
											<Clock className="w-4 h-4" />
										</div>
										<h3 className="text-lg font-bold text-foreground">
											IndexNow Transmission Audit Logs
										</h3>
									</div>
									<button
										onClick={() =>
											setShowHistoryModal(false)
										}
										className="text-muted-foreground hover:text-foreground text-xs px-2.5 py-1 rounded-lg bg-white/5 border border-white/10"
									>
										Close
									</button>
								</div>

								<div className="py-4 overflow-y-auto flex-1 space-y-2.5 pr-1">
									{loadingLogs ? (
										<div className="py-12 text-center text-xs text-muted-foreground">
											Loading submission logs...
										</div>
									) : logs.length === 0 ? (
										<div className="py-12 text-center text-xs text-muted-foreground">
											No IndexNow submissions recorded in
											the database yet.
										</div>
									) : (
										logs.map((log) => (
											<div
												key={log.id}
												className="p-3 rounded-xl border border-border/60 bg-white/2 space-y-1.5 text-xs"
											>
												<div className="flex items-center justify-between">
													<div className="flex items-center gap-2">
														<span
															className={`w-2 h-2 rounded-full ${
																log.success
																	? 'bg-emerald-400'
																	: 'bg-rose-400'
															}`}
														/>
														<span className="font-bold text-foreground">
															{log.urlCount} URL
															{log.urlCount === 1
																? ''
																: 's'}{' '}
															Submitted
														</span>
														<span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-white/5 border border-white/5">
															HTTP{' '}
															{log.statusCode}
														</span>
													</div>
													<span className="font-mono text-[11px] text-muted-foreground">
														{new Date(
															log.submittedAt,
														).toLocaleString()}
													</span>
												</div>
												<div className="font-mono text-[11px] text-muted-foreground/80 break-all">
													{log.urls
														.slice(0, 3)
														.join(', ')}
													{log.urls.length > 3 &&
														` +${log.urls.length - 3} more`}
												</div>
											</div>
										))
									)}
								</div>
							</div>
						</motion.div>
					</div>
				)}
			</AnimatePresence>
		</div>
	);
}
