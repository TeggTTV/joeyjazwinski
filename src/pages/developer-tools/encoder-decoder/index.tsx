import { useState, useEffect } from 'react';
import { NextSeo } from 'next-seo';
import ToolJsonLd from '@/components/seo/ToolJsonLd';
import { Copy, Check, ArrowLeftRight } from 'lucide-react';

export default function EncoderDecoder() {
	const [inputText, setInputText] = useState('Hello World! Developer Tools');
	const [outputText, setOutputText] = useState('');
	const [mode, setMode] = useState<'url' | 'base64'>('base64');
	const [action, setAction] = useState<'encode' | 'decode'>('encode');
	const [error, setError] = useState<string | null>(null);
	const [copied, setCopied] = useState(false);

	useEffect(() => {
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
					result = decodeURIComponent(escape(atob(inputText)));
				}
			} else {
				if (action === 'encode') {
					result = encodeURIComponent(inputText);
				} else {
					result = decodeURIComponent(inputText);
				}
			}
			setOutputText(result);
			setError(null);
		} catch (err: any) {
			setError(
				`Failed to ${action} in ${mode === 'base64' ? 'Base64' : 'URL'} format. Verify input character validity.`,
			);
			setOutputText('');
		}
	}, [inputText, mode, action]);

	const copyToClipboard = () => {
		if (!outputText) return;
		navigator.clipboard.writeText(outputText);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	const clearAll = () => {
		setInputText('');
		setOutputText('');
		setError(null);
	};

	return (
		<>
			<NextSeo
				title="URL, Base64 & HTML Entity Encoder/Decoder Tool - Joey Jazwinski"
				description="Quickly encode and decode URL strings, Base64 data, and HTML entities client-side with one click and immediate clipboard copying."
				canonical="https://joeyjazwinski.com/developer-tools/encoder-decoder"
				openGraph={{
					title: "URL, Base64 & HTML Entity Encoder/Decoder Tool - Joey Jazwinski",
					description: "Quickly encode and decode URL strings, Base64 data, and HTML entities client-side with one click and immediate clipboard copying.",
					url: "https://joeyjazwinski.com/developer-tools/encoder-decoder",
					type: "website",
					images: [
						{
							url: "https://joeyjazwinski.com/ogimage.png",
							width: 1200,
							height: 630,
							alt: "URL & Base64 Encoder/Decoder",
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
				name="URL & Base64 Encoder/Decoder"
				description="Quickly encode and decode URL strings, Base64 data, and HTML entities client-side with one click and immediate clipboard copying."
				url="https://joeyjazwinski.com/developer-tools/encoder-decoder"
				category="DeveloperApplication"
			/>
			<main className="min-h-screen bg-background pt-32 pb-16 px-4 sm:px-6 lg:px-8 text-foreground">
				<div className="max-w-6xl mx-auto space-y-12">
					{/* Header */}
					<div className="text-center space-y-4 max-w-2xl mx-auto">
						<div className="inline-flex p-3 rounded-2xl bg-primary/10 text-primary border border-primary/20">
							<ArrowLeftRight className="w-8 h-8" />
						</div>
						<h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl bg-linear-to-r from-primary to-blue-500 bg-clip-text text-transparent">
							Base64 & URL Encoder/Decoder
						</h1>
						<p className="text-muted-foreground text-lg">
							Safely convert raw data and text templates to Base64
							formats or query-safe URL structures.
						</p>
					</div>

					{/* Layout */}
					<div className="bg-card/60 backdrop-blur-xl border border-border/80 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl max-w-4xl mx-auto">
						{/* Configuration bar */}
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-4 border-b border-border/50">
							<div className="space-y-1.5">
								<span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
									Method
								</span>
								<div className="flex gap-2">
									<button
										onClick={() => setMode('base64')}
										className={`flex-1 py-2 px-3 rounded-xl border text-sm font-semibold transition ${
											mode === 'base64'
												? 'bg-primary text-primary-foreground border-transparent'
												: 'bg-background hover:bg-secondary border-border text-muted-foreground hover:text-foreground'
										}`}
									>
										Base64
									</button>
									<button
										onClick={() => setMode('url')}
										className={`flex-1 py-2 px-3 rounded-xl border text-sm font-semibold transition ${
											mode === 'url'
												? 'bg-primary text-primary-foreground border-transparent'
												: 'bg-background hover:bg-secondary border-border text-muted-foreground hover:text-foreground'
										}`}
									>
										URL Encode
									</button>
								</div>
							</div>

							<div className="space-y-1.5">
								<span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
									Direction
								</span>
								<div className="flex gap-2">
									<button
										onClick={() => setAction('encode')}
										className={`flex-1 py-2 px-3 rounded-xl border text-sm font-semibold transition ${
											action === 'encode'
												? 'bg-primary text-primary-foreground border-transparent'
												: 'bg-background hover:bg-secondary border-border text-muted-foreground hover:text-foreground'
										}`}
									>
										Encode
									</button>
									<button
										onClick={() => setAction('decode')}
										className={`flex-1 py-2 px-3 rounded-xl border text-sm font-semibold transition ${
											action === 'decode'
												? 'bg-primary text-primary-foreground border-transparent'
												: 'bg-background hover:bg-secondary border-border text-muted-foreground hover:text-foreground'
										}`}
									>
										Decode
									</button>
								</div>
							</div>
						</div>

						{/* Text Boxes Grid */}
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
							{/* Input Box */}
							<div className="space-y-2">
								<div className="flex justify-between items-center text-sm font-semibold text-muted-foreground">
									<label htmlFor="input-box">
										Input Text
									</label>
									<button
										onClick={clearAll}
										className="text-xs font-normal text-muted-foreground hover:text-foreground"
									>
										Clear
									</button>
								</div>
								<textarea
									id="input-box"
									value={inputText}
									onChange={(e) =>
										setInputText(e.target.value)
									}
									className="w-full h-64 p-4 rounded-xl border border-border bg-background/90 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none shadow-inner"
									placeholder="Type or paste contents here..."
								/>
							</div>

							{/* Output Box */}
							<div className="space-y-2">
								<div className="flex justify-between items-center text-sm font-semibold text-muted-foreground">
									<span>Output Result</span>
									<span>
										{outputText
											? `${outputText.length} chars`
											: '0 chars'}
									</span>
								</div>
								<div className="relative group">
									<textarea
										readOnly
										value={outputText}
										className="w-full h-64 p-4 rounded-xl border border-border bg-background/50 font-mono text-sm focus:outline-none focus:ring-1 focus:ring-border resize-none shadow-inner"
										placeholder="Encoded/Decoded results will show here..."
									/>
									{outputText && (
										<button
											onClick={copyToClipboard}
											className="absolute right-3 top-3 p-2 rounded-lg bg-card border border-border hover:bg-secondary text-muted-foreground hover:text-foreground transition shadow"
											title="Copy to Clipboard"
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
							<div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-xs text-red-500 font-medium">
								{error}
							</div>
						)}
					</div>
				</div>
			</main>
		</>
	);
}
