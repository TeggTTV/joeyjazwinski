import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Check, HelpCircle, RefreshCw } from 'lucide-react';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote } from 'next-mdx-remote';
import { GetServerSideProps } from 'next';
import { getFullUrl } from '@/utils/db';
import { Lesson } from '@/lib/mdx';
import LessonNotepad from '@/components/Course/LessonNotepad';
import dynamic from 'next/dynamic';
import { Code, BookOpen, Maximize, Minimize } from 'lucide-react';
import { useUI } from '@/context/UIContext';

const LessonSandbox = dynamic(
	() => import('@/components/Course/LessonSandbox'),
	{
		ssr: false,
		loading: () => (
			<div className="h-[600px] w-full bg-gray-900 animate-pulse rounded-lg"></div>
		),
	}
);

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
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
		lessonD.content || lessonD.description || ''
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
						0
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
			(l: any) => l.slug === lessonD.slug
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
		{}
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
		}
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
				}
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
				(_, idx) => buttonStates[idx] === 'success'
			),
			completionTime: lesson.exercises.every(
				(_, idx) => buttonStates[idx] === 'success'
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
		<section className="max-w-5xl px-10 mx-auto py-10">
			{averageRating && (
				<div className="flex items-center gap-1.5 mb-2 text-yellow-500 font-medium">
					<span className="text-lg">★</span>
					<span>{averageRating}</span>
					<span className="text-gray-400 text-sm ml-1">
						Course Rating
					</span>
				</div>
			)}
			<motion.h1
				className="text-3xl font-bold mb-4"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
			>
				{lesson.title}
			</motion.h1>

			<div className="flex justify-end mb-4 gap-2">
				<button
					onClick={toggleFocusMode}
					className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 shadow-lg ${
						isFocusMode
							? 'bg-purple-600 text-white hover:bg-purple-700'
							: 'bg-white text-gray-800 border hover:bg-gray-50'
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
					className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 shadow-lg ${
						showSandbox
							? 'bg-blue-600 text-white hover:bg-blue-700'
							: 'bg-white text-gray-800 border hover:bg-gray-50'
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
							Open Sandbox-Mode
						</>
					)}
				</button>
			</div>

			<motion.div
				className="prose prose-lg max-w-none mb-10 text-gray-700"
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
										className="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono"
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

			{completed && (
				<motion.div
					className="fixed bottom-0 left-0 w-full flex flex-col sm:flex-row items-center justify-between p-4 bg-green-100 border border-green-300 rounded-t sm:rounded shadow-lg z-50"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
				>
					<span className="text-center sm:text-left mb-2 sm:mb-0">
						🎉 Lesson completed in {duration} seconds!
					</span>
					{nextLessonSlug && (
						<motion.div
							className="cursor-pointer flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors duration-300"
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							whileHover={{ scale: 1.02 }}
							whileFocus={{ scale: 0.98 }}
							transition={{ delay: 0.2 }}
						>
							<Link
								className="flex items-center gap-2"
								href={`/courses/${lesson.courseSlug}/${nextLessonSlug}`}
							>
								Next Lesson
								<ArrowRight size={18} />
							</Link>
						</motion.div>
					)}
				</motion.div>
			)}
			<motion.div
				className="space-y-6"
				initial="hidden"
				animate="visible"
				variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
			>
				{lesson.exercises.map((exercise, index) => (
					<motion.div
						key={index}
						className="p-6 border rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: index * 0.1 }}
					>
						<p className="font-semibold text-lg mb-4">
							{exercise.question}
						</p>
						<div className="flex flex-col space-y-4">
							{exercise.type === 'multiple-choice' &&
								exercise.options
									?.split(',')
									?.map((option, idx) => (
										<label
											key={idx}
											className={`cursor-pointer flex items-center p-4 border rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ${
												isDisabled(index)
													? 'opacity-50 cursor-not-allowed'
													: ''
											}`}
										>
											<div className="relative w-6 h-6 mr-4">
												<input
													type="radio"
													name={`question-${index}`}
													value={option}
													checked={
														answers[index] ===
														option
													}
													onChange={() =>
														handleChange(
															index,
															option
														)
													}
													className="absolute w-full h-full opacity-0 cursor-pointer"
													disabled={isDisabled(index)}
												/>
												<div className="w-full h-full border-2 border-gray-400 rounded-full flex items-center justify-center">
													{answers[index] ===
														option && (
														<div className="w-3 h-3 bg-blue-600 rounded-full"></div>
													)}
												</div>
											</div>
											<span className="text-base font-medium">
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
									className="p-4 border rounded-lg shadow-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
									disabled={isDisabled(index)}
								/>
							)}
						</div>
						{errorMessages[index] && (
							<p className="mt-3 text-sm text-red-700 bg-red-100 p-2 rounded">
								{errorMessages[index]}
							</p>
						)}
						<div className="flex gap-4 mt-4">
							<button
								onClick={() => handleSubmit(index)}
								disabled={isDisabled(index)}
								className={`cursor-pointer px-4 py-2 rounded-md shadow-md transition-all duration-300 ${
									buttonStates[index] === 'success'
										? 'bg-green-600 text-white'
										: 'border border-blue-600 text-blue-600 hover:bg-blue-200'
								}`}
							>
								{buttonStates[index] === 'success' ? (
									<div className="flex gap-2">
										<Check />
										Correct
									</div>
								) : (
									'Submit'
								)}
							</button>
							{!isDisabled(index) && (
								<button
									onClick={() => toggleHint(index)}
									className="cursor-pointer px-3 py-2 text-sm text-gray-500 hover:text-blue-600 flex items-center gap-2"
								>
									<HelpCircle size={18} /> Hint
								</button>
							)}
							{!isDisabled(index) && (
								<button
									onClick={() => handleRetry(index)}
									className="cursor-pointer px-3 py-2 text-sm text-gray-500 hover:text-red-600 flex items-center gap-2"
								>
									<RefreshCw size={18} /> Retry
								</button>
							)}
						</div>
						{showHints[index] && (
							<p className="mt-3 text-sm text-yellow-700 bg-yellow-100 p-2 rounded">
								Hint: {exercise.hint || 'No hint available.'}{' '}
								{exercise.hint ? (
									<span className="text-gray-500">
										({exercise.hint})
									</span>
								) : (
									''
								)}
							</p>
						)}
					</motion.div>
				))}
			</motion.div>
			<div className="mt-16 border-t pt-8">
				<h3 className="text-xl font-bold mb-4">Lesson Feedback</h3>
				{!showFeedbackForm ? (
					<button
						onClick={() => setShowFeedbackForm(true)}
						className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md transition-colors font-medium text-sm"
					>
						Give Feedback on this Lesson
					</button>
				) : (
					<motion.form
						initial={{ opacity: 0, height: 0 }}
						animate={{ opacity: 1, height: 'auto' }}
						className="space-y-4 max-w-lg"
						onSubmit={(e) => {
							e.preventDefault();
							submitFeedback();
						}}
					>
						<textarea
							className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
							rows={4}
							placeholder="What did you think about this lesson? Used to improve the course content."
							value={feedbackText}
							onChange={(e) => setFeedbackText(e.target.value)}
						/>
						<div className="flex gap-2">
							<button
								type="submit"
								className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
								disabled={isSubmittingFeedback}
							>
								{isSubmittingFeedback
									? 'Sending...'
									: 'Send Feedback'}
							</button>
							<button
								type="button"
								onClick={() => setShowFeedbackForm(false)}
								className="px-4 py-2 text-gray-500 hover:text-gray-700 text-sm"
							>
								Cancel
							</button>
						</div>
					</motion.form>
				)}
			</div>
			{/* <LessonNotepad lessonSlug={lessonSlug} /> */}
		</section>
	);
}
