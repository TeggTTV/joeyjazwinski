import Head from 'next/head';

interface ToolJsonLdProps {
	name: string;
	description: string;
	url: string;
	category?: string;
}

export default function ToolJsonLd({
	name,
	description,
	url,
	category = 'DeveloperApplication',
}: ToolJsonLdProps) {
	const schema = {
		'@context': 'https://schema.org',
		'@graph': [
			{
				'@type': 'WebApplication',
				name,
				description,
				url,
				applicationCategory: category,
				operatingSystem: 'Any',
				browserRequirements: 'Requires JavaScript. Requires HTML5.',
				offers: {
					'@type': 'Offer',
					price: '0',
					priceCurrency: 'USD',
				},
				author: {
					'@type': 'Person',
					name: 'Joey Jazwinski',
					url: 'https://joeyjazwinski.com/about',
				},
			},
			{
				'@type': 'BreadcrumbList',
				itemListElement: [
					{
						'@type': 'ListItem',
						position: 1,
						name: 'Home',
						item: 'https://joeyjazwinski.com',
					},
					{
						'@type': 'ListItem',
						position: 2,
						name: 'Developer Tools',
						item: 'https://joeyjazwinski.com/developer-tools',
					},
					{
						'@type': 'ListItem',
						position: 3,
						name,
						item: url,
					},
				],
			},
		],
	};

	return (
		<Head>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
			/>
		</Head>
	);
}
