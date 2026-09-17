import { useState, useEffect, useCallback, useMemo } from 'react';
import Link from 'next/link';
import { NextSeo } from 'next-seo';
import ToolJsonLd from '@/components/seo/ToolJsonLd';
import ToolFaqSection from '@/components/tools/ToolFaqSection';
import {
	Key,
	ShieldCheck,
	ShieldAlert,
	Copy,
	Check,
	ArrowRight,
	Lock,
	Sparkles,
	Clock,
	Edit3,
	Eye,
	CheckCircle2,
	XCircle,
	AlertTriangle,
	BookOpen,
} from 'lucide-react';
import {
	base64UrlDecode,
	verifyHs256Signature,
	signHs256Jwt,
} from '@/lib/jwtHelper';

const JWT_FAQS = [
	{
		question: 'What is a JSON Web Token (JWT)?',
		answer:
			'A JWT is a compact, URL-safe means of representing claims to be transferred between two parties. It consists of three parts separated by dots: header, payload, and cryptographic signature.',
	},
	{
		question: 'Is it safe to paste JWTs into online tools?',
		answer:
			'This debugger runs 100% locally in your browser using the Web Cryptography API. Your tokens, secrets, and decoded payloads are never transmitted to any server.',
	},
	{
		question: 'How do I decode a JWT?',
		answer:
			'Paste your encoded token into the input field. The tool splits header, payload, and signature segments, decodes the base64url encoding, and formats JSON claims automatically.',
	},
];

const PRESETS = {
	standardUser: {
		label: 'Standard User',
		header: { alg: 'HS256', typ: 'JWT' },
		payload: {
			sub: 'usr_104829',
			name: 'Joey Jazwinski',
			role: 'user',
			iat: Math.floor(Date.now() / 1000),
			exp: Math.floor(Date.now() / 1000) + 86400, // 24 hours
		},
		secret: 'dev-secret-key-12345',
	},
	adminUser: {
		label: 'Admin with Scopes',
		header: { alg: 'HS256', typ: 'JWT' },
		payload: {
			sub: 'usr_admin_001',
			name: 'Joey Admin',
			role: 'admin',
			permissions: ['read:all', 'write:all', 'delete:all', 'manage:billing'],
			iat: Math.floor(Date.now() / 1000),
			exp: Math.floor(Date.now() / 1000) + 604800, // 7 days
		},
		secret: 'super-secure-production-secret',
	},
	expiredToken: {
		label: 'Expired Token',
		header: { alg: 'HS256', typ: 'JWT' },
		payload: {
			sub: 'usr_expired_88',
			name: 'Former User',
			role: 'guest',
			iat: Math.floor(Date.now() / 1000) - 172800, // 2 days ago
			exp: Math.floor(Date.now() / 1000) - 86400, // 1 day ago
		},
		secret: 'old-secret-key',
	},
};

