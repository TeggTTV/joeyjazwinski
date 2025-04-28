import { GetStaticProps } from 'next';
import PostListPage from '../../components/PostListPage';
import { BlogPostData, getBlogPosts } from '@/utils/db';

interface BlogIndexProps {
    posts: BlogPostData[];
}

const BlogIndex: React.FC<BlogIndexProps> = ({ posts }) => {
    return <PostListPage title="Blog" posts={posts} type="blogs" enableTags />;
};

export const getStaticProps: GetStaticProps = async () => {
    // const posts = getAllPosts('blogs');
    const posts = await getBlogPosts();
    return {
        props: {
            posts: posts
        }
    };
};

export default BlogIndex;
