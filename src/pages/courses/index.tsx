import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const courses = [
    {
        slug: 'javascript-essentials',
        title: 'JavaScript Essentials',
        description: 'Master the fundamentals of JavaScript in this quick-start course.',
        level: 'Beginner',
        lessons: 8,
    },
    {
        slug: 'advanced-react',
        title: 'Advanced React Patterns',
        description: 'Take your React skills to the next level with patterns used in production.',
        level: 'Intermediate',
        lessons: 10,
    },
    {
        slug: 'typescript-basics',
        title: 'TypeScript Basics',
        description: 'Learn how to use TypeScript to write safer and scalable code.',
        level: 'Beginner',
        lessons: 6,
    },
];

const CoursesPage = () => {
    return (
        <section className="max-w-5xl mx-auto py-16">
            <motion.h1
                className="text-4xl font-bold mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                Mini Courses
            </motion.h1>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {courses.map((course) => (
                    <motion.div
                        key={course.slug}
                        className="border p-6 rounded-2xl shadow-sm bg-white hover:shadow-md transition"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <h2 className="text-xl font-semibold mb-2">{course.title}</h2>
                        <p className="text-sm text-gray-600 mb-3">{course.description}</p>
                        <p className="text-xs text-gray-500 mb-4">Level: {course.level} · {course.lessons} Lessons</p>
                        <Link href={`/courses/${course.slug}`} className="text-blue-600 font-medium hover:underline">
                            View Course →
                        </Link>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default CoursesPage;