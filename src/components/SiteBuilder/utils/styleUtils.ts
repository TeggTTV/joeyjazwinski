import { ComponentStyles } from '../types';
import { CSSProperties } from 'react';

/**
 * Converts ComponentStyles to valid CSS inline styles
 */
export const convertStylesToCSS = (
	styles: Partial<ComponentStyles>
): CSSProperties => {
	const cssStyles: CSSProperties = {};

	// Font family
	if (styles.fontFamily) {
		cssStyles.fontFamily = styles.fontFamily;
	}

	// Font size
	if (styles.fontSize) {
		cssStyles.fontSize = styles.fontSize;
	}

	// Font color -> color
	if (styles.fontColor) {
		cssStyles.color = styles.fontColor;
	}

	// Background color
	if (styles.bgColor) {
		cssStyles.backgroundColor = styles.bgColor;
	}

	// Margin - convert object to CSS string
	if (styles.margin) {
		cssStyles.margin = `${styles.margin.top}px ${styles.margin.right}px ${styles.margin.bottom}px ${styles.margin.left}px`;
	}

	// Padding - convert object to CSS string
	if (styles.padding) {
		cssStyles.padding = `${styles.padding.top}px ${styles.padding.right}px ${styles.padding.bottom}px ${styles.padding.left}px`;
	}

	return cssStyles;
};

/**
 * Gets the shadow className based on shadow size
 */
export const getShadowClass = (shadow?: string): string => {
	if (!shadow || shadow === 'none') return '';
	return `shadow-${shadow}`;
};
