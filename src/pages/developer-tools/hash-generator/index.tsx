import { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import { NextSeo } from 'next-seo';
import ToolJsonLd from '@/components/seo/ToolJsonLd';
import ToolFaqSection from '@/components/tools/ToolFaqSection';
import {
	Lock,
	Copy,
	Check,
	Upload,
	FileCode,
	Hash,
	Key,
	X,
	CheckCircle2,
	XCircle,
	Sparkles,
} from 'lucide-react';
import { calculateCrc32, calculateMd5, computeAllHashes } from '@/lib/hashHelper';

const HASH_FAQS = [
	{
		question: 'Which cryptographic hash algorithms are supported?',
		answer:
			'Calculate SHA-256, SHA-512, SHA-384, SHA-1, MD5, and CRC32 checksums as well as HMAC secret key signatures.',
	},
	{
		question: 'Can I verify file checksums without uploading to a server?',
		answer:
			'Yes. Drag and drop any software release or binary file. Checksums are computed locally in your browser memory via the Web Cryptography API.',
	},
	{
		question: 'What is HMAC used for?',
		answer:
			'Hash-based Message Authentication Codes (HMAC) combine cryptographic hash functions with secret keys to verify data authenticity and tamper-resistance in APIs.',
	},
];

export default function HashGenerator() {
	const [inputMode, setInputMode] = useState<'text' | 'file'>('text');
	const [textInput, setTextInput] = useState('Joey Jazwinski Developer Tools');
	const [fileInfo, setFileInfo] = useState<{
		name: string;
		size: number;
		type: string;
		data: Uint8Array;
	} | null>(null);

	const [algorithm, setAlgorithm] = useState('SHA-256');
	const [isHmac, setIsHmac] = useState(false);
	const [key, setKey] = useState('');
	const [isUppercase, setIsUppercase] = useState(false);

	const [singleHash, setSingleHash] = useState('');
	const [allHashes, setAllHashes] = useState<Record<string, string>>({});
	const [viewMode, setViewMode] = useState<'single' | 'compare'>('compare');
	const [copiedKey, setCopiedKey] = useState<string | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [verifyChecksum, setVerifyChecksum] = useState('');
	const [isDragging, setIsDragging] = useState(false);

	const fileInputRef = useRef<HTMLInputElement | null>(null);

	// Get active byte array
	const getActiveBytes = useCallback((): Uint8Array => {
		if (inputMode === 'file' && fileInfo) {
			return fileInfo.data;
		}
		return new TextEncoder().encode(textInput);
	}, [inputMode, fileInfo, textInput]);

	// Calculate single hash / HMAC
	const runSingleHash = useCallback(async () => {
		try {
			setError(null);
			const data = getActiveBytes();

			if (data.length === 0) {
				setSingleHash('');
				return;
			}

			if (isHmac) {
				if (!key) {
					setError('HMAC requires a secret key.');
					setSingleHash('');
					return;
				}
				if (algorithm === 'CRC32' || algorithm === 'MD5') {
					setError(`HMAC is not supported natively for ${algorithm}. Use SHA algorithms.`);
					setSingleHash('');
					return;
				}

				const keyBytes = new TextEncoder().encode(key);
				const cryptoKey = await crypto.subtle.importKey(
					'raw',
					keyBytes,
					{ name: 'HMAC', hash: algorithm },
					false,
					['sign'],
				);
				const signature = await crypto.subtle.sign(
					'HMAC',
					cryptoKey,
					data as Uint8Array<ArrayBuffer>,
				);
				const hashHex = Array.from(new Uint8Array(signature))
					.map((b) => b.toString(16).padStart(2, '0'))
					.join('');
				setSingleHash(isUppercase ? hashHex.toUpperCase() : hashHex);
				return;
			}

			// Standard single digest
			if (algorithm === 'CRC32') {
				const crc = calculateCrc32(data);
				setSingleHash(isUppercase ? crc.toUpperCase() : crc);
			} else if (algorithm === 'MD5') {
				const md5 = calculateMd5(data);
				setSingleHash(isUppercase ? md5.toUpperCase() : md5);
			} else {
				const buf = await crypto.subtle.digest(
					algorithm,
					data as Uint8Array<ArrayBuffer>,
				);
				const hex = Array.from(new Uint8Array(buf))
					.map((b) => b.toString(16).padStart(2, '0'))
					.join('');
				setSingleHash(isUppercase ? hex.toUpperCase() : hex);
			}
		} catch (err: unknown) {
			const msg = err instanceof Error ? err.message : 'Hashing failed.';
			setError(msg);
			setSingleHash('');
		}
	}, [getActiveBytes, isHmac, key, algorithm, isUppercase]);

	// Calculate all hashes for compare table
	const runAllHashes = useCallback(async () => {
		const data = getActiveBytes();
		if (data.length === 0) {
			setAllHashes({});
			return;
		}

		try {
			const results = await computeAllHashes(data);
			setAllHashes(results);
		} catch {
			// Ignore
		}
	}, [getActiveBytes]);

	useEffect(() => {
		runSingleHash();
		runAllHashes();
	}, [runSingleHash, runAllHashes]);

	const handleFileUpload = (file: File) => {
		const reader = new FileReader();
		reader.onload = () => {
			if (reader.result instanceof ArrayBuffer) {
				const bytes = new Uint8Array(reader.result);
				setFileInfo({
					name: file.name,
					size: file.size,
					type: file.type || 'application/octet-stream',
					data: bytes,
				});
				setInputMode('file');
			}
		};
		reader.readAsArrayBuffer(file);
	};

	const copyToClipboard = (text: string, identifier = 'single') => {
		if (!text) return;
		navigator.clipboard.writeText(text);
		setCopiedKey(identifier);
		setTimeout(() => setCopiedKey(null), 2000);
	};

	// Checksum verification status
	const matchFound = Object.values(allHashes).some((h) => {
		if (!verifyChecksum.trim()) return false;
		return h.toLowerCase() === verifyChecksum.trim().toLowerCase();
	});

	return (
		<>
			<NextSeo
				title="Hash & Checksum Generator | SHA-256, MD5, HMAC - Joey Jazwinski"
				description="Compute SHA-256, SHA-512, SHA-1, MD5, and CRC32 hashes and HMAC secret key signatures in browser with drag-and-drop file checksum verification."
				canonical="https://joeyjazwinski.com/developer-tools/hash-generator"
				openGraph={{
					title: 'Hash & Checksum Generator | SHA-256, MD5, HMAC - Joey Jazwinski',
					description:
						'Compute SHA-256, SHA-512, SHA-1, MD5, and CRC32 hashes and HMAC secret key signatures in browser with drag-and-drop file checksum verification.',
					url: 'https://joeyjazwinski.com/developer-tools/hash-generator',
					type: 'website',
					images: [
						{
							url: 'https://joeyjazwinski.com/ogimage.png',
							width: 1200,
							height: 630,
							alt: 'Hash & HMAC Generator',
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
				name="Hash & HMAC Generator"
				description="Compute SHA-256, SHA-512, SHA-1, MD5, and CRC32 hashes and HMAC secret key signatures in browser with drag-and-drop file checksum verification."
				url="https://joeyjazwinski.com/developer-tools/hash-generator"
				category="SecurityApplication"
				faqs={HASH_FAQS}
			/>
			<main className="bg-background pt-32 pb-16 px-4 sm:px-6 lg:px-8 text-foreground">
				<div className="max-w-5xl mx-auto space-y-10">
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
							<Lock className="w-8 h-8" />
						</div>
						<h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl bg-linear-to-r from-primary to-rose-500 bg-clip-text text-transparent">
							Hash &amp; Checksum Generator
						</h1>
						<p className="text-muted-foreground text-lg">
							Generate cryptographic digests, HMAC signatures, and file checksums completely client-side with native Web Crypto APIs.
						</p>
					</div>

					{/* Workspace */}
					<div className="bg-card/60 backdrop-blur-xl border border-border/80 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
						{/* Source Mode Switcher */}
						<div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-border/50">
							<div className="flex items-center gap-2">
								<div className="inline-flex p-0.5 rounded-xl bg-secondary border border-border">
									<button
										onClick={() => setInputMode('text')}
										className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
											inputMode === 'text'
												? 'bg-background text-foreground shadow-xs'
												: 'text-muted-foreground hover:text-foreground'
										}`}
									>
										Text String
									</button>
									<button
										onClick={() => setInputMode('file')}
										className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
											inputMode === 'file'
												? 'bg-background text-foreground shadow-xs'
												: 'text-muted-foreground hover:text-foreground'
										}`}
									>
										File Checksum
									</button>
								</div>
							</div>

							{/* Display and Case controls */}
							<div className="flex items-center gap-3">
								<div className="inline-flex p-0.5 rounded-xl bg-secondary border border-border">
									<button
										onClick={() => setViewMode('compare')}
										className={`px-3 py-1 text-xs font-medium rounded-lg transition cursor-pointer ${
											viewMode === 'compare'
												? 'bg-background text-foreground shadow-xs'
												: 'text-muted-foreground hover:text-foreground'
										}`}
									>
										All Algorithms
									</button>
									<button
										onClick={() => setViewMode('single')}
										className={`px-3 py-1 text-xs font-medium rounded-lg transition cursor-pointer ${
											viewMode === 'single'
												? 'bg-background text-foreground shadow-xs'
												: 'text-muted-foreground hover:text-foreground'
										}`}
									>
										Single Digest
									</button>
								</div>

								<button
									onClick={() => setIsUppercase(!isUppercase)}
									className="px-2.5 py-1.5 text-xs font-mono rounded-lg bg-secondary hover:bg-secondary/80 border border-border text-muted-foreground hover:text-foreground transition cursor-pointer"
									title="Toggle Hex Case"
								>
									{isUppercase ? 'UPPERCASE' : 'lowercase'}
								</button>
							</div>
						</div>

						{/* Input Area */}
						{inputMode === 'text' ? (
							<div className="space-y-2">
								<div className="flex justify-between items-center text-xs font-semibold text-muted-foreground">
									<span>Input Text</span>
									<div className="flex items-center gap-2">
										<span>{new TextEncoder().encode(textInput).length} bytes</span>
										<button
											onClick={() => setTextInput('')}
											className="text-muted-foreground hover:text-foreground underline cursor-pointer"
										>
											Clear
										</button>
									</div>
								</div>
								<textarea
									rows={3}
									value={textInput}
									onChange={(e) => setTextInput(e.target.value)}
									placeholder="Enter text string to digest..."
									className="w-full p-4 rounded-xl border border-border bg-background text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary resize-none shadow-inner"
								/>
							</div>
						) : (
							<div className="space-y-3">
								<input
									type="file"
									ref={fileInputRef}
									onChange={(e) => {
										const file = e.target.files?.[0];
										if (file) handleFileUpload(file);
									}}
									className="hidden"
								/>

								{!fileInfo ? (
									<div
										onDragOver={(e) => {
											e.preventDefault();
											setIsDragging(true);
										}}
										onDragLeave={() => setIsDragging(false)}
										onDrop={(e) => {
											e.preventDefault();
											setIsDragging(false);
											const file = e.dataTransfer.files?.[0];
											if (file) handleFileUpload(file);
										}}
										onClick={() => fileInputRef.current?.click()}
										className={`p-8 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center gap-3 cursor-pointer transition ${
											isDragging
												? 'border-primary bg-primary/10'
												: 'border-border hover:border-primary/50 bg-secondary/20 hover:bg-secondary/40'
										}`}
									>
										<div className="p-3 rounded-full bg-primary/10 text-primary">
											<Upload className="w-6 h-6" />
										</div>
										<div className="text-center space-y-1">
											<p className="text-sm font-semibold text-foreground">
												Drop any file here or click to browse
											</p>
											<p className="text-xs text-muted-foreground">
												Processed 100% in your browser. Files are never uploaded to any server.
											</p>
										</div>
									</div>
								) : (
									<div className="flex items-center justify-between p-4 bg-secondary/40 border border-border rounded-xl">
										<div className="flex items-center gap-3">
											<div className="p-2.5 rounded-lg bg-primary/10 text-primary">
												<FileCode className="w-5 h-5" />
											</div>
											<div>
												<div className="text-sm font-bold text-foreground">
													{fileInfo.name}
												</div>
												<div className="text-xs text-muted-foreground">
													{(fileInfo.size / 1024).toFixed(1)} KB · {fileInfo.type}
												</div>
											</div>
										</div>
										<button
											onClick={() => {
												setFileInfo(null);
												if (fileInputRef.current) fileInputRef.current.value = '';
											}}
											className="p-1.5 rounded-lg hover:bg-secondary text-muted-foreground hover:text-foreground transition cursor-pointer"
											title="Remove file"
										>
											<X className="w-4 h-4" />
										</button>
									</div>
								)}
							</div>
						)}

						{/* Single Algorithm Options (if in single view mode) */}
						{viewMode === 'single' && (
							<div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-secondary/20 rounded-xl border border-border/60">
								<div className="space-y-1">
									<label htmlFor="algo-select" className="text-xs font-semibold text-muted-foreground">
										Algorithm
									</label>
									<select
										id="algo-select"
										value={algorithm}
										onChange={(e) => setAlgorithm(e.target.value)}
										className="w-full px-3 py-2 rounded-lg border border-border bg-background text-xs font-semibold focus:ring-1 focus:ring-primary cursor-pointer"
									>
										<option value="SHA-256">SHA-256</option>
										<option value="SHA-512">SHA-512</option>
										<option value="SHA-1">SHA-1</option>
										<option value="SHA-384">SHA-384</option>
										<option value="MD5">MD5</option>
										<option value="CRC32">CRC32</option>
									</select>
								</div>

								<div className="space-y-1">
									<span className="text-xs font-semibold text-muted-foreground block">Mode</span>
									<div className="flex gap-2">
										<button
											onClick={() => setIsHmac(false)}
											className={`flex-1 py-2 px-3 rounded-lg border text-xs font-semibold transition cursor-pointer ${
												!isHmac
													? 'bg-primary text-primary-foreground border-primary'
													: 'bg-background hover:bg-secondary border-border text-muted-foreground'
											}`}
										>
											Digest
										</button>
										<button
											onClick={() => setIsHmac(true)}
											disabled={algorithm === 'CRC32' || algorithm === 'MD5'}
											className={`flex-1 py-2 px-3 rounded-lg border text-xs font-semibold transition cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed ${
												isHmac
													? 'bg-primary text-primary-foreground border-primary'
													: 'bg-background hover:bg-secondary border-border text-muted-foreground'
											}`}
										>
											HMAC
										</button>
									</div>
								</div>

								{isHmac && (
									<div className="space-y-1">
										<label htmlFor="key-input" className="text-xs font-semibold text-muted-foreground">
											Secret Key
										</label>
										<input
											id="key-input"
											type="text"
											value={key}
											onChange={(e) => setKey(e.target.value)}
											placeholder="Enter secret key..."
											className="w-full px-3 py-2 rounded-lg border border-border bg-background text-xs focus:ring-1 focus:ring-primary"
										/>
									</div>
								)}
							</div>
						)}

						{/* Single Output */}
						{viewMode === 'single' ? (
							<div className="space-y-1.5">
								<div className="flex justify-between items-center text-xs font-semibold text-muted-foreground">
									<span>Output Hash ({algorithm})</span>
								</div>
								<div className="relative">
									<textarea
										readOnly
										value={singleHash}
										rows={2}
										className="w-full p-4 rounded-xl border border-border bg-background font-mono text-sm resize-none pr-12 break-all shadow-inner"
										placeholder="Hash output will appear here..."
									/>
									{singleHash && (
										<button
											onClick={() => copyToClipboard(singleHash, 'single')}
											className="absolute right-3 top-3 p-2 rounded-lg bg-card border border-border hover:bg-secondary text-muted-foreground hover:text-foreground transition cursor-pointer"
											title="Copy Hash"
										>
											{copiedKey === 'single' ? (
												<Check className="w-4 h-4 text-emerald-500" />
											) : (
												<Copy className="w-4 h-4" />
											)}
										</button>
									)}
								</div>
							</div>
						) : (
							/* Multi-Algorithm Comparison Grid */
							<div className="space-y-4">
								<div className="space-y-2">
									<h2 className="text-sm font-bold flex items-center gap-2">
										<Hash className="w-4 h-4 text-primary" />
										Checksum Comparison Matrix
									</h2>
									<div className="overflow-x-auto rounded-xl border border-border">
										<table className="w-full text-left text-xs font-mono">
											<thead className="bg-secondary/60 text-muted-foreground border-b border-border">
												<tr>
													<th className="p-3 font-semibold w-24">Algorithm</th>
													<th className="p-3 font-semibold">Checksum Value</th>
													<th className="p-3 font-semibold text-right w-20">Copy</th>
												</tr>
											</thead>
											<tbody className="divide-y divide-border/60 bg-background/50">
												{['MD5', 'SHA-1', 'SHA-256', 'SHA-384', 'SHA-512', 'CRC32'].map((algo) => {
													const val = allHashes[algo] || '';
													const formatted = isUppercase ? val.toUpperCase() : val;
													const isMatch =
														verifyChecksum &&
														val.toLowerCase() === verifyChecksum.trim().toLowerCase();

													return (
														<tr
															key={algo}
															className={`hover:bg-muted/40 transition-colors ${
																isMatch ? 'bg-emerald-500/10' : ''
															}`}
														>
															<td className="p-3 font-bold text-foreground">
																{algo}
															</td>
															<td className="p-3 break-all select-all font-mono text-xs text-foreground/90">
																{formatted || (
																	<span className="text-muted-foreground italic font-sans">
																		Calculating...
																	</span>
																)}
															</td>
															<td className="p-3 text-right">
																{val && (
																	<button
																		onClick={() => copyToClipboard(formatted, algo)}
																		className="p-1.5 rounded-md hover:bg-secondary border border-border text-muted-foreground hover:text-foreground cursor-pointer transition"
																		title={`Copy ${algo}`}
																	>
																		{copiedKey === algo ? (
																			<Check className="w-3.5 h-3.5 text-emerald-500" />
																		) : (
																			<Copy className="w-3.5 h-3.5" />
																		)}
																	</button>
																)}
															</td>
														</tr>
													);
												})}
											</tbody>
										</table>
									</div>
								</div>

								{/* Checksum Match Verification Drawer */}
								<div className="p-4 bg-secondary/30 rounded-xl border border-border/70 space-y-2">
									<label htmlFor="verify-input" className="text-xs font-semibold text-muted-foreground flex items-center justify-between">
										<span className="flex items-center gap-1.5">
											<Sparkles className="w-3.5 h-3.5 text-primary" />
											Verify Against Expected Hash
										</span>
										{verifyChecksum && (
											<span>
												{matchFound ? (
													<span className="inline-flex items-center gap-1 text-emerald-500 font-bold text-xs">
														<CheckCircle2 className="w-3.5 h-3.5" />
														Checksum Match Verified!
													</span>
												) : (
													<span className="inline-flex items-center gap-1 text-rose-500 font-bold text-xs">
														<XCircle className="w-3.5 h-3.5" />
														No match found
													</span>
												)}
											</span>
										)}
									</label>
									<input
										id="verify-input"
										type="text"
										value={verifyChecksum}
										onChange={(e) => setVerifyChecksum(e.target.value)}
										placeholder="Paste expected MD5, SHA-256, or CRC32 hash from release notes..."
										className="w-full px-3.5 py-2 text-xs font-mono bg-background border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-primary"
									/>
								</div>
							</div>
						)}

						{error && (
							<div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-xs text-red-500 font-medium">
								{error}
							</div>
						)}
					</div>

					<ToolFaqSection faqs={HASH_FAQS} />
				</div>
			</main>
		</>
	);
}
