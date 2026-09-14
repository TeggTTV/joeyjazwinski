export interface SvgOptimizeOptions {
	removeComments: boolean;
	removeMetadata: boolean;
	removeNamespaces: boolean;
	removeIds: boolean;
	removeDimensions: boolean;
	roundDecimals: boolean;
	decimalPrecision: number;
	minifyWhitespace: boolean;
}

export const DEFAULT_SVG_OPTIONS: SvgOptimizeOptions = {
	removeComments: true,
	removeMetadata: true,
	removeNamespaces: true,
	removeIds: false,
	removeDimensions: false,
	roundDecimals: true,
	decimalPrecision: 2,
	minifyWhitespace: false,
};

/**
 * Optimizes SVG code based on selected toggles.
 */
export function optimizeSvgString(
	input: string,
	options: SvgOptimizeOptions = DEFAULT_SVG_OPTIONS,
): string {
	if (!input.trim()) return '';

	let result = input;

	// Remove XML prolog like <?xml version="1.0" encoding="utf-8"?>
	result = result.replace(/<\?xml[\s\S]*?\?>/gi, '');

	// Remove DOCTYPE
	result = result.replace(/<!DOCTYPE[\s\S]*?>/gi, '');

	if (options.removeComments) {
		result = result.replace(/<!--[\s\S]*?-->/g, '');
	}

	if (options.removeMetadata) {
		result = result.replace(/<metadata[\s\S]*?<\/metadata>/gi, '');
		result = result.replace(/<desc[\s\S]*?<\/desc>/gi, '');
		result = result.replace(/<title[\s\S]*?<\/title>/gi, '');
	}

	if (options.removeNamespaces) {
		result = result.replace(
			/\s(xmlns:(?:sketch|inkscape|sodipodi|figma|custom|adobe|i|graph)="[^"]*")/gi,
			'',
		);
		result = result.replace(
			/\s(?:sketch|inkscape|sodipodi|figma|custom|adobe):[\w-]+="[^"]*"/gi,
			'',
		);
		result = result.replace(/<\/?(?:sodipodi|inkscape):[\w-]+[^>]*>/gi, '');
	}

	if (options.removeIds) {
		result = result.replace(/\s+id="[^"]*"/gi, '');
	}

	if (options.removeDimensions) {
		// Only remove width and height if viewBox is present
		if (/viewBox=/i.test(result)) {
			result = result.replace(
				/<svg\b([^>]*?)\s+(?:width|height)="[^"]*"/gi,
				'<svg$1',
			);
			result = result.replace(
				/<svg\b([^>]*?)\s+(?:width|height)="[^"]*"/gi,
				'<svg$1',
			);
		}
	}

	if (options.roundDecimals) {
		const precision = Math.max(0, Math.min(4, options.decimalPrecision));
		result = result.replace(
			/\b(\d+\.\d{3,})\b/g,
			(match) => {
				const num = parseFloat(match);
				return isNaN(num) ? match : num.toFixed(precision).replace(/\.?0+$/, '');
			},
		);
	}

	if (options.minifyWhitespace) {
		result = result
			.replace(/\r?\n/g, ' ')
			.replace(/\s{2,}/g, ' ')
			.replace(/>\s+</g, '><')
			.trim();
	} else {
		// Clean blank lines
		result = result.replace(/^\s*[\r\n]/gm, '').trim();
	}

	return result;
}

/**
 * Attribute map for SVG to React JSX
 */
const JSX_ATTR_MAP: Record<string, string> = {
	'class': 'className',
	'clip-path': 'clipPath',
	'clip-rule': 'clipRule',
	'fill-opacity': 'fillOpacity',
	'fill-rule': 'fillRule',
	'font-family': 'fontFamily',
	'font-size': 'fontSize',
	'font-weight': 'fontWeight',
	'marker-end': 'markerEnd',
	'marker-mid': 'markerMid',
	'marker-start': 'markerStart',
	'stroke-dasharray': 'strokeDasharray',
	'stroke-dashoffset': 'strokeDashoffset',
	'stroke-linecap': 'strokeLinecap',
	'stroke-linejoin': 'strokeLinejoin',
	'stroke-miterlimit': 'strokeMiterlimit',
	'stroke-opacity': 'strokeOpacity',
	'stroke-width': 'strokeWidth',
	'stop-color': 'stopColor',
	'stop-opacity': 'stopOpacity',
	'text-anchor': 'textAnchor',
	'vector-effect': 'vectorEffect',
	'xlink:href': 'xlinkHref',
	'xml:space': 'xmlSpace',
	'xmlns:xlink': 'xmlnsXlink',
};

