import type { GetStaticProps, NextPage } from 'next';

import { useMemo } from 'react';

import { Box, Flex, Heading, Text } from '@chakra-ui/react';
import { motion } from 'framer-motion';

import { generateTextLinearGradient } from '@src/utils/generateGradient';
import { SEO } from '@src/components/SEO';
import { KanbanBoard, KanbanCardListData } from '@src/components/Kanban';
import { Image } from '@src/components/Image';
import { parseLocaleToGraphCmsLocale } from '@src/utils/parseLocale';
import { ContentManagementClient } from '@src/services/ContentManagementClient';
import {
  GetPageWithTasksByStatusDocument,
  useGetPageWithTasksByStatusQuery,
} from '@src/generated/graphql.blog';
import { serverSideCache } from '@src/services/ServerSideCache';
import { getRevalidateInDays } from '@src/utils/date';
import { useTranslation } from '@src/hooks/useTranslation';

export const PAGE_SLUG = 'roadmap';

const RoadmapPage: NextPage = () => {
  const { roadmapTranslation, graphCmsLocale } = useTranslation();

  const [{ data }] = useGetPageWithTasksByStatusQuery({
    variables: {
      slug: PAGE_SLUG,
      locale: graphCmsLocale,
    },
  });

  const page = data?.page;
  const taskStatuses = useMemo(
    () =>
      data?.taskStatuses.map((taskStatus) => ({
        ...taskStatus,
        cards: taskStatus.tasks,
      })) ?? [],
    [data?.taskStatuses],
  );

  return (
    <Flex
      as="main"
      background="brand.background"
      flexDirection="column"
      paddingTop={[4, 16]}
      paddingX={'1rem'}
      minHeight="100vh"
    >
      <SEO
        title={page?.seo?.title ?? roadmapTranslation.seoTitle}
        description={
          page?.seo?.description ?? roadmapTranslation.seoDescription
        }
        image={page?.seo?.image?.url ?? ''}
        url="/roadmap"
      />
      <Flex width="100%" minHeight="4rem" justifyContent="flex-start">
        <Heading
          as="h1"
          fontSize="5xl"
          color="brand.primary"
          {...generateTextLinearGradient('yellow', 'red')}
          whiteSpace="pre-wrap"
          wordBreak={'break-word'}
        >
          {page?.title ?? roadmapTranslation.title}
        </Heading>
      </Flex>
      <Text color="brand.secondary" fontSize="xl" marginTop="1rem">
        {page?.subtitle ?? roadmapTranslation.subtitle}
      </Text>
      <Box>
        <motion.div
          initial={{ height: '100vh' }}
          animate={{ height: '100%' }}
          transition={{ duration: 0.5 }}
          style={{
            overflow: 'auto',
            width: '100%',
          }}
        >
          <Flex
            as="section"
            marginTop="1.5rem"
            overflowX={'auto'}
            width="100%"
            direction="column"
            justifyContent="center"
            alignItems="center"
            paddingX="1rem"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5 }}
              style={{
                overflow: 'auto',
                width: '100%',
              }}
            >
              <KanbanBoard
                taskStatuses={(taskStatuses as KanbanCardListData[]) ?? []}
              />
            </motion.div>
          </Flex>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 3 }}
        >
          <Flex
            as="section"
            marginTop="1.5rem"
            overflowX={'auto'}
            width="100%"
            direction="column"
            justifyContent="center"
            alignItems="center"
            paddingX="1rem"
          >
            <Heading
              as="h2"
              fontSize="4xl"
              color="brand.primary"
              {...generateTextLinearGradient('background', 'orange')}
              whiteSpace="pre-wrap"
              wordBreak={'break-word'}
            >
              {roadmapTranslation.titleTimeManage}
            </Heading>
            <Image
              priority={true}
              src="/assets/images/The-Eisenhower-Decision-Matrix.png"
              title={roadmapTranslation.titleTimeManage}
              alt={roadmapTranslation.imageTimeManageDescription}
              maxWidth={800}
              maxHeight={800}
              minWidth={300}
              minHeight={300}
              width={320}
              height={320}
              borderRadius={8}
              flexShrink={0}
              flex={1}
            />
            <Text
              color="brand.secondary"
              fontSize="xl"
              marginTop="1rem"
              maxWidth={800}
              maxHeight={800}
              marginBottom="5rem"
            >
              {roadmapTranslation.imageTimeManageDescription}
            </Text>
          </Flex>
        </motion.div>
      </Box>
    </Flex>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const locale = parseLocaleToGraphCmsLocale(context.locale);

  await ContentManagementClient.query(GetPageWithTasksByStatusDocument, {
    slug: PAGE_SLUG,
    locale,
  }).toPromise();

  return {
    props: {
      urqlState: serverSideCache.extractData(),
    },
    revalidate: getRevalidateInDays(14),
  };
};

export default RoadmapPage;
