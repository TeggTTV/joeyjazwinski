export interface SerpConfig {
	title: string;
	description: string;
	url: string;
	targetKeyword: string;
	showRating: boolean;
	ratingValue: number;
	reviewCount: number;
	showPrice: boolean;
	price: string;
	inStock: boolean;
	showDate: boolean;
	dateString: string;
	showSitelinks: boolean;
	sitelinks: Array<{ title: string; path: string; desc: string }>;
}

export const DEFAULT_SERP_CONFIG: SerpConfig = {
	title: 'Free Developer & Designer Tools | Joey Jazwinski',
	description:
		'Explore instant client-side tools for web developers: JSON formatters, JWT debuggers, code sandboxes, SQL converters, and SVG optimizers running in your browser.',
	url: 'https://joeyjazwinski.com/developer-tools',
	targetKeyword: 'developer tools',
	showRating: true,
	ratingValue: 4.9,
	reviewCount: 128,
	showPrice: false,
	price: '$0.00',
	inStock: true,
	showDate: true,
	dateString: 'Sep 14, 2026',
	showSitelinks: true,
	sitelinks: [
		{ title: 'Code Sandbox', path: '/code-sandbox', desc: 'Live HTML, CSS, and JS editor.' },
		{ title: 'JWT Debugger', path: '/jwt-debugger', desc: 'Verify and decode auth tokens.' },
		{ title: 'SVG Optimizer', path: '/svg-optimizer', desc: 'Strip XML and export JSX.' },
		{ title: 'Contrast Checker', path: '/contrast-checker', desc: 'WCAG 2.1 compliance tests.' },
	],
};

// Cached canvas context for pixel width calculation
let measurementCtx: CanvasRenderingContext2D | null = null;

function getCanvasContext(): CanvasRenderingContext2D | null {
	if (typeof window === 'undefined') return null;
	if (!measurementCtx) {
		const canvas = document.createElement('canvas');
		measurementCtx = canvas.getContext('2d');
	}
	return measurementCtx;
}

/**
 * Measures the exact pixel width of text using the Google SERP desktop fonts.
 */
export function measureTextPx(text: string, font: string): number {
	const ctx = getCanvasContext();
	if (!ctx) {
		// Fallback approximation
		return text.length * (font.includes('20px') ? 10.5 : 7.5);
	}
	ctx.font = font;
	return Math.round(ctx.measureText(text).width);
}

export const GOOGLE_TITLE_FONT = 'normal 20px Arial, sans-serif';
export const GOOGLE_SNIPPET_FONT = 'normal 14px Arial, sans-serif';
export const GOOGLE_TITLE_MAX_PX = 600;
export const GOOGLE_DESC_MAX_PX = 960;

/**
 * Parses URL into breadcrumb segments.
 */
export function formatBreadcrumb(urlStr: string): string[] {
	try {
		const parsed = new URL(urlStr.startsWith('http') ? urlStr : `https://${urlStr}`);
		const segments = parsed.pathname.split('/').filter(Boolean);
		return [parsed.hostname, ...segments];
	} catch {
		return ['example.com', 'page'];
	}
}

/**
 * Highlights target keyword tokens in text.
 */
export function renderHighlightedKeyword(text: string, keyword: string) {
	if (!keyword.trim() || !text) return text;
	const tokens = keyword.trim().split(/\s+/).filter(Boolean);
	if (tokens.length === 0) return text;

	// Escape regex
	const pattern = tokens.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|');
	const regex = new RegExp(`(${pattern})`, 'gi');
	return text.split(regex);
}
