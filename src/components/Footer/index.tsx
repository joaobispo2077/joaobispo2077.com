import { FunctionComponent } from 'react';

import { Box, HStack, Icon } from '@chakra-ui/react';
import { FiGithub, FiInstagram, FiLinkedin, FiTwitter } from 'react-icons/fi';
import Link from 'next/link';

export const Footer: FunctionComponent = () => {
  return (
    <Box
      as="footer"
      height="4rem"
      width="100%"
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
        <Box>
          <a
            href="http://github.com/joaobispo2077"
            rel="noopener noreferrer"
            target="_blank"
          >
            <Icon
              width="1.5rem"
              height="1.5rem"
              as={FiGithub}
              color="brand.secondary"
              opacity={0.7}
              _hover={{
                opacity: 1,
                color: '#f0f6fc',
              }}
            />
          </a>
        </Box>
        <Box>
          <a
            href="http://twitter.com/joaobispo2077"
            rel="noopener noreferrer"
            target="_blank"
          >
            <Icon
              width="1.5rem"
              height="1.5rem"
              as={FiTwitter}
              color="brand.secondary"
              opacity={0.7}
              _hover={{
                opacity: 1,
                color: '#1DA1F2',
              }}
            />
          </a>
        </Box>
        <Box>
          <a
            href="http://linkedin.com/in/joaobispo2077"
            rel="noopener noreferrer"
            target="_blank"
          >
            <Icon
              width="1.5rem"
              height="1.5rem"
              as={FiLinkedin}
              color="brand.secondary"
              opacity={0.7}
              _hover={{
                opacity: 1,
                color: '#0A66C2',
              }}
            />
          </a>
        </Box>
        <Box>
          <a
            href="http://instagram.com/joaobispo2077"
            rel="noopener noreferrer"
            target="_blank"
          >
            <Icon
              width="1.5rem"
              height="1.5rem"
              as={FiInstagram}
              color="brand.secondary"
              opacity={0.7}
              _hover={{
                opacity: 1,
                color: '#E1306C',
              }}
            />
          </a>
        </Box>
      </HStack>
    </Box>
  );
};
