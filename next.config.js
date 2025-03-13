/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  i18n: {
    locales: ['en-us', 'pt-br'],
    defaultLocale: 'en-us',
  },
  images: {
    domains: ['github.com'],
  },
  async headers() {
    return [
      {
        source: '/(.*)?', // handles all paths
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
        ],
      },
    ];
  },
};
