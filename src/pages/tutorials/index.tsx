import { GetStaticProps } from 'next';
import PostListPage from '../../components/PostListPage';
import { getTutorials, TutorialData } from '@/utils/db';

interface TutorialIndexProps {
    posts: TutorialData[];
}

const BlogIndex: React.FC<TutorialIndexProps> = ({ posts }) => {
    return <PostListPage title="Tutorials" posts={posts} type="tutorials" enableTags />;
};

export const getStaticProps: GetStaticProps = async () => {
    // const posts = getAllPosts('blogs');
    const posts = await getTutorials();
    return {
        props: {
            posts: posts
        }
    };
};

export default BlogIndex;
