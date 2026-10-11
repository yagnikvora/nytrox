import Image from "next/image";
import Link from "next/link";
import { Fragment, type ReactNode } from "react";
import type { BodyBlock, TextBlock } from "../../data/blog";
import { sanityImage } from "../../data/sanity";

/*
 * Renders a post's body - Sanity's Portable Text, as edited in the Studio
 * (the `body` field in studio/schemaTypes/post.ts). It handles exactly what
 * that field allows: paragraphs, H2/H3, quotes, bullet and numbered lists,
 * bold / italic / code / links, images, and code blocks. Add a style or a
 * block type there and it needs a case here; anything unrecognised is skipped
 * rather than breaking the page.
 */

const plainText = (block: TextBlock) => block.children.map((child) => child.text).join("");

/** "What to get right before launch" -> "what-to-get-right-before-launch" */
const slugify = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

export type Heading = { id: string; text: string };

/**
 * An id for every H2 and H3, keyed by block. Taken from the heading's text,
 * with a suffix when two headings would otherwise share one.
 */
function headingIds(body: BodyBlock[]) {
  const ids = new Map<string, string>();
  const seen = new Map<string, number>();
  for (const block of body) {
    if (block._type !== "block" || (block.style !== "h2" && block.style !== "h3")) continue;
    const base = slugify(plainText(block)) || "section";
    const count = seen.get(base) ?? 0;
    seen.set(base, count + 1);
    ids.set(block._key, count ? `${base}-${count + 1}` : base);
  }
  return ids;
}

/** The post's H2s, for the "On this page" links. */
export function headingsOf(body: BodyBlock[]): Heading[] {
  const ids = headingIds(body);
  return body.flatMap((block) =>
    block._type === "block" && block.style === "h2"
      ? [{ id: ids.get(block._key)!, text: plainText(block) }]
      : []
  );
}

/** Only addresses a link should be able to carry - never `javascript:`. */
const SAFE_HREF = /^(https?:\/\/|mailto:|tel:|\/|#)/;

const LINK = "font-medium text-violet-300 underline decoration-violet-400/40 underline-offset-4 transition-colors hover:text-white hover:decoration-white/60";

function renderSpans(block: TextBlock) {
  return block.children.map((span) => {
    let node: ReactNode = span.text;
    for (const mark of span.marks ?? []) {
      if (mark === "strong") node = <strong className="font-semibold text-white">{node}</strong>;
      else if (mark === "em") node = <em>{node}</em>;
      else if (mark === "code")
        node = (
          <code className="rounded bg-white/[0.07] px-1.5 py-0.5 font-mono text-[0.9em] text-ink ring-1 ring-inset ring-white/10">
            {node}
          </code>
        );
      else {
        // anything else is the key of an annotation - here, a link
        const href = block.markDefs?.find((def) => def._key === mark)?.href;
        if (!href || !SAFE_HREF.test(href)) continue;
        node =
          href.startsWith("/") || href.startsWith("#") ? (
            <Link href={href} className={LINK}>
              {node}
            </Link>
          ) : (
            <a
              href={href}
              className={LINK}
              // mail and phone links open their own app, not a tab
              {...(href.startsWith("http") && { target: "_blank", rel: "noopener noreferrer" })}
            >
              {node}
            </a>
          );
      }
    }
    return <Fragment key={span._key}>{node}</Fragment>;
  });
}

/**
 * Consecutive list items become one list, and a deeper `level` nests inside
 * the item before it. `start` is the first item of the run.
 */
function renderList(items: TextBlock[], start = 0): { list: ReactNode; next: number } {
  const first = items[start];
  const level = first.level ?? 1;
  const Tag = first.listItem === "number" ? "ol" : "ul";
  const children: ReactNode[] = [];

  let i = start;
  while (i < items.length && (items[i].level ?? 1) >= level) {
    const item = items[i];
    if ((item.level ?? 1) > level) break;
    if (item.listItem !== first.listItem) break;
    i++;
    let nested: ReactNode = null;
    if (i < items.length && (items[i].level ?? 1) > level) {
      const result = renderList(items, i);
      nested = result.list;
      i = result.next;
    }
    children.push(
      <li key={item._key} className="pl-1.5">
        {renderSpans(item)}
        {nested}
      </li>
    );
  }

  return {
    list: (
      <Tag
        key={first._key}
        className={`space-y-2.5 pl-6 marker:text-violet-300 ${
          Tag === "ol" ? "list-decimal" : "list-disc"
        } ${level > 1 ? "mt-2.5" : "mt-6"}`}
      >
        {children}
      </Tag>
    ),
    next: i,
  };
}

export default function PortableText({ body }: { body: BodyBlock[] }) {
  const ids = headingIds(body);
  const out: ReactNode[] = [];

  for (let i = 0; i < body.length; i++) {
    const block = body[i];

    if (block._type === "image") {
      if (!block.url) continue;
      out.push(
        <figure key={block._key} className="mt-10">
          <Image
            src={sanityImage(block.url, 1600)}
            alt={block.alt ?? ""}
            width={block.width}
            height={block.height}
            sizes="(min-width: 768px) 720px, 92vw"
            className="h-auto w-full rounded-xl ring-1 ring-white/10"
          />
          {block.caption && (
            <figcaption className="mt-3 text-center text-sm text-ink-muted">{block.caption}</figcaption>
          )}
        </figure>
      );
      continue;
    }

    if (block._type === "codeBlock") {
      out.push(
        <figure key={block._key} className="glass mt-8 overflow-hidden rounded-xl">
          {block.language && (
            <figcaption className="border-b border-white/10 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-muted">
              {block.language}
            </figcaption>
          )}
          <pre className="overflow-x-auto p-4 font-mono text-[13px] leading-6 text-ink">
            <code>{block.code}</code>
          </pre>
        </figure>
      );
      continue;
    }

    if (block._type !== "block") continue;

    if (block.listItem) {
      // gather the whole run, then let renderList sort out the nesting
      let end = i;
      while (end < body.length) {
        const next = body[end];
        if (next._type !== "block" || !next.listItem) break;
        end++;
      }
      const items = body.slice(i, end) as TextBlock[];
      let at = 0;
      while (at < items.length) {
        const result = renderList(items, at);
        out.push(result.list);
        at = result.next;
      }
      i = end - 1;
      continue;
    }

    const content = renderSpans(block);
    switch (block.style) {
      case "h2":
        out.push(
          <h2
            key={block._key}
            id={ids.get(block._key)}
            className="mt-14 scroll-mt-28 font-display text-2xl font-bold tracking-tight text-white sm:text-3xl"
          >
            {content}
          </h2>
        );
        break;
      case "h3":
        out.push(
          <h3
            key={block._key}
            id={ids.get(block._key)}
            className="mt-10 scroll-mt-28 font-display text-xl font-semibold text-white"
          >
            {content}
          </h3>
        );
        break;
      case "blockquote":
        out.push(
          <blockquote
            key={block._key}
            className="mt-8 border-l-2 border-violet-400/70 pl-5 font-display text-lg leading-8 text-white"
          >
            {content}
          </blockquote>
        );
        break;
      default:
        // an empty paragraph is a stray Enter in the editor, not content
        if (plainText(block).trim()) {
          out.push(
            <p key={block._key} className="mt-6">
              {content}
            </p>
          );
        }
    }
  }

  return <div className="text-base leading-8 text-ink sm:text-[17px]">{out}</div>;
}
