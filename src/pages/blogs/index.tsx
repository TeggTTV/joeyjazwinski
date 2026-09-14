import { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = async () => {
	return {
		redirect: {
			destination: '/developer-blog',
			permanent: true,
		},
	};
};

export default function BlogsRedirect() {
	return null;
}
