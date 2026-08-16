import { useState, useEffect } from 'react';
import { NextSeo } from 'next-seo';
import { Braces, Copy, Check } from 'lucide-react';

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
		const credentials = username ? `${encodeURIComponent(username)}:${encodeURIComponent(password)}@` : '';
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
				title="MongoDB Connection String Builder & URI Parser - Joey Jazwinski"
				description="Visually build or format your MongoDB and MongoDB Atlas connection string URIs client-side."
			/>
			<main className="min-h-screen bg-background pt-32 pb-16 px-4 sm:px-6 lg:px-8 text-foreground">
				<div className="max-w-4xl mx-auto space-y-8">
					<div className="text-center space-y-4 max-w-2xl mx-auto">
						<div className="inline-flex p-3 rounded-2xl bg-primary/10 text-primary border border-primary/20">
							<Braces className="w-8 h-8" />
						</div>
						<h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl bg-linear-to-r from-primary to-teal-500 bg-clip-text text-transparent">
							MongoDB URI Builder
						</h1>
						<p className="text-muted-foreground text-lg">
							Create safe MongoDB cluster URIs visually without connection syntax errors.
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
								<label htmlFor="srv-checkbox" className="text-xs font-semibold">Enable SRV (MongoDB Atlas)</label>
							</div>

							<div className="grid grid-cols-2 gap-4">
								<div className="space-y-1">
									<label htmlFor="host-input" className="text-xs font-semibold text-muted-foreground">Host</label>
									<input
										id="host-input"
										type="text"
										className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm"
										value={host}
										onChange={(e) => setHost(e.target.value)}
									/>
								</div>
								{!srv && (
									<div className="space-y-1">
										<label htmlFor="port-input" className="text-xs font-semibold text-muted-foreground">Port</label>
										<input
											id="port-input"
											type="text"
											className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm"
											value={port}
											onChange={(e) => setPort(e.target.value)}
										/>
									</div>
								)}
							</div>

							<div className="grid grid-cols-2 gap-4">
								<div className="space-y-1">
									<label htmlFor="username-input" className="text-xs font-semibold text-muted-foreground">Username</label>
									<input
										id="username-input"
										type="text"
										className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm"
										value={username}
										onChange={(e) => setUsername(e.target.value)}
									/>
								</div>
								<div className="space-y-1">
									<label htmlFor="password-input" className="text-xs font-semibold text-muted-foreground">Password</label>
									<input
										id="password-input"
										type="password"
										className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm"
										value={password}
										onChange={(e) => setPassword(e.target.value)}
									/>
								</div>
							</div>

							<div className="space-y-1">
								<label htmlFor="database-input" className="text-xs font-semibold text-muted-foreground">Database Name</label>
								<input
									id="database-input"
									type="text"
									className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm"
									value={database}
									onChange={(e) => setDatabase(e.target.value)}
								/>
							</div>
						</div>

						<div className="bg-card border border-border rounded-2xl p-6 shadow-xl flex flex-col justify-between space-y-4">
							<div>
								<div className="flex justify-between items-center mb-4">
									<h2 className="text-lg font-bold">Connection URI</h2>
									<button
										onClick={handleCopy}
										className="p-2 rounded-lg hover:bg-secondary border border-border transition text-muted-foreground"
									>
										{copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
									</button>
								</div>
								<pre className="p-4 rounded-xl border border-border bg-background text-xs font-mono break-all text-primary whitespace-pre-wrap">
									{uri}
								</pre>
							</div>
							<p className="text-xs text-muted-foreground">
								All credentials are encoded using standard URI parameters and processed completely locally.
							</p>
						</div>
					</div>
				</div>
			</main>
		</>
	);
}