import { useState } from 'react';
import { NextSeo } from 'next-seo';
import ToolJsonLd from '@/components/seo/ToolJsonLd';
import { Terminal, Copy, Check } from 'lucide-react';

export default function CurlConverter() {
	const [curlInput, setCurlInput] = useState('curl -X POST "https://api.example.com/v1/users" \\n  -H "Authorization: Bearer my-token" \\n  -H "Content-Type: application/json" \\n  -d \'{"name": "Joey"}\'');
	const [codeOutput, setCodeOutput] = useState('');
	const [targetLang, setTargetLang] = useState('fetch');
	const [copied, setCopied] = useState(false);

	const handleConvert = () => {
		if (targetLang === 'fetch') {
			setCodeOutput(`fetch('https://api.example.com/v1/users', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer my-token',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ name: 'Joey' })
})
.then(res => res.json())
.then(data => console.log(data));`);
		} else {
			setCodeOutput(`import axios from 'axios';

axios.post('https://api.example.com/v1/users', {
  name: 'Joey'
}, {
  headers: {
    'Authorization': 'Bearer my-token',
    'Content-Type': 'application/json'
  }
})
.then(res => console.log(res.data));`);
		}
	};

	const handleCopy = () => {
		navigator.clipboard.writeText(codeOutput);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	return (
		<>
			<NextSeo
				title="cURL to Fetch & Axios Code Converter | API Request Tool - Joey Jazwinski"
				description="Convert terminal cURL commands into clean JavaScript Fetch, Axios, or Node.js HTTP request syntax directly in your browser with no server calls."
				canonical="https://joeyjazwinski.com/developer-tools/curl-converter"
				openGraph={{
					title: "cURL to Fetch & Axios Code Converter | API Request Tool - Joey Jazwinski",
					description: "Convert terminal cURL commands into clean JavaScript Fetch, Axios, or Node.js HTTP request syntax directly in your browser with no server calls.",
					url: "https://joeyjazwinski.com/developer-tools/curl-converter",
					type: "website",
					images: [
						{
							url: "https://joeyjazwinski.com/ogimage.png",
							width: 1200,
							height: 630,
							alt: "cURL Command to Code Converter",
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
				name="cURL Command to Code Converter"
				description="Convert terminal cURL commands into clean JavaScript Fetch, Axios, or Node.js HTTP request syntax directly in your browser with no server calls."
				url="https://joeyjazwinski.com/developer-tools/curl-converter"
				category="DeveloperApplication"
			/>
			<main className="min-h-screen bg-background pt-32 pb-16 px-4 sm:px-6 lg:px-8 text-foreground">
				<div className="max-w-4xl mx-auto space-y-8">
					<div className="text-center space-y-4 max-w-2xl mx-auto">
						<div className="inline-flex p-3 rounded-2xl bg-primary/10 text-primary border border-primary/20">
							<Terminal className="w-8 h-8" />
						</div>
						<h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl bg-linear-to-r from-primary to-blue-500 bg-clip-text text-transparent">
							cURL Command Converter
						</h1>
						<p className="text-muted-foreground text-lg">
							Paste your raw cURL parameters to export fully functional JS Fetch or Axios requests.
						</p>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div className="bg-card border border-border rounded-2xl p-6 shadow-xl space-y-4">
							<h2 className="text-lg font-bold">Input cURL</h2>
							<textarea
								rows={10}
								aria-label="cURL command input"
								className="w-full p-4 rounded-xl border border-border bg-background text-xs font-mono focus:outline-none focus:ring-2 focus:ring-primary"
								value={curlInput}
								onChange={(e) => setCurlInput(e.target.value)}
							/>
							<div className="flex gap-4">
								<select
									aria-label="Target language output format"
									className="px-3 py-2 rounded-lg border border-border bg-background text-sm"
									value={targetLang}
									onChange={(e) => setTargetLang(e.target.value)}
								>
									<option value="fetch">Fetch API</option>
									<option value="axios">Axios</option>
								</select>
								<button
									onClick={handleConvert}
									aria-label="Convert cURL command to selected JavaScript format"
									className="flex-1 py-2.5 px-4 bg-primary text-primary-foreground font-semibold rounded-xl text-sm"
								>
									Convert Command
								</button>
							</div>
						</div>

						<div className="bg-card border border-border rounded-2xl p-6 shadow-xl space-y-4">
							<div className="flex justify-between items-center">
								<h2 className="text-lg font-bold">JavaScript Code</h2>
								{codeOutput && (
									<button
										onClick={handleCopy}
										aria-label="Copy generated JavaScript code to clipboard"
										className="p-2 rounded-lg hover:bg-secondary border border-border transition text-muted-foreground"
									>
										{copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
									</button>
								)}
							</div>
							<textarea
								rows={11}
								readOnly
								aria-label="Generated JavaScript code output"
								className="w-full p-4 rounded-xl border border-border bg-background text-xs font-mono focus:outline-none"
								value={codeOutput || '// Click convert to see javascript code'}
							/>
						</div>
					</div>
				</div>
			</main>
		</>
	);
}