import { FunctionComponent, ReactNode } from 'react';

import { MenuItem as ChakraMenuItem } from '@chakra-ui/react';

type NavMobileItemProps = {
  children: ReactNode;
};

export const NavMobileItem: FunctionComponent<NavMobileItemProps> = ({
  children,
}) => (
  <ChakraMenuItem
    _hover={{
      background: 'brand.hover',
      color: 'brand.cyan',
      _activeLink: {
        color: 'brand.yellow',
      },
    }}
  >
    {children}
  </ChakraMenuItem>
);
