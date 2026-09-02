import { useState, useEffect } from 'react';
import { NextSeo } from 'next-seo';
import ToolJsonLd from '@/components/seo/ToolJsonLd';
import { Search } from 'lucide-react';

export default function UserAgentInspector() {
	const [ua, setUa] = useState('');
	const [screenInfo, setScreenInfo] = useState('');

	useEffect(() => {
		if (typeof window !== 'undefined') {
			setUa(navigator.userAgent);
			setScreenInfo(
				`${window.screen.width} x ${window.screen.height} (${window.devicePixelRatio}x pixel ratio)`,
			);
		}
	}, []);

	return (
		<>
			<NextSeo
				title="User-Agent & HTTP Client Header Inspector Tool - Joey Jazwinski"
				description="Inspect your browser client user agent, browser engine, operating system, viewport dimensions, device memory, and HTTP headers in real time."
				canonical="https://joeyjazwinski.com/developer-tools/user-agent-inspector"
				openGraph={{
					title: 'User-Agent & HTTP Client Header Inspector Tool - Joey Jazwinski',
					description:
						'Inspect your browser client user agent, browser engine, operating system, viewport dimensions, device memory, and HTTP headers in real time.',
					url: 'https://joeyjazwinski.com/developer-tools/user-agent-inspector',
					type: 'website',
					images: [
						{
							url: 'https://joeyjazwinski.com/ogimage.png',
							width: 1200,
							height: 630,
							alt: 'User-Agent & Client Header Inspector',
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
				name="User-Agent & Client Header Inspector"
				description="Inspect your browser client user agent, browser engine, operating system, viewport dimensions, device memory, and HTTP headers in real time."
				url="https://joeyjazwinski.com/developer-tools/user-agent-inspector"
				category="DeveloperApplication"
			/>
			<main className="min-h-screen bg-background pt-32 pb-16 px-4 sm:px-6 lg:px-8 text-foreground">
				<div className="max-w-4xl mx-auto space-y-8">
					<div className="text-center space-y-4 max-w-2xl mx-auto">
						<div className="inline-flex p-3 rounded-2xl bg-primary/10 text-primary border border-primary/20">
							<Search className="w-8 h-8" />
						</div>
						<h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl bg-linear-to-r from-primary to-amber-500 bg-clip-text text-transparent">
							User Agent & Client Inspector
						</h1>
						<p className="text-muted-foreground text-lg">
							Review viewport details, device specifics, and raw
							parsed browser headers instantly.
						</p>
					</div>

					<div className="bg-card border border-border rounded-2xl p-6 shadow-xl space-y-6">
						<h2 className="text-xl font-bold">
							Inspector Dashboard
						</h2>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div className="p-4 rounded-xl border border-border bg-background space-y-1">
								<span className="text-xs text-muted-foreground font-semibold">
									User Agent String
								</span>
								<p className="font-mono text-sm wrap-break-word">
									{ua || 'Loading...'}
								</p>
							</div>

							<div className="p-4 rounded-xl border border-border bg-background space-y-1">
								<span className="text-xs text-muted-foreground font-semibold">
									Screen Resolution
								</span>
								<p className="font-mono text-sm">
									{screenInfo || 'Loading...'}
								</p>
							</div>
						</div>
					</div>
				</div>
			</main>
		</>
	);
}
