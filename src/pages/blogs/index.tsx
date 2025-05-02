import { GetStaticProps } from 'next';
import PostListPage from '../../components/PostListPage';
import { BlogPostData, getFullUrl } from '@/utils/db';
interface BlogIndexProps {
	posts: BlogPostData[];
}

const BlogIndex: React.FC<BlogIndexProps> = ({ posts }) => {
	return <PostListPage title="Blogs" posts={posts} type="blogs" enableTags />;
};

export const getStaticProps: GetStaticProps = async () => {
	try {
		const posts = await fetch(getFullUrl('/api/getBlogPosts'), {
			method: 'GET',
			credentials: 'include',
		});
		const data = await posts.json();
		// console.log('data:', data.blogPosts);

		return {
			props: {
				posts: data.blogPosts,
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
