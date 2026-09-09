export interface User {
	confirmPassword?: string;
	id?: string;
	email: string;
	password: string;
	name: string;
	createdAt?: string;
	updatedAt?: string;
	sessionToken?: string;
	courses?: Course[];
	messages?: Message[];
}

export interface Lesson {
	id?: string;
	slug: string;
	courseSlug: string;
	title: string;
	description: string;
	content?: string;
	exercises: Exercise[];
	duration?: number;
	completed?: boolean;
}

export interface Exercise {
	id?: string;
	question: string;
	type: string;
	options?: string;
	correctAnswer: string;
	hint: string;
}

export interface Course {
	id?: string;
	title: string;
	description: string;
	slug: string;
	progressional: boolean;
	lessons: Lesson[];
	order: string[];
	duration?: number;
	rating: { userId: string; rating: number }[]; // Update rating type to match calculateAverageRating
}

export interface UserCourseData {
	courses: Course[];
}
export interface Change {
	type: 'course' | 'lesson' | 'exercise';
	id: string;
	field: string;
	value: string;
}
export interface Comment {
	id?: string;
	authorId?: string;
	authorName?: string;
	content: string;
	postSlug: string;
	createdAt?: string;
	updatedAt?: string;
}

export interface Message {
	id?: string;
	name?: string;
	title?: string;
	description?: string;
	buttonText?: string;
	buttonLink?: string;
	buttonStyle?: string;
	createdAt?: string;
}
