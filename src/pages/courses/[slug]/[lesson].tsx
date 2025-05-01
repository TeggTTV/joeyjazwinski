import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { GetStaticPaths, GetStaticProps } from 'next';
import { ArrowRight, Check, HelpCircle, RefreshCw } from 'lucide-react';
import { useRouter } from 'next/router';
import { Lesson } from '@/lib/mdx';
import Link from 'next/link';
import { getFullUrl } from '@/utils/db';

// const courseData: Record<string, Course> = {
//     'javascript-essentials': {
//         title: 'JavaScript Essentials',
//         description:
//             'Master the fundamentals of JavaScript with interactive lessons.',
//         slug: 'javascript-essentials',
//         progressional: true,
//         lessons: [
//             {
//                 title: 'Variables & Data Types',
//                 courseSlug: 'javascript-essentials',
//                 slug: 'variables-data-types',
//                 description:
//                     'Learn about var, let, const, and primitive data types.',
//                 exercises: [
//                     {
//                         question:
//                             'What keyword is used to declare a constant variable?',
//                         options: ['var', 'let', 'const'],
//                         correctAnswer: 'const',
//                         type: 'multiple-choice',
//                         hint: 'Use const for variables that should not change.',
//                     },
//                     {
//                         question: 'What is the output of typeof null?',
//                         correctAnswer: 'object',
//                         type: 'text',
//                         hint: 'null is considered an object in JavaScript.',
//                     },
//                 ],
//             },
//             {
//                 title: 'Functions & Scope',
//                 courseSlug: 'javascript-essentials',
//                 slug: 'functions-scope',
//                 description:
//                     'Understand how functions work and variable scope.',
//                 exercises: [
//                     {
//                         question:
//                             'What is the scope of a variable declared inside a function?',
//                         options: ['Global', 'Function', 'Block'],
//                         correctAnswer: 'Function',
//                         type: 'multiple-choice',
//                         hint: 'Variables declared inside a function are not accessible outside of it.',
//                     },
//                     {
//                         question: 'What is a function parameter?',
//                         options: ['Argument', 'Variable', 'Callback'],
//                         correctAnswer: 'Variable',
//                         type: 'multiple-choice',
//                         hint: 'Parameters are variables that accept values when a function is called.',
//                     },
//                 ],
//             },
//             {
//                 title: 'DOM Manipulation',
//                 slug: 'dom-manipulation',
//                 description:
//                     'Interact with the HTML document using JavaScript.',
//                 courseSlug: 'javascript-essentials',
//                 exercises: [],
//             },
//             {
//                 title: 'Events',
//                 slug: 'events',
//                 description:
//                     'Learn how to handle user interactions with events.',
//                 courseSlug: 'javascript-essentials',
//                 exercises: [],
//             },
//             {
//                 title: 'ES6 Features',
//                 slug: 'es6-features',
//                 description:
//                     'Explore modern JavaScript features like arrow functions and destructuring.',
//                 courseSlug: 'javascript-essentials',
//                 exercises: [],
//             },
//             {
//                 title: 'Asynchronous JavaScript',
//                 slug: 'asynchronous-javascript',
//                 description: 'Understand callbacks, promises, and async/await.',
//                 courseSlug: 'javascript-essentials',
//                 exercises: [],
//             },
//             {
//                 title: 'Error Handling',
//                 slug: 'error-handling',
//                 description:
//                     'Learn how to handle errors gracefully in your code.',
//                 courseSlug: 'javascript-essentials',
//                 exercises: [],
//             },
//             {
//                 title: 'Project - To-Do List App',
//                 slug: 'todo-app',
//                 description:
//                     'Build a simple To-Do List application using JavaScript.',
//                 courseSlug: 'javascript-essentials',
//                 exercises: [],
//             },
//         ],
//     },
//     'css-layouts': {
//         title: 'CSS Layouts',
//         description: 'Learn Flexbox, Grid, and modern layout techniques.',
//         slug: 'css-layouts',
//         progressional: false,
//         lessons: [
//             {
//                 title: 'Flexbox Basics',
//                 courseSlug: 'css-layouts',
//                 slug: 'flexbox-basics',
//                 description: 'Master flex container and item behavior.',
//                 exercises: [
//                     {
//                         question:
//                             'What property defines the main axis in Flexbox?',
//                         options: [
//                             'flex-direction',
//                             'justify-content',
//                             'align-items',
//                         ],
//                         correctAnswer: 'flex-direction',
//                         type: 'multiple-choice',
//                         hint: 'Use flex-direction to set the direction of the main axis.',
//                     },
//                     {
//                         question:
//                             'How do you center an item in a flex container?',
//                         options: [
//                             'justify-content: center; align-items: center;',
//                             'margin: auto;',
//                             'text-align: center;',
//                         ],
//                         correctAnswer:
//                             'justify-content: center; align-items: center;',
//                         type: 'multiple-choice',
//                         hint: 'Use justify-content and align-items to center items in both axes.',
//                     },
//                 ],
//             },
//             {
//                 title: 'Grid Systems',
//                 courseSlug: 'css-layouts',
//                 slug: 'grid-systems',
//                 description:
//                     'Create powerful layout structures using CSS Grid.',
//                 exercises: [
//                     {
//                         question:
//                             'What property defines the number of columns in a grid?',
//                         options: [
//                             'grid-template-columns',
//                             'grid-template-rows',
//                             'grid-column',
//                         ],
//                         correctAnswer: 'grid-template-columns',
//                         type: 'multiple-choice',
//                         hint: 'Use grid-template-columns to set the number of columns in a grid.',
//                     },
//                     {
//                         question: 'How do you create a responsive grid layout?',
//                         options: [
//                             'Use media queries',
//                             'Use fixed widths',
//                             'Use percentages',
//                         ],
//                         correctAnswer: 'Use media queries',
//                         type: 'multiple-choice',
//                         hint: 'Media queries allow you to change the grid layout based on screen size.',
//                     },
//                 ],
//             },
//             {
//                 title: 'Positioning Elements',
//                 courseSlug: 'css-layouts',
//                 slug: 'positioning-elements',
//                 description: 'Learn absolute, relative, and fixed positioning.',
//                 exercises: [
//                     {
//                         question:
//                             'What is the default position value for elements?',
//                         options: ['static', 'relative', 'absolute'],
//                         correctAnswer: 'static',
//                         type: 'multiple-choice',
//                         hint: 'Elements are positioned statically by default.',
//                     },
//                     {
//                         question: 'How do you create a fixed position element?',
//                         options: [
//                             'position: fixed;',
//                             'position: absolute;',
//                             'position: relative;',
//                         ],
//                         correctAnswer: 'position: fixed;',
//                         type: 'multiple-choice',
//                         hint: 'Fixed position elements stay in the same place even when scrolling.',
//                     },
//                 ],
//             },
//             {
//                 title: 'CSS Variables',
//                 courseSlug: 'css-layouts',
//                 slug: 'css-variables',
//                 description: 'Use custom properties for reusable styles.',
//                 exercises: [
//                     {
//                         question:
//                             'What is the syntax to declare a CSS variable?',
//                         options: [
//                             '--variable-name: value;',
//                             'var(--variable-name);',
//                             'variable-name: value;',
//                         ],
//                         correctAnswer: '--variable-name: value;',
//                         type: 'multiple-choice',
//                         hint: 'CSS variables are declared with a double hyphen.',
//                     },
//                     {
//                         question: 'How do you use a CSS variable?',
//                         options: [
//                             'var(--variable-name)',
//                             'use(--variable-name)',
//                             'get(--variable-name)',
//                         ],
//                         correctAnswer: 'var(--variable-name)',
//                         type: 'multiple-choice',
//                         hint: 'Use var() to access the value of a CSS variable.',
//                     },
//                 ],
//             },
//             {
//                 title: 'Responsive Design',
//                 courseSlug: 'css-layouts',
//                 slug: 'responsive-design',
//                 description:
//                     'Make layouts that adapt to different screen sizes.',
//                 exercises: [],
//             },
//             {
//                 title: 'Project - Portfolio Page',
//                 courseSlug: 'css-layouts',
//                 slug: 'portfolio-page',
//                 description:
//                     'Build a responsive portfolio page using CSS layouts.',
//                 exercises: [],
//             },
//         ],
//     },
//     'nextjs-intro': {
//         title: 'Intro to Next.js',
//         description: 'A crash course into building web apps with Next.js.',
//         slug: 'nextjs-intro',
//         progressional: false,
//         lessons: [
//             {
//                 title: 'Pages & Routing',
//                 courseSlug: 'nextjs-intro',
//                 slug: 'pages-routing',
//                 description:
//                     'Explore file-based routing and dynamic routes in Next.js.',
//                 exercises: [
//                     {
//                         question:
//                             'What is the purpose of the pages directory in Next.js?',
//                         options: [
//                             'To define routes',
//                             'To store components',
//                             'To manage state',
//                         ],
//                         correctAnswer: 'To define routes',
//                         type: 'multiple-choice',
//                         hint: 'The pages directory is used to define routes in Next.js.',
//                     },
//                     {
//                         question:
//                             'How do you create a dynamic route in Next.js?',
//                         options: [
//                             'Using square brackets in the file name',
//                             'Using curly braces in the file name',
//                             'Using parentheses in the file name',
//                         ],
//                         correctAnswer: 'Using square brackets in the file name',
//                         type: 'multiple-choice',
//                         hint: 'Dynamic routes are created using square brackets in the file name.',
//                     },
//                 ],
//             },

