import '../styles/globals.css';
import type { AppProps } from 'next/app';

import { Provider as UrqlProvider } from 'urql';
import { ChakraProvider } from '@chakra-ui/react';

import { serverSideCache } from '@src/services/ServerSideCache';
import { GithubClient } from '@src/services/GithubClient';
import { Header } from '@src/components/Header';
import { Footer } from '@src/components/Footer';
import { theme } from '@src/styles/theme';
import { Shell } from '@src/components/Shell';

function App({ Component, pageProps }: AppProps) {
  if (pageProps.urqlState) {
    serverSideCache.restoreData(pageProps.urqlState);
  }

  return (
    <UrqlProvider value={GithubClient}>
      <ChakraProvider theme={theme}>
        <Shell>
          <Component {...pageProps} />
        </Shell>
      </ChakraProvider>
    </UrqlProvider>
  );
}

export default App;
