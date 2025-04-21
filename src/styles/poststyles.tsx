import styled from '@emotion/styled';

import { brandColors } from './theme';

const gray = '#e1e1e6';

export const Container = styled.div`
  max-width: 1120px;
  margin: 0 auto;
  padding: 0 2rem;
`;

export const Post = styled.div`
  max-width: 720px;
  margin: 5rem auto 0;

  h1 {
    font-size: 3.5rem;
    line-height: 3.5rem;
    font-weight: 900;
  }

  time {
    font-size: 1rem;
    color: ${gray};
    margin-top: 1.5rem;
  }
`;

export const Content = styled.main`
  margin-top: 2rem;
  line-height: 2rem;
  font-size: 1.125rem;
  color: ${gray};

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-weight: 800;
    color: ${brandColors.primary};
    margin: 2rem 0 1rem;

    cursor: pointer;
  }

  h1 {
    font-size: 2rem;

    &:before {
      content: '# ';
    }
  }

  h2 {
    font-size: 1.5rem;

    &:before {
      content: '## ';
    }
  }

  h3 {
    font-size: 1.25rem;

    &:before {
      content: '### ';
    }
  }

  p,
  ul {
    margin: 1.5rem 0;
  }

  a[target='_blank'] {
    color: ${brandColors.yellow};

    &:hover {
      color: ${brandColors.orange};
      text-decoration: underline;
    }

    &:after {
      content: ' ↗️';
    }
  }

  ul {
    padding-left: 1.5rem;

    li {
      margin: 0.5rem 0;
    }
  }

  div.centralize,
  div.half-image,
  div.half-block,
  div.vertical-block {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${brandColors.command};
    border-radius: 0.5rem;

    padding: 2rem;

    img {
      border-radius: 0.5rem;
    }
  }

  /* two elements losing resolution */
  div.half-image {
    flex-wrap: wrap;
    gap: 1rem;

    img {
      border-radius: 0.5rem;
    }
  }
  /* two elements without losing resolution */
  div.half-block {
    display: flex;
    justify-content: center;
    align-items: stretch;
    gap: 1rem;
    background-color: ${brandColors.command};
    border-radius: 0.5rem;
  }

  div.vertical-block {
    display: flex;
    justify-content: center;
    align-items: stretch;
    gap: 1rem;
    background-color: ${brandColors.command};
    border-radius: 0.5rem;
    img {
      max-width: 100%;
    }

    @media (min-width: 768px) {
      img {
        max-width: 50%;
      }
    }

    @media (min-width: 1600px) {
      img {
        max-width: 100%;
      }
    }
  }

  div.half-block img {
    flex: 1;
    width: 48%; /* Makes them fit side by side even on narrow screens */
    object-fit: cover;
    border-radius: 0.5rem;
    display: block;
  }

  pre {
    background-color: ${brandColors.command};
    border-radius: 0.5rem;
    padding: 0.5rem;
    color: ${gray};
    height: auto;
    -ms-word-break: break-all;
    word-break: break-all;

    white-space: pre-wrap;
    word-break: break-word;
    overflow-wrap: break-word;
  }

  code {
    background-color: ${brandColors.hover};
    border-radius: 0.5rem;
    padding: 0.5rem;
    color: ${brandColors.cyan};
    white-space: pre-wrap;
    word-break: break-word;
    overflow-wrap: break-word;
  }

  &.preview {
    background: linear-gradient(${gray}, transparent);
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;
