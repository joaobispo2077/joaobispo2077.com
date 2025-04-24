import { FunctionComponent } from 'react';

import Head from 'next/head';

type SEOProps = {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  publishedTime?: string; // ISO 8601, ex. '2025-04-16T09:00:00-03:00'
  modifiedTime?: string; // ISO 8601, omit to default to now
  type?: 'article' | 'website';
  locale?: 'pt_BR' | 'en_US' | string;
  noIndex?: boolean;
};

export const SEO: FunctionComponent<SEOProps> = ({
  title,
  description = 'Crafting software for the web',
  image,
  url = '/',
  publishedTime,
  modifiedTime,
  type = 'website',
  locale = 'pt_BR',
  noIndex = false,
}) => {
  const baseTitle = 'João Bispo';
  const fullTitle = title ? `${title} | ${baseTitle}` : baseTitle;

  const baseUrl = 'https://joaobispo2077.com';
  const canonicalUrl = url ? `${baseUrl}/${url.replace(/^\/+/, '')}` : baseUrl;

  const pageUpdatedTime = modifiedTime || new Date().toISOString();
  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      <meta name="author" content="João Bispo" />
      <meta
        name="robots"
        content={noIndex ? 'noindex,nofollow' : 'index,follow'}
      />

      <link rel="canonical" href={canonicalUrl} />
      <meta property="og:site_name" content="João Bispo" />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content={locale} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" itemProp="image" content={image} />
      <meta property="og:image:secure_url" itemProp="image" content={image} />
      <meta property="og:image:type" content="image/jpeg" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:updated_time" content={pageUpdatedTime} />

      {publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}

      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={canonicalUrl} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />

      {/* Structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': type === 'article' ? 'BlogPosting' : 'WebSite',
            headline: fullTitle,
            description,
            image,
            url: canonicalUrl,
            datePublished: publishedTime,
            dateModified: pageUpdatedTime,
            author: { '@type': 'Person', name: 'João Bispo' },
          }),
        }}
      />
    </Head>
  );
};
