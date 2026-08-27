import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { NextSeo } from 'next-seo';
import { motion, AnimatePresence } from 'framer-motion';
import { getSeoPollDetail } from '@/lib/seoConfig';
import { Poll, getPollById } from '@/services/pollService';
import {
	CheckCircle2,
	Clock,
	Users,
	Copy,
	Check,
	Share2,
	ArrowLeft,
	LayoutDashboard,
	PlusCircle,
	AlertCircle,
	Loader2,
	Sparkles,
	Lock,
	Twitter,
	Linkedin,
} from 'lucide-react';
import { GetServerSideProps } from 'next';

const VOTED_KEY = 'joey_voted_polls_v1';
const MY_POLLS_KEY = 'joey_my_created_polls';

interface PollPageProps {
	initialPoll: Poll | null;
	pollId: string;
}

export const getServerSideProps: GetServerSideProps<PollPageProps> = async (
	context,
) => {
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
		console.error('Error in getServerSideProps for poll:', error);
		return {
			props: {
				initialPoll: null,
				pollId: id,
			},
		};
	}
};

export default function PollDetailPage({ initialPoll, pollId }: PollPageProps) {
	const router = useRouter();

	const [poll, setPoll] = useState<Poll | null>(initialPoll);
	const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
	const [hasVoted, setHasVoted] = useState(false);
	const [userVotedOptionIds, setUserVotedOptionIds] = useState<string[]>([]);
	const [isSubmittingVote, setIsSubmittingVote] = useState(false);
	const [voteError, setVoteError] = useState('');
	const [copied, setCopied] = useState(false);
	const [isCreator, setIsCreator] = useState(false);
	const [shareUrl, setShareUrl] = useState('');

	// Setup full URL and check voter history
	useEffect(() => {
		if (typeof window !== 'undefined') {
			const fullUrl = `${window.location.origin}/poll/${pollId}`;
			setShareUrl(fullUrl);

			// Check if voted in localStorage
			try {
				const votedRecord = JSON.parse(
					localStorage.getItem(VOTED_KEY) || '{}',
				);
				if (votedRecord[pollId]) {
					setHasVoted(true);
					setUserVotedOptionIds(
						votedRecord[pollId].selectedOptions || [],
					);
				}

				// Check if author
				const myPolls = JSON.parse(
					localStorage.getItem(MY_POLLS_KEY) || '[]',
				);
				if (myPolls.includes(pollId)) {
					setIsCreator(true);
				}
			} catch (e) {
				console.error('Error reading localStorage', e);
			}
		}
	}, [pollId]);

	// Fetch fresh poll data on client
	const refreshPoll = async () => {
		try {
			const res = await fetch(`/api/polls/${pollId}`);
			if (res.ok) {
				const data = await res.json();
				setPoll(data);
			}
		} catch (error) {
			console.error('Error refreshing poll', error);
		}
	};

	// Check if current user is logged-in author
	useEffect(() => {
		const checkAuthorSession = async () => {
			if (!poll?.authorId) return;
			try {
				const res = await fetch('/api/validateSession');
				if (res.ok) {
					const data = await res.json();
					if (
						data.isAuthenticated &&
						(data.userId === poll.authorId || data.isJoey)
					) {
						setIsCreator(true);
					}
				}
			} catch (e) {
				console.error('Error checking author session', e);
			}
		};
		checkAuthorSession();
	}, [poll?.authorId]);

	if (!poll) {
		return (
			<div className="min-h-screen bg-background pt-36 pb-20 px-4 text-center">
				<div className="max-w-md mx-auto space-y-4">
					<h1 className="text-2xl font-bold text-foreground">
						Poll Not Found
					</h1>
					<p className="text-muted-foreground text-sm">
						The poll you are looking for may have expired, been
						deleted, or the link is incorrect.
					</p>
					<Link
						href="/polls"
						className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold"
					>
						<ArrowLeft className="w-4 h-4" />
						Explore Community Polls
					</Link>
				</div>
			</div>
		);
	}

	const handleOptionToggle = (optionId: string) => {
		if (hasVoted || poll.isExpired) return;

		if (poll.allowMultiple) {
			setSelectedOptions((prev) =>
				prev.includes(optionId)
					? prev.filter((id) => id !== optionId)
					: [...prev, optionId],
			);
		} else {
			setSelectedOptions([optionId]);
		}
	};

	const handleVoteSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (selectedOptions.length === 0) {
			setVoteError('Please select an option to vote');
			return;
		}

		setVoteError('');
		setIsSubmittingVote(true);

		try {
			const res = await fetch(`/api/polls/${pollId}/vote`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ optionIds: selectedOptions }),
			});

			if (!res.ok) {
				const data = await res.json();
				throw new Error(data.message || 'Failed to submit vote');
			}

			const updated = await res.json();
			setPoll(updated);
			setHasVoted(true);
			setUserVotedOptionIds(selectedOptions);

			// Save to local storage to prevent duplicate votes
			try {
				const votedRecord = JSON.parse(
					localStorage.getItem(VOTED_KEY) || '{}',
				);
				votedRecord[pollId] = {
					selectedOptions,
					votedAt: new Date().toISOString(),
				};
				localStorage.setItem(VOTED_KEY, JSON.stringify(votedRecord));
			} catch (err) {
				console.error('Failed to save vote to local storage', err);
			}
		} catch (error: any) {
			console.error('Vote error:', error);
			setVoteError(error.message || 'Failed to cast vote');
		} finally {
			setIsSubmittingVote(false);
		}
	};

	const handleCopyLink = async () => {
		try {
			if (navigator.clipboard) {
				await navigator.clipboard.writeText(shareUrl);
			} else {
				const el = document.createElement('textarea');
				el.value = shareUrl;
				document.body.appendChild(el);
				el.select();
				document.execCommand('copy');
				document.body.removeChild(el);
			}
			setCopied(true);
			setTimeout(() => setCopied(false), 2500);
		} catch (err) {
			console.error('Copy failed', err);
		}
	};

	const formatTimeRemaining = (
		expiresAt: string | null,
		isExpired: boolean,
	) => {
		if (!expiresAt) return 'Never expires';
		if (isExpired) return 'Ended';

		const diff = new Date(expiresAt).getTime() - Date.now();
		if (diff <= 0) return 'Ended';

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

	const showResults = hasVoted || poll.isExpired;

	const seoData = getSeoPollDetail(poll.title, poll.id, poll.description);

	return (
		<>
			<NextSeo {...seoData} />
			<main className="min-h-screen bg-background pt-32 pb-24 px-4 sm:px-6 relative overflow-hidden">
				{/* Glowing Backdrop Orbs */}
				<div className="absolute top-0 right-1/4 w-[550px] h-[550px] bg-primary/10 rounded-full blur-[140px] pointer-events-none" />
				<div className="absolute bottom-10 left-10 w-[450px] h-[450px] bg-emerald-500/10 rounded-full blur-[130px] pointer-events-none" />

				<div className="max-w-3xl mx-auto relative z-10">
					{/* Navigation Top Bar */}
					<div className="flex items-center justify-between gap-4 mb-6">
						<Link
							href="/polls"
							className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors group"
						>
							<ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
							All Polls
						</Link>

						<div className="flex items-center gap-2">
							{isCreator && (
								<Link
									href={`/poll/dashboard/${poll.id}`}
									className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-primary/10 hover:bg-primary/20 text-primary text-xs font-semibold border border-primary/30 transition-colors"
								>
									<LayoutDashboard className="w-3.5 h-3.5" />
									Creator Dashboard
								</Link>
							)}
							<Link
								href="/polls/create"
								className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-secondary hover:bg-secondary/80 text-foreground text-xs font-semibold border border-border transition-colors"
							>
								<PlusCircle className="w-3.5 h-3.5 text-primary" />
								New Poll
							</Link>
						</div>
					</div>

					{/* Main Poll Card */}
					<motion.div
						initial={{ opacity: 0, y: 15 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.4 }}
						className="bg-card/75 backdrop-blur-2xl border border-border/90 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-8"
					>
						{/* Poll Header */}
						<div className="space-y-3 pb-6 border-b border-border/70">
							<div className="flex items-center gap-2 flex-wrap">
								<span className="text-[11px] font-bold px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
									{poll.category || 'General'}
								</span>
								<span
									className={`text-[11px] font-semibold px-3 py-1 rounded-full flex items-center gap-1.5 ${
										poll.isExpired
											? 'bg-muted text-muted-foreground border border-border'
											: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
									}`}
								>
									<Clock className="w-3.5 h-3.5" />
									{formatTimeRemaining(
										poll.expiresAt,
										poll.isExpired,
									)}
								</span>
								<span className="text-[11px] font-medium px-3 py-1 rounded-full bg-secondary text-muted-foreground flex items-center gap-1.5">
									<Users className="w-3.5 h-3.5 text-primary" />
									{poll.totalVotes.toLocaleString()}{' '}
									{poll.totalVotes === 1 ? 'vote' : 'votes'}
								</span>
								{poll.allowMultiple && (
									<span className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20">
										Multi-choice
									</span>
								)}
							</div>

							<h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight leading-tight">
								{poll.title}
							</h1>

							{poll.description && (
								<p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
									{poll.description}
								</p>
							)}

							{showResults && (
								<div className="pt-1 flex items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
									<CheckCircle2 className="w-4 h-4" />
									{poll.isExpired
										? 'This poll has ended. Final community results:'
										: 'Your vote has been recorded! Live results:'}
								</div>
							)}
						</div>

						{voteError && (
							<div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 text-sm font-medium flex items-center gap-2">
								<AlertCircle className="w-4 h-4 shrink-0" />
								{voteError}
							</div>
						)}

						{/* Interactive Poll Items / Results Display */}
						<form onSubmit={handleVoteSubmit} className="space-y-3">
							{poll.options.map((option, idx) => {
								const isSelected = selectedOptions.includes(
									option.id,
								);
								const isUserVoted = userVotedOptionIds.includes(
									option.id,
								);
								const percentage =
									poll.totalVotes > 0
										? Math.round(
												(option.votes /
													poll.totalVotes) *
													100,
											)
										: 0;

								return (
									<div
										key={option.id}
										onClick={() =>
											!showResults &&
											handleOptionToggle(option.id)
										}
										className={`relative overflow-hidden rounded-2xl border transition-all duration-200 ${
											showResults
												? isUserVoted
													? 'border-primary/60 bg-primary/5 shadow-sm'
													: 'border-border/80 bg-secondary/30'
												: isSelected
													? 'border-primary bg-primary/10 shadow-md shadow-primary/10 cursor-pointer'
													: 'border-border/80 bg-secondary/40 hover:border-primary/40 hover:bg-secondary/70 cursor-pointer'
										}`}
									>
										{/* Result Progress Bar Background Fill */}
										{showResults && (
											<motion.div
												initial={{ width: 0 }}
												animate={{
													width: `${percentage}%`,
												}}
												transition={{
													duration: 0.6,
													delay: idx * 0.08,
												}}
												className={`absolute inset-y-0 left-0 ${
													isUserVoted
														? 'bg-gradient-to-r from-primary/25 to-primary/15'
														: 'bg-gradient-to-r from-secondary/80 to-secondary/40'
												} pointer-events-none`}
											/>
										)}

										<div className="relative z-10 flex items-center justify-between p-4 sm:p-5 gap-3">
											{/* Left: Radio/Checkbox or Choice Marker + Option Text */}
											<div className="flex items-center gap-3.5 flex-1 min-w-0">
												{!showResults ? (
													<div
														className={`w-5 h-5 rounded-${
															poll.allowMultiple
																? 'md'
																: 'full'
														} border flex items-center justify-center transition-colors shrink-0 ${
															isSelected
																? 'border-primary bg-primary text-primary-foreground'
																: 'border-muted-foreground/40 bg-background'
														}`}
													>
														{isSelected && (
															<Check className="w-3.5 h-3.5" />
														)}
													</div>
												) : (
													<div className="flex items-center justify-center w-6 h-6 shrink-0">
														{isUserVoted ? (
															<span title="Your choice">
																<CheckCircle2 className="w-5 h-5 text-primary" />
															</span>
														) : (
															<span className="text-xs font-bold text-muted-foreground">
																#{idx + 1}
															</span>
														)}
													</div>
												)}

												<span
													className={`text-sm sm:text-base font-semibold break-words ${
														isUserVoted
															? 'text-primary font-bold'
															: 'text-foreground'
													}`}
												>
													{option.text}
												</span>
											</div>

											{/* Right: Results Percentage & Vote Count (Displayed on the items) */}
											{showResults && (
												<div className="flex items-center gap-3 shrink-0 text-right">
													<span className="text-xs text-muted-foreground hidden sm:inline">
														{option.votes.toLocaleString()}{' '}
														{option.votes === 1
															? 'vote'
															: 'votes'}
													</span>
													<span className="text-sm sm:text-base font-extrabold font-mono text-foreground min-w-[44px]">
														{percentage}%
													</span>
												</div>
											)}
										</div>
									</div>
								);
							})}

							{/* Submit Button (Only shown if user hasn't voted and poll not expired) */}
							{!showResults && (
								<div className="pt-4">
									<button
										type="submit"
										disabled={
											isSubmittingVote ||
											selectedOptions.length === 0
										}
										className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-2xl bg-primary text-primary-foreground font-bold text-base shadow-lg shadow-primary/25 hover:bg-primary/90 hover:shadow-primary/40 active:scale-[0.99] transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
									>
										{isSubmittingVote ? (
											<>
												<Loader2 className="w-5 h-5 animate-spin" />
												<span>Submitting Vote...</span>
											</>
										) : (
											<>
												<Sparkles className="w-5 h-5" />
												<span>Submit Vote</span>
											</>
										)}
									</button>
								</div>
							)}
						</form>

						{/* Shareable Link Box at the Bottom */}
						<div className="pt-6 border-t border-border/70 space-y-3">
							<label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
								<Share2 className="w-3.5 h-3.5 text-primary" />
								Share this Poll
							</label>

							<div className="flex items-center gap-2">
								<input
									type="text"
									readOnly
									value={shareUrl}
									onClick={(e) =>
										(e.target as HTMLInputElement).select()
									}
									className="flex-1 px-4 py-3 rounded-2xl bg-secondary/60 border border-border text-foreground font-mono text-xs sm:text-sm outline-none select-all"
								/>
								<button
									type="button"
									onClick={handleCopyLink}
									className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-primary text-primary-foreground font-semibold text-xs sm:text-sm hover:bg-primary/90 transition-all shadow-md shrink-0 cursor-pointer"
								>
									{copied ? (
										<>
											<Check className="w-4 h-4" />
											<span>Copied!</span>
										</>
									) : (
										<>
											<Copy className="w-4 h-4" />
											<span>Copy</span>
										</>
									)}
								</button>
							</div>

							{/* Social Sharing Quick Buttons */}
							<div className="flex items-center gap-2 pt-1">
								<span className="text-xs text-muted-foreground mr-1">
									Share on:
								</span>
								<a
									href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
										`Vote on this poll: "${poll.title}"`,
									)}&url=${encodeURIComponent(shareUrl)}`}
									target="_blank"
									rel="noopener noreferrer"
									className="p-2 rounded-xl bg-secondary/70 hover:bg-primary/10 hover:text-primary text-muted-foreground border border-border transition-colors"
									aria-label="Share on X / Twitter"
								>
									<Twitter className="w-4 h-4" />
								</a>
								<a
									href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
									target="_blank"
									rel="noopener noreferrer"
									className="p-2 rounded-xl bg-secondary/70 hover:bg-primary/10 hover:text-primary text-muted-foreground border border-border transition-colors"
									aria-label="Share on LinkedIn"
								>
									<Linkedin className="w-4 h-4" />
								</a>
							</div>
						</div>
					</motion.div>
				</div>
			</main>
		</>
	);
}
