import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { FiPlus, FiTrash, FiSave, FiList } from 'react-icons/fi';
import ConfirmationModal from '@/components/ConfirmationModal';

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
				// Ensure data.data is used if the API returns { data: [...] } structure
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

			// CHECK: Is this a "Full Track" import with nested courses array?
			if (
				data.courses &&
				Array.isArray(data.courses) &&
				data.courses.length > 0
			) {
				// Perform Full Import -> Trigger Confirmation Modal
				setImportConfirmData({
					isOpen: true,
					data: data,
					count: data.courses.length,
					x: e?.pageX,
					y: e?.pageY,
				});
				return;
			}

			// Fallback: Standard Import (just populating the form)
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
To generate a JSON that creates the Track AND new Courses (with lessons) from scratch, use this structure:
{
  "title": "Track Title",
  "slug": "track-slug",
  "description": "...",
  "courses": [
    {
      "title": "Course Title",
      "slug": "course-slug",
      "description": "...",
      "tags": ["tag1"],
      "lessons": [
        {
          "title": "Lesson 1",
          "slug": "lesson-1-slug",
          "content": "# Markdown Content",
          "exercises": []
        }
      ]
    }
  ]
}`;

		const prompt = `You can generate a Course Track JSON in two ways:

OPTION 1: LINK EXISTING COURSES
Use this structure if you want to link known existing courses:
{
  "title": "Track Title",
  "slug": "track-slug",
  "description": "...",
  "courseSlugs": ["existing-course-slug-1"]
}
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
				'Please fill in all fields and select at least one course.'
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

	if (loading) return <div>Loading tracks...</div>;

	return (
		<div className="space-y-8">
			<div className="flex justify-between items-center">
				<h2 className="text-xl font-bold">Course Tracks</h2>
				<button
					onClick={() => {
						resetForm();
						setIsEditing(!isEditing);
					}}
					className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
				>
					<FiPlus /> New Track
				</button>
			</div>

			{isEditing && (
				<div className="bg-card border border-border p-6 rounded-xl space-y-4">
					<div className="flex justify-between items-center">
						<h3 className="font-bold">
							{editId ? 'Edit Track' : 'Create New Track'}
						</h3>
						<button
							onClick={toggleImportMode}
							className="text-sm bg-secondary hover:bg-secondary/80 px-3 py-1 rounded transition-colors"
						>
							{importMode ? 'Switch to Form' : 'Edit as JSON'}
						</button>
					</div>

					{importMode ? (
						<div className="space-y-4">
							<div className="flex justify-between items-start bg-blue-50 text-blue-700 p-3 rounded text-sm">
								<div>
									Edit track data as JSON. Changes here will
									populate the form.
								</div>
								<button
									onClick={copyToAI}
									className="text-xs bg-blue-100 hover:bg-blue-200 text-blue-800 px-2 py-1 rounded font-medium flex items-center gap-1 transition-colors"
								>
									<FiList size={14} /> Copy Context for AI
								</button>
							</div>
							<textarea
								className="w-full h-96 p-4 border border-border rounded-xl font-mono text-sm bg-muted/10 resize-none focus:ring-2 focus:ring-primary outline-none"
								value={jsonInput}
								onChange={(e) => setJsonInput(e.target.value)}
							/>

							{lintErrors.length > 0 && (
								<div className="bg-red-50 border border-red-200 p-4 rounded-lg">
									<h4 className="text-red-800 font-bold mb-2 flex items-center gap-2 text-sm">
										<FiTrash size={14} /> Validation Issues
										found:
									</h4>
									<ul className="list-disc list-inside text-xs text-red-700 space-y-1 max-h-40 overflow-y-auto">
										{lintErrors.map((err, i) => (
											<li key={i}>{err}</li>
										))}
									</ul>
								</div>
							)}

							<div className="flex justify-end gap-2">
								<button
									onClick={handleVerifyJson}
									className="bg-secondary text-secondary-foreground px-4 py-2 rounded-lg font-medium hover:bg-secondary/90 transition-colors"
								>
									Verify JSON
								</button>
								<button
									onClick={(e) => handleJsonImport(e)}
									className="bg-primary text-primary-foreground px-4 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors"
								>
									Apply JSON
								</button>
							</div>
						</div>
					) : (
						<>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<input
									type="text"
									placeholder="Track Title"
									value={title}
									onChange={(e) => setTitle(e.target.value)}
									className="p-2 bg-background border border-border rounded-md"
								/>
								<input
									type="text"
									placeholder="Slug (e.g. full-stack-path)"
									value={slug}
									onChange={(e) => setSlug(e.target.value)}
									className="p-2 bg-background border border-border rounded-md"
								/>
							</div>
							<textarea
								placeholder="Description"
								value={description}
								onChange={(e) => setDescription(e.target.value)}
								className="w-full p-2 bg-background border border-border rounded-md h-24"
							/>

							<div>
								<label className="block text-sm font-medium mb-2">
									Select & Order Courses
								</label>
								<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
									{/* Selection Pool */}
									<div className="border border-border rounded-md p-4 max-h-60 overflow-y-auto">
										<p className="text-xs text-muted-foreground mb-2">
											Available Courses
										</p>
										{allCourses
											.filter(
												(c) =>
													!selectedCourses.includes(
														c.slug
													)
											)
											.map((course) => (
												<div
													key={course.id}
													onClick={() =>
														toggleCourseSelection(
															course.slug
														)
													}
													className="p-2 hover:bg-muted cursor-pointer rounded flex items-center justify-between"
												>
													<span className="text-sm truncate">
														{course.title}
													</span>
													<FiPlus
														size={14}
														className="text-muted-foreground"
													/>
												</div>
											))}
									</div>

									{/* Selected Order */}
									<div className="border border-border rounded-md p-4 max-h-60 overflow-y-auto bg-secondary/20">
										<p className="text-xs text-muted-foreground mb-2">
											Selected Sequence (Top First)
										</p>
										{selectedCourses.map((slug, index) => {
											const course = allCourses.find(
												(c) => c.slug === slug
											);
											return (
												<div
													key={slug}
													className="flex items-center gap-2 mb-2 bg-card p-2 rounded border border-border shadow-sm"
												>
													<span className="text-xs font-mono text-muted-foreground w-4">
														{index + 1}.
													</span>
													<span className="text-sm flex-1 truncate">
														{course?.title || slug}
													</span>
													<div className="flex gap-1">
														<button
															onClick={() =>
																moveCourse(
																	index,
																	'up'
																)
															}
															disabled={
																index === 0
															}
															className="p-1 hover:bg-muted rounded disabled:opacity-30"
														>
															↑
														</button>
														<button
															onClick={() =>
																moveCourse(
																	index,
																	'down'
																)
															}
															disabled={
																index ===
																selectedCourses.length -
																	1
															}
															className="p-1 hover:bg-muted rounded disabled:opacity-30"
														>
															↓
														</button>
														<button
															onClick={() =>
																toggleCourseSelection(
																	slug
																)
															}
															className="p-1 hover:bg-red-500/10 text-red-500 rounded"
														>
															<FiTrash
																size={14}
															/>
														</button>
													</div>
												</div>
											);
										})}
										{selectedCourses.length === 0 && (
											<p className="text-sm text-muted-foreground italic">
												No courses selected.
											</p>
										)}
									</div>
								</div>
							</div>

							<div className="flex justify-end gap-2">
								<button
									onClick={() => {
										setIsEditing(false);
										resetForm();
									}}
									className="px-4 py-2 text-sm text-muted-foreground hover:bg-muted rounded-md"
								>
									Cancel
								</button>
								<button
									onClick={handleSave}
									className="px-4 py-2 text-sm bg-primary text-primary-foreground rounded-md flex items-center gap-2"
								>
									<FiSave />{' '}
									{editId ? 'Update Track' : 'Save Track'}
								</button>
							</div>
						</>
					)}
				</div>
			)}

			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				{tracks.map((track) => (
					<div
						key={track.id}
						className="bg-card border border-border rounded-xl p-5 shadow-sm relative group"
					>
						<div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
							<button
								onClick={() => handleEdit(track)}
								className="p-1.5 bg-secondary hover:bg-secondary/80 rounded text-xs font-medium"
							>
								Edit
							</button>
							<button
								onClick={(e) => handleDelete(track.id, e)}
								className="p-1.5 bg-red-100 text-red-600 hover:bg-red-200 rounded text-xs font-medium"
							>
								Delete
							</button>
						</div>
						<div className="flex justify-between items-start mb-2 pr-16">
							<h3 className="font-bold text-lg">{track.title}</h3>
						</div>
						<div className="mb-2">
							<span className="text-xs bg-secondary px-2 py-1 rounded">
								{track.courseSlugs.length} Courses
							</span>
						</div>
						<p className="text-sm text-muted-foreground mb-4 line-clamp-2">
							{track.description}
						</p>
						<div className="text-xs text-muted-foreground font-mono bg-muted/50 p-2 rounded">
							{track.slug}
						</div>
					</div>
				))}
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
