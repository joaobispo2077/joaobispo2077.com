import { RepositoriesQuery } from '@src/generated/graphql.github';

// type Repository = {
//   id: string;
//   name: string;
//   description: string | null;
//   url: string;
//   createdAt: string;
//   stars: number;
//   programmingLanguages: {
//     name: string;
//     color: string;
//   }[];
//   topics: string[];
// };

export const parseRepositories = (data: RepositoriesQuery | undefined) => {
  if (!data) {
    return {};
  }

  const { totalCount: repositoryTotalCount, edges } = data.viewer.repositories;

  const firstEdge = edges ? edges[0] : null;

  if (!Array.isArray(edges) || !firstEdge) {
    return {};
  }

  const allReposHasNode = edges.every((edge) => edge?.node);

  if (!allReposHasNode) {
    return {};
  }

  const repositories = edges.map((edge) => ({
    id: edge?.node?.id,
    name: edge?.node?.name,
    description: edge?.node?.description,
    url: edge?.node?.url,
    createdAt: edge?.node?.createdAt,
    stars: edge?.node?.stargazerCount,
    programmingLanguages: edge?.node?.languages?.nodes?.map((language) => ({
      name: language?.name,
      color: language?.color,
    })),
    topics: edge?.node?.repositoryTopics?.nodes?.map(
      (repositoryTopic) => repositoryTopic?.topic.name,
    ),
  }));

  return {
    repositoryTotalCount: repositoryTotalCount,
    initialRepositories: repositories,
    firstPaginateToken: firstEdge?.cursor,
  };
};
