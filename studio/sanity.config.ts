import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { dataset, projectId } from "./project";
import { schemaTypes } from "./schemaTypes";
import { structure } from "./structure";

/*
 * Studio for the Nytrox Sanity project - where the enquiries saved by the
 * website's contact form (app/api/contact/route.ts in the site) are read and
 * followed up.
 */
export default defineConfig({
  name: "default",
  title: "Nytrox",
  projectId,
  dataset,
  plugins: [structureTool({ structure }), visionTool()],
  schema: { types: schemaTypes },
  document: {
    // An enquiry is a record of what a visitor sent, so the Studio offers no
    // way to make one by hand or to copy one - only the website creates them.
    newDocumentOptions: (prev) => prev.filter((item) => item.templateId !== "enquiry"),
    actions: (prev, { schemaType }) =>
      schemaType === "enquiry" ? prev.filter((action) => action.action !== "duplicate") : prev,
  },
});
