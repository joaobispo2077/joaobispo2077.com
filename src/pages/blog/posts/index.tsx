import type { GetStaticProps, NextPage } from 'next';

import Head from 'next/head';

import { useTranslation } from '@src/hooks/useTranslation';
import styles from '@src/styles/Home.module.css';
import { GithubClient } from '@src/services/GithubClient';
import {
  RepositoriesDocument,
  useRepositoriesQuery,
} from '@src/generated/graphql.github';
import { serverSideCache } from '@src/services/ServerSideCache';
import { parseRepositories } from '@src/utils/parseRepositories';

// type HomeProps = {
//   initialRepositories: Repository[];
//   firstPaginateToken: string;
//   repositoryTotalCount: number;
// };

const PostsPage: NextPage = () => {
  const { homeTranslation } = useTranslation();
  // const [repositories, setRepositories] = useState(initialRepositories);
  // const [paginateToken, setPaginateToken] = useState(firstPaginateToken);
  const [{ data: repositories }] = useRepositoriesQuery({});
  const { repositoryTotalCount = 0 } = parseRepositories(repositories);

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

export default PostsPage;

export const getStaticProps: GetStaticProps = async () => {
  await GithubClient.query(RepositoriesDocument, {}).toPromise();

  return {
    props: {
      urqlState: serverSideCache.extractData(),
    },
  };
};
