"use client";
import { useEffect, useState } from 'react';

const TOC = () => {
    const [headings, setHeadings] = useState<HTMLHeadingElement[]>([]);

    useEffect(() => {
        const hTags = Array.from(document.querySelectorAll('h2, h3')) as HTMLHeadingElement[];
        setHeadings(hTags);
    }, []);

    return (
        <aside className="sticky top-20 p-4 text-sm max-h-[70vh] overflow-y-auto border-l border-gray-200 pl-4 hidden lg:block">
            <h2 className="font-bold mb-2">Contents</h2>
            <ul className="space-y-2">
                {headings.map(h => (
                    <li key={h.id}>
                        <a href={`#${h.id}`} className="text-gray-600 hover:underline">
                            {h.innerText}
                        </a>
                    </li>
                ))}
            </ul>
        </aside>
    );
};

export default TOC;