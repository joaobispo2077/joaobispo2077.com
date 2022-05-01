import type { GetStaticProps, NextPage } from 'next';

import { Flex, Heading, Text, VStack } from '@chakra-ui/react';

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
  const posts = [
    {
      id: '1',
      title:
        'Customizando o terminal do jeito que eu gosto: Terminal no MacOS com Oh My Zsh, Powerlevel10k, iTerm2, Dracula, Plugins e mais',
      description:
        'Eu estou usando uma máquina nova apenas com os meus profiles configurados e quase nenhuma customização...',
      url: 'https://blog.chakra-ui.com',
      createdAt: new Date('2020-07-01'),
    },
    {
      id: '2',
      title: 'JavaScript: Higher-order e First-class functions',
      description:
        'Existem 2 recursos que estão presentes no JavaScript que abrem um mar de possibilidades para a escrita de um código mais funcional...',
      url: 'https://medium.com/joaobispo2077/javascript-higher-order-e-first-class-functions-1e7b95f67547',
      createdAt: new Date('2021-07-01'),
    },
  ];
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
      <Flex as="section" flexDirection="column" marginTop="1.5rem">
        <Text
          as="p"
          fontSize="xl"
          color="brand.primary"
          fontWeight="bold"
          marginBottom="1.5rem"
        >
          {blogTranslation.seeAllPosts}
        </Text>
        <VStack width="100%">
          {posts.map(({ id, title, description, url, createdAt }) => (
            <Flex
              key={id}
              as="a"
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              marginBottom="1.5rem"
              flexDirection="column"
              alignItems="start"
              width="100%"
            >
              <Heading
                as="h2"
                color="brand.primary"
                fontSize="xl"
                fontWeight="bold"
              >
                {title}
              </Heading>
              <Text fontSize="lg" color="brand.secondary" marginTop="1.5rem">
                {description}
              </Text>
              <Text fontSize="lg" color="brand.secondary" alignSelf="flex-end">
                {createdAt.toLocaleDateString()}
              </Text>
            </Flex>
          ))}
        </VStack>
      </Flex>
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
