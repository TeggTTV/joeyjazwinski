import { sendGAEvent } from '@next/third-parties/google';

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
	sendGAEvent({
		event: 'user_signup',
		value: params,
	});
};

/**
 * 2. Blog Page Views
 * Triggered when a user views any individual blog post.
 */
export const trackBlogPostView = (params: BlogPostParams) => {
	sendGAEvent({
		event: 'view_blog_post',
		value: params,
	});
};

/**
 * 3. About Me Page Views
 * Triggered when a user visits the About Me page.
 */
export const trackAboutMeView = () => {
	sendGAEvent({
		event: 'view_about_me',
	});
};

/**
 * 4. Tool Page Views (Dynamic)
 * Triggered when a user views a specific tool on the site.
 */
export const trackToolView = (params: ToolParams) => {
	sendGAEvent({
		event: 'view_tool',
		value: params,
	});
};

/**
 * 5. Homepage View
 * Triggered when a user visits the root landing page.
 */
export const trackHomeView = () => {
	sendGAEvent({
		event: 'view_home',
	});
};

/**
 * 6. Projects Directory View
 * Triggered when a user visits the Projects showcase.
 */
export const trackProjectsView = () => {
	sendGAEvent({
		event: 'view_projects',
	});
};

/**
 * 7. Developer Tools Directory View
 * Triggered when a user visits the Developer Tools hub.
 */
export const trackToolsDirectoryView = (category?: string) => {
	sendGAEvent({
		event: 'view_tools_directory',
		value: { category: category || 'All' },
	});
};

/**
 * 8. Developer Blog Directory View
 * Triggered when a user visits the Developer Blog index.
 */
export const trackBlogDirectoryView = () => {
	sendGAEvent({
		event: 'view_blog_directory',
	});
};

/**
 * 9. Patch Notes View
 * Triggered when a user views the Patch Notes / Changelog page.
 */
export const trackPatchNotesView = () => {
	sendGAEvent({
		event: 'view_patch_notes',
	});
};

/**
 * 10. Privacy Policy View
 * Triggered when a user visits the Privacy Policy page.
 */
export const trackPrivacyPolicyView = () => {
	sendGAEvent({
		event: 'view_privacy_policy',
	});
};

/**
 * 11. Terms & Conditions View
 * Triggered when a user visits the Terms and Conditions page.
 */
export const trackTermsView = () => {
	sendGAEvent({
		event: 'view_terms',
	});
};

/**
 * 12. Contact Page View
 * Triggered when a user visits the Contact page.
 */
export const trackContactView = () => {
	sendGAEvent({
		event: 'view_contact',
	});
};
