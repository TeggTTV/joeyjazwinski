import { GetStaticPaths, GetStaticProps } from 'next';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { PrismaClient } from '../../generated/prisma/client';
import CommentSection from '@/components/CommentSection';
import Link from 'next/link';

const prisma = new PrismaClient();

interface BlogPostProps {
    slug: string;
    source: MDXRemoteSerializeResult;
    comments: { content: string; postSlug: string }[];
    relatedPosts: { title: string; slug: string }[];
}

const BlogPost: React.FC<BlogPostProps> = ({ slug, source, comments, relatedPosts }) => {
    return (
        <section className="max-w-5xl mx-auto px-10 py-12 rounded-md">
            {/* Blog Content */}
			<article
				className="prose mx-auto mb-8"
				style={{
					fontSize: '1em',
					lineHeight: '1.6',
					color: '#444',
				}}
			>
				<MDXRemote
					{...source}
					components={{
						strong: (props) => <strong className="text-blue-500 font-medium" {...props} />,
						blockquote: (props) => (
							<blockquote
								className="border-l-4 border-gray-400 pl-3 italic text-gray-600"
								{...props}
							/>
						),
						hr: () => <hr className="my-6 border-gray-300" />,
						li: ({ children, ...props }) => (
                            <li className="list-disc list-inside text-gray-700" {...props}>
                                {children}
                            </li>
                        ),
                        ul: ({ children, ...props }) => (
                            <ul className="list-disc list-inside space-y-2 text-gray-700" {...props}>
                                {children}
                            </ul>
                        ),
                        ol: ({ children, ...props }) => (
                            <ol className="list-decimal list-inside space-y-2 text-gray-700" {...props}>
                                {children}
                            </ol>
                        ),
                        div: ({ children, style, ...props }) => (
                            <div
                                style={style}
                                className="p-4 rounded-md border bg-gray-50 border-gray-200"
                                {...props}
                            >
                                {children}
                            </div>
                        ),
						a: ({ children, ...props }) => (
							<Link
								className="text-blue-500 hover:underline"
								{...props}
							>
								{children}
							</Link>
						),
					}}
				/>
			</article>


            {/* Comments Section */}
            <CommentSection comments={comments} slug={slug} />

            {/* Related Posts */}
            <div className="mt-12">
                <h2 className="text-xl font-semibold mb-4 text-gray-700">Related Posts</h2>
                <ul className="space-y-3">
                    {relatedPosts.map((post) => (
                        <li key={post.slug} className="p-3 bg-white border rounded-md">
                            <Link href={`/blogs/${post.slug}`} className="text-blue-500 hover:underline">
                                {post.title}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
};

export const getStaticPaths: GetStaticPaths = async () => {
    const posts = await prisma.blogPost.findMany({ select: { slug: true } });
    const paths = posts.map((post) => ({ params: { slug: post.slug } }));

    return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<BlogPostProps> = async ({ params }) => {
    const slug = params?.slug as string;
    const post = await prisma.blogPost.findUnique({ where: { slug } });

    if (!post) {
        return { notFound: true };
    }

    const source = await serialize(post.content || '');
    const comments = await prisma.comment.findMany({ where: { postSlug: slug } });
    const relatedPosts = await prisma.blogPost.findMany({
        where: { slug: { not: slug } },
        select: { title: true, slug: true },
        take: 3,
    });

    return {
        props: {
            slug,
            source,
            comments: comments.map((comment) => ({
                content: comment.content,
                postSlug: comment.postSlug,
            })),
            relatedPosts,
        },
    };
};

export default BlogPost;
