const { GITHUB_ACCESS_TOKEN } = process.env;

export const auth = {
  github_api: {
    accessToken: String(GITHUB_ACCESS_TOKEN),
  },
};
