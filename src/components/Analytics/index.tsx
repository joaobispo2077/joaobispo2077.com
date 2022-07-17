import { useEffect } from 'react';

import Script from 'next/script';
import { useRouter } from 'next/router';

import { apis } from '@src/configs';
import { Gtag } from '@src/services/Gtag';

export const Analytics = () => {
  console.log('Analytics');
  console.log('apis.analytics.trackingId', apis.analytics.trackingId);
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      Gtag.pageview(url);
    };

    router.events.on('routeChangeComplete', handleRouteChange);
    router.events.on('hashChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
      router.events.off('hashChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${apis.analytics.trackingId}`}
      />
      <Script
        id="gtag"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${apis.analytics.trackingId}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
    </>
  );
};
