import { FunctionComponent, useCallback, useMemo } from 'react';

import { Flex, useMediaQuery } from '@chakra-ui/react';
import { LayoutGroup } from 'framer-motion';

import { useTranslation } from '@src/hooks/useTranslation';

import { NavbarDesktop } from './NavbarDesktop';
import { NavbarMobile } from './NavbarMobile';
import { links } from './links';

export const Navbar: FunctionComponent = () => {
  const { navbarTranslation } = useTranslation();

  const [isDesktopScreen] = useMediaQuery('(min-width: 576px)');

  const localizedLinks = useMemo(() => {
    const localizedLinks = links.map((link) => ({
      ...link,
      text: navbarTranslation[link.name],
    }));
    return localizedLinks;
  }, [navbarTranslation]);

  return (
    <Flex as="nav">
      <LayoutGroup id="navbar">
        {isDesktopScreen ? (
          <NavbarDesktop links={localizedLinks} />
        ) : (
          <NavbarMobile links={localizedLinks} />
        )}
      </LayoutGroup>
    </Flex>
  );
};
