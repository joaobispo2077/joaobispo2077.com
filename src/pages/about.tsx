import type { GetStaticProps, NextPage } from 'next';

import { Box, Flex, Heading, Text, VStack } from '@chakra-ui/react';

import { useTranslation } from '@src/hooks/useTranslation';
import { generateTextLinearGradient } from '@src/utils/generateGradient';
import { SEO } from '@src/components/SEO';
import { Image } from '@src/components/Image';
import {
  formatDate,
  getMonthsDifferenceFromDates,
  getRevalidateInDays,
  getYearsDifferenceFromDates,
} from '@src/utils/date';
import { Job } from '@src/components/Job';
import { serverSideCache } from '@src/services/ServerSideCache';
import { ContentManagementClient } from '@src/services/ContentManagementClient';
import { parseLocaleToGraphCmsLocale } from '@src/utils/parseLocale';
import {
  GetPageWithJobsDocument,
  useGetPageWithJobsQuery,
} from '@src/generated/graphql.blog';
import { AboutDescriptionStyles } from '@src/styles/pages/about.styles';

const PAGE_SLUG = 'about';

const AboutPage: NextPage = () => {
  const { aboutTranslation, locale, graphCmsLocale } = useTranslation();

  const [{ data }] = useGetPageWithJobsQuery({
    variables: {
      slug: PAGE_SLUG,
      locale: graphCmsLocale,
    },
  });

  const parsedJobs = data?.jobs.map((job) => {
    const yearsDifference = getYearsDifferenceFromDates(
      job.startedAt,
      job.endedAt,
    );
    const monthsDifference =
      getMonthsDifferenceFromDates(job.startedAt, job.endedAt) -
      yearsDifference * 12;

    const time =
      yearsDifference > 0
        ? `${yearsDifference} ${aboutTranslation.years} ${monthsDifference} ${aboutTranslation.months}`
        : `${monthsDifference} ${aboutTranslation.months}`;

    return {
      ...job,
      startedAt: formatDate(new Date(job.startedAt), locale, {
        year: 'numeric',
        month: 'short',
        day: undefined,
      }),
      endedAt: job.endedAt
        ? formatDate(new Date(job.endedAt), locale, {
            year: 'numeric',
            month: 'short',
            day: undefined,
          })
        : 'Present',
      time,
    };
  });

  const page = data?.page;

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
        title={page?.seo?.title ?? aboutTranslation.seoTitle}
        description={page?.seo?.description ?? aboutTranslation.seoDescription}
        image={page?.seo?.image?.url ?? ''}
        url="/about"
      />
      <Flex width="100%" minHeight="4rem" justifyContent="flex-start">
        <Heading
          as="h1"
          fontSize="5xl"
          color="brand.primary"
          {...generateTextLinearGradient('cyan', 'purple')}
          whiteSpace="pre-wrap"
          wordBreak={'break-word'}
        >
          {page?.title ?? aboutTranslation.title}
        </Heading>
      </Flex>
      <Flex as="section" flexDirection="column" marginTop="1.5rem">
        <Flex
          as="section"
          justifyContent={['center', 'flex-start']}
          flexWrap={['wrap-reverse', 'wrap-reverse', 'wrap-reverse']}
          gap={['1rem', '1rem', '2rem', '2rem']}
        >
          <Box
            flex={1}
            color="brand.secondary"
            fontSize="medium"
            dangerouslySetInnerHTML={{
              __html: page?.content.html ?? aboutTranslation.fallbackContent,
            }}
            __css={AboutDescriptionStyles}
          />

          <Image
            src="https://github.com/joaobispo2077.png"
            alt="João Bispo - Software Engineer"
            title="João Bispo - Software Engineer"
            width={400}
            height={400}
            objectFit="cover"
            borderRadius={8}
            flexShrink={0}
            flex={1}
          />
        </Flex>
        <Text
          as="p"
          fontSize="xl"
          color="brand.primary"
          fontWeight="bold"
          marginY={['1rem', '1rem', '2rem', '2rem']}
        >
          {aboutTranslation.seeAllJobs}
        </Text>
        <VStack as="ul" spacing="1.5rem">
          {parsedJobs?.map((job) => (
            <Job key={job.startedAt} {...job} />
          ))}
        </VStack>
      </Flex>
    </Flex>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const locale = parseLocaleToGraphCmsLocale(context.locale);

  await ContentManagementClient.query(GetPageWithJobsDocument, {
    slug: PAGE_SLUG,
    locale,
  }).toPromise();

  return {
    props: {
      urqlState: serverSideCache.extractData(),
    },
    revalidate: getRevalidateInDays(7),
  };
};

export default AboutPage;
