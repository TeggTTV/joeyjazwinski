import { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = async (context) => {
	const { id } = context.params || {};
	return {
		redirect: {
			destination: `/poll/${id}`,
			permanent: true,
		},
	};
};

export default function PollsAliasPage() {
	return null;
}
