import type { NextPage } from 'next';

import { Flex, Heading } from '@chakra-ui/react';

import { generateTextLinearGradient } from '@src/utils/generateGradient';
import { SEO } from '@src/components/SEO';

export const PAGE_SLUG = 'roadmap';

const RoadmapPage: NextPage = () => {
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
        // title={page?.seo?.title ?? aboutTranslation.seoTitle}
        // description={page?.seo?.description ?? aboutTranslation.seoDescription}
        // image={page?.seo?.image?.url ?? ''}
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
          {/* {page?.title ?? aboutTranslation.title} */}
          Higher. Further. Faster.
        </Heading>
      </Flex>
      <Flex as="section" flexDirection="column" marginTop="1.5rem">
        Roadmap
      </Flex>
    </Flex>
  );
};

export default RoadmapPage;
