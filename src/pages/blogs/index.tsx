import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { BlogPostData, getFullUrl } from '@/utils/db';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { NextSeo } from 'next-seo';
import { seoBlogs } from '@/lib/seoConfig';

interface BlogIndexProps {
    posts: BlogPostData[];
}

const BlogIndex: React.FC<BlogIndexProps> = ({ posts }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const featuredPost = posts[0]; // Keep the first blog as the featured post
    const filteredPosts = posts
        .filter((post) =>
            post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (post.description && post.description.toLowerCase().includes(searchTerm.toLowerCase()))
        )
        .filter((post) => post !== featuredPost); // Exclude the featured post from the filtered list

    const otherPosts = filteredPosts;

    return (
        <>
            <NextSeo {...seoBlogs} />
            <section className="">
                <h1 className="text-4xl font-bold mb-8">All Blogs</h1>
                {/* Hero Section */}
                {/* <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-10 rounded-lg mb-8 shadow-lg">
                    <h1 className="text-4xl font-bold mb-2"></h1>
                    <p className="text-lg">Discover the latest updates, tutorials, and insights.</p>
                </div> */}

                {/* Search Bar */}
                <input
                    type="text"
                    placeholder="Search blogs..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full border rounded px-4 py-2 mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                {/* Featured Blog */}
                {featuredPost && (
                    <motion.div
                        className="mb-8 p-6 bg-blue-100 rounded-lg shadow-lg"
                        whileHover={{ scale: 1.02 }}
                    >
                        <h2 className="text-2xl font-bold mb-2">Featured Blog</h2>
                        <Link href={`/blogs/${featuredPost.slug}`} className="text-blue-600 hover:underline">
                            <h3 className="text-xl font-semibold">{featuredPost.title}</h3>
                        </Link>
                        <p className="text-gray-700 mt-2">{featuredPost.description}</p>
                        <div className="mt-auto">
                            <p className="text-sm text-gray-500 mt-2">Created on: {featuredPost.createdAt ? new Date(featuredPost.createdAt).toLocaleDateString() : 'Unknown date'}</p>
                        </div>
                    </motion.div>
                )}

                {/* Blog List */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {otherPosts.map((post) => (
                        <motion.div
                            key={post.slug}
                            className="p-4 border rounded-lg shadow-lg flex flex-col"
                            whileHover={{ scale: 1.05 }}
                        >
                            <Link href={`/blogs/${post.slug}`} className="text-blue-600 hover:underline">
                                <h3 className="text-lg font-semibold">{post.title}</h3>
                            </Link>
                            <p className="text-gray-600 mt-2">{post.description}</p>
                            <div className="mt-auto">
                                <p className="text-sm text-gray-500 mt-2">Created on: {post.createdAt ? new Date(post.createdAt).toLocaleDateString() : 'Unknown date'}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* No Results Message */}
                {otherPosts.length === 0 && (
                    <p className="text-center text-gray-500 mt-6">No blogs match your search criteria.</p>
                )}
            </section>
        </>
    );
};

export const getServerSideProps: GetServerSideProps = async () => {
    try {
        const response = await fetch(getFullUrl('/api/getBlogPosts'), {
            method: 'GET',
            credentials: 'include',
        });
        const data = await response.json();

        return {
            props: {
                posts: data.blogPosts.sort((a: BlogPostData, b: BlogPostData) => {
                    const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
                    const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
                    return dateB - dateA;
                }) || [],
            },
        };
    } catch (error) {
        console.error('Error fetching blog posts:', error);
        return {
            props: {
                posts: [],
            },
        };
    }
};

export default BlogIndex;
