import '../styles/globals.css';
import type { AppProps } from 'next/app';

import { ApolloProvider } from '@apollo/client';

import { GithubApolloClient } from '@src/services/GithubClient';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={GithubApolloClient}>
      {' '}
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp;
