import '../styles/globals.css';
import type { AppProps } from 'next/app';

import { FunctionComponent, ReactNode } from 'react';

import { Provider as UrqlProvider } from 'urql';
import { ChakraProvider } from '@chakra-ui/react';

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

type MountProvider = {
  component: any | (({ children }: { children: ReactNode }) => JSX.Element);
  props?: Record<string, any>;
};

function App({ Component, pageProps }: AppProps<CustomApp>) {
  if (pageProps.urqlState) {
    serverSideCache.restoreData(pageProps.urqlState);
  }

  const providers: MountProvider[] = [
    {
      component: ShellProvider,
    },
    {
      component: ChakraProvider,
      props: {
        theme,
      },
    },
    {
      component: UrqlProvider,
      props: {
        value: ContentManagementClient,
      },
    },
    {
      component: UrqlProvider,
      props: {
        value: GithubClient,
      },
    },
  ];

  const mountProviders = (
    components: MountProvider[],
    rootChildren: ReactNode,
  ) => {
    const makeProvider = (
      children: ReactNode,
      Component: MountProvider['component'],
      props?: Record<string, any>,
    ) => {
      return <Component {...props}>{children}</Component>;
    };

    return components.reduce((children, { component, props }) => {
      return makeProvider(children, component, props);
    }, rootChildren);
  };

  return (
    <>
      <Analytics />
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
