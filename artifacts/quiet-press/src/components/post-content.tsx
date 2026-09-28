import { Check, Copy } from 'lucide-react';
import type { ReactNode } from 'react';
import { useState } from 'react';
import type { ContentBlock, InlinePart } from '@/data/posts';

function InlineText({ parts }: { parts: InlinePart[] }) {
  return (
    <>
      {parts.map((part, index) => {
        if (part.type === 'em') return <em key={`${part.type}-${index}`}>{part.value}</em>;
        if (part.type === 'strong') return <strong key={`${part.type}-${index}`}>{part.value}</strong>;
        if (part.type === 'code') return <code key={`${part.type}-${index}`} className="inline-code">{part.value}</code>;
        return <span key={`${part.type}-${index}`}>{part.value}</span>;
      })}
    </>
  );
}

function CodeBlock({ block }: { block: Extract<ContentBlock, { type: 'code' }> }) {
  const [copied, setCopied] = useState(false);
  async function copyCode() {
    await navigator.clipboard?.writeText(block.value);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  }
  return (
    <div className="code-frame my-9 overflow-hidden border border-border bg-[#f6f9fc] text-[#334155] shadow-[3px_3px_0_hsl(var(--primary)/.08)]">
      <div className="flex items-center justify-between border-b border-border px-4 py-2.5 text-[10px] uppercase tracking-[.15em] text-muted-foreground">
        <span className="font-code">{block.filename ?? 'example'}</span>
        <span className="flex items-center gap-3">
          <span>{block.language}</span>
          <button type="button" onClick={copyCode} className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground" data-testid="button-copy-code">
            {copied ? <Check size={13} /> : <Copy size={13} />}
            {copied ? 'Copied' : 'Copy'}
          </button>
        </span>
      </div>
      <pre className="overflow-x-auto px-5 py-5 text-[12px] leading-[1.8] sm:px-7 sm:text-[13px]"><code>{block.value}</code></pre>
    </div>
  );
}

type MarkdownBlock =
  | { type: 'paragraph'; value: string }
  | { type: 'heading'; level: number; value: string }
  | { type: 'quote'; value: string }
  | { type: 'unordered-list'; items: string[] }
  | { type: 'ordered-list'; items: string[] }
  | { type: 'code'; language: string; value: string }
  | { type: 'rule' };

function slugifyHeading(value: string) {
  const slug = value
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  return slug || 'section';
}

function nextHeadingId(value: string, prefix: string | undefined, counts: Map<string, number>) {
  const base = slugifyHeading(value);
  const count = counts.get(base) ?? 0;
  counts.set(base, count + 1);
  return `${prefix ? `${prefix}-` : ''}${base}${count > 0 ? `-${count + 1}` : ''}`;
}

function HeadingAnchor({ level, id, children }: { level: number; id: string; children: ReactNode }) {
  const Heading = level === 1 || level === 2 ? 'h2' : 'h3';
  return (
    <Heading id={id} className="group/heading scroll-mt-8">
      <a href={`#${id}`} className="heading-anchor">
        {children}
        <span aria-hidden="true" className="heading-anchor-mark">#</span>
      </a>
    </Heading>
  );
}

function isBlockStart(line: string) {
  const candidate = line.trimStart();
  return (
    /^(#{1,6})\s+/.test(candidate) ||
    /^(```+|~~~+)/.test(candidate) ||
    /^>\s?/.test(candidate) ||
    /^[-*+](?:\s+|(?=\S))/.test(candidate) ||
    /^\d+[.)]\s+/.test(candidate) ||
    /^([-*_])(?:\s*\1){2,}\s*$/.test(candidate)
  );
}

function parseMarkdown(markdown: string): MarkdownBlock[] {
  const lines = markdown.replace(/\r\n?/g, '\n').split('\n');
  const blocks: MarkdownBlock[] = [];
  let index = 0;

  while (index < lines.length) {
    const line = lines[index];
    const candidate = line.trimStart();
    if (!line.trim()) {
      index += 1;
      continue;
    }

    const fence = candidate.match(/^(```+|~~~+)\s*([\w-]+)?\s*$/);
    if (fence) {
      const marker = fence[1];
      const codeLines: string[] = [];
      index += 1;
      while (index < lines.length && !new RegExp(`^${marker}`).test(lines[index].trimStart())) {
        codeLines.push(lines[index]);
        index += 1;
      }
      if (index < lines.length) index += 1;
      blocks.push({ type: 'code', language: fence[2] ?? '', value: codeLines.join('\n') });
      continue;
    }

    const headingMatch = candidate.match(/^(#{1,6})\s+(.+?)\s*#*\s*$/);
    if (headingMatch) {
      blocks.push({ type: 'heading', level: headingMatch[1].length, value: headingMatch[2] });
      index += 1;
      continue;
    }

    if (/^([-*_])(?:\s*\1){2,}\s*$/.test(candidate)) {
      blocks.push({ type: 'rule' });
      index += 1;
      continue;
    }

    if (/^>\s?/.test(candidate)) {
      const quoteLines: string[] = [];
      while (index < lines.length && /^>\s?/.test(lines[index].trimStart())) {
        quoteLines.push(lines[index].trimStart().replace(/^>\s?/, '').trim());
        index += 1;
      }
      blocks.push({ type: 'quote', value: quoteLines.join(' ') });
      continue;
    }

    const unorderedMatch = candidate.match(/^[-*+](?:\s+|(?=\S))(.+)/);
    if (unorderedMatch) {
      const items: string[] = [];
      while (index < lines.length) {
        const itemMatch = lines[index].trimStart().match(/^[-*+](?:\s+|(?=\S))(.+)/);
        if (!itemMatch) break;
        items.push(itemMatch[1]);
        index += 1;
      }
      blocks.push({ type: 'unordered-list', items });
      continue;
    }

    const orderedMatch = candidate.match(/^\d+[.)]\s+(.+)/);
    if (orderedMatch) {
      const items: string[] = [];
      while (index < lines.length) {
        const itemMatch = lines[index].trimStart().match(/^\d+[.)]\s+(.+)/);
        if (!itemMatch) break;
        items.push(itemMatch[1]);
        index += 1;
      }
      blocks.push({ type: 'ordered-list', items });
      continue;
    }

    const paragraphLines = [line.trim()];
    index += 1;
    while (index < lines.length && lines[index].trim() && !isBlockStart(lines[index])) {
      paragraphLines.push(lines[index].trim());
      index += 1;
    }
    blocks.push({ type: 'paragraph', value: paragraphLines.join(' ') });
  }

  return blocks;
}

