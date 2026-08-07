import { useState, useEffect } from 'react';
import { NextSeo } from 'next-seo';
import { Key, Lock, Copy, Check } from 'lucide-react';

export default function HashGenerator() {
	const [inputText, setInputText] = useState(
		'Joey Jazwinski Developer Tools',
	);
	const [secretKey, setSecretKey] = useState('');
	const [algorithm, setAlgorithm] = useState('SHA-256');
	const [isHMAC, setIsHMAC] = useState(false);
	const [hashOutput, setHashOutput] = useState('');
	const [copied, setCopied] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const calculateHash = async () => {
		if (!inputText) {
			setHashOutput('');
			return;
		}

		try {
			setError(null);
			const encoder = new TextEncoder();
			const data = encoder.encode(inputText);

			if (isHMAC) {
				if (!secretKey) {
					setError('HMAC requires a Secret Key.');
					setHashOutput('');
					return;
				}
				const keyData = encoder.encode(secretKey);
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
	}, [inputText, secretKey, algorithm, isHMAC]);

	const copyToClipboard = () => {
		if (!hashOutput) return;
		navigator.clipboard.writeText(hashOutput);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	return (
		<>
			<NextSeo
				title="Hash & HMAC Generator | Joey Jazwinski"
				description="Generate SHA-1, SHA-256, SHA-384, or SHA-512 hashes and HMAC signatures client-side in real-time."
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
										onClick={() => setIsHMAC(false)}
										className={`flex-1 py-2 px-3 rounded-xl border text-sm font-semibold transition ${
											!isHMAC
												? 'bg-primary text-primary-foreground border-transparent'
												: 'bg-background hover:bg-secondary border-border text-muted-foreground hover:text-foreground'
										}`}
									>
										Hash (Digest)
									</button>
									<button
										onClick={() => setIsHMAC(true)}
										className={`flex-1 py-2 px-3 rounded-xl border text-sm font-semibold transition ${
											isHMAC
												? 'bg-primary text-primary-foreground border-transparent'
												: 'bg-background hover:bg-secondary border-border text-muted-foreground hover:text-foreground'
										}`}
									>
										HMAC
									</button>
								</div>
							</div>

							{/* HMAC Secret Key (Visible only when HMAC is active) */}
							<div className="space-y-1.5 transition-all">
								<label
									htmlFor="key-input"
									className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1"
								>
									<Key className="w-3.5 h-3.5" />
									Secret Key
								</label>
								<input
									id="key-input"
									type="text"
									disabled={!isHMAC}
									value={secretKey}
									onChange={(e) =>
										setSecretKey(e.target.value)
									}
									className="block w-full px-4 py-2.5 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-sm font-mono disabled:opacity-50"
									placeholder={
										isHMAC
											? 'Enter secret key...'
											: 'Disabled in Hash mode'
									}
								/>
							</div>
						</div>

						{/* Textarea fields */}
						<div className="space-y-4">
							<div className="space-y-1.5">
								<label
									htmlFor="text-input"
									className="block text-sm font-semibold text-muted-foreground"
								>
									Input Text
								</label>
								<textarea
									id="text-input"
									value={inputText}
									onChange={(e) =>
										setInputText(e.target.value)
									}
									className="w-full h-32 p-4 rounded-xl border border-border bg-background/90 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none shadow-inner"
									placeholder="Enter plain text to hash..."
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
				</div>
			</main>
		</>
	);
}
