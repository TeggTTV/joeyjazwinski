import { Change, Course } from '@/lib/mdx';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

// Add animated arrows to indicate active dropdowns
// Update the EditCourseDashboard component to accept setCourses as a prop
export default function EditCourseDashboard(
	courses: Course[],
	setCourses: React.Dispatch<React.SetStateAction<Course[]>> // Add setCourses as a prop
) {
	const [expandedCourses, setExpandedCourses] = useState<string[]>([]);
	const [expandedLessons, setExpandedLessons] = useState<string[]>([]);
	const [expandedExercises, setExpandedExercises] = useState<string[]>([]);

	function saveChanges() {
		console.log('Changes saved:', courses);
	}
	// Add a useState hook to manage the courses state
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

	const Arrow = ({ isExpanded }: { isExpanded: boolean }) => (
		<ChevronDown
			className={`inline-block transition-transform duration-75 ${
				isExpanded ? 'rotate-0' : '-rotate-90'
			}`}
		/>
	);

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

	// Add functionality for course params: order and progressional
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

	// Fix the issue where the progressional checkbox value does not update
	const handleProgressionalChange = (courseId: string, value: boolean) => {
		setCourses((prevCourses) =>
			prevCourses.map((course) =>
				course.id === courseId
					? { ...course, progressional: value }
					: course
			)
		);
	};

	return (
		<section>
			<h2 className="text-2xl font-bold mb-4">
				Edit Courses, Lessons, and Exercises
			</h2>
			<div className="space-y-6">
				{courses.map((course) => (
					<div
						key={course.id}
						className="border rounded-lg p-4 bg-white shadow-sm"
					>
						<div
							className="cursor-pointer font-medium text-lg flex items-center gap-2"
							onClick={() => toggleCourse(course.id!)}
						>
							<Arrow
								isExpanded={expandedCourses.includes(
									course.id!
								)}
							/>
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

								<div className="space-y-2">
									<label
										htmlFor={`course-progressional-${course.id}`}
										className="block font-medium"
									>
										Progressional
									</label>
									<input
										id={`course-progressional-${course.id}`}
										type="checkbox"
										className="w-4 h-4"
										checked={!!course.progressional} // Convert to boolean explicitly
										onChange={(e) =>
											handleProgressionalChange(
												course.id!,
												e.target.checked
											)
										}
									/>
								</div>

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
											<Arrow
												isExpanded={expandedLessons.includes(
													lesson.id!
												)}
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
													(exercise) => (
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
																<Arrow
																	isExpanded={expandedExercises.includes(
																		exercise.id!
																	)}
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
				))}
			</div>

			<button
				onClick={saveChanges}
				className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded"
			>
				Save Changes
			</button>

			<div className="mt-6">
				<h3 className="text-lg font-semibold mb-2">Changes:</h3>
				<ul className="list-disc pl-6 space-y-1 text-sm">
					{/* {changes.map((change, index) => (
						<li key={index}>
							{change.type} (ID: {change.id}) - {change.field}:{' '}
							{change.value}
						</li>
					))} */}
				</ul>
			</div>
		</section>
	);
}
