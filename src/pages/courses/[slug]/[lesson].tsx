import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { GetServerSideProps } from 'next';
import { ArrowRight, Check, HelpCircle, RefreshCw } from 'lucide-react';
import { useRouter } from 'next/router';
import { Lesson } from '@/lib/mdx';
import Link from 'next/link';
import { getFullUrl } from '@/utils/db';

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const getCourse = async () => {
        try {
            const response = await fetch(getFullUrl('/api/getCourseData'), {
                method: 'POST',
                credentials: 'include',
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

    return {
        props: {
            lesson: lessonD,
            nextLessonSlug:
                course.order?.[course.order.indexOf(lessonD.slug) + 1] || null,
        },
    };
};

export default function LessonPage({
	lesson,
	nextLessonSlug,
}: {
	lesson: Lesson;
	nextLessonSlug: string;
}) {
	const router = useRouter();
	const lessonSlug = lesson['slug'];
	const [answers, setAnswers] = useState<Record<number, string>>({});
	const [buttonStates, setButtonStates] = useState<
		Record<number, 'default' | 'success'>
	>({});
	const [showHints, setShowHints] = useState<Record<number, boolean>>({});
	const [startTime] = useState(Date.now());
	const [completed, setCompleted] = useState(false);
	const [errorMessages, setErrorMessages] = useState<Record<number, string>>(
		{}
	);

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

	// const handleChange = (questionIndex: number, answer: string) => {
	//     setAnswers((prev) => ({ ...prev, [questionIndex]: answer }));
	// }, [buttonStates, answers, lessonSlug, startTime]);

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
			<motion.h1
				className="text-3xl font-bold mb-4"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
			>
				{/* {lesson.title} */}
			</motion.h1>
			<motion.p
				className="text-gray-700 mb-6"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 0.1 }}
			>
				{/* {lesson.description} */}
			</motion.p>
			{completed && (
				<motion.div className="flex items-center justify-between mb-6 p-4 bg-green-100 border border-green-300 rounded">
					 🎉 Lesson completed in {duration} seconds!
					{/* go to next lesson button with arrow -> */}
					<motion.div
						className="cursor-pointer flex items-center ml-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors duration-300"
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
		</section>
	);
}
