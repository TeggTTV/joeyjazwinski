import { useState, useEffect } from 'react';
import { NextSeo } from 'next-seo';
import ToolJsonLd from '@/components/seo/ToolJsonLd';
import { Code, RefreshCw, Eye } from 'lucide-react';

export default function CodeSandbox() {
	const [htmlCode, setHtmlCode] = useState(
		'<div class="premium-card">\n  <h1>Live Code Preview</h1>\n  <p>Modify the HTML or CSS panels to render live updates in this sandbox iframe.</p>\n  <button class="action-btn">Click Me!</button>\n</div>',
	);
	const [cssCode, setCssCode] = useState(
		'body {\n  font-family: system-ui, sans-serif;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  height: 100vh;\n  margin: 0;\n  background: #f8fafc;\n}\n\n.premium-card {\n  background: white;\n  padding: 2rem;\n  border-radius: 16px;\n  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);\n  text-align: center;\n  max-width: 320px;\n}\n\nh1 {\n  color: #3b82f6;\n  margin: 0 0 0.5rem;\n  font-size: 1.5rem;\n}\n\np {\n  color: #64748b;\n  font-size: 0.9rem;\n  line-height: 1.5;\n}\n\n.action-btn {\n  margin-top: 1.25rem;\n  background: #3b82f6;\n  color: white;\n  border: none;\n  padding: 0.5rem 1.25rem;\n  border-radius: 8px;\n  font-weight: 600;\n  cursor: pointer;\n  transition: opacity 0.2s;\n}\n\n.action-btn:hover {\n  opacity: 0.9;\n}',
	);
	const [srcDoc, setSrcDoc] = useState('');

	useEffect(() => {
		const timeout = setTimeout(() => {
			setSrcDoc(`
				<!DOCTYPE html>
				<html>
					<head>
						<style>${cssCode}</style>
					</head>
					<body>
						${htmlCode}
					</body>
				</html>
			`);
		}, 3000); // 3-second debounce on live editing
		return () => clearTimeout(timeout);
	}, [htmlCode, cssCode]);

	const forceRefresh = () => {
		setSrcDoc(`
			<!DOCTYPE html>
			<html>
				<head>
					<style>${cssCode}</style>
				</head>
				<body>
					${htmlCode}
				</body>
			</html>
		`);
	};

	return (
		<>
			<NextSeo
				title="Free Live HTML & CSS Sandbox | Instant Code Playground - Joey Jazwinski"
				description="Write, edit, and experiment with HTML and CSS code in real time with instant live rendering inside a secure, client-side sandboxed iframe."
				canonical="https://joeyjazwinski.com/developer-tools/code-sandbox"
				openGraph={{
					title: "Free Live HTML & CSS Sandbox | Instant Code Playground - Joey Jazwinski",
					description: "Write, edit, and experiment with HTML and CSS code in real time with instant live rendering inside a secure, client-side sandboxed iframe.",
					url: "https://joeyjazwinski.com/developer-tools/code-sandbox",
					type: "website",
					images: [
						{
							url: "https://joeyjazwinski.com/ogimage.png",
							width: 1200,
							height: 630,
							alt: "Live HTML & CSS Code Sandbox",
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
				name="Live HTML & CSS Code Sandbox"
				description="Write, edit, and experiment with HTML and CSS code in real time with instant live rendering inside a secure, client-side sandboxed iframe."
				url="https://joeyjazwinski.com/developer-tools/code-sandbox"
				category="DeveloperApplication"
			/>
			<main className="min-h-screen bg-background pt-32 pb-16 px-4 sm:px-6 lg:px-8 text-foreground">
				<div className="max-w-6xl mx-auto space-y-12">
					{/* Header */}
					<div className="text-center space-y-4 max-w-2xl mx-auto">
						<div className="inline-flex p-3 rounded-2xl bg-primary/10 text-primary border border-primary/20">
							<Code className="w-8 h-8" />
						</div>
						<h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl bg-linear-to-r from-primary to-indigo-500 bg-clip-text text-transparent">
							Live HTML/CSS Sandbox
						</h1>
						<p className="text-muted-foreground text-lg">
							Compile layouts instantly. Play with frontend
							scripts, elements, and stylesheets in a client-side
							environment.
						</p>
					</div>

					{/* Workspace */}
					<div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
						{/* Editors */}
						<div className="lg:col-span-6 space-y-6 flex flex-col">
							{/* HTML Editor */}
							<div className="bg-card/60 backdrop-blur-xl border border-border/80 rounded-2xl p-6 flex flex-col shadow-xl flex-1">
								<h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground border-b border-border/50 pb-2 mb-3">
									HTML Structure
								</h2>
								<textarea
									id="sandbox-html-textarea"
									aria-label="HTML structure code input"
									value={htmlCode}
									onChange={(e) =>
										setHtmlCode(e.target.value)
									}
									className="w-full h-48 p-4 rounded-xl border border-border bg-background/90 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none shadow-inner"
								/>
							</div>

							{/* CSS Editor */}
							<div className="bg-card/60 backdrop-blur-xl border border-border/80 rounded-2xl p-6 flex flex-col shadow-xl flex-1">
								<h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground border-b border-border/50 pb-2 mb-3">
									CSS Styles
								</h2>
								<textarea
									id="sandbox-css-textarea"
									aria-label="CSS styling code input"
									value={cssCode}
									onChange={(e) => setCssCode(e.target.value)}
									className="w-full h-48 p-4 rounded-xl border border-border bg-background/90 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none shadow-inner"
								/>
							</div>
						</div>

						{/* Live Preview */}
						<div className="lg:col-span-6 bg-card/60 backdrop-blur-xl border border-border/80 rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-xl min-h-120">
							<div className="flex justify-between items-center pb-2 border-b border-border/50 mb-4">
								<h2 className="text-lg font-bold flex items-center gap-2">
									<Eye className="w-5 h-5 text-emerald-500" />
									Live Preview Frame
								</h2>
								<button
									onClick={forceRefresh}
									aria-label="Re-render live HTML preview"
									className="text-xs flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-secondary hover:bg-secondary/80 border border-border transition text-muted-foreground hover:text-foreground"
								>
									<RefreshCw className="w-3.5 h-3.5" />
									Run
								</button>
							</div>

							<iframe
								srcDoc={srcDoc}
								title="Code Sandbox Live Output Preview"
								sandbox="allow-scripts"
								className="w-full grow rounded-xl border border-border bg-white shadow-inner min-h-90"
							/>
						</div>
					</div>

					{/* Explainer / Guide for SEO */}
					<div className="bg-card/40 border border-border/60 rounded-2xl p-8 space-y-6 mt-12">
						<h2 className="text-2xl font-bold text-foreground">Getting Started with HTML & CSS Coding</h2>
						<p className="text-sm text-muted-foreground leading-relaxed">
							Welcome to the client-side code playground. This tool is designed to provide developers, students, and designers with a fast, lightweight sandbox to sketch out interface designs, try CSS layout configurations, or test HTML hierarchies. Everything executes completely inside your browser locally, protecting your work and providing instant responsiveness.
						</p>
						<div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
							<div className="space-y-2">
								<h3 className="text-base font-semibold text-foreground">Structure (HTML)</h3>
								<p className="text-xs text-muted-foreground leading-relaxed">
									Use the HTML panel to outline the layout of your elements. Write valid markup with standard layout wrappers like divs, headers, footers, sections, or articles. Make sure all elements contain unique class identifiers or id attributes to style them correctly using the companion CSS panel.
								</p>
							</div>
							<div className="space-y-2">
								<h3 className="text-base font-semibold text-foreground">Presentation (CSS)</h3>
								<p className="text-xs text-muted-foreground leading-relaxed">
									Use the CSS panel to customize layout presentation, sizing, spacing, positioning, and animation transitions. You can utilize modern layout modules like Flexbox and Grid, define responsive color schemes, or build custom keyframe animation selectors.
								</p>
							</div>
							<div className="space-y-2">
								<h3 className="text-base font-semibold text-foreground">Sandbox Security</h3>
								<p className="text-xs text-muted-foreground leading-relaxed">
									The live preview renders contents inside a sandboxed frame (`iframe` with `sandbox="allow-scripts"`). This ensures security boundaries between the sandbox execution scope and the main website platform, protecting your browser environment.
								</p>
							</div>
						</div>
					</div>
				</div>
			</main>
		</>
	);
}
