import type { NextPage } from 'next';

import React from 'react';

import { Box, Flex, Heading, Text } from '@chakra-ui/react';

import { SEO } from '@src/components/SEO';

const Home: NextPage = () => {
  return (
    <Flex
      as="main"
      background="brand.background"
      width="100%"
      minHeight="calc(100vh - 8rem)"
      flexDirection="column"
      justifyContent="center"
      paddingX={'1rem'}
    >
      <SEO
        description="Crafting software for the web"
        image="https://us-west-2.graphassets.com/A2rVan5iKQwq5RAG15Bnqz/cm9usucbotdlo0dn1ks5vgv5x"
        url="/"
      />

      <Flex as="section" width="100%" flexDirection="column">
        <Heading as="h1" color="brand.primary" fontSize="5xl">
          João Bispo
        </Heading>
        <Box marginTop="1.5rem">
          <Text color="brand.primary" fontWeight={'bold'}>
            Senior Software Engineer
          </Text>
          <Text color="brand.secondary">
            Crafting world-impact software that make people lives better.
          </Text>
        </Box>
      </Flex>
    </Flex>
  );
};

export default Home;
