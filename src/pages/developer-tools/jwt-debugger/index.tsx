import { useState, useEffect } from 'react';
import { NextSeo } from 'next-seo';
import ToolJsonLd from '@/components/seo/ToolJsonLd';
import { Key, ShieldCheck, ShieldAlert, Copy, Check } from 'lucide-react';

export default function JWTDebugger() {
	const [token, setToken] = useState('');
	const [header, setHeader] = useState('');
	const [payload, setPayload] = useState('');
	const [copied, setCopied] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [tokenStatus, setTokenStatus] = useState<{
		expired: boolean;
		expTime: string;
		issuedTime: string;
	} | null>(null);

	const decodeJWT = (jwtToken: string) => {
		if (!jwtToken.trim()) {
			setHeader('');
			setPayload('');
			setError(null);
			setTokenStatus(null);
			return;
		}

		const parts = jwtToken.split('.');
		if (parts.length !== 3) {
			setError(
				'Invalid JWT structure. A JWT must consist of three parts separated by dots (header.payload.signature).',
			);
			setHeader('');
			setPayload('');
			setTokenStatus(null);
			return;
		}

		try {
			// Helper to base64url decode
			const base64UrlDecode = (str: string) => {
				let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
				while (base64.length % 4) {
					base64 += '=';
				}
				return decodeURIComponent(escape(window.atob(base64)));
			};

			const decodedHeader = JSON.parse(base64UrlDecode(parts[0]));
			const decodedPayload = JSON.parse(base64UrlDecode(parts[1]));

			setHeader(JSON.stringify(decodedHeader, null, 2));
			setPayload(JSON.stringify(decodedPayload, null, 2));
			setError(null);

			// Expiration / validity check
			let expired = false;
			let expTime = 'N/A';
			let issuedTime = 'N/A';

			if (decodedPayload.exp) {
				const expDate = new Date(decodedPayload.exp * 1000);
				expired = expDate.getTime() < Date.now();
				expTime = expDate.toLocaleString();
			}
			if (decodedPayload.iat) {
				issuedTime = new Date(
					decodedPayload.iat * 1000,
				).toLocaleString();
			}

			setTokenStatus({ expired, expTime, issuedTime });
		} catch (err) {
			setError(
				'Failed to decode token parts. Make sure it is a valid Base64Url-encoded JWT.',
			);
			setHeader('');
			setPayload('');
			setTokenStatus(null);
		}
	};

	useEffect(() => {
		decodeJWT(token);
	}, [token]);

	const copyPayload = () => {
		if (!payload) return;
		navigator.clipboard.writeText(payload);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	return (
		<>
			<NextSeo
				title="JWT Debugger & Token Decoder | Inspect Header & Claims - Joey Jazwinski"
				description="Decode and inspect JSON Web Tokens (JWT) client-side. View header algorithms, payload claims, expiration timestamps, and signature details."
				canonical="https://joeyjazwinski.com/developer-tools/jwt-debugger"
				openGraph={{
					title: "JWT Debugger & Token Decoder | Inspect Header & Claims - Joey Jazwinski",
					description: "Decode and inspect JSON Web Tokens (JWT) client-side. View header algorithms, payload claims, expiration timestamps, and signature details.",
					url: "https://joeyjazwinski.com/developer-tools/jwt-debugger",
					type: "website",
					images: [
						{
							url: "https://joeyjazwinski.com/ogimage.png",
							width: 1200,
							height: 630,
							alt: "JWT Debugger & Token Decoder",
						},
					],
				}}
				twitter={{
					handle: "@JoeyJazwinski",
					site: "@JoeyJazwinski",
					cardType: "summary_large_image",
				}}
			/>
			<ToolJsonLd
				name="JWT Debugger & Token Decoder"
				description="Decode and inspect JSON Web Tokens (JWT) client-side. View header algorithms, payload claims, expiration timestamps, and signature details."
				url="https://joeyjazwinski.com/developer-tools/jwt-debugger"
				category="SecurityApplication"
			/>
			<main className="min-h-screen bg-background pt-32 pb-16 px-4 sm:px-6 lg:px-8 text-foreground">
				<div className="max-w-6xl mx-auto space-y-12">
					{/* Header */}
					<div className="text-center space-y-4 max-w-2xl mx-auto">
						<div className="inline-flex p-3 rounded-2xl bg-primary/10 text-primary border border-primary/20">
							<Key className="w-8 h-8" />
						</div>
						<h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl bg-linear-to-r from-primary to-indigo-500 bg-clip-text text-transparent">
							JWT Debugger & Decoder
						</h1>
						<p className="text-muted-foreground text-lg">
							Decode JSON Web Tokens securely on the client.
							Analyze payload claims and check validity dates.
						</p>
					</div>

					{/* Workspace */}
					<div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
						{/* Input Column */}
						<div className="lg:col-span-5 bg-card/60 backdrop-blur-xl border border-border/80 rounded-2xl p-6 sm:p-8 space-y-4 shadow-xl flex flex-col justify-between">
							<div className="space-y-4 grow">
								<h2 className="text-lg font-bold border-b border-border/50 pb-2">
									Paste Token
								</h2>
								<textarea
									value={token}
									onChange={(e) => setToken(e.target.value)}
									className="w-full h-90 p-4 rounded-xl border border-border bg-background/90 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none shadow-inner"
									placeholder="Paste your JWT here (header.payload.signature)..."
								/>
							</div>

							{error && (
								<div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-xs text-red-500 font-medium font-mono">
									<ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" />
									<span>{error}</span>
								</div>
							)}

							{tokenStatus && (
								<div className="p-4 rounded-xl bg-secondary/40 border border-border/50 space-y-2 text-xs">
									<div className="flex justify-between">
										<span className="text-muted-foreground">
											Token Status:
										</span>
										{tokenStatus.expired ? (
											<span className="text-rose-500 font-bold flex items-center gap-1">
												<ShieldAlert className="w-4 h-4" />{' '}
												Expired
											</span>
										) : (
											<span className="text-emerald-500 font-bold flex items-center gap-1">
												<ShieldCheck className="w-4 h-4" />{' '}
												Valid / Active
											</span>
										)}
									</div>
									<div className="flex justify-between">
										<span className="text-muted-foreground">
											Issued At:
										</span>
										<span className="font-semibold">
											{tokenStatus.issuedTime}
										</span>
									</div>
									<div className="flex justify-between">
										<span className="text-muted-foreground">
											Expires At:
										</span>
										<span className="font-semibold">
											{tokenStatus.expTime}
										</span>
									</div>
								</div>
							)}
						</div>

						{/* Decoded Columns */}
						<div className="lg:col-span-7 grid grid-rows-2 gap-6">
							{/* Header JSON */}
							<div className="bg-card/60 backdrop-blur-xl border border-border/80 rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-xl">
								<div className="space-y-3">
									<h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
										Header (Algorithm & Token Type)
									</h3>
									<pre className="w-full h-32 p-3 overflow-y-auto rounded-xl border border-border bg-background/50 font-mono text-xs shadow-inner whitespace-pre-wrap">
										{header ||
											'// Decoded header will show here...'}
									</pre>
								</div>
							</div>

							{/* Payload JSON */}
							<div className="bg-card/60 backdrop-blur-xl border border-border/80 rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-xl relative">
								<div className="space-y-3">
									<div className="flex justify-between items-center">
										<h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
											Payload (Data Claims)
										</h3>
										{payload && (
											<button
												onClick={copyPayload}
												className="p-1.5 rounded-lg bg-background border border-border hover:bg-secondary text-muted-foreground hover:text-foreground transition shadow"
												title="Copy Payload"
											>
												{copied ? (
													<Check className="w-4 h-4 text-emerald-500" />
												) : (
													<Copy className="w-4 h-4" />
												)}
											</button>
										)}
									</div>
									<pre className="w-full h-32 p-3 overflow-y-auto rounded-xl border border-border bg-background/50 font-mono text-xs shadow-inner whitespace-pre-wrap">
										{payload ||
											'// Decoded payload will show here...'}
									</pre>
								</div>
							</div>
						</div>
					</div>
				</div>
			</main>
		</>
	);
}
