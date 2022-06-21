import styled from '@emotion/styled';

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

  ul {
    padding-left: 1.5rem;

    li {
      margin: 0.5rem 0;
    }
  }

  &.preview {
    background: linear-gradient(${gray}, transparent);
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;
