import matter from 'gray-matter';
import { marked } from 'marked';

export type PostMarkdownV2Meta = {
  title?: string;
  date?: string;
  tags?: string[];
  author?: string;
};

export type PostMarkdownV2 = {
  html: string;
  meta: PostMarkdownV2Meta;
  hasYamlFrontmatter: boolean;
};

function normalizeMeta(data: Record<string, unknown>): PostMarkdownV2Meta {
  const title = (data.Title ?? data.title) as string | undefined;
  const author = (data.Author ?? data.author) as string | undefined;
  const rawDate = data.Date ?? data.date;
  const date =
    rawDate instanceof Date
      ? rawDate.toISOString()
      : typeof rawDate === 'string'
        ? rawDate
        : undefined;
  const tagsRaw = data.Tags ?? data.tags;
  let tags: string[] | undefined;
  if (typeof tagsRaw === 'string') {
    tags = tagsRaw
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);
  } else if (Array.isArray(tagsRaw)) {
    tags = tagsRaw.map(String);
  }

  const meta: PostMarkdownV2Meta = {};
  if (typeof title === 'string') {
    meta.title = title;
  }
  if (typeof author === 'string') {
    meta.author = author;
  }
  if (typeof date === 'string') {
    meta.date = date;
  }
  if (Array.isArray(tags)) {
    meta.tags = tags;
  }

  return meta;
}

export function hasFrontmatterBlock(raw: string): boolean {
  const trimmed = raw.trimStart();
  return trimmed.startsWith('---');
}

function decodeBasicHtmlEntities(content: string): string {
  return content
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'");
}

export function normalizeCmsHtmlToText(content: string): string {
  return decodeBasicHtmlEntities(content)
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(
      /<\/(p|div|section|article|h1|h2|h3|h4|h5|h6|li|ul|ol|pre|blockquote|tr|table|thead|tbody)>/gi,
      '\n',
    )
    .replace(/<li[^>]*>/gi, '- ')
    .replace(/<[^>]+>/g, '')
    .replace(/\r/g, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

export function looksLikeMarkdown(content: string): boolean {
  return /(^|\n)#{1,6}\s+|(^|\n)```|(^|\n)\|.+\|.*\n\|[:\-\s|]+\||(^|\n)\d+\.\s+|(^|\n)[-*]\s+/.test(
    content,
  );
}

export function parsePostMarkdown(raw: string): PostMarkdownV2 {
  const yamlPresent = hasFrontmatterBlock(raw);
  const { data, content } = matter(raw);
  const meta = normalizeMeta(data as Record<string, unknown>);

  marked.setOptions({ gfm: true });
  const html = marked.parse(content.trim()) as string;

  return { html, meta, hasYamlFrontmatter: yamlPresent };
}
