import '../styles/globals.css';
import type { AppProps } from 'next/app';
import type { ReactElement, ReactNode } from 'react';
import { useEffect } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import MainLayout from '../layouts/MainLayout';
import { ThemeProvider as NextThemeProvider } from 'next-themes';
import { DefaultSeo } from 'next-seo';
// import SEO from '../lib/seoConfig';
import { AccentProvider } from '../context/AccentContext';
import { BreadcrumbProvider } from '../components/BreadcrumbContext';
import { ToastContainer } from 'react-toastify';
import { UIProvider } from '../context/UIContext';
import SEO from '@/lib/seoConfig';

type NextPageWithLayout = NextPage & {
	getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
	Component: NextPageWithLayout;
};

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
	useEffect(() => {
		if (window.location.pathname !== '/login') {
			const disableAutofill = () => {
				document.querySelectorAll('input').forEach((input) => {
					if (!input.hasAttribute('autocomplete')) {
						input.setAttribute('autocomplete', 'off');
					}
				});
			};
			disableAutofill();
			const observer = new MutationObserver(disableAutofill);
			observer.observe(document.body, { childList: true, subtree: true });
			return () => observer.disconnect();
		}
	}, []);

	// Use the layout defined at the page level, or default to MainLayout
	const getLayout =
		Component.getLayout ?? ((page) => <MainLayout>{page}</MainLayout>);

	return (
		<UIProvider>
			<AccentProvider>
				<>
					<head>
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
							content="MyWebSite"
						/>
						<link rel="manifest" href="/site.webmanifest" />
					</head>
					<DefaultSeo {...SEO} />
					<NextThemeProvider attribute="class" defaultTheme="dark">
						<BreadcrumbProvider>
							{getLayout(<Component {...pageProps} />)}
							<ToastContainer />
						</BreadcrumbProvider>
					</NextThemeProvider>
				</>
			</AccentProvider>
		</UIProvider>
	);
}
