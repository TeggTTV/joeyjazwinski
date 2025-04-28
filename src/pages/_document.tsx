import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta name="theme-color" content="#F9FAFB" media="(prefers-color-scheme: light)" />
          <meta name="theme-color" content="#0F172A" media="(prefers-color-scheme: dark)" />
        </Head>
        <body className="bg-background text-text">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;