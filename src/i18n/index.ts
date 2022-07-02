import { Locale } from '@src/generated/graphql.blog';

import * as enUS from './enUS';
import * as ptBR from './ptBR';

export type i18nTranslation = Record<string, string>;

export type i18nTranslationsObject = Record<keyof typeof ptBR, i18nTranslation>;

export type I18n = Record<string, i18nTranslationsObject>;

export const i18n: I18n = {
  'en-us': enUS,
  'pt-br': ptBR,
};
