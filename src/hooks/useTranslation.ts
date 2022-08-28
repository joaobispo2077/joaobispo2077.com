import { useRouter } from 'next/router';

import { Locale } from '@src/generated/graphql.blog';
import { parseLocaleToGraphCmsLocale } from '@src/utils/parseLocale';

import { i18n, i18nTranslationsObject } from '../i18n';

type UseTranslationsReturn = i18nTranslationsObject & {
  locale: string;
  graphCmsLocale: Locale;
};

export const useTranslation = (): UseTranslationsReturn => {
  const { locale = 'en-us' } = useRouter();

  const graphCmsLocale = parseLocaleToGraphCmsLocale(locale);

  const pagesText = i18n[locale as keyof typeof i18n];
  return { ...pagesText, locale: locale, graphCmsLocale };
};
