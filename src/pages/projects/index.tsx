import type { GetStaticProps, NextPage } from 'next';

import { Flex, Heading } from '@chakra-ui/react';

import { useTranslation } from '@src/hooks/useTranslation';
import { GithubClient } from '@src/services/GithubClient';
import {
  RepositoriesDocument,
  useRepositoriesQuery,
} from '@src/generated/graphql.github';
import { serverSideCache } from '@src/services/ServerSideCache';
import { parseRepositories } from '@src/utils/parseRepositories';
import { SEO } from '@src/components/SEO';

// type HomeProps = {
//   initialRepositories: Repository[];
//   firstPaginateToken: string;
//   repositoryTotalCount: number;
// };

const ProjectsPage: NextPage = () => {
  const { homeTranslation } = useTranslation();
  // const [repositories, setRepositories] = useState(initialRepositories);
  // const [paginateToken, setPaginateToken] = useState(firstPaginateToken);
  const [{ data: repositories }] = useRepositoriesQuery({});
  const { repositoryTotalCount = 0 } = parseRepositories(repositories);

  return (
    <Flex
      as="main"
      background="brand.background"
      width="100%"
      minHeight="calc(100vh - 8rem)"
      flexDirection="column"
      paddingTop={[4, 16]}
      paddingX={'1rem'}
    >
      <SEO title={'Projects'} description={'Projects'} url="/projects" />

      <Flex as="section" flexDirection="column" marginTop="1.5rem">
        <Heading>
          Quantidade total de repositórios: {repositoryTotalCount}
        </Heading>
        {homeTranslation.helloWorld}
      </Flex>
    </Flex>
  );
};

export default ProjectsPage;

export const getStaticProps: GetStaticProps = async () => {
  await GithubClient.query(RepositoriesDocument, {}).toPromise();

  return {
    props: {
      urqlState: serverSideCache.extractData(),
    },
  };
};
