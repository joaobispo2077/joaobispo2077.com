import '../styles/globals.css';
import type { AppProps } from 'next/app';

import { Provider as UrqlProvider } from 'urql';
import { ChakraProvider } from '@chakra-ui/react';
import { Analytics as VercelAnalyticsProvider } from '@vercel/analytics/react';

import { serverSideCache } from '@src/services/ServerSideCache';
import { GithubClient } from '@src/services/GithubClient';
import { theme } from '@src/styles/theme';
import { Shell } from '@src/components/layouts/Shell';
import { Analytics } from '@src/components/Analytics';
import { ShellProvider } from '@src/providers/ShellProvider';
import { ContentManagementClient } from '@src/services/ContentManagementClient';

type CustomApp = {
  urqlState: Record<string, object>;
};

function App({ Component, pageProps }: AppProps<CustomApp>) {
  if (pageProps.urqlState) {
    serverSideCache.restoreData(pageProps.urqlState);
  }

  return (
    <>
      <Analytics />
      <VercelAnalyticsProvider />
      <UrqlProvider value={GithubClient}>
        <UrqlProvider value={ContentManagementClient}>
          <ChakraProvider theme={theme}>
            <ShellProvider>
              <Shell>
                <Component {...pageProps} />
              </Shell>
            </ShellProvider>
          </ChakraProvider>
        </UrqlProvider>
      </UrqlProvider>
    </>
  );
}

export default App;
