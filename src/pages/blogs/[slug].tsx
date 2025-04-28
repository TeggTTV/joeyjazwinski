import { GetStaticPaths, GetStaticProps } from 'next';
import { serialize } from 'next-mdx-remote/serialize';
import MDXLayout from '../../components/MDXLayout';
import { PostContent } from '../../lib/mdx';
import { PrismaClient } from "../../generated/prisma/client";

const prisma = new PrismaClient();

const BlogPost: React.FC<PostContent> = ({ frontMatter, source }) => {
  return <MDXLayout frontMatter={frontMatter} source={source} />;
};

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const posts = await prisma.blogPost.findMany({
      select: { slug: true },
    });
    const paths = posts.map((post) => ({
      params: { slug: post.slug },
    }));
    return { paths, fallback: false };
  } catch (error) {
    console.error("Error fetching blog post slugs:", error);
    return { paths: [], fallback: false };
  } finally {
    await prisma.$disconnect();
  }
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;

  try {
    const post = await prisma.blogPost.findUnique({
      where: { slug },
    });

    if (!post) {
      return { notFound: true };
    }

    const frontMatter = post;
    const content = post.content ?? ""; // Ensure content is a non-null string
    const source = await serialize(content); // Serialize the content to create the MDX source object

    return { props: { frontMatter, source } };
  } catch (error) {
    console.error("Error fetching blog post by slug:", error);
    return { notFound: true };
  } finally {
    await prisma.$disconnect();
  }
};

export default BlogPost;