// Site Builder Component Types
export type ComponentType =
	| 'navbar'
	| 'hero'
	| 'features'
	| 'testimonials'
	| 'pricing'
	| 'cta'
	| 'contact'
	| 'gallery'
	| 'stats'
	| 'faq'
	| 'team'
	| 'logos'
	| 'newsletter'
	| 'process'
	| 'comparison'
	| 'footer'
	| 'spacer';

export type ShadowSize = 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

export interface ComponentStyles {
	fontFamily?: string;
	fontSize?: string;
	fontColor?: string;
	bgColor?: string;
	margin?: {
		top: number;
		right: number;
		bottom: number;
		left: number;
	};
	padding?: {
		top: number;
		right: number;
		bottom: number;
		left: number;
	};
	shadow?: ShadowSize;
}

export interface ComponentInstance {
	id: string;
	type: ComponentType;
	variant: number;
	styles: ComponentStyles;
}

export interface SiteBuilderState {
	components: ComponentInstance[];
	selectedComponentId: string | null;
}

export interface ComponentMetadata {
	type: ComponentType;
	name: string;
	description: string;
	icon: string;
	variantCount: number;
}
