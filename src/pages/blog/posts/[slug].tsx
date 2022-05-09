import { Box, Flex, Heading, HStack, Icon, Text } from '@chakra-ui/react';
import { NextPage } from 'next';
import { FiCalendar, FiUser } from 'react-icons/fi';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/hljs';

import { useTranslation } from '@src/hooks/useTranslation';
import { formatDate } from '@src/utils/date';

const PostPage: NextPage = () => {
  const { locale } = useTranslation();

  const post = {
    id: '1',
    author: {
      name: 'João Bispo',
      avatar: 'https://github.com/joaobispo2077.png',
    },
    title:
      'Customizando o terminal do jeito que eu gosto: Terminal no MacOS com Oh My Zsh, Powerlevel10k, iTerm2, Dracula, Plugins e mais',
    description:
      'Eu estou usando uma máquina nova apenas com os meus profiles configurados e quase nenhuma customização...',
    url: 'https://blog.chakra-ui.com',
    createdAt: new Date('2020-07-01'),
    slug: 'customizing-terminal',
    tags: [
      'terminal',
      'macos',
      'oh-my-zsh',
      'powerlevel10k',
      'iterm2',
      'dracula',
      'plugins',
    ],
  };

  const codeString = `
  import { Flex, Heading, HStack, Icon, Text } from '@chakra-ui/react';
  import { NextPage } from 'next';
  import { FiCalendar, FiUser } from 'react-icons/fi';

  import { useTranslation } from '@src/hooks/useTranslation';
  import { formatDate } from '@src/utils/date';

  const PostPage: NextPage = () => {
    const { locale } = useTranslation();

    const post = {
      id: '1',
      author: {
        name: 'João Bispo',
        avatar: 'https://github.com/joaobispo2077.png',
      },
      title:
        'Customizando o terminal do jeito que eu gosto: Terminal no MacOS com Oh My Zsh, Powerlevel10k, iTerm2, Dracula, Plugins e mais',
      description:
        'Eu estou usando uma máquina nova apenas com os meus profiles configurados e quase nenhuma customização...',
      url: 'https://blog.chakra-ui.com',
      createdAt: new Date('2020-07-01'),
      slug: 'customizing-terminal',
      tags: [
        'terminal',
        'macos',
        'oh-my-zsh',
        'powerlevel10k',
        'iterm2',
        'dracula',
        'plugins',
      ],
    };

    return (
      <Flex
        as="main"
        background="brand.background"
        width="100%"
        minHeight="calc(100vh - 8rem)"
        flexDirection="column"
        paddingTop={[4, 16]}
        paddingX={'1rem'}
      >
        <Heading color="brand.primary">{post.title}</Heading>
        <HStack spacing="2rem" marginTop={'2rem'}>
          <Flex alignItems="center" gap="1rem">
            <Icon as={FiCalendar} w={6} h={6} color="brand.secondary" />
            <Text as="span" color="brand.secondary">
              {formatDate(post.createdAt, locale)}
            </Text>
          </Flex>
          <Flex alignItems="center" gap="1rem">
            <Icon as={FiUser} w={6} h={6} color="brand.secondary" />
            <Text as="span" color="brand.secondary">
              {post.author.name ?? 'João Bispo'}
            </Text>
          </Flex>
        </HStack>
      </Flex>
    );
  };

  export default PostPage;

  `;

  return (
    <Flex
      as="main"
      background="brand.background"
      width="100%"
      minHeight="calc(100vh - 8rem)"
      flexDirection="column"
      paddingTop={[4, 16]}
      paddingX={'1rem'}
    >
      <Heading color="brand.primary">{post.title}</Heading>
      <HStack spacing="2rem" marginTop={'2rem'}>
        <Flex alignItems="center" gap="1rem">
          <Icon as={FiCalendar} w={6} h={6} color="brand.secondary" />
          <Text as="span" color="brand.secondary">
            {formatDate(post.createdAt, locale)}
          </Text>
        </Flex>
        <Flex alignItems="center" gap="1rem">
          <Icon as={FiUser} w={6} h={6} color="brand.secondary" />
          <Text as="span" color="brand.secondary">
            {post.author.name ?? 'João Bispo'}
          </Text>
        </Flex>
      </HStack>
      <Box borderRadius={8} overflow="hidden">
        <SyntaxHighlighter language={''} style={dracula}>
          {codeString}
        </SyntaxHighlighter>
      </Box>
    </Flex>
  );
};

export default PostPage;