/**
 * Converts sanitized SVG into a clean React JSX functional component.
 */
export function convertSvgToReactJsx(
	svg: string,
	componentName: string = 'SvgIcon',
	typescript: boolean = true,
): string {
	if (!svg.trim()) return '';

	let jsx = svg;

	// Replace kebab-case SVG attributes with camelCase
	for (const [attr, jsxAttr] of Object.entries(JSX_ATTR_MAP)) {
		const regex = new RegExp(`\\b${attr}=`, 'g');
		jsx = jsx.replace(regex, `${jsxAttr}=`);
	}

	// Insert {...props} into root <svg>
	jsx = jsx.replace(/<svg\b([^>]*)>/i, '<svg$1 {...props}>');

	// Self-close tags that might not be closed (path, circle, rect, line, polygon, polyline, stop, ellipse)
	jsx = jsx.replace(
		/<(path|circle|rect|line|polygon|polyline|stop|ellipse)([^>]*?[^\/])>/gi,
		'<$1$2 />',
	);

	const tsProps = typescript
		? 'React.SVGProps<SVGSVGElement>'
		: 'props';

	return `import React from 'react';

export default function ${componentName}(props: ${tsProps}) {
	return (
		${jsx.split('\n').map((line, idx) => (idx === 0 ? line : '\t\t' + line)).join('\n')}
	);
}
`;
}

/**
 * Converts SVG to React Native SVG snippet
 */
export function convertSvgToReactNative(
	svg: string,
	componentName: string = 'SvgIcon',
): string {
	if (!svg.trim()) return '';

	// Extract tags used
	const tagMatches = svg.match(/<([a-z0-9]+)/gi) || [];
	const rawTags = Array.from(new Set(tagMatches.map((t) => t.slice(1).toLowerCase())));

	const tagMap: Record<string, string> = {
		svg: 'Svg',
		circle: 'Circle',
		ellipse: 'Ellipse',
		g: 'G',
		text: 'Text',
		tspan: 'TSpan',
		textpath: 'TextPath',
		path: 'Path',
		polygon: 'Polygon',
		polyline: 'Polyline',
		line: 'Line',
		rect: 'Rect',
		use: 'Use',
		image: 'Image',
		symbol: 'Symbol',
		defs: 'Defs',
		lineargradient: 'LinearGradient',
		radialgradient: 'RadialGradient',
		stop: 'Stop',
		clippath: 'ClipPath',
		pattern: 'Pattern',
		mask: 'Mask',
	};

	const importsNeeded: string[] = [];
	let rnSvg = svg;

	for (const raw of rawTags) {
		const rnComp = tagMap[raw];
		if (rnComp) {
			if (!importsNeeded.includes(rnComp)) importsNeeded.push(rnComp);
			// Replace open and close tags
			const openRe = new RegExp(`<${raw}\\b`, 'gi');
			const closeRe = new RegExp(`<\\/${raw}>`, 'gi');
			rnSvg = rnSvg.replace(openRe, `<${rnComp}`);
			rnSvg = rnSvg.replace(closeRe, `</${rnComp}>`);
		}
	}

	// Replace JSX attributes
	for (const [attr, jsxAttr] of Object.entries(JSX_ATTR_MAP)) {
		const regex = new RegExp(`\\b${attr}=`, 'g');
		rnSvg = rnSvg.replace(regex, `${jsxAttr}=`);
	}

	rnSvg = rnSvg.replace(/<Svg\b([^>]*)>/i, '<Svg$1 {...props}>');

	return `import React from 'react';
import Svg, { ${importsNeeded.filter((t) => t !== 'Svg').join(', ')} } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';

export default function ${componentName}(props: SvgProps) {
	return (
		${rnSvg.split('\n').map((line, idx) => (idx === 0 ? line : '\t\t' + line)).join('\n')}
	);
}
`;
}

/**
 * Creates an optimized Data URI
 */
export function convertSvgToDataUri(svg: string, base64: boolean = false): string {
	if (!svg.trim()) return '';
	if (base64) {
		const encoded = typeof window !== 'undefined'
			? window.btoa(unescape(encodeURIComponent(svg)))
			: Buffer.from(svg).toString('base64');
		return `data:image/svg+xml;base64,${encoded}`;
	}
	const uriEncoded = encodeURIComponent(svg)
		.replace(/%20/g, ' ')
		.replace(/%3D/g, '=')
		.replace(/%3A/g, ':')
		.replace(/%2F/g, '/')
		.replace(/%22/g, "'");
	return `data:image/svg+xml;utf8,${uriEncoded}`;
}
