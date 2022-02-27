import type { GetStaticProps, NextPage } from 'next';

import { useState } from 'react';

import Head from 'next/head';
import { GET_REPOSITORIES } from '@src/graphql/queries/githubQueries';

import { useTranslation } from '@src/hooks/useTranslation';
import styles from '@src/styles/Home.module.css';
import { GithubApolloClient } from '@src/services/GithubClient';
import { GetRepositoriesResponsePayload } from '@src/interfaces/Repository';

type Repository = {
  id: string;
  name: string;
  description: string | null;
  url: string;
  createdAt: string;
  stars: number;
  programmingLanguages: {
    name: string;
    color: string;
  }[];
  topics: string[];
};

type HomeProps = {
  initialRepositories: Repository[];
  firstPaginateToken: string;
  repositoryTotalCount: number;
};

const Main: NextPage<HomeProps> = ({
  initialRepositories,
  firstPaginateToken,
  repositoryTotalCount,
}) => {
  const { homeTranslation } = useTranslation();
  const [repositories, setRepositories] = useState(initialRepositories);
  const [paginateToken, setPaginateToken] = useState(firstPaginateToken);

  return (
    <div className={styles.container}>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>João Bispo | Portfólio</title>
        <meta name="description" content="Crafting software for the web" />
        <link
          rel="shortcut icon"
          href="/assets/icons/lightning.png"
          type="image/png"
        />
        {/* https://www.flaticon.com/premium-icon/lightning_2985698?term=lightning&related_id=2985698# */}
      </Head>

      <main className={styles.main}>
        <h1>Quantidade total de repositórios: {repositoryTotalCount}</h1>
        {homeTranslation.helloWorld}
      </main>
    </div>
  );
};

export default Main;

export const getStaticProps: GetStaticProps = async () => {
  const { data, error } =
    await GithubApolloClient.query<GetRepositoriesResponsePayload>({
      query: GET_REPOSITORIES,
    });

  if (error) {
    console.error(error);

    return {
      props: {
        repositoryTotalCount: 0,
        repositories: [],
      },
    };
  }

  console.info('Github data', JSON.stringify(data, null, 2));

  const { totalCount: repositoryTotalCount, edges } = data.viewer.repositories;

  const firstEdge = edges[0];

  const repositories: Repository[] = edges.map(({ node }) => ({
    id: node.id,
    name: node.name,
    description: node.description,
    url: node.url,
    createdAt: node.createdAt,
    stars: node.stargazerCount,
    programmingLanguages: node.languages.nodes.map(({ name, color }) => ({
      name,
      color,
    })),
    topics: node.repositoryTopics.nodes.map(({ topic }) => topic.name),
  }));

  return {
    props: {
      repositoryTotalCount: repositoryTotalCount,
      initialRepositories: repositories,
      firstPaginateToken: firstEdge.cursor,
    },
  };
};
