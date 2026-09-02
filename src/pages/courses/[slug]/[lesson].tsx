import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
	ArrowRight,
	Check,
	HelpCircle,
	RefreshCw,
	ChevronLeft,
} from 'lucide-react';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote } from 'next-mdx-remote';
import { GetServerSideProps } from 'next';
import { getFullUrl } from '@/utils/db';
import { Lesson } from '@/lib/mdx';
import LessonNotepad from '@/components/Course/LessonNotepad';
import dynamic from 'next/dynamic';
import {
	Code,
	BookOpen,
	Maximize,
	Minimize,
	MessageSquare,
	Sparkles,
} from 'lucide-react';
import { useUI } from '@/context/UIContext';
import { AnimatePresence } from 'framer-motion';
import { FEATURES } from '@/config/features';

const LessonSandbox = dynamic(
	() => import('@/components/Course/LessonSandbox'),
	{
		ssr: false,
		loading: () => (
			<div className="h-[600px] w-full bg-gray-900 animate-pulse rounded-lg"></div>
		),
	},
);

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
	if (!FEATURES.COURSES_ENABLED) {
		return {
			redirect: {
				destination: '/projects',
				permanent: false,
			},
		};
	}
	const getCourse = async () => {
		try {
			const response = await fetch(getFullUrl('/api/getCourseData'), {
				method: 'POST',
				credentials: 'include',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ slug: params?.slug }),
			});
			const data = await response.json();
			if (data) {
				return data.course;
			}
		} catch (error) {
			console.error('Error fetching user course data:', error);
		}
	};

	const { lesson } = params as { lesson: string };
	const course = await getCourse();

	if (!course) {
		return { notFound: true };
	}

	const lessonD = course.lessons.find((l: Lesson) => l.slug === lesson);

	if (!lessonD) {
		return { notFound: true };
	}

	const source = await serialize(
		lessonD.content || lessonD.description || '',
	);

	// Calculate rating
	let rawRatings = course.rating;
	if (
		rawRatings &&
		typeof rawRatings === 'object' &&
		!Array.isArray(rawRatings) &&
		'set' in rawRatings
	) {
		rawRatings = (rawRatings as any).set;
	}
	const ratings = Array.isArray(rawRatings) ? rawRatings : [];
	const averageRating =
		ratings.length > 0
			? (
					ratings.reduce(
						(sum: number, item: any) => sum + (item.rating || 0),
						0,
					) / ratings.length
				).toFixed(1)
			: null;

	// Determine next lesson slug
	let nextLessonSlug = null;
	if (course.order && course.order.length > 0) {
		const currentIndex = course.order.indexOf(lessonD.slug);
		if (currentIndex !== -1 && currentIndex < course.order.length - 1) {
			nextLessonSlug = course.order[currentIndex + 1];
		}
	} else {
		// Fallback to lessons array order
		const currentIndex = course.lessons.findIndex(
			(l: any) => l.slug === lessonD.slug,
		);
		if (currentIndex !== -1 && currentIndex < course.lessons.length - 1) {
			nextLessonSlug = course.lessons[currentIndex + 1].slug;
		}
	}

	return {
		props: {
			lesson: lessonD,
			source,
			nextLessonSlug,
			averageRating,
		},
	};
};

