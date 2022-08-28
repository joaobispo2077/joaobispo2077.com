import { ssrExchange } from 'urql';

import { config } from '@src/configs';

const { isClientSide } = config.environment;

export const serverSideCache = ssrExchange({ isClient: isClientSide });
