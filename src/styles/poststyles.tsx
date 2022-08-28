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

  p,
  ul {
    margin: 1.5rem 0;
  }

  a {
    color: ${brandColors.yellow};

    &:hover {
      color: ${brandColors.orange};
      text-decoration: underline;
    }
  }

  ul {
    padding-left: 1.5rem;

    li {
      margin: 0.5rem 0;
    }
  }

  div.centralize,
  div.half-image {
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

  div.half-image {
    flex-wrap: wrap;
    gap: 1rem;

    img {
      border-radius: 0.5rem;
    }
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
