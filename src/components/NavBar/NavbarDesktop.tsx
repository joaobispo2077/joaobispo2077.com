import { FunctionComponent } from 'react';

import { HStack } from '@chakra-ui/react';

import { MenuItem } from './MenuItem';

export const NavbarDesktop: FunctionComponent = () => {
  return (
    <HStack
      as="ul"
      spacing={8}
      align="center"
      justify={['center', 'space-between', 'flex-end', 'flex-end']}
      direction={['column', 'row', 'row', 'row']}
      pt={[4, 4, 0, 0]}
    >
      <MenuItem href="/about">Sobre</MenuItem>
      <MenuItem href="/blog/posts">Artigos</MenuItem>
      <MenuItem href="/repositories">Repositórios</MenuItem>
      <MenuItem href="/projects">Projetos</MenuItem>
      <MenuItem href="/flow">Flow</MenuItem>
    </HStack>
  );
};
