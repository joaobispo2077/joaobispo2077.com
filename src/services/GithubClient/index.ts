import {
  cacheExchange,
  createClient,
  dedupExchange,
  fetchExchange,
} from 'urql';

import { config } from '@src/config';

import { serverSideCache } from '../ServerSideCache';

const { github } = config.apis;

const GithubClient = createClient({
  url: github.url,
  fetchOptions: {
    credentials: 'include',
    headers: {
      Authorization: `Bearer ${github.accessToken}`,
    },
  },
  exchanges: [dedupExchange, cacheExchange, serverSideCache, fetchExchange],
});

export { GithubClient };
