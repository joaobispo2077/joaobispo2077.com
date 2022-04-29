import { FunctionComponent, ReactNode } from 'react';

import { Link, Text, TextProps } from '@chakra-ui/react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';

import { AnimatedUnderline } from '../AnimatedUnderline';

type MenuItemProps = TextProps & {
  href: string;
  children: ReactNode;
  isSelected?: boolean;
};

export const MenuItem: FunctionComponent<MenuItemProps> = ({
  children,
  href = '/',
  isSelected = false,
  ...rest
}) => {
  const { asPath } = useRouter();

  const isActive = href === asPath;
  const color = isActive ? 'brand.primary' : 'brand.secondary';

  return (
    <Text as="li" display="block" {...rest} position="relative">
      <NextLink href={href} passHref>
        <Link
          color={color}
          _hover={{
            color: 'brand.primary',
            textDecoration: 'underline',
          }}
        >
          {children}
        </Link>
      </NextLink>
      {(isSelected || isActive) && <AnimatedUnderline />}
    </Text>
  );
};
