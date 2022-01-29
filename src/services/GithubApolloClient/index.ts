import { ApolloClient, InMemoryCache } from '@apollo/client';

import { auth } from '@src/config';

export const GithubApolloClient = new ApolloClient({
  uri: 'https://api.github.com/graphql',
  cache: new InMemoryCache(),
  credentials: 'include',
  headers: {
    authorization: `Bearer ${auth.github_api.accessToken}`,
  },
});
