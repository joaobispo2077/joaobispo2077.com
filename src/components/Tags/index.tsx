import { FunctionComponent } from 'react';

import { Flex, FlexProps, Tag } from '@chakra-ui/react';

export type TagsProps = {
  tags?: string[];
} & FlexProps;

export const Tags: FunctionComponent<TagsProps> = ({ tags = [], ...rest }) => {
  return (
    <Flex
      width="100%"
      height="auto"
      gap=".75rem"
      flexWrap={'wrap'}
      marginTop="1rem"
      {...rest}
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
