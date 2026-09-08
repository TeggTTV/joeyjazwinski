import { useState, useEffect } from 'react';
import Link from 'next/link';
import { NextSeo } from 'next-seo';
import ToolJsonLd from '@/components/seo/ToolJsonLd';
import { Key, ShieldCheck, ShieldAlert, Copy, Check, ArrowRight, Lock } from 'lucide-react';

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

			// Check timestamps if they exist
			if (decodedPayload.exp || decodedPayload.iat) {
				const now = Math.floor(Date.now() / 1000);
				const isExp = decodedPayload.exp
					? now > decodedPayload.exp
					: false;
				const expDate = decodedPayload.exp
					? new Date(decodedPayload.exp * 1000).toLocaleString()
					: 'None specified';
				const iatDate = decodedPayload.iat
					? new Date(decodedPayload.iat * 1000).toLocaleString()
					: 'None specified';

				setTokenStatus({
					expired: isExp,
					expTime: expDate,
					issuedTime: iatDate,
				});
			} else {
				setTokenStatus(null);
			}
		} catch (err: any) {
			setError(
				'Failed to parse JSON Web Token. Make sure payload and header are valid JSON Base64URL-encoded strings.',
			);
			setHeader('');
			setPayload('');
			setTokenStatus(null);
		}
	};

	useEffect(() => {
		// Load a default test token for demo purposes
		const sampleToken =
			'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvZXkgSmF6d2luc2tpIiwiYWRtaW4iOnRydWUsImlhdCI6MTY3MjUzNjAwMCwiZXhwIjoxNzczNjgwMDAwfQ.g_V0L23-zI3Yn_sample_signature_not_verified';
		setToken(sampleToken);
		decodeJWT(sampleToken);
	}, []);

	const handleTokenChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		const val = e.target.value;
		setToken(val);
		decodeJWT(val);
	};

	const copyPayload = () => {
		if (!payload) return;
		navigator.clipboard.writeText(payload);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	return (
		<>
			<NextSeo
				title="JWT Debugger & Token Decoder | Claims Viewer"
				description="Decode and inspect JSON Web Tokens (JWT) client-side. View header algorithms, payload claims, expiration timestamps, and signature details."
				canonical="https://joeyjazwinski.com/developer-tools/jwt-debugger"
				openGraph={{
					title: "JWT Debugger & Token Decoder | Claims Viewer",
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
				category="DeveloperApplication"
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
							Decode, inspect, and analyze JSON Web Tokens in
							real-time. Client-side only with zero backend transmission.
						</p>
					</div>

					{/* Workspace */}
					<div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
						{/* Encoded Token Input */}
						<div className="lg:col-span-5 bg-card/60 backdrop-blur-xl border border-border/80 rounded-2xl p-6 sm:p-8 space-y-4 shadow-xl">
							<div className="flex justify-between items-center border-b border-border/50 pb-3">
								<h2 className="text-lg font-bold flex items-center gap-2">
									<span>Encoded Token</span>
								</h2>
								<span className="text-xs font-mono text-muted-foreground">
									header.payload.signature
								</span>
							</div>

							<textarea
								rows={12}
								value={token}
								onChange={handleTokenChange}
								placeholder="Paste a valid JWT string here..."
								className="w-full p-4 rounded-xl border border-border bg-background/50 font-mono text-xs focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none shadow-inner break-all"
							/>

							{error && (
								<div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-xs text-red-500 font-medium">
									<ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" />
									<span>{error}</span>
								</div>
							)}

							{tokenStatus && (
								<div
									className={`p-3.5 rounded-xl border flex flex-col gap-1.5 text-xs ${
										tokenStatus.expired
											? 'bg-amber-500/10 border-amber-500/20 text-amber-500'
											: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500'
									}`}
								>
									<div className="flex items-center gap-1.5 font-bold">
										<ShieldCheck className="w-4 h-4" />
										<span>
											{tokenStatus.expired
												? 'Token Expired'
												: 'Token Valid (Time-wise)'}
										</span>
									</div>
									<div className="text-[11px] text-muted-foreground">
										Expires: {tokenStatus.expTime}
									</div>
									<div className="text-[11px] text-muted-foreground">
										Issued At: {tokenStatus.issuedTime}
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

					{/* Informational & FAQ Section */}
					<div className="pt-10 border-t border-border/40 space-y-6">
						<div className="text-center space-y-2 max-w-2xl mx-auto">
							<h2 className="text-2xl font-black tracking-tight">
								JSON Web Token Guide & Security
							</h2>
							<p className="text-sm text-muted-foreground">
								Understanding JWT headers, claim sets, and client-side privacy.
							</p>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div className="p-5 rounded-2xl bg-card border border-border/70 space-y-2">
								<h3 className="text-sm font-bold text-foreground">
									What are the three parts of a JWT?
								</h3>
								<p className="text-xs text-muted-foreground leading-relaxed">
									A JSON Web Token consists of a Header (specifying signing algorithm), a Payload (containing claims such as subject, issuer, and expiration), and a Signature (verifying message integrity).
								</p>
							</div>
							<div className="p-5 rounded-2xl bg-card border border-border/70 space-y-2">
								<h3 className="text-sm font-bold text-foreground">
									Are JWT tokens encrypted?
								</h3>
								<p className="text-xs text-muted-foreground leading-relaxed">
									Standard JWS tokens are signed and Base64URL-encoded, not encrypted. Anyone who intercepts the token can read the payload claims. Never store sensitive passwords or raw private keys in JWT claims.
								</p>
							</div>
							<div className="p-5 rounded-2xl bg-card border border-border/70 space-y-2">
								<h3 className="text-sm font-bold text-foreground">
									Is token decoding done privately?
								</h3>
								<p className="text-xs text-muted-foreground leading-relaxed">
									Yes. All decoding executes in your browser using native JavaScript Base64URL decoding. No tokens are logged, transmitted, or stored on any server.
								</p>
							</div>
							<div className="p-5 rounded-2xl bg-card border border-border/70 space-y-2">
								<h3 className="text-sm font-bold text-foreground">
									What do iat and exp claims mean?
								</h3>
								<p className="text-xs text-muted-foreground leading-relaxed">
									<code>iat</code> (Issued At) and <code>exp</code> (Expiration Time) are standard Unix timestamps defining token lifespan. Servers reject authentication requests where the current time exceeds <code>exp</code>.
								</p>
							</div>
						</div>

						{/* Related Tool Link */}
						<div className="p-5 rounded-2xl bg-secondary/30 border border-border/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
							<div className="flex items-center gap-3">
								<div className="p-2.5 rounded-xl bg-primary/10 text-primary shrink-0">
									<Lock className="w-5 h-5" />
								</div>
								<div>
									<div className="text-sm font-bold text-foreground">
										Converting Public Keys or Signatures?
									</div>
									<div className="text-xs text-muted-foreground">
										Convert PEM RSA/EC public keys to JWK format for JSON Web Key Sets.
									</div>
								</div>
							</div>
							<Link
								href="/developer-tools/pem-jwk-converter"
								className="px-4 py-2 rounded-xl bg-primary/10 hover:bg-primary/20 text-primary text-xs font-semibold flex items-center gap-1.5 transition shrink-0"
							>
								<span>PEM to JWK Converter</span>
								<ArrowRight className="w-3.5 h-3.5" />
							</Link>
						</div>
					</div>
				</div>
			</main>
		</>
	);
}
