# Technical Debt Notes

## Post Content Styling Split

- We split post styling into `src/styles/poststyles.tsx` (legacy/base rules) and `src/styles/postsMarkdownStyles.tsx` (markdown-specific rules), and currently import both in the same `Content` component.
- This is intentionally temporary to validate behavior without introducing breaking changes.
- If style regressions or selector conflicts appear, split rendering into two components:
  - one component for legacy HTML posts
  - one component for markdown-based posts
- At that point, scope each component to its own style file instead of composing both in one wrapper.
