import { Lesson } from '@/lib/mdx';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function LessonCompleteBanner({ currentSlug, nextLesson }: { currentSlug: string, nextLesson?: Lesson }) {
    const [completed, setCompleted] = useState(false);

    useEffect(() => {
        const isDone = localStorage.getItem(`lesson-completed-${currentSlug}`) === 'true';
        setCompleted(isDone);
    }, [currentSlug]);

    if (!completed) return null;

    return (
        <div className="mt-4 flex flex-col items-start bg-green-100 p-4 rounded-lg">
            <p className="text-green-800 font-medium">🎉 Lesson completed!</p>
            {nextLesson && (
                <Link
                    href={`/courses/${nextLesson.courseSlug}/${nextLesson.slug}`}
                    className="mt-2 inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                >
                    Continue to: {nextLesson.title}
                </Link>
            )}
        </div>
    );
};
