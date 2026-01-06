/**
 * Feature flags configuration
 *
 * This file contains toggles for various features on the site.
 * Set to `false` to disable a feature, `true` to enable it.
 */

export const FEATURES = {
	/**
	 * Enable/disable blog functionality
	 * When disabled, blog links will be hidden from navigation and pages
	 */
	BLOGS_ENABLED: true,

	/**
	 * Enable/disable course functionality
	 * When disabled, course links will be hidden from navigation and pages
	 */
	COURSES_ENABLED: true,

	/**
	 * Enable/disable newsletter functionality
	 * When disabled, newsletter subscription forms will be hidden
	 */
	NEWSLETTER_ENABLED: true,
} as const;

export type FeatureFlags = typeof FEATURES;
