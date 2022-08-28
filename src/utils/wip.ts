// posts

export const posts = [
  {
    id: '1',
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
  },
  {
    id: '2',
    title: 'JavaScript: Higher-order e First-class functions',
    description:
      'Existem 2 recursos que estão presentes no JavaScript que abrem um mar de possibilidades para a escrita de um código mais funcional...',
    url: 'https://medium.com/joaobispo2077/javascript-higher-order-e-first-class-functions-1e7b95f67547',
    createdAt: new Date('2021-07-01'),
    slug: 'javascript-higher-order-e-first-class-functions',
    tags: ['javascript', 'higher-order', 'first-class'],
  },
];

// {posts.map(({ title, description, createdAt, slug, tags }) => (
//   <PostCard
//     key={slug}
//     title={title}
//     description={description}
//     createdAt={createdAt}
//     slug={slug}
//     tags={tags}
//   />
// ))}
// post

export const post = {
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

export const codeString = `
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