//             {
//                 title: 'Static Generation',
//                 courseSlug: 'nextjs-intro',
//                 slug: 'static-generation',
//                 description: 'Learn how to pre-render pages at build time.',
//                 exercises: [
//                     {
//                         question: 'What is static generation in Next.js?',
//                         options: [
//                             'Pre-rendering pages at build time',
//                             'Rendering pages on each request',
//                             'Using client-side rendering',
//                         ],
//                         correctAnswer: 'Pre-rendering pages at build time',
//                         type: 'multiple-choice',
//                         hint: 'Static generation pre-renders pages at build time for better performance.',
//                     },
//                     {
//                         question:
//                             'How do you enable static generation for a page?',
//                         options: [
//                             'Using getStaticProps',
//                             'Using getServerSideProps',
//                             'Using useEffect',
//                         ],
//                         correctAnswer: 'Using getStaticProps',
//                         type: 'multiple-choice',
//                         hint: 'getStaticProps is used to enable static generation for a page.',
//                     },
//                 ],
//             },
//         ],
//     },
// };

export const getStaticPaths: GetStaticPaths = async () => {
    // const paths = [];
    // for (const courseSlug in courseData) {
    //     const lessons = courseData[courseSlug].lessons;
    //     for (const lesson of lessons) {
    //         paths.push({ params: { slug: courseSlug, lesson: lesson.slug } });
    //     }
    // }
    return { paths: [], fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const getCourse = async () => {
        try {
            const response = await fetch(getFullUrl('/api/getCourseData'), {
                method: 'POST',
                credentials: 'include',
                body: JSON.stringify({ slug: params?.slug }),
            });
            const data = await response.json();
            if (data) {
                return data.course;
            }
        } catch (error) {
            console.error('Error fetching user course data:', error);
        }
    };

    const { lesson } = params as { lesson: string };
    const course = await getCourse();

    if (!course) {
        console.error('Course not found');
        return { notFound: true };
    }

    const lessonD = course.lessons.find((l: Lesson) => l.slug === lesson);

    if (!lessonD) {
        console.error('Lesson not found');
        return { notFound: true };
    }

    console.log('getStaticProps returned:', { lesson: lessonD, nextLessonSlug: course.order?.[course.order.indexOf(lessonD.slug) + 1] || null });

    return { props: { lesson: lessonD, nextLessonSlug: course.order?.[course.order.indexOf(lessonD.slug) + 1] || null } };
};

export default function LessonPage({ lesson, nextLessonSlug }: { lesson: Lesson; nextLessonSlug: string }) {
    const router = useRouter();

    if (router.isFallback) {
        return <div>Loading...</div>;
    }

    const lessonSlug = lesson['slug'];
    const [answers, setAnswers] = useState<Record<number, string>>({});
    const [buttonStates, setButtonStates] = useState<
        Record<number, 'default' | 'success'>
    >({});
    const [showHints, setShowHints] = useState<Record<number, boolean>>({});
    const [startTime, setStartTime] = useState(Date.now());
    const [completed, setCompleted] = useState(false);
    const [errorMessages, setErrorMessages] = useState<Record<number, string>>(
        {}
    );

    async function updateUserData(
        courseSlug: string,
        lessonSlug: string,
        dataToStore: {
            buttonStates: Record<number, 'default' | 'success'>;
            answers: Record<number, string>;
            completed: boolean;
            completionTime?: number;
        }
    ) {
        try {
            const response = await fetch(
                getFullUrl('/api/editUserCourseData'),
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',
                    body: JSON.stringify({
                        courseSlug,
                        lessonSlug,
                        dataToStore,
                    }),
                }
            );
            if (!response.ok) throw new Error('Failed to update user data');
        } catch (error) {
            console.error('Error updating user data:', error);
        }
    }

    useEffect(() => {
        if (
            !lesson ||
            !lesson.title ||
            !lesson.description ||
            !lesson.exercises.length
        ) {
            // const courseSlug = router.query.slug as string;
            // router.push(`/courses/${courseSlug}`);
            return;
        }

        // updateUserData(lesson.courseSlug, lessonSlug, completed, Math.floor((Date.now() - startTime) / 1000));

        // const storedData = localStorage.getItem(`lesson-data-${lessonSlug}`);
        // if (storedData) {
        //     const parsedData = JSON.parse(storedData);
        //     setButtonStates(parsedData.buttonStates || {});
        //     setAnswers(parsedData.answers || {});
        //     if (parsedData.completed) {
        //         setCompleted(true);
        //         if (parsedData.completionTime) {
        //             setStartTime(Date.now() - parsedData.completionTime * 1000);
        //         }
        //     }
        // } else {
        //     // Redirect if the lesson is accessed directly without progress
        //     const courseSlug = router.query.slug as string;
        //     const course = courseData[courseSlug];
        //     if (course) {
        //         const lessonIndex = course.lessons.findIndex(
        //             (l) => l.slug === lessonSlug
        //         );
        //         if (lessonIndex > 0) {
        //             const previousLesson = course.lessons[lessonIndex - 1];
        //             const previousLessonData = localStorage.getItem(
        //                 `lesson-data-${previousLesson.slug}`
        //             );
        //             if (
        //                 !previousLessonData ||
        //                 !JSON.parse(previousLessonData).completed
        //             ) {
        //                 router.push(`/courses/${courseSlug}`);
        //             }
        //         }
        //     }
        // }
    }, [lessonSlug, router, lesson]);

    useEffect(() => {
        const dataToStore = {
            buttonStates,
            answers,
            completed: lesson.exercises.every(
                (_, idx) => buttonStates[idx] === 'success'
            ),
            completionTime: lesson.exercises.every(
                (_, idx) => buttonStates[idx] === 'success'
            )
                ? Math.floor((Date.now() - startTime) / 1000)
                : undefined,
        };
        // call api to update user data

        if (dataToStore.completed) {
            updateUserData(lesson.courseSlug, lessonSlug, dataToStore);
            setCompleted(true);
        }
    }, [buttonStates, answers, lessonSlug, startTime]);

    const handleChange = (questionIndex: number, answer: string) => {
        setAnswers((prev) => ({ ...prev, [questionIndex]: answer }));
        setErrorMessages((prev) => ({ ...prev, [questionIndex]: '' })); // Clear error message on change
    };

    const handleSubmit = (index: number) => {
        const exercise = lesson.exercises[index];
        if (answers[index]?.trim() === exercise.correctAnswer) {
            setButtonStates((prev) => ({ ...prev, [index]: 'success' }));
            setErrorMessages((prev) => ({ ...prev, [index]: '' })); // Clear error message on success
        } else {
            setErrorMessages((prev) => ({
                ...prev,
                [index]: 'Incorrect answer. Try again or use a hint.',
            }));
        }
    };

    const handleRetry = (index: number) => {
        setAnswers((prev) => ({ ...prev, [index]: '' }));
        setButtonStates((prev) => ({ ...prev, [index]: 'default' }));
        setErrorMessages((prev) => ({ ...prev, [index]: '' })); // Clear error message on retry
    };

    const toggleHint = (index: number) => {
        setShowHints((prev) => ({ ...prev, [index]: !prev[index] }));
    };

    const isDisabled = (index: number) => buttonStates[index] === 'success';
    const duration = Math.floor((Date.now() - startTime) / 1000);

    return (
        <section className="max-w-5xl px-10 mx-auto py-10">
            <motion.h1
                className="text-3xl font-bold mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
            >
                {/* {lesson.title} */}
            </motion.h1>
            <motion.p
                className="text-gray-700 mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
            >
                {/* {lesson.description} */}
            </motion.p>
            {completed && (
                <motion.div className="flex items-center justify-between mb-6 p-4 bg-green-100 border border-green-300 rounded">
                    🎉 Lesson completed in {duration} seconds!
                    {/* go to next lesson button with arrow -> */}
                    <motion.div
                        className="cursor-pointer flex items-center ml-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors duration-300"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        whileHover={{ scale: 1.02 }}
                        whileFocus={{ scale: 0.98 }}
                        transition={{ delay: 0.2 }}
                    >
                        <Link
                            className="flex items-center gap-2"
                            href={`/courses/${lesson.courseSlug}/${nextLessonSlug}`}
                        >
                            Next Lesson
                            <ArrowRight size={18} />
                        </Link>
                    </motion.div>
                </motion.div>
            )}
            <motion.div
                className="space-y-6"
                initial="hidden"
                animate="visible"
                variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
            >
                {lesson.exercises.map((exercise, index) => (
                    <motion.div
                        key={index}
                        className="p-6 border rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <p className="font-semibold text-lg mb-4">
                            {exercise.question}
                        </p>
                        <div className="flex flex-col space-y-4">
                            {exercise.type === 'multiple-choice' &&
                                exercise.options
                                    ?.split(',')
                                    ?.map((option, idx) => (
                                        <label
                                            key={idx}
                                            className={`cursor-pointer flex items-center p-4 border rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ${isDisabled(index)
                                                ? 'opacity-50 cursor-not-allowed'
                                                : ''
                                                }`}
                                        >
                                            <div className="relative w-6 h-6 mr-4">
                                                <input
                                                    type="radio"
                                                    name={`question-${index}`}
                                                    value={option}
                                                    checked={
                                                        answers[index] ===
                                                        option
                                                    }
                                                    onChange={() =>
                                                        handleChange(
                                                            index,
                                                            option
                                                        )
                                                    }
                                                    className="absolute w-full h-full opacity-0 cursor-pointer"
                                                    disabled={isDisabled(index)}
                                                />
                                                <div className="w-full h-full border-2 border-gray-400 rounded-full flex items-center justify-center">
                                                    {answers[index] ===
                                                        option && (
                                                            <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                                                        )}
                                                </div>
                                            </div>
                                            <span className="text-base font-medium">
                                                {option}
                                            </span>
                                        </label>
                                    ))}
                            {exercise.type === 'text' && (
                                <input
                                    type="text"
                                    placeholder="Type your answer here..."
                                    value={answers[index] || ''}
                                    onChange={(e) =>
                                        handleChange(index, e.target.value)
                                    }
                                    // user clicks enter with in the input field
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            e.preventDefault();
                                            handleSubmit(index);
                                        }
                                    }}
                                    className="p-4 border rounded-lg shadow-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                    disabled={isDisabled(index)}
                                />
                            )}
                        </div>
                        {errorMessages[index] && (
                            <p className="mt-3 text-sm text-red-700 bg-red-100 p-2 rounded">
                                {errorMessages[index]}
                            </p>
                        )}
                        <div className="flex gap-4 mt-4">
                            <button
                                onClick={() => handleSubmit(index)}
                                disabled={isDisabled(index)}
                                className={`cursor-pointer px-4 py-2 rounded-md shadow-md transition-all duration-300 ${buttonStates[index] === 'success'
                                    ? 'bg-green-600 text-white'
                                    : 'border border-blue-600 text-blue-600 hover:bg-blue-200'
                                    }`}
                            >
                                {buttonStates[index] === 'success' ? (
                                    <div className="flex gap-2">
                                        <Check />
                                        Correct
                                    </div>
                                ) : (
                                    'Submit'
                                )}
                            </button>
                            {!isDisabled(index) && (
                                <button
                                    onClick={() => toggleHint(index)}
                                    className="cursor-pointer px-3 py-2 text-sm text-gray-500 hover:text-blue-600 flex items-center gap-2"
                                >
                                    <HelpCircle size={18} /> Hint
                                </button>
                            )}
                            {!isDisabled(index) && (
                                <button
                                    onClick={() => handleRetry(index)}
                                    className="cursor-pointer px-3 py-2 text-sm text-gray-500 hover:text-red-600 flex items-center gap-2"
                                >
                                    <RefreshCw size={18} /> Retry
                                </button>
                            )}
                        </div>
                        {showHints[index] && (
                            <p className="mt-3 text-sm text-yellow-700 bg-yellow-100 p-2 rounded">
                                Hint: {exercise.hint || 'No hint available.'}{' '}
                                {exercise.hint ? (
                                    <span className="text-gray-500">
                                        ({exercise.hint})
                                    </span>
                                ) : (
                                    ''
                                )}
                            </p>
                        )}
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
}
