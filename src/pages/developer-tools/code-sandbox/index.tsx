import { useState, useEffect, useCallback } from 'react';
import { NextSeo } from 'next-seo';
import ToolJsonLd from '@/components/seo/ToolJsonLd';
import {
	Code,
	RefreshCw,
	Eye,
	Download,
	Maximize2,
	Minimize2,
	Terminal,
	Trash2,
	Package,
	Layers,
	FileCode,
	Check,
} from 'lucide-react';
import CodeEditor from '@/components/ui/CodeEditor';

interface ConsoleMessage {
	id: string;
	level: 'log' | 'warn' | 'error';
	text: string;
	time: string;
}

const DEFAULT_HTML = `<div class="interactive-card">
  <div class="badge">Live Sandbox</div>
  <h1 id="headline">Interactive Code Playground</h1>
  <p>Edit HTML, CSS, and JS. Click the button below to trigger real-time DOM updates and console logging.</p>
  <div class="actions">
    <button id="counter-btn" class="btn primary">Clicks: 0</button>
    <button id="confetti-btn" class="btn secondary">Celebrate</button>
  </div>
</div>`;

const DEFAULT_CSS = `body {
  font-family: system-ui, -apple-system, sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  margin: 0;
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
  color: #f8fafc;
  padding: 1.5rem;
  box-sizing: border-box;
}

.interactive-card {
  background: rgba(30, 41, 59, 0.85);
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(12px);
  padding: 2.25rem;
  border-radius: 20px;
  box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.5);
  max-width: 420px;
  text-align: center;
}

.badge {
  display: inline-block;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  padding: 0.25rem 0.75rem;
  border-radius: 999px;
  background: rgba(59, 130, 246, 0.2);
  color: #60a5fa;
  border: 1px solid rgba(59, 130, 246, 0.4);
  margin-bottom: 1rem;
}

h1 {
  font-size: 1.5rem;
  margin: 0 0 0.75rem;
  color: #ffffff;
  font-weight: 800;
}

p {
  color: #94a3b8;
  font-size: 0.875rem;
  line-height: 1.6;
  margin: 0 0 1.5rem;
}

.actions {
  display: flex;
  gap: 0.75rem;
  justify-content: center;
}

.btn {
  padding: 0.6rem 1.25rem;
  border-radius: 10px;
  font-weight: 600;
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
}

.btn.primary {
  background: #3b82f6;
  color: white;
  box-shadow: 0 4px 14px rgba(59, 130, 246, 0.4);
}

.btn.primary:hover {
  background: #2563eb;
  transform: translateY(-1px);
}

.btn.secondary {
  background: rgba(255, 255, 255, 0.1);
  color: #e2e8f0;
  border: 1px solid rgba(255, 255, 255, 0.15);
}

.btn.secondary:hover {
  background: rgba(255, 255, 255, 0.2);
}`;

const DEFAULT_JS = `let count = 0;
const btn = document.getElementById('counter-btn');
const confettiBtn = document.getElementById('confetti-btn');

btn.addEventListener('click', () => {
  count++;
  btn.textContent = 'Clicks: ' + count;
  console.log('Button clicked! Current count:', count);
});

confettiBtn.addEventListener('click', () => {
  console.log('Celebration triggered! Party time.');
  if (window.confetti) {
    window.confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
  } else {
    alert('Confetti script active! Count: ' + count);
  }
});

console.log('Sandbox initialized successfully.');`;

const CDN_LIBRARIES = [
	{
		id: 'tailwind',
		name: 'Tailwind CSS',
		tag: '<script src="https://cdn.tailwindcss.com"></script>',
	},
	{
		id: 'confetti',
		name: 'Canvas Confetti',
		tag: '<script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js"></script>',
	},
	{
		id: 'lucide',
		name: 'Lucide Icons',
		tag: '<script src="https://unpkg.com/lucide@latest"></script>',
	},
	{
		id: 'fontawesome',
		name: 'FontAwesome 6',
		tag: '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" />',
	},
	{
		id: 'axios',
		name: 'Axios HTTP',
		tag: '<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>',
	},
];

