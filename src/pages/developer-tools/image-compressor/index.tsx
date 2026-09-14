import React, { useState, useRef, useEffect, useMemo } from 'react';
import { NextSeo } from 'next-seo';
import ToolJsonLd from '@/components/seo/ToolJsonLd';
import {
	Upload,
	Download,
	RefreshCw,
	Image as ImageIcon,
	Percent,
	Archive,
	Trash2,
	Sparkles,
	Sliders,
	Check,
} from 'lucide-react';
import { createZipArchive, ZipFileEntry } from '@/lib/zipHelper';

interface ProcessedImage {
	id: string;
	fileName: string;
	originalSize: number;
	compressedSize: number;
	dataUrl: string;
	width: number;
	height: number;
	mimeType: string;
}

type DimensionPreset = 'original' | 'social_og' | 'instagram' | 'twitter' | 'avatar';
type ExportFormat = 'image/jpeg' | 'image/webp' | 'image/png';

const PRESETS: Array<{ id: DimensionPreset; label: string; width?: number; height?: number }> = [
	{ id: 'original', label: 'Keep Aspect Ratio (Max Width)' },
	{ id: 'social_og', label: 'Social OG Banner (1200 x 630)', width: 1200, height: 630 },
	{ id: 'instagram', label: 'Square Post (1080 x 1080)', width: 1080, height: 1080 },
	{ id: 'twitter', label: 'Twitter Header (1200 x 675)', width: 1200, height: 675 },
	{ id: 'avatar', label: 'Profile Avatar (256 x 256)', width: 256, height: 256 },
];

