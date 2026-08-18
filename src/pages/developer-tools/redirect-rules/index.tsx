import { useState } from 'react';
import { NextSeo } from 'next-seo';
import { RefreshCw, Copy, Check } from 'lucide-react';

export default function RedirectRulesGenerator() {
	const [type, setType] = useState<'301' | '302'>('301');
	const [server, setServer] = useState<'nginx' | 'apache' | 'nextjs' | 'iis'>(
		'nginx',
	);
	const [source, setSource] = useState('/old-path');
	const [destination, setDestination] = useState(
		'https://example.com/new-path',
	);
	const [copied, setCopied] = useState(false);

	const generateRules = () => {
		const src = source.trim() || '/old-path';
		const dest = destination.trim() || 'https://example.com/new-path';
		const isPermanent = type === '301';

		if (server === 'nginx') {
			return `# Nginx ${type} Redirect\nrewrite ^${src}$ ${dest} ${isPermanent ? 'permanent' : 'redirect'};`;
		}
		if (server === 'apache') {
			return `# Apache .htaccess ${type} Redirect\nRedirectMatch ${isPermanent ? '301' : '302'} ^${src}$ ${dest}`;
		}
		if (server === 'nextjs') {
			return `// Next.js config redirects array entry\n{\n  source: '${src}',\n  destination: '${dest}',\n  permanent: ${isPermanent},\n}`;
		}
		if (server === 'iis') {
			return `<!-- IIS Web.config Redirect -->\n<rule name="Redirect Rule" stopProcessing="true">\n  <match url="^${src.replace(/^\//, '')}$" />\n  <action type="Redirect" url="${dest}" redirectType="${isPermanent ? 'Permanent' : 'Found'}" />\n</rule>`;
		}
		return '';
	};

	const handleCopy = () => {
		navigator.clipboard.writeText(generateRules());
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	return (
		<>
			<NextSeo
				title="Redirect Rules Generator - Joey Jazwinski"
				description="Generate 301 and 302 redirect rules. Export custom configuration snippets for Nginx, Apache, Next.js, and IIS."
			/>
			<main className="min-h-screen bg-background pt-32 pb-16 px-4 sm:px-6 lg:px-8 text-foreground animate-fade-in">
				<div className="max-w-4xl mx-auto space-y-12">
					{/* Header */}
					<div className="text-center space-y-4 max-w-2xl mx-auto">
						<div className="inline-flex p-3 rounded-2xl bg-primary/10 text-primary border border-primary/20">
							<RefreshCw className="w-8 h-8" />
						</div>
						<h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl bg-linear-to-r from-primary to-orange-500 bg-clip-text text-transparent">
							Redirect Rules Generator
						</h1>
						<p className="text-muted-foreground text-lg">
							Create server rewrite configurations. Generate clean
							redirect rules blocks instantly.
						</p>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-12 gap-8">
						{/* Configuration Form */}
						<div className="md:col-span-7 bg-card border border-border/80 rounded-2xl p-6 shadow-xl space-y-5">
							<h2 className="text-lg font-bold border-b border-border/40 pb-2">
								Rule Parameters
							</h2>

							<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
								<div>
									<label className="block text-xs font-semibold mb-2">
										Redirect Type
									</label>
									<div className="flex gap-2">
										{(['301', '302'] as const).map((t) => (
											<button
												key={t}
												type="button"
												onClick={() => setType(t)}
												className={`flex-1 py-2 rounded-lg text-xs font-semibold border transition ${
													type === t
														? 'bg-primary text-primary-foreground border-transparent'
														: 'bg-background hover:bg-secondary text-muted-foreground'
												}`}
											>
												{t}{' '}
												{t === '301'
													? '(Permanent)'
													: '(Temporary)'}
											</button>
										))}
									</div>
								</div>

								<div>
									<label className="block text-xs font-semibold mb-2">
										Server Platform
									</label>
									<select
										className="w-full p-2 rounded-lg border bg-background text-xs focus:ring-1 focus:ring-primary"
										value={server}
										onChange={(e) =>
											setServer(e.target.value as any)
										}
									>
										<option value="nginx">
											Nginx Server
										</option>
										<option value="apache">
											Apache (.htaccess)
										</option>
										<option value="nextjs">
											Next.js Config
										</option>
										<option value="iis">
											IIS (web.config)
										</option>
									</select>
								</div>
							</div>

							<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-border/40 pt-4">
								<div>
									<label className="block text-xs font-semibold mb-1">
										Source Path (Regex)
									</label>
									<input
										type="text"
										className="w-full p-2.5 rounded-lg border bg-background text-xs focus:ring-1 focus:ring-primary"
										value={source}
										onChange={(e) =>
											setSource(e.target.value)
										}
										placeholder="e.g. /old-path"
									/>
								</div>

								<div>
									<label className="block text-xs font-semibold mb-1">
										Destination URL / Path
									</label>
									<input
										type="text"
										className="w-full p-2.5 rounded-lg border bg-background text-xs focus:ring-1 focus:ring-primary"
										value={destination}
										onChange={(e) =>
											setDestination(e.target.value)
										}
										placeholder="e.g. https://example.com/new-path"
									/>
								</div>
							</div>
						</div>

						{/* Output Workspace */}
						<div className="md:col-span-5 bg-card border border-border/80 rounded-2xl p-6 shadow-xl flex flex-col justify-between min-h-62.5">
							<div className="space-y-4 flex-1 flex flex-col">
								<div className="flex justify-between items-center border-b border-border/40 pb-2">
									<h2 className="text-base font-bold">
										Rule Output
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
												Copy
											</>
										)}
									</button>
								</div>

								<div className="flex-1 min-h-30 bg-background border border-border rounded-xl p-4 font-mono text-[11px] overflow-auto select-all whitespace-pre">
									{generateRules()}
								</div>
							</div>
						</div>
					</div>
				</div>
			</main>
		</>
	);
}
