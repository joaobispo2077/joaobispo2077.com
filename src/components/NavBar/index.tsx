import { FunctionComponent } from 'react';

import { Flex, useMediaQuery } from '@chakra-ui/react';

import { NavbarDesktop } from './NavbarDesktop';
import { NavbarMobile } from './NavbarMobile';

export const Navbar: FunctionComponent = () => {
  const isDesktop = useMediaQuery('(min-width: 768px)');

  return (
    <Flex as="nav">{isDesktop ? <NavbarDesktop /> : <NavbarMobile />}</Flex>
  );
};