function safeHref(href: string) {
  return /^(https?:|mailto:|\/|#)/i.test(href);
}

function renderInline(value: string, keyPrefix: string): ReactNode[] {
  const tokenPattern = /(`[^`\n]+`|\[[^\]]+\]\(([^)\s]+)(?:\s+["'][^"']*["'])?\)|\*\*[^*\n]+\*\*|__[^_\n]+__|\*[^*\n]+\*|_[^_\n]+_)/g;
  const parts: ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = tokenPattern.exec(value))) {
    if (match.index > lastIndex) parts.push(value.slice(lastIndex, match.index));
    const token = match[0];
    const key = `${keyPrefix}-${match.index}`;
    if (token.startsWith('`')) {
      parts.push(<code key={key} className="inline-code">{token.slice(1, -1)}</code>);
    } else if (token.startsWith('[')) {
      const linkText = token.match(/^\[([^\]]+)\]/)?.[1] ?? token;
      const href = match[2] ?? '#';
      parts.push(safeHref(href) ? <a key={key} href={href} target="_blank" rel="noreferrer">{renderInline(linkText, key)}</a> : linkText);
    } else if (token.startsWith('**') || token.startsWith('__')) {
      parts.push(<strong key={key}>{renderInline(token.slice(2, -2), key)}</strong>);
    } else {
      parts.push(<em key={key}>{renderInline(token.slice(1, -1), key)}</em>);
    }
    lastIndex = match.index + token.length;
  }

  if (lastIndex < value.length) parts.push(value.slice(lastIndex));
  return parts;
}

function MarkdownContent({ markdown, anchorPrefix }: { markdown: string; anchorPrefix?: string }) {
  const blocks = parseMarkdown(markdown);
  const headingCounts = new Map<string, number>();
  return (
    <div className="article-copy">
      {blocks.map((block, index) => {
        const key = `markdown-${block.type}-${index}`;
        if (block.type === 'paragraph') return <p key={key}>{renderInline(block.value, key)}</p>;
        if (block.type === 'heading') {
          const id = nextHeadingId(block.value, anchorPrefix, headingCounts);
          return <HeadingAnchor key={key} level={block.level} id={id}>{renderInline(block.value, key)}</HeadingAnchor>;
        }
        if (block.type === 'quote') return <blockquote key={key}><p>{renderInline(block.value, key)}</p></blockquote>;
        if (block.type === 'unordered-list') return <ul key={key}>{block.items.map((item, itemIndex) => <li key={`${key}-${itemIndex}`}>{renderInline(item, `${key}-${itemIndex}`)}</li>)}</ul>;
        if (block.type === 'ordered-list') return <ol key={key}>{block.items.map((item, itemIndex) => <li key={`${key}-${itemIndex}`}>{renderInline(item, `${key}-${itemIndex}`)}</li>)}</ol>;
        if (block.type === 'rule') return <hr key={key} />;
        return <CodeBlock key={key} block={{ type: 'code', language: block.language || 'text', value: block.value }} />;
      })}
    </div>
  );
}

export function PostContent({ content, markdown, anchorPrefix }: { content?: ContentBlock[]; markdown?: string; anchorPrefix?: string }) {
  if (markdown !== undefined) return <MarkdownContent markdown={markdown} anchorPrefix={anchorPrefix} />;
  if (!content) return null;
  const headingCounts = new Map<string, number>();
  return (
    <div className="article-copy">
      {content.map((block, index) => {
        if (block.type === 'paragraph') return <p key={`paragraph-${index}`}><InlineText parts={block.parts} /></p>;
        if (block.type === 'heading') {
          const id = nextHeadingId(block.value, anchorPrefix, headingCounts);
          return <HeadingAnchor key={`heading-${index}`} level={2} id={id}>{block.value}</HeadingAnchor>;
        }
        if (block.type === 'quote') return <blockquote key={`quote-${index}`}><p>{block.value}</p>{block.cite && <cite>— {block.cite}</cite>}</blockquote>;
        if (block.type === 'list') return <ul key={`list-${index}`}>{block.items.map((item) => <li key={item}>{item}</li>)}</ul>;
        return <CodeBlock key={`code-${index}`} block={block} />;
      })}
    </div>
  );
}
