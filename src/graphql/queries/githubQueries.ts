import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
  query {
    viewer {
      login
      name
      repositories(
        last: 10
        privacy: PUBLIC
        orderBy: { field: STARGAZERS, direction: ASC }
      ) {
        totalCount
        edges {
          cursor
          node {
            id
            name
            url
            description
            stargazerCount
            createdAt
            repositoryTopics(last: 6) {
              nodes {
                topic {
                  name
                }
              }
            }
            languages(orderBy: { field: SIZE, direction: ASC }, first: 5) {
              nodes {
                name
                color
              }
            }
          }
        }
      }
    }
  }
`;

export const PAGINATE_REPOSITORIES = gql`
  query ($cursor: String) {
    viewer {
      login
      name
      repositories(
        last: 10
        privacy: PUBLIC
        orderBy: { field: STARGAZERS, direction: ASC }
        after: $cursor
      ) {
        totalCount
        edges {
          cursor
          node {
            id
            name
            url
            description
            stargazerCount
            createdAt
            repositoryTopics(last: 6) {
              nodes {
                topic {
                  name
                }
              }
            }
            languages(orderBy: { field: SIZE, direction: ASC }, first: 5) {
              nodes {
                name
                color
              }
            }
          }
        }
      }
    }
  }
`;
