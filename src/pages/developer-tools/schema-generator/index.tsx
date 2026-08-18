import { useState } from 'react';
import { NextSeo } from 'next-seo';
import { Database, Plus, Trash, Copy, Check } from 'lucide-react';

interface FaqItem {
	id: string;
	question: string;
	answer: string;
}

export default function SchemaGenerator() {
	const [schemaType, setSchemaType] = useState<
		'Article' | 'LocalBusiness' | 'FAQPage'
	>('Article');
	const [copied, setCopied] = useState(false);

	// Article fields
	const [artTitle, setArtTitle] = useState('');
	const [artAuthor, setArtAuthor] = useState('');
	const [artPublisher, setArtPublisher] = useState('');
	const [artDate, setArtDate] = useState('');
	const [artImage, setArtImage] = useState('');

	// Local Business fields
	const [busName, setBusName] = useState('');
	const [busAddress, setBusAddress] = useState('');
	const [busPhone, setBusPhone] = useState('');
	const [busUrl, setBusUrl] = useState('');
	const [busImage, setBusImage] = useState('');

	// FAQ fields
	const [faqItems, setFaqItems] = useState<FaqItem[]>([
		{
			id: '1',
			question: 'What is this tool?',
			answer: 'This is a JSON-LD Schema Generator.',
		},
	]);

	const addFaqItem = () => {
		const newId = Math.random().toString(36).substring(2, 9);
		setFaqItems([...faqItems, { id: newId, question: '', answer: '' }]);
	};

	const removeFaqItem = (id: string) => {
		setFaqItems(faqItems.filter((item) => item.id !== id));
	};

	const updateFaqItem = (
		id: string,
		field: 'question' | 'answer',
		value: string,
	) => {
		setFaqItems(
			faqItems.map((item) =>
				item.id === id ? { ...item, [field]: value } : item,
			),
		);
	};

	const generateSchemaJson = () => {
		let schema: Record<string, any> = {
			'@context': 'https://schema.org',
		};

		if (schemaType === 'Article') {
			schema['@type'] = 'Article';
			schema['headline'] = artTitle || 'Sample Article Title';
			if (artAuthor) {
				schema['author'] = {
					'@type': 'Person',
					name: artAuthor,
				};
			}
			if (artPublisher) {
				schema['publisher'] = {
					'@type': 'Organization',
					name: artPublisher,
				};
			}
			if (artDate) schema['datePublished'] = artDate;
			if (artImage) schema['image'] = artImage;
		} else if (schemaType === 'LocalBusiness') {
			schema['@type'] = 'LocalBusiness';
			schema['name'] = busName || 'My Local Business';
			if (busAddress) {
				schema['address'] = {
					'@type': 'PostalAddress',
					streetAddress: busAddress,
				};
			}
			if (busPhone) schema['telephone'] = busPhone;
			if (busUrl) schema['url'] = busUrl;
			if (busImage) schema['image'] = busImage;
		} else if (schemaType === 'FAQPage') {
			schema['@type'] = 'FAQPage';
			schema['mainEntity'] = faqItems
				.filter((item) => item.question.trim())
				.map((item) => ({
					'@type': 'Question',
					name: item.question,
					acceptedAnswer: {
						'@type': 'Answer',
						text: item.answer,
					},
				}));
		}

		const jsonString = JSON.stringify(schema, null, 2);
		return `<script type="application/ld+json">\n${jsonString}\n</script>`;
	};

	const handleCopy = () => {
		navigator.clipboard.writeText(generateSchemaJson());
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	return (
		<>
			<NextSeo
				title="JSON-LD Schema Generator - Joey Jazwinski"
				description="Generate Google-compliant structured schema markups. Choose from FAQ, Article, or Local Business templates and export valid JSON-LD code."
			/>
			<main className="min-h-screen bg-background pt-32 pb-16 px-4 sm:px-6 lg:px-8 text-foreground animate-fade-in">
				<div className="max-w-6xl mx-auto space-y-12">
					{/* Header */}
					<div className="text-center space-y-4 max-w-2xl mx-auto">
						<div className="inline-flex p-3 rounded-2xl bg-primary/10 text-primary border border-primary/20">
							<Database className="w-8 h-8" />
						</div>
						<h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl bg-linear-to-r from-primary to-violet-500 bg-clip-text text-transparent">
							JSON-LD Schema Generator
						</h1>
						<p className="text-muted-foreground text-lg">
							Improve rich search snippets with schema data.
							Generate structured JSON-LD code blocks.
						</p>
					</div>

					{/* Workspace */}
					<div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
						{/* Configuration Form */}
						<div className="lg:col-span-6 bg-card border border-border/80 rounded-2xl p-6 shadow-xl space-y-6">
							<div>
								<label className="block text-sm font-semibold mb-2">
									Schema Blueprint Type
								</label>
								<div className="flex gap-2">
									{(
										[
											'Article',
											'LocalBusiness',
											'FAQPage',
										] as const
									).map((t) => (
										<button
											key={t}
											type="button"
											onClick={() => setSchemaType(t)}
											className={`flex-1 py-2 rounded-xl text-xs font-semibold border transition ${
												schemaType === t
													? 'bg-primary text-primary-foreground border-transparent'
													: 'bg-background hover:bg-secondary text-muted-foreground'
											}`}
										>
											{t === 'LocalBusiness'
												? 'Local Business'
												: t === 'FAQPage'
													? 'FAQ Page'
													: 'Article'}
										</button>
									))}
								</div>
							</div>

							<div className="space-y-4 border-t border-border/40 pt-4">
								{schemaType === 'Article' && (
									<div className="space-y-3 animate-fade-in">
										<div>
											<label className="block text-xs font-semibold mb-1">
												Article Headline
											</label>
											<input
												type="text"
												className="w-full p-2.5 rounded-lg border bg-background text-xs"
												value={artTitle}
												onChange={(e) =>
													setArtTitle(e.target.value)
												}
												placeholder="e.g. 10 Essential SEO Tips"
											/>
										</div>
										<div className="grid grid-cols-1 md:grid-cols-2 gap-3">
											<div>
												<label className="block text-xs font-semibold mb-1">
													Author Name
												</label>
												<input
													type="text"
													className="w-full p-2.5 rounded-lg border bg-background text-xs"
													value={artAuthor}
													onChange={(e) =>
														setArtAuthor(
															e.target.value,
														)
													}
													placeholder="e.g. Jane Smith"
												/>
											</div>
											<div>
												<label className="block text-xs font-semibold mb-1">
													Publisher
												</label>
												<input
													type="text"
													className="w-full p-2.5 rounded-lg border bg-background text-xs"
													value={artPublisher}
													onChange={(e) =>
														setArtPublisher(
															e.target.value,
														)
													}
													placeholder="e.g. Acme Media Corp"
												/>
											</div>
										</div>
										<div className="grid grid-cols-1 md:grid-cols-2 gap-3">
											<div>
												<label className="block text-xs font-semibold mb-1">
													Publish Date
												</label>
												<input
													type="date"
													className="w-full p-2 rounded-lg border bg-background text-xs"
													value={artDate}
													onChange={(e) =>
														setArtDate(
															e.target.value,
														)
													}
												/>
											</div>
											<div>
												<label className="block text-xs font-semibold mb-1">
													Main Image URL
												</label>
												<input
													type="url"
													className="w-full p-2.5 rounded-lg border bg-background text-xs"
													value={artImage}
													onChange={(e) =>
														setArtImage(
															e.target.value,
														)
													}
													placeholder="https://example.com/banner.png"
												/>
											</div>
										</div>
									</div>
								)}

								{schemaType === 'LocalBusiness' && (
									<div className="space-y-3 animate-fade-in">
										<div>
											<label className="block text-xs font-semibold mb-1">
												Business Name
											</label>
											<input
												type="text"
												className="w-full p-2.5 rounded-lg border bg-background text-xs"
												value={busName}
												onChange={(e) =>
													setBusName(e.target.value)
												}
												placeholder="e.g. Joey's Development Shop"
											/>
										</div>
										<div>
											<label className="block text-xs font-semibold mb-1">
												Street Address
											</label>
											<input
												type="text"
												className="w-full p-2.5 rounded-lg border bg-background text-xs"
												value={busAddress}
												onChange={(e) =>
													setBusAddress(
														e.target.value,
													)
												}
												placeholder="e.g. 123 Code Street"
											/>
										</div>
										<div className="grid grid-cols-1 md:grid-cols-3 gap-3">
											<div className="md:col-span-1">
												<label className="block text-xs font-semibold mb-1">
													Phone Number
												</label>
												<input
													type="tel"
													className="w-full p-2.5 rounded-lg border bg-background text-xs"
													value={busPhone}
													onChange={(e) =>
														setBusPhone(
															e.target.value,
														)
													}
													placeholder="e.g. 555-0199"
												/>
											</div>
											<div className="md:col-span-2">
												<label className="block text-xs font-semibold mb-1">
													Website URL
												</label>
												<input
													type="url"
													className="w-full p-2.5 rounded-lg border bg-background text-xs"
													value={busUrl}
													onChange={(e) =>
														setBusUrl(
															e.target.value,
														)
													}
													placeholder="https://example.com"
												/>
											</div>
										</div>
										<div>
											<label className="block text-xs font-semibold mb-1">
												Cover Image URL
											</label>
											<input
												type="url"
												className="w-full p-2.5 rounded-lg border bg-background text-xs"
												value={busImage}
												onChange={(e) =>
													setBusImage(e.target.value)
												}
												placeholder="https://example.com/storefront.png"
											/>
										</div>
									</div>
								)}

								{schemaType === 'FAQPage' && (
									<div className="space-y-4 animate-fade-in">
										<div className="flex justify-between items-center">
											<span className="text-xs font-bold text-muted-foreground">
												FAQ Entries
											</span>
											<button
												type="button"
												onClick={addFaqItem}
												className="text-xs font-semibold text-primary hover:underline flex items-center gap-1"
											>
												<Plus className="w-3 h-3" /> Add
												Question
											</button>
										</div>

										<div className="space-y-3 max-h-87.5 overflow-y-auto pr-1">
											{faqItems.map((item, idx) => (
												<div
													key={item.id}
													className="p-3 border rounded-xl bg-background/50 space-y-2 relative"
												>
													<div className="flex justify-between items-center">
														<span className="text-[10px] font-bold text-muted-foreground">
															FAQ #{idx + 1}
														</span>
														<button
															type="button"
															onClick={() =>
																removeFaqItem(
																	item.id,
																)
															}
															className="text-rose-500 hover:bg-rose-500/10 p-1 rounded-md transition"
														>
															<Trash className="w-3.5 h-3.5" />
														</button>
													</div>
													<input
														type="text"
														className="w-full p-2 rounded-lg border bg-background text-xs"
														value={item.question}
														onChange={(e) =>
															updateFaqItem(
																item.id,
																'question',
																e.target.value,
															)
														}
														placeholder="Question text"
													/>
													<textarea
														rows={2}
														className="w-full p-2 rounded-lg border bg-background text-xs"
														value={item.answer}
														onChange={(e) =>
															updateFaqItem(
																item.id,
																'answer',
																e.target.value,
															)
														}
														placeholder="Answer details"
													/>
												</div>
											))}
										</div>
									</div>
								)}
							</div>
						</div>

						{/* Output Workspace */}
						<div className="lg:col-span-6 bg-card border border-border/80 rounded-2xl p-6 shadow-xl flex flex-col justify-between h-full min-h-125">
							<div className="space-y-4 flex-1 flex flex-col">
								<div className="flex justify-between items-center border-b border-border/40 pb-3">
									<h2 className="text-xl font-bold">
										Generated JSON-LD Tag
									</h2>
									<button
										onClick={handleCopy}
										className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border bg-background hover:bg-secondary text-xs font-semibold transition"
									>
										{copied ? (
											<>
												<Check className="w-3.5 h-3.5 text-emerald-500" />{' '}
												Copied
											</>
										) : (
											<>
												<Copy className="w-3.5 h-3.5" />{' '}
												Copy Code
											</>
										)}
									</button>
								</div>

								<div className="flex-1 min-h-100 bg-background border border-border rounded-xl p-4 font-mono text-[11px] overflow-auto select-all whitespace-pre">
									{generateSchemaJson()}
								</div>
							</div>
						</div>
					</div>
				</div>
			</main>
		</>
	);
}
