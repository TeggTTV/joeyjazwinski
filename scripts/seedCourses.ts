import { PrismaClient } from '../src/generated/prisma/index.js';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// Initialize Prisma
const prisma = new PrismaClient();

const COURSES_DIR = path.join(process.cwd(), 'src/content/courses');

interface CourseMetadata {
	title: string;
	description: string;
	tags: string[];
	progressional: boolean;
	duration?: number;
}

interface ExerciseData {
	question: string;
	type: string;
	options?: string;
	correctAnswer: string;
	hint?: string;
}

interface LessonFrontmatter {
	title: string;
	description: string;
	exercises?: ExerciseData[];
	duration?: number;
}

async function seedCourses() {
	if (!fs.existsSync(COURSES_DIR)) {
		console.error(`Courses directory not found at ${COURSES_DIR}`);
		return;
	}

	const courseDirs = fs.readdirSync(COURSES_DIR).filter((dir) => {
		return fs.statSync(path.join(COURSES_DIR, dir)).isDirectory();
	});

	console.log(
		`Found ${courseDirs.length} potential courses: ${courseDirs.join(', ')}`,
	);

	for (const courseSlug of courseDirs) {
		const coursePath = path.join(COURSES_DIR, courseSlug);
		const metadataPath = path.join(coursePath, 'course.json');

		if (!fs.existsSync(metadataPath)) {
			console.warn(`Skipping ${courseSlug}: course.json not found.`);
			continue;
		}

		// 1. Parse Course Metadata
		const metadata: CourseMetadata = JSON.parse(
			fs.readFileSync(metadataPath, 'utf8'),
		);

		console.log(`Processing Course: ${metadata.title} (${courseSlug})`);

		// 2. Upsert Course
		const course = await prisma.course.upsert({
			where: { slug: courseSlug },
			update: {
				title: metadata.title,
				description: metadata.description,
				tags: metadata.tags,
				progressional: metadata.progressional,
				duration: metadata.duration || 0,
			},
			create: {
				slug: courseSlug,
				title: metadata.title,
				description: metadata.description,
				tags: metadata.tags,
				progressional: metadata.progressional,
				duration: metadata.duration || 0,
				order: [], // Will populate later
			},
		});

		// 3. Find and sort lessons
		const lessonFiles = fs.readdirSync(coursePath).filter((file) => {
			return file.endsWith('.mdx');
		});

		// Sort by filename (e.g., 01-intro.mdx, 02-setup.mdx)
		lessonFiles.sort((a, b) => a.localeCompare(b));

		const lessonSlugs: string[] = [];

		for (const lessonFile of lessonFiles) {
			// Derive simple slug from filename: "01-introduction.mdx" -> "introduction"
			// Or keep it simple: just use the filename without extension as slug?
			// Let's Clean it: remove leading numbers and dashes.
			const filenameBase = lessonFile.replace(/\.mdx$/, '');
			const cleanSlug = filenameBase.replace(/^\d+[-_]?/, '');

			const filePath = path.join(coursePath, lessonFile);
			const fileContent = fs.readFileSync(filePath, 'utf8');

			// Parse Frontmatter
			const { data, content } = matter(fileContent);
			const frontmatter = data as LessonFrontmatter;

			console.log(
				`  > Processing Lesson: ${frontmatter.title} (${cleanSlug})`,
			);

			// Upsert Lesson
			const lesson = await prisma.lesson.upsert({
				where: { slug: cleanSlug },
				update: {
					title: frontmatter.title,
					description: frontmatter.description,
					content: content,
					courseSlug: courseSlug,
					duration: frontmatter.duration || 10,
				},
				create: {
					slug: cleanSlug,
					title: frontmatter.title,
					description: frontmatter.description,
					content: content,
					courseSlug: courseSlug,
					duration: frontmatter.duration || 10,
				},
			});

			lessonSlugs.push(cleanSlug);

			// Handle Exercises
			if (frontmatter.exercises && Array.isArray(frontmatter.exercises)) {
				// We first delete existing exercises for this lesson to avoid duplicates/stale data
				// This is a "replace all" strategy for exercises within a lesson
				await prisma.exercise.deleteMany({
					where: { lessonSlug: cleanSlug },
				});

				for (const ex of frontmatter.exercises) {
					await prisma.exercise.create({
						data: {
							question: ex.question,
							type: ex.type,
							options: ex.options || null,
							correctAnswer: ex.correctAnswer,
							hint: ex.hint || null,
							lessonSlug: cleanSlug,
						},
					});
				}
			}
		}

		// 4. Update Course Order
		await prisma.course.update({
			where: { slug: courseSlug },
			data: { order: lessonSlugs },
		});

		console.log(`  > Completed Course: ${course.title}`);
	}

	console.log('Seed completed successfully.');
}

seedCourses()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
