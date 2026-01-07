import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { motion, AnimatePresence } from 'framer-motion';
import {
	Plus,
	Trash,
	BookOpen,
	ChevronDown,
	ChevronUp,
	Save,
	HelpCircle,
	FileText,
	Check,
} from 'lucide-react';

interface Exercise {
	question: string;
	type: 'single-select' | 'multi-select' | 'short-answer';
	options?: string; // JSON string for multiple choice options
	correctAnswer: string;
	hint?: string;
}

interface Lesson {
	title: string;
	slug: string;
	description: string;
	content?: string;
	duration: string;
	exercises: Exercise[];
}

const CreateCourse = () => {
	const [loading, setLoading] = useState(false);
	const [title, setTitle] = useState('');
	const [slug, setSlug] = useState('');
	const [description, setDescription] = useState('');
	const [progressional, setProgressional] = useState(false);
	const [tags, setTags] = useState<string>('');
	const [order, setOrder] = useState('');
	const [duration, setDuration] = useState('');
	const [lessons, setLessons] = useState<Lesson[]>([]);
	const [expandedLesson, setExpandedLesson] = useState<number | null>(null);

	// Auto-generate slug from title
	const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const val = e.target.value;
		setTitle(val);
		setSlug(
			val
				.toLowerCase()
				.replace(/[^a-z0-9]+/g, '-')
				.replace(/(^-|-$)+/g, '')
		);
	};

	const addLesson = () => {
		setLessons([
			...lessons,
			{
				title: `Lesson ${lessons.length + 1}`,
				slug: `lesson-${lessons.length + 1}`,
				description: '',
				duration: '',
				exercises: [],
			},
		]);
		setExpandedLesson(lessons.length);
	};

	const removeLesson = (index: number) => {
		setLessons(lessons.filter((_, i) => i !== index));
		if (expandedLesson === index) setExpandedLesson(null);
	};

	const updateLesson = (index: number, field: keyof Lesson, value: any) => {
		const newLessons = [...lessons];
		newLessons[index] = { ...newLessons[index], [field]: value };
		setLessons(newLessons);
	};

	// Exercise Management within a Lesson
	const addExercise = (lessonIndex: number) => {
		const newLessons = [...lessons];
		newLessons[lessonIndex].exercises.push({
			question: '',
			type: 'short-answer',
			correctAnswer: '',
			hint: '',
		});
		setLessons(newLessons);
	};

	const updateExercise = (
		lessonIndex: number,
		exerciseIndex: number,
		field: keyof Exercise,
		value: any
	) => {
		const newLessons = [...lessons];
		newLessons[lessonIndex].exercises[exerciseIndex] = {
			...newLessons[lessonIndex].exercises[exerciseIndex],
			[field]: value,
		};
		setLessons(newLessons);
	};

	const removeExercise = (lessonIndex: number, exerciseIndex: number) => {
		const newLessons = [...lessons];
		newLessons[lessonIndex].exercises = newLessons[
			lessonIndex
		].exercises.filter((_, i) => i !== exerciseIndex);
		setLessons(newLessons);
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);

		const courseData = {
			title,
			slug,
			description,
			progressional,
			tags: tags
				.split(',')
				.map((t) => t.trim())
				.filter(Boolean),
			order: order
				? order
						.split(',')
						.map((o) => o.trim())
						.filter(Boolean)
				: undefined,
			duration,
			lessons,
		};

		try {
			const response = await fetch('/api/createCourse', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(courseData),
			});

			const result = await response.json();
			if (response.ok) {
				toast.success('Course created successfully!');
				// Reset form
				setTitle('');
				setSlug('');
				setDescription('');
				setOrder('');
				setLessons([]);
			} else {
				toast.error(`Error: ${result.message}`);
			}
		} catch (error) {
			console.error(error);
			toast.error('An unexpected error occurred.');
		} finally {
			setLoading(false);
		}
	};

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			className="bg-card border border-border rounded-xl shadow-lg overflow-hidden"
		>
			<div className="p-6 border-b border-border bg-muted/40 flex justify-between items-center">
				<h2 className="text-xl font-bold flex items-center gap-2">
					<BookOpen className="w-5 h-5 text-primary" />
					Create New Course
				</h2>
				<button
					onClick={handleSubmit}
					disabled={loading}
					className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50"
				>
					{loading ? (
						'Saving...'
					) : (
						<>
							<Save className="w-4 h-4" /> Save Course
						</>
					)}
				</button>
			</div>

			<div className="p-6 md:p-8 space-y-8">
				{/* Basic Info */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					<div className="space-y-2">
						<label className="text-sm font-medium">
							Course Title
						</label>
						<input
							type="text"
							required
							value={title}
							onChange={handleTitleChange}
							className="w-full px-4 py-2 rounded-lg bg-background border border-border focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
							placeholder="e.g. Advanced Next.js Patterns"
						/>
					</div>
					<div className="space-y-2">
						<label className="text-sm font-medium">
							Slug (URL)
						</label>
						<input
							type="text"
							required
							value={slug}
							onChange={(e) => setSlug(e.target.value)}
							className="w-full px-4 py-2 rounded-lg bg-background border border-border focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all font-mono text-sm"
							placeholder="advanced-nextjs-patterns"
						/>
					</div>
					<div className="space-y-2 md:col-span-2">
						<label className="text-sm font-medium">
							Description
						</label>
						<textarea
							required
							value={description}
							onChange={(e) => setDescription(e.target.value)}
							rows={3}
							className="w-full px-4 py-2 rounded-lg bg-background border border-border focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all resize-none"
							placeholder="A comprehensive guide to..."
						/>
					</div>

					<div className="space-y-2">
						<label className="text-sm font-medium">
							Tags (comma separated)
						</label>
						<input
							type="text"
							value={tags}
							onChange={(e) => setTags(e.target.value)}
							className="w-full px-4 py-2 rounded-lg bg-background border border-border focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
							placeholder="react, typescript, animation"
						/>
					</div>

					<div className="space-y-2">
						<label className="text-sm font-medium">
							Order (comma separated lesson slugs, optional)
						</label>
						<input
							type="text"
							value={order}
							onChange={(e) => setOrder(e.target.value)}
							className="w-full px-4 py-2 rounded-lg bg-background border border-border focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
							placeholder="lesson-1, lesson-2"
						/>
					</div>

					<div className="grid grid-cols-2 gap-4">
						<div className="space-y-2">
							<label className="text-sm font-medium">
								Duration (min)
							</label>
							<input
								type="number"
								value={duration}
								onChange={(e) => setDuration(e.target.value)}
								className="w-full px-4 py-2 rounded-lg bg-background border border-border focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
								placeholder="120"
							/>
						</div>
					</div>
					<div className="flex flex-col space-y-2">
						<label
							className="text-sm font-medium cursor-pointer select-none"
							onClick={() => setProgressional(!progressional)}
						>
							Start Progressional
						</label>
						<div className="flex items-center">
							<div
								className={`w-12 h-7 rounded-full px-1 cursor-pointer transition-colors duration-300 flex items-center ${
									progressional
										? 'bg-primary'
										: 'bg-gray-200 dark:bg-gray-700'
								}`}
								onClick={() => setProgressional(!progressional)}
							>
								<motion.div
									className="w-5 h-5 rounded-full bg-white shadow-sm"
									animate={{ x: progressional ? 20 : 0 }}
									transition={{
										type: 'spring',
										stiffness: 500,
										damping: 30,
									}}
								/>
							</div>
						</div>
					</div>
				</div>

				<div className="border-t border-border pt-8">
					<div className="flex justify-between items-center mb-6">
						<h3 className="text-lg font-semibold">
							Course Curriculum
						</h3>
						<button
							type="button"
							onClick={addLesson}
							className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 font-medium bg-primary/10 px-3 py-1.5 rounded-lg transition-colors"
						>
							<Plus className="w-4 h-4" /> Add Lesson
						</button>
					</div>

					<div className="space-y-4">
						{lessons.length === 0 && (
							<div className="text-center py-12 border-2 border-dashed border-border rounded-xl text-muted-foreground">
								<FileText className="w-12 h-12 mx-auto mb-3 opacity-20" />
								<p>
									No lessons added yet. Click "Add Lesson" to
									start building your curriculum.
								</p>
							</div>
						)}
						<AnimatePresence>
							{lessons.map((lesson, index) => (
								<motion.div
									key={index}
									initial={{ opacity: 0, height: 0 }}
									animate={{ opacity: 1, height: 'auto' }}
									exit={{ opacity: 0, height: 0 }}
									className="border border-border rounded-lg overflow-hidden bg-card"
								>
									<div
										className="p-4 bg-secondary/30 flex justify-between items-center cursor-pointer hover:bg-secondary/50 transition-colors"
										onClick={() =>
											setExpandedLesson(
												expandedLesson === index
													? null
													: index
											)
										}
									>
										<div className="flex items-center gap-3">
											<div className="bg-primary/20 text-primary w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">
												{index + 1}
											</div>
											<span className="font-medium">
												{lesson.title || 'New Lesson'}
											</span>
											<span className="text-xs text-muted-foreground ml-2">
												({lesson.exercises.length}{' '}
												exercises)
											</span>
										</div>
										<div className="flex items-center gap-2">
											{expandedLesson === index ? (
												<ChevronUp className="w-4 h-4" />
											) : (
												<ChevronDown className="w-4 h-4" />
											)}
										</div>
									</div>

									{expandedLesson === index && (
										<div className="p-6 border-t border-border space-y-6">
											<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
												<div className="space-y-1">
													<label className="text-xs font-medium text-muted-foreground">
														Title
													</label>
													<input
														type="text"
														value={lesson.title}
														onChange={(e) =>
															updateLesson(
																index,
																'title',
																e.target.value
															)
														}
														className="w-full px-3 py-2 rounded-md bg-background border border-border text-sm"
													/>
												</div>
												<div className="space-y-1">
													<label className="text-xs font-medium text-muted-foreground">
														Slug
													</label>
													<input
														type="text"
														value={lesson.slug}
														onChange={(e) =>
															updateLesson(
																index,
																'slug',
																e.target.value
															)
														}
														className="w-full px-3 py-2 rounded-md bg-background border border-border text-sm font-mono"
													/>
												</div>
												<div className="space-y-1 md:col-span-2">
													<label className="text-xs font-medium text-muted-foreground">
														Description
													</label>
													<input
														type="text"
														value={
															lesson.description
														}
														onChange={(e) =>
															updateLesson(
																index,
																'description',
																e.target.value
															)
														}
														className="w-full px-3 py-2 rounded-md bg-background border border-border text-sm"
													/>
												</div>
												<div className="space-y-1 md:col-span-2">
													<label className="text-xs font-medium text-muted-foreground">
														Lesson Content
														(Markdown)
													</label>
													<textarea
														value={
															lesson.content || ''
														}
														onChange={(e) =>
															updateLesson(
																index,
																'content',
																e.target.value
															)
														}
														rows={6}
														className="w-full px-3 py-2 rounded-md bg-background border border-border text-sm font-mono"
														placeholder="# Introduction\n\nWelcome to this lesson..."
													/>
												</div>
											</div>

											{/* Exercises */}
											<div className="bg-muted/30 p-4 rounded-lg">
												<div className="flex justify-between items-center mb-4">
													<h4 className="text-sm font-semibold flex items-center gap-2">
														<HelpCircle className="w-4 h-4" />{' '}
														Lesson Exercises
													</h4>
													<button
														type="button"
														onClick={(e) => {
															e.stopPropagation();
															addExercise(index);
														}}
														className="text-xs text-primary hover:underline"
													>
														+ Add Exercise
													</button>
												</div>

												<div className="space-y-3">
													{lesson.exercises.map(
														(ex, exIndex) => (
															<div
																key={exIndex}
																className="p-4 bg-background border border-border rounded-md relative group space-y-3"
															>
																<button
																	onClick={() =>
																		removeExercise(
																			index,
																			exIndex
																		)
																	}
																	className="absolute top-2 right-2 text-muted-foreground hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
																>
																	<Trash className="w-3.5 h-3.5" />
																</button>

																<div className="flex gap-4">
																	<div className="flex-1 space-y-1">
																		<label className="text-xs font-medium text-muted-foreground">
																			Question
																		</label>
																		<input
																			type="text"
																			value={
																				ex.question
																			}
																			onChange={(
																				e
																			) =>
																				updateExercise(
																					index,
																					exIndex,
																					'question',
																					e
																						.target
																						.value
																				)
																			}
																			className="w-full px-3 py-2 rounded bg-muted/20 border border-border text-sm"
																			placeholder="What is...?"
																		/>
																	</div>
																	<div className="w-1/3 space-y-1">
																		<label className="text-xs font-medium text-muted-foreground">
																			Type
																		</label>
																		<select
																			value={
																				ex.type
																			}
																			onChange={(
																				e
																			) =>
																				updateExercise(
																					index,
																					exIndex,
																					'type',
																					e
																						.target
																						.value
																				)
																			}
																			className="w-full px-3 py-2 rounded bg-muted/20 border border-border text-sm outline-none"
																		>
																			<option value="short-answer">
																				Short
																				Answer
																			</option>
																			<option value="single-select">
																				Single
																				Select
																			</option>
																			<option value="multi-select">
																				Multi
																				Select
																			</option>
																		</select>
																	</div>
																</div>

																{(ex.type ===
																	'single-select' ||
																	ex.type ===
																		'multi-select') && (
																	<div className="space-y-1">
																		<label className="text-xs font-medium text-muted-foreground">
																			Options
																			(JSON
																			Array,
																			e.g.
																			["A",
																			"B",
																			"C"])
																		</label>
																		<input
																			type="text"
																			value={
																				ex.options ||
																				''
																			}
																			onChange={(
																				e
																			) =>
																				updateExercise(
																					index,
																					exIndex,
																					'options',
																					e
																						.target
																						.value
																				)
																			}
																			className="w-full px-3 py-2 rounded bg-muted/20 border border-border text-sm font-mono"
																			placeholder='["Option A", "Option B"]'
																		/>
																	</div>
																)}

																<div className="grid grid-cols-2 gap-4">
																	<div className="space-y-1">
																		<label className="text-xs font-medium text-muted-foreground">
																			Correct
																			Answer
																		</label>
																		<input
																			type="text"
																			value={
																				ex.correctAnswer
																			}
																			onChange={(
																				e
																			) =>
																				updateExercise(
																					index,
																					exIndex,
																					'correctAnswer',
																					e
																						.target
																						.value
																				)
																			}
																			className="w-full px-3 py-2 rounded bg-muted/20 border border-border text-sm text-green-600 font-medium"
																			placeholder={
																				ex.type ===
																				'multi-select'
																					? '["Answer"]'
																					: 'Answer'
																			}
																		/>
																	</div>
																	<div className="space-y-1">
																		<label className="text-xs font-medium text-muted-foreground">
																			Hint
																			(Optional)
																		</label>
																		<input
																			type="text"
																			value={
																				ex.hint ||
																				''
																			}
																			onChange={(
																				e
																			) =>
																				updateExercise(
																					index,
																					exIndex,
																					'hint',
																					e
																						.target
																						.value
																				)
																			}
																			className="w-full px-3 py-2 rounded bg-muted/20 border border-border text-sm italic"
																			placeholder="Think about..."
																		/>
																	</div>
																</div>
															</div>
														)
													)}
													{lesson.exercises.length ===
														0 && (
														<p className="text-xs text-muted-foreground italic">
															No exercises added.
														</p>
													)}
												</div>
											</div>

											<div className="flex justify-end pt-2">
												<button
													type="button"
													onClick={() =>
														removeLesson(index)
													}
													className="text-xs text-red-500 hover:text-red-700 font-medium flex items-center gap-1"
												>
													<Trash className="w-3 h-3" />{' '}
													Remove Lesson
												</button>
											</div>
										</div>
									)}
								</motion.div>
							))}
						</AnimatePresence>
					</div>
				</div>
			</div>
		</motion.div>
	);
};

export default CreateCourse;
