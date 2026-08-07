import React from 'react';
import { GetServerSideProps } from 'next';
import { NextSeo } from 'next-seo';
import UserAnalytics from '@/components/Dashboard/UserAnalytics';
import { getFullUrl } from '@/utils/db';

export const getServerSideProps: GetServerSideProps = async (context) => {
	const { req } = context;
	const cookie = req.headers.cookie;

	try {
		const res = await fetch(getFullUrl('/api/validateSession'), {
			headers: { cookie: cookie || '' },
		});
		const data = await res.json();

		if (!data.isAuthenticated) {
			return {
				redirect: {
					destination: '/login?redirect=/analytics',
					permanent: false,
				},
			};
		}
	} catch (error) {
		return {
			redirect: {
				destination: '/login?redirect=/analytics',
				permanent: false,
			},
		};
	}

	return {
		props: {},
	};
};

const AnalyticsPage = () => {
	return (
		<>
			<NextSeo
				title="Badges and Awards - Joey Jazwinski"
				description="View your learning progress, streaks, and achievements."
				noindex={true}
			/>
			<main className="min-h-screen bg-background pt-30 pb-16 px-4 sm:px-6 md:px-8">
				<div className="max-w-7xl mx-auto space-y-8">
					<div className="flex flex-col gap-2">
						<h1 className="text-3xl font-bold">
							My Learning Dashboard
						</h1>
						<p className="text-muted-foreground">
							Track your progress, view your achievements, and
							keep your streak alive.
						</p>
					</div>

					<UserAnalytics variant="badges" />
				</div>
			</main>
		</>
	);
};

export default AnalyticsPage;
