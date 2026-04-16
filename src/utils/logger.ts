import pino from 'pino';

const isServer = typeof window === 'undefined';
const isProduction = process.env.NODE_ENV === 'production';

const defaultLevel = isProduction ? 'info' : 'debug';
const level = process.env.LOG_LEVEL ?? defaultLevel;

const loggerName = 'joaobispo2077.com';

const transport =
  isServer && !isProduction
    ? pino.transport({
        target: 'pino-pretty',
        options: {
          colorize: true,
          translateTime: 'SYS:standard',
          singleLine: true,
          ignore: 'pid,hostname',
        },
      })
    : undefined;

export const logger = pino(
  {
    name: loggerName,
    level,
    browser: isServer
      ? undefined
      : {
          asObject: true,
        },
  },
  transport,
);
