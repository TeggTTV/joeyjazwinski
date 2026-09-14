import { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
	const slug = Array.isArray(params?.slug)
		? params.slug.join('/')
		: params?.slug || '';

	return {
		redirect: {
			destination: `/developer-blog/${slug}`,
			permanent: true,
		},
	};
};

export default function BlogSlugRedirect() {
	return null;
}
