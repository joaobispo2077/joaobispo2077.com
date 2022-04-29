import { FunctionComponent, useState } from 'react';

import { HStack } from '@chakra-ui/react';

import { MenuItem } from './MenuItem';
import { Link } from './links';

type NavbarDesktopProps = {
  links: Link[];
};

export const NavbarDesktop: FunctionComponent<NavbarDesktopProps> = ({
  links,
}) => {
  const [selectedMenuItem, setSelectedMenuItem] = useState('');

  const handleSelectMenuItem = (menuName: string) => {
    setSelectedMenuItem(menuName);
  };

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
        <MenuItem
          key={link.name}
          href={link.url}
          onClick={() => handleSelectMenuItem(link.name)}
          isSelected={selectedMenuItem === link.name}
        >
          {link.text}
        </MenuItem>
      ))}
    </HStack>
  );
};
