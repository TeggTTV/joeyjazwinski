import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { NextSeo } from 'next-seo';
import { motion, AnimatePresence } from 'framer-motion';
import { getSeoPollDashboard } from '@/lib/seoConfig';
import { Poll, getPollById } from '@/services/pollService';
import {
	BarChart3,
	Clock,
	Users,
	Trash2,
	ArrowLeft,
	ExternalLink,
	Copy,
	Check,
	AlertTriangle,
	Loader2,
	Trophy,
	Sparkles,
	PieChart,
	TrendingUp,
	ShieldAlert,
} from 'lucide-react';
import { GetServerSideProps } from 'next';

const MY_POLLS_KEY = 'joey_my_created_polls';

interface PollDashboardProps {
	initialPoll: Poll | null;
	pollId: string;
}

export const getServerSideProps: GetServerSideProps<PollDashboardProps> = async (context) => {
	const { id } = context.params || {};
	if (!id || typeof id !== 'string') {
		return { notFound: true };
	}

	try {
		const poll = await getPollById(id);
		if (!poll) {
			return { notFound: true };
		}

		return {
			props: {
				initialPoll: poll,
				pollId: id,
			},
		};
	} catch (error) {
		console.error('Error fetching poll for dashboard:', error);
		return {
			props: {
				initialPoll: null,
				pollId: id,
			},
		};
	}
};

