import { FunctionComponent } from 'react';

import {
  Box,
  Heading,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';

export const Header: FunctionComponent = () => {
  return (
    <Box
      as="header"
      height="4rem"
      width="100%"
      padding="1rem"
      display="flex"
      justifyContent={'space-between'}
      backgroundColor="brand.background"
    >
      <Heading as="h1" fontSize="2rem" fontWeight="bold" color="brand.primary">
        JB
      </Heading>

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
    </Box>
  );
};
