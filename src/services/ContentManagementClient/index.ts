import {
  cacheExchange,
  createClient,
  dedupExchange,
  fetchExchange,
} from 'urql';

import { config } from '@src/configs';

import { serverSideCache } from '../ServerSideCache';

const { contentManagement } = config.apis;

const ContentManagementClient = createClient({
  url: contentManagement.url,
  exchanges: [dedupExchange, cacheExchange, serverSideCache, fetchExchange],
});

export { ContentManagementClient };
