import { Flex, Heading, HStack, Icon, Text } from '@chakra-ui/react';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { FiCalendar, FiUser } from 'react-icons/fi';
import { useRouter } from 'next/router';

import { useTranslation } from '@src/hooks/useTranslation';
import { formatDate } from '@src/utils/date';
import { ContentManagementClient } from '@src/services/ContentManagementClient';
import { serverSideCache } from '@src/services/ServerSideCache';
import { PostDocument, usePostQuery } from '@src/generated/graphql.blog';
import { Content } from '@src/styles/poststyles';

const PostPage: NextPage = () => {
  const router = useRouter();
  const { slug } = router.query;
  const [{ data }] = usePostQuery({
    variables: {
      slug: slug as string,
    },
  });
  const { locale } = useTranslation();

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
      <Heading color="brand.primary">{data?.post?.title}</Heading>
      <HStack spacing="2rem" marginTop={'2rem'}>
        <Flex alignItems="center" gap="1rem">
          <Icon as={FiCalendar} w={6} h={6} color="brand.secondary" />
          <Text as="span" color="brand.secondary">
            {formatDate(data?.post?.publishedAt, locale)}
          </Text>
        </Flex>
        <Flex alignItems="center" gap="1rem">
          <Icon as={FiUser} w={6} h={6} color="brand.secondary" />
          <Text as="span" color="brand.secondary">
            {'João Bispo'}
          </Text>
        </Flex>
      </HStack>
      <Content
        dangerouslySetInnerHTML={{
          __html: data?.post?.content.html ?? '',
        }}
      />
    </Flex>
  );
};

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params || {};
  await ContentManagementClient.query(PostDocument, {
    slug,
  }).toPromise();
  return {
    props: {
      urqlState: serverSideCache.extractData(),
    },
    revalidate: 60 * 30, // 30 minutes
  };
};

export default PostPage;
