import { motion } from 'framer-motion';
import { getFullUrl } from '@/utils/db';
import ConfirmationModal from '@/components/ConfirmationModal';
import { ChevronDownIcon } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { Exercise, Course } from '@/lib/mdx';
import { addTag, removeTag } from './helpers';
import course from 'next-seo/lib/jsonld/course';

// Add animated arrows to indicate active dropdowns
// Update the EditCourseDashboard component to accept setCourses as a prop

// Extend the Course type to include tags
interface ExtendedCourse extends Course {
	tags: string[];
}

// Update the EditCourseDashboard component to accept a single course as a prop
export default function EditCourseDashboard({
	course,
	setCourses,
}: {
	course: ExtendedCourse;
	setCourses: React.Dispatch<React.SetStateAction<ExtendedCourse[]>>;
}) {
	const [expandedCourses, setExpandedCourses] = useState<string[]>([]);
	const [expandedLessons, setExpandedLessons] = useState<string[]>([]);
	const [expandedExercises, setExpandedExercises] = useState<string[]>([]);
	const [isSaving, setIsSaving] = useState(false);
	const [deleteModalData, setDeleteModalData] = useState<{
		isOpen: boolean;
		x: number;
		y: number;
	}>({ isOpen: false, x: 0, y: 0 });

	// Add a fallback for `course.tags` to prevent undefined errors
	const [tags, setTags] = useState<string[]>(course?.tags || []);

	// Include the updated `tags` state in the `course` object before sending it to the API
	async function saveChanges() {
		setIsSaving(true); // Disable the button and show 'Saving...'

		const updatedCourse = {
			...course,
			tags, // Include the updated tags
		};

		await fetch(getFullUrl('/api/updateCourse'), {
			method: 'POST',
			credentials: 'include',
			body: JSON.stringify(updatedCourse),
		})
			.then((response) => {
				if (response.ok) {
					toast.success('Changes saved successfully!');
					console.log('Changes saved successfully!', response);
				} else if (response.status === 401) {
					toast.error('Unauthorized! Please log in again.');
					console.error('Unauthorized! Please log in again.');
				} else {
					toast.error(
						'Failed to save changes. Please try again later.'
					);
					console.error(
						'Failed to save changes. Please try again later.',
						response
					);
				}
			})
			.finally(() => {
				setIsSaving(false); // Re-enable the button
			});
	}

	function handleDeleteCourse(e: React.MouseEvent) {
		setDeleteModalData({ isOpen: true, x: e.pageX, y: e.pageY });
	}

	async function confirmDeleteCourse() {
		setIsSaving(true);
		try {
			const response = await fetch(getFullUrl('/api/deleteCourse'), {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ courseId: course.id }),
			});

			if (response.ok) {
				toast.success('Course deleted successfully!');
				// Remove from local state
				setCourses((prev) => prev.filter((c) => c.id !== course.id));
			} else {
				toast.error('Failed to delete course');
			}
		} catch (error) {
			console.error(error);
			toast.error('Error deleting course');
		} finally {
			setIsSaving(false);
			setDeleteModalData((prev) => ({ ...prev, isOpen: false }));
		}
	}

	const toggleCourse = (courseId: string) => {
		setExpandedCourses((prev) =>
			prev.includes(courseId)
				? prev.filter((id) => id !== courseId)
				: [...prev, courseId]
		);
	};

	const toggleLesson = (lessonId: string) => {
		setExpandedLessons((prev) =>
			prev.includes(lessonId)
				? prev.filter((id) => id !== lessonId)
				: [...prev, lessonId]
		);
	};

	const toggleExercise = (exerciseId: string) => {
		setExpandedExercises((prev) =>
			prev.includes(exerciseId)
				? prev.filter((id) => id !== exerciseId)
				: [...prev, exerciseId]
		);
	};

	function handleCourseChange(
		courseId: string,
		field: string,
		value: string | number | boolean
	) {
		setCourses((prevCourses) =>
			prevCourses.map((course) =>
				course.id === courseId ? { ...course, [field]: value } : course
			)
		);
	}

	function handleLessonChange(
		courseId: string,
		lessonId: string,
		field: string,
		value: string | number | boolean
	) {
		setCourses((prevCourses) =>
			prevCourses.map((course) =>
				course.id === courseId
					? {
							...course,
							lessons: course.lessons.map((lesson) =>
								lesson.id === lessonId
									? { ...lesson, [field]: value }
									: lesson
							),
					  }
					: course
			)
		);
	}

	function handleExerciseChange(
		courseId: string,
		lessonId: string,
		exerciseId: string,
		field: string,
		value: string | number | boolean
	) {
		setCourses((prevCourses) =>
			prevCourses.map((course) =>
				course.id === courseId
					? {
							...course,
							lessons: course.lessons.map((lesson) =>
								lesson.id === lessonId
									? {
											...lesson,
											exercises: lesson.exercises.map(
												(exercise) =>
													exercise.id === exerciseId
														? {
																...exercise,
																[field]: value,
														  }
														: exercise
											),
									  }
									: lesson
							),
					  }
					: course
			)
		);
	}

	const handleOrderChange = (courseId: string, value: string) => {
		const orderList = value.split(',').map((item) => item.trim());
		setCourses((prevCourses) =>
			prevCourses.map((course) =>
				course.id === courseId
					? { ...course, order: orderList }
					: course
			)
		);
	};

	const handleProgressionalChange = (courseId: string, value: boolean) => {
		setCourses((prevCourses) =>
			prevCourses.map((course) =>
				course.id === courseId
					? { ...course, progressional: value }
					: course
			)
		);
	};

	function handleRemoveRating(courseId: string, ratingIndex: number) {
		setCourses((prevCourses) =>
			prevCourses.map((course) =>
				course.id === courseId && course.rating
					? {
							...course,
							rating: course.rating.filter(
								(_, index) => index !== ratingIndex
							),
					  }
					: course
			)
		);
	}

	const TagManager: React.FC<{
		tags: string[];
		onAddTag: (tag: string) => void;
		onRemoveTag: (tag: string) => void;
	}> = ({ tags, onAddTag, onRemoveTag }) => {
		const [newTag, setNewTag] = useState('');

		const handleAddTag = () => {
			if (newTag.trim() !== '') {
				onAddTag(newTag);
				setNewTag('');
			}
		};

		return (
			<div className="tag-manager">
				<h3>Manage Tags</h3>
				<div className="tags">
					{tags.map((tag, index) => (
						<span key={index} className="tag">
							{tag}
							<button onClick={() => onRemoveTag(tag)}>x</button>
						</span>
					))}
				</div>
				<input
					type="text"
					value={newTag}
					onChange={(e) => setNewTag(e.target.value)}
					placeholder="Add a new tag"
				/>
				<button onClick={handleAddTag}>Add Tag</button>
			</div>
		);
	};

	// Ensure `course` is properly checked before rendering
	if (!course) {
		return <div>Loading course data...</div>;
	}

	return (
		<motion.section
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
		>
			<div className="space-y-6">
				{!course && (
					<div className="flex items-center justify-center h-64">
						<p className="text-gray-500">Loading...</p>
					</div>
				)}
				{course && (
					<div
						key={course.id}
						className="border rounded-lg p-4 bg-white shadow-sm"
					>
						<div
							className="cursor-pointer font-medium text-lg flex items-center gap-2"
							onClick={() => toggleCourse(course.id!)}
						>
							<span
								className={`inline-block transition-transform duration-75 ${
									expandedCourses.includes(course.id!)
										? 'rotate-0'
										: '-rotate-90'
								}`}
							>
								<ChevronDownIcon className="w-5 h-5" />
							</span>
							{course.title}
						</div>
						{expandedCourses.includes(course.id!) && (
							<div className="ml-4 mt-4 space-y-4">
								<div className="space-y-2">
									<label
										htmlFor={`course-description-${course.id}`}
										className="block font-medium"
									>
										Course Description
									</label>
									<textarea
										id={`course-description-${course.id}`}
										className="w-full px-3 py-2 border rounded"
										placeholder="Course Description"
										value={course.description || ''}
										onChange={(e) =>
											handleCourseChange(
												course.id!,
												'description',
												e.target.value
											)
										}
									/>
								</div>

								<div className="space-y-2">
									<label
										htmlFor={`course-order-${course.id}`}
										className="block font-medium"
									>
										Course Order
									</label>
									<input
										id={`course-order-${course.id}`}
										type="text"
										className="w-full px-3 py-2 border rounded"
										placeholder="Course Order"
										value={course.order || 0}
										onChange={(e) =>
											handleOrderChange(
												course.id!,
												e.target.value
											)
										}
									/>
								</div>

								<div className="space-y-2 ">
									<label
										className="	text-sm font-medium cursor-pointer select-none"
										onClick={() =>
											handleProgressionalChange(
												course.id!,
												!course.progressional
											)
										}
									>
										Progressional
									</label>
									<div className="flex items-center">
										<div
											className={`w-12 h-7 rounded-full px-1 cursor-pointer transition-colors duration-300 flex items-center ${
												course.progressional
													? 'bg-primary'
													: 'bg-gray-200 dark:bg-gray-700'
											}`}
											onClick={() =>
												handleProgressionalChange(
													course.id!,
													!course.progressional
												)
											}
										>
											<motion.div
												className="w-5 h-5 rounded-full bg-white shadow-sm"
												animate={{
													x: course.progressional
														? 20
														: 0,
												}}
												transition={{
													type: 'spring',
													stiffness: 500,
													damping: 30,
												}}
											/>
										</div>
									</div>
								</div>

								{/* <TagManager
									tags={tags}
									onAddTag={(tag) =>
										addTag(tag, tags, setTags)()
									}
									onRemoveTag={(tag) =>
										removeTag(setTags, tags)(tag)
									}
								/> */}

								{course.lessons.map((lesson) => (
									<div
										key={lesson.id}
										className="border-l-4 pl-4"
									>
										<div
											className="cursor-pointer font-medium flex items-center gap-2"
											onClick={() =>
												toggleLesson(lesson.id!)
											}
										>
											<ChevronDownIcon
												className={`inline-block transition-transform duration-75 ${
													expandedLessons.includes(
														lesson.id!
													)
														? 'rotate-0'
														: '-rotate-90'
												}`}
											/>
											{lesson.title}
										</div>
										{expandedLessons.includes(
											lesson.id!
										) && (
											<div className="ml-4 mt-4 space-y-4">
												<label
													htmlFor={`lesson-description-${lesson.id}`}
													className="block font-medium"
												>
													Lesson Description
												</label>
												<textarea
													id={`lesson-description-${lesson.id}`}
													className="w-full px-3 py-2 border rounded"
													placeholder="Lesson Description"
													value={
														lesson.description || ''
													}
													onChange={(e) =>
														handleLessonChange(
															course.id!,
															lesson.id!,
															'description',
															e.target.value
														)
													}
												/>
												{lesson.exercises.map(
													(exercise: Exercise) => (
														<div
															key={exercise.id}
															className="border-l-4 pl-4"
														>
															<div
																className="cursor-pointer font-medium flex items-center gap-2"
																onClick={() =>
																	toggleExercise(
																		exercise.id!
																	)
																}
															>
																<ChevronDownIcon
																	className={`inline-block transition-transform duration-75 ${
																		expandedExercises.includes(
																			exercise.id!
																		)
																			? 'rotate-0'
																			: '-rotate-90'
																	}`}
																/>
																{
																	exercise.question
																}
															</div>
															{expandedExercises.includes(
																exercise.id!
															) && (
																<div className="ml-4 mt-4 space-y-4">
																	<label
																		htmlFor={`exercise-question-${exercise.id}`}
																		className="block font-medium"
																	>
																		Exercise
																		Question
																	</label>
																	<input
																		id={`exercise-question-${exercise.id}`}
																		type="text"
																		className="w-full px-3 py-2 border rounded"
																		placeholder="Exercise Question"
																		value={
																			exercise.question
																		}
																		onChange={(
																			e
																		) =>
																			handleExerciseChange(
																				course.id!,
																				lesson.id!,
																				exercise.id!,
																				'question',
																				e
																					.target
																					.value
																			)
																		}
																	/>
																	<label
																		htmlFor={`exercise-type-${exercise.id}`}
																		className="block font-medium"
																	>
																		Exercise
																		Type
																	</label>
																	<select
																		id={`exercise-type-${exercise.id}`}
																		className="w-full px-3 py-2 border rounded mt-2"
																		value={
																			exercise.type
																		}
																		onChange={(
																			e
																		) =>
																			handleExerciseChange(
																				course.id!,
																				lesson.id!,
																				exercise.id!,
																				'type',
																				e
																					.target
																					.value
																			)
																		}
																	>
																		<option value="multiple-choice">
																			Multiple
																			Choice
																		</option>
																		<option value="text">
																			Text
																			Answer
																		</option>
																	</select>

																	{exercise.type ===
																		'multiple-choice' && (
																		<div className="space-y-2 mt-2">
																			<label
																				htmlFor={`exercise-options-${exercise.id}`}
																				className="block font-medium"
																			>
																				Answer
																				Options
																				(comma-separated)
																			</label>
																			<input
																				id={`exercise-options-${exercise.id}`}
																				type="text"
																				className="w-full px-3 py-2 border rounded"
																				placeholder="Answer Options (comma-separated)"
																				value={
																					exercise.options ||
																					''
																				}
																				onChange={(
																					e
																				) =>
																					handleExerciseChange(
																						course.id!,
																						lesson.id!,
																						exercise.id!,
																						'options',
																						e
																							.target
																							.value
																					)
																				}
																			/>
																			<label
																				htmlFor={`exercise-correct-answer-${exercise.id}`}
																				className="block font-medium"
																			>
																				Correct
																				Answer
																			</label>
																			<input
																				id={`exercise-correct-answer-${exercise.id}`}
																				type="text"
																				className="w-full px-3 py-2 border rounded"
																				placeholder="Correct Answer"
																				value={
																					exercise.correctAnswer ||
																					''
																				}
																				onChange={(
																					e
																				) =>
																					handleExerciseChange(
																						course.id!,
																						lesson.id!,
																						exercise.id!,
																						'correctAnswer',
																						e
																							.target
																							.value
																					)
																				}
																			/>
																		</div>
																	)}

																	{exercise.type ===
																		'text' && (
																		<>
																			<label
																				htmlFor={`exercise-correct-answer-${exercise.id}`}
																				className="block font-medium"
																			>
																				Correct
																				Text
																				Answer
																			</label>
																			<textarea
																				id={`exercise-correct-answer-${exercise.id}`}
																				className="w-full px-3 py-2 border rounded mt-2"
																				placeholder="Correct Text Answer"
																				value={
																					exercise.correctAnswer ||
																					''
																				}
																				onChange={(
																					e
																				) =>
																					handleExerciseChange(
																						course.id!,
																						lesson.id!,
																						exercise.id!,
																						'correctAnswer',
																						e
																							.target
																							.value
																					)
																				}
																			/>
																		</>
																	)}

																	<label
																		htmlFor={`exercise-hint-${exercise.id}`}
																		className="block font-medium"
																	>
																		Hint
																		(optional)
																	</label>
																	<textarea
																		id={`exercise-hint-${exercise.id}`}
																		className="w-full px-3 py-2 border rounded mt-2"
																		placeholder="Hint (optional)"
																		value={
																			exercise.hint ||
																			''
																		}
																		onChange={(
																			e
																		) =>
																			handleExerciseChange(
																				course.id!,
																				lesson.id!,
																				exercise.id!,
																				'hint',
																				e
																					.target
																					.value
																			)
																		}
																	/>
																</div>
															)}
														</div>
													)
												)}
											</div>
										)}
									</div>
								))}
							</div>
						)}
					</div>
				)}
			</div>

			<div className="flex gap-4 mt-6">
				<motion.button
					whileHover={{ scale: 1.02 }}
					whileTap={{ scale: 0.95 }}
					transition={{ duration: 0.2 }}
					onClick={saveChanges}
					className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded"
					disabled={isSaving}
				>
					{isSaving ? 'Saving...' : 'Save Changes'}
				</motion.button>
				<motion.button
					whileHover={{ scale: 1.02 }}
					whileTap={{ scale: 0.95 }}
					transition={{ duration: 0.2 }}
					onClick={handleDeleteCourse as any}
					className="cursor-pointer bg-red-600 hover:bg-red-700 text-white font-medium px-4 py-2 rounded"
					disabled={isSaving}
				>
					Delete Course
				</motion.button>
			</div>
			<ConfirmationModal
				isOpen={deleteModalData.isOpen}
				onClose={() =>
					setDeleteModalData((prev) => ({ ...prev, isOpen: false }))
				}
				onConfirm={confirmDeleteCourse}
				title="Delete Course"
				message="Are you sure you want to delete this course? This action cannot be undone."
				confirmText="Delete Course"
				isDangerous={true}
				triggerPosition={{ x: deleteModalData.x, y: deleteModalData.y }}
			/>
		</motion.section>
	);
}
