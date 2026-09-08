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
 * Triggered when a user views any blog post.
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
