import '../styles/globals.css';
import type { AppProps } from 'next/app';
import MainLayout from '../layouts/MainLayout';
import { ThemeProvider as NextThemeProvider } from 'next-themes';
import { DefaultSeo } from 'next-seo';
import SEO from '../lib/seoConfig';
import { AccentProvider } from '../context/AccentContext';
import { BreadcrumbProvider } from '../components/BreadcrumbContext';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AccentProvider>
      <>
        <DefaultSeo {...SEO} />
        <NextThemeProvider attribute="class" defaultTheme='light'>
          <BreadcrumbProvider>
            <MainLayout>
              <Component {...pageProps} />
            </MainLayout>
          </BreadcrumbProvider>
        </NextThemeProvider>
      </>
    </AccentProvider>
  );
}