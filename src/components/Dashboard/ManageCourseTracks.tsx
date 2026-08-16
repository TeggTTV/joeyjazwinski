import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import {
	Plus,
	Trash,
	Save,
	List,
	FileJson,
	ArrowUp,
	ArrowDown,
	GripVertical,
} from 'lucide-react';
import ConfirmationModal from '@/components/ConfirmationModal';
import { motion, AnimatePresence } from 'framer-motion';

interface Course {
	id: string;
	title: string;
	slug: string;
}

const ManageCourseTracks = () => {
	const [tracks, setTracks] = useState<any[]>([]);
	const [allCourses, setAllCourses] = useState<Course[]>([]);
	const [loading, setLoading] = useState(true);

	// Form State
	const [isEditing, setIsEditing] = useState(false);
	const [editId, setEditId] = useState<string | null>(null);
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [slug, setSlug] = useState('');
	const [selectedCourses, setSelectedCourses] = useState<string[]>([]); // Array of slugs
	const [deleteData, setDeleteData] = useState<{
		id: string;
		x: number;
		y: number;
	} | null>(null);

	const [importConfirmData, setImportConfirmData] = useState<{
		isOpen: boolean;
		data: any;
		count: number;
		x?: number;
		y?: number;
	}>({ isOpen: false, data: null, count: 0 });

	const [lintErrors, setLintErrors] = useState<string[]>([]);
	const [importMode, setImportMode] = useState(false);
	const [jsonInput, setJsonInput] = useState('');

	useEffect(() => {
		fetchData();
	}, []);

	const fetchData = async () => {
		setLoading(true);
		try {
			const [tracksRes, coursesRes] = await Promise.all([
				fetch('/api/getCourseTracks'),
				fetch('/api/getCourses'),
			]);

			if (tracksRes.ok) {
				const data = await tracksRes.json();
				setTracks(data);
			}
			if (coursesRes.ok) {
				const data = await coursesRes.json();
				setAllCourses(Array.isArray(data.data) ? data.data : []);
			}
		} catch (error) {
			console.error(error);
			toast.error('Failed to load data');
		} finally {
			setLoading(false);
		}
	};

	const toggleImportMode = () => {
		if (!importMode) {
			const currentData = {
				title,
				slug,
				description,
				courseSlugs: selectedCourses,
			};
			setJsonInput(JSON.stringify(currentData, null, 2));
		}
		setImportMode(!importMode);
		setLintErrors([]);
	};

	const validateTrackData = (data: any): string[] => {
		const errors: string[] = [];
		if (!data.title) errors.push('Track: Missing "title"');
		if (!data.slug) errors.push('Track: Missing "slug"');
		if (!data.description) errors.push('Track: Missing "description"');

		if (data.courses && Array.isArray(data.courses)) {
			data.courses.forEach((course: any, cIndex: number) => {
				const cName = course.title || `Course #${cIndex + 1}`;
				if (!course.title)
					errors.push(`Course #${cIndex + 1}: Missing "title"`);
				if (!course.slug) errors.push(`${cName}: Missing "slug"`);
				if (!course.description)
					errors.push(`${cName}: Missing "description"`);

				if (course.lessons && Array.isArray(course.lessons)) {
					course.lessons.forEach((lesson: any, lIndex: number) => {
						const lName = lesson.title || `Lesson #${lIndex + 1}`;
						if (!lesson.title)
							errors.push(`${cName} > ${lName}: Missing "title"`);
						if (!lesson.slug)
							errors.push(`${cName} > ${lName}: Missing "slug"`);
					});
				} else if (course.lessons) {
					errors.push(`${cName}: "lessons" should be an array.`);
				}
			});
		}
		return errors;
	};

	const handleVerifyJson = () => {
		try {
			const data = JSON.parse(jsonInput);
			const errors = validateTrackData(data);
			setLintErrors(errors);
			if (errors.length === 0) {
				toast.success('JSON is valid!');
			} else {
				toast.error(`Found ${errors.length} issues.`);
			}
		} catch (e) {
			setLintErrors(['Invalid JSON syntax']);
			toast.error('Invalid JSON syntax');
		}
	};

	const handleJsonImport = async (e?: React.MouseEvent) => {
		setLintErrors([]);
		try {
			const data = JSON.parse(jsonInput);
			const validationErrors = validateTrackData(data);
			if (validationErrors.length > 0) {
				setLintErrors(validationErrors);
				toast.error('Please fix validation errors first.');
				return;
			}

			if (
				data.courses &&
				Array.isArray(data.courses) &&
				data.courses.length > 0
			) {
				setImportConfirmData({
					isOpen: true,
					data: data,
					count: data.courses.length,
					x: e?.pageX,
					y: e?.pageY,
				});
				return;
			}

			setTitle(data.title || '');
			setSlug(data.slug || '');
			setDescription(data.description || '');
			setSelectedCourses(data.courseSlugs || []);
			setImportMode(false);
			toast.success('Track data imported successfully!');
		} catch (e) {
			toast.error('Invalid JSON format');
		}
	};

	const finalizeBulkImport = async () => {
		const data = importConfirmData.data;
		if (!data) return;

		const loadingToast = toast.loading('Creating Track and Courses...');
		try {
			const res = await fetch('/api/createFullTrack', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(data),
			});

			if (res.ok) {
				toast.update(loadingToast, {
					render: 'Full Track created successfully!',
					type: 'success',
					isLoading: false,
					autoClose: 3000,
				});
				setImportMode(false);
				resetForm();
				fetchData();
			} else {
				const err = await res.json();
				toast.update(loadingToast, {
					render: `Error: ${err.message}`,
					type: 'error',
					isLoading: false,
					autoClose: 5000,
				});
			}
		} catch (apiError) {
			toast.update(loadingToast, {
				render: 'Network or Server Error',
				type: 'error',
				isLoading: false,
				autoClose: 3000,
			});
		} finally {
			setImportConfirmData({ isOpen: false, data: null, count: 0 });
		}
	};

	const copyToAI = () => {
		const availableCoursesList = allCourses
			.map((c) => `- ${c.title} (Slug: "${c.slug}")`)
			.join('\n');

		const fullSchemaPrompt = `
OPTION 2: CREATE FULL TRACK & COURSES
To generate a JSON that creates the Track AND new Courses...`;

		const prompt = `You can generate a Course Track JSON in two ways:
OPTION 1: LINK EXISTING COURSES...
Available Course Slugs to use:
${availableCoursesList}

${fullSchemaPrompt}
`;

		navigator.clipboard.writeText(prompt);
		toast.success('AI Prompt with Schema & Context copied to clipboard!');
	};

	const handleSave = async () => {
		if (!title || !slug || selectedCourses.length === 0) {
			toast.error(
				'Please fill in all fields and select at least one course.',
			);
			return;
		}

		try {
			const endpoint = editId
				? '/api/updateCourseTrack'
				: '/api/createCourseTrack';
			const body: any = {
				title,
				description,
				slug,
				courseSlugs: selectedCourses,
			};

			if (editId) body.id = editId;

			const res = await fetch(endpoint, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(body),
			});

			if (res.ok) {
				toast.success(editId ? 'Track updated!' : 'Track created!');
				setIsEditing(false);
				resetForm();
				fetchData();
			} else {
				toast.error('Failed to save track');
			}
		} catch (error) {
			console.error(error);
			toast.error('Error saving track');
		}
	};

	const handleDelete = (id: string, e: React.MouseEvent) => {
		setDeleteData({ id, x: e.pageX, y: e.pageY });
	};

	const confirmDelete = async () => {
		if (!deleteData) return;
		const { id } = deleteData;
		try {
			const res = await fetch('/api/deleteCourseTrack', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ id }),
			});

			if (res.ok) {
				toast.success('Track deleted');
				fetchData();
			} else {
				toast.error('Failed to delete track');
			}
		} catch (e) {
			console.error(e);
			toast.error('Error deleting track');
		} finally {
			setDeleteData(null);
		}
	};

	const handleEdit = (track: any) => {
		setTitle(track.title);
		setDescription(track.description || '');
		setSlug(track.slug);
		setSelectedCourses(track.courseSlugs || []);
		setEditId(track.id);
		setIsEditing(true);
	};

	const resetForm = () => {
		setTitle('');
		setDescription('');
		setSlug('');
		setSelectedCourses([]);
		setEditId(null);
		setImportMode(false);
	};

	const toggleCourseSelection = (courseSlug: string) => {
		if (selectedCourses.includes(courseSlug)) {
			setSelectedCourses(selectedCourses.filter((s) => s !== courseSlug));
		} else {
			setSelectedCourses([...selectedCourses, courseSlug]);
		}
	};

	// Helper to move item in array
	const moveCourse = (index: number, direction: 'up' | 'down') => {
		const newSelected = [...selectedCourses];
		if (direction === 'up' && index > 0) {
			[newSelected[index], newSelected[index - 1]] = [
				newSelected[index - 1],
				newSelected[index],
			];
		} else if (direction === 'down' && index < newSelected.length - 1) {
			[newSelected[index], newSelected[index + 1]] = [
				newSelected[index + 1],
				newSelected[index],
			];
		}
		setSelectedCourses(newSelected);
	};

	if (loading)
		return (
			<div className="flex justify-center py-12">
				<div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
			</div>
		);

	return (
		<div className="space-y-8">
			<div className="flex justify-between items-center bg-card p-6 border border-border rounded-2xl shadow-sm">
				<div>
					<h2 className="text-2xl font-bold">Course Tracks</h2>
					<p className="text-muted-foreground text-sm mt-1">
						Organize courses into learning paths
					</p>
				</div>
				<button
					onClick={() => {
						resetForm();
						setIsEditing(!isEditing);
					}}
					className="flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-all font-medium shadow-md shadow-primary/20"
				>
					{isEditing ? (
						'Cancel Editing'
					) : (
						<>
							<Plus className="w-4 h-4" /> New Track
						</>
					)}
				</button>
			</div>

			<AnimatePresence>
				{isEditing && (
					<motion.div
						initial={{ opacity: 0, height: 0 }}
						animate={{ opacity: 1, height: 'auto' }}
						exit={{ opacity: 0, height: 0 }}
						className="overflow-hidden"
					>
						<div className="bg-card border border-border p-6 md:p-8 rounded-2xl space-y-6 shadow-lg ring-1 ring-black/5">
							<div className="flex justify-between items-center border-b border-border pb-4 mb-2">
								<h3 className="font-bold text-lg flex items-center gap-2">
									{editId ? 'Edit Track' : 'Create New Track'}
								</h3>
								<button
									onClick={toggleImportMode}
									className="text-xs font-semibold bg-secondary hover:bg-secondary/80 px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
								>
									{importMode ? (
										'Switch to Form'
									) : (
										<>
											<FileJson className="w-4 h-4" />{' '}
											Edit as JSON
										</>
									)}
								</button>
							</div>

							{importMode ? (
								<div className="space-y-4">
									<div className="flex justify-between items-start bg-blue-500/10 text-blue-600 dark:text-blue-400 p-4 rounded-xl text-sm border border-blue-500/20">
										<div>
											<p className="font-semibold">
												JSON Import
											</p>
											Edit track data as JSON. Changes
											here will populate the form.
										</div>
										<button
											onClick={copyToAI}
											className="text-xs bg-background/80 hover:bg-background px-3 py-1.5 rounded-lg border border-border flex items-center gap-1 transition-colors shadow-sm"
										>
											<List className="w-3 h-3" /> Copy
											Context for AI
										</button>
									</div>
									<textarea
										className="w-full h-96 p-4 border border-border rounded-xl font-mono text-sm bg-muted/20 resize-none focus:ring-2 focus:ring-primary outline-none transition-all"
										value={jsonInput}
										onChange={(e) =>
											setJsonInput(e.target.value)
										}
										placeholder='{ "title": "My Track", ... }'
									/>

									{lintErrors.length > 0 && (
										<div className="bg-red-500/10 border border-red-500/20 p-4 rounded-xl">
											<h4 className="text-red-500 font-bold mb-2 flex items-center gap-2 text-sm">
												<Trash className="w-4 h-4" />{' '}
												Validation Issues found:
											</h4>
											<ul className="list-disc list-inside text-xs text-red-500 space-y-1 max-h-40 overflow-y-auto">
												{lintErrors.map((err, i) => (
													<li key={i}>{err}</li>
												))}
											</ul>
										</div>
									)}

									<div className="flex justify-end gap-3">
										<button
											onClick={handleVerifyJson}
											className="bg-secondary text-secondary-foreground px-5 py-2 rounded-xl font-medium hover:bg-secondary/90 transition-colors"
										>
											Verify JSON
										</button>
										<button
											onClick={(e) => handleJsonImport(e)}
											className="bg-primary text-primary-foreground px-5 py-2 rounded-xl font-medium hover:bg-primary/90 transition-colors shadow-sm"
										>
											Apply JSON
										</button>
									</div>
								</div>
							) : (
								<motion.div
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									className="space-y-6"
								>
									<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
										<div className="space-y-2">
											<label className="text-sm font-semibold">
												Track Title
											</label>
											<input
												type="text"
												placeholder="e.g. Full Stack Development"
												value={title}
												onChange={(e) =>
													setTitle(e.target.value)
												}
												className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
											/>
										</div>
										<div className="space-y-2">
											<label className="text-sm font-semibold">
												Slug
											</label>
											<input
												type="text"
												placeholder="e.g. full-stack-path"
												value={slug}
												onChange={(e) =>
													setSlug(e.target.value)
												}
												className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-mono text-sm"
											/>
										</div>
									</div>

									<div className="space-y-2">
										<label className="text-sm font-semibold">
											Description
										</label>
										<textarea
											placeholder="Describe the learning path..."
											value={description}
											onChange={(e) =>
												setDescription(e.target.value)
											}
											className="w-full px-4 py-3 bg-background border border-border rounded-xl h-32 resize-none focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
										/>
									</div>

									<div className="space-y-3">
										<label className="block text-sm font-semibold">
											Select & Order Courses
										</label>
										<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
											{/* Selection Pool */}
											<div className="border border-border rounded-xl overflow-hidden bg-muted/10">
												<div className="px-4 py-3 border-b border-border bg-muted/40 text-xs font-bold text-muted-foreground uppercase tracking-wider">
													Available Courses
												</div>
												<div className="p-2 max-h-60 overflow-y-auto space-y-1">
													{allCourses
														.filter(
															(c) =>
																!selectedCourses.includes(
																	c.slug,
																),
														)
														.map((course) => (
															<button
																key={course.id}
																onClick={() =>
																	toggleCourseSelection(
																		course.slug,
																	)
																}
																className="w-full p-2.5 hover:bg-background cursor-pointer rounded-lg flex items-center justify-between text-left group transition-colors border border-transparent hover:border-border hover:shadow-sm"
															>
																<span className="text-sm truncate font-medium text-foreground/80 group-hover:text-primary">
																	{
																		course.title
																	}
																</span>
																<Plus className="w-4 h-4 text-muted-foreground/50 group-hover:text-primary" />
															</button>
														))}
													{allCourses.filter(
														(c) =>
															!selectedCourses.includes(
																c.slug,
															),
													).length === 0 && (
														<p className="text-center text-xs text-muted-foreground py-4">
															All courses selected
														</p>
													)}
												</div>
											</div>

											{/* Selected Order */}
											<div className="border border-border rounded-xl overflow-hidden bg-background">
												<div className="px-4 py-3 border-b border-border bg-primary/5 text-xs font-bold text-primary uppercase tracking-wider">
													Selected Sequence
												</div>
												<div className="p-2 max-h-60 overflow-y-auto space-y-2">
													{selectedCourses.map(
														(slug, index) => {
															const course =
																allCourses.find(
																	(c) =>
																		c.slug ===
																		slug,
																);
															return (
																<div
																	key={slug}
																	className="flex items-center gap-3 p-2.5 rounded-lg border border-border bg-card shadow-sm group hover:border-primary/30 transition-colors"
																>
																	<div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-[10px] font-bold text-primary font-mono">
																		{index +
																			1}
																	</div>
																	<span className="text-sm flex-1 truncate font-medium">
																		{course?.title ||
																			slug}
																	</span>
																	<div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
																		<button
																			onClick={() =>
																				moveCourse(
																					index,
																					'up',
																				)
																			}
																			disabled={
																				index ===
																				0
																			}
																			className="p-1 hover:bg-secondary rounded disabled:opacity-30 text-muted-foreground hover:text-foreground"
																		>
																			<ArrowUp className="w-3 h-3" />
																		</button>
																		<button
																			onClick={() =>
																				moveCourse(
																					index,
																					'down',
																				)
																			}
																			disabled={
																				index ===
																				selectedCourses.length -
																					1
																			}
																			className="p-1 hover:bg-secondary rounded disabled:opacity-30 text-muted-foreground hover:text-foreground"
																		>
																			<ArrowDown className="w-3 h-3" />
																		</button>
																		<button
																			onClick={() =>
																				toggleCourseSelection(
																					slug,
																				)
																			}
																			className="p-1 hover:bg-red-500/10 text-muted-foreground hover:text-red-500 rounded ml-1"
																		>
																			<Trash className="w-3 h-3" />
																		</button>
																	</div>
																</div>
															);
														},
													)}
													{selectedCourses.length ===
														0 && (
														<div className="flex flex-col items-center justify-center py-8 text-muted-foreground border-2 border-dashed border-border/50 rounded-lg bg-muted/10">
															<GripVertical className="w-8 h-8 opacity-20 mb-2" />
															<p className="text-xs italic">
																Select courses
																from the left
															</p>
														</div>
													)}
												</div>
											</div>
										</div>
									</div>

									<div className="flex justify-end gap-3 pt-4 border-t border-border">
										<button
											onClick={() => {
												setIsEditing(false);
												resetForm();
											}}
											className="px-5 py-2.5 text-sm font-medium text-muted-foreground hover:bg-muted rounded-xl transition-colors"
										>
											Cancel
										</button>
										<button
											onClick={handleSave}
											className="px-6 py-2.5 text-sm font-bold bg-primary text-primary-foreground rounded-xl flex items-center gap-2 hover:bg-primary/90 transition-all shadow-md shadow-primary/20"
										>
											<Save className="w-4 h-4" />{' '}
											{editId
												? 'Update Track'
												: 'Save Track'}
										</button>
									</div>
								</motion.div>
							)}
						</div>
					</motion.div>
				)}
			</AnimatePresence>

			<div className="grid grid-cols-1 gap-4">
				<AnimatePresence>
					{tracks.map((track) => (
						<motion.div
							layout
							initial={{ opacity: 0, scale: 0.98 }}
							animate={{ opacity: 1, scale: 1 }}
							exit={{ opacity: 0, scale: 0.98 }}
							key={track.id}
							className="bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-md transition-all group relative overflow-hidden"
						>
							<div className="absolute top-0 right-0 p-4 transform translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 flex gap-2">
								<button
									onClick={() => handleEdit(track)}
									className="p-2 bg-secondary/80 hover:bg-secondary text-foreground rounded-lg backdrop-blur-sm transition-colors"
									title="Edit Track"
								>
									<GripVertical className="w-4 h-4" />
								</button>
								<button
									onClick={(e) => handleDelete(track.id, e)}
									className="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-lg backdrop-blur-sm transition-colors"
									title="Delete Track"
								>
									<Trash className="w-4 h-4" />
								</button>
							</div>

							<div className="flex gap-5 items-start">
								<div className="w-12 h-12 rounded-xl bg-linear-to-br from-primary/20 to-purple-500/20 flex items-center justify-center shrink-0 border border-primary/10">
									<List className="w-6 h-6 text-primary" />
								</div>
								<div className="flex-1 min-w-0 py-1">
									<div className="flex items-center gap-3 mb-1">
										<h3 className="font-bold text-lg truncate group-hover:text-primary transition-colors">
											{track.title}
										</h3>
										<span className="text-[10px] font-bold uppercase tracking-wider bg-secondary px-2 py-0.5 rounded-full text-muted-foreground">
											{track.courseSlugs.length} Courses
										</span>
									</div>
									<p className="text-sm text-muted-foreground mb-3 line-clamp-2 max-w-2xl">
										{track.description}
									</p>
									<div className="flex items-center gap-2">
										<code className="text-[10px] text-muted-foreground/70 bg-muted/50 px-1.5 py-0.5 rounded border border-border">
											/{track.slug}
										</code>
									</div>
								</div>
							</div>
						</motion.div>
					))}
				</AnimatePresence>

				{tracks.length === 0 && !loading && (
					<div className="text-center py-20 border-2 border-dashed border-border rounded-3xl bg-muted/5">
						<div className="w-16 h-16 bg-muted/20 rounded-full flex items-center justify-center mx-auto mb-4">
							<List className="w-8 h-8 text-muted-foreground opacity-30" />
						</div>
						<h3 className="text-lg font-medium text-foreground">
							No tracks found
						</h3>
						<p className="text-muted-foreground max-w-sm mx-auto mt-2 mb-6">
							Create your first course track to organize your
							curriculum.
						</p>
						<button
							onClick={() => {
								resetForm();
								setIsEditing(true);
							}}
							className="text-primary hover:text-primary/80 font-bold text-sm"
						>
							Create New Track
						</button>
					</div>
				)}
			</div>

			<ConfirmationModal
				isOpen={!!deleteData}
				onClose={() => setDeleteData(null)}
				onConfirm={confirmDelete}
				title="Delete Track"
				message="Are you sure you want to delete this course track? This action cannot be undone."
				confirmText="Delete Track"
				isDangerous={true}
				triggerPosition={
					deleteData
						? { x: deleteData.x, y: deleteData.y }
						: undefined
				}
			/>

			<ConfirmationModal
				isOpen={importConfirmData.isOpen}
				onClose={() =>
					setImportConfirmData({
						...importConfirmData,
						isOpen: false,
					})
				}
				onConfirm={finalizeBulkImport}
				title="Import Full Track?"
				message={`This JSON contains ${importConfirmData.count} NEW courses. This will create the track and all specified courses immediately.`}
				confirmText="Create Everything"
				isDangerous={false}
				triggerPosition={
					importConfirmData.x && importConfirmData.y
						? { x: importConfirmData.x, y: importConfirmData.y }
						: undefined
				}
			/>
		</div>
	);
};

export default ManageCourseTracks;
