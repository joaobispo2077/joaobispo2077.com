import type { GetStaticProps, NextPage } from 'next';

import { Flex, Heading, Text } from '@chakra-ui/react';

import { useTranslation } from '@src/hooks/useTranslation';
import styles from '@src/styles/Home.module.css';
import { GithubClient } from '@src/services/GithubClient';
import {
  RepositoriesDocument,
  useRepositoriesQuery,
} from '@src/generated/graphql.github';
import { serverSideCache } from '@src/services/ServerSideCache';
import { parseRepositories } from '@src/utils/parseRepositories';
import { theme } from '@src/styles/theme';
import { generateTextLinearGradient } from '@src/utils/generateGradient';
import { SEO } from '@src/components/SEO';

// type HomeProps = {
//   initialRepositories: Repository[];
//   firstPaginateToken: string;
//   repositoryTotalCount: number;
// };

const BlogPage: NextPage = () => {
  const { blogTranslation } = useTranslation();
  // const [repositories, setRepositories] = useState(initialRepositories);
  // const [paginateToken, setPaginateToken] = useState(firstPaginateToken);
  const [{ data: repositories }] = useRepositoriesQuery({});
  const { repositoryTotalCount = 0 } = parseRepositories(repositories);

  return (
    <Flex
      as="main"
      background="brand.background"
      width="100%"
      height="calc(100vh - 8rem)"
      flexDirection="column"
      paddingTop={[4, 16]}
      paddingX={'1rem'}
    >
      <SEO title="Blog" description="Blog posts about software development" />
      <Heading
        as="h1"
        fontSize="5xl"
        fontWeight="bold"
        color="brand.primary"
        {...generateTextLinearGradient('cyan', 'red')}
      >
        {blogTranslation.title}
      </Heading>
      <Text color="brand.secondary" fontSize="xl" marginTop="1.5rem">
        {blogTranslation.description}
      </Text>
    </Flex>
  );
};

export default BlogPage;

export const getStaticProps: GetStaticProps = async () => {
  await GithubClient.query(RepositoriesDocument, {}).toPromise();

  return {
    props: {
      urqlState: serverSideCache.extractData(),
    },
  };
};
