import { FunctionComponent } from 'react';

import { Link, Text, TextProps } from '@chakra-ui/react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';

type MenuItemProps = TextProps & {
  href: string;
  children: React.ReactNode;
};

export const MenuItem: FunctionComponent<MenuItemProps> = ({
  children,
  href = '/',
  ...rest
}) => {
  const { asPath } = useRouter();

  const color = href === asPath ? 'brand.yellow' : 'brand.secondary';

  return (
    <Text as="li" display="block" {...rest}>
      <NextLink href={href} passHref>
        <Link
          color={color}
          _hover={{
            color: 'brand.cyan',
            _activeLink: {
              color: 'brand.yellow',
            },
          }}
        >
          {children}
        </Link>
      </NextLink>
    </Text>
  );
};
