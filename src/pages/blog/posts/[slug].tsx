import { useEffect, useState } from 'react';

import {
  Flex,
  Heading,
  Icon,
  IconButton,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { FiCalendar, FiShare2, FiClock } from 'react-icons/fi';
import { useRouter } from 'next/router';

import { useTranslation } from '@src/hooks/useTranslation';
import {
  estimateReadTime,
  formatDate,
  getRevalidateInDays,
} from '@src/utils/date';
import { ContentManagementClient } from '@src/services/ContentManagementClient';
import { serverSideCache } from '@src/services/ServerSideCache';
import { PostDocument, usePostQuery } from '@src/generated/graphql.blog';
import { Content } from '@src/styles/poststyles';
import { SEO } from '@src/components/SEO';
import { Tags } from '@src/components/Tags';
import { parseLocaleToGraphCmsLocale } from '@src/utils/parseLocale';
import { ShareSocialMediaModal } from '@src/components/ShareSocialMedia';

const PostPage: NextPage = () => {
  const { graphCmsLocale } = useTranslation();

  const router = useRouter();
  const { slug } = router.query;

  const [{ data }] = usePostQuery({
    variables: {
      slug: slug as string,
      locale: graphCmsLocale,
    },
  });

  const { locale } = useTranslation();
  const [useScrollProgress, setUseScrollProgres] = useState(0);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const postUrl = global.window ? window.location?.href : '';
  // TODO: ADD image={data?.post?.coverImage?.coverImagePost[0]?.coverImage?.url} post image in future
  const readTime = estimateReadTime(data?.post?.content.html ?? '0');

  const progressReading = () => {
    const scrollTop = document?.documentElement?.scrollTop;
    const viewHeight =
      document?.documentElement?.scrollHeight -
      document?.documentElement?.clientHeight;
    const progress = (scrollTop / viewHeight) * 100;
    setUseScrollProgres(progress);
  };

  useEffect(() => {
    console.log('helou');

    window?.addEventListener('scroll', progressReading);
    return () => window?.removeEventListener('scroll', progressReading);
  }, []);

  return (
    <Flex
      as="main"
      background="brand.background"
      width="100%"
      minHeight="calc(100vh - 8rem)"
      flexDirection="column"
      paddingTop={[4, 8]}
      paddingX={'1.75rem'}
    >
      <SEO
        title={`${data?.post?.title}`}
        description={`${data?.post?.excerpt || ''}`}
        image={data?.post?.seo?.image?.url}
        url={`/blog/posts/${slug}`}
      />
      <Flex
        position="fixed"
        top="0"
        left="0"
        width={`${useScrollProgress}%`}
        height="0.25rem"
        bgGradient="linear(to-r, cyan.400, purple.500)"
        zIndex="999"
      />
      <Heading color="brand.primary" fontWeight={900}>
        {data?.post?.title}
      </Heading>
      <Tags tags={data?.post?.tags} />
      <Flex gap="2rem" marginTop={'2rem'} justifyContent={'space-between'}>
        <Flex gap="2rem">
          <Flex alignItems="center" gap="1rem">
            <Icon
              as={FiCalendar}
              w={6}
              h={6}
              color="brand.secondary"
              background="brand.background"
              transition="opacity 0.3s ease"
              // opacity={showTopLine ? 1 : 0}
            />
            <Text as="span" color="brand.secondary" aria-label="Posted at">
              {formatDate(data?.post?.date, locale)}
            </Text>
          </Flex>
          <Flex alignItems="center" gap="1rem">
            <Icon
              as={FiClock}
              w={6}
              h={6}
              color="brand.secondary"
              background="brand.background"
            />
            <Text as="span" color="brand.secondary" arial-label="Reading time">
              {readTime} min
            </Text>
          </Flex>
        </Flex>

        <Flex alignItems="center" gap="1rem">
          <IconButton
            aria-label="Share post"
            icon={<FiShare2 color="brand.secondary" size={24} />}
            color="brand.secondary"
            variant="link"
            onClick={onOpen}
            transition="all 0.2s"
            _hover={{ color: 'brand.yellow' }}
          />
          <ShareSocialMediaModal
            content={postUrl}
            isOpen={isOpen}
            onClose={onClose}
          />
        </Flex>
      </Flex>
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

export const getStaticProps: GetStaticProps = async (context) => {
  const { slug } = context.params || {};
  const locale = parseLocaleToGraphCmsLocale(context.locale);

  await ContentManagementClient.query(PostDocument, {
    slug,
    locale,
  }).toPromise();

  return {
    props: {
      urqlState: serverSideCache.extractData(),
    },
    revalidate: getRevalidateInDays(7),
  };
};

export default PostPage;
