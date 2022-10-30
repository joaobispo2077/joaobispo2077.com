import type { NextPage } from 'next';

import { useEffect } from 'react';

import { Box, Flex, Heading, Text } from '@chakra-ui/react';
import { motion } from 'framer-motion';

import { generateTextLinearGradient } from '@src/utils/generateGradient';
import { SEO } from '@src/components/SEO';
import { KanbanBoard } from '@src/components/Kanban';
import { useShell } from '@src/hooks/useShell';
import { Image } from '@src/components/Image';

export const PAGE_SLUG = 'roadmap';

const RoadmapPage: NextPage = () => {
  const { setBeforeFooterComponent } = useShell();

  useEffect(() => {
    setBeforeFooterComponent(
      <>
        <motion.div
          initial={{ height: '100vh' }}
          animate={{ height: '100%' }}
          transition={{ duration: 0.5 }}
          style={{
            overflow: 'auto',
            width: '100%',
          }}
        >
          <Flex
            as="section"
            marginTop="1.5rem"
            overflowX={'auto'}
            width="100%"
            direction="column"
            justifyContent="center"
            alignItems="center"
            paddingX="1rem"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5 }}
              style={{
                overflow: 'auto',
                width: '100%',
              }}
            >
              <KanbanBoard />
            </motion.div>
          </Flex>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 3 }}
        >
          <Flex
            as="section"
            marginTop="1.5rem"
            overflowX={'auto'}
            width="100%"
            direction="column"
            justifyContent="center"
            alignItems="center"
            paddingX="1rem"
          >
            <Heading
              as="h1"
              fontSize="5xl"
              color="brand.primary"
              {...generateTextLinearGradient('background', 'orange')}
              whiteSpace="pre-wrap"
              wordBreak={'break-word'}
            >
              Matriz de Eisenhower
            </Heading>
            <Image
              priority={true}
              src="https://lh3.googleusercontent.com/dch2B4a5V9zpXzv01YbI9prVfYlOhBFfO6Go2hWXEiKC3R7eQhUrr5RFM550AFPdDN5tG56b3lRIz2rl8ZHVH9TPF4ojRkKPjB7cS-gEzOZl1l285dXkqR1-0QoyWeKqwlZPLq4"
              alt="A matriz de Eisenhower é uma ferramenta de gestão de tempo que ajuda a
          priorizar as tarefas de acordo com a importância e urgência. A matriz
          foi criada pelo general americano Dwight D. Eisenhower, que usava-a
          para priorizar as tarefas do seu dia a dia."
              title="Matriz de Eisenhower"
              maxWidth={800}
              maxHeight={800}
              minWidth={300}
              minHeight={300}
              width={320}
              height={320}
              borderRadius={8}
              flexShrink={0}
              flex={1}
            />
            <Text
              color="brand.secondary"
              fontSize="xl"
              marginTop="1rem"
              maxWidth={800}
              maxHeight={800}
              marginBottom="5rem"
            >
              A matriz de Eisenhower é uma ferramenta de gestão de tempo que
              ajuda a priorizar as tarefas de acordo com a importância e
              urgência. A matriz foi criada pelo general americano Dwight D.
              Eisenhower, que usava-a para priorizar as tarefas do seu dia a
              dia.
            </Text>
          </Flex>
        </motion.div>
      </>,
    );

    return () => {
      setBeforeFooterComponent(null);
    };
  }, [setBeforeFooterComponent]);

  return (
    <Flex
      as="main"
      background="brand.background"
      width="100%"
      flexDirection="column"
      paddingTop={[4, 16]}
      paddingX={'1rem'}
    >
      <SEO
        // title={page?.seo?.title ?? aboutTranslation.seoTitle}
        // description={page?.seo?.description ?? aboutTranslation.seoDescription}
        // image={page?.seo?.image?.url ?? ''}
        url="/roadmap"
      />
      <Flex width="100%" minHeight="4rem" justifyContent="flex-start">
        <Heading
          as="h1"
          fontSize="5xl"
          color="brand.primary"
          {...generateTextLinearGradient('yellow', 'red')}
          whiteSpace="pre-wrap"
          wordBreak={'break-word'}
        >
          {/* {page?.title ?? aboutTranslation.title} */}
          Higher. Further. Faster.
        </Heading>
      </Flex>
      <Box display="none" visibility={'hidden'}>
        <Flex
          as="section"
          flexDirection="column"
          marginTop="1.5rem"
          overflowX={'auto'}
          width="100%"
        >
          <KanbanBoard />
        </Flex>

        <Flex
          as="section"
          marginTop="1.5rem"
          overflowX={'auto'}
          width="100%"
          direction="column"
          justifyContent="center"
          alignItems="center"
          paddingX="1rem"
        >
          <Heading
            as="h1"
            fontSize="5xl"
            color="brand.primary"
            {...generateTextLinearGradient('background', 'orange')}
            whiteSpace="pre-wrap"
            wordBreak={'break-word'}
          >
            Matriz de Eisenhower
          </Heading>
          <Image
            priority={true}
            src="https://lh3.googleusercontent.com/dch2B4a5V9zpXzv01YbI9prVfYlOhBFfO6Go2hWXEiKC3R7eQhUrr5RFM550AFPdDN5tG56b3lRIz2rl8ZHVH9TPF4ojRkKPjB7cS-gEzOZl1l285dXkqR1-0QoyWeKqwlZPLq4"
            alt="A matriz de Eisenhower é uma ferramenta de gestão de tempo que ajuda a
          priorizar as tarefas de acordo com a importância e urgência. A matriz
          foi criada pelo general americano Dwight D. Eisenhower, que usava-a
          para priorizar as tarefas do seu dia a dia."
            title="Matriz de Eisenhower"
            maxWidth={800}
            maxHeight={800}
            minWidth={300}
            minHeight={300}
            width={320}
            height={320}
            borderRadius={8}
            flexShrink={0}
            flex={1}
          />
          <Text
            color="brand.secondary"
            fontSize="xl"
            marginTop="1rem"
            maxWidth={800}
            maxHeight={800}
          >
            A matriz de Eisenhower é uma ferramenta de gestão de tempo que ajuda
            a priorizar as tarefas de acordo com a importância e urgência. A
            matriz foi criada pelo general americano Dwight D. Eisenhower, que
            usava-a para priorizar as tarefas do seu dia a dia.
          </Text>
        </Flex>
      </Box>
    </Flex>
  );
};

export default RoadmapPage;
