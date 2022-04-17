import { FunctionComponent } from 'react';

import {
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';

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
          <MenuList>
            <MenuItem>Sobre</MenuItem>
            <MenuItem>Artigos</MenuItem>
            <MenuItem>Repositórios</MenuItem>
            <MenuItem>Projetos</MenuItem>
            <MenuItem>Flow</MenuItem>
          </MenuList>
        </>
      )}
    </Menu>
  );
};
