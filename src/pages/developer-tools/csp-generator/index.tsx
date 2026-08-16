import { useState } from 'react';
import { NextSeo } from 'next-seo';
import { Shield, Copy, Check } from 'lucide-react';

export default function CspGenerator() {
	const [self, setSelf] = useState(true);
	const [unsafeEval, setUnsafeEval] = useState(false);
	const [copied, setCopied] = useState(false);

	const getCsp = () => {
		let directives = [];
		if (self) directives.push("'self'");
		if (unsafeEval) directives.push("'unsafe-eval'");
		return `Content-Security-Policy: default-src ${directives.join(' ') || "'none'"};`;
	};

	const handleCopy = () => {
		navigator.clipboard.writeText(getCsp());
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	return (
		<>
			<NextSeo
				title="Content Security Policy (CSP) Header Builder - Joey Jazwinski"
				description="Visually generate safe CSP headers client-side to protect your web application against XSS vulnerabilities."
			/>
			<main className="min-h-screen bg-background pt-32 pb-16 px-4 sm:px-6 lg:px-8 text-foreground">
				<div className="max-w-4xl mx-auto space-y-8">
					<div className="text-center space-y-4 max-w-2xl mx-auto">
						<div className="inline-flex p-3 rounded-2xl bg-primary/10 text-primary border border-primary/20">
							<Shield className="w-8 h-8" />
						</div>
						<h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl bg-linear-to-r from-primary to-indigo-500 bg-clip-text text-transparent">
							Content Security Policy Builder
						</h1>
						<p className="text-muted-foreground text-lg">
							Generate robust CSP rules for your Next.js project or NGINX configurations.
						</p>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div className="bg-card border border-border rounded-2xl p-6 shadow-xl space-y-4">
							<h2 className="text-lg font-bold">Directives</h2>
							<div className="space-y-2">
								<div className="flex items-center gap-2">
									<input id="self-checkbox" type="checkbox" checked={self} onChange={(e) => setSelf(e.target.checked)} />
									<label htmlFor="self-checkbox" className="text-xs font-semibold">Allow 'self' (local domain)</label>
								</div>
								<div className="flex items-center gap-2">
									<input id="eval-checkbox" type="checkbox" checked={unsafeEval} onChange={(e) => setUnsafeEval(e.target.checked)} />
									<label htmlFor="eval-checkbox" className="text-xs font-semibold">Allow 'unsafe-eval' (JS execution)</label>
								</div>
							</div>
						</div>

						<div className="bg-card border border-border rounded-2xl p-6 shadow-xl flex flex-col justify-between space-y-4">
							<div>
								<div className="flex justify-between items-center mb-4">
									<h2 className="text-lg font-bold">Policy Header</h2>
									<button onClick={handleCopy} className="p-2 rounded-lg border hover:bg-secondary">
										{copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
									</button>
								</div>
								<pre className="p-4 rounded-xl border bg-background text-xs font-mono text-primary break-all whitespace-pre-wrap">
									{getCsp()}
								</pre>
							</div>
						</div>
					</div>
				</div>
			</main>
		</>
	);
}