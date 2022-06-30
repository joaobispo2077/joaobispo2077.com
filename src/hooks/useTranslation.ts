import { useRouter } from 'next/router';

import { i18n, i18nTranslationsObject } from '../i18n';

type UseTranslationsReturn = i18nTranslationsObject & {
  locale: string;
};
export const useTranslation = (): UseTranslationsReturn => {
  const { locale = 'en-us' } = useRouter();

  const pagesText = i18n[locale as keyof typeof i18n];
  return { ...pagesText, locale: locale };
};
