import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { NextSeo } from 'next-seo';
import { motion, AnimatePresence } from 'framer-motion';
import { seoCreatePoll } from '@/lib/seoConfig';
import {
	Plus,
	Trash2,
	Clock,
	Check,
	Sparkles,
	ArrowLeft,
	Loader2,
	Save,
	RotateCcw,
	Layers,
	HelpCircle,
	Lock,
	CheckSquare,
} from 'lucide-react';

const DRAFT_KEY = 'joey_poll_draft_v1';
const MY_POLLS_KEY = 'joey_my_created_polls';

const STANDARD_DURATIONS = [
	{ label: '1 Hour', hours: 1, desc: 'Quick pulse' },
	{ label: '6 Hours', hours: 6, desc: 'Short session' },
	{ label: '1 Day', hours: 24, desc: 'Standard 24h' },
];

const LOGGED_IN_DURATIONS = [
	{ label: '1 Hour', hours: 1, desc: 'Quick pulse' },
	{ label: '6 Hours', hours: 6, desc: 'Short session' },
	{ label: '1 Day', hours: 24, desc: 'Standard 24h' },
	{ label: '3 Days', hours: 72, desc: 'Weekend poll' },
	{ label: '7 Days', hours: 168, desc: 'Full week' },
	{ label: 'Unlimited', hours: 0, desc: 'No expiration' },
];

const CATEGORIES = [
	'General',
	'Technology',
	'Web Dev',
	'Gaming',
	'Design',
	'Other',
];

