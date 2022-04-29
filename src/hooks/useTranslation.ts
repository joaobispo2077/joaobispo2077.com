import { useRouter } from 'next/router';

import { i18n, i18nTranslationsObject } from '../i18n';

export const useTranslation = (): i18nTranslationsObject => {
  const { locale } = useRouter();

  const pagesText = i18n[locale as keyof typeof i18n];
  return pagesText;
};
