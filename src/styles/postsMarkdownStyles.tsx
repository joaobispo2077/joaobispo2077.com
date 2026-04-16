import { css } from '@emotion/react';

import { brandColors } from './theme';

export const postsMarkdownStyles = css`
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    cursor: pointer;

    a[href^='#'] {
      color: inherit;
      text-decoration: none;
      cursor: pointer;
      transition: color 0.2s ease, text-decoration-color 0.2s ease;
    }

    a[href^='#']:hover {
      text-decoration: underline;
      text-decoration-thickness: 2px;
      text-underline-offset: 3px;
      color: ${brandColors.secondary};
    }
  }

  h1:before {
    content: '# ';
  }

  h2:before {
    content: '## ';
  }

  h3:before {
    content: '### ';
  }

  a.reference-link {
    color: ${brandColors.secondary};
    text-decoration: none;
    cursor: pointer;
    transition: color 0.2s ease, text-decoration-color 0.2s ease;
  }

  a.reference-link:hover {
    color: ${brandColors.yellow};
    text-decoration: underline;
    text-underline-offset: 2px;
  }

  .markdown-table-wrapper {
    position: relative;
    overflow-x: auto;
    max-width: 100%;
    margin: 1.5rem 0;
    border: 1px solid ${brandColors.hover};
    border-radius: 0.5rem;
    -webkit-overflow-scrolling: touch;
    background: linear-gradient(
      to right,
      transparent 0%,
      transparent 92%,
      rgba(255, 255, 255, 0.08) 100%
    );
  }

  .markdown-table-wrapper::after {
    content: 'Scroll horizontally →';
    position: absolute;
    right: 0.5rem;
    bottom: 0.25rem;
    font-size: 0.75rem;
    color: ${brandColors.secondary};
    background: rgba(0, 0, 0, 0.55);
    padding: 0.1rem 0.4rem;
    border-radius: 0.25rem;
    pointer-events: none;
    opacity: 0;
    transform: translateY(2px);
    transition: opacity 0.2s ease, transform 0.2s ease;
  }

  .markdown-table-wrapper.is-scrollable.is-at-start::after {
    opacity: 1;
    transform: translateY(0);
  }

  .markdown-table-wrapper table {
    width: max-content;
    min-width: 100%;
    margin: 0;
    border: 0;
  }

  .markdown-table-wrapper th,
  .markdown-table-wrapper td {
    white-space: normal;
  }
`;
