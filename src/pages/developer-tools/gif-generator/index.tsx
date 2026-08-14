import { useState, useRef } from 'react';
import { NextSeo } from 'next-seo';
import {
	Download,
	Video,
	RefreshCw,
	FileVideo,
	AlertCircle,
} from 'lucide-react';

export default function GifGenerator() {
	const [videoFile, setVideoFile] = useState<File | null>(null);
	const [videoUrl, setVideoUrl] = useState<string>('');
	const [gifWidth, setGifWidth] = useState<number | string>(400);
	const [gifHeight, setGifHeight] = useState<number | string>(300);
	const [fps, setFps] = useState<number | string>(10);
	const [startTime, setStartTime] = useState<number | string>(0);
	const [endTime, setEndTime] = useState<number | string>(5);
	const [progress, setProgress] = useState(0);
	const [gifResult, setGifResult] = useState<string>('');
	const [generating, setGenerating] = useState(false);
	const [error, setError] = useState<string>('');

	const fileInputRef = useRef<HTMLInputElement>(null);

	const handleWidthBlur = () => {
		let val = Number(gifWidth);
		if (isNaN(val) || val < 100) val = 100;
		if (val > 1920) val = 1920;
		setGifWidth(val);
	};

	const handleHeightBlur = () => {
		let val = Number(gifHeight);
		if (isNaN(val) || val < 100) val = 100;
		if (val > 1080) val = 1080;
		setGifHeight(val);
	};

	const handleFpsBlur = () => {
		let val = Number(fps);
		if (isNaN(val) || val < 1) val = 1;
		if (val > 60) val = 60;
		setFps(val);
	};

	const handleStartTimeBlur = () => {
		let val = Number(startTime);
		if (isNaN(val) || val < 0) val = 0;
		setStartTime(val);
	};

	const handleEndTimeBlur = () => {
		let val = Number(endTime);
		if (isNaN(val) || val < 0.1) val = 0.1;
		setEndTime(val);
	};

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setError('');
		const file = e.target.files?.[0];
		if (file) {
			if (!file.type.startsWith('video/')) {
				setError('Please select a valid video file.');
				return;
			}
			setVideoFile(file);
			console.log(file);
			const url = URL.createObjectURL(file);
			setVideoUrl(url);
			setGifResult('');
			setProgress(0);

			const tempVideo = document.createElement('video');
			tempVideo.preload = 'metadata';
			tempVideo.onloadedmetadata = () => {
				setEndTime(Math.round(tempVideo.duration * 10) / 10 || 5);
			};
			tempVideo.src = url;
		}
	};

	const handleGenerate = async () => {
		if (!videoUrl) return;

		const numStartTime = Number(startTime) || 0;
		const numEndTime = Number(endTime) || 0;
		const numFps = Number(fps) || 10;
		const numWidth = Number(gifWidth) || 400;
		const numHeight = Number(gifHeight) || 300;

		const duration = numEndTime - numStartTime;
		if (duration <= 0) {
			setError('End time must be greater than start time.');
			return;
		}

		setGenerating(true);
		setError('');
		setGifResult('');
		setProgress(0);

		try {
			// @ts-ignore
			const gifshotModule = await import('gifshot');
			const gifshot = (gifshotModule as any).default || gifshotModule;
			if (!gifshot || typeof gifshot.createGIF !== 'function') {
				throw new Error('Failed to load gifshot package.');
			}

			const computedFrames = Math.max(1, Math.round(duration * numFps));
			const computedInterval = 1 / numFps;

			gifshot.createGIF(
				{
					video: [videoUrl],
					gifWidth: numWidth,
					gifHeight: numHeight,
					numFrames: computedFrames,
					interval: computedInterval,
					offset: numStartTime,
					keepCameraOn: false,
					progressCallback: (captureProgress: number) => {
						setProgress(Math.round(captureProgress * 100));
					},
				},
				(obj: any) => {
					setGenerating(false);
					if (!obj.error) {
						setGifResult(obj.image);
						setProgress(100);
						console.log('Done');
					} else {
						setError(
							'Conversion failed. Try reducing resolution, duration, or FPS.',
						);
						console.error('Gifshot error:', obj.error);
					}
				},
			);
		} catch (err: any) {
			setGenerating(false);
			setError('Failed to load the GIF converter engine.');
			console.error(err);
		}
	};

	const handleDownload = () => {
		if (!gifResult) return;
		const link = document.createElement('a');
		link.href = gifResult;
		link.download = `converted-${Date.now()}.gif`;
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	};

	const resetForm = () => {
		setVideoFile(null);
		setVideoUrl('');
		setGifResult('');
		setError('');
		setProgress(0);
		if (fileInputRef.current) {
			fileInputRef.current.value = '';
		}
	};

	return (
		<>
			<NextSeo
				title="Video to GIF Converter - Joey Jazwinski"
				description="Convert video files directly to animated GIFs online. Customize size, quality, and download your GIF instantly."
			/>
			<main className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 pt-32 pb-16 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
				<div className="max-w-6xl mx-auto space-y-12">
					{/* Header */}
					<div className="text-center space-y-4 max-w-2xl mx-auto">
						<div className="inline-flex p-3 rounded-2xl bg-blue-500/10 text-blue-500 border border-blue-500/20">
							<Video className="w-8 h-8" />
						</div>
						<h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl bg-linear-to-r from-blue-600 to-purple-650 bg-clip-text text-transparent">
							GIF Generator
						</h1>
						<p className="text-zinc-500 dark:text-zinc-400 text-lg">
							Convert MP4, WebM, or OGG videos directly to
							high-quality animated GIFs client-side.
						</p>
					</div>

					{/* Workspace */}
					<div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
						{/* Configuration Card */}
						<div className="lg:col-span-7 bg-white dark:bg-zinc-900/40 backdrop-blur-xl border border-zinc-200 dark:border-zinc-800 p-6 sm:p-8 rounded-3xl space-y-6 shadow-xl transition-colors">
							<h2 className="text-xl font-bold border-b border-zinc-200 dark:border-zinc-800/50 pb-3 text-zinc-900 dark:text-white">
								Conversion Configuration
							</h2>

							{/* Video Selector */}
							<div className="space-y-2">
								<label className="block text-sm font-semibold text-zinc-500 dark:text-zinc-400">
									Select Video Source
								</label>
								{!videoFile ? (
									<div
										onClick={() =>
											fileInputRef.current?.click()
										}
										className="border-2 border-dashed border-zinc-300 dark:border-zinc-800 hover:border-blue-500 dark:hover:border-blue-400 cursor-pointer rounded-2xl p-8 flex flex-col items-center justify-center gap-2 group transition-all"
									>
										<FileVideo className="w-10 h-10 text-zinc-400 group-hover:text-blue-500 transition-colors" />
										<span className="text-sm font-medium text-zinc-600 dark:text-zinc-300">
											Click to upload video
										</span>
										<span className="text-xs text-zinc-400">
											MP4, WebM, OGG up to 50MB
										</span>
									</div>
								) : (
									<div className="border border-zinc-200 dark:border-zinc-850 bg-zinc-100/50 dark:bg-zinc-950/20 p-4 rounded-2xl flex items-center justify-between">
										<div className="flex items-center gap-3">
											<FileVideo className="w-8 h-8 text-blue-500" />
											<div className="text-left">
												<p className="text-xs font-bold truncate max-w-50 sm:max-w-xs">
													{videoFile.name}
												</p>
												<p className="text-[10px] text-zinc-500 font-mono">
													{(
														videoFile.size /
														(1024 * 1024)
													).toFixed(2)}{' '}
													MB
												</p>
											</div>
										</div>
										<button
											onClick={resetForm}
											className="text-xs font-bold text-red-500 hover:text-red-600 underline"
										>
											Remove
										</button>
									</div>
								)}
								<input
									type="file"
									ref={fileInputRef}
									className="hidden"
									accept="video/*"
									onChange={handleFileChange}
								/>
							</div>

							<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
								{/* Dimensions */}
								<div className="space-y-2">
									<label className="block text-sm font-semibold text-zinc-500 dark:text-zinc-400">
										GIF Width (px)
									</label>
									<input
										type="number"
										autoComplete="off"
										min="100"
										max="800"
										className="w-full p-3 border border-zinc-200 dark:border-zinc-800 rounded-xl bg-zinc-100 dark:bg-zinc-950 text-zinc-900 dark:text-white"
										value={gifWidth}
										onChange={(e) =>
											setGifWidth(e.target.value)
										}
										onBlur={handleWidthBlur}
										onKeyDown={(e) =>
											e.key === 'Enter' &&
											handleWidthBlur()
										}
									/>
								</div>
								<div className="space-y-2">
									<label className="block text-sm font-semibold text-zinc-500 dark:text-zinc-400">
										GIF Height (px)
									</label>
									<input
										type="number"
										autoComplete="off"
										min="100"
										max="850"
										className="w-full p-3 border border-zinc-200 dark:border-zinc-800 rounded-xl bg-zinc-100 dark:bg-zinc-950 text-zinc-900 dark:text-white"
										value={gifHeight}
										onChange={(e) =>
											setGifHeight(e.target.value)
										}
										onBlur={handleHeightBlur}
										onKeyDown={(e) =>
											e.key === 'Enter' &&
											handleHeightBlur()
										}
									/>
								</div>

								{/* Frame rate */}
								<div className="space-y-2">
									<label className="block text-sm font-semibold text-zinc-500 dark:text-zinc-400">
										Frame Rate (FPS)
									</label>
									<input
										type="number"
										autoComplete="off"
										min="1"
										max="60"
										className="w-full p-3 border border-zinc-200 dark:border-zinc-800 rounded-xl bg-zinc-100 dark:bg-zinc-950 text-zinc-900 dark:text-white"
										value={fps}
										onChange={(e) => setFps(e.target.value)}
										onBlur={handleFpsBlur}
										onKeyDown={(e) =>
											e.key === 'Enter' && handleFpsBlur()
										}
									/>
								</div>

								{/* Duration clip */}
								<div className="grid grid-cols-2 gap-2">
									<div className="space-y-2">
										<label className="block text-xs font-semibold text-zinc-500 dark:text-zinc-400">
											Start Time (s)
										</label>
										<input
											type="number"
											autoComplete="off"
											min="0"
											step="0.1"
											className="w-full p-3 border border-zinc-200 dark:border-zinc-800 rounded-xl bg-zinc-100 dark:bg-zinc-950 text-zinc-900 dark:text-white"
											value={startTime}
											onChange={(e) =>
												setStartTime(e.target.value)
											}
											onBlur={handleStartTimeBlur}
											onKeyDown={(e) =>
												e.key === 'Enter' &&
												handleStartTimeBlur()
											}
										/>
									</div>
									<div className="space-y-2">
										<label className="block text-xs font-semibold text-zinc-500 dark:text-zinc-400">
											End Time (s)
										</label>
										<input
											type="number"
											autoComplete="off"
											min="0.1"
											step="0.1"
											className="w-full p-3 border border-zinc-200 dark:border-zinc-800 rounded-xl bg-zinc-100 dark:bg-zinc-950 text-zinc-900 dark:text-white"
											value={endTime}
											onChange={(e) =>
												setEndTime(e.target.value)
											}
											onBlur={handleEndTimeBlur}
											onKeyDown={(e) =>
												e.key === 'Enter' &&
												handleEndTimeBlur()
											}
										/>
									</div>
								</div>
							</div>

							{generating && (
								<div className="space-y-2">
									<div className="flex justify-between text-xs font-mono">
										<span>Converting video frames...</span>
										<span className="text-blue-500 font-bold">
											{progress}%
										</span>
									</div>
									<div className="w-full bg-zinc-200 dark:bg-zinc-850 rounded-full h-2.5 overflow-hidden border border-zinc-300 dark:border-zinc-800/40">
										<div
											className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
											style={{ width: `${progress}%` }}
										/>
									</div>
								</div>
							)}

							{error && (
								<div className="bg-red-500/10 border border-red-500/25 p-3 rounded-xl flex items-center gap-2 text-red-500 text-xs">
									<AlertCircle className="w-4 h-4 shrink-0" />
									<span>{error}</span>
								</div>
							)}

							<button
								onClick={handleGenerate}
								disabled={generating || !videoUrl}
								className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
							>
								{generating ? (
									<>
										<RefreshCw className="w-5 h-5 animate-spin" />
										Processing Conversion ({progress}%)
									</>
								) : (
									<>
										<Video className="w-5 h-5" />
										Generate GIF
									</>
								)}
							</button>
						</div>

						{/* Output Preview */}
						<div className="lg:col-span-5 flex flex-col items-center">
							<div className="w-full bg-white dark:bg-zinc-900/40 backdrop-blur-xl border border-zinc-200 dark:border-zinc-800 p-6 sm:p-8 rounded-3xl flex flex-col items-center justify-between min-h-120 shadow-xl relative transition-colors">
								<h3 className="font-bold text-xs uppercase tracking-widest text-zinc-550 self-start">
									GIF Output Preview
								</h3>

								<div className="w-full grow flex items-center justify-center py-6">
									{gifResult ? (
										<div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 flex items-center justify-center">
											<img
												src={gifResult}
												alt="Generated GIF"
												className="max-h-70 object-contain rounded-lg shadow-sm"
											/>
										</div>
									) : (
										<div className="text-center space-y-2 p-8 border border-dashed border-zinc-300 dark:border-zinc-800 rounded-2xl max-w-xs bg-zinc-50 dark:bg-zinc-950/20">
											<Video className="w-8 h-8 mx-auto text-zinc-400" />
											<p className="text-xs text-zinc-500 dark:text-zinc-400">
												Configure options and click
												"Generate GIF" to preview.
											</p>
										</div>
									)}
								</div>

								<div className="w-full space-y-4">
									<button
										onClick={handleDownload}
										disabled={!gifResult}
										className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 font-semibold rounded-xl hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
									>
										<Download className="w-5 h-5" />
										Download Animated GIF
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</main>
		</>
	);
}
