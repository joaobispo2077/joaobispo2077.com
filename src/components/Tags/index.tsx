import { FunctionComponent } from 'react';

import { Flex, Tag } from '@chakra-ui/react';

export type TagsProps = {
  tags?: string[];
};

export const Tags: FunctionComponent<TagsProps> = ({ tags = [] }) => {
  return (
    <Flex
      width="100%"
      height="auto"
      gap=".75rem"
      flexWrap={'wrap'}
      marginTop="1rem"
    >
      {tags.map((tag) => (
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
  );
};
