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
      _hover={{
        cursor: 'pointer',
        background: generateLinearGradient('hover', 'background'),
        transition: 'all 0.4s ease-in-out',
        opacity: 1,
      }}
      transition="all 1s ease-in-out"
      opacity="0.75"
      {...rest}
    >
      {children}
    </Flex>
  );
};
