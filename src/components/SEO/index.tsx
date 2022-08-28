import { FunctionComponent } from 'react';

import Head from 'next/head';

type SEOProps = {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  time?: string;
};

export const SEO: FunctionComponent<SEOProps> = ({
  title,
  description = 'Crafting software for the web',
  image,
  url,
  time,
}) => {
  const baseTitle = 'João Bispo';
  const fullTitle = title ? `${title} | ${baseTitle}` : baseTitle;

  const baseUrl = 'https://joaobispo2077.com';
  const fullUrl = url ? `${baseUrl}${url}` : baseUrl;

  const pageUpdatedTime = time ? `${time}` : new Date().getTime().toString();

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      <meta name="author" content="João Bispo" />

      <meta property="og:site_name" content="João Bispo" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:updated_time" content={pageUpdatedTime} />
      <meta property="og:image" itemProp="image" content={image} />
      <meta property="og:image:secure_url" itemProp="image" content={image} />
      <meta property="og:type" content="website" />
      <meta property="og:image:type" content="image/jpeg" />
      <meta property="og:image:width" content="300" />
      <meta property="og:image:height" content="300" />

      <meta property="twitter:card" content={image} />
      <meta property="twitter:url" content={fullUrl} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
    </Head>
  );
};
