import { extendTheme } from '@chakra-ui/react';

export const brandColors = {
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
} as const;

const colors = {
  brand: brandColors,
} as const;

export const theme = extendTheme({
  colors,
});
