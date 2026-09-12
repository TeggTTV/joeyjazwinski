import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useTheme } from 'next-themes';
import { Loader2 } from 'lucide-react';

// Dynamic import with SSR disabled to prevent server hydration mismatches
const MonacoEditor = dynamic(() => import('@monaco-editor/react'), {
	ssr: false,
	loading: () => (
		<div className="w-full h-full min-h-[220px] flex flex-col items-center justify-center bg-card/40 border border-border/40 rounded-xl text-muted-foreground gap-2">
			<Loader2 className="w-5 h-5 animate-spin text-primary" />
			<span className="text-xs font-mono">Loading editor...</span>
		</div>
	),
});

export interface CodeEditorProps {
	value: string;
	onChange?: (value: string) => void;
	language?: string;
	readOnly?: boolean;
	height?: string | number;
	minHeight?: string | number;
	placeholder?: string;
	ariaLabel?: string;
	wordWrap?: boolean;
	lineNumbers?: 'on' | 'off' | 'relative';
	minimap?: boolean;
	className?: string;
}

export default function CodeEditor({
	value,
	onChange,
	language = 'plaintext',
	readOnly = false,
	height = '100%',
	minHeight = '280px',
	placeholder,
	ariaLabel = 'Code editor',
	wordWrap = true,
	lineNumbers = 'on',
	minimap = false,
	className = '',
}: CodeEditorProps) {
	const { resolvedTheme } = useTheme();
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	// Monaco theme mapping
	const monacoTheme = resolvedTheme === 'dark' ? 'vs-dark' : 'light';

	// Normalize language names for Monaco
	const normalizedLang = (() => {
		const l = language.toLowerCase();
		if (l === 'powershell') return 'powershell';
		if (l === 'bash' || l === 'sh' || l === 'shell') return 'shell';
		if (l === 'javascript' || l === 'js') return 'javascript';
		if (l === 'typescript' || l === 'ts') return 'typescript';
		if (l === 'json') return 'json';
		if (l === 'html') return 'html';
		if (l === 'css') return 'css';
		if (l === 'python' || l === 'py') return 'python';
		if (l === 'go' || l === 'golang') return 'go';
		if (l === 'rust' || l === 'rs') return 'rust';
		if (l === 'csharp' || l === 'cs') return 'csharp';
		if (l === 'php') return 'php';
		if (l === 'sql') return 'sql';
		return 'plaintext';
	})();

	if (!mounted) {
		return (
			<div
				style={{ minHeight }}
				className={`w-full h-full flex flex-col items-center justify-center bg-card/40 border border-border/40 rounded-xl text-muted-foreground gap-2 ${className}`}
			>
				<Loader2 className="w-5 h-5 animate-spin text-primary" />
				<span className="text-xs font-mono">Initializing editor...</span>
			</div>
		);
	}

	return (
		<div
			role="region"
			aria-label={ariaLabel}
			style={{ minHeight }}
			className={`w-full h-full rounded-xl overflow-hidden border border-border/80 focus-within:ring-2 focus-within:ring-primary focus-within:border-transparent transition-all shadow-inner relative bg-background ${className}`}
		>
			<MonacoEditor
				height={height}
				language={normalizedLang}
				theme={monacoTheme}
				value={value}
				onChange={(val) => {
					if (onChange) onChange(val || '');
				}}
				options={{
					readOnly,
					minimap: { enabled: minimap },
					fontSize: 13,
					fontFamily: 'var(--font-mono, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace)',
					wordWrap: wordWrap ? 'on' : 'off',
					lineNumbers,
					scrollBeyondLastLine: false,
					automaticLayout: true,
					tabSize: 2,
					renderLineHighlight: readOnly ? 'none' : 'line',
					padding: { top: 12, bottom: 12 },
					scrollbar: {
						verticalScrollbarSize: 8,
						horizontalScrollbarSize: 8,
						alwaysConsumeMouseWheel: false,
					},
					cursorBlinking: 'smooth',
					smoothScrolling: true,
					accessibilitySupport: 'on',
					folding: true,
				}}
			/>
		</div>
	);
}
