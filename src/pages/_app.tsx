import '../styles/globals.css';
import type { AppProps } from 'next/app';

import { Provider as UrqlProvider } from 'urql';

import { serverSideCache } from '@src/services/ServerSideCache';
import { GithubClient } from '@src/services/GithubClient';
import { Header } from '@src/components/Header';
import { Footer } from '@src/components/Footer';

function App({ Component, pageProps }: AppProps) {
  if (pageProps.urqlState) {
    serverSideCache.restoreData(pageProps.urqlState);
  }

  return (
    <UrqlProvider value={GithubClient}>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </UrqlProvider>
  );
}

export default App;
