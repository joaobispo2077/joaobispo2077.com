import Script from 'next/script';

import { apis } from '@src/configs';

export const Analytics = () => (
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
