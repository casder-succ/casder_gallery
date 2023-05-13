import { FC } from 'react';
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import Head from 'next/head';
import { AppProps } from 'next/app';
import { Global, MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';

import queryClient from 'query-client';
import appTheme from 'theme';
import { globalStyles } from 'theme/globalStyles';

import PageConfig from './PageConfig';

const App: FC<AppProps> = ({ Component, pageProps }) => (
  <>
    <Head>
      <title>Casder gallery</title>
    </Head>

    <QueryClientProvider client={queryClient}>
      <MantineProvider
        theme={appTheme}
        withGlobalStyles
        withNormalizeCSS
      >
        <ModalsProvider>
          <Global styles={globalStyles} />

          <PageConfig>
            <Component {...pageProps} />
          </PageConfig>
        </ModalsProvider>
        <ReactQueryDevtools position="bottom-right" />
      </MantineProvider>
    </QueryClientProvider>
  </>
);

export default App;
