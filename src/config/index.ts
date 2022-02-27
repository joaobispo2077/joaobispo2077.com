const { GITHUB_ACCESS_TOKEN, NEXT_PUBLIC_GITHUB_URL } = process.env;

export const apis = {
  github: {
    accessToken: String(GITHUB_ACCESS_TOKEN),
    url: String(NEXT_PUBLIC_GITHUB_URL),
  },
};

const isServerSide = typeof window === 'undefined';
const isClientSide = !isServerSide;

const environment = {
  isServerSide,
  isClientSide,
};

export const config = { apis, environment };
