// each icon has its own entry point - the package root no longer exports them
import { ArchiveIcon } from "@sanity/icons/Archive";
import { CheckmarkCircleIcon } from "@sanity/icons/CheckmarkCircle";
import { EnvelopeIcon } from "@sanity/icons/Envelope";
import { InboxIcon } from "@sanity/icons/Inbox";
import type { ComponentType } from "react";
import type { StructureBuilder, StructureResolver } from "sanity/structure";

/*
 * The Studio's sidebar: enquiries split by status, so the ones still waiting
 * on a reply are the first thing you see, with the full list underneath.
 * Every list runs newest first.
 */

const NEWEST_FIRST = [{ field: "submittedAt", direction: "desc" as const }];

function enquiries(S: StructureBuilder, title: string, icon: ComponentType, status?: string) {
  const list = S.documentList()
    .title(title)
    .schemaType("enquiry")
    .defaultOrdering(NEWEST_FIRST)
    // enquiries come from the website's form, so there is no "create" button
    .initialValueTemplates([]);

  return S.listItem()
    .title(title)
    .icon(icon)
    .child(
      status
        ? list.filter('_type == "enquiry" && status == $status').params({ status })
        : list.filter('_type == "enquiry"')
    );
}

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Enquiries")
    .items([
      enquiries(S, "New", InboxIcon, "new"),
      enquiries(S, "Replied", CheckmarkCircleIcon, "replied"),
      enquiries(S, "Closed", ArchiveIcon, "closed"),
      S.divider(),
      enquiries(S, "All enquiries", EnvelopeIcon),
    ]);
