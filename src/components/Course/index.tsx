import { FunctionComponent } from 'react';

import { Flex, Link, Text, VStack } from '@chakra-ui/react';

export type CourseProps = {
  title: string;
  institution: string;
  startedAt: string;
  endedAt: string;
  location?: string | null;
  website?: string | null;
  degree?: string | null;
  time?: string;
};

export const Course: FunctionComponent<CourseProps> = ({
  title,
  startedAt,
  endedAt,
  institution,
  degree,
  website,
  time,
}) => {
  const courseWebsite = website
    ? `https://${String(institution).toLowerCase()}.com`
    : `https://www.google.com.br/search?q=${String(institution).toLowerCase()}`;

  return (
    <VStack key={title} as="li" width="100%" alignItems="flex-start">
      <Text as="p" fontSize="large" color="brand.primary" fontWeight="bold">
        {title}
      </Text>
      <Flex as="p" fontSize="medium" color="brand.secondary">
        <Link
          fontSize="medium"
          color="brand.primary"
          href={courseWebsite}
          target="_blank"
          rel="noopener noreferrer"
          textDecoration={'underline'}
          textUnderlineOffset={2}
          _hover={{
            opacity: 0.8,
            transition: 'opacity 0.2s ease-in-out',
          }}
        >
          {institution}
        </Link>
        <Text marginX="0.5rem">&bull;</Text>
        <Text as="p">{degree}</Text>
      </Flex>
      <Flex as="p" fontSize="medium" color="brand.secondary">
        <Text as="p">{startedAt}</Text>
        <Text marginX="0.5rem">&mdash;</Text>
        <Text as="p">{endedAt}</Text>
        <Text marginX="0.5rem">&bull;</Text>
        <Text as="p">{time}</Text>
      </Flex>
    </VStack>
  );
};
