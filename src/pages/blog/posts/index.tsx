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
import { getRevalidateInDays } from '@src/utils/date';

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
      <SEO
        title="Blog"
        description="Blog posts about software development"
        image="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
        url="/blog"
      />
      <Flex width="100%" minHeight="4rem" justifyContent="flex-start">
        <Heading
          as="h1"
          fontSize="5xl"
          color="brand.primary"
          {...generateTextLinearGradient('cyan', 'red')}
          whiteSpace="pre-wrap"
          wordBreak={'break-word'}
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
          {data?.posts.map(({ title, excerpt, date, slug, tags }) => (
            <PostCard
              key={slug}
              title={title}
              description={excerpt || ''}
              createdAt={date}
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

  await ContentManagementClient.query(PostsDocument, {
    locale,
  }).toPromise();

  return {
    props: {
      urqlState: serverSideCache.extractData(),
    },
    revalidate: getRevalidateInDays(7),
  };
};
