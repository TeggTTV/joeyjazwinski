import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { serialize } from "next-mdx-remote/serialize";
import remarkGfm from "remark-gfm";
import { MDXProvider } from '@mdx-js/react';

import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

const root = process.cwd();

export interface PostFrontMatter {
    title: string;
    description?: string;
    tags?: string[];
    updatedAt: string;
    createdAt: string;
    author?: string;
    difficulty?: "beginner" | "intermediate" | "advanced";
    thumbnail?: string;
    thumbnailAlt?: string;

    [key: string]: unknown;
}

export interface PostData {
    slug: string;
    frontMatter: PostFrontMatter;
}

export interface PostContent extends PostData {
    content: string;
    source: any; // MDXRemoteSerializeResult
}

function getPostFiles(type: "blogs" | "tutorials"): string[] {
    const contentDir = path.join(root, "src", "content", type);
    return fs.readdirSync(contentDir).filter((file) => file.endsWith(".mdx"));
}

export function getAllPosts(type: "blogs" | "tutorials"): PostData[] {
    const files = getPostFiles(type);
    const posts = files.map((filename) => {
        const filePath = path.join(root, "src", "content", type, filename);
        const fileContents = fs.readFileSync(filePath, "utf8");
        const { data } = matter(fileContents);
        return {
            slug: filename.replace(/\.mdx$/, ""),
            frontMatter: data as PostFrontMatter,
        };
    });
    // sort by date descending
    return posts.sort(
        (a, b) =>
            new Date(b.frontMatter.updatedAt).getTime() -
            new Date(a.frontMatter.updatedAt).getTime()
    );
}

export async function getPostBySlug(
    type: "blogs" | "tutorials",
    slug: string
): Promise<PostContent> {
    const filePath = path.join(root, "src", "content", type, `${slug}.mdx`);
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(fileContents);
    const mdxSource = await serialize(content, {
        mdxOptions: {
            remarkPlugins: [remarkGfm],
            rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings],
            format: "mdx",
        },
        scope: data,
    });
    return {
        slug,
        frontMatter: data as PostFrontMatter,
        content,
        source: mdxSource,
    };
}

// const components: Record<string, React.ComponentType<any>> = {
//     button: (props: ButtonHTMLAttributes<HTMLButtonElement>) => (
//         <button {...props} className={`bg-blue-500 text-white px-4 py-2 rounded ${props.className || ''}`}>
//             {props.children}
//         </button>
//     ),
// };  

// export function MDXWrapper({ children }) {
//     return <MDXProvider components={components}>{children}</MDXProvider>;
// }
