import { FunctionComponent, ReactNode } from 'react';

import { Box } from '@chakra-ui/react';
import { LayoutGroup } from 'framer-motion';

import { useShell } from '@src/hooks/useShell';

import { Footer } from '../../Footer';
import { Header } from '../../Header';

export const Shell: FunctionComponent<{
  children: ReactNode;
}> = ({ children }) => {
  const { BeforeFooterComponent, AfterHeaderComponent } = useShell();

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
      {AfterHeaderComponent && (
        <LayoutGroup id="after-header">{AfterHeaderComponent}</LayoutGroup>
      )}

      <LayoutGroup id="global">
        <Box height="100%" width="100%" maxWidth="800px">
          {children}
        </Box>
      </LayoutGroup>

      {BeforeFooterComponent && (
        <LayoutGroup id="before-footer">{BeforeFooterComponent}</LayoutGroup>
      )}
      <Footer />
    </Box>
  );
};
