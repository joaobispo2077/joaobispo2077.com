import { useEffect, useState } from 'react';

import {
  Flex,
  Heading,
  Icon,
  IconButton,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { FiCalendar, FiShare2, FiClock } from 'react-icons/fi';
import { useRouter } from 'next/router';

import { useTranslation } from '@src/hooks/useTranslation';
import {
  estimateReadTime,
  formatDate,
  getRevalidateInDays,
} from '@src/utils/date';
import { ContentManagementClient } from '@src/services/ContentManagementClient';
import { serverSideCache } from '@src/services/ServerSideCache';
import { PostDocument, usePostQuery } from '@src/generated/graphql.blog';
import { Content } from '@src/styles/poststyles';
import { SEO } from '@src/components/SEO';
import { Tags } from '@src/components/Tags';
import { parseLocaleToGraphCmsLocale } from '@src/utils/parseLocale';
import { ShareSocialMediaModal } from '@src/components/ShareSocialMedia';
import {
  hasFrontmatterBlock,
  looksLikeMarkdown,
  normalizeCmsHtmlToText,
  parsePostMarkdown,
  type PostMarkdownV2,
} from '@src/utils/postMarkdownParser';

export type PostPageProps = {
  markdownV2FromCms: PostMarkdownV2 | null;
};

const stripHtml = (html: string) => html.replace(/<[^>]*>/g, '');
const hasHtmlTags = (content: string) => /<[^>]+>/.test(content);
const stripRenderedFrontmatterFromHtml = (html: string) => {
  const renderedFrontmatterRegex =
    /^\s*<p>\s*---\s*<\/p>[\s\S]*?<p>\s*---\s*<\/p>\s*/i;
  return html.replace(renderedFrontmatterRegex, '');
};

const PostPage: NextPage<PostPageProps> = ({ markdownV2FromCms }) => {
  const { graphCmsLocale } = useTranslation();

  const router = useRouter();
  const { slug } = router.query;

  const [{ data }] = usePostQuery({
    variables: {
      slug: slug as string,
      locale: graphCmsLocale,
    },
  });

  const { locale } = useTranslation();
  const [useScrollProgress, setUseScrollProgres] = useState(0);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const postUrl = global.window ? window.location?.href : '';

  const post = data?.post;
  const markdownSource = markdownV2FromCms;
  const fallbackContentHtml = stripRenderedFrontmatterFromHtml(
    post?.content.html ?? '',
  );
  const contentHtml = markdownSource?.html ?? fallbackContentHtml;
  const title = markdownSource?.meta.title ?? post?.title ?? '';
  const tags = markdownSource?.meta.tags ?? post?.tags ?? [];
  const dateSource = markdownSource?.meta.date ?? post?.date;
  const publishedAt = new Date(dateSource ?? new Date()).toISOString();

  const coverImage =
    post?.seo?.image?.url ?? '/assets/icons/lightning.png';
  const canonicalPath = `/blog/posts/${slug}`; // keep leading slash

  // TODO: ADD image={post?.coverImage?.coverImagePost[0]?.coverImage?.url} post image in future
  const readTime = estimateReadTime(contentHtml);
  const seoDescription =
    post?.excerpt?.trim() ||
    (contentHtml ? stripHtml(contentHtml).slice(0, 280).trim() : '');

  const progressReading = () => {
    const scrollTop = document?.documentElement?.scrollTop;
    const viewHeight =
      document?.documentElement?.scrollHeight -
      document?.documentElement?.clientHeight;
    const progress = (scrollTop / viewHeight) * 100;
    setUseScrollProgres(progress);
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // prevents a hydration mismatch when Next.js renders on the server.
      window?.addEventListener('scroll', progressReading);
      return () => window?.removeEventListener('scroll', progressReading);
    }
  }, []);

  return (
    <Flex
      as="main"
      background="brand.background"
      width="100%"
      minHeight="calc(100vh - 8rem)"
      flexDirection="column"
      paddingTop={[4, 8]}
      paddingX={'1.75rem'}
    >
      <SEO
        title={title}
        description={seoDescription}
        image={coverImage}
        url={canonicalPath}
        publishedTime={publishedAt}
        modifiedTime={publishedAt}
        type="article"
        locale={locale === 'pt-br' ? 'pt_BR' : 'en_US'}
      />
      <Flex
        position="fixed"
        top="0"
        left="0"
        width={`${useScrollProgress}%`}
        height="0.25rem"
        bgGradient="linear(to-r, cyan.400, purple.500)"
        zIndex="999"
      />
      <Heading color="brand.primary" fontWeight={900}>
        {title}
      </Heading>
      <Tags tags={tags} />
      <Flex gap="2rem" marginTop={'2rem'} justifyContent={'space-between'}>
        <Flex gap="2rem">
          <Flex alignItems="center" gap="1rem">
            <Icon
              as={FiCalendar}
              w={6}
              h={6}
              color="brand.secondary"
              background="brand.background"
              transition="opacity 0.3s ease"
              // opacity={showTopLine ? 1 : 0}
            />
            <Text as="span" color="brand.secondary" aria-label="Posted at">
              {formatDate(dateSource ?? new Date(), locale)}
            </Text>
          </Flex>
          <Flex alignItems="center" gap="1rem">
            <Icon
              as={FiClock}
              w={6}
              h={6}
              color="brand.secondary"
              background="brand.background"
            />
            <Text as="span" color="brand.secondary" arial-label="Reading time">
              {readTime} min
            </Text>
          </Flex>
        </Flex>

        <Flex alignItems="center" gap="1rem">
          <IconButton
            aria-label="Share post"
            icon={<FiShare2 color="brand.secondary" size={24} />}
            color="brand.secondary"
            variant="link"
            onClick={onOpen}
            transition="all 0.2s"
            _hover={{ color: 'brand.yellow' }}
          />
          <ShareSocialMediaModal
            content={postUrl}
            isOpen={isOpen}
            onClose={onClose}
          />
        </Flex>
      </Flex>
      <Content
        dangerouslySetInnerHTML={{
          __html: contentHtml,
        }}
      />
    </Flex>
  );
};

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps<PostPageProps> = async (
  context,
) => {
  const { slug } = context.params || {};
  const locale = parseLocaleToGraphCmsLocale(context.locale);

  const postResult = await ContentManagementClient.query(PostDocument, {
    slug,
    locale,
  }).toPromise();
  if (process.env.NODE_ENV !== 'production') {
    const preview = (postResult.data?.post?.content?.html ?? '')
      .replace(/\s+/g, ' ')
      .slice(0, 800);
    // Temporary debug log for CMS payload shape while validating V2 parsing.
    // Remove after confirming final CMS format.
    console.log('[blog-post-debug]', {
      slug,
      locale,
      title: postResult.data?.post?.title ?? null,
      contentPreview: preview,
    });
  }
  const cmsContent = postResult.data?.post?.content?.html ?? '';
  const normalizedCmsText = normalizeCmsHtmlToText(cmsContent);
  const hasRawFrontmatter =
    hasFrontmatterBlock(cmsContent) || hasFrontmatterBlock(normalizedCmsText);
  const shouldParseMarkdown =
    hasRawFrontmatter ||
    (!hasHtmlTags(cmsContent) && looksLikeMarkdown(normalizedCmsText));
  const markdownV2FromCms =
    typeof cmsContent === 'string' &&
    shouldParseMarkdown
      ? parsePostMarkdown(
          hasFrontmatterBlock(cmsContent) ? cmsContent : normalizedCmsText,
        )
      : null;

  return {
    props: {
      urqlState: serverSideCache.extractData(),
      markdownV2FromCms,
    },
    revalidate: getRevalidateInDays(7),
  };
};

export default PostPage;
