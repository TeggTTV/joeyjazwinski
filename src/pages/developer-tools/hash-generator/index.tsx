import { useState, useEffect } from 'react';
import Link from 'next/link';
import { NextSeo } from 'next-seo';
import ToolJsonLd from '@/components/seo/ToolJsonLd';
import { Lock, Copy, Check, ArrowRight, BookOpen } from 'lucide-react';

export default function HashGenerator() {
	const [input, setInput] = useState('Joey Jazwinski Developer Tools');
	const [key, setKey] = useState('');
	const [algorithm, setAlgorithm] = useState('SHA-256');
	const [isHmac, setIsHmac] = useState(false);
	const [hashOutput, setHashOutput] = useState('');
	const [copied, setCopied] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const calculateHash = async () => {
		if (!input) {
			setHashOutput('');
			return;
		}

		try {
			setError(null);
			const encoder = new TextEncoder();
			const data = encoder.encode(input);

			if (isHmac) {
				if (!key) {
					setError('HMAC requires a Secret Key.');
					setHashOutput('');
					return;
				}
				const keyData = encoder.encode(key);
				const cryptoKey = await crypto.subtle.importKey(
					'raw',
					keyData,
					{ name: 'HMAC', hash: algorithm },
					false,
					['sign'],
				);
				const signature = await crypto.subtle.sign(
					'HMAC',
					cryptoKey,
					data,
				);
				const hashArray = Array.from(new Uint8Array(signature));
				const hashHex = hashArray
					.map((b) => b.toString(16).padStart(2, '0'))
					.join('');
				setHashOutput(hashHex);
			} else {
				const hashBuffer = await crypto.subtle.digest(algorithm, data);
				const hashArray = Array.from(new Uint8Array(hashBuffer));
				const hashHex = hashArray
					.map((b) => b.toString(16).padStart(2, '0'))
					.join('');
				setHashOutput(hashHex);
			}
		} catch (err: any) {
			setError(
				'Hashing failed. Make sure your browser supports SubtleCrypto.',
			);
			setHashOutput('');
		}
	};

	useEffect(() => {
		calculateHash();
	}, [input, key, algorithm, isHmac]);

	const copyToClipboard = () => {
		if (!hashOutput) return;
		navigator.clipboard.writeText(hashOutput);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	return (
		<>
			<NextSeo
				title="Hash & HMAC Generator | SHA-256 & SHA-512"
				description="Calculate SHA-1, SHA-256, SHA-512, and MD5 cryptographic hashes and HMAC signatures securely in your browser using the native Web Crypto API."
				canonical="https://joeyjazwinski.com/developer-tools/hash-generator"
				openGraph={{
					title: "Hash & HMAC Generator | SHA-256 & SHA-512",
					description: "Calculate SHA-1, SHA-256, SHA-512, and MD5 cryptographic hashes and HMAC signatures securely in your browser using the native Web Crypto API.",
					url: "https://joeyjazwinski.com/developer-tools/hash-generator",
					type: "website",
					images: [
						{
							url: "https://joeyjazwinski.com/ogimage.png",
							width: 1200,
							height: 630,
							alt: "Hash & HMAC Generator",
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
				name="Hash & HMAC Generator"
				description="Calculate SHA-1, SHA-256, SHA-512, and MD5 cryptographic hashes and HMAC signatures securely in your browser using the native Web Crypto API."
				url="https://joeyjazwinski.com/developer-tools/hash-generator"
				category="SecurityApplication"
			/>
			<main className="min-h-screen bg-background pt-32 pb-16 px-4 sm:px-6 lg:px-8 text-foreground">
				<div className="max-w-6xl mx-auto space-y-12">
					{/* Header */}
					<div className="text-center space-y-4 max-w-2xl mx-auto">
						<div className="inline-flex p-3 rounded-2xl bg-primary/10 text-primary border border-primary/20">
							<Lock className="w-8 h-8" />
						</div>
						<h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl bg-linear-to-r from-primary to-rose-500 bg-clip-text text-transparent">
							Hash & HMAC Generator
						</h1>
						<p className="text-muted-foreground text-lg">
							Generate secure cryptographic digests and signature
							keys completely client-side using SubtleCrypto.
						</p>
					</div>

					{/* Workspace */}
					<div className="bg-card/60 backdrop-blur-xl border border-border/80 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl max-w-4xl mx-auto">
						{/* Mode Configuration */}
						<div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-4 border-b border-border/50">
							{/* Algorithm Selection */}
							<div className="space-y-1.5">
								<label
									htmlFor="algo-select"
									className="text-xs font-semibold text-muted-foreground uppercase tracking-wider"
								>
									Algorithm
								</label>
								<select
									id="algo-select"
									value={algorithm}
									onChange={(e) =>
										setAlgorithm(e.target.value)
									}
									className="block w-full px-4 py-2.5 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary transition text-sm font-semibold"
								>
									<option value="SHA-256">SHA-256</option>
									<option value="SHA-512">SHA-512</option>
									<option value="SHA-1">SHA-1</option>
									<option value="SHA-384">SHA-384</option>
								</select>
							</div>

							{/* Hashing vs HMAC Selection */}
							<div className="space-y-1.5">
								<label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">
									Mode
								</label>
								<div className="flex gap-2">
									<button
										onClick={() => setIsHmac(false)}
										className={`flex-1 py-2 px-3 rounded-xl border text-xs font-semibold transition ${
											!isHmac
												? 'bg-primary text-primary-foreground border-primary'
												: 'bg-background hover:bg-secondary border-border text-muted-foreground'
										}`}
									>
										Hash Digest
									</button>
									<button
										onClick={() => setIsHmac(true)}
										className={`flex-1 py-2 px-3 rounded-xl border text-xs font-semibold transition ${
											isHmac
												? 'bg-primary text-primary-foreground border-primary'
												: 'bg-background hover:bg-secondary border-border text-muted-foreground'
										}`}
									>
										HMAC Key
									</button>
								</div>
							</div>

							{/* Text vs Hex Key Input (if HMAC) */}
							{isHmac && (
								<div className="space-y-1.5">
									<label
										htmlFor="key-input"
										className="text-xs font-semibold text-muted-foreground uppercase tracking-wider"
									>
										Secret Key
									</label>
									<input
										id="key-input"
										type="text"
										value={key}
										onChange={(e) => setKey(e.target.value)}
										placeholder="Enter secret key..."
										className="block w-full px-4 py-2 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary transition text-sm"
									/>
								</div>
							)}
						</div>

						{/* Inputs/Outputs */}
						<div className="space-y-4">
							<div className="space-y-1.5">
								<label
									htmlFor="data-input"
									className="text-sm font-semibold text-muted-foreground"
								>
									Input Data (String)
								</label>
								<textarea
									id="data-input"
									rows={4}
									value={input}
									onChange={(e) => setInput(e.target.value)}
									placeholder="Type or paste payload to digest..."
									className="w-full p-4 rounded-xl border border-border bg-background text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary resize-none shadow-inner"
								/>
							</div>

							<div className="space-y-1.5">
								<div className="flex justify-between items-center text-sm font-semibold text-muted-foreground">
									<span>Output Hash ({algorithm})</span>
								</div>
								<div className="relative group">
									<textarea
										readOnly
										value={hashOutput}
										className="w-full h-24 p-4 rounded-xl border border-border bg-background/50 font-mono text-sm focus:outline-none focus:ring-1 focus:ring-border resize-none shadow-inner break-all pr-12"
										placeholder="Hash output will appear here..."
									/>
									{hashOutput && (
										<button
											onClick={copyToClipboard}
											className="absolute right-3 top-3 p-2 rounded-lg bg-card border border-border hover:bg-secondary text-muted-foreground hover:text-foreground transition shadow"
											title="Copy Hash"
										>
											{copied ? (
												<Check className="w-4 h-4 text-emerald-500" />
											) : (
												<Copy className="w-4 h-4" />
											)}
										</button>
									)}
								</div>
							</div>
						</div>

						{error && (
							<div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-xs text-red-500 font-medium">
								{error}
							</div>
						)}
					</div>

					{/* Informational & FAQ Section */}
					<div className="pt-10 border-t border-border/40 space-y-6 max-w-4xl mx-auto">
						<div className="text-center space-y-2 max-w-2xl mx-auto">
							<h2 className="text-2xl font-black tracking-tight">
								Cryptographic Hash & HMAC Guide
							</h2>
							<p className="text-sm text-muted-foreground">
								Key concepts behind cryptographic digests and secure message authentication.
							</p>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div className="p-5 rounded-2xl bg-card border border-border/70 space-y-2">
								<h3 className="text-sm font-bold text-foreground">
									What is a Cryptographic Hash Function?
								</h3>
								<p className="text-xs text-muted-foreground leading-relaxed">
									A hash function converts input data of any size into a fixed-length string of bytes. Secure hash functions like SHA-256 are deterministic, quick to compute, resistant to pre-image attacks, and display an avalanche effect where a tiny input change alters the entire hash.
								</p>
							</div>
							<div className="p-5 rounded-2xl bg-card border border-border/70 space-y-2">
								<h3 className="text-sm font-bold text-foreground">
									How Does HMAC Differ From Standard Hashing?
								</h3>
								<p className="text-xs text-muted-foreground leading-relaxed">
									HMAC (Hash-based Message Authentication Code) mixes a shared secret key with the message payload before computing the digest. This verifies both data integrity and authentication, proving the message originated from a party with the secret key.
								</p>
							</div>
							<div className="p-5 rounded-2xl bg-card border border-border/70 space-y-2">
								<h3 className="text-sm font-bold text-foreground">
									Is My Data Computed Privately?
								</h3>
								<p className="text-xs text-muted-foreground leading-relaxed">
									Yes. All hash and HMAC computations use the native Web Crypto API (SubtleCrypto) in your browser. No strings, keys, or digests are sent across the network.
								</p>
							</div>
							<div className="p-5 rounded-2xl bg-card border border-border/70 space-y-2">
								<h3 className="text-sm font-bold text-foreground">
									Which Algorithm Should I Choose?
								</h3>
								<p className="text-xs text-muted-foreground leading-relaxed">
									SHA-256 and SHA-512 are industry standards for API authentication, blockchain hashing, and token signing. Legacy algorithms like SHA-1 should be reserved strictly for backward compatibility verification.
								</p>
							</div>
						</div>

						{/* Related In-Depth Guide */}
						<div className="p-5 rounded-2xl bg-secondary/30 border border-border/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
							<div className="flex items-center gap-3">
								<div className="p-2.5 rounded-xl bg-primary/10 text-primary shrink-0">
									<BookOpen className="w-5 h-5" />
								</div>
								<div>
									<div className="text-sm font-bold text-foreground">
										System Design: Consistent Hashing & Sharding
									</div>
									<div className="text-xs text-muted-foreground">
										Learn how cryptographic hashing powers distributed database sharding.
									</div>
								</div>
							</div>
							<Link
								href="/developer-blog/database-sharding-vs-partitioning-vs-replication-pragmatic-scaling-guide"
								className="px-4 py-2 rounded-xl bg-primary/10 hover:bg-primary/20 text-primary text-xs font-semibold flex items-center gap-1.5 transition shrink-0"
							>
								<span>Read Scaling Guide</span>
								<ArrowRight className="w-3.5 h-3.5" />
							</Link>
						</div>
					</div>
				</div>
			</main>
		</>
	);
}
