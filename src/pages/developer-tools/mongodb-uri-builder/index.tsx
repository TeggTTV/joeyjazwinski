import { useState, useEffect } from 'react';
import Link from 'next/link';
import { NextSeo } from 'next-seo';
import ToolJsonLd from '@/components/seo/ToolJsonLd';
import ToolFaqSection from '@/components/tools/ToolFaqSection';
import { Braces, Copy, Check } from 'lucide-react';

const MONGO_URI_FAQS = [
	{
		question: 'What is the difference between standard mongodb:// and mongodb+srv:// URIs?',
		answer: 'Standard mongodb:// URIs list individual replica set hostnames and port numbers explicitly. The mongodb+srv:// protocol uses DNS SRV records to discover replica set members dynamically, which simplifies cluster configuration in hosted services like MongoDB Atlas.',
	},
	{
		question: 'Are my database credentials stored or sent to a server?',
		answer: 'No. All URI string concatenation, parameter encoding, and credential formatting execute entirely client-side in your web browser. Nothing is sent across the network.',
	},
	{
		question: 'How should special characters in database passwords be handled?',
		answer: 'Special characters such as @, :, /, and % inside database usernames or passwords must be percent-encoded (URL encoded). This builder automatically encodes them to prevent connection errors.',
	},
];

export default function MongoDbUriBuilder() {
	const [host, setHost] = useState('localhost');
	const [port, setPort] = useState('27017');
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [database, setDatabase] = useState('test');
	const [srv, setSrv] = useState(false);
	const [uri, setUri] = useState('');
	const [copied, setCopied] = useState(false);

	useEffect(() => {
		const credentials = username
			? `${encodeURIComponent(username)}:${encodeURIComponent(password)}@`
			: '';
		const protocol = srv ? 'mongodb+srv://' : 'mongodb://';
		const portPart = srv ? '' : `:${port}`;
		const dbPart = database ? `/${database}` : '';
		setUri(`${protocol}${credentials}${host}${portPart}${dbPart}`);
	}, [host, port, username, password, database, srv]);

	const handleCopy = () => {
		navigator.clipboard.writeText(uri);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	return (
		<>
			<NextSeo
				title="MongoDB Connection String & URI Builder - Joey Jazwinski"
				description="Construct, format, and test valid MongoDB and MongoDB Atlas connection URIs with custom auth credentials, replica sets, and query parameters."
				canonical="https://joeyjazwinski.com/developer-tools/mongodb-uri-builder"
				openGraph={{
					title: 'MongoDB Connection String & URI Builder - Joey Jazwinski',
					description:
						'Construct, format, and test valid MongoDB and MongoDB Atlas connection URIs with custom auth credentials, replica sets, and query parameters.',
					url: 'https://joeyjazwinski.com/developer-tools/mongodb-uri-builder',
					type: 'website',
					images: [
						{
							url: 'https://joeyjazwinski.com/ogimage.png',
							width: 1200,
							height: 630,
							alt: 'MongoDB Connection URI Builder',
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
				name="MongoDB Connection URI Builder"
				description="Construct, format, and test valid MongoDB and MongoDB Atlas connection URIs with custom auth credentials, replica sets, and query parameters."
				url="https://joeyjazwinski.com/developer-tools/mongodb-uri-builder"
				category="DeveloperApplication"
				faqs={MONGO_URI_FAQS}
			/>
			<main className="bg-background pt-32 pb-16 px-4 sm:px-6 lg:px-8 text-foreground">
				<div className="max-w-4xl mx-auto space-y-8">
					<div>
						<Link
							href="/developer-tools"
							className="inline-flex items-center text-xs font-semibold text-muted-foreground hover:text-primary transition mb-4"
						>
							← Back to all developer tools
						</Link>
					</div>

					<div className="text-center space-y-4 max-w-2xl mx-auto">
						<div className="inline-flex p-3 rounded-2xl bg-primary/10 text-primary border border-primary/20">
							<Braces className="w-8 h-8" />
						</div>
						<h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl bg-linear-to-r from-primary to-teal-500 bg-clip-text text-transparent">
							MongoDB URI Builder
						</h1>
						<p className="text-muted-foreground text-lg">
							Create safe MongoDB cluster URIs visually without
							connection syntax errors.
						</p>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div className="bg-card border border-border rounded-2xl p-6 shadow-xl space-y-4">
							<h2 className="text-lg font-bold">URI Settings</h2>

							<div className="flex items-center gap-2">
								<input
									id="srv-checkbox"
									type="checkbox"
									checked={srv}
									onChange={(e) => setSrv(e.target.checked)}
								/>
								<label
									htmlFor="srv-checkbox"
									className="text-xs font-semibold"
								>
									Enable SRV (MongoDB Atlas)
								</label>
							</div>

							<div className="grid grid-cols-2 gap-4">
								<div className="space-y-1">
									<label
										htmlFor="host-input"
										className="text-xs font-semibold text-muted-foreground"
									>
										Host
									</label>
									<input
										id="host-input"
										type="text"
										className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm"
										value={host}
										onChange={(e) =>
											setHost(e.target.value)
										}
									/>
								</div>
								{!srv && (
									<div className="space-y-1">
										<label
											htmlFor="port-input"
											className="text-xs font-semibold text-muted-foreground"
										>
											Port
										</label>
										<input
											id="port-input"
											type="text"
											className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm"
											value={port}
											onChange={(e) =>
												setPort(e.target.value)
											}
										/>
									</div>
								)}
							</div>

							<div className="grid grid-cols-2 gap-4">
								<div className="space-y-1">
									<label
										htmlFor="username-input"
										className="text-xs font-semibold text-muted-foreground"
									>
										Username
									</label>
									<input
										id="username-input"
										type="text"
										className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm"
										value={username}
										onChange={(e) =>
											setUsername(e.target.value)
										}
									/>
								</div>
								<div className="space-y-1">
									<label
										htmlFor="password-input"
										className="text-xs font-semibold text-muted-foreground"
									>
										Password
									</label>
									<input
										id="password-input"
										type="password"
										className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm"
										value={password}
										onChange={(e) =>
											setPassword(e.target.value)
										}
									/>
								</div>
							</div>

							<div className="space-y-1">
								<label
									htmlFor="database-input"
									className="text-xs font-semibold text-muted-foreground"
								>
									Database Name
								</label>
								<input
									id="database-input"
									type="text"
									className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm"
									value={database}
									onChange={(e) =>
										setDatabase(e.target.value)
									}
								/>
							</div>
						</div>

						<div className="bg-card border border-border rounded-2xl p-6 shadow-xl flex flex-col justify-between space-y-4">
							<div>
								<div className="flex justify-between items-center mb-4">
									<h2 className="text-lg font-bold">
										Connection URI
									</h2>
									<button
										onClick={handleCopy}
										className="p-2 rounded-lg hover:bg-secondary border border-border transition text-muted-foreground"
									>
										{copied ? (
											<Check className="w-4 h-4 text-emerald-500" />
										) : (
											<Copy className="w-4 h-4" />
										)}
									</button>
								</div>
								<pre className="p-4 rounded-xl border border-border bg-background text-xs font-mono break-all text-primary whitespace-pre-wrap">
									{uri}
								</pre>
							</div>
							<p className="text-xs text-muted-foreground">
								All credentials are encoded using standard URI
								parameters and processed completely locally.
							</p>
						</div>
					</div>

					<ToolFaqSection faqs={MONGO_URI_FAQS} />
				</div>
			</main>
		</>
	);
}
