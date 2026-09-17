import { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import { NextSeo } from 'next-seo';
import ToolJsonLd from '@/components/seo/ToolJsonLd';
import ToolFaqSection from '@/components/tools/ToolFaqSection';
import {
	Copy,
	Check,
	ArrowLeftRight,
	Upload,
	Image as ImageIcon,
	FileText,
	Code2,
	RefreshCw,
	Sparkles,
	X,
} from 'lucide-react';

const ENCODER_FAQS = [
	{
		question: 'What formats can I encode and decode?',
		answer:
			'Transform text and binary strings across Base64, URL percent-encoding, HTML decimal/named entities, Hex byte values, and image Data URIs.',
	},
	{
		question: 'What is a Data URI image?',
		answer:
			'A Data URI is a base64-encoded representation of an image embedded directly into HTML or CSS without requiring an external asset HTTP request.',
	},
	{
		question: 'Does this tool support Unicode and UTF-8 characters?',
		answer:
			'Yes. TextEncoder and TextDecoder are used to ensure multibyte Unicode characters and emojis encode and decode accurately.',
	},
];

type Mode = 'base64' | 'url' | 'html' | 'hex' | 'data-uri';
type Action = 'encode' | 'decode';

export default function EncoderDecoder() {
	const [mode, setMode] = useState<Mode>('base64');
	const [action, setAction] = useState<Action>('encode');
	const [inputText, setInputText] = useState('Hello World! Developer Tools & Utilities');
	const [outputText, setOutputText] = useState('');
	const [error, setError] = useState<string | null>(null);
	const [copied, setCopied] = useState<string | null>(null);

	// Hex options
	const [hexDelimiter, setHexDelimiter] = useState<'space' | 'none' | 'prefix'>('space');

	// File / Image Data URI states
	const [dataUriFile, setDataUriFile] = useState<{
		name: string;
		size: number;
		type: string;
		dataUri: string;
	} | null>(null);
	const [isDragging, setIsDragging] = useState(false);
	const fileInputRef = useRef<HTMLInputElement | null>(null);

	// HTML Entity Helpers
	const encodeHtml = (str: string) => {
		return str.replace(/[\u00A0-\u9999<>&"']/g, (i) => `&#${i.charCodeAt(0)};`);
	};

	const decodeHtml = (str: string) => {
		const doc = new DOMParser().parseFromString(str, 'text/html');
		return doc.documentElement.textContent || '';
	};

	// Hex Helpers
	const textToHex = (str: string, delim: 'space' | 'none' | 'prefix') => {
		const encoder = new TextEncoder();
		const bytes = encoder.encode(str);
		return Array.from(bytes)
			.map((b) => {
				const h = b.toString(16).padStart(2, '0');
				return delim === 'prefix' ? `0x${h}` : h;
			})
			.join(delim === 'space' || delim === 'prefix' ? ' ' : '');
	};

	const hexToText = (hex: string) => {
		const clean = hex.replace(/0x/g, '').replace(/[\s,]+/g, '');
		if (clean.length % 2 !== 0) {
			throw new Error('Hex string must have an even number of characters.');
		}
		const bytes = new Uint8Array(clean.length / 2);
		for (let i = 0; i < clean.length; i += 2) {
			const byteVal = parseInt(clean.substring(i, i + 2), 16);
			if (isNaN(byteVal)) throw new Error('Invalid hexadecimal character.');
			bytes[i / 2] = byteVal;
		}
		return new TextDecoder().decode(bytes);
	};

	// Processing logic
	useEffect(() => {
		if (mode === 'data-uri') {
			if (dataUriFile) {
				setOutputText(dataUriFile.dataUri);
				setError(null);
			} else {
				setOutputText('');
				setError(null);
			}
			return;
		}

		if (!inputText) {
			setOutputText('');
			setError(null);
			return;
		}

		try {
			let result = '';
			if (mode === 'base64') {
				if (action === 'encode') {
					result = btoa(unescape(encodeURIComponent(inputText)));
				} else {
					result = decodeURIComponent(escape(atob(inputText.trim())));
				}
			} else if (mode === 'url') {
				if (action === 'encode') {
					result = encodeURIComponent(inputText);
				} else {
					result = decodeURIComponent(inputText);
				}
			} else if (mode === 'html') {
				if (action === 'encode') {
					result = encodeHtml(inputText);
				} else {
					result = decodeHtml(inputText);
				}
			} else if (mode === 'hex') {
				if (action === 'encode') {
					result = textToHex(inputText, hexDelimiter);
				} else {
					result = hexToText(inputText);
				}
			}

			setOutputText(result);
			setError(null);
		} catch (err: unknown) {
			const msg = err instanceof Error ? err.message : 'Invalid input format';
			setError(`Failed to ${action} ${mode}: ${msg}`);
			setOutputText('');
		}
	}, [inputText, mode, action, hexDelimiter, dataUriFile]);

	const handleFileSelect = (file: File) => {
		const reader = new FileReader();
		reader.onload = () => {
			if (typeof reader.result === 'string') {
				setDataUriFile({
					name: file.name,
					size: file.size,
					type: file.type || 'application/octet-stream',
					dataUri: reader.result,
				});
				setError(null);
			}
		};
		reader.readAsDataURL(file);
	};

	const swapInputOutput = () => {
		if (mode === 'data-uri') return;
		if (!outputText) return;
		setInputText(outputText);
		setAction(action === 'encode' ? 'decode' : 'encode');
	};

	const copyToClipboard = (text: string, id = 'main') => {
		if (!text) return;
		navigator.clipboard.writeText(text);
		setCopied(id);
		setTimeout(() => setCopied(null), 2000);
	};

	const clearAll = () => {
		setInputText('');
		setOutputText('');
		setDataUriFile(null);
		setError(null);
		if (fileInputRef.current) fileInputRef.current.value = '';
	};

	return (
		<>
			<NextSeo
				title="Encoder & Decoder | Base64, URL, HTML & Data URI - Joey Jazwinski"
				description="Encode and decode text, URLs, HTML entities, hex bytes, and files to Base64 Data URIs with live image previews in your browser."
				canonical="https://joeyjazwinski.com/developer-tools/encoder-decoder"
				openGraph={{
					title: 'Encoder & Decoder | Base64, URL, HTML & Data URI - Joey Jazwinski',
					description:
						'Encode and decode text, URLs, HTML entities, hex bytes, and files to Base64 Data URIs with live image previews in your browser.',
					url: 'https://joeyjazwinski.com/developer-tools/encoder-decoder',
					type: 'website',
					images: [
						{
							url: 'https://joeyjazwinski.com/ogimage.png',
							width: 1200,
							height: 630,
							alt: 'Encoder & Decoder Tool',
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
				name="Encoder & Decoder Tool"
				description="Encode and decode text, URLs, HTML entities, hex bytes, and files to Base64 Data URIs with live image previews in your browser."
				url="https://joeyjazwinski.com/developer-tools/encoder-decoder"
				category="DeveloperApplication"
				faqs={ENCODER_FAQS}
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
							<ArrowLeftRight className="w-8 h-8" />
						</div>
						<h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl bg-linear-to-r from-primary to-blue-500 bg-clip-text text-transparent">
							Encoder &amp; Decoder
						</h1>
						<p className="text-muted-foreground text-lg">
							Transform text, URLs, HTML entities, hex strings, and binary images to Base64 Data URIs with live preview rendering.
						</p>
					</div>

					{/* Workspace Card */}
					<div className="bg-card/60 backdrop-blur-xl border border-border/80 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
						{/* Mode Bar */}
						<div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-border/50">
							<div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-secondary border border-border">
								{(
									[
										{ id: 'base64', label: 'Base64' },
										{ id: 'url', label: 'URL Component' },
										{ id: 'html', label: 'HTML Entities' },
										{ id: 'hex', label: 'Hex' },
										{ id: 'data-uri', label: 'Image to Data URI' },
									] as const
								).map((item) => (
									<button
										key={item.id}
										onClick={() => {
											setMode(item.id);
											setError(null);
										}}
										className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
											mode === item.id
												? 'bg-background text-foreground shadow-xs'
												: 'text-muted-foreground hover:text-foreground'
										}`}
									>
										{item.label}
									</button>
								))}
							</div>

							{mode !== 'data-uri' && (
								<div className="flex items-center gap-2">
									<div className="inline-flex p-1 rounded-xl bg-secondary border border-border">
										<button
											onClick={() => setAction('encode')}
											className={`px-3 py-1 text-xs font-semibold rounded-lg transition cursor-pointer ${
												action === 'encode'
													? 'bg-background text-foreground shadow-xs'
													: 'text-muted-foreground hover:text-foreground'
											}`}
										>
											Encode
										</button>
										<button
											onClick={() => setAction('decode')}
											className={`px-3 py-1 text-xs font-semibold rounded-lg transition cursor-pointer ${
												action === 'decode'
													? 'bg-background text-foreground shadow-xs'
													: 'text-muted-foreground hover:text-foreground'
											}`}
										>
											Decode
										</button>
									</div>

									<button
										onClick={swapInputOutput}
										disabled={!outputText}
										className="p-2 rounded-xl bg-secondary hover:bg-secondary/80 border border-border text-muted-foreground hover:text-foreground transition cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
										title="Swap Input and Output"
									>
										<ArrowLeftRight className="w-3.5 h-3.5" />
									</button>
								</div>
							)}
						</div>

						{/* Hex Options bar */}
						{mode === 'hex' && action === 'encode' && (
							<div className="flex items-center gap-3 px-4 py-2 bg-secondary/30 rounded-xl border border-border text-xs">
								<span className="font-semibold text-muted-foreground">Format:</span>
								{(
									[
										{ id: 'space', label: 'Space separated (48 65 6c)' },
										{ id: 'none', label: 'Continuous (48656c)' },
										{ id: 'prefix', label: 'Prefix (0x48 0x65)' },
									] as const
								).map((fmt) => (
									<label key={fmt.id} className="inline-flex items-center gap-1.5 cursor-pointer">
										<input
											type="radio"
											name="hexDelim"
											checked={hexDelimiter === fmt.id}
											onChange={() => setHexDelimiter(fmt.id)}
											className="text-primary focus:ring-primary"
										/>
										<span>{fmt.label}</span>
									</label>
								))}
							</div>
						)}

						{/* Data URI Mode */}
						{mode === 'data-uri' ? (
							<div className="space-y-6">
								<input
									type="file"
									ref={fileInputRef}
									accept="image/*,.svg,.pdf,.txt,.json"
									onChange={(e) => {
										const f = e.target.files?.[0];
										if (f) handleFileSelect(f);
									}}
									className="hidden"
								/>

								{!dataUriFile ? (
									<div
										onDragOver={(e) => {
											e.preventDefault();
											setIsDragging(true);
										}}
										onDragLeave={() => setIsDragging(false)}
										onDrop={(e) => {
											e.preventDefault();
											setIsDragging(false);
											const f = e.dataTransfer.files?.[0];
											if (f) handleFileSelect(f);
										}}
										onClick={() => fileInputRef.current?.click()}
										className={`p-10 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center gap-3 cursor-pointer transition ${
											isDragging
												? 'border-primary bg-primary/10'
												: 'border-border hover:border-primary/50 bg-secondary/20 hover:bg-secondary/40'
										}`}
									>
										<div className="p-3 rounded-full bg-primary/10 text-primary">
											<ImageIcon className="w-8 h-8" />
										</div>
										<div className="text-center space-y-1">
											<p className="text-sm font-semibold text-foreground">
												Drop an image or file to encode as Base64 Data URI
											</p>
											<p className="text-xs text-muted-foreground">
												Supports PNG, JPEG, SVG, WebP, GIF, and standard documents. Zero upload.
											</p>
										</div>
									</div>
								) : (
									<div className="space-y-4">
										{/* File Info & Preview */}
										<div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-secondary/40 border border-border rounded-xl">
											<div className="flex items-center gap-4">
												{dataUriFile.type.startsWith('image/') ? (
													<img
														src={dataUriFile.dataUri}
														alt={dataUriFile.name}
														className="w-16 h-16 object-contain rounded-lg border border-border bg-background p-1"
													/>
												) : (
													<div className="p-3 rounded-lg bg-primary/10 text-primary">
														<FileText className="w-6 h-6" />
													</div>
												)}
												<div>
													<div className="text-sm font-bold text-foreground">
														{dataUriFile.name}
													</div>
													<div className="text-xs text-muted-foreground">
														Raw: {(dataUriFile.size / 1024).toFixed(1)} KB · URI:{' '}
														{(dataUriFile.dataUri.length / 1024).toFixed(1)} KB ·{' '}
														{dataUriFile.type}
													</div>
												</div>
											</div>

											<div className="flex items-center gap-2">
												<button
													onClick={() =>
														fileInputRef.current?.click()
													}
													className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-secondary hover:bg-secondary/80 border border-border cursor-pointer transition"
												>
													Change File
												</button>
												<button
													onClick={clearAll}
													className="p-1.5 rounded-lg hover:bg-secondary text-muted-foreground hover:text-foreground cursor-pointer transition"
												>
													<X className="w-4 h-4" />
												</button>
											</div>
										</div>

										{/* Snippet Quick-Copies */}
										<div className="flex flex-wrap gap-2">
											<button
												onClick={() =>
													copyToClipboard(
														dataUriFile.dataUri,
														'raw-uri',
													)
												}
												className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg bg-secondary hover:bg-secondary/80 border border-border text-foreground font-medium cursor-pointer transition"
											>
												{copied === 'raw-uri' ? (
													<Check className="w-3.5 h-3.5 text-emerald-500" />
												) : (
													<Copy className="w-3.5 h-3.5" />
												)}
												Copy Data URI
											</button>
											{dataUriFile.type.startsWith('image/') && (
												<>
													<button
														onClick={() =>
															copyToClipboard(
																`<img src="${dataUriFile.dataUri}" alt="${dataUriFile.name}" />`,
																'html-img',
															)
														}
														className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg bg-secondary hover:bg-secondary/80 border border-border text-foreground font-medium cursor-pointer transition"
													>
														{copied === 'html-img' ? (
															<Check className="w-3.5 h-3.5 text-emerald-500" />
														) : (
															<Code2 className="w-3.5 h-3.5" />
														)}
														Copy &lt;img&gt; Tag
													</button>
													<button
														onClick={() =>
															copyToClipboard(
																`background-image: url('${dataUriFile.dataUri}');`,
																'css-bg',
															)
														}
														className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg bg-secondary hover:bg-secondary/80 border border-border text-foreground font-medium cursor-pointer transition"
													>
														{copied === 'css-bg' ? (
															<Check className="w-3.5 h-3.5 text-emerald-500" />
														) : (
															<Sparkles className="w-3.5 h-3.5" />
														)}
														Copy CSS background
													</button>
												</>
											)}
										</div>

										{/* Data URI Output Box */}
										<div className="space-y-1.5">
											<label className="text-xs font-semibold text-muted-foreground">
												Data URI String
											</label>
											<textarea
												readOnly
												rows={6}
												value={dataUriFile.dataUri}
												className="w-full p-4 rounded-xl border border-border bg-background/60 font-mono text-xs focus:outline-none resize-none break-all shadow-inner"
											/>
										</div>
									</div>
								)}
							</div>
						) : (
							/* Standard Text Input / Output Grid */
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								{/* Input Box */}
								<div className="space-y-2">
									<div className="flex justify-between items-center text-xs font-semibold text-muted-foreground">
										<label htmlFor="input-box">
											{action === 'encode' ? 'Raw Input' : `Encoded (${mode})`}
										</label>
										<div className="flex items-center gap-2">
											<span>{inputText.length} chars</span>
											<button
												onClick={clearAll}
												className="text-muted-foreground hover:text-foreground underline cursor-pointer"
											>
												Clear
											</button>
										</div>
									</div>
									<textarea
										id="input-box"
										rows={10}
										value={inputText}
										onChange={(e) => setInputText(e.target.value)}
										className="w-full p-4 rounded-xl border border-border bg-background font-mono text-xs focus:outline-none focus:ring-2 focus:ring-primary resize-none shadow-inner"
										placeholder="Type or paste contents here..."
									/>
								</div>

								{/* Output Box */}
								<div className="space-y-2">
									<div className="flex justify-between items-center text-xs font-semibold text-muted-foreground">
										<span>
											{action === 'encode' ? `Encoded (${mode})` : 'Decoded Result'}
										</span>
										<span>{outputText.length} chars</span>
									</div>
									<div className="relative group">
										<textarea
											readOnly
											rows={10}
											value={outputText}
											className="w-full p-4 rounded-xl border border-border bg-background/50 font-mono text-xs focus:outline-none resize-none shadow-inner pr-12 break-all"
											placeholder="Result will appear here..."
										/>
										{outputText && (
											<button
												onClick={() => copyToClipboard(outputText, 'main')}
												className="absolute right-3 top-3 p-2 rounded-lg bg-card border border-border hover:bg-secondary text-muted-foreground hover:text-foreground transition shadow-sm cursor-pointer"
												title="Copy Result"
											>
												{copied === 'main' ? (
													<Check className="w-4 h-4 text-emerald-500" />
												) : (
													<Copy className="w-4 h-4" />
												)}
											</button>
										)}
									</div>
								</div>
							</div>
						)}

						{error && (
							<div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-xs text-red-500 font-medium">
								{error}
							</div>
						)}
					</div>

					<ToolFaqSection faqs={ENCODER_FAQS} />
				</div>
			</main>
		</>
	);
}
