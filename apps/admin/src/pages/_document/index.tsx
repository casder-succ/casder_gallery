import { createGetInitialProps } from '@mantine/next';
import { Html, Head, Main, NextScript } from 'next/document';

const getInitialProps = createGetInitialProps();

const Document = () => (
  <Html>
    <Head>
      <link type="image/png" sizes="96x96" rel="icon" href="/favicon.png?reset=1" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap" rel="stylesheet" />
      {/* eslint-disable-next-line @next/next/no-sync-scripts */}
      <script src="https://cdnjs.cloudflare.com/ajax/libs/openseadragon/4.0.0/openseadragon.min.js" />
    </Head>
    <body>
      <Main />
      <NextScript />
    </body>
  </Html>
);

Document.getInitialProps = getInitialProps;

export default Document;
