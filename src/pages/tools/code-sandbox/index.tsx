import { useState, useEffect } from 'react';
import { NextSeo } from 'next-seo';
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
				title="Live HTML/CSS Sandbox | Joey Jazwinski"
				description="A client-side play box to edit HTML and CSS codes and watch live renders instantly inside a sandboxed iframe."
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
									className="text-xs flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-secondary hover:bg-secondary/80 border border-border transition text-muted-foreground hover:text-foreground"
								>
									<RefreshCw className="w-3.5 h-3.5" />
									Run
								</button>
							</div>

							<iframe
								srcDoc={srcDoc}
								title="Sandbox Preview"
								sandbox="allow-scripts"
								className="w-full grow rounded-xl border border-border bg-white shadow-inner min-h-90"
							/>
						</div>
					</div>
				</div>
			</main>
		</>
	);
}