export default function LessonPage({
	lesson,
	source,
	nextLessonSlug,
	averageRating,
}: {
	lesson: Lesson;
	source: any;
	nextLessonSlug: string | null;
	averageRating: string | null;
}) {
	const router = useRouter();
	const { isFocusMode, toggleFocusMode } = useUI();
	const lessonSlug = lesson['slug'];
	const [answers, setAnswers] = useState<Record<number, string>>({});
	const [buttonStates, setButtonStates] = useState<
		Record<number, 'default' | 'success'>
	>({});
	const [showHints, setShowHints] = useState<Record<number, boolean>>({});
	const [startTime, setStartTime] = useState(Date.now());
	const [completed, setCompleted] = useState(false);
	const [errorMessages, setErrorMessages] = useState<Record<number, string>>(
		{},
	);
	const [showFeedbackForm, setShowFeedbackForm] = useState(false);
	const [feedbackText, setFeedbackText] = useState('');
	const [isSubmittingFeedback, setIsSubmittingFeedback] = useState(false);
	const [showSandbox, setShowSandbox] = useState(false);

	useEffect(() => {
		setAnswers({});
		setButtonStates({});
		setShowHints({});
		setCompleted(false);
		setErrorMessages({});
		setShowFeedbackForm(false);
		setFeedbackText('');
		setStartTime(Date.now());
	}, [lessonSlug]);

	const submitFeedback = async () => {
		if (!feedbackText.trim()) return;
		setIsSubmittingFeedback(true);
		try {
			const res = await fetch('/api/createLessonFeedback', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ lessonSlug, feedback: feedbackText }),
			});
			if (res.ok) {
				setFeedbackText('');
				setShowFeedbackForm(false);
				alert('Thank you for your feedback!');
			} else {
				alert('Failed to submit feedback.');
			}
		} catch (e) {
			console.error(e);
			alert('Error submitting feedback.');
		} finally {
			setIsSubmittingFeedback(false);
		}
	};

	async function updateUserData(
		courseSlug: string,
		lessonSlug: string,
		dataToStore: {
			buttonStates: Record<number, 'default' | 'success'>;
			answers: Record<number, string>;
			completed: boolean;
			completionTime?: number;
		},
	) {
		try {
			const response = await fetch(
				getFullUrl('/api/editUserCourseData'),
				{
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					credentials: 'include',
					body: JSON.stringify({
						courseSlug,
						lessonSlug,
						dataToStore,
					}),
				},
			);
			if (!response.ok) throw new Error('Failed to update user data');
		} catch (error) {
			console.error('Error updating user data:', error);
		}
	}

	useEffect(() => {
		const dataToStore = {
			buttonStates,
			answers,
			completed: lesson.exercises.every(
				(_, idx) => buttonStates[idx] === 'success',
			),
			completionTime: lesson.exercises.every(
				(_, idx) => buttonStates[idx] === 'success',
			)
				? Math.floor((Date.now() - startTime) / 1000)
				: undefined,
		};
		// call api to update user data

		if (dataToStore.completed) {
			updateUserData(lesson.courseSlug, lessonSlug, dataToStore);
			setCompleted(true);
		}
	}, [
		buttonStates,
		answers,
		lessonSlug,
		startTime,
		lesson.exercises,
		lesson.courseSlug,
	]);

	if (router.isFallback) {
		return <div>Loading...</div>;
	}

	const handleChange = (questionIndex: number, answer: string) => {
		setAnswers((prev) => ({ ...prev, [questionIndex]: answer }));
	};
	const handleSubmit = (index: number) => {
		const exercise = lesson.exercises[index];
		if (answers[index]?.trim() === exercise.correctAnswer) {
			setButtonStates((prev) => ({ ...prev, [index]: 'success' }));
			setErrorMessages((prev) => ({ ...prev, [index]: '' })); // Clear error message on success
		} else {
			setErrorMessages((prev) => ({
				...prev,
				[index]: 'Incorrect answer. Try again or use a hint.',
			}));
		}
	};

	const handleRetry = (index: number) => {
		setAnswers((prev) => ({ ...prev, [index]: '' }));
		setButtonStates((prev) => ({ ...prev, [index]: 'default' }));
		setErrorMessages((prev) => ({ ...prev, [index]: '' })); // Clear error message on retry
	};

	const toggleHint = (index: number) => {
		setShowHints((prev) => ({ ...prev, [index]: !prev[index] }));
	};

	const isDisabled = (index: number) => buttonStates[index] === 'success';
	const duration = Math.floor((Date.now() - startTime) / 1000);

	return (
		<section className="max-w-5xl px-4 sm:px-6 lg:px-10 mx-auto py-10 relative">
			{/* Back Button */}
			<div className="mb-8">
				<Link
					href={`/courses/${lesson.courseSlug}`}
					className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors hover-lift"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="20"
						height="20"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					>
						<path d="m15 18-6-6 6-6" />
					</svg>
					Back to Course
				</Link>
			</div>

			{averageRating && (
				<div className="flex items-center gap-1.5 mb-4 text-yellow-500 font-medium bg-yellow-500/10 w-fit px-3 py-1 rounded-full border border-yellow-500/20">
					<span className="text-lg">★</span>
					<span>{averageRating}</span>
					<span className="text-muted-foreground text-sm ml-1">
						Course Rating
					</span>
				</div>
			)}
			<motion.h1
				className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-500 to-pink-500"
				initial={{ opacity: 0, y: 10 }}
				animate={{ opacity: 1, y: 0 }}
			>
				{lesson.title}
			</motion.h1>
			<motion.p
				className="text-lg text-muted-foreground mb-8 leading-relaxed max-w-3xl"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 0.1 }}
			>
				{lesson.description}
			</motion.p>

			<div className="flex flex-wrap justify-end mb-8 gap-3">
				<button
					onClick={toggleFocusMode}
					className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium transition-all duration-300 shadow-lg hover:-translate-y-0.5 ${
						isFocusMode
							? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-purple-500/25'
							: 'bg-card border border-border text-foreground hover:border-primary/50'
					}`}
				>
					{isFocusMode ? (
						<>
							<Minimize size={18} />
							Exit Focus
						</>
					) : (
						<>
							<Maximize size={18} />
							Focus Mode
						</>
					)}
				</button>
				<button
					onClick={() => setShowSandbox(!showSandbox)}
					className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium transition-all duration-300 shadow-lg hover:-translate-y-0.5 ${
						showSandbox
							? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-blue-500/25'
							: 'bg-card border border-border text-foreground hover:border-primary/50'
					}`}
				>
					{showSandbox ? (
						<>
							<BookOpen size={18} />
							Return to Lesson
						</>
					) : (
						<>
							<Code size={18} />
							Open Sandbox
						</>
					)}
				</button>
			</div>

			<motion.div
				className="prose prose-lg max-w-none mb-10"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 0.1 }}
			>
				{showSandbox ? (
					<LessonSandbox onClose={() => setShowSandbox(false)} />
				) : (
					source && (
						<MDXRemote
							{...source}
							components={{
								h1: (props) => (
									<h1
										className="text-3xl font-bold mt-8 mb-4"
										{...props}
									/>
								),
								h2: (props) => (
									<h2
										className="text-2xl font-semibold mt-6 mb-3"
										{...props}
									/>
								),
								p: (props) => (
									<p
										className="mb-4 leading-relaxed"
										{...props}
									/>
								),
								ul: (props) => (
									<ul
										className="list-disc pl-5 mb-4"
										{...props}
									/>
								),
								ol: (props) => (
									<ol
										className="list-decimal pl-5 mb-4"
										{...props}
									/>
								),
								li: (props) => (
									<li className="mb-1" {...props} />
								),
								code: (props) => (
									<code
										className="light:bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-sm font-mono"
										{...props}
									/>
								),
								pre: (props) => (
									<pre
										className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-4"
										{...props}
									/>
								),
								a: (props) => (
									<a
										className="text-blue-600 hover:underline"
										{...props}
									/>
								),
								blockquote: (props) => (
									<blockquote
										className="border-l-4 border-gray-300 pl-4 italic my-4"
										{...props}
									/>
								),
							}}
						/>
					)
				)}
			</motion.div>

			<motion.div
				className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] md:w-auto md:min-w-[400px] flex items-center justify-between p-4 bg-green-500/20 backdrop-blur-md border border-green-500/30 rounded-2xl shadow-xl shadow-green-500/10 z-50"
				initial={{ opacity: 0, y: 50 }}
				animate={{ opacity: 1, y: 0 }}
			>
				<div className="flex items-center gap-3">
					<div className="p-2 bg-green-500 rounded-full text-white">
						<Check size={16} />
					</div>
					<span className="text-green-600 dark:text-green-400 font-bold">
						Lesson completed in {duration}s!
					</span>
				</div>
				{nextLessonSlug && (
					<Link
						href={`/courses/${lesson.courseSlug}/${nextLessonSlug}`}
						className="group flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-xl transition-all shadow-lg hover:shadow-green-500/25 font-semibold text-sm"
					>
						Next
						<ArrowRight
							size={16}
							className="group-hover:translate-x-0.5 transition-transform"
						/>
					</Link>
				)}
			</motion.div>
			<motion.div
				className="space-y-6"
				initial="hidden"
				animate="visible"
				variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
			>
				{lesson.exercises.map((exercise, index) => (
					<motion.div
						key={index}
						className="p-6 md:p-8 bg-card border border-border rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: index * 0.1 }}
					>
						<div className="flex items-start gap-4 mb-6">
							<div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-primary/10 text-primary font-bold text-sm">
								{index + 1}
							</div>
							<p className="font-semibold text-lg md:text-xl text-foreground">
								{exercise.question}
							</p>
						</div>

						<div className="flex flex-col space-y-4 pl-0 md:pl-12">
							{exercise.type === 'multiple-choice' &&
								exercise.options
									?.split(',')
									?.map((option, idx) => (
										<label
											key={idx}
											className={`cursor-pointer group flex items-center p-4 border rounded-xl transition-all duration-300 ${
												answers[index] === option
													? 'bg-primary/5 border-primary shadow-md shadow-primary/10'
													: 'bg-background border-border hover:border-primary/50 hover:bg-secondary/50'
											} ${
												isDisabled(index)
													? 'opacity-60 cursor-not-allowed'
													: ''
											}`}
										>
											<div className="relative w-5 h-5 mr-4 flex-shrink-0">
												<input
													type="radio"
													name={`question-${index}`}
													value={option}
													checked={
														answers[index] ===
														option
													}
													onChange={() =>
														!isDisabled(index) &&
														handleChange(
															index,
															option,
														)
													}
													className="absolute w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
													disabled={isDisabled(index)}
												/>
												<div
													className={`w-full h-full border-2 rounded-full flex items-center justify-center transition-colors ${
														answers[index] ===
														option
															? 'border-primary'
															: 'border-muted-foreground/30 group-hover:border-primary/50'
													}`}
												>
													{answers[index] ===
														option && (
														<div className="w-2.5 h-2.5 bg-primary rounded-full animate-scale-in"></div>
													)}
												</div>
											</div>
											<span className="text-base font-medium text-foreground">
												{option}
											</span>
										</label>
									))}
							{exercise.type === 'text' && (
								<input
									type="text"
									placeholder="Type your answer here..."
									value={answers[index] || ''}
									onChange={(e) =>
										handleChange(index, e.target.value)
									}
									// user clicks enter with in the input field
									onKeyDown={(e) => {
										if (e.key === 'Enter') {
											e.preventDefault();
											handleSubmit(index);
										}
									}}
									className="p-4 bg-background border border-border rounded-xl shadow-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder:text-muted-foreground"
									disabled={isDisabled(index)}
								/>
							)}
						</div>

						{errorMessages[index] && (
							<motion.div
								initial={{ opacity: 0, height: 0 }}
								animate={{ opacity: 1, height: 'auto' }}
								className="mt-4 md:ml-12 text-sm text-destructive font-medium bg-destructive/10 p-3 rounded-lg flex items-center gap-2"
							>
								<div className="w-1.5 h-1.5 rounded-full bg-destructive" />
								{errorMessages[index]}
							</motion.div>
						)}

						<div className="flex flex-wrap gap-3 mt-6 md:ml-12">
							<button
								onClick={() => handleSubmit(index)}
								disabled={isDisabled(index)}
								className={`cursor-pointer px-5 py-2.5 rounded-xl font-bold shadow-md transition-all duration-300 flex items-center gap-2 ${
									buttonStates[index] === 'success'
										? 'bg-green-500 hover:bg-green-600 text-white shadow-green-500/25'
										: 'bg-primary hover:bg-primary/90 text-white shadow-primary/25 hover:-translate-y-0.5'
								} disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none`}
							>
								{buttonStates[index] === 'success' ? (
									<>
										<Check size={18} />
										Correct
									</>
								) : (
									'Submit Answer'
								)}
							</button>
							{!isDisabled(index) && (
								<button
									onClick={() => toggleHint(index)}
									className="cursor-pointer px-4 py-2.5 text-sm font-medium text-muted-foreground hover:text-primary bg-secondary/50 hover:bg-secondary rounded-xl transition-all flex items-center gap-2 border border-transparent hover:border-border"
								>
									<HelpCircle size={18} /> Hint
								</button>
							)}
							{!isDisabled(index) && (
								<button
									onClick={() => handleRetry(index)}
									className="cursor-pointer px-4 py-2.5 text-sm font-medium text-muted-foreground hover:text-destructive bg-secondary/50 hover:bg-secondary rounded-xl transition-all flex items-center gap-2 border border-transparent hover:border-border"
								>
									<RefreshCw size={18} /> Retry
								</button>
							)}
						</div>

						<AnimatePresence>
							{showHints[index] && (
								<motion.div
									initial={{ opacity: 0, height: 0 }}
									animate={{ opacity: 1, height: 'auto' }}
									exit={{ opacity: 0, height: 0 }}
									className="mt-4 md:ml-12 overflow-hidden"
								>
									<div className="text-sm text-yellow-600 dark:text-yellow-400 bg-yellow-500/10 border border-yellow-500/20 p-4 rounded-xl flex items-start gap-3">
										<div className="mt-0.5 text-yellow-500">
											<Sparkles size={16} />
										</div>
										<div>
											<span className="font-bold block mb-1">
												Hint:
											</span>
											{exercise.hint ||
												'No hint available.'}
										</div>
									</div>
								</motion.div>
							)}
						</AnimatePresence>
					</motion.div>
				))}
			</motion.div>
			<div className="mt-16 pt-10 border-t border-border">
				<h3 className="text-xl font-bold mb-6 flex items-center gap-2">
					<span className="p-2 bg-primary/10 rounded-lg text-primary">
						<MessageSquare size={20} />
					</span>
					Lesson Feedback
					<span className="text-sm font-normal text-muted-foreground ml-2">
						Help us improve this content
					</span>
				</h3>
				{!showFeedbackForm ? (
					<button
						onClick={() => setShowFeedbackForm(true)}
						className="bg-secondary hover:bg-secondary/80 text-foreground px-6 py-3 rounded-xl transition-all font-medium text-sm border border-border flex items-center gap-2"
					>
						Give Feedback on this Lesson
					</button>
				) : (
					<motion.form
						initial={{ opacity: 0, height: 0 }}
						animate={{ opacity: 1, height: 'auto' }}
						className="space-y-4 max-w-xl bg-card border border-border p-6 rounded-2xl shadow-sm"
						onSubmit={(e) => {
							e.preventDefault();
							submitFeedback();
						}}
					>
						<textarea
							className="w-full p-4 border border-border rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none bg-background transition-all resize-none min-h-[120px]"
							rows={4}
							placeholder="What did you think about this lesson? Used to improve the course content."
							value={feedbackText}
							onChange={(e) => setFeedbackText(e.target.value)}
						/>
						<div className="flex gap-3 justify-end">
							<button
								type="button"
								onClick={() => setShowFeedbackForm(false)}
								className="px-4 py-2 text-muted-foreground hover:text-foreground text-sm font-medium transition-colors"
							>
								Cancel
							</button>
							<button
								type="submit"
								className="px-6 py-2 bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-primary-foreground rounded-xl shadow-lg shadow-primary/25 transition-all text-sm font-bold"
								disabled={isSubmittingFeedback}
							>
								{isSubmittingFeedback
									? 'Sending...'
									: 'Send Feedback'}
							</button>
						</div>
					</motion.form>
				)}
			</div>
			{/* <LessonNotepad lessonSlug={lessonSlug} /> */}
		</section>
	);
}
