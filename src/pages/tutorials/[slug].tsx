import { GetStaticPaths, GetStaticProps } from 'next';
import { serialize } from 'next-mdx-remote/serialize';
import MDXLayout from '../../components/MDXLayout';
import { PostContent } from '../../lib/mdx';
import { getTutorials, TutorialData, getTutorialBySlug } from '../../utils/db';

const TutorialPost: React.FC<PostContent> = ({ frontMatter, source }) => {
  return <MDXLayout frontMatter={frontMatter} source={source} />;
};

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getTutorials();
  const paths = posts.map((post: TutorialData) => ({
    params: { slug: post.slug },
  }));
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;
  const post = await getTutorialBySlug(slug);

  if (!post) {
    return { notFound: true };
  }

  const frontMatter = post;
  const content = post.content;
  const source = await serialize(content); // Serialize the content to create the MDX source object

  return { props: { frontMatter, source } };
};

export default TutorialPost;