import type { GetStaticProps, NextPage } from 'next';

import { Flex, Heading, Text, VStack, Link, Tag, Icon } from '@chakra-ui/react';
import NextLink from 'next/link';
import { FiCalendar } from 'react-icons/fi';

import { useTranslation } from '@src/hooks/useTranslation';
import { GithubClient } from '@src/services/GithubClient';
import {
  RepositoriesDocument,
  useRepositoriesQuery,
} from '@src/generated/graphql.github';
import { serverSideCache } from '@src/services/ServerSideCache';
import { parseRepositories } from '@src/utils/parseRepositories';
import { generateTextLinearGradient } from '@src/utils/generateGradient';
import { SEO } from '@src/components/SEO';
import { Card } from '@src/components/Card';

const BlogPage: NextPage = () => {
  const { blogTranslation, locale } = useTranslation();
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
      slug: 'customizing-terminal',
      tags: [
        'terminal',
        'macos',
        'oh-my-zsh',
        'powerlevel10k',
        'iterm2',
        'dracula',
        'plugins',
      ],
    },
    {
      id: '2',
      title: 'JavaScript: Higher-order e First-class functions',
      description:
        'Existem 2 recursos que estão presentes no JavaScript que abrem um mar de possibilidades para a escrita de um código mais funcional...',
      url: 'https://medium.com/joaobispo2077/javascript-higher-order-e-first-class-functions-1e7b95f67547',
      createdAt: new Date('2021-07-01'),
      slug: 'javascript-higher-order-e-first-class-functions',
      tags: ['javascript', 'higher-order', 'first-class'],
    },
  ];

  function formatDate(date: Date) {
    return new Intl.DateTimeFormat(locale, {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
    }).format(date);
  }

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
      <SEO title="Blog" description="Blog posts about software development" />
      <Flex width="100%" minHeight="4rem" justifyContent="flex-start">
        <Heading
          as="h1"
          fontSize="5xl"
          color="brand.primary"
          {...generateTextLinearGradient('cyan', 'red')}
        >
          {blogTranslation.title}
        </Heading>
      </Flex>
      <Text color="brand.secondary" fontSize="xl" marginTop="1rem">
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
          {posts.map(({ id, title, description, createdAt, slug, tags }) => (
            <Card key={id}>
              <NextLink href={`/blog/posts/${slug}`} passHref>
                <Link>
                  <Heading
                    as="h2"
                    color="brand.primary"
                    fontSize="xl"
                    fontWeight="bold"
                  >
                    {title}
                  </Heading>
                  <Flex alignItems="center" marginTop=".5rem">
                    <Icon
                      width="1rem"
                      height="1rem"
                      name="calendar"
                      color="brand.secondary"
                      marginRight=".5rem"
                      as={FiCalendar}
                    />
                    <Text fontSize="md" color="brand.secondary">
                      {formatDate(createdAt)}
                    </Text>
                  </Flex>
                  <Text
                    fontSize="lg"
                    color="brand.secondary"
                    marginTop=".75rem"
                  >
                    {description}
                  </Text>

                  <Flex
                    width="100%"
                    height="auto"
                    gap=".75rem"
                    flexWrap={'wrap'}
                    marginTop="1rem"
                  >
                    {tags.map((tag) => (
                      <Tag
                        size="md"
                        key={tag}
                        variant="solid"
                        colorScheme={'whiteAlpha'}
                        textTransform="lowercase"
                      >
                        {tag}
                      </Tag>
                    ))}
                  </Flex>
                </Link>
              </NextLink>
            </Card>
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
