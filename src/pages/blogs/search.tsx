import React, { useState } from 'react';
import { GetServerSideProps } from 'next';
import { PostData } from '../../lib/mdx';
import { getFullUrl } from '@/utils/db';
import PostListPage from '@/components/PostListPage';

interface SearchProps {
    posts: PostData[];
    initialQuery: string;
    initialTags: string[];
}

const SearchPage: React.FC<SearchProps> = ({ posts, initialQuery, initialTags }) => {
    const [searchTerm] = useState(initialQuery);
    const [selectedTags] = useState<string[]>(initialTags);

    console.log('posts:', posts);


    const filtered = posts
        .filter(p =>
            !searchTerm ||
            p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (p.description && p.description.toLowerCase().includes(searchTerm.toLowerCase()))
        )
        .filter(p =>
            selectedTags.length === 0 ||
            selectedTags.every(tag => (p.tags ?? []).includes(tag))
        );


    return (
        // <main className="max-w-5xl px-10 mx-auto py-8 space-y-4">
        //     <h1 className="text-3xl font-bold">Search Results</h1>
        //     <form onSubmit={handleSearch} className="flex mb-4 space-x-2">
        //         <input
        //             type="text"
        //             placeholder="Search posts..."
        //             value={searchTerm}
        //             onChange={e => setSearchTerm(e.target.value)}
        //             className="flex-grow border rounded-l px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
        //         />
        //         <button type="submit" className="bg-primary-500 text-white px-4 rounded">
        //             Search
        //         </button>
        //     </form>
        //     <div className="flex flex-wrap gap-2 mb-4">
        //         {allTags.map(tag => (
        //             <span
        //                 key={tag}
        //                 onClick={() => toggleTag(tag)}
        //                 className={`px-3 py-1 rounded-full cursor-pointer ${selectedTags.includes(tag)
        //                     ? 'bg-primary-500 text-white'
        //                     : 'bg-gray-200 text-gray-700'
        //                     }`}
        //             >
        //                 {tag}
        //             </span>
        //         ))}
        //     </div>
        //     {filtered.length > 0 ? (
        //         <ul className="space-y-2">
        //             {filtered.map((post) => {
        //                 console.log(post); return (
        //                     <li key={post.slug} className="border-b pb-2">
        //                         <Link href={`/blogs/${post.slug}`} className="text-primary hover:underline text-xl font-medium">
        //                             {post.title}
        //                         </Link>
        //                         <p className="text-sm text-gray-500">
        //                             {new Date(post.updatedAt).toLocaleDateString()}
        //                         </p>
        //                     </li>
        //                 )
        //             })}
        //         </ul>
        //     ) : (
        //         <p className="text-gray-600">No posts found matching your criteria.</p>
        //     )}
        // </main>
        <PostListPage
            title="Search Results"
            posts={filtered}
            selectedTags={selectedTags}
            enableTags={true}
            type="blogs"
        />
    );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
    const term = typeof query.query === 'string' ? query.query : '';
    const tagsParam = typeof query.tags === 'string' ? query.tags : '';
    const tags = tagsParam ? tagsParam.split(',').filter(Boolean) : [];
    try {
        const posts = await fetch(getFullUrl('/api/getBlogPosts'), {
            method: 'GET',
            credentials: 'include',
        });
        const data = await posts.json();
        // console.log('data:', data.blogPosts);

        return {
            props: {
                posts: data.blogPosts || [],
                initialQuery: term,
                initialTags: tags
            }
        };
    } catch (error) {
        console.error("Error fetching blog posts:", error);
        return {
            props: {
                posts: [],
                initialQuery: term,
                initialTags: tags
            }
        };
    }

};

export default SearchPage;