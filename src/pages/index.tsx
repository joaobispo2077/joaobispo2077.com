import type { NextPage } from 'next';

import { Box, Flex, Heading, Text } from '@chakra-ui/react';
import Head from 'next/head';

const Home: NextPage = () => {
  return (
    <Flex
      as="main"
      background="brand.background"
      width="100%"
      height="calc(100vh - 8rem)"
      flexDirection="column"
    >
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>João Bispo | Portfólio</title>
        <meta name="description" content="Crafting software for the web" />
        <link
          rel="shortcut icon"
          href="/assets/icons/lightning.png"
          type="image/png"
        />
        {/* https://www.flaticon.com/premium-icon/lightning_2985698?term=lightning&related_id=2985698# */}
      </Head>
      <Box marginX="1rem" marginTop={['7rem', '16rem']}>
        <Heading as="h1" color="brand.primary" fontSize="5xl">
          João Bispo
        </Heading>
        <Box marginTop="1.5rem">
          <Text color="brand.primary" fontWeight={'bold'}>
            Software Engineer at IBM
          </Text>
          <Text color="brand.secondary">
            Crafting world-impact software that make people lives better.
          </Text>
        </Box>
      </Box>
    </Flex>
  );
};

export default Home;
