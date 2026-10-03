// each icon has its own entry point - the package root no longer exports them
import { EnvelopeIcon } from "@sanity/icons/Envelope";
import { defineField, defineType } from "sanity";

/*
 * The documents the website's contact form creates (see
 * app/api/contact/route.ts in the site). The site only writes these; nothing
 * here is read back by it.
 *
 * The field names have to match the document that route creates - change one
 * and change the other.
 *
 * Everything the visitor typed is read-only: it is a record of what was sent.
 * `status` and `notes` are the two fields meant to be edited here.
 */

export const ENQUIRY_STATUSES = [
  { title: "New", value: "new" },
  { title: "Replied", value: "replied" },
  { title: "Closed", value: "closed" },
];

const statusTitle = (value?: string) =>
  ENQUIRY_STATUSES.find((s) => s.value === value)?.title ?? "New";

export default defineType({
  name: "enquiry",
  title: "Enquiry",
  type: "document",
  icon: EnvelopeIcon,
  groups: [
    { name: "message", title: "Message", default: true },
    { name: "followUp", title: "Follow-up" },
  ],
  fields: [
    defineField({ name: "name", title: "Full name", type: "string", readOnly: true, group: "message" }),
    defineField({ name: "email", title: "Email", type: "string", readOnly: true, group: "message" }),
    defineField({ name: "phone", title: "Contact no.", type: "string", readOnly: true, group: "message" }),
    defineField({ name: "company", title: "Company", type: "string", readOnly: true, group: "message" }),
    defineField({ name: "service", title: "Service", type: "string", readOnly: true, group: "message" }),
    defineField({
      name: "message",
      title: "Project details",
      type: "text",
      rows: 8,
      readOnly: true,
      group: "message",
    }),
    defineField({
      name: "submittedAt",
      title: "Submitted at",
      type: "datetime",
      readOnly: true,
      group: "message",
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: { list: ENQUIRY_STATUSES, layout: "radio", direction: "horizontal" },
      initialValue: "new",
      validation: (rule) => rule.required(),
      group: "followUp",
    }),
    defineField({
      name: "notes",
      title: "Internal notes",
      description: "For the team only - never shown on the website or sent to the client.",
      type: "text",
      rows: 4,
      group: "followUp",
    }),
  ],
  orderings: [
    {
      title: "Newest first",
      name: "submittedAtDesc",
      by: [{ field: "submittedAt", direction: "desc" }],
    },
    {
      title: "Oldest first",
      name: "submittedAtAsc",
      by: [{ field: "submittedAt", direction: "asc" }],
    },
  ],
  preview: {
    select: { name: "name", service: "service", status: "status", submittedAt: "submittedAt" },
    prepare({ name, service, status, submittedAt }) {
      const date = submittedAt
        ? new Date(submittedAt).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })
        : "";
      return {
        title: name || "Unnamed enquiry",
        subtitle: [statusTitle(status), service, date].filter(Boolean).join(" · "),
      };
    },
  },
});
