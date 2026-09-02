'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
	GitBranch,
	GitCommit,
	Plus,
	Trash2,
	RefreshCw,
	Sparkles,
	Check,
	Clock,
	Tag,
	ArrowUpRight,
	Terminal,
	Search,
	Layers,
	ChevronRight,
} from 'lucide-react';
import { toast } from 'react-toastify';
import ConfirmationModal from '@/components/ConfirmationModal';

const MOTION_EASE = [0.32, 0.72, 0, 1] as const;

export interface PatchNoteRecord {
	id?: string;
	version: string;
	title: string;
	date: string;
	changes: string[];
	type: 'major' | 'minor' | 'patch';
	createdAt?: string;
	updatedAt?: string;
}

export interface GitCommitItem {
	hash: string;
	shortHash: string;
	date: string;
	author: string;
	subject: string;
	type: 'feat' | 'fix' | 'refactor' | 'chore' | 'docs' | 'perf' | 'other';
}

export default function ManageChangeLog() {
	// Database patch notes
	const [patchNotes, setPatchNotes] = useState<PatchNoteRecord[]>([]);
	const [loadingNotes, setLoadingNotes] = useState(true);

	// Repository live commits
	const [gitCommits, setGitCommits] = useState<GitCommitItem[]>([]);
	const [loadingCommits, setLoadingCommits] = useState(true);
	const [commitFilter, setCommitFilter] = useState('');

	// Active creation/editing form
	const [version, setVersion] = useState('');
	const [title, setTitle] = useState('');
	const [date, setDate] = useState('');
	const [type, setType] = useState<'major' | 'minor' | 'patch'>('patch');
	const [changes, setChanges] = useState<string[]>([]);
	const [newChangeInput, setNewChangeInput] = useState('');
	const [isSubmitting, setIsSubmitting] = useState(false);

	// Delete state
	const [deleteData, setDeleteData] = useState<{
		id: string;
		version: string;
		x: number;
		y: number;
	} | null>(null);

	// Fetch Database Patch Notes
	const fetchPatchNotes = async () => {
		setLoadingNotes(true);
		try {
			const res = await fetch('/api/patch-notes');
			if (res.ok) {
				const data = await res.json();
				setPatchNotes(data.patchNotes || []);
			} else {
				toast.error('Failed to load patch notes');
			}
		} catch (e) {
			console.error('Error fetching patch notes:', e);
		} finally {
			setLoadingNotes(false);
		}
	};

	// Fetch Git Commits
	const fetchCommits = async () => {
		setLoadingCommits(true);
		try {
			const res = await fetch('/api/patch-notes/commits?limit=60');
			if (res.ok) {
				const data = await res.json();
				setGitCommits(data.commits || []);
			} else {
				toast.error('Failed to load repository commits');
			}
		} catch (e) {
			console.error('Error fetching commits:', e);
		} finally {
			setLoadingCommits(false);
		}
	};

	useEffect(() => {
		fetchPatchNotes();
		fetchCommits();
	}, []);

	// Auto-suggest Next Version based on latest
	useEffect(() => {
		if (patchNotes.length > 0 && !version) {
			const latestVer = patchNotes[0].version.replace(/^v/, '');
			const parts = latestVer.split('.').map((p) => parseInt(p, 10));
			if (parts.length === 3 && !isNaN(parts[2])) {
				const nextPatch = `${parts[0]}.${parts[1]}.${parts[2] + 1}`;
				setVersion(nextPatch);
			}
		}
	}, [patchNotes]);

	// Set default date formatted nicely
	useEffect(() => {
		if (!date) {
			const now = new Date();
			setDate(
				`Commits on ${now.toLocaleDateString('en-US', {
					month: 'short',
					day: 'numeric',
					year: 'numeric',
				})}`
			);
		}
	}, []);

	const handleAddChange = () => {
		if (!newChangeInput.trim()) return;
		setChanges((prev) => [...prev, newChangeInput.trim()]);
		setNewChangeInput('');
	};

	const handleRemoveChange = (index: number) => {
		setChanges((prev) => prev.filter((_, i) => i !== index));
	};

	const handleAddCommitToChanges = (commitSubject: string) => {
		if (changes.includes(commitSubject)) {
			toast.info('Commit already added to release draft');
			return;
		}
		setChanges((prev) => [commitSubject, ...prev]);
		toast.success('Added commit to changelog draft');
	};

	const handleCreatePatchNote = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!version.trim() || !title.trim() || changes.length === 0) {
			toast.error('Please enter a version, release title, and at least one bullet point.');
			return;
		}

		setIsSubmitting(true);
		try {
			const res = await fetch('/api/patch-notes', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					version: version.trim().replace(/^v/, ''),
					title: title.trim(),
					date: date.trim(),
					type,
					changes,
				}),
			});

			const data = await res.json();
			if (res.ok) {
				toast.success(`Patch note v${version} published successfully!`);
				// Reset form
				setTitle('');
				setChanges([]);
				fetchPatchNotes();
			} else {
				toast.error(data.message || 'Failed to publish patch note');
			}
		} catch (error) {
			console.error(error);
			toast.error('Network error while saving patch note');
		} finally {
			setIsSubmitting(false);
		}
	};

	const confirmDelete = async () => {
		if (!deleteData) return;
		try {
			const res = await fetch(`/api/patch-notes/${deleteData.id}`, {
				method: 'DELETE',
			});
			if (res.ok) {
				toast.success(`Patch note v${deleteData.version} deleted.`);
				setPatchNotes((prev) => prev.filter((n) => n.id !== deleteData.id));
			} else {
				toast.error('Failed to delete patch note');
			}
		} catch (e) {
			console.error(e);
			toast.error('Error deleting patch note');
		} finally {
			setDeleteData(null);
		}
	};

	const filteredCommits = gitCommits.filter(
		(c) =>
			c.subject.toLowerCase().includes(commitFilter.toLowerCase()) ||
			c.shortHash.toLowerCase().includes(commitFilter.toLowerCase()) ||
			c.author.toLowerCase().includes(commitFilter.toLowerCase())
	);

	return (
		<div className="space-y-8">
			{/* Top Header Badge & Meta */}
			<div className="flex flex-wrap items-center justify-between gap-4 pb-2 border-b border-border/40">
				<div>
					<div className="flex items-center gap-2 mb-1">
						<span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-widest bg-primary/10 text-primary border border-primary/20">
							Data-Driven Release Engine
						</span>
						<span className="text-xs text-muted-foreground font-mono">
							&bull; MongoDB Synchronized
						</span>
					</div>
					<h2 className="text-2xl font-bold tracking-tight text-foreground">
						Change Log & Release Studio
					</h2>
					<p className="text-xs text-muted-foreground">
						Manage production patch notes, curate release entries, or auto-ingest real-time commit data directly from the Git repository.
					</p>
				</div>

				<div className="flex items-center gap-2">
					<button
						onClick={() => {
							fetchPatchNotes();
							fetchCommits();
						}}
						disabled={loadingNotes || loadingCommits}
						className="px-3.5 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-foreground flex items-center gap-2 transition-all active:scale-95 disabled:opacity-50"
					>
						<RefreshCw
							className={`w-3.5 h-3.5 ${
								loadingNotes || loadingCommits ? 'animate-spin text-primary' : ''
							}`}
						/>
						<span>Refresh Sources</span>
					</button>
					<a
						href="/patch-notes"
						target="_blank"
						rel="noopener noreferrer"
						className="px-3.5 py-2 rounded-full bg-primary/10 hover:bg-primary/20 border border-primary/20 text-xs font-semibold text-primary flex items-center gap-1.5 transition-all"
					>
						<span>View Public Page</span>
						<ArrowUpRight className="w-3.5 h-3.5" />
					</a>
				</div>
			</div>

			{/* Main Asymmetrical Grid: Left Column = Release Builder, Right Column = Live Git Commits Feed */}
			<div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
				{/* RELEASE BUILDER (Col-span 7) */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, ease: MOTION_EASE }}
					className="lg:col-span-7 p-1.5 rounded-4xl bg-white/3 dark:bg-white/2 border border-white/10 shadow-xl"
				>
					<div className="p-6 md:p-7 rounded-[calc(2rem-0.375rem)] bg-card/95 backdrop-blur-2xl border border-white/5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)]">
						<div className="flex items-center justify-between pb-5 mb-5 border-b border-border/50">
							<div className="flex items-center gap-2.5">
								<div className="p-2.5 rounded-2xl bg-primary/10 border border-primary/20 text-primary">
									<Sparkles className="w-4 h-4" />
								</div>
								<div>
									<h3 className="text-base font-bold tracking-tight text-foreground">
										Publish New Patch Release
									</h3>
									<p className="text-[11px] text-muted-foreground">
										Create a validated changelog entry stored directly in MongoDB
									</p>
								</div>
							</div>
							<span className="text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 rounded-full bg-primary/5 text-primary border border-primary/15">
								Active Draft
							</span>
						</div>

						<form onSubmit={handleCreatePatchNote} className="space-y-4">
							<div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
								<div>
									<label className="block text-xs font-medium text-muted-foreground mb-1">
										Version Tag
									</label>
									<div className="relative">
										<span className="absolute left-3 top-2.5 text-xs font-mono text-muted-foreground">
											v
										</span>
										<input
											type="text"
											placeholder="1.9.11"
											value={version}
											onChange={(e) => setVersion(e.target.value)}
											className="w-full pl-7 pr-3 py-2 bg-background/60 border border-border/60 rounded-xl text-xs font-mono focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
											required
										/>
									</div>
								</div>

								<div>
									<label className="block text-xs font-medium text-muted-foreground mb-1">
										Release Type
									</label>
									<select
										value={type}
										onChange={(e) =>
											setType(e.target.value as 'major' | 'minor' | 'patch')
										}
										className="w-full px-3 py-2 bg-background/60 border border-border/60 rounded-xl text-xs focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
									>
										<option value="patch">Patch (Fixes & Polish)</option>
										<option value="minor">Minor (New Features)</option>
										<option value="major">Major (System Redesign)</option>
									</select>
								</div>

								<div>
									<label className="block text-xs font-medium text-muted-foreground mb-1">
										Display Date / Label
									</label>
									<input
										type="text"
										placeholder="Commits on Sep 2, 2026"
										value={date}
										onChange={(e) => setDate(e.target.value)}
										className="w-full px-3 py-2 bg-background/60 border border-border/60 rounded-xl text-xs focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
									/>
								</div>
							</div>

							<div>
								<label className="block text-xs font-medium text-muted-foreground mb-1">
									Release Title
								</label>
								<input
									type="text"
									placeholder="e.g. Developer Tools Overhaul & MongoDB Release Engine"
									value={title}
									onChange={(e) => setTitle(e.target.value)}
									className="w-full px-3.5 py-2.5 bg-background/60 border border-border/60 rounded-xl text-xs font-medium focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-muted-foreground/50"
									required
								/>
							</div>

							{/* Changes List */}
							<div className="space-y-2 pt-2">
								<div className="flex items-center justify-between">
									<label className="block text-xs font-semibold text-foreground">
										Release Bullet Points ({changes.length})
									</label>
									<span className="text-[10px] text-muted-foreground">
										Tip: Click &apos;+ Add to Draft&apos; on any Git commit &rarr;
									</span>
								</div>

								<div className="flex gap-2">
									<input
										type="text"
										placeholder="e.g. feat: add automated git commit ingestion to dashboard"
										value={newChangeInput}
										onChange={(e) => setNewChangeInput(e.target.value)}
										onKeyDown={(e) => {
											if (e.key === 'Enter') {
												e.preventDefault();
												handleAddChange();
											}
										}}
										className="flex-1 px-3 py-2 bg-background/60 border border-border/60 rounded-xl text-xs focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-muted-foreground/50"
									/>
									<button
										type="button"
										onClick={handleAddChange}
										className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-foreground flex items-center gap-1.5 transition-all"
									>
										<Plus className="w-3.5 h-3.5" />
										<span>Add</span>
									</button>
								</div>

								{/* Changes Preview Pill Deck */}
								<div className="space-y-2 max-h-56 overflow-y-auto pr-1 pt-1">
									{changes.length === 0 ? (
										<div className="p-5 text-center rounded-2xl border border-dashed border-border/60 bg-white/1 text-xs text-muted-foreground">
											No changes added to this release yet. Type a bullet point above or import from the Live Commits feed.
										</div>
									) : (
										changes.map((item, idx) => (
											<div
												key={idx}
												className="group flex items-start justify-between gap-3 p-2.5 rounded-xl bg-background/50 border border-border/50 hover:border-primary/30 transition-all text-xs"
											>
												<div className="flex items-start gap-2.5 min-w-0">
													<GitCommit className="w-3.5 h-3.5 text-primary mt-0.5 shrink-0" />
													<span className="text-foreground leading-relaxed">
														{item}
													</span>
												</div>
												<button
													type="button"
													onClick={() => handleRemoveChange(idx)}
													className="opacity-60 hover:opacity-100 text-muted-foreground hover:text-red-400 p-1 transition-colors"
													title="Remove item"
												>
													<Trash2 className="w-3.5 h-3.5" />
												</button>
											</div>
										))
									)}
								</div>
							</div>

							<div className="pt-4 border-t border-border/40 flex items-center justify-between">
								<span className="text-[11px] text-muted-foreground font-mono">
									Target: <code className="text-foreground">patch_notes</code> MongoDB Collection
								</span>
								<button
									type="submit"
									disabled={isSubmitting || changes.length === 0 || !title.trim()}
									className="group relative inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-linear-to-r from-primary via-purple-600 to-primary bg-size-[200%_auto] text-white font-semibold text-xs shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all duration-300 disabled:opacity-50 active:scale-[0.98]"
								>
									<span>{isSubmitting ? 'Writing to DB...' : 'Publish Patch Note'}</span>
									<span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center group-hover:translate-x-0.5 transition-transform">
										<Check className="w-3 h-3" />
									</span>
								</button>
							</div>
						</form>
					</div>
				</motion.div>

				{/* LIVE GIT COMMITS INGESTION DECK (Col-span 5) */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.1, ease: MOTION_EASE }}
					className="lg:col-span-5 p-1.5 rounded-4xl bg-white/3 dark:bg-white/2 border border-white/10 shadow-xl flex flex-col"
				>
					<div className="p-6 rounded-[calc(2rem-0.375rem)] bg-card/95 backdrop-blur-2xl border border-white/5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)] flex flex-col justify-between h-full">
						<div>
							{/* Feed Header */}
							<div className="flex items-center justify-between pb-4 mb-4 border-b border-border/50">
								<div className="flex items-center gap-2.5">
									<div className="p-2 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400">
										<GitBranch className="w-4 h-4" />
									</div>
									<div>
										<h3 className="text-base font-bold tracking-tight text-foreground">
											Live Repository Commits
										</h3>
										<p className="text-[11px] text-muted-foreground">
											Extracted from local git history
										</p>
									</div>
								</div>
								<span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20">
									<span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
									{gitCommits.length} COMMITS
								</span>
							</div>

							{/* Search input */}
							<div className="relative mb-3">
								<Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-muted-foreground" />
								<input
									type="text"
									placeholder="Search commits by message, hash, or author..."
									value={commitFilter}
									onChange={(e) => setCommitFilter(e.target.value)}
									className="w-full pl-8 pr-3 py-1.5 bg-background/60 border border-border/50 rounded-xl text-xs focus:border-primary outline-none transition-all placeholder:text-muted-foreground/50"
								/>
							</div>

							{/* Commit Stream */}
							<div className="space-y-2 max-h-96 overflow-y-auto pr-1">
								{loadingCommits ? (
									<div className="py-12 text-center text-xs text-muted-foreground animate-pulse">
										Reading repository commit log...
									</div>
								) : filteredCommits.length === 0 ? (
									<div className="py-12 text-center text-xs text-muted-foreground">
										No matching git commits found.
									</div>
								) : (
									filteredCommits.map((commit) => (
										<div
											key={commit.hash}
											className="group p-3 rounded-2xl bg-white/2 hover:bg-white/4 border border-white/5 hover:border-white/15 transition-all duration-200"
										>
											<div className="flex items-start justify-between gap-2">
												<div className="min-w-0">
													<div className="flex items-center gap-1.5 mb-1">
														<span
															className={`px-1.5 py-0.2 rounded text-[9px] font-bold uppercase ${
																commit.type === 'feat'
																	? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
																	: commit.type === 'fix'
																		? 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
																		: commit.type === 'refactor'
																			? 'bg-purple-500/15 text-purple-400 border border-purple-500/30'
																			: 'bg-muted text-muted-foreground'
															}`}
														>
															{commit.type}
														</span>
														<span className="text-[10px] font-mono text-muted-foreground">
															{commit.shortHash}
														</span>
														<span className="text-[10px] text-muted-foreground/60">
															&bull; {commit.date}
														</span>
													</div>
													<p className="text-xs text-foreground font-medium line-clamp-2 leading-relaxed">
														{commit.subject}
													</p>
												</div>

												<button
													type="button"
													onClick={() =>
														handleAddCommitToChanges(commit.subject)
													}
													className="shrink-0 p-1.5 rounded-lg bg-primary/10 hover:bg-primary text-primary hover:text-white transition-all text-xs font-medium"
													title="Append to Changelog Draft"
												>
													<Plus className="w-3.5 h-3.5" />
												</button>
											</div>
										</div>
									))
								)}
							</div>
						</div>

						<div className="pt-3 mt-3 border-t border-border/40 text-[11px] text-muted-foreground flex items-center justify-between">
							<span>Live repo log stream</span>
							<span className="font-mono text-primary">git log -n 60</span>
						</div>
					</div>
				</motion.div>
			</div>

			{/* PUBLISHED PATCH NOTES TABLE / ACCORDION */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5, delay: 0.2, ease: MOTION_EASE }}
				className="p-1.5 rounded-4xl bg-white/3 dark:bg-white/2 border border-white/10 shadow-xl"
			>
				<div className="p-6 md:p-8 rounded-[calc(2rem-0.375rem)] bg-card/95 backdrop-blur-2xl border border-white/5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)]">
					<div className="flex flex-wrap items-center justify-between gap-3 pb-5 mb-5 border-b border-border/50">
						<div className="flex items-center gap-2.5">
							<div className="p-2.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
								<Layers className="w-4 h-4" />
							</div>
							<div>
								<h3 className="text-lg font-bold tracking-tight text-foreground">
									Database Patch Notes Catalog
								</h3>
								<p className="text-xs text-muted-foreground">
									All verified releases live in the MongoDB collection ({patchNotes.length} versions)
								</p>
							</div>
						</div>

						<span className="text-xs text-muted-foreground font-mono">
							Active collection: <code className="text-foreground">patch_notes</code>
						</span>
					</div>

					{loadingNotes ? (
						<div className="py-16 text-center text-xs text-muted-foreground animate-pulse">
							Querying database for patch notes...
						</div>
					) : patchNotes.length === 0 ? (
						<div className="py-16 text-center text-xs text-muted-foreground">
							No patch notes found in database. Run the seed script or publish your first release note above!
						</div>
					) : (
						<div className="space-y-3">
							{patchNotes.map((note, index) => (
								<div
									key={note.id || note.version}
									className={`p-4.5 rounded-2xl border transition-all duration-300 ${
										index === 0
											? 'bg-primary/3 border-primary/30 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]'
											: 'bg-white/2 border-white/5 hover:border-white/15'
									}`}
								>
									<div className="flex flex-wrap items-start justify-between gap-3">
										<div>
											<div className="flex items-center gap-2.5 mb-1.5">
												<span
													className={`px-2.5 py-0.5 rounded-full text-xs font-semibold font-mono border ${
														note.type === 'major'
															? 'bg-purple-500/10 text-purple-400 border-purple-500/25'
															: note.type === 'minor'
																? 'bg-blue-500/10 text-blue-400 border-blue-500/25'
																: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/25'
													}`}
												>
													v{note.version}
												</span>
												<span className="text-xs text-muted-foreground flex items-center gap-1">
													<Clock className="w-3.5 h-3.5" />
													{note.date}
												</span>
												{index === 0 && (
													<span className="px-2 py-0.2 rounded text-[9px] font-bold uppercase tracking-wider bg-primary text-primary-foreground">
														Latest Release
													</span>
												)}
											</div>

											<h4 className="text-base font-bold text-foreground tracking-tight">
												{note.title}
											</h4>
										</div>

										{note.id && (
											<button
												onClick={(e) =>
													setDeleteData({
														id: note.id!,
														version: note.version,
														x: e.pageX,
														y: e.pageY,
													})
												}
												className="text-xs text-muted-foreground hover:text-red-400 p-2 rounded-xl hover:bg-red-500/10 transition-colors flex items-center gap-1.5"
												title="Delete Patch Note"
											>
												<Trash2 className="w-3.5 h-3.5" />
												<span>Delete</span>
											</button>
										)}
									</div>

									<div className="mt-3 pt-3 border-t border-border/30 space-y-1.5">
										{note.changes.map((change, i) => (
											<div
												key={i}
												className="flex items-start gap-2.5 text-xs text-muted-foreground"
											>
												<GitCommit className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
												<span className="leading-relaxed">{change}</span>
											</div>
										))}
									</div>
								</div>
							))}
						</div>
					)}
				</div>
			</motion.div>

			{/* Delete Confirmation Modal */}
			<ConfirmationModal
				isOpen={!!deleteData}
				onClose={() => setDeleteData(null)}
				onConfirm={confirmDelete}
				title={`Delete Patch Note v${deleteData?.version}?`}
				message="Are you sure you want to remove this patch note from MongoDB? This action cannot be undone."
				confirmText="Delete Patch Note"
				isDangerous={true}
				triggerPosition={
					deleteData ? { x: deleteData.x, y: deleteData.y } : undefined
				}
			/>
		</div>
	);
}
