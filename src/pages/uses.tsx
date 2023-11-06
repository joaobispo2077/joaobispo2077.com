import type { GetStaticProps, NextPage } from 'next';

import { Flex, Heading, UnorderedList, ListItem } from '@chakra-ui/react';

import { useTranslation } from '@src/hooks/useTranslation';
import { generateTextLinearGradient } from '@src/utils/generateGradient';
import { SEO } from '@src/components/SEO';
import { getRevalidateInDays } from '@src/utils/date';
import { serverSideCache } from '@src/services/ServerSideCache';
import { ContentManagementClient } from '@src/services/ContentManagementClient';
import { parseLocaleToGraphCmsLocale } from '@src/utils/parseLocale';
import {
  GetPageWithJobsDocument,
  useGetPageWithJobsQuery,
} from '@src/generated/graphql.blog';

const PAGE_SLUG = 'uses';

const UsesPage: NextPage = () => {
  const { aboutTranslation, locale, graphCmsLocale } = useTranslation();

  const [{ data }] = useGetPageWithJobsQuery({
    variables: {
      slug: PAGE_SLUG,
      locale: graphCmsLocale,
    },
  });

  const page = data?.page;

  return (
    <Flex
      as="main"
      background="brand.background"
      width="100%"
      minHeight="calc(100vh - 8rem)"
      flexDirection="column"
      paddingTop={[4, 8]}
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
        <Heading as="h2" fontSize="2xl" color="brand.primary">
          Gaming machine: Predator Helios 300
        </Heading>
        <UnorderedList color="brand.secondary">
          <ListItem>Intel® Core™ i7-11800H 8 cores 4.60 GHz</ListItem>
          <ListItem>Nvidia® GeForce® RTX 3070 8 GB</ListItem>
          <ListItem>16 GB RAM DDR4 3200 MHz (2 x 8 GB)</ListItem>
          <ListItem>512 GB SSD PCIe 4.0 NVMe</ListItem>
          <ListItem>
            Monitor/Screen 144Hz 15.6” Full HD (1920 x 1080) 16:9 250 nits 45%
            NTSC
          </ListItem>
        </UnorderedList>
        <Heading as="h2" fontSize="2xl" color="brand.primary">
          Work machine: Macbook Pro (16-inch) 2019
        </Heading>
        <UnorderedList color="brand.secondary">
          <ListItem>Intel® Core™ i7 6 cores 2.60 GHz</ListItem>
          <ListItem>AMD Radeon Pro 5300M 4 GB</ListItem>
          <ListItem>16 GB RAM DDR4 2666 MHz</ListItem>
          <ListItem>512 GB SSD</ListItem>
          <ListItem>
            Monitor/Screen 60Hz 16” near 4K (3072 x 1920) 16:9 500 nits P3
          </ListItem>
        </UnorderedList>
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

export default UsesPage;
