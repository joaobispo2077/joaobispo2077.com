import '../styles/globals.css';
import type { AppProps } from 'next/app';

import { Provider as UrqlProvider } from 'urql';
import { ChakraProvider } from '@chakra-ui/react';

import { serverSideCache } from '@src/services/ServerSideCache';
import { GithubClient } from '@src/services/GithubClient';
import { theme } from '@src/styles/theme';
import { Shell } from '@src/components/layouts/Shell';
import { Analytics } from '@src/components/Analytics';
import { ShellProvider } from '@src/providers/ShellProvider';

function App({ Component, pageProps }: AppProps) {
  if (pageProps.urqlState) {
    serverSideCache.restoreData(pageProps.urqlState);
  }

  return (
    <>
      <Analytics />
      <UrqlProvider value={GithubClient}>
        <ChakraProvider theme={theme}>
          <ShellProvider>
            <Shell>
              <Component {...pageProps} />
            </Shell>
          </ShellProvider>
        </ChakraProvider>
      </UrqlProvider>
    </>
  );
}

export default App;
