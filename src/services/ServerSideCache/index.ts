import { ssrExchange } from 'urql';

import { config } from '@src/config';

const { isClientSide } = config.environment;

export const serverSideCache = ssrExchange({ isClient: isClientSide });
