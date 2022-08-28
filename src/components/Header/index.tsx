import { FunctionComponent } from 'react';

import { Box, Heading } from '@chakra-ui/react';
import { useRouter } from 'next/router';

import { Navbar } from '../Navigation';

export const Header: FunctionComponent = () => {
  const router = useRouter();

  const goToHome = () => {
    router.push('/');
  };

  return (
    <Box
      as="header"
      height="4rem"
      width="100%"
      maxWidth="800px"
      padding="1rem"
      display="flex"
      justifyContent={'space-between'}
      backgroundColor="brand.background"
    >
      <Heading
        as="h1"
        fontSize="2rem"
        fontWeight="bold"
        color="brand.primary"
        _hover={{ cursor: 'pointer' }}
        onClick={goToHome}
      >
        JB
      </Heading>
      <Navbar />
    </Box>
  );
};
