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
`;

