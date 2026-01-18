import React, { useState, useEffect, useRef } from 'react';
import Editor from '@monaco-editor/react';
import { Play, RotateCcw, Terminal, X } from 'lucide-react';

interface LessonSandboxProps {
	onClose: () => void;
	initialCode?: string;
	initialLanguage?: 'javascript' | 'python';
}

declare global {
	interface Window {
		loadPyodide: any;
		pyodide: any;
	}
}

const LessonSandbox: React.FC<LessonSandboxProps> = ({
	onClose,
	initialCode = '',
	initialLanguage = 'javascript',
}) => {
	const [language, setLanguage] = useState<'javascript' | 'python'>(
		initialLanguage
	);
	const [code, setCode] = useState(
		initialCode || getDefaultCode(initialLanguage)
	);
	const [output, setOutput] = useState<string[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [isPyodideLoading, setIsPyodideLoading] = useState(false);

	const pyodideRef = useRef<any>(null);

	// Default code snippets
	function getDefaultCode(lang: string) {
		if (lang === 'javascript')
			return "console.log('Hello from JavaScript!');\n\nconst sum = (a, b) => a + b;\nconsole.log('Sum of 5 + 10 is:', sum(5, 10));";
		if (lang === 'python')
			return "print('Hello from Python!')\n\ndef sum(a, b):\n    return a + b\n\nprint(f'Sum of 5 + 10 is: {sum(5, 10)}')";
		return '';
	}

	// Load Pyodide script if Python is selected
	useEffect(() => {
		if (language === 'python' && !window.pyodide && !isPyodideLoading) {
			setIsPyodideLoading(true);
			const script = document.createElement('script');
			script.src =
				'https://cdn.jsdelivr.net/pyodide/v0.25.0/full/pyodide.js';
			script.async = true;
			script.onload = async () => {
				try {
					const pyodide = await window.loadPyodide();
					window.pyodide = pyodide;
					pyodideRef.current = pyodide;
					// Catch stdout
					pyodide.setStdout({
						batched: (msg: string) => addToOutput(msg),
					});
				} catch (err) {
					console.error('Failed to load Pyodide', err);
					addToOutput('Error: Failed to load Python environment.');
				} finally {
					setIsPyodideLoading(false);
				}
			};
			document.body.appendChild(script);
		} else if (window.pyodide) {
			// Re-attach stdout if switching back
			window.pyodide.setStdout({
				batched: (msg: string) => addToOutput(msg),
			});
		}
	}, [language, isPyodideLoading]);

	const addToOutput = (msg: string) => {
		setOutput((prev) => [...prev, msg]);
	};

	const handleRun = async () => {
		setIsLoading(true);
		setOutput([]); // Clear previous output

		try {
			if (language === 'javascript') {
				// Determine logic for capturing console.log
				const logs: string[] = [];
				const originalLog = console.log;
				const originalError = console.error;

				console.log = (...args) => {
					logs.push(args.map((a) => String(a)).join(' '));
					// originalLog(...args); // Optional: keep logging to devtools
				};
				console.error = (...args) => {
					logs.push('ERROR: ' + args.map((a) => String(a)).join(' '));
				};

				try {
					// eslint-disable-next-line no-eval
					eval(code);
				} catch (err: any) {
					logs.push('Runtime Error: ' + err.message);
				} finally {
					console.log = originalLog;
					console.error = originalError;
					setOutput(logs);
				}
			} else if (language === 'python') {
				if (!window.pyodide) {
					setOutput([
						'Python is loading... please wait a moment and try again.',
					]);
					return;
				}

				try {
					// Redirect stdout is handled by setStdout in useEffect, but we explicit capture return value too if needed
					await window.pyodide.runPythonAsync(code);
				} catch (err: any) {
					addToOutput('Runtime Error: ' + err.message);
				}
			}
		} catch (error: any) {
			setOutput((prev) => [...prev, `Error: ${error.message}`]);
		} finally {
			setIsLoading(false);
		}
	};

	const handleClear = () => {
		setOutput([]);
	};

	const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const newLang = e.target.value as 'javascript' | 'python';
		setLanguage(newLang);
		setCode(getDefaultCode(newLang));
		setOutput([]);
	};

	return (
		<div className="flex flex-col h-[600px] w-full bg-[#1e1e1e] rounded-lg overflow-hidden border border-gray-700 shadow-2xl">
			{/* Header / Toolbar */}
			<div className="flex items-center justify-between px-4 py-2 bg-[#2d2d2d] border-b border-gray-700 text-gray-200">
				<div className="flex items-center gap-4">
					<span className="font-semibold text-sm flex items-center gap-2">
						<Terminal size={16} className="text-blue-400" />
						Code Sandbox
					</span>
					<select
						value={language}
						onChange={handleLanguageChange}
						className="bg-[#3e3e3e] border border-gray-600 rounded px-2 py-1 text-xs focus:outline-none focus:border-blue-500"
					>
						<option value="javascript">JavaScript</option>
						<option value="python">Python</option>
					</select>
				</div>

				<div className="flex items-center gap-2">
					<button
						onClick={handleRun}
						disabled={
							isLoading ||
							(language === 'python' && isPyodideLoading)
						}
						className={`flex items-center gap-2 px-3 py-1.5 rounded text-xs font-medium transition-colors ${
							isLoading
								? 'bg-gray-600 cursor-not-allowed'
								: 'bg-green-600 hover:bg-green-700 text-white'
						}`}
					>
						<Play size={14} />
						{isLoading ? 'Running...' : 'Run Code'}
					</button>
					<button
						onClick={onClose}
						className="p-1 hover:bg-red-500/20 hover:text-red-400 rounded transition-colors"
						title="Close Sandbox"
					>
						<X size={16} />
					</button>
				</div>
			</div>

			{/* Main Content Area: Editor + Console */}
			<div className="flex-1 flex flex-col md:flex-row h-full overflow-hidden">
				{/* Editor */}
				<div className="flex-1 h-1/2 md:h-full border-b md:border-b-0 md:border-r border-gray-700 relative">
					<Editor
						height="100%"
						defaultLanguage={language}
						language={language}
						value={code}
						onChange={(value) => setCode(value || '')}
						theme="vs-dark"
						options={{
							minimap: { enabled: false },
							fontSize: 14,
							scrollBeyondLastLine: false,
							padding: { top: 16 },
						}}
					/>
				</div>

				{/* Console Output */}
				<div className="flex-1 md:w-[40%] h-1/2 md:h-full bg-[#1e1e1e] flex flex-col">
					<div className="flex items-center justify-between px-4 py-2 bg-[#252526] border-b border-gray-700">
						<span className="text-xs font-medium text-gray-400">
							Console Output
						</span>
						<button
							onClick={handleClear}
							className="p-1 text-gray-400 hover:text-white transition-colors"
							title="Clear Console"
						>
							<RotateCcw size={12} />
						</button>
					</div>
					<div className="flex-1 p-4 font-mono text-sm overflow-y-auto space-y-1">
						{output.length === 0 ? (
							<span className="text-gray-500 italic text-xs">
								Output will appear here...
							</span>
						) : (
							output.map((line, i) => (
								<div
									key={i}
									className="text-gray-300 break-words whitespace-pre-wrap border-b border-gray-800/50 pb-1 last:border-0 icon-console-log"
								>
									<span className="text-green-500 mr-2 opacity-50">
										➜
									</span>
									{line}
								</div>
							))
						)}
						{language === 'python' && isPyodideLoading && (
							<div className="text-blue-400 animate-pulse text-xs mt-2">
								Initializing Python environment...
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default LessonSandbox;
