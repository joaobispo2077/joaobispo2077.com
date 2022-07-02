import type { GetStaticProps, NextPage } from 'next';

import { Flex, Heading, Text, VStack } from '@chakra-ui/react';

import { useTranslation } from '@src/hooks/useTranslation';
import { serverSideCache } from '@src/services/ServerSideCache';
import { generateTextLinearGradient } from '@src/utils/generateGradient';
import { SEO } from '@src/components/SEO';
import { PostsDocument, usePostsQuery } from '@src/generated/graphql.blog';
import { ContentManagementClient } from '@src/services/ContentManagementClient';
import { PostCard } from '@src/components/PostCard';
import { parseLocaleToGraphCmsLocale } from '@src/utils/parseLocale';

const BlogPage: NextPage = () => {
  const { blogTranslation, graphCmsLocale } = useTranslation();
  const [{ data }] = usePostsQuery({
    variables: {
      locale: graphCmsLocale,
    },
  });

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
          whiteSpace="pre-line"
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
          {data?.posts.map(({ title, excerpt, publishedAt, slug, tags }) => (
            <PostCard
              key={slug}
              title={title}
              description={excerpt || ''}
              createdAt={publishedAt}
              slug={slug}
              tags={tags}
            />
          ))}
        </VStack>
      </Flex>
    </Flex>
  );
};

export default BlogPage;

export const getStaticProps: GetStaticProps = async (context) => {
  const locale = parseLocaleToGraphCmsLocale(context.locale);
  console.info(`Fetching posts for locale ${locale}`);

  const response = await ContentManagementClient.query(PostsDocument, {
    locale,
  }).toPromise();
  console.info(response);
  console.info(`Fetched posts for locale ${locale}`);
  return {
    props: {
      urqlState: serverSideCache.extractData(),
    },
  };
};
