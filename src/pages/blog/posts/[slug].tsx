import { Flex } from '@chakra-ui/react';
import { NextPage } from 'next';

const PostPage: NextPage = () => {
  return (
    <Flex
      as="main"
      background="brand.background"
      width="100%"
      minHeight="calc(100vh - 8rem)"
      flexDirection="column"
      paddingTop={[4, 16]}
      paddingX={'1rem'}
    ></Flex>
  );
};

export default PostPage;
