import { FunctionComponent } from 'react';

import { Flex, useMediaQuery } from '@chakra-ui/react';

import { NavbarDesktop } from './NavbarDesktop';
import { NavbarMobile } from './NavbarMobile';
import { navbarlinks } from './links';

export const Navbar: FunctionComponent = () => {
  const [isDesktopScreen] = useMediaQuery('(min-width: 576px)');

  return (
    <Flex as="nav">
      {isDesktopScreen ? (
        <NavbarDesktop links={navbarlinks} />
      ) : (
        <NavbarMobile links={navbarlinks} />
      )}
    </Flex>
  );
};
