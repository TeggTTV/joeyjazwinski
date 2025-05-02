import { Change, Course } from '@/lib/mdx';

export function handleCourseChange(
	setCourses: React.Dispatch<React.SetStateAction<Course[]>>,
	setChanges: React.Dispatch<React.SetStateAction<Change[]>>
) {
	return (courseId: string, field: string, value: string) => {
		setCourses((prevCourses) =>
			prevCourses.map((course) =>
				course.id === courseId ? { ...course, [field]: value } : course
			)
		);
		setChanges((prevChanges) => [
			...prevChanges,
			{ type: 'course', id: courseId, field, value },
		]);
	};
}

export function handleExerciseChange(
	setCourses: React.Dispatch<React.SetStateAction<Course[]>>,
	setChanges: React.Dispatch<React.SetStateAction<Change[]>>
) {
	return (
		courseId: string,
		lessonId: string,
		exerciseId: string,
		field: string,
		value: string
	) => {
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
		setChanges((prevChanges) => [
			...prevChanges,
			{ type: 'exercise', id: exerciseId, field, value },
		]);
	};
}
export function handleLessonChange(
	setCourses: React.Dispatch<React.SetStateAction<Course[]>>,
	setChanges: React.Dispatch<React.SetStateAction<Change[]>>
) {
	return (
		courseId: string,
		lessonId: string,
		field: string,
		value: string
	) => {
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
		setChanges((prevChanges) => [
			...prevChanges,
			{ type: 'lesson', id: lessonId, field, value },
		]);
	};
}
export function saveChanges(
	changes: Change[],
	setChanges: React.Dispatch<React.SetStateAction<Change[]>>
) {
	return async () => {
		const response = await fetch('/api/saveChanges', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ changes }),
		});
		const data = await response.json();
		alert(data.message || 'Changes saved successfully!');
		setChanges([]);
	};
}

export function removeTag(
	setTags: React.Dispatch<React.SetStateAction<string[]>>,
	tags: string[]
) {
	return (tag: string) => {
		setTags(tags.filter((t) => t !== tag));
	};
}

export function addTag(
	tagInput: string,
	tags: string[],
	setTags: React.Dispatch<React.SetStateAction<string[]>>,
	setTagInput: React.Dispatch<React.SetStateAction<string>>
) {
	return () => {
		if (tagInput.trim() && !tags.includes(tagInput.trim())) {
			setTags([...tags, tagInput.trim()]);
		}
		setTagInput('');
	};
}
