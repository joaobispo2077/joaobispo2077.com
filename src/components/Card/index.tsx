import { FunctionComponent, ReactNode } from 'react';

import { Flex, FlexProps } from '@chakra-ui/react';

import { generateLinearGradient } from '@src/utils/generateGradient';

type CardProps = FlexProps & {
  children: ReactNode;
};

export const Card: FunctionComponent<CardProps> = ({ children, ...rest }) => {
  return (
    <Flex
      marginBottom="1.5rem"
      flexDirection="column"
      alignItems="start"
      width="100%"
      borderRadius="lg"
      padding="1rem"
      opacity="0.75"
      transition="background-color, opacity, transform 0.4s ease-in-out"
      _hover={{
        cursor: 'pointer',
        background: generateLinearGradient('hover', 'background'),
        transition: 'background-color, opacity, transform 0.2s ease-in-out',
        opacity: 1,
        transform: 'scale(1.025)',
      }}
      {...rest}
    >
      {children}
    </Flex>
  );
};