export default function CodeSandbox() {
	const [activeTab, setActiveTab] = useState<'html' | 'css' | 'js'>('html');
	const [htmlCode, setHtmlCode] = useState(DEFAULT_HTML);
	const [cssCode, setCssCode] = useState(DEFAULT_CSS);
	const [jsCode, setJsCode] = useState(DEFAULT_JS);
	const [selectedCdns, setSelectedCdns] = useState<string[]>(['confetti']);
	const [showCdnModal, setShowCdnModal] = useState(false);

	const [srcDoc, setSrcDoc] = useState('');
	const [consoleLogs, setConsoleLogs] = useState<ConsoleMessage[]>([]);
	const [isConsoleOpen, setIsConsoleOpen] = useState(false);
	const [isFullscreen, setIsFullscreen] = useState(false);

	// Build bundle HTML
	const generateBundle = useCallback(() => {
		const activeCdnTags = CDN_LIBRARIES.filter((c) =>
			selectedCdns.includes(c.id),
		)
			.map((c) => c.tag)
			.join('\n');

		return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  ${activeCdnTags}
  <style>
    ${cssCode}
  </style>
  <script>
    (function() {
      const send = (level, args) => {
        try {
          const msg = args.map(a => {
            if (typeof a === 'object') {
              try { return JSON.stringify(a); } catch { return String(a); }
            }
            return String(a);
          }).join(' ');
          window.parent.postMessage({ type: 'SANDBOX_CONSOLE', level, text: msg }, '*');
        } catch (e) {}
      };
      const _log = console.log;
      const _warn = console.warn;
      const _error = console.error;
      console.log = (...args) => { _log.apply(console, args); send('log', args); };
      console.warn = (...args) => { _warn.apply(console, args); send('warn', args); };
      console.error = (...args) => { _error.apply(console, args); send('error', args); };
      window.onerror = (msg, url, line) => {
        send('error', ['Error on line ' + line + ': ' + msg]);
      };
    })();
  </script>
</head>
<body>
  ${htmlCode}
  <script>
    try {
      ${jsCode}
    } catch(err) {
      console.error(err.message);
    }
  </script>
</body>
</html>`;
	}, [htmlCode, cssCode, jsCode, selectedCdns]);

	// Listen for console logs sent from iframe
	useEffect(() => {
		const handleMessage = (event: MessageEvent) => {
			if (event.data?.type === 'SANDBOX_CONSOLE') {
				const now = new Date().toLocaleTimeString();
				setConsoleLogs((prev) => [
					...prev.slice(-99),
					{
						id: Math.random().toString(36).substring(2, 9),
						level: event.data.level || 'log',
						text: event.data.text || '',
						time: now,
					},
				]);
			}
		};

		window.addEventListener('message', handleMessage);
		return () => window.removeEventListener('message', handleMessage);
	}, []);

	// Live debounced compiler
	useEffect(() => {
		const timeout = setTimeout(() => {
			setSrcDoc(generateBundle());
		}, 400);
		return () => clearTimeout(timeout);
	}, [generateBundle]);

	const forceRefresh = () => {
		setConsoleLogs([]);
		setSrcDoc(generateBundle());
	};

	const toggleCdn = (id: string) => {
		setSelectedCdns((prev) =>
			prev.includes(id)
				? prev.filter((item) => item !== id)
				: [...prev, id],
		);
	};

	const downloadHtmlFile = () => {
		const bundle = generateBundle();
		const blob = new Blob([bundle], { type: 'text/html;charset=utf-8' });
		const url = URL.createObjectURL(blob);
		const link = document.createElement('a');
		link.href = url;
		link.download = 'sandbox-export.html';
		link.click();
		URL.revokeObjectURL(url);
	};

	const resetStarter = () => {
		setHtmlCode(DEFAULT_HTML);
		setCssCode(DEFAULT_CSS);
		setJsCode(DEFAULT_JS);
		setSelectedCdns(['confetti']);
		setConsoleLogs([]);
	};

	return (
		<>
			<NextSeo
				title="Live Code Sandbox | HTML, CSS & JavaScript Playground"
				description="Interactive frontend playground for HTML5, CSS3, and JavaScript with live preview iframe, real-time console logger, CDN package injector, and export options."
				canonical="https://joeyjazwinski.com/developer-tools/code-sandbox"
				openGraph={{
					title: 'Live Code Sandbox | HTML, CSS & JavaScript Playground',
					description:
						'Interactive frontend playground for HTML5, CSS3, and JavaScript with live preview iframe, real-time console logger, CDN package injector, and export options.',
					url: 'https://joeyjazwinski.com/developer-tools/code-sandbox',
					type: 'website',
					images: [
						{
							url: 'https://joeyjazwinski.com/ogimage.png',
							width: 1200,
							height: 630,
							alt: 'Live Code Sandbox',
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
				name="Live HTML & CSS Code Sandbox"
				description="Interactive frontend playground for HTML5, CSS3, and JavaScript with live preview iframe, real-time console logger, CDN package injector, and export options."
				url="https://joeyjazwinski.com/developer-tools/code-sandbox"
				category="DeveloperApplication"
			/>
			<main className="bg-background pt-32 pb-16 px-4 sm:px-6 lg:px-8 text-foreground">
				<div className="max-w-7xl mx-auto space-y-8">
					{/* Header */}
					<div className="text-center space-y-3 max-w-2xl mx-auto">
						<div className="inline-flex p-3 rounded-2xl bg-primary/10 text-primary border border-primary/20">
							<Code className="w-8 h-8" />
						</div>
						<h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl bg-linear-to-r from-primary to-indigo-500 bg-clip-text text-transparent">
							Live Code Sandbox
						</h1>
						<p className="text-muted-foreground text-base sm:text-lg">
							Compile frontend layouts instantly. Experiment with
							HTML, CSS, and JavaScript with console log capture
							and CDN libraries.
						</p>
					</div>

					{/* Toolbar */}
					<div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-card/70 border border-border/80 rounded-2xl backdrop-blur-md">
						<div className="flex items-center gap-2">
							{/* Tab Selectors */}
							<div className="inline-flex p-1 rounded-xl bg-secondary border border-border">
								<button
									onClick={() => setActiveTab('html')}
									className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
										activeTab === 'html'
											? 'bg-background text-orange-500 shadow-xs font-bold'
											: 'text-muted-foreground hover:text-foreground'
									}`}
								>
									<FileCode className="w-3.5 h-3.5" />
									HTML
								</button>
								<button
									onClick={() => setActiveTab('css')}
									className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
										activeTab === 'css'
											? 'bg-background text-blue-500 shadow-xs font-bold'
											: 'text-muted-foreground hover:text-foreground'
									}`}
								>
									<Layers className="w-3.5 h-3.5" />
									CSS
								</button>
								<button
									onClick={() => setActiveTab('js')}
									className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
										activeTab === 'js'
											? 'bg-background text-amber-500 shadow-xs font-bold'
											: 'text-muted-foreground hover:text-foreground'
									}`}
								>
									<Code className="w-3.5 h-3.5" />
									JS
								</button>
							</div>

							{/* CDN Package Picker button */}
							<button
								onClick={() => setShowCdnModal(!showCdnModal)}
								className={`flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-xl border transition cursor-pointer font-medium ${
									selectedCdns.length > 0
										? 'bg-primary/10 border-primary/30 text-primary'
										: 'bg-secondary hover:bg-secondary/80 border-border text-muted-foreground hover:text-foreground'
								}`}
							>
								<Package className="w-3.5 h-3.5" />
								<span>CDNs ({selectedCdns.length})</span>
							</button>
						</div>

						{/* Actions */}
						<div className="flex items-center gap-2">
							<button
								onClick={downloadHtmlFile}
								className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-xl bg-secondary hover:bg-secondary/80 border border-border text-muted-foreground hover:text-foreground transition cursor-pointer font-medium"
								title="Download standalone HTML bundle"
							>
								<Download className="w-3.5 h-3.5" />
								<span>Export HTML</span>
							</button>

							<button
								onClick={forceRefresh}
								className="flex items-center gap-1 px-3 py-1.5 text-xs rounded-xl bg-primary text-primary-foreground font-semibold hover:opacity-90 transition cursor-pointer shadow-sm"
								title="Force re-render sandbox"
							>
								<RefreshCw className="w-3.5 h-3.5" />
								<span>Run</span>
							</button>

							<button
								onClick={resetStarter}
								className="text-xs px-2.5 py-1.5 rounded-xl hover:bg-secondary border border-border transition text-muted-foreground hover:text-foreground cursor-pointer"
								title="Reset to starter template"
							>
								Reset
							</button>
						</div>
					</div>

					{/* CDN Selector Dropdown */}
					{showCdnModal && (
						<div className="p-4 bg-card border border-border rounded-2xl space-y-3 animate-in fade-in duration-150">
							<div className="flex justify-between items-center text-xs font-bold text-foreground">
								<span>Include External Libraries via CDN</span>
								<button
									onClick={() => setShowCdnModal(false)}
									className="text-muted-foreground hover:text-foreground cursor-pointer"
								>
									Done
								</button>
							</div>
							<div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
								{CDN_LIBRARIES.map((cdn) => {
									const isChecked = selectedCdns.includes(
										cdn.id,
									);
									return (
										<button
											key={cdn.id}
											onClick={() => toggleCdn(cdn.id)}
											className={`flex items-center justify-between p-2.5 rounded-xl border text-xs text-left transition cursor-pointer ${
												isChecked
													? 'bg-primary/10 border-primary/40 text-primary font-semibold'
													: 'bg-secondary/40 border-border text-muted-foreground hover:text-foreground'
											}`}
										>
											<span>{cdn.name}</span>
											{isChecked && (
												<Check className="w-3.5 h-3.5 shrink-0" />
											)}
										</button>
									);
								})}
							</div>
						</div>
					)}

					{/* Main Workspace Layout */}
					<div
						className={`grid gap-6 items-stretch ${
							isFullscreen
								? 'fixed inset-0 z-50 p-6 bg-background grid-cols-1 overflow-auto'
								: 'grid-cols-1 lg:grid-cols-12'
						}`}
					>
						{/* Editor Panel (Hidden in Fullscreen preview) */}
						{!isFullscreen && (
							<div className="lg:col-span-6 bg-card/60 backdrop-blur-xl border border-border/80 rounded-2xl p-4 sm:p-6 flex flex-col shadow-xl space-y-3 min-h-120">
								<div className="flex justify-between items-center pb-2 border-b border-border/50 text-xs">
									<span className="font-bold uppercase tracking-wider text-muted-foreground">
										{activeTab === 'html'
											? 'HTML Structure'
											: activeTab === 'css'
												? 'CSS Styles'
												: 'JavaScript Logic'}
									</span>
									<span className="font-mono text-muted-foreground text-[11px]">
										{activeTab === 'html'
											? `${htmlCode.split('\n').length} lines`
											: activeTab === 'css'
												? `${cssCode.split('\n').length} lines`
												: `${jsCode.split('\n').length} lines`}
									</span>
								</div>

								<div className="flex-1 w-full min-h-105 rounded-xl overflow-hidden">
									{activeTab === 'html' && (
										<CodeEditor
											language="html"
											value={htmlCode}
											onChange={setHtmlCode}
											ariaLabel="HTML structure editor"
											height="420px"
											minHeight="420px"
										/>
									)}
									{activeTab === 'css' && (
										<CodeEditor
											language="css"
											value={cssCode}
											onChange={setCssCode}
											ariaLabel="CSS styling editor"
											height="420px"
											minHeight="420px"
										/>
									)}
									{activeTab === 'js' && (
										<CodeEditor
											language="javascript"
											value={jsCode}
											onChange={setJsCode}
											ariaLabel="JavaScript logic editor"
											height="420px"
											minHeight="420px"
										/>
									)}
								</div>
							</div>
						)}

						{/* Preview Panel */}
						<div
							className={`bg-card/60 backdrop-blur-xl border border-border/80 rounded-2xl p-4 sm:p-6 flex flex-col justify-between shadow-xl space-y-4 ${
								isFullscreen
									? 'col-span-1 min-h-[90vh]'
									: 'lg:col-span-6 min-h-120'
							}`}
						>
							<div className="flex justify-between items-center pb-2 border-b border-border/50">
								<h2 className="text-sm font-bold flex items-center gap-2">
									<Eye className="w-4 h-4 text-emerald-500" />
									Live Preview Frame
								</h2>

								<div className="flex items-center gap-2">
									<button
										onClick={() =>
											setIsConsoleOpen(!isConsoleOpen)
										}
										className={`flex items-center gap-1 px-2.5 py-1 text-xs rounded-lg border transition cursor-pointer font-medium ${
											consoleLogs.length > 0
												? 'bg-amber-500/10 border-amber-500/30 text-amber-500'
												: 'bg-secondary hover:bg-secondary/80 border-border text-muted-foreground hover:text-foreground'
										}`}
									>
										<Terminal className="w-3.5 h-3.5" />
										<span>
											Console ({consoleLogs.length})
										</span>
									</button>

									<button
										onClick={() =>
											setIsFullscreen(!isFullscreen)
										}
										className="p-1.5 rounded-lg bg-secondary hover:bg-secondary/80 border border-border text-muted-foreground hover:text-foreground transition cursor-pointer"
										title={
											isFullscreen
												? 'Exit Fullscreen'
												: 'Fullscreen'
										}
									>
										{isFullscreen ? (
											<Minimize2 className="w-3.5 h-3.5" />
										) : (
											<Maximize2 className="w-3.5 h-3.5" />
										)}
									</button>
								</div>
							</div>

							<div className="flex-1 w-full min-h-90 relative rounded-xl overflow-hidden border border-border bg-white shadow-inner flex flex-col">
								<iframe
									srcDoc={srcDoc}
									title="Code Sandbox Live Output Preview"
									sandbox="allow-scripts allow-modals"
									className="w-full flex-1 border-0 min-h-80"
								/>

								{/* Drawer Console */}
								{isConsoleOpen && (
									<div className="h-44 bg-slate-950 text-slate-100 border-t border-slate-800 p-3 flex flex-col font-mono text-xs overflow-hidden">
										<div className="flex justify-between items-center pb-1.5 border-b border-slate-800 text-[11px] text-slate-400">
											<span className="font-bold flex items-center gap-1.5">
												<Terminal className="w-3 h-3 text-primary" />
												Console Output
											</span>
											<button
												onClick={() =>
													setConsoleLogs([])
												}
												className="hover:text-white flex items-center gap-1 cursor-pointer"
											>
												<Trash2 className="w-3 h-3" />
												Clear
											</button>
										</div>
										<div className="flex-1 overflow-y-auto space-y-1 pt-1.5">
											{consoleLogs.length === 0 ? (
												<div className="text-slate-500 italic text-[11px]">
													No console output captured
													yet...
												</div>
											) : (
												consoleLogs.map((log) => (
													<div
														key={log.id}
														className={`flex items-start gap-2 text-[11px] leading-relaxed ${
															log.level ===
															'error'
																? 'text-rose-400'
																: log.level ===
																	  'warn'
																	? 'text-amber-400'
																	: 'text-slate-300'
														}`}
													>
														<span className="text-slate-600 shrink-0 select-none">
															[{log.time}]
														</span>
														<span className="break-all">
															{log.text}
														</span>
													</div>
												))
											)}
										</div>
									</div>
								)}
							</div>
						</div>
					</div>
				</div>
			</main>
		</>
	);
}
