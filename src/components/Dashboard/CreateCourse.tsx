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

	const [importMode, setImportMode] = useState(false);
	const [jsonInput, setJsonInput] = useState('');

	// Auto-generate slug from title
	const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const val = e.target.value;
		setTitle(val);
		setSlug(
			val
				.toLowerCase()
				.replace(/[^a-z0-9]+/g, '-')
				.replace(/(^-|-$)+/g, ''),
		);
	};

	const handleJsonImport = () => {
		try {
			const data = JSON.parse(jsonInput);
			setTitle(data.title || '');
			setSlug(data.slug || '');
			setDescription(data.description || '');
			setProgressional(data.progressional || false);
			setTags((data.tags || []).join(', '));
			setOrder((data.order || []).join(', '));
			setDuration(data.duration || '');

			const sanitizedLessons = (data.lessons || []).map(
				(lesson: any) => ({
					...lesson,
					exercises: (lesson.exercises || []).map((ex: any) => ({
						...ex,
						options: Array.isArray(ex.options)
							? JSON.stringify(ex.options)
							: ex.options,
					})),
				}),
			);

			setLessons(sanitizedLessons);
			setImportMode(false);
			toast.success('Course data imported successfully!');
		} catch (e) {
			console.error(e);
			toast.error('Invalid JSON format');
		}
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
		value: any,
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
			className="space-y-6"
		>
			<div className="bg-card border border-border rounded-2xl shadow-lg ring-1 ring-black/5 overflow-hidden">
				<div className="p-6 border-b border-border bg-muted/20 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
					<div>
						<h2 className="text-xl font-bold flex items-center gap-2 bg-clip-text text-transparent bg-linear-to-r from-primary to-purple-600">
							<BookOpen className="w-6 h-6 text-primary" />
							Create New Course
						</h2>
						<p className="text-sm text-muted-foreground mt-1">
							Design a comprehensive learning experience.
						</p>
					</div>
					<div className="flex gap-2">
						<button
							onClick={() => setImportMode(!importMode)}
							className="bg-secondary hover:bg-secondary/80 text-secondary-foreground px-4 py-2 rounded-xl font-medium transition-colors text-sm border border-border"
						>
							{importMode ? 'Switch to Form' : 'Import JSON'}
						</button>
						{!importMode && (
							<button
								onClick={handleSubmit}
								disabled={loading}
								className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-5 py-2 rounded-xl font-bold transition-all disabled:opacity-50 shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30"
							>
								{loading ? (
									'Saving...'
								) : (
									<>
										<Save className="w-4 h-4" /> Save Course
									</>
								)}
							</button>
						)}
					</div>
				</div>

				{importMode ? (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						className="p-6 space-y-4"
					>
						<div className="bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 p-4 rounded-xl text-sm mb-4 flex gap-3 items-start">
							<FileText className="w-5 h-5 shrink-0 mt-0.5" />
							<div>
								<p className="font-semibold">
									JSON Import Mode
								</p>
								<p className="opacity-90">
									Paste a valid JSON object representing your
									course structure. This is useful for
									migrating data or bulk creation.
								</p>
							</div>
						</div>
						<textarea
							className="w-full h-96 p-4 border border-border rounded-xl font-mono text-xs md:text-sm bg-muted/20 resize-none focus:ring-2 focus:ring-primary outline-none transition-all"
							placeholder='{ "title": "My Course", "lessons": [...] }'
							value={jsonInput}
							onChange={(e) => setJsonInput(e.target.value)}
						/>
						<div className="flex justify-end gap-2">
							<button
								onClick={() => setImportMode(false)}
								className="px-4 py-2 rounded-xl text-muted-foreground hover:bg-muted transition-colors font-medium"
							>
								Cancel
							</button>
							<button
								onClick={handleJsonImport}
								className="bg-primary text-primary-foreground px-6 py-2 rounded-xl font-medium hover:bg-primary/90 transition-all shadow-md shadow-primary/20"
							>
								Parse & Import Data
							</button>
						</div>
					</motion.div>
				) : (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						className="p-6 md:p-8 space-y-10"
					>
						{/* Basic Info */}
						<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
							<div className="space-y-6">
								<h3 className="text-lg font-semibold border-b border-border pb-2 mb-4">
									Course Details
								</h3>
								<div className="space-y-3">
									<label className="text-sm font-semibold text-foreground/80">
										Course Title{' '}
										<span className="text-red-500">*</span>
									</label>
									<input
										type="text"
										required
										value={title}
										onChange={handleTitleChange}
										className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all shadow-sm"
										placeholder="e.g. Advanced Next.js Patterns"
									/>
								</div>
								<div className="space-y-3">
									<label className="text-sm font-semibold text-foreground/80">
										Slug (URL){' '}
										<span className="text-red-500">*</span>
									</label>
									<input
										type="text"
										required
										value={slug}
										onChange={(e) =>
											setSlug(e.target.value)
										}
										className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-mono text-sm text-muted-foreground"
										placeholder="advanced-nextjs-patterns"
									/>
								</div>
								<div className="space-y-3">
									<label className="text-sm font-semibold text-foreground/80">
										Tags
									</label>
									<input
										type="text"
										value={tags}
										onChange={(e) =>
											setTags(e.target.value)
										}
										className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
										placeholder="react, typescript, animation"
									/>
									<p className="text-xs text-muted-foreground">
										Comma separated values
									</p>
								</div>
							</div>

							<div className="space-y-6">
								<h3 className="text-lg font-semibold border-b border-border pb-2 mb-4">
									Configuration
								</h3>
								<div className="space-y-3">
									<label className="text-sm font-semibold text-foreground/80">
										Description{' '}
										<span className="text-red-500">*</span>
									</label>
									<textarea
										required
										value={description}
										onChange={(e) =>
											setDescription(e.target.value)
										}
										rows={7}
										className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-none shadow-sm"
										placeholder="A comprehensive guide to..."
									/>
								</div>

								<div className="grid grid-cols-2 gap-4">
									<div className="space-y-3">
										<label className="text-sm font-semibold text-foreground/80">
											Duration (min)
										</label>
										<input
											type="number"
											value={duration}
											onChange={(e) =>
												setDuration(e.target.value)
											}
											className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
											placeholder="120"
										/>
									</div>
									<div className="space-y-3">
										<label className="text-sm font-semibold text-foreground/80">
											Legacy Order
										</label>
										<input
											type="text"
											value={order}
											onChange={(e) =>
												setOrder(e.target.value)
											}
											className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
											placeholder="lesson-1, lesson-2"
										/>
									</div>
								</div>

								<div className="flex items-center justify-between p-4 bg-muted/30 rounded-xl border border-border">
									<div className="space-y-1">
										<label className="text-sm font-bold block">
											Progressional Course
										</label>
										<p className="text-xs text-muted-foreground">
											Enforce sequential lesson completion
										</p>
									</div>
									<button
										onClick={() =>
											setProgressional(!progressional)
										}
										className={`w-14 h-8 rounded-full px-1 transition-colors duration-300 flex items-center shadow-inner ${
											progressional
												? 'bg-primary'
												: 'bg-muted-foreground/30'
										}`}
									>
										<motion.div
											className="w-6 h-6 rounded-full bg-white shadow-md cursor-pointer"
											animate={{
												x: progressional ? 24 : 0,
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
						</div>

						<div className="border-t border-border pt-10">
							<div className="flex flex-col sm:flex-row justify-between items-end sm:items-center mb-6 gap-4">
								<div>
									<h3 className="text-xl font-bold">
										Course Curriculum
									</h3>
									<p className="text-sm text-muted-foreground mt-1">
										Build your course structure lesson by
										lesson
									</p>
								</div>
								<button
									type="button"
									onClick={addLesson}
									className="flex items-center gap-2 text-sm font-bold bg-secondary hover:bg-secondary/80 text-foreground px-4 py-2.5 rounded-xl transition-all border border-border shadow-sm hover:shadow-md"
								>
									<Plus className="w-4 h-4" /> Add New Lesson
								</button>
							</div>

							<div className="space-y-4">
								{lessons.length === 0 && (
									<div className="text-center py-16 border-2 border-dashed border-border rounded-2xl bg-muted/5">
										<div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
											<BookOpen className="w-8 h-8 text-muted-foreground opacity-50" />
										</div>
										<h4 className="text-lg font-medium text-foreground">
											No lessons yet
										</h4>
										<p className="text-muted-foreground max-w-sm mx-auto mt-2 mb-6">
											Start building your course by adding
											your first lesson.
										</p>
										<button
											type="button"
											onClick={addLesson}
											className="text-primary hover:text-primary/80 font-semibold text-sm"
										>
											+ Add Lesson
										</button>
									</div>
								)}
								<AnimatePresence>
									{lessons.map((lesson, index) => (
										<motion.div
											key={index}
											initial={{ opacity: 0, y: 20 }}
											animate={{ opacity: 1, y: 0 }}
											exit={{ opacity: 0, height: 0 }}
											className="border border-border rounded-xl overflow-hidden bg-card shadow-sm hover:shadow-md transition-shadow"
										>
											<div
												className={`p-4 flex justify-between items-center cursor-pointer transition-colors ${
													expandedLesson === index
														? 'bg-secondary/50 border-b border-border'
														: 'hover:bg-secondary/30'
												}`}
												onClick={() =>
													setExpandedLesson(
														expandedLesson === index
															? null
															: index,
													)
												}
											>
												<div className="flex items-center gap-4">
													<div className="bg-primary/10 text-primary w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold font-mono border border-primary/20">
														{index + 1}
													</div>
													<div>
														<h4 className="font-semibold text-base">
															{lesson.title ||
																'Untitled Lesson'}
														</h4>
														<p className="text-xs text-muted-foreground">
															{
																lesson.exercises
																	.length
															}{' '}
															Exercises
														</p>
													</div>
												</div>
												<div className="flex items-center gap-2">
													{expandedLesson ===
													index ? (
														<ChevronUp className="w-5 h-5 text-muted-foreground" />
													) : (
														<ChevronDown className="w-5 h-5 text-muted-foreground" />
													)}
												</div>
											</div>

											<AnimatePresence>
												{expandedLesson === index && (
													<motion.div
														initial={{ height: 0 }}
														animate={{
															height: 'auto',
														}}
														exit={{ height: 0 }}
														className="overflow-hidden"
													>
														<div className="p-6 space-y-8 bg-background/50">
															<div className="grid grid-cols-1 md:grid-cols-2 gap-5">
																<div className="space-y-2">
																	<label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
																		Lesson
																		Title
																	</label>
																	<input
																		type="text"
																		value={
																			lesson.title
																		}
																		onChange={(
																			e,
																		) =>
																			updateLesson(
																				index,
																				'title',
																				e
																					.target
																					.value,
																			)
																		}
																		className="w-full px-4 py-2.5 rounded-xl bg-background border border-border focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm font-medium"
																		placeholder="Introduction to..."
																	/>
																</div>
																<div className="space-y-2">
																	<label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
																		Slug
																	</label>
																	<input
																		type="text"
																		value={
																			lesson.slug
																		}
																		onChange={(
																			e,
																		) =>
																			updateLesson(
																				index,
																				'slug',
																				e
																					.target
																					.value,
																			)
																		}
																		className="w-full px-4 py-2.5 rounded-xl bg-background border border-border focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm font-mono text-muted-foreground"
																		placeholder="intro-to-topic"
																	/>
																</div>
																<div className="space-y-2 md:col-span-2">
																	<label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
																		Short
																		Description
																	</label>
																	<input
																		type="text"
																		value={
																			lesson.description
																		}
																		onChange={(
																			e,
																		) =>
																			updateLesson(
																				index,
																				'description',
																				e
																					.target
																					.value,
																			)
																		}
																		className="w-full px-4 py-2.5 rounded-xl bg-background border border-border focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm"
																		placeholder="What will the student learn?"
																	/>
																</div>
																<div className="space-y-2 md:col-span-2">
																	<label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
																		Lesson
																		Content
																		(Markdown)
																	</label>
																	<textarea
																		value={
																			lesson.content ||
																			''
																		}
																		onChange={(
																			e,
																		) =>
																			updateLesson(
																				index,
																				'content',
																				e
																					.target
																					.value,
																			)
																		}
																		rows={8}
																		className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm font-mono leading-relaxed"
																		placeholder="# Introduction\n\nWelcome to this lesson..."
																	/>
																</div>
															</div>

															{/* Exercises */}
															<div className="bg-muted/30 border border-border rounded-xl overflow-hidden">
																<div className="px-6 py-4 border-b border-border bg-muted/50 flex justify-between items-center">
																	<h4 className="text-sm font-bold flex items-center gap-2 uppercase tracking-wider text-muted-foreground">
																		<HelpCircle className="w-4 h-4" />{' '}
																		Exercises
																	</h4>
																	<button
																		type="button"
																		onClick={(
																			e,
																		) => {
																			e.stopPropagation();
																			addExercise(
																				index,
																			);
																		}}
																		className="text-xs font-bold text-primary bg-primary/10 px-3 py-1.5 rounded-lg hover:bg-primary/20 transition-colors"
																	>
																		+ Add
																		Exercise
																	</button>
																</div>

																<div className="p-4 space-y-4">
																	{lesson.exercises.map(
																		(
																			ex,
																			exIndex,
																		) => (
																			<div
																				key={
																					exIndex
																				}
																				className="p-5 bg-card border border-border rounded-xl relative group hover:border-primary/30 transition-colors shadow-sm"
																			>
																				<button
																					onClick={() =>
																						removeExercise(
																							index,
																							exIndex,
																						)
																					}
																					className="absolute top-4 right-4 text-muted-foreground hover:text-red-500 opacity-50 hover:opacity-100 transition-opacity p-1 bg-background rounded border border-border"
																					title="Remove Exercise"
																				>
																					<Trash className="w-4 h-4" />
																				</button>

																				<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
																					<div className="md:col-span-2 space-y-2">
																						<label className="text-xs font-medium text-muted-foreground">
																							Question
																						</label>
																						<input
																							type="text"
																							value={
																								ex.question
																							}
																							onChange={(
																								e,
																							) =>
																								updateExercise(
																									index,
																									exIndex,
																									'question',
																									e
																										.target
																										.value,
																								)
																							}
																							className="w-full px-3 py-2 rounded-lg bg-background border border-border focus:ring-1 focus:ring-primary outline-none text-sm font-medium"
																							placeholder="What is...?"
																						/>
																					</div>

																					<div className="space-y-2">
																						<label className="text-xs font-medium text-muted-foreground">
																							Answer
																							Type
																						</label>
																						<div className="relative">
																							<select
																								value={
																									ex.type
																								}
																								onChange={(
																									e,
																								) =>
																									updateExercise(
																										index,
																										exIndex,
																										'type',
																										e
																											.target
																											.value,
																									)
																								}
																								className="w-full px-3 py-2 rounded-lg bg-background border border-border focus:ring-1 focus:ring-primary outline-none text-sm appearance-none"
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
																							<ChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground" />
																						</div>
																					</div>

																					{(ex.type ===
																						'single-select' ||
																						ex.type ===
																							'multi-select') && (
																						<div className="space-y-2">
																							<label className="text-xs font-medium text-muted-foreground">
																								Options
																								(JSON
																								Array)
																							</label>
																							<input
																								type="text"
																								value={
																									ex.options ||
																									''
																								}
																								onChange={(
																									e,
																								) =>
																									updateExercise(
																										index,
																										exIndex,
																										'options',
																										e
																											.target
																											.value,
																									)
																								}
																								className="w-full px-3 py-2 rounded-lg bg-background border border-border focus:ring-1 focus:ring-primary outline-none text-sm font-mono text-muted-foreground"
																								placeholder='["A", "B"]'
																							/>
																						</div>
																					)}
																				</div>

																				<div className="p-3 bg-secondary/20 rounded-lg border border-border/50 grid grid-cols-1 md:grid-cols-2 gap-4">
																					<div className="space-y-1">
																						<label className="text-[10px] font-bold text-muted-foreground uppercase">
																							Correct
																							Answer
																						</label>
																						<input
																							type="text"
																							value={
																								ex.correctAnswer
																							}
																							onChange={(
																								e,
																							) =>
																								updateExercise(
																									index,
																									exIndex,
																									'correctAnswer',
																									e
																										.target
																										.value,
																								)
																							}
																							className="w-full bg-transparent border-b border-border focus:border-green-500 outline-none text-sm text-green-600 dark:text-green-400 font-medium py-1"
																							placeholder="The answer..."
																						/>
																					</div>
																					<div className="space-y-1">
																						<label className="text-[10px] font-bold text-muted-foreground uppercase">
																							Hint
																						</label>
																						<input
																							type="text"
																							value={
																								ex.hint ||
																								''
																							}
																							onChange={(
																								e,
																							) =>
																								updateExercise(
																									index,
																									exIndex,
																									'hint',
																									e
																										.target
																										.value,
																								)
																							}
																							className="w-full bg-transparent border-b border-border focus:border-yellow-500 outline-none text-sm italic py-1"
																							placeholder="Give a clue..."
																						/>
																					</div>
																				</div>
																			</div>
																		),
																	)}
																	{lesson
																		.exercises
																		.length ===
																		0 && (
																		<div className="text-center py-6 text-sm text-muted-foreground">
																			No
																			exercises
																			yet.
																			Add
																			one
																			to
																			test
																			knowledge!
																		</div>
																	)}
																</div>
															</div>

															<div className="flex justify-end pt-4 border-t border-border">
																<button
																	type="button"
																	onClick={() =>
																		removeLesson(
																			index,
																		)
																	}
																	className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors"
																>
																	<Trash className="w-4 h-4" />{' '}
																	Delete
																	Lesson
																</button>
															</div>
														</div>
													</motion.div>
												)}
											</AnimatePresence>
										</motion.div>
									))}
								</AnimatePresence>
							</div>
						</div>
					</motion.div>
				)}
			</div>
		</motion.div>
	);
};

export default CreateCourse;
