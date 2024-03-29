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
        image="https://images.unsplash.com/photo-1604964432806-254d07c11f32?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80"
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
