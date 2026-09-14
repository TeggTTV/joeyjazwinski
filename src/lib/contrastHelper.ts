/**
 * Client-side color contrast, colorblindness simulation, and WCAG suggestion helper.
 */

export interface RGB {
	r: number;
	g: number;
	b: number;
}

export function hexToRgb(hex: string): RGB {
	const clean = hex.replace('#', '');
	if (clean.length === 3) {
		return {
			r: parseInt(clean[0] + clean[0], 16),
			g: parseInt(clean[1] + clean[1], 16),
			b: parseInt(clean[2] + clean[2], 16),
		};
	}
	return {
		r: parseInt(clean.substring(0, 2), 16) || 0,
		g: parseInt(clean.substring(2, 4), 16) || 0,
		b: parseInt(clean.substring(4, 6), 16) || 0,
	};
}

export function rgbToHex(rgb: RGB): string {
	const clamp = (n: number) => Math.max(0, Math.min(255, Math.round(n)));
	const r = clamp(rgb.r).toString(16).padStart(2, '0');
	const g = clamp(rgb.g).toString(16).padStart(2, '0');
	const b = clamp(rgb.b).toString(16).padStart(2, '0');
	return `#${r}${g}${b}`.toUpperCase();
}

/**
 * Calculates WCAG 2.1 relative luminance.
 */
export function getLuminance(hex: string): number {
	const rgb = hexToRgb(hex);
	const [r, g, b] = [rgb.r / 255, rgb.g / 255, rgb.b / 255].map((v) =>
		v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4),
	);
	return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/**
 * Calculates WCAG 2.1 contrast ratio between two colors (e.g. 4.5 for 4.5:1).
 */
export function getContrastRatio(hex1: string, hex2: string): number {
	const lum1 = getLuminance(hex1);
	const lum2 = getLuminance(hex2);
	const brightest = Math.max(lum1, lum2);
	const darkest = Math.min(lum1, lum2);
	const ratio = (brightest + 0.05) / (darkest + 0.05);
	return Math.round(ratio * 100) / 100;
}

/**
 * Colorblindness simulation transformations based on Machado et al. & Brettel algorithms.
 */
export type ColorblindMode = 'normal' | 'protanopia' | 'deuteranopia' | 'tritanopia' | 'achromatopsia';

export function simulateColorblindness(hex: string, mode: ColorblindMode): string {
	if (mode === 'normal') return hex;
	const { r, g, b } = hexToRgb(hex);

	// Linearize RGB
	let [lr, lg, lb] = [r, g, b].map((v) => Math.pow(v / 255, 2.2));
	let simR = 0;
	let simG = 0;
	let simB = 0;

	if (mode === 'protanopia') {
		// Red-blind
		simR = 0.56667 * lr + 0.43333 * lg + 0.0 * lb;
		simG = 0.55833 * lr + 0.44167 * lg + 0.0 * lb;
		simB = 0.0 * lr + 0.24167 * lg + 0.75833 * lb;
	} else if (mode === 'deuteranopia') {
		// Green-blind
		simR = 0.625 * lr + 0.375 * lg + 0.0 * lb;
		simG = 0.7 * lr + 0.3 * lg + 0.0 * lb;
		simB = 0.0 * lr + 0.3 * lg + 0.7 * lb;
	} else if (mode === 'tritanopia') {
		// Blue-blind
		simR = 0.95 * lr + 0.05 * lg + 0.0 * lb;
		simG = 0.0 * lr + 0.43333 * lg + 0.56667 * lb;
		simB = 0.0 * lr + 0.475 * lg + 0.525 * lb;
	} else if (mode === 'achromatopsia') {
		// Complete monochrome
		const gray = 0.2126 * lr + 0.7152 * lg + 0.0722 * lb;
		simR = gray;
		simG = gray;
		simB = gray;
	}

	// De-linearize back to sRGB
	const unmap = (v: number) => Math.pow(Math.max(0, Math.min(1, v)), 1 / 2.2) * 255;
	return rgbToHex({
		r: unmap(simR),
		g: unmap(simG),
		b: unmap(simB),
	});
}

/**
 * Finds the closest compliant color for foreground by adjusting lightness
 * until it meets the target contrast ratio (e.g. 4.5 for AA or 7.0 for AAA).
 */
export function suggestCompliantColor(
	fgHex: string,
	bgHex: string,
	targetRatio = 4.5,
): string | null {
	const currentRatio = getContrastRatio(fgHex, bgHex);
	if (currentRatio >= targetRatio) return null;

	const bgLum = getLuminance(bgHex);
	const shouldLighten = bgLum < 0.5; // If background is dark, lighten foreground; else darken

	let rgb = hexToRgb(fgHex);
	let step = shouldLighten ? 3 : -3;

	for (let i = 0; i < 90; i++) {
		rgb = {
			r: Math.max(0, Math.min(255, rgb.r + step)),
			g: Math.max(0, Math.min(255, rgb.g + step)),
			b: Math.max(0, Math.min(255, rgb.b + step)),
		};
		const candidateHex = rgbToHex(rgb);
		if (getContrastRatio(candidateHex, bgHex) >= targetRatio) {
			return candidateHex;
		}
	}

	// Fallback to absolute white or black if color range exhausted
	return shouldLighten ? '#FFFFFF' : '#000000';
}