export default function CreatePollPage() {
	const router = useRouter();

	// Form states
	const [title, setTitle] = useState('');
	const [options, setOptions] = useState<string[]>(['']);
	const [durationHours, setDurationHours] = useState<number>(24);
	const [category, setCategory] = useState<string>('General');
	const [description, setDescription] = useState<string>('');
	const [allowMultiple, setAllowMultiple] = useState<boolean>(false);

	// UI & Auth states
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');
	const [saveStatus, setSaveStatus] = useState<'saved' | 'saving' | 'idle'>(
		'idle',
	);
	const [lastSavedTime, setLastSavedTime] = useState<string | null>(null);
	const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
	const [hasRestoredDraft, setHasRestoredDraft] = useState(false);

	const itemInputRefs = useRef<(HTMLInputElement | null)[]>([]);

	// Check Auth session
	useEffect(() => {
		const checkSession = async () => {
			try {
				const res = await fetch('/api/validateSession');
				if (res.ok) {
					const data = await res.json();
					if (data.isAuthenticated) {
						setIsUserLoggedIn(true);
					}
				}
			} catch (e) {
				console.error('Session validation error', e);
			}
		};
		checkSession();
	}, []);

	// Load Draft from LocalStorage
	useEffect(() => {
		try {
			const saved = localStorage.getItem(DRAFT_KEY);
			if (saved) {
				const parsed = JSON.parse(saved);
				if (
					parsed.title ||
					(parsed.options && parsed.options.length > 0)
				) {
					setTitle(parsed.title || '');
					setOptions(
						parsed.options && parsed.options.length > 0
							? parsed.options
							: [''],
					);
					if (parsed.durationHours !== undefined)
						setDurationHours(parsed.durationHours);
					if (parsed.category) setCategory(parsed.category);
					if (parsed.description) setDescription(parsed.description);
					if (parsed.allowMultiple !== undefined)
						setAllowMultiple(parsed.allowMultiple);
					setHasRestoredDraft(true);
					setSaveStatus('saved');
				}
			}
		} catch (e) {
			console.error('Failed to load draft from localStorage', e);
		}
	}, []);

	// Auto-save draft to LocalStorage periodically / on change
	useEffect(() => {
		setSaveStatus('saving');
		const timer = setTimeout(() => {
			try {
				const draftData = {
					title,
					options,
					durationHours,
					category,
					description,
					allowMultiple,
					updatedAt: new Date().toISOString(),
				};
				localStorage.setItem(DRAFT_KEY, JSON.stringify(draftData));
				setSaveStatus('saved');
				setLastSavedTime(
					new Date().toLocaleTimeString([], {
						hour: '2-digit',
						minute: '2-digit',
					}),
				);
			} catch (e) {
				console.error('Failed to auto-save draft', e);
				setSaveStatus('idle');
			}
		}, 600);

		return () => clearTimeout(timer);
	}, [title, options, durationHours, category, description, allowMultiple]);

	// Add new option item
	const handleAddOption = () => {
		setOptions((prev) => [...prev, '']);
		setTimeout(() => {
			const nextIdx = options.length;
			itemInputRefs.current[nextIdx]?.focus();
		}, 50);
	};

	// Remove option item
	const handleRemoveOption = (index: number) => {
		if (options.length <= 1) {
			setOptions(['']);
			return;
		}
		setOptions((prev) => prev.filter((_, i) => i !== index));
	};

	// Update option text
	const handleOptionChange = (index: number, value: string) => {
		setOptions((prev) => {
			const next = [...prev];
			next[index] = value;
			return next;
		});
	};

	// KeyDown in item input: pressing Enter creates next item
	const handleOptionKeyDown = (
		index: number,
		e: React.KeyboardEvent<HTMLInputElement>,
	) => {
		if (e.key === 'Enter') {
			e.preventDefault();
			if (index === options.length - 1) {
				handleAddOption();
			} else {
				itemInputRefs.current[index + 1]?.focus();
			}
		}
	};

	// Clear draft and reset
	const handleClearDraft = () => {
		if (
			window.confirm(
				'Clear your draft and start over with an empty poll?',
			)
		) {
			localStorage.removeItem(DRAFT_KEY);
			setTitle('');
			setOptions(['']);
			setDurationHours(24);
			setCategory('General');
			setDescription('');
			setAllowMultiple(false);
			setHasRestoredDraft(false);
			setSaveStatus('idle');
		}
	};

	// Post poll to API
	const handlePostPoll = async (e: React.FormEvent) => {
		e.preventDefault();
		setErrorMessage('');

		const trimmedTitle = title.trim();
		if (!trimmedTitle) {
			setErrorMessage('Please enter a poll title');
			return;
		}

		const cleanedOptions = options
			.map((opt) => opt.trim())
			.filter((opt) => opt.length > 0);
		if (cleanedOptions.length < 2) {
			setErrorMessage('Please provide at least 2 poll items');
			return;
		}

		setIsSubmitting(true);

		try {
			const payload = {
				title: trimmedTitle,
				description: description.trim(),
				options: cleanedOptions,
				durationHours,
				category,
				allowMultiple,
			};

			const res = await fetch('/api/polls', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(payload),
			});

			if (!res.ok) {
				const data = await res.json();
				throw new Error(data.message || 'Failed to publish poll');
			}

			const createdPoll = await res.json();

			// Store in localStorage for author management
			try {
				const existingMyPolls = JSON.parse(
					localStorage.getItem(MY_POLLS_KEY) || '[]',
				);
				existingMyPolls.unshift(createdPoll.id);
				localStorage.setItem(
					MY_POLLS_KEY,
					JSON.stringify(existingMyPolls.slice(0, 50)),
				);
			} catch (err) {
				console.error('Error saving created poll id', err);
			}

			// Clear draft
			localStorage.removeItem(DRAFT_KEY);

			// Redirect to poll page
			router.push(`/poll/${createdPoll.id}`);
		} catch (error: any) {
			console.error('Submission error:', error);
			setErrorMessage(
				error.message ||
					'An unexpected error occurred while posting your poll.',
			);
			setIsSubmitting(false);
		}
	};

	const durations = isUserLoggedIn ? LOGGED_IN_DURATIONS : STANDARD_DURATIONS;

	return (
		<>
			<NextSeo {...seoCreatePoll} />
			<main className="min-h-screen bg-background pt-32 pb-24 px-4 sm:px-6 relative overflow-hidden">
				{/* Ambient Glows */}
				<div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[450px] bg-primary/10 rounded-full blur-[140px] pointer-events-none" />
				<div className="absolute bottom-10 right-0 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

				<div className="max-w-3xl mx-auto relative z-10">
					{/* Top Back & Auto-save status bar */}
					<div className="flex items-center justify-between gap-4 mb-8">
						<Link
							href="/polls"
							className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors group"
						>
							<ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
							Back to Polls
						</Link>

						{/* Auto-save visual indicator */}
						<div className="flex items-center gap-2 text-xs">
							{saveStatus === 'saving' && (
								<span className="flex items-center gap-1.5 text-muted-foreground font-medium animate-pulse">
									<Save className="w-3.5 h-3.5" />
									Saving draft...
								</span>
							)}
							{saveStatus === 'saved' && (
								<span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-medium">
									<Check className="w-3.5 h-3.5" />
									Draft saved locally{' '}
									{lastSavedTime ? `at ${lastSavedTime}` : ''}
								</span>
							)}
							{hasRestoredDraft && (
								<button
									type="button"
									onClick={handleClearDraft}
									title="Clear draft"
									className="text-muted-foreground hover:text-red-500 transition-colors p-1 rounded hover:bg-secondary flex items-center gap-1 cursor-pointer"
								>
									<RotateCcw className="w-3 h-3" />
									<span>Reset</span>
								</button>
							)}
						</div>
					</div>

					{/* Form Container */}
					<motion.div
						initial={{ opacity: 0, y: 15 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.4 }}
						className="bg-card/75 backdrop-blur-2xl border border-border/90 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-8"
					>
						{/* Title Header */}
						<div>
							<div className="flex items-center gap-2 mb-2">
								<span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-primary/10 text-primary border border-primary/20 flex items-center gap-1.5">
									<Sparkles className="w-3.5 h-3.5" />
									Poll Creator
								</span>
								{isUserLoggedIn && (
									<span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
										<CheckSquare className="w-3.5 h-3.5" />
										Pro Creator Options Active
									</span>
								)}
							</div>
							<h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
								Create a New Poll
							</h1>
							<p className="text-sm text-muted-foreground mt-1">
								Type your title and items. Add options by
								pressing Enter or clicking &quot;Create
								Item&quot;.
							</p>
						</div>

						{errorMessage && (
							<motion.div
								initial={{ opacity: 0, scale: 0.95 }}
								animate={{ opacity: 1, scale: 1 }}
								className="p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 text-sm font-medium"
							>
								{errorMessage}
							</motion.div>
						)}

						<form onSubmit={handlePostPoll} className="space-y-7">
							{/* 1. Title Input (Initial Input 1) */}
							<div className="space-y-2">
								<label className="block text-sm font-bold text-foreground">
									Poll Question / Title{' '}
									<span className="text-red-500">*</span>
								</label>
								<input
									type="text"
									value={title}
									onChange={(e) => setTitle(e.target.value)}
									placeholder="What would you like to ask the community?"
									required
									className="w-full px-4 py-3.5 rounded-2xl bg-secondary/60 border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 text-foreground placeholder:text-muted-foreground/60 transition-all outline-none text-base font-medium"
								/>
							</div>

							{/* Optional Description */}
							{isUserLoggedIn ? (
								<div className="space-y-2">
									<label className="block text-sm font-semibold text-foreground">
										Description / Context{' '}
										<span className="text-xs text-muted-foreground font-normal">
											(Optional)
										</span>
									</label>
									<textarea
										value={description}
										onChange={(e) =>
											setDescription(e.target.value)
										}
										placeholder="Add extra details, notes, or background for voters..."
										rows={2}
										className="w-full px-4 py-3 rounded-2xl bg-secondary/60 border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 text-foreground placeholder:text-muted-foreground/60 transition-all outline-none text-sm resize-none"
									/>
								</div>
							) : null}

							{/* 2. Poll Items Section (Initial Input 2 is options[0]) */}
							<div className="space-y-3 pt-2">
								<div className="flex items-center justify-between">
									<label className="block text-sm font-bold text-foreground">
										Poll Items / Options{' '}
										<span className="text-red-500">*</span>
									</label>
									<span className="text-xs text-muted-foreground">
										{options.filter((o) => o.trim()).length}{' '}
										of {options.length} filled (Min 2)
									</span>
								</div>

								{/* Options List */}
								<div className="space-y-3">
									<AnimatePresence initial={false}>
										{options.map((option, index) => (
											<motion.div
												key={index}
												initial={{ opacity: 0, y: -10 }}
												animate={{ opacity: 1, y: 0 }}
												exit={{
													opacity: 0,
													scale: 0.95,
												}}
												transition={{ duration: 0.2 }}
												className="flex items-center gap-2 group"
											>
												<div className="flex items-center justify-center w-8 h-8 rounded-xl bg-secondary/80 text-muted-foreground text-xs font-bold shrink-0">
													{index + 1}
												</div>

												<input
													ref={(el) => {
														itemInputRefs.current[
															index
														] = el;
													}}
													type="text"
													value={option}
													onChange={(e) =>
														handleOptionChange(
															index,
															e.target.value,
														)
													}
													onKeyDown={(e) =>
														handleOptionKeyDown(
															index,
															e,
														)
													}
													placeholder={
														index === 0
															? 'Enter first item (e.g. Next.js)'
															: index === 1
																? 'Enter second item (e.g. Remix)'
																: `Item ${index + 1}`
													}
													className="flex-1 px-4 py-3 rounded-xl bg-secondary/60 border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 text-foreground placeholder:text-muted-foreground/60 transition-all outline-none text-sm"
												/>

												{options.length > 1 && (
													<button
														type="button"
														onClick={() =>
															handleRemoveOption(
																index,
															)
														}
														className="p-2.5 text-muted-foreground/60 hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-colors shrink-0 cursor-pointer"
														aria-label="Remove item"
													>
														<Trash2 className="w-4 h-4" />
													</button>
												)}
											</motion.div>
										))}
									</AnimatePresence>
								</div>

								{/* "Create Item" Button */}
								<div className="pt-2">
									<button
										type="button"
										onClick={handleAddOption}
										className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-secondary/80 hover:bg-secondary text-foreground text-xs sm:text-sm font-semibold border border-border/80 hover:border-primary/40 transition-all cursor-pointer shadow-sm hover:shadow"
									>
										<Plus className="w-4 h-4 text-primary" />
										Create Item
									</button>
									<span className="text-xs text-muted-foreground ml-3">
										or press{' '}
										<kbd className="px-1.5 py-0.5 rounded bg-muted border border-border text-[11px] font-mono">
											Enter
										</kbd>{' '}
										in option box
									</span>
								</div>
							</div>

							{/* 3. Duration Selector (Radio Group) */}
							<div className="space-y-3 pt-4 border-t border-border/60">
								<div className="flex items-center justify-between">
									<label className="block text-sm font-bold text-foreground flex items-center gap-2">
										<Clock className="w-4 h-4 text-primary" />
										Poll Duration
									</label>
									<span className="text-xs text-muted-foreground">
										Votes close automatically when expired
									</span>
								</div>

								<div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
									{durations.map((d) => {
										const isSelected =
											durationHours === d.hours;
										return (
											<label
												key={d.label}
												className={`relative flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition-all duration-200 ${
													isSelected
														? 'bg-primary/10 border-primary shadow-sm shadow-primary/10'
														: 'bg-secondary/40 border-border/80 hover:border-border hover:bg-secondary/70'
												}`}
											>
												<div className="flex items-center gap-3">
													<input
														type="radio"
														name="pollDuration"
														value={d.hours}
														checked={isSelected}
														onChange={() =>
															setDurationHours(
																d.hours,
															)
														}
														className="w-4 h-4 text-primary accent-primary focus:ring-0 cursor-pointer"
													/>
													<div>
														<div className="text-sm font-bold text-foreground">
															{d.label}
														</div>
														<div className="text-xs text-muted-foreground">
															{d.desc}
														</div>
													</div>
												</div>
												{isSelected && (
													<Check className="w-4 h-4 text-primary shrink-0" />
												)}
											</label>
										);
									})}
								</div>
							</div>

							{/* 4. Logged-in Extra Customization Options */}
							{isUserLoggedIn ? (
								<div className="p-5 rounded-2xl bg-secondary/30 border border-border/80 space-y-4">
									<div className="flex items-center gap-2 text-sm font-bold text-foreground">
										<Sparkles className="w-4 h-4 text-amber-500" />
										Customization &amp; Controls
									</div>

									<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
										{/* Category Selection */}
										<div className="space-y-1.5">
											<label className="block text-xs font-semibold text-muted-foreground">
												Poll Category
											</label>
											<select
												value={category}
												onChange={(e) =>
													setCategory(e.target.value)
												}
												className="w-full px-3 py-2.5 rounded-xl bg-background border border-border focus:border-primary text-foreground text-sm outline-none cursor-pointer"
											>
												{CATEGORIES.map((c) => (
													<option key={c} value={c}>
														{c}
													</option>
												))}
											</select>
										</div>

										{/* Multi-vote Toggle */}
										<div className="space-y-1.5">
											<label className="block text-xs font-semibold text-muted-foreground">
												Voting Mode
											</label>
											<label className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-background border border-border cursor-pointer hover:border-primary/50 transition-colors">
												<input
													type="checkbox"
													checked={allowMultiple}
													onChange={(e) =>
														setAllowMultiple(
															e.target.checked,
														)
													}
													className="w-4 h-4 accent-primary rounded cursor-pointer"
												/>
												<span className="text-sm text-foreground font-medium">
													Allow Multiple Choices
												</span>
											</label>
										</div>
									</div>
								</div>
							) : (
								<div className="p-4 rounded-2xl bg-secondary/20 border border-dashed border-border/80 flex items-center justify-between gap-4 text-xs text-muted-foreground">
									<div className="flex items-center gap-2">
										<Lock className="w-4 h-4 text-primary" />
										<span>
											Want longer durations (3d, 7d,
											Unlimited), multi-vote options, and
											analytics?
										</span>
									</div>
									<Link
										href="/login"
										className="text-primary font-semibold hover:underline shrink-0"
									>
										Log in
									</Link>
								</div>
							)}

							{/* 5. Post Button at the bottom with Loading Animation */}
							<div className="pt-4 border-t border-border/80">
								<button
									type="submit"
									disabled={isSubmitting}
									className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-2xl bg-primary text-primary-foreground font-bold text-base shadow-lg shadow-primary/25 hover:bg-primary/90 hover:shadow-primary/40 active:scale-[0.99] transition-all disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
								>
									{isSubmitting ? (
										<>
											<Loader2 className="w-5 h-5 animate-spin" />
											<span>Publishing Poll...</span>
										</>
									) : (
										<>
											<Sparkles className="w-5 h-5" />
											<span>Post Poll</span>
										</>
									)}
								</button>
							</div>
						</form>
					</motion.div>
				</div>
			</main>
		</>
	);
}
