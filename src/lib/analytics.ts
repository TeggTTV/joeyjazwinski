import { sendGAEvent } from '@next/third-parties/google';

export const COOKIE_CONSENT_KEY = 'jj_cookie_consent';

/**
 * Checks whether the user has explicitly accepted cookies.
 */
export const hasCookieConsent = (): boolean => {
	if (typeof window === 'undefined') return false;
	try {
		return localStorage.getItem(COOKIE_CONSENT_KEY) === 'accepted';
	} catch (e) {
		return false;
	}
};

/**
 * Safe wrapper for sendGAEvent that ensures analytics events are only sent if cookies were accepted.
 */
const safeSendGAEvent = (eventData: Record<string, any>) => {
	if (hasCookieConsent()) {
		sendGAEvent(eventData);
	}
};

export type SignUpParams = {
	method: 'email' | 'google' | 'github' | string;
	form_location: 'hero' | 'footer' | 'modal' | 'create-account' | string;
};

export type BlogPostParams = {
	post_title: string;
	category: string;
};

export type ToolParams = {
	tool_name: string;
	tool_category: string;
};

/**
 * 1. Sign-Up Event
 * Triggered when a user completes a signup.
 */
export const trackSignUp = (params: SignUpParams) => {
	safeSendGAEvent({
		event: 'user_signup',
		value: params,
	});
};

/**
 * 2. Blog Page Views
 * Triggered when a user views any individual blog post.
 */
export const trackBlogPostView = (params: BlogPostParams) => {
	safeSendGAEvent({
		event: 'view_blog_post',
		value: params,
	});
};

/**
 * 3. About Me Page Views
 * Triggered when a user visits the About Me page.
 */
export const trackAboutMeView = () => {
	safeSendGAEvent({
		event: 'view_about_me',
	});
};

/**
 * 4. Tool Page Views (Dynamic)
 * Triggered when a user views a specific tool on the site.
 */
export const trackToolView = (params: ToolParams) => {
	safeSendGAEvent({
		event: 'view_tool',
		value: params,
	});
};

/**
 * 5. Homepage View
 * Triggered when a user visits the root landing page.
 */
export const trackHomeView = () => {
	safeSendGAEvent({
		event: 'view_home',
	});
};

/**
 * 6. Projects Directory View
 * Triggered when a user visits the Projects showcase.
 */
export const trackProjectsView = () => {
	safeSendGAEvent({
		event: 'view_projects',
	});
};

/**
 * 7. Developer Tools Directory View
 * Triggered when a user visits the Developer Tools hub.
 */
export const trackToolsDirectoryView = (category?: string) => {
	safeSendGAEvent({
		event: 'view_tools_directory',
		value: { category: category || 'All' },
	});
};

/**
 * 8. Developer Blog Directory View
 * Triggered when a user visits the Developer Blog index.
 */
export const trackBlogDirectoryView = () => {
	safeSendGAEvent({
		event: 'view_blog_directory',
	});
};

/**
 * 9. Patch Notes View
 * Triggered when a user views the Patch Notes / Changelog page.
 */
export const trackPatchNotesView = () => {
	safeSendGAEvent({
		event: 'view_patch_notes',
	});
};

/**
 * 10. Privacy Policy View
 * Triggered when a user visits the Privacy Policy page.
 */
export const trackPrivacyPolicyView = () => {
	safeSendGAEvent({
		event: 'view_privacy_policy',
	});
};

/**
 * 11. Terms & Conditions View
 * Triggered when a user visits the Terms and Conditions page.
 */
export const trackTermsView = () => {
	safeSendGAEvent({
		event: 'view_terms',
	});
};

/**
 * 12. Contact Page View
 * Triggered when a user visits the Contact page.
 */
export const trackContactView = () => {
	safeSendGAEvent({
		event: 'view_contact',
	});
};
