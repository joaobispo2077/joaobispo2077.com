import { FunctionComponent } from 'react';

import { FiCalendar } from 'react-icons/fi';
import { Flex, Heading, Text, Link, Tag, Icon } from '@chakra-ui/react';
import NextLink from 'next/link';

import { formatDate } from '@src/utils/date';
import { useTranslation } from '@src/hooks/useTranslation';

import { Card } from '../Card';

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
      <NextLink href={`/blog/posts/${slug}`} passHref>
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

          <Flex
            width="100%"
            height="auto"
            gap=".75rem"
            flexWrap={'wrap'}
            marginTop="1rem"
          >
            {tags?.map((tag) => (
              <Tag
                size="md"
                key={tag}
                variant="solid"
                colorScheme={'whiteAlpha'}
                textTransform="lowercase"
              >
                {tag}
              </Tag>
            ))}
          </Flex>
        </Link>
      </NextLink>
    </Card>
  );
};
