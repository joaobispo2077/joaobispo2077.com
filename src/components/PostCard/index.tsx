import { FunctionComponent } from 'react';

import { FiCalendar } from 'react-icons/fi';
import { Flex, Heading, Text, Link, Tag, Icon } from '@chakra-ui/react';
import NextLink from 'next/link';

import { formatDate } from '@src/utils/date';
import { useTranslation } from '@src/hooks/useTranslation';

import { Card } from '../Card';
import { Tags } from '../Tags';

export type PostCardProps = {
  title: string;
  description: string;
  createdAt: Date;
  slug: string;
  tags?: string[];
};

export const PostCard: FunctionComponent<PostCardProps> = ({
  title,
  description,
  createdAt,
  slug,
  tags,
}) => {
  const { locale } = useTranslation();
  return (
    <Card>
      <NextLink href={`/blog/posts/${slug}`} passHref locale={locale}>
        <Link>
          <Heading
            as="h2"
            color="brand.primary"
            fontSize="xl"
            fontWeight="bold"
          >
            {title}
          </Heading>
          <Flex alignItems="center" marginTop=".5rem">
            <Icon
              width="1rem"
              height="1rem"
              name="calendar"
              color="brand.secondary"
              marginRight=".5rem"
              as={FiCalendar}
            />
            <Text fontSize="md" color="brand.secondary">
              {formatDate(createdAt, locale)}
            </Text>
          </Flex>
          <Text fontSize="lg" color="brand.secondary" marginTop=".75rem">
            {description}
          </Text>
          <Tags tags={tags} />
        </Link>
      </NextLink>
    </Card>
  );
};
