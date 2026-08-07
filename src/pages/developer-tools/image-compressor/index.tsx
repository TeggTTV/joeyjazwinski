import React, { useState, useRef, useEffect } from 'react';
import { NextSeo } from 'next-seo';
import {
	Upload,
	Download,
	RefreshCw,
	Image as ImageIcon,
	Percent,
} from 'lucide-react';

export default function ImageCompressor() {
	const [imageSrc, setImageSrc] = useState<string | null>(null);
	const [fileName, setFileName] = useState('image.jpg');
	const [quality, setQuality] = useState(0.8);
	const [originalSize, setOriginalSize] = useState<number | null>(null);
	const [compressedSize, setCompressedSize] = useState<number | null>(null);
	const [compressedSrc, setCompressedSrc] = useState<string | null>(null);
	const [maxWidth, setMaxWidth] = useState<number>(1200);
	const [loading, setLoading] = useState(false);

	const canvasRef = useRef<HTMLCanvasElement>(null);

	const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;

		setFileName(file.name);
		setOriginalSize(file.size);
		setLoading(true);

		const reader = new FileReader();
		reader.onload = (event) => {
			if (event.target?.result) {
				setImageSrc(event.target.result as string);
			}
		};
		reader.readAsDataURL(file);
	};

	const compressImage = () => {
		if (!imageSrc) return;

		setLoading(true);
		const img = new Image();
		img.onload = () => {
			const canvas = canvasRef.current;
			if (!canvas) return;

			const ctx = canvas.getContext('2d');
			if (!ctx) return;

			// Calculate new size maintaining aspect ratio
			let width = img.width;
			let height = img.height;

			if (width > maxWidth) {
				height = Math.round((height * maxWidth) / width);
				width = maxWidth;
			}

			canvas.width = width;
			canvas.height = height;

			// Draw & compress
			ctx.drawImage(img, 0, 0, width, height);

			// Output jpeg with requested quality
			const compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
			setCompressedSrc(compressedDataUrl);

			// Calculate size from Data URL
			const head = 'data:image/jpeg;base64,';
			const fileSizeBytes = Math.round(
				((compressedDataUrl.length - head.length) * 3) / 4,
			);
			setCompressedSize(fileSizeBytes);
			setLoading(false);
		};
		img.src = imageSrc;
	};

	useEffect(() => {
		if (imageSrc) {
			compressImage();
		}
	}, [imageSrc, quality, maxWidth]);

	const downloadCompressedImage = () => {
		if (!compressedSrc) return;
		const link = document.createElement('a');

		// Clean extension to .jpg since canvas export is jpeg
		const baseName =
			fileName.substring(0, fileName.lastIndexOf('.')) || fileName;
		link.download = `${baseName}-compressed.jpg`;
		link.href = compressedSrc;
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	};

	const formatSize = (bytes: number) => {
		if (bytes === 0) return '0 Bytes';
		const k = 1024;
		const sizes = ['Bytes', 'KB', 'MB'];
		const i = Math.floor(Math.log(bytes) / Math.log(k));
		return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
	};

	const savingPercentage =
		originalSize && compressedSize
			? Math.max(
					0,
					Math.round(
						((originalSize - compressedSize) / originalSize) * 100,
					),
				)
			: 0;

	return (
		<>
			<NextSeo
				title="Client-Side Image Compressor - Joey Jazwinski"
				description="Compress and resize JPG, PNG, and WebP images client-side. Adjust compression quality parameters and download optimized results."
			/>
			<main className="min-h-screen bg-background pt-32 pb-16 px-4 sm:px-6 lg:px-8 text-foreground">
				<div className="max-w-6xl mx-auto space-y-12">
					{/* Header */}
					<div className="text-center space-y-4 max-w-2xl mx-auto">
						<div className="inline-flex p-3 rounded-2xl bg-primary/10 text-primary border border-primary/20">
							<ImageIcon className="w-8 h-8" />
						</div>
						<h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl bg-linear-to-r from-primary to-emerald-500 bg-clip-text text-transparent">
							Image Compressor
						</h1>
						<p className="text-muted-foreground text-lg">
							Reduce file sizes dynamically completely inside your
							browser. No files are uploaded to any server.
						</p>
					</div>

					{/* Workspace */}
					<div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
						{/* Configuration and Controls */}
						<div className="lg:col-span-5 bg-card/60 backdrop-blur-xl border border-border/80 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
							<h2 className="text-xl font-bold border-b border-border/50 pb-3 flex items-center gap-2">
								<Percent className="w-5 h-5 text-primary" />
								Compression Settings
							</h2>

							{/* Upload field */}
							<div className="space-y-1">
								<label className="block text-sm font-semibold text-muted-foreground">
									Select Image
								</label>
								<label className="flex flex-col items-center justify-center border-2 border-dashed border-border/80 rounded-xl py-6 px-4 hover:bg-secondary/40 cursor-pointer transition text-center">
									<Upload className="w-8 h-8 text-muted-foreground mb-2" />
									<span className="text-sm font-medium">
										Click to upload file
									</span>
									<span className="text-xs text-muted-foreground/70 mt-1">
										PNG, JPG, JPEG, WEBP
									</span>
									<input
										type="file"
										accept="image/*"
										onChange={handleImageUpload}
										className="hidden"
									/>
								</label>
							</div>

							{imageSrc && (
								<div className="space-y-4 pt-2">
									{/* Quality Slider */}
									<div className="space-y-1.5">
										<div className="flex justify-between text-sm font-semibold text-muted-foreground">
											<label htmlFor="quality-slider">
												Compression Quality
											</label>
											<span className="font-mono text-primary">
												{Math.round(quality * 100)}%
											</span>
										</div>
										<input
											id="quality-slider"
											type="range"
											min="0.1"
											max="1.0"
											step="0.05"
											value={quality}
											onChange={(e) =>
												setQuality(
													parseFloat(e.target.value),
												)
											}
											className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
										/>
									</div>

									{/* Max Width Input */}
									<div className="space-y-1.5">
										<div className="flex justify-between text-sm font-semibold text-muted-foreground">
											<label htmlFor="max-width-select">
												Max Resolution Width
											</label>
											<span className="font-mono text-primary">
												{maxWidth}px
											</span>
										</div>
										<select
											id="max-width-select"
											value={maxWidth}
											onChange={(e) =>
												setMaxWidth(
													Number(e.target.value),
												)
											}
											className="block w-full px-4 py-2.5 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary transition text-sm"
										>
											<option value={800}>
												800px (Medium Web)
											</option>
											<option value={1200}>
												1200px (Standard HD)
											</option>
											<option value={1920}>
												1920px (Full HD)
											</option>
											<option value={3840}>
												3840px (Ultra 4K)
											</option>
										</select>
									</div>

									{/* Compress Stats */}
									{originalSize && compressedSize && (
										<div className="p-4 rounded-xl bg-secondary/40 border border-border/50 space-y-2 text-xs font-mono">
											<div className="flex justify-between">
												<span className="text-muted-foreground">
													Original Size:
												</span>
												<span className="font-bold">
													{formatSize(originalSize)}
												</span>
											</div>
											<div className="flex justify-between border-b border-border/30 pb-2">
												<span className="text-muted-foreground">
													Compressed Size:
												</span>
												<span className="font-bold text-emerald-500">
													{formatSize(compressedSize)}
												</span>
											</div>
											<div className="flex justify-between pt-1">
												<span className="text-muted-foreground font-semibold">
													Total Saved:
												</span>
												<span className="font-extrabold text-emerald-500 flex items-center gap-1">
													{savingPercentage}% Savings
												</span>
											</div>
										</div>
									)}
								</div>
							)}
						</div>

						{/* Preview Output */}
						<div className="lg:col-span-7 flex flex-col items-center">
							<div className="w-full bg-card/60 backdrop-blur-xl border border-border/80 rounded-2xl p-6 sm:p-8 flex flex-col items-center justify-between min-h-120 shadow-xl relative overflow-hidden">
								<div className="absolute top-4 right-4">
									{loading && (
										<RefreshCw className="w-5 h-5 animate-spin text-primary" />
									)}
								</div>

								<div className="w-full grow flex flex-col md:flex-row items-center justify-center gap-6 py-4">
									{imageSrc ? (
										<>
											<div className="flex-1 text-center space-y-2">
												<span className="text-xs uppercase font-bold text-muted-foreground tracking-wider block">
													Original Image
												</span>
												<div className="aspect-video w-full rounded-xl border border-border bg-muted overflow-hidden flex items-center justify-center max-h-48">
													<img
														src={imageSrc}
														alt="Original Preview"
														className="max-w-full max-h-full object-contain"
													/>
												</div>
											</div>

											<div className="flex-1 text-center space-y-2">
												<span className="text-xs uppercase font-bold text-muted-foreground tracking-wider block">
													Compressed Image
												</span>
												<div className="aspect-video w-full rounded-xl border border-border bg-muted overflow-hidden flex items-center justify-center max-h-48">
													{compressedSrc && (
														<img
															src={compressedSrc}
															alt="Compressed Preview"
															className="max-w-full max-h-full object-contain"
														/>
													)}
												</div>
											</div>
										</>
									) : (
										<div className="text-center text-muted-foreground italic py-12">
											Upload an image file on the left to
											start compression.
										</div>
									)}
								</div>

								{compressedSrc && (
									<button
										onClick={downloadCompressedImage}
										className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/95 focus:outline-none focus:ring-2 focus:ring-primary transition shadow"
									>
										<Download className="w-5 h-5" />
										Download Compressed JPEG
									</button>
								)}
							</div>
						</div>
					</div>
				</div>
				<canvas ref={canvasRef} className="hidden" />
			</main>
		</>
	);
}
