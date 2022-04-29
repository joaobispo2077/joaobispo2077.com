import { FunctionComponent } from 'react';

import { HStack } from '@chakra-ui/react';

import { MenuItem } from './MenuItem';
import { Link } from './links';

type NavbarDesktopProps = {
  links: Link[];
};

export const NavbarDesktop: FunctionComponent<NavbarDesktopProps> = ({
  links,
}) => {
  return (
    <HStack
      as="ul"
      spacing={8}
      align="center"
      justify={['center', 'space-between', 'flex-end', 'flex-end']}
      direction={['column', 'row', 'row', 'row']}
      pt={[4, 4, 0, 0]}
    >
      {links.map((link) => (
        <MenuItem key={link.name} href={link.url}>
          {link.text}
        </MenuItem>
      ))}
    </HStack>
  );
};