export default function ImageCompressor() {
	const [rawFiles, setRawFiles] = useState<Array<{ file: File; dataUrl: string }>>([]);
	const [processedImages, setProcessedImages] = useState<ProcessedImage[]>([]);
	const [quality, setQuality] = useState(0.8);
	const [format, setFormat] = useState<ExportFormat>('image/jpeg');
	const [preset, setPreset] = useState<DimensionPreset>('original');
	const [maxWidth, setMaxWidth] = useState<number>(1200);
	const [isProcessing, setIsProcessing] = useState(false);

	const formatSize = (bytes: number) => {
		if (bytes === 0) return '0 B';
		const k = 1024;
		const sizes = ['B', 'KB', 'MB'];
		const i = Math.floor(Math.log(bytes) / Math.log(k));
		return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
	};

	// Process all files when parameters change
	const compressAll = async () => {
		if (rawFiles.length === 0) return;
		setIsProcessing(true);

		const results: ProcessedImage[] = [];

		for (const item of rawFiles) {
			await new Promise<void>((resolve) => {
				const img = new Image();
				img.onload = () => {
					let targetW = img.width;
					let targetH = img.height;

					const activePreset = PRESETS.find((p) => p.id === preset);
					if (activePreset && activePreset.width && activePreset.height) {
						targetW = activePreset.width;
						targetH = activePreset.height;
					} else {
						if (targetW > maxWidth) {
							targetH = Math.round((targetH * maxWidth) / targetW);
							targetW = maxWidth;
						}
					}

					const canvas = document.createElement('canvas');
					canvas.width = targetW;
					canvas.height = targetH;
					const ctx = canvas.getContext('2d');
					if (!ctx) {
						resolve();
						return;
					}

					ctx.drawImage(img, 0, 0, targetW, targetH);
					const dataUrl = canvas.toDataURL(format, quality);

					// Estimate byte size from data uri
					const base64Data = dataUrl.split(',')[1] || '';
					const compressedBytes = Math.round((base64Data.length * 3) / 4);

					const ext = format === 'image/webp' ? 'webp' : format === 'image/png' ? 'png' : 'jpg';
					const cleanName = item.file.name.replace(/\.[^/.]+$/, '') + `-compressed.${ext}`;

					results.push({
						id: Math.random().toString(36).substring(2, 9),
						fileName: cleanName,
						originalSize: item.file.size,
						compressedSize: compressedBytes,
						dataUrl,
						width: targetW,
						height: targetH,
						mimeType: format,
					});
					resolve();
				};
				img.src = item.dataUrl;
			});
		}

		setProcessedImages(results);
		setIsProcessing(false);
	};

	useEffect(() => {
		compressAll();
	}, [rawFiles, quality, format, preset, maxWidth]);

	const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = Array.from(e.target.files || []);
		if (files.length === 0) return;

		const readers = files.map((file) => {
			return new Promise<{ file: File; dataUrl: string }>((resolve) => {
				const reader = new FileReader();
				reader.onload = (event) => {
					resolve({ file, dataUrl: event.target?.result as string });
				};
				reader.readAsDataURL(file);
			});
		});

		Promise.all(readers).then((loaded) => {
			setRawFiles((prev) => [...prev, ...loaded]);
		});
	};

	const downloadSingle = (img: ProcessedImage) => {
		const a = document.createElement('a');
		a.href = img.dataUrl;
		a.download = img.fileName;
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
	};

	const downloadAllZip = () => {
		if (processedImages.length === 0) return;

		const zipEntries: ZipFileEntry[] = processedImages.map((img) => {
			const base64 = img.dataUrl.split(',')[1] || '';
			const binary = atob(base64);
			const bytes = new Uint8Array(binary.length);
			for (let i = 0; i < binary.length; i++) {
				bytes[i] = binary.charCodeAt(i);
			}
			return { name: img.fileName, data: bytes };
		});

		const zipBlob = createZipArchive(zipEntries);
		const url = URL.createObjectURL(zipBlob);
		const a = document.createElement('a');
		a.href = url;
		a.download = 'compressed-images.zip';
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
		URL.revokeObjectURL(url);
	};

	const removeImage = (id: string) => {
		setProcessedImages((prev) => prev.filter((p) => p.id !== id));
	};

	const totalOriginal = useMemo(
		() => processedImages.reduce((sum, p) => sum + p.originalSize, 0),
		[processedImages],
	);
	const totalCompressed = useMemo(
		() => processedImages.reduce((sum, p) => sum + p.compressedSize, 0),
		[processedImages],
	);
	const totalSavingsPct = useMemo(() => {
		if (totalOriginal === 0 || totalCompressed === 0) return 0;
		return Math.max(0, Math.round(((totalOriginal - totalCompressed) / totalOriginal) * 100));
	}, [totalOriginal, totalCompressed]);

	return (
		<>
			<NextSeo
				title="Batch Image Compressor & Resizer | WebP, JPG, PNG"
				description="Compress, resize, and convert multiple JPEG, PNG, and WebP images in your browser with aspect ratio lock presets and bulk ZIP downloads."
				canonical="https://joeyjazwinski.com/developer-tools/image-compressor"
				openGraph={{
					title: 'Batch Image Compressor & Resizer | WebP, JPG, PNG',
					description:
						'Compress, resize, and convert multiple JPEG, PNG, and WebP images in your browser with aspect ratio lock presets and bulk ZIP downloads.',
					url: 'https://joeyjazwinski.com/developer-tools/image-compressor',
					type: 'website',
					images: [
						{
							url: 'https://joeyjazwinski.com/ogimage.png',
							width: 1200,
							height: 630,
							alt: 'Client-Side Batch Image Compressor',
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
				name="Client-Side Batch Image Compressor"
				description="Compress, resize, and convert multiple JPEG, PNG, and WebP images in your browser with aspect ratio lock presets and bulk ZIP downloads."
				url="https://joeyjazwinski.com/developer-tools/image-compressor"
				category="MultimediaApplication"
			/>
			<main className="bg-background pt-32 pb-16 px-4 sm:px-6 lg:px-8 text-foreground">
				<div className="max-w-6xl mx-auto space-y-8">
					{/* Header */}
					<div className="text-center space-y-4 max-w-2xl mx-auto">
						<div className="inline-flex p-3 rounded-2xl bg-primary/10 text-primary border border-primary/20">
							<ImageIcon className="w-8 h-8" />
						</div>
						<h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl bg-linear-to-r from-primary via-emerald-500 to-teal-500 bg-clip-text text-transparent">
							Batch Image Compressor
						</h1>
						<p className="text-muted-foreground text-lg">
							Optimize single or multiple images client-side. Convert formats,
							apply social dimension presets, and export as a ZIP file.
						</p>
					</div>

					{/* Total Savings Metric Strip */}
					{processedImages.length > 0 && (
						<div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
							<div className="p-4 rounded-xl bg-card border border-border">
								<div className="text-xs text-muted-foreground">Original Total</div>
								<div className="text-lg font-mono font-bold text-foreground mt-1">
									{formatSize(totalOriginal)}
								</div>
							</div>
							<div className="p-4 rounded-xl bg-card border border-border">
								<div className="text-xs text-muted-foreground">Compressed Total</div>
								<div className="text-lg font-mono font-bold text-emerald-500 mt-1">
									{formatSize(totalCompressed)}
								</div>
							</div>
							<div className="p-4 rounded-xl bg-card border border-border">
								<div className="text-xs text-muted-foreground">Total Reduction</div>
								<div className="text-lg font-mono font-bold text-primary mt-1">
									-{totalSavingsPct}%
								</div>
							</div>
							<div className="p-4 rounded-xl bg-card border border-border flex items-center justify-between">
								<button
									onClick={downloadAllZip}
									className="w-full py-2 px-3 rounded-lg bg-primary text-primary-foreground font-semibold text-xs flex items-center justify-center gap-1.5 hover:opacity-95 transition cursor-pointer"
								>
									<Archive className="w-3.5 h-3.5" />
									Download ZIP ({processedImages.length})
								</button>
							</div>
						</div>
					)}

					{/* Workbench */}
					<div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
						{/* Configuration controls */}
						<div className="lg:col-span-5 bg-card border border-border rounded-2xl p-6 shadow-xl space-y-5">
							<div className="flex items-center gap-2 pb-2 border-b border-border/50 text-sm font-bold text-foreground">
								<Sliders className="w-4 h-4 text-primary" />
								Compression & Sizing Settings
							</div>

							{/* Upload field */}
							<label className="flex flex-col items-center justify-center border-2 border-dashed border-border hover:border-primary/60 rounded-xl py-6 px-4 hover:bg-secondary/40 cursor-pointer transition text-center">
								<Upload className="w-8 h-8 text-primary mb-2" />
								<span className="text-xs font-bold text-foreground">
									Upload Images (Batch Supported)
								</span>
								<span className="text-[11px] text-muted-foreground mt-1">
									JPEG, PNG, WEBP files
								</span>
								<input
									type="file"
									accept="image/*"
									multiple
									onChange={handleFileUpload}
									className="hidden"
								/>
							</label>

							{/* Format Switcher */}
							<div className="space-y-1 text-xs">
								<label className="font-semibold text-foreground">Output Format</label>
								<div className="grid grid-cols-3 gap-2">
									<button
										type="button"
										onClick={() => setFormat('image/jpeg')}
										className={`py-1.5 rounded-lg border text-xs font-semibold transition cursor-pointer ${
											format === 'image/jpeg'
												? 'bg-primary text-primary-foreground border-transparent'
												: 'bg-background hover:bg-secondary text-muted-foreground border-border'
										}`}
									>
										JPEG
									</button>
									<button
										type="button"
										onClick={() => setFormat('image/webp')}
										className={`py-1.5 rounded-lg border text-xs font-semibold transition cursor-pointer ${
											format === 'image/webp'
												? 'bg-primary text-primary-foreground border-transparent'
												: 'bg-background hover:bg-secondary text-muted-foreground border-border'
										}`}
									>
										WebP
									</button>
									<button
										type="button"
										onClick={() => setFormat('image/png')}
										className={`py-1.5 rounded-lg border text-xs font-semibold transition cursor-pointer ${
											format === 'image/png'
												? 'bg-primary text-primary-foreground border-transparent'
												: 'bg-background hover:bg-secondary text-muted-foreground border-border'
										}`}
									>
										PNG
									</button>
								</div>
							</div>

							{/* Quality Slider */}
							{format !== 'image/png' && (
								<div className="space-y-1.5 text-xs">
									<div className="flex justify-between items-center font-semibold">
										<span className="text-foreground">Quality</span>
										<span className="font-mono text-primary font-bold">
											{Math.round(quality * 100)}%
										</span>
									</div>
									<input
										type="range"
										min="0.1"
										max="1.0"
										step="0.05"
										value={quality}
										onChange={(e) => setQuality(parseFloat(e.target.value))}
										className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
									/>
								</div>
							)}

							{/* Presets */}
							<div className="space-y-1.5 text-xs">
								<label className="font-semibold text-foreground">Dimension Preset</label>
								<select
									aria-label="Dimension preset"
									value={preset}
									onChange={(e) => setPreset(e.target.value as DimensionPreset)}
									className="w-full px-3 py-2 rounded-lg border border-border bg-background text-xs font-medium focus:ring-1 focus:ring-primary focus:outline-none cursor-pointer"
								>
									{PRESETS.map((p) => (
										<option key={p.id} value={p.id}>
											{p.label}
										</option>
									))}
								</select>
							</div>

							{preset === 'original' && (
								<div className="space-y-1.5 text-xs">
									<label className="font-semibold text-foreground">Max Width Constraint</label>
									<select
										aria-label="Maximum resolution width"
										value={maxWidth}
										onChange={(e) => setMaxWidth(Number(e.target.value))}
										className="w-full px-3 py-2 rounded-lg border border-border bg-background text-xs font-medium focus:ring-1 focus:ring-primary focus:outline-none cursor-pointer"
									>
										<option value={800}>800px (Medium Web)</option>
										<option value={1200}>1200px (Standard HD)</option>
										<option value={1920}>1920px (Full HD)</option>
										<option value={3840}>3840px (Ultra 4K)</option>
									</select>
								</div>
							)}
						</div>

						{/* Output List */}
						<div className="lg:col-span-7 bg-card border border-border rounded-2xl p-6 shadow-xl space-y-4 min-h-100">
							<div className="flex justify-between items-center pb-2 border-b border-border/50">
								<div className="flex items-center gap-2">
									<h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
										Processed Images ({processedImages.length})
									</h2>
									{isProcessing && <RefreshCw className="w-3.5 h-3.5 animate-spin text-primary" />}
								</div>

								{processedImages.length > 0 && (
									<button
										onClick={() => {
											setRawFiles([]);
											setProcessedImages([]);
										}}
										className="text-xs text-muted-foreground hover:text-rose-500 transition cursor-pointer"
									>
										Clear All
									</button>
								)}
							</div>

							{processedImages.length === 0 ? (
								<div className="text-center py-16 text-xs text-muted-foreground space-y-2">
									<ImageIcon className="w-10 h-10 mx-auto text-muted-foreground/40" />
									<p>Upload files on the left to inspect compressed previews.</p>
								</div>
							) : (
								<div className="space-y-3 max-h-135 overflow-y-auto pr-1">
									{processedImages.map((img) => {
										const savings = Math.max(
											0,
											Math.round(((img.originalSize - img.compressedSize) / img.originalSize) * 100),
										);

										return (
											<div
												key={img.id}
												className="p-3 rounded-xl border border-border bg-background flex flex-col sm:flex-row items-center justify-between gap-3 text-xs"
											>
												<div className="flex items-center gap-3 min-w-0 w-full sm:w-auto">
													<div className="w-14 h-14 rounded-lg border border-border bg-muted overflow-hidden shrink-0 flex items-center justify-center">
														<img
															src={img.dataUrl}
															alt={img.fileName}
															className="max-w-full max-h-full object-cover"
														/>
													</div>
													<div className="min-w-0 truncate">
														<div className="font-semibold text-foreground truncate" title={img.fileName}>
															{img.fileName}
														</div>
														<div className="text-[10px] text-muted-foreground font-mono mt-0.5">
															{img.width}x{img.height} · {formatSize(img.originalSize)} &rarr;{' '}
															<span className="text-emerald-500 font-bold">{formatSize(img.compressedSize)}</span>
														</div>
													</div>
												</div>

												<div className="flex items-center gap-2 self-end sm:self-center shrink-0">
													<span className="px-2 py-0.5 rounded font-mono font-bold text-[10px] bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
														-{savings}%
													</span>

													<button
														onClick={() => downloadSingle(img)}
														title="Download compressed image"
														className="p-1.5 rounded-lg border border-border bg-secondary hover:bg-secondary/80 text-foreground transition cursor-pointer"
													>
														<Download className="w-3.5 h-3.5" />
													</button>

													<button
														onClick={() => removeImage(img.id)}
														title="Remove"
														className="p-1.5 rounded-lg border border-border hover:bg-rose-500/10 text-muted-foreground hover:text-rose-500 transition cursor-pointer"
													>
														<Trash2 className="w-3.5 h-3.5" />
													</button>
												</div>
											</div>
										);
									})}
								</div>
							)}
						</div>
					</div>
				</div>
			</main>
		</>
	);
}
