import { useState, useMemo } from 'react';
import { NextSeo } from 'next-seo';
import ToolJsonLd from '@/components/seo/ToolJsonLd';
import {
	Database,
	Plus,
	Trash,
	Copy,
	Check,
	Download,
	ExternalLink,
	AlertCircle,
	CheckCircle2,
	AlertTriangle,
	Sparkles,
} from 'lucide-react';
import {
	SchemaType,
	validateSchema,
	SchemaValidationIssue,
} from '@/lib/schemaValidator';

interface FaqItem {
	id: string;
	question: string;
	answer: string;
}

interface StepItem {
	id: string;
	name: string;
	text: string;
}

export default function SchemaGenerator() {
	const [schemaType, setSchemaType] = useState<SchemaType>('Article');
	const [copied, setCopied] = useState(false);

	// Article fields
	const [artTitle, setArtTitle] = useState('10 Frontend Performance Optimizations for 2026');
	const [artAuthor, setArtAuthor] = useState('Joey Jazwinski');
	const [artPublisher, setArtPublisher] = useState('Joey Jazwinski');
	const [artDate, setArtDate] = useState('2026-09-14');
	const [artImage, setArtImage] = useState('https://joeyjazwinski.com/ogimage.png');

	// Local Business fields
	const [busName, setBusName] = useState('Joey Jazwinski Studio');
	const [busAddress, setBusAddress] = useState('123 Innovation Way');
	const [busPhone, setBusPhone] = useState('+1 (555) 019-2834');
	const [busUrl, setBusUrl] = useState('https://joeyjazwinski.com');
	const [busImage, setBusImage] = useState('https://joeyjazwinski.com/ogimage.png');

	// FAQ fields
	const [faqItems, setFaqItems] = useState<FaqItem[]>([
		{
			id: '1',
			question: 'Are all developer tools client-side?',
			answer: 'Yes, all computations run 100% inside your browser with zero server latency or data collection.',
		},
		{
			id: '2',
			question: 'Can I export schemas directly into HTML?',
			answer: 'You can copy the generated JSON-LD script block and paste it directly into your HTML head.',
		},
	]);

	// Recipe fields
	const [recName, setRecName] = useState('Classic Artisanal Sourdough Bread');
	const [recImage, setRecImage] = useState('https://images.unsplash.com/photo-1589367920969-ab8e050bbb04');
	const [recAuthor, setRecAuthor] = useState('Baker Chef');
	const [recPrepTime, setRecPrepTime] = useState('PT30M');
	const [recCookTime, setRecCookTime] = useState('PT45M');
	const [recYield, setRecYield] = useState('1 loaf');
	const [recIngredients, setRecIngredients] = useState<string[]>([
		'500g bread flour',
		'350g lukewarm water',
		'100g active sourdough starter',
		'10g sea salt',
	]);
	const [recInstructions, setRecInstructions] = useState<string[]>([
		'Mix flour and water, then rest for 30 minutes (autolyse).',
		'Incorporate active starter and salt, folding the dough gently.',
		'Bulk ferment for 4 hours with stretch-and-folds every 30 minutes.',
		'Bake in a preheated Dutch oven at 450°F for 20 minutes covered, then 20 minutes uncovered.',
	]);

	// Event fields
	const [evtName, setEvtName] = useState('Modern Web Architecture Summit 2026');
	const [evtStartDate, setEvtStartDate] = useState('2026-10-15T09:00:00-04:00');
	const [evtEndDate, setEvtEndDate] = useState('2026-10-16T17:00:00-04:00');
	const [evtVenue, setEvtVenue] = useState('Tech Innovation Center');
	const [evtAddress, setEvtAddress] = useState('742 Evergreen Terrace, Tech City');
	const [evtUrl, setEvtUrl] = useState('https://example.com/summit-2026');

	// HowTo fields
	const [howName, setHowName] = useState('How to Set Up Local Web Crypto Signatures');
	const [howDesc, setHowDesc] = useState('A step-by-step tutorial on generating HMAC signatures natively in JavaScript.');
	const [howSteps, setHowSteps] = useState<StepItem[]>([
		{ id: 's1', name: 'Encode Secret Key', text: 'Convert UTF-8 secret string into Uint8Array using TextEncoder.' },
		{ id: 's2', name: 'Import CryptoKey', text: 'Call window.crypto.subtle.importKey with HMAC-SHA256 algorithm parameters.' },
		{ id: 's3', name: 'Generate Signature', text: 'Call crypto.subtle.sign to produce cryptographic authentication tags.' },
	]);

	// Construct JSON object
	const schemaObject = useMemo(() => {
		const base: Record<string, any> = {
			'@context': 'https://schema.org',
		};

		if (schemaType === 'Article') {
			base['@type'] = 'Article';
			base['headline'] = artTitle;
			if (artAuthor) base['author'] = { '@type': 'Person', name: artAuthor };
			if (artPublisher) base['publisher'] = { '@type': 'Organization', name: artPublisher };
			if (artDate) base['datePublished'] = artDate;
			if (artImage) base['image'] = artImage;
		} else if (schemaType === 'LocalBusiness') {
			base['@type'] = 'LocalBusiness';
			base['name'] = busName;
			if (busAddress) base['address'] = { '@type': 'PostalAddress', streetAddress: busAddress };
			if (busPhone) base['telephone'] = busPhone;
			if (busUrl) base['url'] = busUrl;
			if (busImage) base['image'] = busImage;
		} else if (schemaType === 'FAQPage') {
			base['@type'] = 'FAQPage';
			base['mainEntity'] = faqItems
				.filter((i) => i.question.trim())
				.map((i) => ({
					'@type': 'Question',
					name: i.question,
					acceptedAnswer: { '@type': 'Answer', text: i.answer },
				}));
		} else if (schemaType === 'Recipe') {
			base['@type'] = 'Recipe';
			base['name'] = recName;
			if (recImage) base['image'] = [recImage];
			if (recAuthor) base['author'] = { '@type': 'Person', name: recAuthor };
			if (recPrepTime) base['prepTime'] = recPrepTime;
			if (recCookTime) base['cookTime'] = recCookTime;
			if (recYield) base['recipeYield'] = recYield;
			base['recipeIngredient'] = recIngredients.filter(Boolean);
			base['recipeInstructions'] = recInstructions.filter(Boolean).map((step, idx) => ({
				'@type': 'HowToStep',
				text: step,
			}));
		} else if (schemaType === 'Event') {
			base['@type'] = 'Event';
			base['name'] = evtName;
			if (evtStartDate) base['startDate'] = evtStartDate;
			if (evtEndDate) base['endDate'] = evtEndDate;
			base['location'] = {
				'@type': 'Place',
				name: evtVenue,
				address: { '@type': 'PostalAddress', streetAddress: evtAddress },
			};
			if (evtUrl) base['url'] = evtUrl;
		} else if (schemaType === 'HowTo') {
			base['@type'] = 'HowTo';
			base['name'] = howName;
			if (howDesc) base['description'] = howDesc;
			base['step'] = howSteps.filter((s) => s.text.trim()).map((s, idx) => ({
				'@type': 'HowToStep',
				position: idx + 1,
				name: s.name || `Step ${idx + 1}`,
				text: s.text,
			}));
		}

		return base;
	}, [
		schemaType,
		artTitle, artAuthor, artPublisher, artDate, artImage,
		busName, busAddress, busPhone, busUrl, busImage,
		faqItems,
		recName, recImage, recAuthor, recPrepTime, recCookTime, recYield, recIngredients, recInstructions,
		evtName, evtStartDate, evtEndDate, evtVenue, evtAddress, evtUrl,
		howName, howDesc, howSteps,
	]);

	const jsonString = useMemo(() => JSON.stringify(schemaObject, null, 2), [schemaObject]);
	const fullTagString = useMemo(
		() => `<script type="application/ld+json">\n${jsonString}\n</script>`,
		[jsonString],
	);

	// Validation issues
	const validationIssues = useMemo(
		() => validateSchema(schemaType, schemaObject),
		[schemaType, schemaObject],
	);

	const handleCopy = () => {
		navigator.clipboard.writeText(fullTagString);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	const handleDownload = () => {
		const blob = new Blob([jsonString], { type: 'application/ld+json' });
		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = `${schemaType.toLowerCase()}-schema.json`;
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
		URL.revokeObjectURL(url);
	};

	return (
		<>
			<NextSeo
				title="Schema.org JSON-LD Generator & Rich Snippet Validator"
				description="Generate validated Schema.org JSON-LD structured data for Articles, Recipes, Events, HowTo guides, FAQs, and Local Businesses to win Google Rich Results."
				canonical="https://joeyjazwinski.com/developer-tools/schema-generator"
				openGraph={{
					title: 'Schema.org JSON-LD Generator & Rich Snippet Validator',
					description:
						'Generate validated Schema.org JSON-LD structured data for Articles, Recipes, Events, HowTo guides, FAQs, and Local Businesses to win Google Rich Results.',
					url: 'https://joeyjazwinski.com/developer-tools/schema-generator',
					type: 'website',
					images: [
						{
							url: 'https://joeyjazwinski.com/ogimage.png',
							width: 1200,
							height: 630,
							alt: 'JSON-LD Schema.org Generator',
						},
					],
				}}
				twitter={{
					handle: '@JoeyJazwinski',
					site: '@JoeyJazwinski',
					cardType: 'summary_large_image',
				}}
			/>
			<ToolJsonLd
				name="JSON-LD Schema.org Generator"
				description="Generate validated Schema.org JSON-LD structured data for Articles, Recipes, Events, HowTo guides, FAQs, and Local Businesses to win Google Rich Results."
				url="https://joeyjazwinski.com/developer-tools/schema-generator"
				category="DeveloperApplication"
			/>
			<main className="bg-background pt-32 pb-16 px-4 sm:px-6 lg:px-8 text-foreground">
				<div className="max-w-6xl mx-auto space-y-8">
					{/* Header */}
					<div className="text-center space-y-4 max-w-2xl mx-auto">
						<div className="inline-flex p-3 rounded-2xl bg-primary/10 text-primary border border-primary/20">
							<Database className="w-8 h-8" />
						</div>
						<h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl bg-linear-to-r from-primary via-violet-500 to-indigo-500 bg-clip-text text-transparent">
							JSON-LD Schema Generator
						</h1>
						<p className="text-muted-foreground text-lg">
							Generate Schema.org structured data templates. Validate fields
							in real time for Google Rich Results.
						</p>
					</div>

					{/* Schema Selector Tabs */}
					<div className="flex flex-wrap items-center justify-center gap-2 p-1.5 rounded-2xl bg-secondary/60 border border-border max-w-3xl mx-auto">
						{(['Article', 'LocalBusiness', 'FAQPage', 'Recipe', 'Event', 'HowTo'] as const).map((t) => (
							<button
								key={t}
								type="button"
								onClick={() => setSchemaType(t)}
								className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
									schemaType === t
										? 'bg-card text-foreground shadow-sm'
										: 'text-muted-foreground hover:text-foreground'
								}`}
							>
								{t === 'LocalBusiness'
									? 'Local Business'
									: t === 'FAQPage'
									? 'FAQ Page'
									: t === 'HowTo'
									? 'How-To Guide'
									: t}
							</button>
						))}
					</div>

					{/* Workspace */}
					<div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
						{/* Left: Input Form */}
						<div className="lg:col-span-6 bg-card border border-border rounded-2xl p-6 shadow-xl space-y-5">
							<div className="flex items-center justify-between pb-2 border-b border-border/50">
								<h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
									{schemaType} Properties
								</h2>
								<span className="text-xs font-mono text-primary font-bold">
									@type: {schemaType}
								</span>
							</div>

							{/* ARTICLE FORM */}
							{schemaType === 'Article' && (
								<div className="space-y-3 text-xs">
									<div>
										<label className="font-semibold text-foreground block mb-1">Headline</label>
										<input
											type="text"
											className="w-full p-2.5 rounded-lg border border-border bg-background focus:ring-1 focus:ring-primary focus:outline-none"
											value={artTitle}
											onChange={(e) => setArtTitle(e.target.value)}
										/>
									</div>
									<div className="grid grid-cols-2 gap-3">
										<div>
											<label className="font-semibold text-foreground block mb-1">Author</label>
											<input
												type="text"
												className="w-full p-2.5 rounded-lg border border-border bg-background focus:ring-1 focus:ring-primary focus:outline-none"
												value={artAuthor}
												onChange={(e) => setArtAuthor(e.target.value)}
											/>
										</div>
										<div>
											<label className="font-semibold text-foreground block mb-1">Publisher</label>
											<input
												type="text"
												className="w-full p-2.5 rounded-lg border border-border bg-background focus:ring-1 focus:ring-primary focus:outline-none"
												value={artPublisher}
												onChange={(e) => setArtPublisher(e.target.value)}
											/>
										</div>
									</div>
									<div className="grid grid-cols-2 gap-3">
										<div>
											<label className="font-semibold text-foreground block mb-1">Date Published</label>
											<input
												type="date"
												className="w-full p-2.5 rounded-lg border border-border bg-background focus:ring-1 focus:ring-primary focus:outline-none"
												value={artDate}
												onChange={(e) => setArtDate(e.target.value)}
											/>
										</div>
										<div>
											<label className="font-semibold text-foreground block mb-1">Lead Image URL</label>
											<input
												type="url"
												className="w-full p-2.5 rounded-lg border border-border bg-background focus:ring-1 focus:ring-primary focus:outline-none"
												value={artImage}
												onChange={(e) => setArtImage(e.target.value)}
											/>
										</div>
									</div>
								</div>
							)}

							{/* LOCAL BUSINESS FORM */}
							{schemaType === 'LocalBusiness' && (
								<div className="space-y-3 text-xs">
									<div>
										<label className="font-semibold text-foreground block mb-1">Business Name</label>
										<input
											type="text"
											className="w-full p-2.5 rounded-lg border border-border bg-background focus:ring-1 focus:ring-primary focus:outline-none"
											value={busName}
											onChange={(e) => setBusName(e.target.value)}
										/>
									</div>
									<div>
										<label className="font-semibold text-foreground block mb-1">Street Address</label>
										<input
											type="text"
											className="w-full p-2.5 rounded-lg border border-border bg-background focus:ring-1 focus:ring-primary focus:outline-none"
											value={busAddress}
											onChange={(e) => setBusAddress(e.target.value)}
										/>
									</div>
									<div className="grid grid-cols-2 gap-3">
										<div>
											<label className="font-semibold text-foreground block mb-1">Telephone</label>
											<input
												type="tel"
												className="w-full p-2.5 rounded-lg border border-border bg-background focus:ring-1 focus:ring-primary focus:outline-none"
												value={busPhone}
												onChange={(e) => setBusPhone(e.target.value)}
											/>
										</div>
										<div>
											<label className="font-semibold text-foreground block mb-1">Website URL</label>
											<input
												type="url"
												className="w-full p-2.5 rounded-lg border border-border bg-background focus:ring-1 focus:ring-primary focus:outline-none"
												value={busUrl}
												onChange={(e) => setBusUrl(e.target.value)}
											/>
										</div>
									</div>
									<div>
										<label className="font-semibold text-foreground block mb-1">Storefront Image URL</label>
										<input
											type="url"
											className="w-full p-2.5 rounded-lg border border-border bg-background focus:ring-1 focus:ring-primary focus:outline-none"
											value={busImage}
											onChange={(e) => setBusImage(e.target.value)}
										/>
									</div>
								</div>
							)}

							{/* FAQ FORM */}
							{schemaType === 'FAQPage' && (
								<div className="space-y-4 text-xs">
									<div className="flex justify-between items-center">
										<span className="font-bold text-foreground">Questions ({faqItems.length})</span>
										<button
											type="button"
											onClick={() =>
												setFaqItems([
													...faqItems,
													{ id: Math.random().toString(), question: '', answer: '' },
												])
											}
											className="text-xs font-semibold text-primary hover:underline flex items-center gap-1 cursor-pointer"
										>
											<Plus className="w-3.5 h-3.5" /> Add Question
										</button>
									</div>

									<div className="space-y-3 max-h-96 overflow-y-auto pr-1">
										{faqItems.map((item, idx) => (
											<div key={item.id} className="p-3 border border-border rounded-xl bg-background/50 space-y-2">
												<div className="flex justify-between items-center">
													<span className="font-bold text-muted-foreground">Q#{idx + 1}</span>
													<button
														type="button"
														onClick={() => setFaqItems(faqItems.filter((i) => i.id !== item.id))}
														className="text-rose-500 hover:bg-rose-500/10 p-1 rounded transition cursor-pointer"
													>
														<Trash className="w-3.5 h-3.5" />
													</button>
												</div>
												<input
													type="text"
													className="w-full p-2 rounded-lg border border-border bg-background focus:ring-1 focus:ring-primary focus:outline-none"
													value={item.question}
													onChange={(e) =>
														setFaqItems(
															faqItems.map((i) => (i.id === item.id ? { ...i, question: e.target.value } : i)),
														)
													}
													placeholder="Question text"
												/>
												<textarea
													rows={2}
													className="w-full p-2 rounded-lg border border-border bg-background focus:ring-1 focus:ring-primary focus:outline-none"
													value={item.answer}
													onChange={(e) =>
														setFaqItems(
															faqItems.map((i) => (i.id === item.id ? { ...i, answer: e.target.value } : i)),
														)
													}
													placeholder="Answer details"
												/>
											</div>
										))}
									</div>
								</div>
							)}

							{/* RECIPE FORM */}
							{schemaType === 'Recipe' && (
								<div className="space-y-3 text-xs">
									<div>
										<label className="font-semibold text-foreground block mb-1">Recipe Name</label>
										<input
											type="text"
											className="w-full p-2.5 rounded-lg border border-border bg-background focus:ring-1 focus:ring-primary focus:outline-none"
											value={recName}
											onChange={(e) => setRecName(e.target.value)}
										/>
									</div>
									<div className="grid grid-cols-2 gap-3">
										<div>
											<label className="font-semibold text-foreground block mb-1">Photo Image URL</label>
											<input
												type="url"
												className="w-full p-2.5 rounded-lg border border-border bg-background focus:ring-1 focus:ring-primary focus:outline-none"
												value={recImage}
												onChange={(e) => setRecImage(e.target.value)}
											/>
										</div>
										<div>
											<label className="font-semibold text-foreground block mb-1">Yield / Portions</label>
											<input
												type="text"
												className="w-full p-2.5 rounded-lg border border-border bg-background focus:ring-1 focus:ring-primary focus:outline-none"
												value={recYield}
												onChange={(e) => setRecYield(e.target.value)}
											/>
										</div>
									</div>
									<div className="grid grid-cols-2 gap-3">
										<div>
											<label className="font-semibold text-foreground block mb-1">Prep Time (ISO 8601)</label>
											<input
												type="text"
												className="w-full p-2.5 rounded-lg border border-border bg-background font-mono focus:ring-1 focus:ring-primary focus:outline-none"
												value={recPrepTime}
												onChange={(e) => setRecPrepTime(e.target.value)}
												placeholder="PT30M"
											/>
										</div>
										<div>
											<label className="font-semibold text-foreground block mb-1">Cook Time (ISO 8601)</label>
											<input
												type="text"
												className="w-full p-2.5 rounded-lg border border-border bg-background font-mono focus:ring-1 focus:ring-primary focus:outline-none"
												value={recCookTime}
												onChange={(e) => setRecCookTime(e.target.value)}
												placeholder="PT45M"
											/>
										</div>
									</div>
									<div>
										<div className="flex justify-between items-center mb-1">
											<label className="font-semibold text-foreground">Ingredients (1 per line)</label>
										</div>
										<textarea
											rows={3}
											className="w-full p-2.5 rounded-lg border border-border bg-background focus:ring-1 focus:ring-primary focus:outline-none font-mono"
											value={recIngredients.join('\n')}
											onChange={(e) => setRecIngredients(e.target.value.split('\n'))}
										/>
									</div>
								</div>
							)}

							{/* EVENT FORM */}
							{schemaType === 'Event' && (
								<div className="space-y-3 text-xs">
									<div>
										<label className="font-semibold text-foreground block mb-1">Event Name</label>
										<input
											type="text"
											className="w-full p-2.5 rounded-lg border border-border bg-background focus:ring-1 focus:ring-primary focus:outline-none"
											value={evtName}
											onChange={(e) => setEvtName(e.target.value)}
										/>
									</div>
									<div className="grid grid-cols-2 gap-3">
										<div>
											<label className="font-semibold text-foreground block mb-1">Start Date / Time</label>
											<input
												type="text"
												className="w-full p-2.5 rounded-lg border border-border bg-background font-mono focus:ring-1 focus:ring-primary focus:outline-none"
												value={evtStartDate}
												onChange={(e) => setEvtStartDate(e.target.value)}
											/>
										</div>
										<div>
											<label className="font-semibold text-foreground block mb-1">End Date / Time</label>
											<input
												type="text"
												className="w-full p-2.5 rounded-lg border border-border bg-background font-mono focus:ring-1 focus:ring-primary focus:outline-none"
												value={evtEndDate}
												onChange={(e) => setEvtEndDate(e.target.value)}
											/>
										</div>
									</div>
									<div className="grid grid-cols-2 gap-3">
										<div>
											<label className="font-semibold text-foreground block mb-1">Venue Name</label>
											<input
												type="text"
												className="w-full p-2.5 rounded-lg border border-border bg-background focus:ring-1 focus:ring-primary focus:outline-none"
												value={evtVenue}
												onChange={(e) => setEvtVenue(e.target.value)}
											/>
										</div>
										<div>
											<label className="font-semibold text-foreground block mb-1">Address</label>
											<input
												type="text"
												className="w-full p-2.5 rounded-lg border border-border bg-background focus:ring-1 focus:ring-primary focus:outline-none"
												value={evtAddress}
												onChange={(e) => setEvtAddress(e.target.value)}
											/>
										</div>
									</div>
								</div>
							)}

							{/* HOW-TO FORM */}
							{schemaType === 'HowTo' && (
								<div className="space-y-3 text-xs">
									<div>
										<label className="font-semibold text-foreground block mb-1">Guide Name</label>
										<input
											type="text"
											className="w-full p-2.5 rounded-lg border border-border bg-background focus:ring-1 focus:ring-primary focus:outline-none"
											value={howName}
											onChange={(e) => setHowName(e.target.value)}
										/>
									</div>
									<div>
										<label className="font-semibold text-foreground block mb-1">Overview Description</label>
										<textarea
											rows={2}
											className="w-full p-2.5 rounded-lg border border-border bg-background focus:ring-1 focus:ring-primary focus:outline-none"
											value={howDesc}
											onChange={(e) => setHowDesc(e.target.value)}
										/>
									</div>
									<div className="space-y-2">
										<div className="flex justify-between items-center">
											<span className="font-bold text-foreground">Steps ({howSteps.length})</span>
											<button
												type="button"
												onClick={() =>
													setHowSteps([
														...howSteps,
														{ id: Math.random().toString(), name: '', text: '' },
													])
												}
												className="text-primary hover:underline flex items-center gap-1 cursor-pointer font-semibold"
											>
												<Plus className="w-3.5 h-3.5" /> Add Step
											</button>
										</div>
										{howSteps.map((s, idx) => (
											<div key={s.id} className="p-3 border border-border rounded-xl bg-background/50 space-y-2">
												<div className="flex justify-between items-center">
													<span className="font-bold text-muted-foreground">Step #{idx + 1}</span>
													<button
														type="button"
														onClick={() => setHowSteps(howSteps.filter((x) => x.id !== s.id))}
														className="text-rose-500 hover:bg-rose-500/10 p-1 rounded transition cursor-pointer"
													>
														<Trash className="w-3.5 h-3.5" />
													</button>
												</div>
												<input
													type="text"
													className="w-full p-2 rounded-lg border border-border bg-background focus:ring-1 focus:ring-primary focus:outline-none"
													value={s.name}
													onChange={(e) =>
														setHowSteps(
															howSteps.map((x) => (x.id === s.id ? { ...x, name: e.target.value } : x)),
														)
													}
													placeholder="Step title"
												/>
												<textarea
													rows={2}
													className="w-full p-2 rounded-lg border border-border bg-background focus:ring-1 focus:ring-primary focus:outline-none"
													value={s.text}
													onChange={(e) =>
														setHowSteps(
															howSteps.map((x) => (x.id === s.id ? { ...x, text: e.target.value } : x)),
														)
													}
													placeholder="Instructions for this step..."
												/>
											</div>
										))}
									</div>
								</div>
							)}

							{/* Real-time validation audit summary */}
							<div className="pt-3 border-t border-border/50 space-y-2">
								<span className="text-xs font-bold uppercase tracking-wider text-muted-foreground block">
									Schema.org Validation
								</span>
								{validationIssues.length === 0 ? (
									<div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-600 dark:text-emerald-400 font-medium">
										<CheckCircle2 className="w-4 h-4 shrink-0" />
										<span>All required fields for Google Rich Results are present.</span>
									</div>
								) : (
									<div className="space-y-1.5">
										{validationIssues.map((issue, idx) => (
											<div
												key={idx}
												className={`flex items-start gap-2 p-2.5 rounded-xl border text-xs ${
													issue.severity === 'error'
														? 'bg-rose-500/10 border-rose-500/20 text-rose-600 dark:text-rose-400'
														: 'bg-amber-500/10 border-amber-500/20 text-amber-600 dark:text-amber-400'
												}`}
											>
												{issue.severity === 'error' ? (
													<AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
												) : (
													<AlertTriangle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
												)}
												<span>{issue.message}</span>
											</div>
										))}
									</div>
								)}
							</div>
						</div>

						{/* Right: Output Code */}
						<div className="lg:col-span-6 bg-card border border-border rounded-2xl p-6 shadow-xl space-y-4 flex flex-col justify-between min-h-125">
							<div className="space-y-3 flex-1 flex flex-col">
								<div className="flex justify-between items-center pb-2 border-b border-border/50">
									<h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
										JSON-LD Markup Tag
									</h2>

									<div className="flex items-center gap-2">
										<button
											onClick={handleCopy}
											className="p-1.5 rounded-lg bg-background border border-border hover:bg-secondary text-foreground text-xs flex items-center gap-1 font-medium transition cursor-pointer"
										>
											{copied ? (
												<>
													<Check className="w-3.5 h-3.5 text-emerald-500" />
													<span>Copied</span>
												</>
											) : (
												<>
													<Copy className="w-3.5 h-3.5" />
													<span>Copy Code</span>
												</>
											)}
										</button>

										<button
											onClick={handleDownload}
											className="p-1.5 rounded-lg bg-background border border-border hover:bg-secondary text-foreground text-xs flex items-center gap-1 font-medium transition cursor-pointer"
										>
											<Download className="w-3.5 h-3.5" />
											<span>Save .json</span>
										</button>
									</div>
								</div>

								<pre className="w-full flex-1 p-4 rounded-xl border border-border bg-background/60 font-mono text-xs overflow-auto select-all whitespace-pre shadow-inner min-h-80">
									{fullTagString}
								</pre>
							</div>

							<div className="pt-2 border-t border-border/40 flex items-center justify-between text-xs text-muted-foreground">
								<span>Format: JSON-LD script block</span>
								<a
									href="https://search.google.com/test/rich-results"
									target="_blank"
									rel="noreferrer"
									className="inline-flex items-center gap-1 text-primary hover:underline font-medium"
								>
									<span>Google Rich Results Test</span>
									<ExternalLink className="w-3 h-3" />
								</a>
							</div>
						</div>
					</div>
				</div>
			</main>
		</>
	);
}
