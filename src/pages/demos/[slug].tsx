import React from 'react';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

const DemoPage: React.FC = () => {
	const router = useRouter();
	const { slug } = router.query;

	// This is where you would normally render different components based on the slug
	// For now, we'll just show a placeholder

	return (
		<>
			<NextSeo
				title={`${
					slug
						? slug.toString().charAt(0).toUpperCase() +
						  slug.toString().slice(1)
						: 'Demo'
				} | Joey Jazwinski`}
				description="Interactive demo."
			/>
			<main className="min-h-screen py-10 px-4">
				<div className="max-w-6xl mx-auto">
					<Link
						href="/demos"
						className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-8 transition-colors"
					>
						<ArrowLeft className="w-4 h-4" />
						Back to Demos
					</Link>

					<div className="bg-card border border-border rounded-3xl p-8 min-h-[600px] flex flex-col items-center justify-center text-center shadow-sm">
						<div className="mb-6 p-4 bg-primary/10 rounded-full">
							<span className="text-4xl">🚧</span>
						</div>
						<h1 className="text-3xl font-bold mb-4">{slug} Demo</h1>
						<p className="text-muted-foreground max-w-md">
							This is a placeholder for the{' '}
							<strong>{slug}</strong> demo. The actual interactive
							component would be rendered here.
						</p>
					</div>
				</div>
			</main>
		</>
	);
};

export default DemoPage;
