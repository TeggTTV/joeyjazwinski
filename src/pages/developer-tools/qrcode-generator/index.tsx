import { useState, useEffect, useRef } from 'react';
import { NextSeo } from 'next-seo';
import { Download, Link as LinkIcon, QrCode, RefreshCw } from 'lucide-react';

declare const QRCode: any;

export default function QRCodeGenerator() {
	const [inputLink, setInputLink] = useState('https://google.com');
	const [pixelSize, setPixelSize] = useState(300);
	const [colorDark, setColorDark] = useState('#000000');
	const [colorLight, setColorLight] = useState('#ffffff');
	const [loading, setLoading] = useState(false);
	const containerRef = useRef<HTMLDivElement>(null);
	const qrcodeInstanceRef = useRef<any>(null);

	useEffect(() => {
		if (typeof window === 'undefined' || !containerRef.current) return;

		setLoading(true);
		if (containerRef.current) {
			containerRef.current.innerHTML = '';
		}

		if (inputLink.trim()) {
			if (inputLink.length > 256) {
				setInputLink('');
				return;
			} else {
				qrcodeInstanceRef.current = new QRCode(containerRef.current, {
					text: inputLink,
					width: pixelSize,
					height: pixelSize,
					colorDark: colorDark,
					colorLight: colorLight,
					correctLevel: QRCode.CorrectLevel.H,
				});
			}
		}
		setLoading(false);
	}, [inputLink, pixelSize, colorDark, colorLight]);

	const handleDownload = () => {
		if (!containerRef.current) return;

		const img = containerRef.current.querySelector('img');
		const canvas = containerRef.current.querySelector('canvas');

		let dataUrl = '';
		if (img && img.src && img.src.startsWith('data:')) {
			dataUrl = img.src;
		} else if (canvas) {
			dataUrl = canvas.toDataURL('image/png');
		}

		if (dataUrl) {
			const link = document.createElement('a');
			link.href = dataUrl;
			link.download = `qrcode-${pixelSize}px.png`;
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
		}
	};

	const sizes = [100, 200, 300, 400, 500, 600, 700];

	return (
		<>
			<NextSeo
				title="QR Code Generator - Joey Jazwinski"
				description="Generate high-quality custom QR codes instantly. Customize size, colors, and download your QR code."
			/>
			<main className="min-h-screen bg-background pt-32 pb-16 px-4 sm:px-6 lg:px-8 text-foreground">
				<div className="max-w-6xl mx-auto space-y-12">
					{/* Header */}
					<div className="text-center space-y-4 max-w-2xl mx-auto">
						<div className="inline-flex p-3 rounded-2xl bg-primary/10 text-primary border border-primary/20 animate-pulse">
							<QrCode className="w-8 h-8" />
						</div>
						<h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl bg-linear-to-r from-primary to-purple-600 bg-clip-text text-transparent">
							QR Code Generator
						</h1>
						<p className="text-muted-foreground text-lg">
							Create simple, high-resolution QR codes quickly.
							Input a link, customize the size and colors, and
							export instantly.
						</p>
					</div>

					{/* Tool Workspace */}
					<div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
						{/* Configuration Controls */}
						<div className="lg:col-span-7 bg-card/60 backdrop-blur-xl border border-border/80 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
							<h2 className="text-xl font-bold border-b border-border/50 pb-3">
								Customize QR Code
							</h2>

							{/* Input URL/Text */}
							<div className="space-y-2">
								<label
									htmlFor="url-input"
									className="block text-sm font-semibold text-muted-foreground"
								>
									Target Link or Content
								</label>
								<div className="relative">
									<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground/75">
										<LinkIcon className="h-5 w-5" />
									</div>
									<input
										id="url-input"
										type="text"
										className="block w-full pl-10 pr-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
										placeholder="https://example.com"
										value={inputLink}
										onChange={(e) =>
											setInputLink(e.target.value)
										}
									/>
								</div>
							</div>

							<div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
								{/* Size Dropdown */}
								<div className="space-y-2">
									<label
										htmlFor="size-select"
										className="block text-sm font-semibold text-muted-foreground"
									>
										Resolution (Pixel Size)
									</label>
									<select
										id="size-select"
										className="block w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary transition"
										value={pixelSize}
										onChange={(e) =>
											setPixelSize(Number(e.target.value))
										}
									>
										{sizes.map((size) => (
											<option key={size} value={size}>
												{size} x {size} px
											</option>
										))}
									</select>
								</div>

								{/* Color Pickers */}
								<div className="grid grid-cols-2 gap-4">
									<div className="space-y-2">
										<label
											htmlFor="dark-color"
											className="block text-sm font-semibold text-muted-foreground"
										>
											QR Code Color
										</label>
										<div className="flex items-center gap-2">
											<input
												id="dark-color"
												type="color"
												className="w-10 h-10 rounded border border-border cursor-pointer bg-transparent"
												value={colorDark}
												onChange={(e) =>
													setColorDark(e.target.value)
												}
											/>
											<span className="text-xs font-mono uppercase">
												{colorDark}
											</span>
										</div>
									</div>
									<div className="space-y-2">
										<label
											htmlFor="light-color"
											className="block text-sm font-semibold text-muted-foreground"
										>
											Background Color
										</label>
										<div className="flex items-center gap-2">
											<input
												id="light-color"
												type="color"
												className="w-10 h-10 rounded border border-border cursor-pointer bg-transparent"
												value={colorLight}
												onChange={(e) =>
													setColorLight(
														e.target.value,
													)
												}
											/>
											<span className="text-xs font-mono uppercase">
												{colorLight}
											</span>
										</div>
									</div>
								</div>
							</div>
						</div>

						{/* Preview Output */}
						<div className="lg:col-span-5 flex flex-col items-center">
							<div className="w-full bg-card/60 backdrop-blur-xl border border-border/80 rounded-2xl p-6 sm:p-8 flex flex-col items-center justify-between min-h-120 shadow-xl relative overflow-hidden">
								<div className="absolute top-4 right-4">
									{loading && (
										<RefreshCw className="w-5 h-5 animate-spin text-primary" />
									)}
								</div>

								<div className="w-full grow flex items-center justify-center py-6">
									<div
										className="p-4 rounded-xl border border-border bg-white shadow-inner flex items-center justify-center transition-all duration-300"
										style={{
											maxWidth: '100%',
											maxHeight: '340px',
											aspectRatio: '1/1',
											backgroundColor: colorLight,
										}}
									>
										<div
											ref={containerRef}
											className="qr-code-wrapper"
											style={{
												width: '100%',
												height: '100%',
												display: 'flex',
												alignItems: 'center',
												justifyContent: 'center',
											}}
										/>
									</div>
								</div>

								<div className="w-full space-y-4">
									<button
										onClick={handleDownload}
										disabled={!inputLink.trim()}
										className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/95 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
									>
										<Download className="w-5 h-5" />
										Download PNG ({pixelSize}px)
									</button>
									<p className="text-xs text-center text-muted-foreground">
										Live rendering on link/parameter
										adjustment.
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</main>
		</>
	);
}
