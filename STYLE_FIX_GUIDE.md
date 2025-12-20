# Fixing Component Inline Styles

## Problem

Inline styles aren't working in the site demo because components are spreading the raw `styles` object which contains custom properties (`fontColor`, `bgColor`, `margin`, `padding`, `shadow`) that need to be converted to valid CSS.

## Solution

Created a utility function `convertStylesToCSS()` that converts custom ComponentStyles to valid CSS properties.

## How to Fix Each Component

### Step 1: Import the utilities

Replace the top of each component file:

```tsx
// OLD:
import React from 'react';
import { ComponentStyles } from '../../types';

// NEW:
import React from 'react';
import { ComponentStyles } from '../../types';
import { convertStylesToCSS, getShadowClass } from '../../utils/styleUtils';
```

### Step 2: Update the component body

Replace the shadow and style handling:

```tsx
// OLD:
const shadowClass = styles.shadow && styles.shadow !== 'none' ? `shadow-${styles.shadow}` : '';

return (
  <section className={`w-full py-16 px-6 ${shadowClass}`} style={{...styles, backgroundColor: styles.bgColor || '#ffffff'}}>

// NEW:
const shadowClass = getShadowClass(styles.shadow);
const cssStyles = convertStylesToCSS(styles);

return (
  <section className={`w-full py-16 px-6 ${shadowClass}`} style={cssStyles}>
```

### Step 3: Remove default background colors

Since `convertStylesToCSS` handles defaults, remove inline defaults:

```tsx
// OLD:
style={{...styles, backgroundColor: styles.bgColor || '#ffffff'}}

// NEW:
style={cssStyles}
```

## Example: Fixed Component

```tsx
import React from 'react';
import { ComponentStyles } from '../../types';
import { convertStylesToCSS, getShadowClass } from '../../utils/styleUtils';

interface LogosVariant1Props {
	styles?: Partial<ComponentStyles>;
}

export const LogosVariant1: React.FC<LogosVariant1Props> = ({
	styles = {},
}) => {
	const shadowClass = getShadowClass(styles.shadow);
	const cssStyles = convertStylesToCSS(styles);

	const logos = [
		'TechCorp',
		'InnovateCo',
		'FutureSoft',
		'CloudBase',
		'DataFlow',
		'CodeWorks',
	];

	return (
		<section
			className={`w-full py-16 px-6 ${shadowClass}`}
			style={cssStyles}
		>
			<div className="max-w-7xl mx-auto">
				<p className="text-center text-muted-foreground mb-8">
					Trusted by leading companies
				</p>

				<div className="grid grid-cols-2 md:grid-cols-6 gap-8 items-center">
					{logos.map((logo, index) => (
						<div
							key={index}
							className="flex items-center justify-center h-12 text-gray-400 font-bold text-lg hover:text-gray-600 transition opacity-60 hover:opacity-100"
						>
							{logo}
						</div>
					))}
				</div>
			</div>
		</section>
	);
};
```

## Files to Update

Apply this pattern to ALL component files in:

-   `src/components/SiteBuilder/components/gallery/` (3 files)
-   `src/components/SiteBuilder/components/stats/` (3 files)
-   `src/components/SiteBuilder/components/faq/` (3 files)
-   `src/components/SiteBuilder/components/team/` (3 files)
-   `src/components/SiteBuilder/components/logos/` (3 files)
-   `src/components/SiteBuilder/components/newsletter/` (3 files)
-   `src/components/SiteBuilder/components/process/` (3 files)
-   `src/components/SiteBuilder/components/comparison/` (3 files)

## Why This Works

The `convertStylesToCSS` function:

1. Maps `fontColor` → `color` (valid CSS)
2. Maps `bgColor` → `backgroundColor` (valid CSS)
3. Converts `margin` object → `margin: "0px 0px 0px 0px"` (valid CSS string)
4. Converts `padding` object → `padding: "0px 0px 0px 0px"` (valid CSS string)
5. Only returns valid CSSProperties

The `getShadowClass` function converts `shadow: 'md'` → `shadow-md` className.

This ensures all custom styles are properly applied when components are added to the site.