export default function PollDashboardPage({ initialPoll, pollId }: PollDashboardProps) {
	const router = useRouter();

	const [poll, setPoll] = useState<Poll | null>(initialPoll);
	const [isAuthorized, setIsAuthorized] = useState<boolean>(true);
	const [checkingAuth, setCheckingAuth] = useState(true);
	const [copied, setCopied] = useState(false);
	const [isDeleting, setIsDeleting] = useState(false);
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [deleteError, setDeleteError] = useState('');
	const [shareUrl, setShareUrl] = useState('');

	useEffect(() => {
		if (typeof window !== 'undefined') {
			setShareUrl(`${window.location.origin}/poll/${pollId}`);
		}
	}, [pollId]);

	// Validate authorization
	useEffect(() => {
		const verifyAccess = async () => {
			if (!poll) {
				setCheckingAuth(false);
				setIsAuthorized(false);
				return;
			}

			// 1. Check if creator in local storage
			try {
				const myPolls = JSON.parse(localStorage.getItem(MY_POLLS_KEY) || '[]');
				if (myPolls.includes(pollId)) {
					setIsAuthorized(true);
					setCheckingAuth(false);
					return;
				}
			} catch (e) {
				console.error(e);
			}

			// 2. Check session if poll has authorId
			try {
				const res = await fetch('/api/validateSession');
				if (res.ok) {
					const data = await res.json();
					if (data.isAuthenticated) {
						if (!poll.authorId || data.userId === poll.authorId || data.isJoey) {
							setIsAuthorized(true);
							setCheckingAuth(false);
							return;
						}
					}
				}
			} catch (err) {
				console.error('Session error', err);
			}

			// If poll has no authorId and wasn't in localStorage, grant access if directly navigated or creator
			if (!poll.authorId) {
				setIsAuthorized(true);
			} else {
				setIsAuthorized(false);
			}
			setCheckingAuth(false);
		};

		verifyAccess();
	}, [poll, pollId]);

	const handleCopyLink = async () => {
		try {
			if (navigator.clipboard) {
				await navigator.clipboard.writeText(shareUrl);
			}
			setCopied(true);
			setTimeout(() => setCopied(false), 2500);
		} catch (e) {
			console.error(e);
		}
	};

	const handleDeletePoll = async () => {
		setIsDeleting(true);
		setDeleteError('');

		try {
			const res = await fetch(`/api/polls/${pollId}`, {
				method: 'DELETE',
			});

			if (!res.ok) {
				const data = await res.json();
				throw new Error(data.message || 'Failed to delete poll');
			}

			// Remove from my created polls local storage
			try {
				const myPolls = JSON.parse(localStorage.getItem(MY_POLLS_KEY) || '[]');
				const updated = myPolls.filter((id: string) => id !== pollId);
				localStorage.setItem(MY_POLLS_KEY, JSON.stringify(updated));
			} catch (e) {
				console.error(e);
			}

			// Redirect user back to homepage
			router.push('/');
		} catch (error: any) {
			console.error('Error deleting poll:', error);
			setDeleteError(error.message || 'Failed to delete poll');
			setIsDeleting(false);
			setShowDeleteModal(false);
		}
	};

	if (!poll) {
		return (
			<div className="min-h-screen bg-background pt-36 pb-20 px-4 text-center">
				<div className="max-w-md mx-auto space-y-4">
					<h1 className="text-2xl font-bold text-foreground">Poll Not Found</h1>
					<p className="text-muted-foreground text-sm">
						This poll could not be loaded or was removed.
					</p>
					<Link
						href="/"
						className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold"
					>
						Return Home
					</Link>
				</div>
			</div>
		);
	}

	if (!checkingAuth && !isAuthorized) {
		return (
			<div className="min-h-screen bg-background pt-36 pb-20 px-4 text-center">
				<div className="max-w-md mx-auto space-y-4 bg-card/80 p-8 rounded-3xl border border-border shadow-xl">
					<ShieldAlert className="w-12 h-12 text-red-500 mx-auto" />
					<h1 className="text-2xl font-bold text-foreground">Unauthorized Access</h1>
					<p className="text-muted-foreground text-sm">
						You do not have creator permissions to manage this poll&apos;s dashboard.
					</p>
					<div className="flex justify-center gap-3 pt-2">
						<Link
							href={`/poll/${pollId}`}
							className="px-4 py-2 rounded-xl bg-secondary text-foreground text-sm font-semibold border border-border"
						>
							View Public Poll
						</Link>
						<Link
							href="/"
							className="px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-semibold"
						>
							Go Home
						</Link>
					</div>
				</div>
			</div>
		);
	}

	// Sorted options by vote count descending
	const sortedOptions = [...poll.options].sort((a, b) => b.votes - a.votes);
	const winningOption = sortedOptions[0];

	const formatTimeRemaining = (expiresAt: string | null, isExpired: boolean) => {
		if (!expiresAt) return 'Never expires';
		if (isExpired) return 'Expired / Closed';

		const diff = new Date(expiresAt).getTime() - Date.now();
		if (diff <= 0) return 'Expired / Closed';

		const hours = Math.floor(diff / (1000 * 60 * 60));
		const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

		if (hours > 24) {
			const days = Math.floor(hours / 24);
			return `${days}d left`;
		}
		if (hours > 0) {
			return `${hours}h ${minutes}m left`;
		}
		return `${minutes}m left`;
	};

	const seoData = getSeoPollDashboard(poll.title, poll.id);

	return (
		<>
			<NextSeo {...seoData} />
			<main className="min-h-screen bg-background pt-32 pb-24 px-4 sm:px-6 relative overflow-hidden">
				{/* Ambient Glows */}
				<div className="absolute top-0 right-10 w-[550px] h-[550px] bg-primary/10 rounded-full blur-[140px] pointer-events-none" />
				<div className="absolute bottom-10 left-10 w-[450px] h-[450px] bg-amber-500/10 rounded-full blur-[130px] pointer-events-none" />

				<div className="max-w-4xl mx-auto relative z-10 space-y-8">
					{/* Top Back and Navigation */}
					<div className="flex items-center justify-between gap-4">
						<Link
							href={`/poll/${poll.id}`}
							className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors group"
						>
							<ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
							View Public Poll
						</Link>

						<div className="flex items-center gap-2">
							<button
								onClick={handleCopyLink}
								className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-secondary hover:bg-secondary/80 text-foreground text-xs font-semibold border border-border transition-colors cursor-pointer"
							>
								{copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
								<span>{copied ? 'Link Copied' : 'Share Poll'}</span>
							</button>

							<Link
								href={`/poll/${poll.id}`}
								target="_blank"
								className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-semibold shadow-sm hover:bg-primary/90 transition-colors"
							>
								<span>Open Live</span>
								<ExternalLink className="w-3.5 h-3.5" />
							</Link>
						</div>
					</div>

					{/* Header Card */}
					<div className="bg-card/75 backdrop-blur-2xl border border-border/90 rounded-3xl p-6 sm:p-8 shadow-xl space-y-4">
						<div className="flex items-center gap-2 flex-wrap">
							<span className="text-[11px] font-bold px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 flex items-center gap-1">
								<BarChart3 className="w-3.5 h-3.5" />
								Creator Analytics
							</span>
							<span
								className={`text-[11px] font-semibold px-3 py-1 rounded-full flex items-center gap-1 ${
									poll.isExpired
										? 'bg-muted text-muted-foreground border border-border'
										: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
								}`}
							>
								<Clock className="w-3.5 h-3.5" />
								{formatTimeRemaining(poll.expiresAt, poll.isExpired)}
							</span>
							<span className="text-[11px] font-medium px-3 py-1 rounded-full bg-secondary text-muted-foreground">
								Category: {poll.category || 'General'}
							</span>
						</div>

						<h1 className="text-2xl sm:text-4xl font-extrabold text-foreground tracking-tight">
							{poll.title}
						</h1>

						{poll.description && (
							<p className="text-sm sm:text-base text-muted-foreground">
								{poll.description}
							</p>
						)}

						<div className="text-xs text-muted-foreground pt-1">
							Created on {new Date(poll.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
						</div>
					</div>

					{deleteError && (
						<div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 text-sm font-medium flex items-center gap-2">
							<AlertTriangle className="w-4 h-4 shrink-0" />
							{deleteError}
						</div>
					)}

					{/* Metric KPI Cards */}
					<div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
						{/* Total Votes */}
						<div className="p-5 rounded-2xl bg-card/60 border border-border/80 shadow-md space-y-2">
							<div className="flex items-center justify-between text-muted-foreground">
								<span className="text-xs font-bold uppercase tracking-wider">Total Votes</span>
								<Users className="w-4 h-4 text-primary" />
							</div>
							<div className="text-3xl font-extrabold font-mono text-foreground">
								{poll.totalVotes.toLocaleString()}
							</div>
							<div className="text-xs text-muted-foreground">
								Across {poll.options.length} options
							</div>
						</div>

						{/* Top Ranked Option */}
						<div className="p-5 rounded-2xl bg-card/60 border border-border/80 shadow-md space-y-2">
							<div className="flex items-center justify-between text-muted-foreground">
								<span className="text-xs font-bold uppercase tracking-wider">Leading Option</span>
								<Trophy className="w-4 h-4 text-yellow-500" />
							</div>
							<div className="text-lg font-bold text-foreground truncate" title={winningOption?.text}>
								{poll.totalVotes > 0 ? winningOption?.text : 'No votes yet'}
							</div>
							<div className="text-xs text-muted-foreground font-mono">
								{poll.totalVotes > 0
									? `${winningOption?.votes} votes (${Math.round((winningOption?.votes / poll.totalVotes) * 100)}%)`
									: 'Waiting for first participant'}
							</div>
						</div>

						{/* Status & Mode */}
						<div className="p-5 rounded-2xl bg-card/60 border border-border/80 shadow-md space-y-2">
							<div className="flex items-center justify-between text-muted-foreground">
								<span className="text-xs font-bold uppercase tracking-wider">Poll Status</span>
								<TrendingUp className="w-4 h-4 text-emerald-500" />
							</div>
							<div className="text-lg font-bold text-foreground">
								{poll.isExpired ? 'Completed / Closed' : 'Active & Accepting Votes'}
							</div>
							<div className="text-xs text-muted-foreground">
								{poll.allowMultiple ? 'Multi-choice voting' : 'Single vote per voter'}
							</div>
						</div>
					</div>

					{/* Detailed Options Breakdown Section */}
					<div className="bg-card/75 backdrop-blur-2xl border border-border/90 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
						<div className="flex items-center justify-between border-b border-border/70 pb-4">
							<h2 className="text-xl font-bold text-foreground flex items-center gap-2">
								<PieChart className="w-5 h-5 text-primary" />
								Detailed Vote Distribution
							</h2>
							<span className="text-xs text-muted-foreground">
								Ranked by popularity
							</span>
						</div>

						<div className="space-y-4">
							{sortedOptions.map((opt, rank) => {
								const percentage =
									poll.totalVotes > 0
										? Math.round((opt.votes / poll.totalVotes) * 100)
										: 0;

								return (
									<div key={opt.id} className="space-y-1.5">
										<div className="flex items-center justify-between text-sm">
											<div className="flex items-center gap-2 font-medium text-foreground">
												<span className="flex items-center justify-center w-5 h-5 rounded-md bg-secondary text-[11px] font-bold text-muted-foreground">
													#{rank + 1}
												</span>
												<span>{opt.text}</span>
												{rank === 0 && poll.totalVotes > 0 && (
													<span className="text-[10px] font-bold uppercase px-2 py-0.2 rounded-full bg-yellow-500/15 text-yellow-600 dark:text-yellow-400 border border-yellow-500/20">
														Leader
													</span>
												)}
											</div>
											<div className="flex items-center gap-3 font-mono">
												<span className="text-xs text-muted-foreground">
													{opt.votes.toLocaleString()} {opt.votes === 1 ? 'vote' : 'votes'}
												</span>
												<span className="font-bold text-sm text-foreground min-w-[40px] text-right">
													{percentage}%
												</span>
											</div>
										</div>

										{/* Progress track */}
										<div className="h-3 rounded-full bg-secondary overflow-hidden">
											<motion.div
												initial={{ width: 0 }}
												animate={{ width: `${percentage}%` }}
												transition={{ duration: 0.6, delay: rank * 0.08 }}
												className={`h-full rounded-full ${
													rank === 0 && poll.totalVotes > 0
														? 'bg-gradient-to-r from-primary to-emerald-400'
														: 'bg-primary/50'
												}`}
											/>
										</div>
									</div>
								);
							})}
						</div>
					</div>

					{/* Danger Zone: Stop / Delete Poll */}
					<div className="p-6 sm:p-8 rounded-3xl bg-red-500/5 border border-red-500/20 space-y-4">
						<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
							<div className="space-y-1">
								<h3 className="text-lg font-bold text-red-600 dark:text-red-400 flex items-center gap-2">
									<Trash2 className="w-5 h-5" />
									Stop &amp; Delete Poll
								</h3>
								<p className="text-xs sm:text-sm text-muted-foreground max-w-xl">
									Permanently remove this poll and all associated votes from the database. 
									This action stops voting immediately and redirects you back to the homepage.
								</p>
							</div>

							<button
								type="button"
								onClick={() => setShowDeleteModal(true)}
								disabled={isDeleting}
								className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all shrink-0 cursor-pointer disabled:opacity-50"
							>
								Delete Poll
							</button>
						</div>
					</div>
				</div>

				{/* Deletion Confirmation Modal */}
				<AnimatePresence>
					{showDeleteModal && (
						<div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
							<motion.div
								initial={{ opacity: 0, scale: 0.9 }}
								animate={{ opacity: 1, scale: 1 }}
								exit={{ opacity: 0, scale: 0.9 }}
								transition={{ duration: 0.2 }}
								className="w-full max-w-md bg-card border border-border rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6"
							>
								<div className="w-12 h-12 rounded-2xl bg-red-500/15 text-red-500 flex items-center justify-center mx-auto">
									<AlertTriangle className="w-6 h-6" />
								</div>

								<div className="text-center space-y-2">
									<h3 className="text-xl font-extrabold text-foreground">
										Delete Poll Permanently?
									</h3>
									<p className="text-xs sm:text-sm text-muted-foreground">
										Are you sure you want to delete &quot;<span className="font-semibold text-foreground">{poll.title}</span>&quot;? 
										This will erase all {poll.totalVotes} votes and remove the poll from the database.
									</p>
								</div>

								<div className="flex items-center gap-3">
									<button
										type="button"
										onClick={() => setShowDeleteModal(false)}
										disabled={isDeleting}
										className="flex-1 py-3 rounded-xl bg-secondary hover:bg-secondary/80 text-foreground font-semibold text-sm transition-colors cursor-pointer"
									>
										Cancel
									</button>
									<button
										type="button"
										onClick={handleDeletePoll}
										disabled={isDeleting}
										className="flex-1 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm shadow-lg shadow-red-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
									>
										{isDeleting ? (
											<>
												<Loader2 className="w-4 h-4 animate-spin" />
												<span>Deleting...</span>
											</>
										) : (
											<span>Confirm Delete</span>
										)}
									</button>
								</div>
							</motion.div>
						</div>
					)}
				</AnimatePresence>
			</main>
		</>
	);
}
