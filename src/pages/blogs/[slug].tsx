import { GetStaticPaths, GetStaticProps } from 'next';
import { serialize } from 'next-mdx-remote/serialize';
import MDXLayout from '../../components/MDXLayout';
import { PostContent } from '../../lib/mdx';
import { getBlogPosts, getBlogPostBySlug, BlogPostData } from '../../utils/db';

const BlogPost: React.FC<PostContent> = ({ frontMatter, source }) => {
  return <MDXLayout frontMatter={frontMatter} source={source} />;
};

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getBlogPosts();
  const paths = posts.map((post: BlogPostData) => ({
    params: { slug: post.slug },
  }));
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    return { notFound: true };
  }

  const frontMatter = post;
  const content = post.content;
  const source = await serialize(content); // Serialize the content to create the MDX source object

  return { props: { frontMatter, source } };
};

export default BlogPost;