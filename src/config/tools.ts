export interface ToolDefinition {
	title: string;
	description: string;
	href: string;
	category: 'Security' | 'Formatting' | 'Developer' | 'Design' | 'SEO';
	badge?: string;
}

export const ALL_TOOLS: ToolDefinition[] = [
	{
		title: 'QR Code Generator',
		description:
			'Create high-resolution QR codes dynamically. Supports size parameters and foreground/background colors.',
		href: '/developer-tools/qrcode-generator',
		category: 'Design',
	},
	{
		title: 'Password Generator',
		description:
			'Generate secure passwords matching character rules, symbol pools, length metrics, and crack time estimates.',
		href: '/developer-tools/password-generator',
		category: 'Security',
		badge: 'Popular',
	},
	{
		title: 'Word & Character Counter',
		description:
			'Analyze word counts, character lengths, reading and speaking durations, and readability scores in real-time.',
		href: '/developer-tools/word-counter',
		category: 'Formatting',
		badge: 'New',
	},
	{
		title: 'JSON Formatter & Validator',
		description:
			'Beautify, inspect, validate syntax errors, and minify raw JSON payloads with formatting settings.',
		href: '/developer-tools/json-formatter',
		category: 'Formatting',
	},
	{
		title: 'Base64 & URL Encoder',
		description:
			'Convert text strings to Base64 or URL-encoded formats, and decode them back client-side.',
		href: '/developer-tools/encoder-decoder',
		category: 'Developer',
	},
	{
		title: 'Text Diff Checker',
		description:
			'Compare two blocks of code or text side-by-side to highlight line additions, updates, and removals.',
		href: '/developer-tools/diff-checker',
		category: 'Developer',
	},
	{
		title: 'WCAG Contrast Checker',
		description:
			'Input foreground and background colors to verify contrast ratio compliance with AA and AAA standards.',
		href: '/developer-tools/contrast-checker',
		category: 'Design',
	},
	{
		title: 'RegEx Tester',
		description:
			'Test regular expressions against strings with match visualizations, flag switches, and group listings.',
		href: '/developer-tools/regex-tester',
		category: 'Developer',
	},
	{
		title: 'JWT Debugger',
		description:
			'Decode and inspect JSON Web Tokens locally. Review payload data, algorithms, and key expiration dates.',
		href: '/developer-tools/jwt-debugger',
		category: 'Developer',
	},
	{
		title: 'Code Sandbox',
		description:
			'Write HTML and CSS in real-time to inspect live rendering and edit styles on the fly.',
		href: '/developer-tools/code-sandbox',
		category: 'Developer',
	},
	{
		title: 'Hash & HMAC Generator',
		description:
			'Generate SHA-1, SHA-256, and SHA-512 hashes or HMAC signatures with custom keys locally.',
		href: '/developer-tools/hash-generator',
		category: 'Security',
	},
	{
		title: 'SVG Optimizer & Exporter',
		description:
			'Clean up vector XML data by dropping useless metadata, view rendering preview, and export to PNG.',
		href: '/developer-tools/svg-optimizer',
		category: 'Design',
	},
	{
		title: 'Image Compressor',
		description:
			'Resize and optimize images completely client-side using adjustable quality sliders and width bounds.',
		href: '/developer-tools/image-compressor',
		category: 'Design',
	},
	{
		title: 'GIF Generator',
		description:
			'Convert local MP4, WebM, or OGG videos into animated GIFs entirely in your browser with size and frame rate customization.',
		href: '/developer-tools/gif-generator',
		category: 'Design',
		badge: 'New',
	},
	{
		title: 'JSON to Zod & TS',
		description:
			'Paste raw JSON to generate TypeScript interfaces and Zod validation schemas client-side.',
		href: '/developer-tools/json-to-zod-ts',
		category: 'Developer',
	},
	{
		title: 'Git Scenario Builder',
		description:
			'Select Git workflows and customize branch/commit settings to output ready-to-use terminal commands.',
		href: '/developer-tools/git-command-builder',
		category: 'Developer',
	},
	{
		title: 'PEM to JWK Converter',
		description:
			'Convert PEM public/private keys to JSON Web Key (JWK) configurations fully client-side.',
		href: '/developer-tools/pem-jwk-converter',
		category: 'Developer',
	},
	{
		title: 'cURL Command Converter',
		description:
			'Convert raw CLI cURL request syntaxes into JavaScript Fetch or Axios functions.',
		href: '/developer-tools/curl-converter',
		category: 'Developer',
	},
	{
		title: 'MongoDB URI Builder',
		description:
			'Visually construct database connection strings by entering hosts, credentials, and parameters.',
		href: '/developer-tools/mongodb-uri-builder',
		category: 'Developer',
	},
	{
		title: 'Client Header Inspector',
		description:
			'View User Agent strings, viewport measurements, screen resolution, and incoming request headers.',
		href: '/developer-tools/user-agent-inspector',
		category: 'Developer',
	},
	{
		title: 'Cron Pattern Visualizer',
		description:
			'Translate cron expressions into human-readable descriptions and visualize scheduler runtimes.',
		href: '/developer-tools/cron-visualizer',
		category: 'Developer',
	},
	{
		title: 'SQL to Prisma schema',
		description:
			'Convert raw SQL CREATE TABLE statements into Prisma schema model declarations.',
		href: '/developer-tools/sql-to-prisma',
		category: 'Formatting',
	},
	{
		title: 'JSON to SQL inserts',
		description:
			'Instantly format raw JSON arrays or tables into SQL INSERT statements.',
		href: '/developer-tools/json-to-sql-insert',
		category: 'Formatting',
	},
	{
		title: 'CSV to Markdown table',
		description:
			'Convert Excel or comma-separated lists into clean, readable Markdown layout tables.',
		href: '/developer-tools/csv-to-markdown',
		category: 'Formatting',
	},
	{
		title: 'Tailwind Config Maker',
		description:
			'Generate custom tailwind.config.js theme extension blocks by selecting primary colors, fonts, and breakpoints.',
		href: '/developer-tools/tailwind-config-generator',
		category: 'Design',
	},
	{
		title: 'Sitemap Split & Check',
		description:
			'Parse, split, and validate large XML index sitemaps to optimize search crawls.',
		href: '/developer-tools/sitemap-splitter',
		category: 'Security',
	},
	{
		title: 'Robots.txt Generator',
		description:
			'Generate robots.txt parameters by defining allow/disallow paths, crawlers, and sitemap locations.',
		href: '/developer-tools/robots-generator',
		category: 'SEO',
	},
	{
		title: 'XML Sitemap Generator',
		description:
			'Add page URLs, last modified dates, crawl priorities, and frequencies to compile XML sitemaps.',
		href: '/developer-tools/sitemap-generator',
		category: 'SEO',
	},
	{
		title: 'Meta Tag Generator',
		description:
			'Build website header tags by filling in title, description, OpenGraph, and Twitter Card details.',
		href: '/developer-tools/meta-tag-generator',
		category: 'SEO',
	},
	{
		title: 'JSON-LD Schema Generator',
		description:
			'Generate FAQ, Local Business, or Article JSON-LD structured schemas by filling out form inputs.',
		href: '/developer-tools/schema-generator',
		category: 'SEO',
	},
	{
		title: 'URL Slug Generator',
		description:
			'Convert text strings to clean URL slugs by removing stopwords, adjusting casing, and replacing spaces.',
		href: '/developer-tools/url-slug-generator',
		category: 'SEO',
	},
	{
		title: 'Redirect Rules Generator',
		description:
			'Create 301 and 302 redirect rules for Nginx, Apache (.htaccess), Next.js, and IIS.',
		href: '/developer-tools/redirect-rules',
		category: 'SEO',
	},
	{
		title: 'HTML Head SEO Analyzer',
		description:
			'Paste page markup to audit indexing elements like title length warnings, meta tags, and OpenGraph parameters.',
		href: '/developer-tools/html-head-analyzer',
		category: 'SEO',
	},
	{
		title: 'Keyword Density Analyzer',
		description:
			'Paste copy to analyze word count, reading duration, and term densities with stopwords filter controls.',
		href: '/developer-tools/keyword-density',
		category: 'SEO',
	},
	{
		title: 'SERP Snippet Preview',
		description:
			'Preview how titles, meta descriptions, and URL structures render in Google desktop and mobile search views.',
		href: '/developer-tools/serp-preview',
		category: 'SEO',
	},
];

export function getRelatedTools(currentHref: string, count: number = 4): ToolDefinition[] {
	const current = ALL_TOOLS.find((t) => t.href === currentHref);
	const others = ALL_TOOLS.filter((t) => t.href !== currentHref);

	if (!current) {
		return others.slice(0, count);
	}

	const sameCategory = others.filter((t) => t.category === current.category);
	const diffCategory = others.filter((t) => t.category !== current.category);

	const combined = [...sameCategory, ...diffCategory];
	return combined.slice(0, count);
}
