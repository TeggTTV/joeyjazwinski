import '../styles/globals.css';
import type { AppProps } from 'next/app';
import type { ReactElement, ReactNode } from 'react';
import type { NextPage } from 'next';
import MainLayout from '../layouts/MainLayout';
import { ThemeProvider as NextThemeProvider } from 'next-themes';
// import { DefaultSeo } from 'next-seo';
// import SEO from '../lib/seoConfig';
import { AccentProvider } from '../context/AccentContext';
import { BreadcrumbProvider } from '../components/BreadcrumbContext';
import { ToastContainer } from 'react-toastify';
import { UIProvider } from '../context/UIContext';

type NextPageWithLayout = NextPage & {
	getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
	Component: NextPageWithLayout;
};

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
	// Use the layout defined at the page level, or default to MainLayout
	const getLayout =
		Component.getLayout ?? ((page) => <MainLayout>{page}</MainLayout>);

	return (
		<UIProvider>
			<AccentProvider>
				<>
					<NextThemeProvider attribute="class" defaultTheme="light">
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
