// each icon has its own entry point - the package root no longer exports them
import { CodeBlockIcon } from "@sanity/icons/CodeBlock";
import { ComposeIcon } from "@sanity/icons/Compose";
import { ImageIcon } from "@sanity/icons/Image";
import { defineArrayMember, defineField, defineType } from "sanity";

/*
 * A blog post. Unlike enquiries, these are written here and read by the
 * website: the list at /blog and each post's page at /blog/<slug> come from
 * the queries in app/data/blog.ts in the site.
 *
 * The field names have to match those queries - change one and change the
 * other. The same goes for the two option lists below.
 *
 * A post appears on the site once it is published here AND its "Published at"
 * time has passed, so a post can be finished early and dated for later. The
 * site picks up changes within a minute or so; no deploy is needed.
 */

/** Values match BLOG_CATEGORIES in app/data/blog.ts. */
export const POST_CATEGORIES = [
  { title: "Design", value: "design" },
  { title: "Engineering", value: "engineering" },
  { title: "Growth", value: "growth" },
  { title: "AI", value: "ai" },
];

/** Values are the service slugs in app/data/services.tsx. */
export const SERVICE_OPTIONS = [
  { title: "UI/UX Design", value: "ui-ux-design" },
  { title: "Website Development", value: "website-development" },
  { title: "Mobile App Development", value: "mobile-app-development" },
  { title: "Digital Marketing", value: "digital-marketing" },
  { title: "Performance Marketing", value: "performance-marketing" },
  { title: "Graphic Design", value: "graphic-design" },
  { title: "SEO", value: "seo" },
  { title: "AI Automation", value: "ai-automation" },
  { title: "Package Design", value: "package-design" },
  { title: "Brand Design", value: "brand-design" },
  { title: "Video Editing", value: "video-editing" },
];

const categoryTitle = (value?: string) =>
  POST_CATEGORIES.find((c) => c.value === value)?.title ?? "";

export default defineType({
  name: "post",
  title: "Blog post",
  type: "document",
  icon: ComposeIcon,
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "details", title: "Details" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Title",
      description: "The headline on the page. Also the search-result title unless one is set under SEO.",
      type: "string",
      group: "content",
      validation: (rule) => [
        rule.required(),
        rule.max(70).warning("Search results cut titles off at around 60 characters."),
      ],
    }),
    defineField({
      name: "slug",
      title: "Slug",
      description:
        "The post's address: nytrox.in/blog/<slug>. Changing it after the post is live breaks every existing link to it.",
      type: "slug",
      group: "content",
      options: { source: "title", maxLength: 80 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      description:
        "One or two sentences saying what the post covers. Shown on the blog cards and used as the search-result description unless one is set under SEO.",
      type: "text",
      rows: 3,
      group: "content",
      validation: (rule) => [
        rule.required(),
        rule.max(200).warning("Search results show roughly the first 155 characters."),
      ],
    }),
    defineField({
      name: "coverImage",
      title: "Cover image",
      description:
        "Optional. Landscape works best - it is shown at 16:9, and used as the preview when the post is shared. Without one the site draws a cover in the category's colour.",
      type: "image",
      group: "content",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alternative text",
          description: "What the image shows, for screen readers and search engines.",
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "array",
      group: "content",
      validation: (rule) => rule.required(),
      of: [
        defineArrayMember({
          type: "block",
          // No H1: the title is the page's only one. H2s become the
          // "On this page" links at the top of the post.
          styles: [
            { title: "Paragraph", value: "normal" },
            { title: "Heading 2", value: "h2" },
            { title: "Heading 3", value: "h3" },
            { title: "Quote", value: "blockquote" },
          ],
          lists: [
            { title: "Bullets", value: "bullet" },
            { title: "Numbered", value: "number" },
          ],
          marks: {
            decorators: [
              { title: "Bold", value: "strong" },
              { title: "Italic", value: "em" },
              { title: "Code", value: "code" },
            ],
            annotations: [
              {
                name: "link",
                title: "Link",
                type: "object",
                fields: [
                  defineField({
                    name: "href",
                    title: "URL",
                    description:
                      "A full address (https://…), or a path on this site such as /services/seo or /contact.",
                    type: "string",
                    validation: (rule) =>
                      rule.required().custom((value) =>
                        !value || /^(https?:\/\/|mailto:|tel:|\/|#)/.test(value)
                          ? true
                          : "Start with https://, mailto:, tel:, or / for a page on this site."
                      ),
                  }),
                ],
              },
            ],
          },
        }),
        defineArrayMember({
          type: "image",
          icon: ImageIcon,
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              title: "Alternative text",
              description: "What the image shows, for screen readers and search engines.",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({ name: "caption", title: "Caption", type: "string" }),
          ],
        }),
        defineArrayMember({
          name: "codeBlock",
          title: "Code block",
          type: "object",
          icon: CodeBlockIcon,
          fields: [
            defineField({
              name: "language",
              title: "Language",
              description: "Shown as a label above the code, e.g. TypeScript.",
              type: "string",
            }),
            defineField({
              name: "code",
              title: "Code",
              type: "text",
              rows: 10,
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: { language: "language", code: "code" },
            prepare: ({ language, code }) => ({
              title: language || "Code",
              subtitle: (code ?? "").split("\n")[0],
            }),
          },
        }),
      ],
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      group: "details",
      options: { list: POST_CATEGORIES, layout: "radio", direction: "horizontal" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "publishedAt",
      title: "Published at",
      description:
        "The date shown on the post, and what the blog is sorted by. A time in the future keeps the post off the site until then.",
      type: "datetime",
      group: "details",
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "string",
      group: "details",
      initialValue: "Nytrox Team",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "relatedServices",
      title: "Related services",
      description:
        "Up to three services this post leads to. They are linked at the foot of the post.",
      type: "array",
      group: "details",
      of: [defineArrayMember({ type: "string" })],
      options: { list: SERVICE_OPTIONS },
      validation: (rule) => rule.max(3).unique(),
    }),
    defineField({
      name: "seoTitle",
      title: "Search title",
      description: "Optional. Replaces the title in search results and link previews only.",
      type: "string",
      group: "seo",
      validation: (rule) =>
        rule.max(70).warning("Search results cut titles off at around 60 characters."),
    }),
    defineField({
      name: "seoDescription",
      title: "Search description",
      description: "Optional. Replaces the excerpt in search results and link previews only.",
      type: "text",
      rows: 3,
      group: "seo",
      validation: (rule) =>
        rule.max(200).warning("Search results show roughly the first 155 characters."),
    }),
  ],
  orderings: [
    {
      title: "Newest first",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
    {
      title: "Oldest first",
      name: "publishedAtAsc",
      by: [{ field: "publishedAt", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "title", category: "category", publishedAt: "publishedAt", media: "coverImage" },
    prepare({ title, category, publishedAt, media }) {
      const date = publishedAt
        ? new Date(publishedAt).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })
        : "";
      return {
        title: title || "Untitled post",
        subtitle: [categoryTitle(category), date].filter(Boolean).join(" · "),
        media,
      };
    },
  },
});
