import { Locale } from '@src/generated/graphql.blog';
import { i18n } from '@src/i18n';

export const graphCmsLocalesByi18n: Record<keyof typeof i18n, Locale> = {
  'en-us': Locale.En,
  'pt-br': Locale.PtBr,
};

export const parseLocaleToGraphCmsLocale = (
  locale: keyof typeof i18n = 'en-us',
): Locale => {
  return graphCmsLocalesByi18n[locale];
};
