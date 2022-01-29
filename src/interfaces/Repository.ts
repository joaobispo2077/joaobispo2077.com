export interface GetRepositoriesResponsePayload {
  viewer: Viewer;
}

export interface Viewer {
  __typename: string;
  repositories: RepositoriesPayload;
}

export interface RepositoriesPayload {
  __typename: string;
  totalCount: number;
  edges: Edge[];
}

export interface Edge {
  __typename: 'RepositoryEdge';
  cursor: string;
  node: GithubRepository;
}

export interface GithubRepository {
  __typename: 'Repository';
  id: string;
  name: string;
  url: string;
  description: null | string;
  stargazerCount: number;
  createdAt: string;
  repositoryTopics: RepositoryTopics;
  languages: Languages;
}

export interface Languages {
  __typename: 'LanguageConnection';
  nodes: ProgrammingLanguage[];
}

export interface ProgrammingLanguage {
  __typename: 'Language';
  name: string;
  color: string;
}

export interface RepositoryTopics {
  __typename: 'RepositoryTopicConnection';
  nodes: RepositoryTopicsNode[];
}

export interface RepositoryTopicsNode {
  __typename: 'RepositoryTopic';
  topic: Topic;
}

export interface Topic {
  __typename: 'Topic';
  name: string;
}
