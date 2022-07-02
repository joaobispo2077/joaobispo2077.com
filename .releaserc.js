module.exports = {
  "branches": ["release"],
  "plugins": [
    "@semantic-release/commit-analyzer",
    ["@semantic-release/release-notes-generator", {
      "preset": "angular",
      "parserOpts": {
        "noteKeywords": ["BREAKING CHANGE", "BREAKING CHANGES", "BREAKING"]
      },
      "writerOpts": {
        "commitsSort": ["subject", "scope"]
      }
    }],
    "@semantic-release/changelog",
    "@semantic-release/github",
    ["@semantic-release/npm", {
      "npmPublish": false
    }],
    {
      "path": "@semantic-release/git",
      "assets": ["package.json", "package-lock.json", "CHANGELOG.md"],
      "message": "chore(release): ${nextRelease.version} \n\n${nextRelease.notes}"
    }
  ],
};
