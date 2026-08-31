import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from 'next-themes';

interface MermaidProps {
	chart: string;
}

export const MermaidDiagram: React.FC<MermaidProps> = ({ chart }) => {
	const ref = useRef<HTMLDivElement>(null);
	const [svg, setSvg] = useState<string>('');
	const [error, setError] = useState<string | null>(null);
	const { resolvedTheme } = useTheme();

	useEffect(() => {
		let isMounted = true;

		const renderDiagram = async () => {
			if (!chart) return;
			try {
				const mermaid = (await import('mermaid')).default;
				const isDark = resolvedTheme === 'dark';

				mermaid.initialize({
					startOnLoad: false,
					theme: isDark ? 'dark' : 'default',
					securityLevel: 'loose',
					fontFamily: 'inherit',
					themeVariables: isDark
						? {
								darkMode: true,
								background: '#0F172A',
								primaryColor: '#3B82F6',
								primaryTextColor: '#F8FAFC',
								primaryBorderColor: '#60A5FA',
								lineColor: '#94A3B8',
								secondaryColor: '#1E293B',
								tertiaryColor: '#1E293B',
						  }
						: {
								darkMode: false,
								background: '#FFFFFF',
								primaryColor: '#2563EB',
								primaryTextColor: '#0F172A',
								primaryBorderColor: '#3B82F6',
								lineColor: '#64748B',
								secondaryColor: '#F1F5F9',
								tertiaryColor: '#F8FAFC',
						  },
				});

				const id = `mermaid-${Math.random().toString(36).substring(2, 9)}`;
				const { svg } = await mermaid.render(id, chart.trim());

				if (isMounted) {
					setSvg(svg);
					setError(null);
				}
			} catch (err: any) {
				console.error('Mermaid render error:', err);
				if (isMounted) {
					setError(err?.message || 'Failed to render diagram');
				}
			}
		};

		renderDiagram();

		return () => {
			isMounted = false;
		};
	}, [chart, resolvedTheme]);

	if (error) {
		return (
			<div className="my-6 p-4 rounded-xl border border-red-200 dark:border-red-900/40 bg-red-50/50 dark:bg-red-950/20 text-red-600 dark:text-red-400 text-xs font-mono">
				Failed to render diagram: {error}
			</div>
		);
	}

	if (!svg) {
		return (
			<div className="my-6 p-8 flex items-center justify-center rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/30">
				<div className="animate-pulse flex space-x-2 text-sm text-gray-400">
					<span>Rendering interactive diagram...</span>
				</div>
			</div>
		);
	}

	return (
		<div className="my-8 overflow-x-auto rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-slate-900/80 p-6 shadow-sm">
			<div
				ref={ref}
				className="flex justify-center items-center [&>svg]:max-w-full [&>svg]:h-auto"
				dangerouslySetInnerHTML={{ __html: svg }}
			/>
		</div>
	);
};

export default MermaidDiagram;
