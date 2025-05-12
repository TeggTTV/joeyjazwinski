import React, { useState } from 'react';
import { GetServerSideProps } from 'next';
import { PostData } from '../../lib/mdx';
import { getFullUrl } from '@/utils/db';

interface SearchProps {
    posts: PostData[];
    initialQuery: string;
    initialTags: string[];
}

const SearchPage: React.FC<SearchProps> = ({ posts, initialQuery, initialTags }) => {
    const [searchTerm, setSearchTerm] = useState(initialQuery);
    const [selectedTags, setSelectedTags] = useState<string[]>(initialTags);

    const allTags = Array.from(new Set(posts.flatMap((post) => post.tags || [])));

    const toggleTag = (tag: string) => {
        setSelectedTags((prev) =>
            prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
        );
    };

    const filteredPosts = posts
        .filter((post) =>
            !searchTerm ||
            post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (post.description && post.description.toLowerCase().includes(searchTerm.toLowerCase()))
        )
        .filter((post) =>
            selectedTags.length === 0 ||
            selectedTags.every((tag) => (post.tags || []).includes(tag))
        );

    return (
        <section className="max-w-5xl mx-auto px-6 py-8">
            <h1 className="text-3xl font-bold mb-4">Search Blogs</h1>

            {/* Search Input */}
            <input
                type="text"
                placeholder="Search posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full border rounded px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* Tag Filters */}
            <div className="flex flex-wrap gap-2 mb-4">
                {allTags.map((tag) => (
                    <span
                        key={tag}
                        onClick={() => toggleTag(tag)}
                        className={`cursor-pointer px-3 py-1 rounded-full text-sm font-medium border ${
                            selectedTags.includes(tag)
                                ? 'bg-blue-500 text-white'
                                : 'bg-gray-200 text-gray-700'
                        }`}
                    >
                        {tag}
                    </span>
                ))}
            </div>

            {/* Filtered Posts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredPosts.map((post) => (
                    <div key={post.slug} className="p-4 border rounded-lg shadow">
                        <h3 className="text-lg font-semibold text-blue-600">{post.title}</h3>
                        <p className="text-gray-600 mt-2">{post.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
    try {
        const response = await fetch(getFullUrl('/api/getBlogPosts'), {
            method: 'GET',
            credentials: 'include',
        });
        const data = await response.json();

        return {
            props: {
                posts: data.blogPosts,
                initialQuery: query.q || '',
                initialTags: Array.isArray(query.tags) ? query.tags : query.tags ? query.tags.split(',') : [],
            },
        };
    } catch (error) {
        console.error('Error fetching blog posts:', error);
        return {
            props: {
                posts: [],
                initialQuery: '',
                initialTags: [],
            },
        };
    }
};

export default SearchPage;