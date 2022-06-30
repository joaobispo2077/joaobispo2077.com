export const apis = {
  github: {
    accessToken: String(process.env.GITHUB_ACCESS_TOKEN),
    url: String(process.env.NEXT_PUBLIC_GITHUB_URL),
  },
  contentManagement: {
    url: String(process.env.NEXT_PUBLIC_BLOG_URL),
  },
};

const isServerSide = typeof window === 'undefined';
const isClientSide = !isServerSide;

const environment = {
  isServerSide,
  isClientSide,
};

export const config = { apis, environment };
