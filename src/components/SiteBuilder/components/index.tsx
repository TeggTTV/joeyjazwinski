// This file exports all component variants for the site builder
import { ComponentType } from '../types';
import { NavbarVariant1 } from './navbars/NavbarVariant1';
import { NavbarVariant2 } from './navbars/NavbarVariant2';
import { NavbarVariant3 } from './navbars/NavbarVariant3';
import { HeroVariant1 } from './heroes/HeroVariant1';
import { HeroVariant2 } from './heroes/HeroVariant2';
import { HeroVariant3 } from './heroes/HeroVariant3';
import { HeroVariant4 } from './heroes/HeroVariant4';
import { FeaturesVariant1 } from './features/FeaturesVariant1';
import { FeaturesVariant2 } from './features/FeaturesVariant2';
import { FeaturesVariant3 } from './features/FeaturesVariant3';
import { TestimonialsVariant1 } from './testimonials/TestimonialsVariant1';
import { TestimonialsVariant2 } from './testimonials/TestimonialsVariant2';
import { TestimonialsVariant3 } from './testimonials/TestimonialsVariant3';
import { CTAVariant1 } from './ctas/CTAVariant1';
import { CTAVariant2 } from './ctas/CTAVariant2';
import { CTAVariant3 } from './ctas/CTAVariant3';
import { PricingVariant1 } from './pricing/PricingVariant1';
import { PricingVariant2 } from './pricing/PricingVariant2';
import { PricingVariant3 } from './pricing/PricingVariant3';
import { ContactVariant1 } from './contact/ContactVariant1';
import { ContactVariant2 } from './contact/ContactVariant2';
import { ContactVariant3 } from './contact/ContactVariant3';
import { FooterVariant1 } from './footers/FooterVariant1';
import { FooterVariant2 } from './footers/FooterVariant2';
import { FooterVariant3 } from './footers/FooterVariant3';
import { GalleryVariant1, GalleryVariant2, GalleryVariant3 } from './gallery';
import { StatsVariant1, StatsVariant2, StatsVariant3 } from './stats';
import { FAQVariant1, FAQVariant2, FAQVariant3 } from './faq';
import { TeamVariant1, TeamVariant2, TeamVariant3 } from './team';
import { LogosVariant1, LogosVariant2, LogosVariant3 } from './logos';
import {
	NewsletterVariant1,
	NewsletterVariant2,
	NewsletterVariant3,
} from './newsletter';
import { ProcessVariant1, ProcessVariant2, ProcessVariant3 } from './process';
import {
	ComparisonVariant1,
	ComparisonVariant2,
	ComparisonVariant3,
} from './comparison';
import { SpacerVariant1, SpacerVariant2, SpacerVariant3 } from './spacer';

// Component variant map
export const componentVariants: Record<
	ComponentType,
	Record<number, React.FC<any>>
> = {
	navbar: {
		1: NavbarVariant1,
		2: NavbarVariant2,
		3: NavbarVariant3,
	},
	hero: {
		1: HeroVariant1,
		2: HeroVariant2,
		3: HeroVariant3,
		4: HeroVariant4,
	},
	features: {
		1: FeaturesVariant1,
		2: FeaturesVariant2,
		3: FeaturesVariant3,
	},
	testimonials: {
		1: TestimonialsVariant1,
		2: TestimonialsVariant2,
		3: TestimonialsVariant3,
	},
	pricing: {
		1: PricingVariant1,
		2: PricingVariant2,
		3: PricingVariant3,
	},
	cta: {
		1: CTAVariant1,
		2: CTAVariant2,
		3: CTAVariant3,
	},
	contact: {
		1: ContactVariant1,
		2: ContactVariant2,
		3: ContactVariant3,
	},
	gallery: {
		1: GalleryVariant1,
		2: GalleryVariant2,
		3: GalleryVariant3,
	},
	stats: {
		1: StatsVariant1,
		2: StatsVariant2,
		3: StatsVariant3,
	},
	faq: {
		1: FAQVariant1,
		2: FAQVariant2,
		3: FAQVariant3,
	},
	team: {
		1: TeamVariant1,
		2: TeamVariant2,
		3: TeamVariant3,
	},
	logos: {
		1: LogosVariant1,
		2: LogosVariant2,
		3: LogosVariant3,
	},
	newsletter: {
		1: NewsletterVariant1,
		2: NewsletterVariant2,
		3: NewsletterVariant3,
	},
	process: {
		1: ProcessVariant1,
		2: ProcessVariant2,
		3: ProcessVariant3,
	},
	comparison: {
		1: ComparisonVariant1,
		2: ComparisonVariant2,
		3: ComparisonVariant3,
	},
	footer: {
		1: FooterVariant1,
		2: FooterVariant2,
		3: FooterVariant3,
	},
	spacer: {
		1: SpacerVariant1,
		2: SpacerVariant2,
		3: SpacerVariant3,
	},
};

// Helper to get a component variant
export const getComponentVariant = (
	type: ComponentType,
	variant: number
): React.FC<any> => {
	return (
		componentVariants[type]?.[variant] ||
		(() => (
			<div className="p-12 bg-red-500 text-white text-center">
				Component Not Found
			</div>
		))
	);
};
