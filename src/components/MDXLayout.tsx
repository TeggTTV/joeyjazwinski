import React from 'react';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { NextSeo } from 'next-seo';
import type { PostFrontMatter } from '../lib/mdx';
import CommentSection from './CommentSection';
// import TOC from '@/components/TOC';
interface MDXLayoutProps {
	frontMatter: PostFrontMatter;
	source: MDXRemoteSerializeResult;
	comments: any[]; // Adjust the type as needed
	slug: string;
}

const MDXLayout: React.FC<MDXLayoutProps> = ({
	comments,
	slug,
	frontMatter,
	source,
}) => {
	// console.log('MDXLayout props:', { frontMatter, source });
	// if (!frontMatter || !source) {
	// 	console.error('Missing frontMatter or source in MDXLayout props:', {
	// 		frontMatter,
	// 		source,
	// 	});
	// 	return null;
	// }
	if (!frontMatter.title) {
		console.error('Missing title in frontMatter:', frontMatter);
		return null;
	}
	if (!source) {
		console.error('Missing source in MDXLayout props:', { source });
		return null;
	}

	const jsonLd = {
		'@context': 'https://schema.org',
		'@type': 'BlogPosting',
		headline: frontMatter.title,
		description: frontMatter.description || '',
		datePublished: frontMatter.createdAt || '',
		dateModified: frontMatter.updatedAt || frontMatter.createdAt || '',
		author: frontMatter.author
			? { '@type': 'Person', name: frontMatter.author }
			: undefined,
		mainEntityOfPage: {
			'@type': 'WebPage',
			'@id': typeof window !== 'undefined'
				? window.location.href
				: `https://joeyjazwinski.vercel.app/blogs/${slug}`,
		},
		url: `https://joeyjazwinski.vercel.app/blogs/${slug}`,
		image: frontMatter.thumbnail
			? `https://joeyjazwinski.vercel.app${frontMatter.thumbnail}`
			: undefined,
		keywords: frontMatter.tags ? frontMatter.tags.join(', ') : undefined,
	};

	return (
		<>
			<NextSeo
				title={frontMatter.title}
				description={frontMatter.description || ''}
				openGraph={{
					title: frontMatter.title,
					description: frontMatter.description,
					article: {
						publishedTime: frontMatter.createdAt,
						modifiedTime: frontMatter.updatedAt,
						authors: ["Joey Jazwinski"],
						tags: frontMatter.tags || [],
					},
				}}
			/>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
			/>
			<article className="max-w-5xl px-10 mx-auto py-8 space-y-6">
				<header>
					<h1 className="text-4xl font-bold">{frontMatter.title}</h1>
					<p className="text-sm text-gray-500">
						{frontMatter.updatedAt
							? new Date(
								frontMatter.updatedAt
							).toLocaleDateString()
							: 'Date not available'}
					</p>
				</header>
				<section className="prose prose-neutral">
					<MDXRemote {...source} />
				</section>
				{/* <TOC /> */}
			</article>
			<CommentSection comments={comments} slug={slug} />
		</>
	);
};

export default MDXLayout;
