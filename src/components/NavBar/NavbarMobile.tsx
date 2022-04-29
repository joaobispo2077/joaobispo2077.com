import { FunctionComponent } from 'react';

import { IconButton, Menu, MenuButton, MenuList } from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';

import { MenuItem } from './MenuItem';
import { NavMobileItem } from './NavMobileItem';
import { Link } from './links';

type NavbarMobileProps = {
  links: Link[];
};

export const NavbarMobile: FunctionComponent<NavbarMobileProps> = ({
  links,
}) => {
  return (
    <Menu>
      {({ isOpen }) => (
        <>
          <MenuButton
            as={IconButton}
            aria-label="Options"
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            color="brand.secondary"
            _hover={{
              background: 'brand.hover',
            }}
          />
          <MenuList background="brand.background" as="ul">
            {links.map((link) => (
              <MenuItem href={link.url} key={link.name}>
                <NavMobileItem>{link.text}</NavMobileItem>
              </MenuItem>
            ))}
          </MenuList>
        </>
      )}
    </Menu>
  );
};
