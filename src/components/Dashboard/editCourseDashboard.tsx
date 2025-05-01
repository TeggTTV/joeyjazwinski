import { Change, Course } from '@/lib/mdx';

export default function editCourseDashboard(
	courses: Course[],
	handleCourseChange: (
		courseId: string,
		field: string,
		value: string
	) => void,
	handleLessonChange: (
		courseId: string,
		lessonId: string,
		field: string,
		value: string
	) => void,
	handleExerciseChange: (
		courseId: string,
		lessonId: string,
		exerciseId: string,
		field: string,
		value: string
	) => void,
	saveChanges: () => Promise<void>,
	changes: Change[]
) {
	console.log('editCourseDashboard courses:', courses);

	return (
		<section>
			<h2 className="text-2xl font-bold mb-4">
				Edit Courses, Lessons, and Exercises
			</h2>
			<div className="space-y-4">
				{courses &&
					courses.length > 0 &&
					courses.map((course) => (
						<div key={course.id} className="border p-4 rounded">
							<label className="block font-medium mb-1">
								Course Title
							</label>
							<input
								type="text"
								value={course.title}
								onChange={(e) =>
									handleCourseChange(
										course.id,
										'title',
										e.target.value
									)
								}
								className="w-full border px-3 py-2 rounded mb-2"
								placeholder="Course Title"
							/>
							{course.description && (
								<>
									<label className="block font-medium mb-1">
										Course Description
									</label>
									<textarea
										value={course.description}
										onChange={(e) =>
											handleCourseChange(
												course.id,
												'description',
												e.target.value
											)
										}
										className="w-full border px-3 py-2 rounded mb-2"
										placeholder="Course Description"
									/>
								</>
							)}
							{course.lessons.map((lesson) => (
								<div
									key={lesson.id}
									className="ml-4 border-l pl-4"
								>
									<label className="block font-medium mb-1">
										Lesson Title
									</label>
									<input
										type="text"
										value={lesson.title}
										onChange={(e) =>
											handleLessonChange(
												course.id,
												lesson.id,
												'title',
												e.target.value
											)
										}
										className="w-full border px-3 py-2 rounded mb-2"
										placeholder="Lesson Title"
									/>
									{lesson.description && (
										<>
											<label className="block font-medium mb-1">
												Lesson Description
											</label>
											<textarea
												value={lesson.description}
												onChange={(e) =>
													handleLessonChange(
														course.id,
														lesson.id,
														'description',
														e.target.value
													)
												}
												className="w-full border px-3 py-2 rounded mb-2"
												placeholder="Lesson Description"
											/>
										</>
									)}
									{lesson.exercises.map((exercise) => (
										<div
											key={exercise.id}
											className="ml-4 border-l pl-4"
										>
											<label className="block font-medium mb-1">
												Exercise Question
											</label>
											<input
												type="text"
												value={exercise.question}
												onChange={(e) =>
													handleExerciseChange(
														course.id,
														lesson.id,
														exercise.id,
														'question',
														e.target.value
													)
												}
												className="w-full border px-3 py-2 rounded mb-2"
												placeholder="Exercise Question"
											/>
											<label className="block font-medium mb-1">
												Exercise Type
											</label>
											<select
												value={exercise.type}
												onChange={(e) =>
													handleExerciseChange(
														course.id,
														lesson.id,
														exercise.id,
														'type',
														e.target.value
													)
												}
												className="w-full border px-3 py-2 rounded mb-2"
											>
												<option value="multiple-choice">
													Multiple Choice
												</option>
												<option value="text">
													Text Answer
												</option>
											</select>
											{exercise.type ===
												'multiple-choice' &&
											exercise.options ? (
												<div className="mt-2">
													<label className="block font-medium mb-1">
														Answer Choices
													</label>
													<input
														type="text"
														value={exercise.options}
														onChange={(e) =>
															handleExerciseChange(
																course.id,
																lesson.id,
																exercise.id,
																'options',
																e.target.value
															)
														}
														className="w-full border px-3 py-2 rounded mb-2"
														placeholder="Enter options separated by commas"
													/>
													{/* correctAnswer */}
													<label className="block font-medium mb-1">
														Correct Answer
													</label>
													<input
														type="text"
														value={
															exercise.correctAnswer
														}
														onChange={(e) =>
															handleExerciseChange(
																course.id,
																lesson.id,
																exercise.id,
																'correctAnswer',
																e.target.value
															)
														}
														className="w-full border px-3 py-2 rounded mb-2"
														placeholder="Correct Answer"
													/>

													<ul className="list-disc pl-5">
														{exercise.options
															.split(',')
															.map(
																(
																	option,
																	index
																) => (
																	<li
																		key={
																			index
																		}
																		className="mb-1"
																	>
																		<label className="block font-medium mb-1">
																			Option{' '}
																			{index +
																				1}
																		</label>
																		<input
																			type="text"
																			value={
																				option
																			}
																			disabled={
																				true
																			}
																			onChange={(
																				e
																			) =>
																				handleExerciseChange(
																					course.id,
																					lesson.id,
																					exercise.id,
																					`options[${index}]`,
																					e
																						.target
																						.value
																				)
																			}
																			className="w-full border px-3 py-2 rounded"
																			placeholder={`Option ${
																				index +
																				1
																			}`}
																		/>
																	</li>
																)
															)}
													</ul>
												</div>
											) : exercise.type === 'text' ? (
												<div className="mt-2">
													<label className="block font-medium mb-1">
														Text Answer
													</label>
													<textarea
														value={
															exercise.correctAnswer ||
															''
														}
														onChange={(e) =>
															handleExerciseChange(
																course.id,
																lesson.id,
																exercise.id,
																'answer',
																e.target.value
															)
														}
														className="w-full border px-3 py-2 rounded"
														placeholder="Enter your answer here"
													/>
												</div>
											) : null}
											{exercise.hint && (
												<>
													<label className="block font-medium mb-1">
														Exercise Hint
													</label>
													<textarea
														value={exercise.hint}
														onChange={(e) =>
															handleExerciseChange(
																course.id,
																lesson.id,
																exercise.id,
																'hint',
																e.target.value
															)
														}
														className="w-full border px-3 py-2 rounded mb-2"
														placeholder="Exercise Hint"
													/>
												</>
											)}
										</div>
									))}
								</div>
							))}
						</div>
					))}
			</div>
			<button
				onClick={saveChanges}
				className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
			>
				Save Changes
			</button>
			<div className="mt-4">
				<h3 className="text-lg font-semibold">Changes:</h3>
				<ul className="list-disc pl-5">
					{changes.map((change, index) => (
						<li key={index}>
							{change.type} (ID: {change.id}) - {change.field}:{' '}
							{change.value}
						</li>
					))}
				</ul>
			</div>
		</section>
	);
}
