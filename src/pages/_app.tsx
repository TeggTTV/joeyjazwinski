import '../styles/globals.css';
import 'highlight.js/styles/github-dark.css';
import type { AppProps } from 'next/app';
import type { ReactElement, ReactNode } from 'react';
import { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Script from 'next/script';
import { GoogleAnalytics } from '@next/third-parties/google';
import { hasCookieConsent, COOKIE_CONSENT_KEY } from '@/lib/analytics';
import MainLayout from '../layouts/MainLayout';
import { ThemeProvider as NextThemeProvider, useTheme } from 'next-themes';
import { DefaultSeo } from 'next-seo';
import { AccentProvider } from '../context/AccentContext';
import { BreadcrumbProvider } from '../components/BreadcrumbContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UIProvider } from '../context/UIContext';
import { useRouter } from 'next/router';
import SEO from '@/lib/seoConfig';
import CookieConsentBanner from '../components/CookieConsentBanner';
import BackToTop from '../components/BackToTop';
import { PointsProvider } from '../context/PointsContext';
import GuestPointsNotification from '../components/points/GuestPointsNotification';

type NextPageWithLayout = NextPage & {
	getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
	Component: NextPageWithLayout;
};

function ThemeAwareToastContainer() {
	const { resolvedTheme } = useTheme();
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) return null;

	return (
		<ToastContainer
			theme={resolvedTheme === 'dark' ? 'dark' : 'light'}
			position="top-right"
			autoClose={3000}
			hideProgressBar={false}
			newestOnTop={false}
			closeOnClick
			rtl={false}
			pauseOnFocusLoss
			draggable
			pauseOnHover
		/>
	);
}

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
	const router = useRouter();
	const [consentAccepted, setConsentAccepted] = useState(false);

	useEffect(() => {
		setConsentAccepted(hasCookieConsent());

		const handleConsentChange = () => {
			setConsentAccepted(hasCookieConsent());
		};

		window.addEventListener('cookie_consent_updated', handleConsentChange);
		window.addEventListener('storage', handleConsentChange);
		return () => {
			window.removeEventListener(
				'cookie_consent_updated',
				handleConsentChange,
			);
			window.removeEventListener('storage', handleConsentChange);
		};
	}, []);

	useEffect(() => {
		if (router.pathname !== '/login') {
			const inputs = document.querySelectorAll('input:not([autocomplete])');
			inputs.forEach((input) => input.setAttribute('autocomplete', 'off'));
		}
	}, [router.pathname]);

	// Use the layout defined at the page level, or default to MainLayout
	const getLayout =
		Component.getLayout ?? ((page) => <MainLayout>{page}</MainLayout>);

	// Only Homepage, Blogs, Tools, Patch Notes, Projects, About me, and Legal pages should be indexed
	const isAllowedPath =
		router.pathname === '/' ||
		router.pathname === '/about' ||
		router.pathname === '/privacy' ||
		router.pathname === '/terms' ||
		router.pathname === '/patch-notes' ||
		router.pathname === '/projects' ||
		router.pathname.startsWith('/developer-blog') ||
		router.pathname.startsWith('/developer-tools');

	const siteUrl = 'https://joeyjazwinski.com';
	const cleanPath =
		router.pathname === '/' ? '' : router.asPath.split('?')[0];
	const currentUrl = `${siteUrl}${cleanPath}`;

	const dynamicSEO = {
		...SEO,
		canonical: currentUrl,
		openGraph: {
			...SEO.openGraph,
			url: currentUrl,
		},
		noindex: !isAllowedPath,
		nofollow: !isAllowedPath,
	};

	return (
		<UIProvider>
			<AccentProvider>
				<>
					<Head>
						<meta
							name="viewport"
							content="width=device-width, initial-scale=1, viewport-fit=cover"
						/>
						<link
							rel="icon"
							type="image/png"
							href="/favicon-96x96.png"
							sizes="96x96"
						/>
						<link
							rel="icon"
							type="image/svg+xml"
							href="/favicon.svg"
						/>
						<link rel="shortcut icon" href="/favicon.ico" />
						<link
							rel="apple-touch-icon"
							sizes="180x180"
							href="/apple-touch-icon.png"
						/>
						<meta
							name="apple-mobile-web-app-title"
							content="Joey Jazwinski"
						/>
						<link rel="manifest" href="/site.webmanifest" />
					</Head>
					{process.env.NEXT_PUBLIC_GA_ID && (
						<GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
					)}
					{consentAccepted && (
						<Script
							src="https://analytics.ahrefs.com/analytics.js"
							data-key="jTkBpMV+Z1KlJS0zzubvLA"
							strategy="lazyOnload"
						/>
					)}
					<DefaultSeo {...dynamicSEO} />
					<NextThemeProvider attribute="class" defaultTheme="light">
						<PointsProvider>
							<BreadcrumbProvider>
								{getLayout(<Component {...pageProps} />)}
								<CookieConsentBanner />
								<BackToTop />
								<ThemeAwareToastContainer />
								<GuestPointsNotification />
							</BreadcrumbProvider>
						</PointsProvider>
					</NextThemeProvider>
				</>
			</AccentProvider>
		</UIProvider>
	);
}
