import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { NextSeo } from 'next-seo';
import { motion } from 'framer-motion';
import { seoPolls } from '@/lib/seoConfig';
import { Poll } from '@/services/pollService';
import {
	PlusCircle,
	BarChart3,
	Clock,
	Users,
	Sparkles,
	ArrowRight,
	CheckCircle2,
	TrendingUp,
	Filter,
	Zap,
} from 'lucide-react';

const CATEGORIES = ['All', 'Technology', 'Web Dev', 'Gaming', 'Design', 'General'];

export default function PollsIndexPage() {
	const [polls, setPolls] = useState<Poll[]>([]);
	const [loading, setLoading] = useState(true);
	const [selectedCategory, setSelectedCategory] = useState('All');
	const [searchQuery, setSearchQuery] = useState('');

	useEffect(() => {
		const fetchPolls = async () => {
			try {
				const query = selectedCategory !== 'All' ? `?category=${encodeURIComponent(selectedCategory)}` : '';
				const res = await fetch(`/api/polls${query}`);
				if (res.ok) {
					const data = await res.json();
					setPolls(data);
				}
			} catch (error) {
				console.error('Error fetching polls:', error);
			} finally {
				setLoading(false);
			}
		};

		fetchPolls();
	}, [selectedCategory]);

	const filteredPolls = polls.filter((poll) => {
		const matchesSearch =
			poll.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
			(poll.description && poll.description.toLowerCase().includes(searchQuery.toLowerCase()));
		return matchesSearch;
	});

	const formatTimeRemaining = (expiresAt: string | null, isExpired: boolean) => {
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

	return (
		<>
			<NextSeo {...seoPolls} />
			<main className="min-h-screen bg-background pt-32 pb-20 px-4 sm:px-6 relative overflow-hidden">
				{/* Background Glows */}
				<div className="absolute top-0 right-0 w-[550px] h-[550px] bg-primary/10 rounded-full blur-[130px] pointer-events-none" />
				<div className="absolute bottom-10 left-0 w-[450px] h-[450px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />

				<div className="max-w-4xl mx-auto relative z-10">
					{/* Header */}
					<motion.div
						className="text-center mb-12"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5 }}
					>
						<div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-semibold mb-4">
							<Sparkles className="w-4 h-4 animate-pulse" />
							Community Polls & Surveys
						</div>
						<h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
							Create &amp; Share{' '}
							<span className="bg-gradient-to-r from-primary via-emerald-400 to-cyan-500 bg-clip-text text-transparent">
								Free Polls
							</span>
						</h1>
						<p className="text-muted-foreground text-lg max-w-xl mx-auto leading-relaxed">
							Instantly gather opinions, make group decisions, and discover community trends. 
							No signup or login required.
						</p>
					</motion.div>

					{/* Two List-Form Option Buttons */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.1, duration: 0.5 }}
						className="flex flex-col gap-4 mb-16"
					>
						{/* Option 1: Create Poll */}
						<Link
							href="/polls/create"
							className="group relative overflow-hidden flex items-center justify-between p-6 sm:p-7 bg-card/70 hover:bg-card/90 backdrop-blur-xl border border-primary/30 hover:border-primary/70 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-primary/10 hover:-translate-y-0.5"
						>
							<div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
							<div className="flex items-center gap-5 relative z-10">
								<div className="w-14 h-14 rounded-2xl bg-primary/15 border border-primary/30 flex items-center justify-center text-primary group-hover:scale-105 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 shadow-inner">
									<PlusCircle className="w-7 h-7" />
								</div>
								<div>
									<div className="flex items-center gap-2">
										<h2 className="text-xl sm:text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
											Create a Poll
										</h2>
										<span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-primary/15 text-primary border border-primary/20">
											Instant
										</span>
									</div>
									<p className="text-sm text-muted-foreground mt-1 max-w-md">
										Start a new poll with custom items, flexible durations, and immediate share links.
									</p>
								</div>
							</div>
							<div className="relative z-10 flex items-center justify-center w-10 h-10 rounded-full bg-secondary/80 text-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-colors shrink-0 ml-4">
								<ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
							</div>
						</Link>

						{/* Option 2: Explore Community Polls */}
						<a
							href="#browse-polls"
							onClick={(e) => {
								e.preventDefault();
								document.getElementById('browse-polls')?.scrollIntoView({ behavior: 'smooth' });
							}}
							className="group relative overflow-hidden flex items-center justify-between p-6 sm:p-7 bg-card/50 hover:bg-card/80 backdrop-blur-xl border border-border/80 hover:border-border rounded-2xl transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5"
						>
							<div className="absolute inset-0 bg-gradient-to-r from-secondary/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
							<div className="flex items-center gap-5 relative z-10">
								<div className="w-14 h-14 rounded-2xl bg-secondary border border-border flex items-center justify-center text-foreground group-hover:scale-105 group-hover:text-primary transition-all duration-300">
									<BarChart3 className="w-7 h-7" />
								</div>
								<div>
									<div className="flex items-center gap-2">
										<h2 className="text-xl sm:text-2xl font-bold text-foreground">
											Explore Community Polls
										</h2>
										<span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-muted text-muted-foreground border border-border">
											Live Results
										</span>
									</div>
									<p className="text-sm text-muted-foreground mt-1 max-w-md">
										Browse active surveys, cast your vote, and discover what others think in real time.
									</p>
								</div>
							</div>
							<div className="relative z-10 flex items-center justify-center w-10 h-10 rounded-full bg-secondary/80 text-muted-foreground group-hover:text-foreground transition-colors shrink-0 ml-4">
								<ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
							</div>
						</a>
					</motion.div>

					{/* Browse Section */}
					<div id="browse-polls" className="pt-4 space-y-6">
						<div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2 border-b border-border/60">
							<div>
								<h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
									<TrendingUp className="w-5 h-5 text-primary" />
									Active Community Polls
								</h2>
								<p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
									Click any poll to participate and see real-time votes.
								</p>
							</div>

							{/* Category Filters */}
							<div className="flex items-center gap-1.5 overflow-x-auto max-w-full pb-1">
								{CATEGORIES.map((cat) => (
									<button
										key={cat}
										onClick={() => setSelectedCategory(cat)}
										className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all shrink-0 cursor-pointer ${
											selectedCategory === cat
												? 'bg-primary text-primary-foreground shadow-sm'
												: 'bg-secondary/70 text-muted-foreground hover:text-foreground hover:bg-secondary'
										}`}
									>
										{cat}
									</button>
								))}
							</div>
						</div>

						{/* Polls Feed */}
						{loading ? (
							<div className="space-y-4">
								{[1, 2, 3, 4].map((n) => (
									<div
										key={n}
										className="h-28 rounded-2xl bg-card/40 border border-border/50 animate-pulse"
									/>
								))}
							</div>
						) : filteredPolls.length > 0 ? (
							<div className="space-y-4">
								{filteredPolls.map((poll, idx) => (
									<motion.div
										key={poll.id}
										initial={{ opacity: 0, y: 15 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{ delay: idx * 0.05, duration: 0.4 }}
									>
										<Link
											href={`/poll/${poll.id}`}
											className="group block p-5 sm:p-6 bg-card/60 hover:bg-card/90 backdrop-blur-xl border border-border/80 hover:border-primary/50 rounded-2xl transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5"
										>
											<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
												<div className="space-y-2 flex-1">
													<div className="flex items-center gap-2 flex-wrap">
														<span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
															{poll.category || 'General'}
														</span>
														<span
															className={`text-[11px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1 ${
																poll.isExpired
																	? 'bg-muted text-muted-foreground border border-border'
																	: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
															}`}
														>
															<Clock className="w-3 h-3" />
															{formatTimeRemaining(poll.expiresAt, poll.isExpired)}
														</span>
														{poll.allowMultiple && (
															<span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-secondary text-muted-foreground">
																Multiple Choice
															</span>
														)}
													</div>
													<h3 className="text-lg sm:text-xl font-bold text-foreground group-hover:text-primary transition-colors leading-snug">
														{poll.title}
													</h3>
													{poll.description && (
														<p className="text-xs sm:text-sm text-muted-foreground line-clamp-1">
															{poll.description}
														</p>
													)}
												</div>

												{/* Stats & CTA */}
												<div className="flex items-center gap-4 sm:gap-6 pt-2 sm:pt-0 border-t sm:border-t-0 border-border/40 shrink-0">
													<div className="flex items-center gap-1.5 text-xs sm:text-sm text-muted-foreground">
														<Users className="w-4 h-4 text-primary" />
														<span className="font-bold text-foreground">
															{poll.totalVotes.toLocaleString()}
														</span>
														<span>votes</span>
													</div>
													<span className="text-xs sm:text-sm font-semibold text-primary flex items-center gap-1 group-hover:translate-x-1 transition-transform">
														Vote <ArrowRight className="w-4 h-4" />
													</span>
												</div>
											</div>
										</Link>
									</motion.div>
								))}
							</div>
						) : (
							<div className="text-center py-16 px-4 rounded-2xl bg-card/30 border border-dashed border-border/80">
								<Zap className="w-12 h-12 text-muted-foreground/50 mx-auto mb-3" />
								<h3 className="text-lg font-bold text-foreground mb-1">
									No polls in this category yet
								</h3>
								<p className="text-sm text-muted-foreground max-w-sm mx-auto mb-6">
									Be the first to create a poll and spark a discussion in the community.
								</p>
								<Link
									href="/polls/create"
									className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors shadow-md"
								>
									<PlusCircle className="w-4 h-4" />
									Create First Poll
								</Link>
							</div>
						)}
					</div>
				</div>
			</main>
		</>
	);
}
