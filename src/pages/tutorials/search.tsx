import React, { useState } from 'react';
import { GetServerSideProps } from 'next';
import { getAllPosts, PostData } from '../../lib/mdx';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface SearchProps {
    posts: PostData[];
    initialQuery: string;
    initialTags: string[];
}

const SearchPage: React.FC<SearchProps> = ({ posts, initialQuery, initialTags }) => {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState(initialQuery);
    const allTags = Array.from(new Set(posts.flatMap(p => p.frontMatter.tags ?? [])));
    const [selectedTags, setSelectedTags] = useState<string[]>(initialTags);
    const toggleTag = (tag: string) => {
        setSelectedTags(prev =>
            prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
        );
    };
    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.push(`/tutorials/search?query=${encodeURIComponent(searchTerm)}&tags=${selectedTags.join(',')}`);
    };

    const filtered = posts
        .filter(p =>
            !searchTerm ||
            p.frontMatter.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (p.frontMatter.description && p.frontMatter.description.toLowerCase().includes(searchTerm.toLowerCase()))
        )
        .filter(p =>
            selectedTags.length === 0 ||
            selectedTags.every(tag => (p.frontMatter.tags ?? []).includes(tag))
        );

    return (
        <main className="max-w-3xl mx-auto py-8 space-y-4">
            <h1 className="text-3xl font-bold">Search Tutorials</h1>
            <form onSubmit={handleSearch} className="flex mb-4 space-x-2">
                <input
                    type="text"
                    placeholder="Search tutorials..."
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    className="flex-grow border rounded-l px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <button type="submit" className="bg-primary-500 text-white px-4 rounded">
                    Search
                </button>
            </form>
            <div className="flex flex-wrap gap-2 mb-4">
                {allTags.map(tag => (
                    <span
                        key={tag}
                        onClick={() => toggleTag(tag)}
                        className={`px-3 py-1 rounded-full cursor-pointer ${selectedTags.includes(tag)
                            ? 'bg-primary-500 text-white'
                            : 'bg-gray-200 text-gray-700'
                            }`}
                    >
                        {tag}
                    </span>
                ))}
            </div>
            {filtered.length > 0 ? (
                <ul className="space-y-2">
                    {filtered.map(({ slug, frontMatter }) => (
                        <li key={slug} className="border-b pb-2">
                            <Link href={`/tutorials/${slug}`} className="text-primary hover:underline text-xl font-medium">
                                {frontMatter.title}
                            </Link>
                            <p className="text-sm text-gray-500">
                                {new Date(frontMatter.updatedAt).toLocaleDateString()}
                            </p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-gray-600">No tutorials found matching your criteria.</p>
            )}
        </main>
    );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
    const term = typeof query.query === 'string' ? query.query : '';
    const tagsParam = typeof query.tags === 'string' ? query.tags : '';
    const tags = tagsParam ? tagsParam.split(',').filter(Boolean) : [];
    const posts = getAllPosts('tutorials');
    return {
        props: {
            posts,
            initialQuery: term,
            initialTags: tags
        }
    };
};

export default SearchPage;