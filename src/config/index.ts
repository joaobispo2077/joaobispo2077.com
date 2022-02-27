const { GITHUB_ACCESS_TOKEN, NEXT_PUBLIC_GITHUB_URL } = process.env;

export const auth = {
  github_api: {
    accessToken: String(GITHUB_ACCESS_TOKEN),
    url: String(NEXT_PUBLIC_GITHUB_URL),
  },
};
