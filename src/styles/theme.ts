import { extendTheme } from '@chakra-ui/react';

const colors = {
  brand: {
    yellow: '#ffff80',
    pink: '#ff80bf',
    purple: '#9580ff',
    red: '#ff9580',
    orange: '#ffca80',
    green: '#8aff80',
    cyan: '#80ffea',
    primary: '#f2f2f2',
    secondary: '#8f9ba8',
    background: '#08070b',
    hover: '#212024',
    command: 'rgba(255, 255, 255, 0.05)',
  },
};

export const theme = extendTheme({ colors });
