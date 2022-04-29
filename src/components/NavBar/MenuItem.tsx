import { FunctionComponent, ReactNode } from 'react';

import { Link, Text, TextProps } from '@chakra-ui/react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';

type MenuItemProps = TextProps & {
  href: string;
  children: ReactNode;
};

export const MenuItem: FunctionComponent<MenuItemProps> = ({
  children,
  href = '/',
  ...rest
}) => {
  const { asPath } = useRouter();

  const color = href === asPath ? 'brand.primary' : 'brand.secondary';

  return (
    <Text as="li" display="block" {...rest}>
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
    </Text>
  );
};