export default function JWTDebugger() {
	const [token, setToken] = useState('');
	const [headerStr, setHeaderStr] = useState('');
	const [payloadStr, setPayloadStr] = useState('');
	const [signaturePart, setSignaturePart] = useState('');
	const [signingInputPart, setSigningInputPart] = useState('');

	// Signature verification state
	const [verifySecret, setVerifySecret] = useState('dev-secret-key-12345');
	const [sigValid, setSigValid] = useState<boolean | null>(null);

	// Tabs & Editors
	const [activeTab, setActiveTab] = useState<'inspect' | 'edit'>('inspect');
	const [editHeader, setEditHeader] = useState('{\n  "alg": "HS256",\n  "typ": "JWT"\n}');
	const [editPayload, setEditPayload] = useState('{\n  "sub": "1234567890",\n  "name": "Joey Jazwinski",\n  "admin": true\n}');
	const [editSecret, setEditSecret] = useState('dev-secret-key-12345');

	const [copied, setCopied] = useState<string | null>(null);
	const [error, setError] = useState<string | null>(null);

	const [tokenStatus, setTokenStatus] = useState<{
		expired: boolean;
		expTime: string;
		issuedTime: string;
		remainingHours: number | null;
	} | null>(null);

	// Decode JWT
	const decodeJWT = useCallback((jwtToken: string) => {
		if (!jwtToken.trim()) {
			setHeaderStr('');
			setPayloadStr('');
			setSignaturePart('');
			setSigningInputPart('');
			setError(null);
			setTokenStatus(null);
			setSigValid(null);
			return;
		}

		const parts = jwtToken.split('.');
		if (parts.length !== 3) {
			setError(
				'Invalid JWT format. Must contain three parts separated by dots (header.payload.signature).',
			);
			setHeaderStr('');
			setPayloadStr('');
			setSignaturePart('');
			setSigningInputPart('');
			setTokenStatus(null);
			setSigValid(null);
			return;
		}

		try {
			const decodedHeader = JSON.parse(base64UrlDecode(parts[0]));
			const decodedPayload = JSON.parse(base64UrlDecode(parts[1]));

			setHeaderStr(JSON.stringify(decodedHeader, null, 2));
			setPayloadStr(JSON.stringify(decodedPayload, null, 2));
			setSignaturePart(parts[2]);
			setSigningInputPart(`${parts[0]}.${parts[1]}`);
			setError(null);

			// Timestamps check
			if (decodedPayload.exp || decodedPayload.iat) {
				const now = Math.floor(Date.now() / 1000);
				const isExp = decodedPayload.exp ? now > decodedPayload.exp : false;
				const expDate = decodedPayload.exp
					? new Date(decodedPayload.exp * 1000).toLocaleString()
					: 'None specified';
				const iatDate = decodedPayload.iat
					? new Date(decodedPayload.iat * 1000).toLocaleString()
					: 'None specified';
				const remaining = decodedPayload.exp
					? Math.round((decodedPayload.exp - now) / 3600)
					: null;

				setTokenStatus({
					expired: isExp,
					expTime: expDate,
					issuedTime: iatDate,
					remainingHours: remaining,
				});
			} else {
				setTokenStatus(null);
			}
		} catch (err: unknown) {
			const msg = err instanceof Error ? err.message : 'Invalid JSON content';
			setError(`Decoding failed: ${msg}`);
			setHeaderStr('');
			setPayloadStr('');
			setSignaturePart('');
			setSigningInputPart('');
			setTokenStatus(null);
			setSigValid(null);
		}
	}, []);

	// Run signature verification on secret or token change
	useEffect(() => {
		let isSubscribed = true;
		if (!signingInputPart || !signaturePart || !verifySecret) {
			setSigValid(null);
			return;
		}

		verifyHs256Signature(signingInputPart, signaturePart, verifySecret).then((valid) => {
			if (isSubscribed) {
				setSigValid(valid);
			}
		});

		return () => {
			isSubscribed = false;
		};
	}, [signingInputPart, signaturePart, verifySecret]);

	// Load default preset on mount
	useEffect(() => {
		const defaultPreset = PRESETS.standardUser;
		signHs256Jwt(defaultPreset.header, defaultPreset.payload, defaultPreset.secret).then(
			(jwt) => {
				setToken(jwt);
				decodeJWT(jwt);
				setEditHeader(JSON.stringify(defaultPreset.header, null, 2));
				setEditPayload(JSON.stringify(defaultPreset.payload, null, 2));
				setEditSecret(defaultPreset.secret);
				setVerifySecret(defaultPreset.secret);
			},
		);
	}, [decodeJWT]);

	const loadPreset = async (presetKey: keyof typeof PRESETS) => {
		const p = PRESETS[presetKey];
		const jwt = await signHs256Jwt(p.header, p.payload, p.secret);
		setToken(jwt);
		decodeJWT(jwt);
		setEditHeader(JSON.stringify(p.header, null, 2));
		setEditPayload(JSON.stringify(p.payload, null, 2));
		setEditSecret(p.secret);
		setVerifySecret(p.secret);
	};

	// Generate & Re-Sign Token
	const handleReSign = async () => {
		try {
			const headerObj = JSON.parse(editHeader);
			const payloadObj = JSON.parse(editPayload);
			const newJwt = await signHs256Jwt(headerObj, payloadObj, editSecret);
			setToken(newJwt);
			setVerifySecret(editSecret);
			decodeJWT(newJwt);
			setActiveTab('inspect');
		} catch (err: unknown) {
			const msg = err instanceof Error ? err.message : 'Invalid JSON input';
			setError(`Re-sign failed: ${msg}`);
		}
	};

	// Expiry preset setter
	const setExpiryOffset = (seconds: number) => {
		try {
			const payloadObj = JSON.parse(editPayload);
			const now = Math.floor(Date.now() / 1000);
			payloadObj.iat = now;
			payloadObj.exp = now + seconds;
			setEditPayload(JSON.stringify(payloadObj, null, 2));
		} catch {
			// Ignore if invalid JSON
		}
	};

	const copyToClipboard = (text: string, id: string) => {
		if (!text) return;
		navigator.clipboard.writeText(text);
		setCopied(id);
		setTimeout(() => setCopied(null), 2000);
	};

	// Colored token parts
	const tokenParts = useMemo(() => {
		const parts = token.split('.');
		return {
			header: parts[0] || '',
			payload: parts[1] || '',
			signature: parts[2] || '',
		};
	}, [token]);

	return (
		<>
			<NextSeo
				title="JWT Debugger & Decoder - Inspect JSON Web Tokens | Joey Jazwinski"
				description="Decode and inspect JSON Web Tokens (JWTs) in browser with header, payload, and signature views."
				canonical="https://joeyjazwinski.com/developer-tools/jwt-debugger"
				openGraph={{
					title: 'JWT Debugger & Decoder - Inspect JSON Web Tokens | Joey Jazwinski',
					description:
						'Decode and inspect JSON Web Tokens (JWTs) in browser with header, payload, and signature views.',
					url: 'https://joeyjazwinski.com/developer-tools/jwt-debugger',
					type: 'website',
					images: [
						{
							url: 'https://joeyjazwinski.com/ogimage.png',
							width: 1200,
							height: 630,
							alt: 'JWT Debugger & Decoder',
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
				name="JWT Debugger & Decoder"
				description="Decode and inspect JSON Web Tokens (JWTs) in browser with header, payload, and signature views."
				url="https://joeyjazwinski.com/developer-tools/jwt-debugger"
				category="DeveloperApplication"
				faqs={JWT_FAQS}
			/>
			<main className="bg-background pt-32 pb-16 px-4 sm:px-6 lg:px-8 text-foreground">
				<div className="max-w-6xl mx-auto space-y-10">
					<div className="mb-2">
						<Link
							href="/developer-tools"
							className="inline-flex items-center text-xs font-semibold text-muted-foreground hover:text-primary transition"
						>
							← Back to all developer tools
						</Link>
					</div>

					{/* Header */}
					<div className="text-center space-y-4 max-w-2xl mx-auto">
						<div className="inline-flex p-3 rounded-2xl bg-primary/10 text-primary border border-primary/20">
							<Key className="w-8 h-8" />
						</div>
						<h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl bg-linear-to-r from-primary to-indigo-500 bg-clip-text text-transparent">
							JWT Debugger &amp; Decoder
						</h1>
						<p className="text-muted-foreground text-lg">
							Decode and inspect JSON Web Tokens (JWTs) in browser with header, payload, and signature views.
						</p>
						<div className="pt-2">
							<Link
								href="/developer-blog/understanding-json-web-tokens-jwt-security-vulnerabilities-debugging-guide"
								className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline"
							>
								<BookOpen className="w-3.5 h-3.5" />
								<span>Learn JWT fundamentals and security best practices →</span>
							</Link>
						</div>
					</div>

					{/* Presets Bar */}
					<div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-card/70 border border-border/80 rounded-2xl backdrop-blur-md">
						<div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground">
							<Sparkles className="w-4 h-4 text-primary" />
							<span>Quick Presets:</span>
						</div>
						<div className="flex flex-wrap items-center gap-2">
							<button
								onClick={() => loadPreset('standardUser')}
								className="px-3 py-1 text-xs rounded-lg bg-secondary hover:bg-secondary/80 border border-border text-foreground transition cursor-pointer"
							>
								Standard User
							</button>
							<button
								onClick={() => loadPreset('adminUser')}
								className="px-3 py-1 text-xs rounded-lg bg-secondary hover:bg-secondary/80 border border-border text-foreground transition cursor-pointer"
							>
								Admin with Scopes
							</button>
							<button
								onClick={() => loadPreset('expiredToken')}
								className="px-3 py-1 text-xs rounded-lg bg-secondary hover:bg-secondary/80 border border-border text-amber-500 transition cursor-pointer"
							>
								Expired Token
							</button>
						</div>
					</div>

					{/* Workspace Grid */}
					<div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
						{/* Left Column: Encoded Token */}
						<div className="lg:col-span-5 bg-card/60 backdrop-blur-xl border border-border/80 rounded-2xl p-6 sm:p-8 space-y-4 shadow-xl">
							<div className="flex justify-between items-center border-b border-border/50 pb-3">
								<h2 className="text-base font-bold flex items-center gap-2">
									<span>Encoded Token</span>
								</h2>
								<div className="flex items-center gap-1.5 text-[11px] font-mono">
									<span className="text-rose-500 font-bold">header</span>.
									<span className="text-purple-500 font-bold">payload</span>.
									<span className="text-blue-500 font-bold">signature</span>
								</div>
							</div>

							<div className="space-y-2">
								<textarea
									rows={9}
									value={token}
									onChange={(e) => {
										setToken(e.target.value);
										decodeJWT(e.target.value);
									}}
									placeholder="Paste a valid JWT string here..."
									className="w-full p-4 rounded-xl border border-border bg-background/70 font-mono text-xs focus:outline-none focus:ring-2 focus:ring-primary transition-all resize-none shadow-inner break-all"
								/>
							</div>

							{/* Signature Verification Box */}
							<div className="p-4 bg-secondary/30 rounded-xl border border-border/70 space-y-3">
								<div className="flex items-center justify-between">
									<span className="text-xs font-semibold text-foreground flex items-center gap-1.5">
										<Lock className="w-3.5 h-3.5 text-primary" />
										Verify Signature (HS256)
									</span>
									{sigValid !== null && (
										<span>
											{sigValid ? (
												<span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded">
													<CheckCircle2 className="w-3 h-3" />
													Signature Verified
												</span>
											) : (
												<span className="inline-flex items-center gap-1 text-[11px] font-bold text-rose-500 bg-rose-500/10 px-2 py-0.5 rounded">
													<XCircle className="w-3 h-3" />
													Invalid Secret
												</span>
											)}
										</span>
									)}
								</div>

								<div className="space-y-1">
									<input
										type="text"
										value={verifySecret}
										onChange={(e) => setVerifySecret(e.target.value)}
										placeholder="Enter HMAC secret key to verify..."
										className="w-full px-3 py-1.5 text-xs font-mono bg-background border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-primary"
									/>
									<p className="text-[11px] text-muted-foreground">
										Computed locally in browser via Web Crypto HMAC-SHA256.
									</p>
								</div>
							</div>

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
									<div className="flex items-center justify-between font-bold">
										<div className="flex items-center gap-1.5">
											<ShieldCheck className="w-4 h-4" />
											<span>
												{tokenStatus.expired
													? 'Token Expired'
													: 'Token Active (Valid Duration)'}
											</span>
										</div>
										{tokenStatus.remainingHours !== null && (
											<span className="font-mono text-[11px]">
												{tokenStatus.expired
													? `${Math.abs(tokenStatus.remainingHours)}h ago`
													: `${tokenStatus.remainingHours}h remaining`}
											</span>
										)}
									</div>
									<div className="text-[11px] text-muted-foreground flex items-center gap-1">
										<Clock className="w-3 h-3" />
										<span>Expires: {tokenStatus.expTime}</span>
									</div>
									<div className="text-[11px] text-muted-foreground">
										Issued At: {tokenStatus.issuedTime}
									</div>
								</div>
							)}
						</div>

						{/* Right Column: Inspect vs Edit Tabs */}
						<div className="lg:col-span-7 bg-card/60 backdrop-blur-xl border border-border/80 rounded-2xl p-6 sm:p-8 space-y-5 shadow-xl">
							{/* Tab Switcher */}
							<div className="flex items-center justify-between border-b border-border/50 pb-3">
								<div className="inline-flex p-0.5 rounded-xl bg-secondary border border-border">
									<button
										onClick={() => setActiveTab('inspect')}
										className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
											activeTab === 'inspect'
												? 'bg-background text-foreground shadow-xs'
												: 'text-muted-foreground hover:text-foreground'
										}`}
									>
										<Eye className="w-3.5 h-3.5 text-primary" />
										Decoded Claims
									</button>
									<button
										onClick={() => setActiveTab('edit')}
										className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
											activeTab === 'edit'
												? 'bg-background text-foreground shadow-xs'
												: 'text-muted-foreground hover:text-foreground'
										}`}
									>
										<Edit3 className="w-3.5 h-3.5 text-indigo-500" />
										Edit &amp; Re-Sign
									</button>
								</div>

								{activeTab === 'inspect' && (
									<div className="flex items-center gap-2">
										<button
											onClick={() =>
												copyToClipboard(payloadStr, 'payload')
											}
											disabled={!payloadStr}
											className="flex items-center gap-1 px-2.5 py-1 text-xs rounded-lg bg-secondary hover:bg-secondary/80 border border-border text-muted-foreground hover:text-foreground transition cursor-pointer disabled:opacity-40"
										>
											{copied === 'payload' ? (
												<Check className="w-3.5 h-3.5 text-emerald-500" />
											) : (
												<Copy className="w-3.5 h-3.5" />
											)}
											Copy Claims
										</button>
									</div>
								)}
							</div>

							{activeTab === 'inspect' ? (
								<div className="space-y-5">
									{/* Header Box */}
									<div className="space-y-1.5">
										<div className="flex justify-between items-center text-xs font-semibold text-rose-500">
											<span>Header: Algorithm &amp; Token Type</span>
											<span className="font-mono text-[11px] text-muted-foreground">
												{tokenParts.header
													? `${tokenParts.header.length} chars`
													: ''}
											</span>
										</div>
										<pre className="w-full h-28 p-3 overflow-y-auto rounded-xl border border-rose-500/20 bg-rose-500/5 font-mono text-xs shadow-inner whitespace-pre-wrap">
											{headerStr || '// Decoded header will show here...'}
										</pre>
									</div>

									{/* Payload Box */}
									<div className="space-y-1.5">
										<div className="flex justify-between items-center text-xs font-semibold text-purple-500">
											<span>Payload: Data Claims</span>
											<span className="font-mono text-[11px] text-muted-foreground">
												{tokenParts.payload
													? `${tokenParts.payload.length} chars`
													: ''}
											</span>
										</div>
										<pre className="w-full h-44 p-3 overflow-y-auto rounded-xl border border-purple-500/20 bg-purple-500/5 font-mono text-xs shadow-inner whitespace-pre-wrap">
											{payloadStr || '// Decoded payload will show here...'}
										</pre>
									</div>

									{/* Signature Box */}
									<div className="space-y-1.5">
										<div className="text-xs font-semibold text-blue-500">
											<span>Signature</span>
										</div>
										<div className="p-3 rounded-xl border border-blue-500/20 bg-blue-500/5 font-mono text-xs break-all text-muted-foreground">
											{signaturePart || '// Signature string'}
										</div>
									</div>
								</div>
							) : (
								/* Claims Editor & Re-Signer Tab */
								<div className="space-y-4">
									<div className="space-y-1.5">
										<div className="flex items-center justify-between text-xs font-semibold text-muted-foreground">
											<span>Edit Payload JSON</span>
											<div className="flex items-center gap-1 text-[11px]">
												<span>Set Expiry:</span>
												<button
													onClick={() => setExpiryOffset(3600)}
													className="px-1.5 py-0.5 rounded bg-secondary hover:bg-secondary/80 border border-border cursor-pointer"
												>
													+1h
												</button>
												<button
													onClick={() => setExpiryOffset(86400)}
													className="px-1.5 py-0.5 rounded bg-secondary hover:bg-secondary/80 border border-border cursor-pointer"
												>
													+24h
												</button>
												<button
													onClick={() => setExpiryOffset(604800)}
													className="px-1.5 py-0.5 rounded bg-secondary hover:bg-secondary/80 border border-border cursor-pointer"
												>
													+7d
												</button>
											</div>
										</div>
										<textarea
											rows={7}
											value={editPayload}
											onChange={(e) => setEditPayload(e.target.value)}
											className="w-full p-3 rounded-xl border border-border bg-background font-mono text-xs focus:outline-none focus:ring-2 focus:ring-primary shadow-inner resize-none"
										/>
									</div>

									<div className="space-y-1.5">
										<label className="text-xs font-semibold text-muted-foreground">
											Edit Header JSON
										</label>
										<textarea
											rows={3}
											value={editHeader}
											onChange={(e) => setEditHeader(e.target.value)}
											className="w-full p-3 rounded-xl border border-border bg-background font-mono text-xs focus:outline-none focus:ring-2 focus:ring-primary shadow-inner resize-none"
										/>
									</div>

									<div className="space-y-1.5">
										<label className="text-xs font-semibold text-muted-foreground">
											Signing Secret (HMAC-SHA256)
										</label>
										<input
											type="text"
											value={editSecret}
											onChange={(e) => setEditSecret(e.target.value)}
											className="w-full px-3 py-2 rounded-xl border border-border bg-background font-mono text-xs focus:outline-none focus:ring-1 focus:ring-primary"
										/>
									</div>

									<button
										onClick={handleReSign}
										className="w-full py-2.5 px-4 bg-primary text-primary-foreground font-semibold rounded-xl text-xs hover:opacity-90 transition cursor-pointer flex items-center justify-center gap-2 shadow-sm"
									>
										<Sparkles className="w-3.5 h-3.5" />
										Sign &amp; Generate New Token
									</button>
								</div>
							)}
						</div>
					</div>

					<ToolFaqSection faqs={JWT_FAQS} />
				</div>
			</main>
		</>
	);
}
