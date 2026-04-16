import fs from 'fs';
import path from 'path';

import matter from 'gray-matter';
import { marked } from 'marked';

import { Locale } from '@src/generated/graphql.blog';

const ARTICLES_DIR = path.join(process.cwd(), 'docs', 'articles');

export type PostMarkdownV2Meta = {
  title?: string;
  date?: string;
  tags?: string[];
  author?: string;
};

export type PostMarkdownV2 = {
  /** Full HTML body (from markdown after frontmatter). */
  html: string;
  /** Parsed YAML when present; empty object for frontmatter-less files. */
  meta: PostMarkdownV2Meta;
  /** True when the file had a `---` YAML block (even if empty). */
  hasYamlFrontmatter: boolean;
};

function candidatePaths(slug: string, locale: Locale): string[] {
  const paths: string[] = [];
  if (locale === Locale.PtBr) {
    paths.push(
      path.join(ARTICLES_DIR, `${slug}-pt-br.md`),
      path.join(ARTICLES_DIR, `${slug}-pt-br`),
    );
  }
  if (locale === Locale.En) {
    paths.push(
      path.join(ARTICLES_DIR, `${slug}-en-us.md`),
      path.join(ARTICLES_DIR, `${slug}-en-us`),
    );
  }
  paths.push(
    path.join(ARTICLES_DIR, `${slug}.md`),
    path.join(ARTICLES_DIR, slug),
  );
  return paths;
}

function firstExistingFile(paths: string[]): string | null {
  for (const p of paths) {
    try {
      if (fs.existsSync(p) && fs.statSync(p).isFile()) {
        return p;
      }
    } catch {
      // ignore
    }
  }
  return null;
}

function slugify(value: string): string {
  return value
    .trim()
    .replace(/\s+/g, '-')
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .replace(/[(),;:!?.'"`]/g, '')
    .replace(/-+/g, '-')
    .toLowerCase();
}

function getFileLocale(fileName: string): Locale | null {
  const normalized = fileName.toLowerCase();
  if (normalized.endsWith('-pt-br') || normalized.endsWith('-pt-br.md')) {
    return Locale.PtBr;
  }
  if (normalized.endsWith('-en-us') || normalized.endsWith('-en-us.md')) {
    return Locale.En;
  }
  return null;
}

function resolveByFrontmatterSlug(slug: string, locale: Locale): string | null {
  let files: string[] = [];
  try {
    files = fs
      .readdirSync(ARTICLES_DIR)
      .map((fileName) => path.join(ARTICLES_DIR, fileName))
      .filter((filePath) => fs.statSync(filePath).isFile());
  } catch {
    return null;
  }

  const localizedFiles = files.filter((filePath) => {
    const fileLocale = getFileLocale(path.basename(filePath));
    return fileLocale === null || fileLocale === locale;
  });

  for (const filePath of localizedFiles) {
    try {
      const raw = fs.readFileSync(filePath, 'utf8');
      const { data } = matter(raw);
      const title = String(data.Title ?? data.title ?? '').trim();
      if (title && slugify(title) === slug) {
        return filePath;
      }
    } catch {
      // ignore invalid markdown files
    }
  }

  return null;
}

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
    .replace(/<\/(p|div|section|article|h1|h2|h3|h4|h5|h6|li|ul|ol|pre|blockquote|tr|table|thead|tbody)>/gi, '\n')
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

function stripHtmlTags(value: string): string {
  return value.replace(/<[^>]+>/g, '');
}

function decodeBasicHtmlEntitiesForSlug(value: string): string {
  return value
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'");
}

function slugifyHeading(value: string): string {
  return decodeBasicHtmlEntitiesForSlug(stripHtmlTags(value))
    .trim()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

function addHeadingAnchors(html: string): string {
  const headingSlugCounter = new Map<string, number>();

  return html.replace(/<h([1-6])>([\s\S]*?)<\/h\1>/g, (_, level, text) => {
    const baseSlug = slugifyHeading(text);
    if (!baseSlug) {
      return `<h${level}>${text}</h${level}>`;
    }

    const currentCount = headingSlugCounter.get(baseSlug) ?? 0;
    const nextCount = currentCount + 1;
    headingSlugCounter.set(baseSlug, nextCount);

    const slug = currentCount === 0 ? baseSlug : `${baseSlug}-${nextCount}`;
    return `<h${level} id="${slug}"><a href="#${slug}">${text}</a></h${level}>`;
  });
}

function addReferenceAnchorsAndCitationLinks(html: string): string {
  const withReferenceIds = html.replace(
    /<li>\s*\[(\d+)\]\s*/g,
    '<li id="reference-$1">[$1] ',
  );

  return withReferenceIds.replace(/\[(\d+)\]/g, (_, referenceId: string) => {
    return `<a class="reference-link" href="#reference-${referenceId}" aria-label="Go to reference ${referenceId}">[${referenceId}]</a>`;
  });
}

export function parsePostMarkdown(raw: string): PostMarkdownV2 {
  const yamlPresent = hasFrontmatterBlock(raw);
  const { data, content } = matter(raw);
  const meta = normalizeMeta(data as Record<string, unknown>);

  marked.setOptions({
    gfm: true,
  });

  const html = addReferenceAnchorsAndCitationLinks(
    addHeadingAnchors(marked.parse(content.trim()) as string),
  );

  return {
    html,
    meta,
    hasYamlFrontmatter: yamlPresent,
  };
}

/**
 * Loads `docs/articles/{slug}` (or locale-specific / `.md` variants) and
 * converts markdown to HTML. Supports:
 * - YAML frontmatter (Title, Author, Date, Tags) + body with or without `##` headings
 * - No frontmatter: entire file is markdown; metadata comes from the CMS only
 */
export function loadPostMarkdown(slug: string, locale: Locale): PostMarkdownV2 | null {
  const filePath =
    firstExistingFile(candidatePaths(slug, locale)) ??
    resolveByFrontmatterSlug(slug, locale);
  if (!filePath) {
    return null;
  }

  const raw = fs.readFileSync(filePath, 'utf8');
  return parsePostMarkdown(raw);
}
