import { FunctionComponent } from 'react';

import { IconButton, Menu, MenuButton, MenuList } from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';

import { MenuItem } from './MenuItem';
import { NavMobileItem } from './NavMobileItem';

export const NavbarMobile: FunctionComponent = () => {
  return (
    <Menu>
      {({ isOpen }) => (
        <>
          <MenuButton
            as={IconButton}
            aria-label="Options"
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          />
          <MenuList background="brand.background">
            <NavMobileItem>
              <MenuItem href="/about">Sobre</MenuItem>
            </NavMobileItem>
            <NavMobileItem>
              <MenuItem href="/blog/posts">Artigos</MenuItem>
            </NavMobileItem>
            <NavMobileItem>
              <MenuItem href="/repositories">Repositórios</MenuItem>
            </NavMobileItem>
            <NavMobileItem>
              <MenuItem href="/projects">Projetos</MenuItem>
            </NavMobileItem>
            <NavMobileItem>
              <MenuItem href="/flow">Flow</MenuItem>
            </NavMobileItem>
          </MenuList>
        </>
      )}
    </Menu>
  );
};
