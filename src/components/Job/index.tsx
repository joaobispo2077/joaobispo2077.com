import { FunctionComponent } from 'react';

import { Flex, Link, Text, VStack } from '@chakra-ui/react';

export type JobProps = {
  role: string;
  company: string;
  location: string;
  startedAt: string;
  endedAt: string;
  website?: string;
  contract?: string;
  time?: string;
};

export const Job: FunctionComponent<JobProps> = ({
  role,
  startedAt,
  endedAt,
  company,
  location,
  website,
  time,
}) => {
  return (
    <VStack key={role} as="li" width="100%" alignItems="flex-start">
      <Text as="p" fontSize="large" color="brand.primary" fontWeight="bold">
        {role}
      </Text>
      <Flex as="p" fontSize="medium" color="brand.secondary">
        <Link
          fontSize="medium"
          color="brand.primary"
          href={website || `https://${String(company).toLowerCase()}.com`}
          target="_blank"
          rel="noopener noreferrer"
          textDecoration={'underline'}
          textUnderlineOffset={2}
          _hover={{
            opacity: 0.8,
            transition: 'opacity 0.2s ease-in-out',
          }}
        >
          {company}
        </Link>
        <Text marginX="0.5rem">&bull;</Text>
        <Text as="p">{location}</Text>
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
