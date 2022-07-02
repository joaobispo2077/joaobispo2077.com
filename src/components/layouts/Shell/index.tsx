import { FunctionComponent, ReactNode } from 'react';

import { Box } from '@chakra-ui/react';
import { LayoutGroup } from 'framer-motion';

import { Footer } from '../../Footer';
import { Header } from '../../Header';

export const Shell: FunctionComponent<{
  children: ReactNode;
}> = ({ children }) => {
  return (
    <Box
      height="100%"
      width="100%"
      backgroundColor="brand.background"
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      <Header />
      <LayoutGroup id="global">
        <Box height="100%" width="100%" maxWidth="800px">
          {children}
        </Box>
      </LayoutGroup>
      <Footer />
    </Box>
  );
};
