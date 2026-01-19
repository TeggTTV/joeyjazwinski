import { motion, AnimatePresence } from 'framer-motion';
import { getFullUrl } from '@/utils/db';
import ConfirmationModal from '@/components/ConfirmationModal';
import {
	ChevronDownIcon,
	BookOpen,
	Save,
	Trash2,
	LayoutList,
	GripVertical,
	Hash,
} from 'lucide-react';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { Exercise, Course } from '@/lib/mdx';
import { addTag, removeTag } from './helpers';
import RenderTagInput from './RenderTagInput';

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

	const [tags, setTags] = useState<string[]>(course?.tags || []);
	const [tagInput, setTagInput] = useState('');

	const handleSetTags = (newTags: any) => {
		const updatedTags =
			typeof newTags === 'function' ? newTags(tags) : newTags;
		setTags(updatedTags);
		// Also update the course state immediately for consistency
		handleCourseChange(course.id!, 'tags', updatedTags);
	};

	const handleAddTag = () => {
		if (tagInput.trim()) {
			addTag(tagInput, tags, handleSetTags)();
			setTagInput('');
		}
	};

	async function saveChanges() {
		setIsSaving(true);

		const updatedCourse = {
			...course,
			tags,
		};

		await fetch(getFullUrl('/api/updateCourse'), {
			method: 'POST',
			credentials: 'include',
			body: JSON.stringify(updatedCourse),
		})
			.then((response) => {
				if (response.ok) {
					toast.success('Changes saved successfully!');
				} else if (response.status === 401) {
					toast.error('Unauthorized! Please log in again.');
				} else {
					toast.error(
						'Failed to save changes. Please try again later.',
					);
				}
			})
			.finally(() => {
				setIsSaving(false);
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
				: [...prev, courseId],
		);
	};

	const toggleLesson = (lessonId: string) => {
		setExpandedLessons((prev) =>
			prev.includes(lessonId)
				? prev.filter((id) => id !== lessonId)
				: [...prev, lessonId],
		);
	};

	const toggleExercise = (exerciseId: string) => {
		setExpandedExercises((prev) =>
			prev.includes(exerciseId)
				? prev.filter((id) => id !== exerciseId)
				: [...prev, exerciseId],
		);
	};

	function handleCourseChange(courseId: string, field: string, value: any) {
		setCourses((prevCourses) =>
			prevCourses.map((c) =>
				c.id === courseId ? { ...c, [field]: value } : c,
			),
		);
	}

	function handleLessonChange(
		courseId: string,
		lessonId: string,
		field: string,
		value: any,
	) {
		setCourses((prevCourses) =>
			prevCourses.map((c) =>
				c.id === courseId
					? {
							...c,
							lessons: c.lessons.map((lesson) =>
								lesson.id === lessonId
									? { ...lesson, [field]: value }
									: lesson,
							),
						}
					: c,
			),
		);
	}

	function handleExerciseChange(
		courseId: string,
		lessonId: string,
		exerciseId: string,
		field: string,
		value: any,
	) {
		setCourses((prevCourses) =>
			prevCourses.map((c) =>
				c.id === courseId
					? {
							...c,
							lessons: c.lessons.map((lesson) =>
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
														: exercise,
											),
										}
									: lesson,
							),
						}
					: c,
			),
		);
	}

	const handleOrderChange = (courseId: string, value: string) => {
		const orderList = value.split(',').map((item) => item.trim());
		setCourses((prevCourses) =>
			prevCourses.map((c) =>
				c.id === courseId ? { ...c, order: orderList } : c,
			),
		);
	};

	const handleProgressionalChange = (courseId: string, value: boolean) => {
		setCourses((prevCourses) =>
			prevCourses.map((c) =>
				c.id === courseId ? { ...c, progressional: value } : c,
			),
		);
	};

	if (!course) {
		return (
			<div className="p-8 text-center text-muted-foreground animate-pulse">
				Loading course data...
			</div>
		);
	}

	return (
		<motion.section
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
			className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden mb-6"
		>
			<div
				className={`cursor-pointer group hover:bg-muted/30 transition-colors ${
					expandedCourses.includes(course.id!)
						? 'bg-muted/20 border-b border-border'
						: ''
				}`}
				onClick={() => toggleCourse(course.id!)}
			>
				<div className="p-6 flex items-center justify-between">
					<div className="flex items-center gap-4">
						<div
							className={`p-3 rounded-xl transition-colors ${
								expandedCourses.includes(course.id!)
									? 'bg-primary/10 text-primary'
									: 'bg-secondary text-muted-foreground group-hover:text-foreground'
							}`}
						>
							<BookOpen className="w-6 h-6" />
						</div>
						<div>
							<h3 className="text-xl font-bold">
								{course.title}
							</h3>
							<p className="text-sm text-muted-foreground line-clamp-1">
								{course.description}
							</p>
						</div>
					</div>
					<div className="flex items-center gap-2 text-muted-foreground">
						<span className="text-sm px-2 py-1 bg-secondary rounded-md hidden sm:inline-block">
							{course.lessons.length} Lessons
						</span>
						<ChevronDownIcon
							className={`w-5 h-5 transition-transform duration-300 ${
								expandedCourses.includes(course.id!)
									? 'rotate-180'
									: 'rotate-0'
							}`}
						/>
					</div>
				</div>
			</div>

			<AnimatePresence>
				{expandedCourses.includes(course.id!) && (
					<motion.div
						initial={{ height: 0 }}
						animate={{ height: 'auto' }}
						exit={{ height: 0 }}
						className="overflow-hidden"
					>
						<div className="p-6 md:p-8 space-y-8 bg-background/50">
							{/* Course Details */}
							<div className="grid grid-cols-1 gap-6">
								<div className="space-y-2">
									<label className="text-sm font-semibold text-foreground/80 flex items-center gap-2">
										<LayoutList className="w-4 h-4" />{' '}
										Description
									</label>
									<textarea
										rows={4}
										className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-none shadow-sm"
										value={course.description || ''}
										onChange={(e) =>
											handleCourseChange(
												course.id!,
												'description',
												e.target.value,
											)
										}
										placeholder="Enter course overview..."
									/>
								</div>

								<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
									<div className="space-y-2">
										<label className="text-sm font-semibold text-foreground/80 flex items-center gap-2">
											<GripVertical className="w-4 h-4" />{' '}
											Course Order
										</label>
										<input
											type="text"
											className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
											value={
												course.order?.join(', ') || ''
											}
											onChange={(e) =>
												handleOrderChange(
													course.id!,
													e.target.value,
												)
											}
											placeholder="lesson-slug-1, lesson-slug-2"
										/>
										<p className="text-xs text-muted-foreground">
											Comma-separated lesson slugs
										</p>
									</div>

									<div className="space-y-2">
										<RenderTagInput
											tagInput={tagInput}
											setTagInput={setTagInput}
											addTag={handleAddTag}
											tags={tags}
											removeTag={(tag) =>
												removeTag(
													handleSetTags,
													tags,
												)(tag)
											}
										/>
									</div>
								</div>

								<div className="flex items-center justify-between p-4 bg-muted/30 rounded-xl border border-border">
									<div className="space-y-1">
										<label className="text-sm font-bold block">
											Progressional Mode
										</label>
										<p className="text-xs text-muted-foreground">
											Users must complete lessons in order
										</p>
									</div>
									<button
										onClick={() =>
											handleProgressionalChange(
												course.id!,
												!course.progressional,
											)
										}
										className={`w-14 h-8 rounded-full px-1 transition-colors duration-300 flex items-center shadow-inner ${
											course.progressional
												? 'bg-primary'
												: 'bg-muted-foreground/30'
										}`}
									>
										<motion.div
											className="w-6 h-6 rounded-full bg-white shadow-md cursor-pointer"
											animate={{
												x: course.progressional
													? 24
													: 0,
											}}
											transition={{
												type: 'spring',
												stiffness: 500,
												damping: 30,
											}}
										/>
									</button>
								</div>
							</div>

							{/* Lessons List */}
							<div className="space-y-4 pt-4 border-t border-border">
								<h3 className="text-lg font-bold flex items-center gap-2">
									Course Lessons
									<span className="text-xs font-normal text-muted-foreground bg-secondary px-2 py-1 rounded-full">
										{course.lessons.length}
									</span>
								</h3>

								<div className="space-y-3">
									{course.lessons.map((lesson, idx) => (
										<div
											key={lesson.id}
											className="border border-border rounded-xl bg-card overflow-hidden"
										>
											<div
												className="p-4 flex items-center justify-between cursor-pointer hover:bg-muted/50 transition-colors"
												onClick={() =>
													toggleLesson(lesson.id!)
												}
											>
												<div className="flex items-center gap-3">
													<div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center font-mono text-xs font-bold text-muted-foreground">
														{idx + 1}
													</div>
													<span className="font-semibold">
														{lesson.title}
													</span>
												</div>
												<ChevronDownIcon
													className={`w-5 h-5 text-muted-foreground transition-transform duration-200 ${
														expandedLessons.includes(
															lesson.id!,
														)
															? 'rotate-180'
															: ''
													}`}
												/>
											</div>

											{expandedLessons.includes(
												lesson.id!,
											) && (
												<div className="p-4 bg-muted/10 border-t border-border space-y-4">
													<div className="space-y-2">
														<label className="text-xs font-bold text-muted-foreground uppercase">
															Description
														</label>
														<textarea
															className="w-full px-3 py-2 rounded-lg bg-background border border-border focus:ring-1 focus:ring-primary outline-none text-sm resize-none"
															value={
																lesson.description ||
																''
															}
															onChange={(e) =>
																handleLessonChange(
																	course.id!,
																	lesson.id!,
																	'description',
																	e.target
																		.value,
																)
															}
															rows={2}
														/>
													</div>

													<div className="space-y-3">
														<h4 className="text-sm font-bold text-muted-foreground uppercase tracking-wider">
															Exercises
														</h4>
														{lesson.exercises.map(
															(exercise) => (
																<div
																	key={
																		exercise.id
																	}
																	className="bg-background border border-border rounded-lg overflow-hidden"
																>
																	<div
																		className="p-3 flex items-start justify-between cursor-pointer hover:bg-muted/30"
																		onClick={() =>
																			toggleExercise(
																				exercise.id!,
																			)
																		}
																	>
																		<div className="flex-1 pr-4">
																			<span className="text-sm font-medium line-clamp-1">
																				{
																					exercise.question
																				}
																			</span>
																		</div>
																		<ChevronDownIcon
																			className={`w-4 h-4 text-muted-foreground transition-transform ${
																				expandedExercises.includes(
																					exercise.id!,
																				)
																					? 'rotate-180'
																					: ''
																			}`}
																		/>
																	</div>

																	{expandedExercises.includes(
																		exercise.id!,
																	) && (
																		<div className="p-3 bg-muted/20 border-t border-border space-y-3">
																			<div className="space-y-1">
																				<label className="text-xs text-muted-foreground">
																					Question
																				</label>
																				<input
																					type="text"
																					className="w-full px-3 py-2 rounded-md bg-background border border-border text-sm"
																					value={
																						exercise.question
																					}
																					onChange={(
																						e,
																					) =>
																						handleExerciseChange(
																							course.id!,
																							lesson.id!,
																							exercise.id!,
																							'question',
																							e
																								.target
																								.value,
																						)
																					}
																				/>
																			</div>
																			<div className="grid grid-cols-2 gap-3">
																				<div className="space-y-1">
																					<label className="text-xs text-muted-foreground">
																						Type
																					</label>
																					<select
																						className="w-full px-3 py-2 rounded-md bg-background border border-border text-sm"
																						value={
																							exercise.type
																						}
																						onChange={(
																							e,
																						) =>
																							handleExerciseChange(
																								course.id!,
																								lesson.id!,
																								exercise.id!,
																								'type',
																								e
																									.target
																									.value,
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
																				</div>
																				<div className="space-y-1">
																					<label className="text-xs text-muted-foreground">
																						Correct
																						Answer
																					</label>
																					<input
																						type="text"
																						className="w-full px-3 py-2 rounded-md bg-background border border-border text-sm text-green-600"
																						value={
																							exercise.correctAnswer ||
																							''
																						}
																						onChange={(
																							e,
																						) =>
																							handleExerciseChange(
																								course.id!,
																								lesson.id!,
																								exercise.id!,
																								'correctAnswer',
																								e
																									.target
																									.value,
																							)
																						}
																					/>
																				</div>
																			</div>
																		</div>
																	)}
																</div>
															),
														)}
													</div>
												</div>
											)}
										</div>
									))}
								</div>
							</div>

							{/* Actions */}
							<div className="flex justify-end gap-3 pt-6 border-t border-border">
								<button
									onClick={handleDeleteCourse as any}
									className="px-4 py-2 rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 font-medium transition-colors flex items-center gap-2"
									disabled={isSaving}
								>
									<Trash2 className="w-4 h-4" /> Delete Course
								</button>
								<button
									onClick={saveChanges}
									disabled={isSaving}
									className="px-6 py-2 rounded-xl bg-primary text-primary-foreground font-bold hover:bg-primary/90 transition-all shadow-md shadow-primary/20 flex items-center gap-2"
								>
									{isSaving ? (
										<span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
									) : (
										<Save className="w-4 h-4" />
									)}
									Save Changes
								</button>
							</div>
						</div>
					</motion.div>
				)}
			</AnimatePresence>

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
