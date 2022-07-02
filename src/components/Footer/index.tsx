import { FunctionComponent } from 'react';

import { Box, HStack, Icon } from '@chakra-ui/react';

import { socialmedias } from './socialmedias';

export const Footer: FunctionComponent = () => {
  return (
    <Box
      as="footer"
      height="4rem"
      width="100%"
      maxWidth="800px"
      padding="1rem"
      display="flex"
      justifyContent={'space-between'}
      backgroundColor="brand.background"
    >
      <HStack
        width="100%"
        alignItems="center"
        justifyContent={'center'}
        spacing={'2rem'}
      >
        {socialmedias
          .filter(
            (socialmedia) =>
              socialmedia.name.includes('Github') ||
              socialmedia.name.includes('Linkedin'),
          )
          .map((socialmedia) => (
            <Box key={socialmedia.name}>
              <a
                href={socialmedia.url}
                rel="noopener noreferrer"
                target="_blank"
              >
                <Icon
                  width="1.5rem"
                  height="1.5rem"
                  as={socialmedia.icon}
                  color="brand.secondary"
                  opacity={0.7}
                  _hover={{
                    opacity: 1,
                    color: socialmedia.color,
                    transition: 'opacity 0.2s ease-in-out',
                  }}
                  transition="opacity 0.2s ease-in-out"
                />
              </a>
            </Box>
          ))}
      </HStack>
    </Box>
  );
};
