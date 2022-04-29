import { FunctionComponent } from 'react';

import { Flex, useMediaQuery } from '@chakra-ui/react';
import { LayoutGroup } from 'framer-motion';

import { NavbarDesktop } from './NavbarDesktop';
import { NavbarMobile } from './NavbarMobile';
import { links } from './links';

export const Navbar: FunctionComponent = () => {
  const [isDesktopScreen] = useMediaQuery('(min-width: 576px)');

  return (
    <Flex as="nav">
      <LayoutGroup id="navbar">
        {isDesktopScreen ? (
          <NavbarDesktop links={links} />
        ) : (
          <NavbarMobile links={links} />
        )}
      </LayoutGroup>
    </Flex>
  );
};
