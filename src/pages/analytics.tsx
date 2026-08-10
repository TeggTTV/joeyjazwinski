import { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = async () => {
	return {
		redirect: {
			destination: '/profile',
			permanent: false,
		},
	};
};

export default function AnalyticsRedirect() {
	return null;
}
