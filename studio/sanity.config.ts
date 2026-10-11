import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { dataset, projectId } from "./project";
import { schemaTypes } from "./schemaTypes";
import { structure } from "./structure";

/*
 * Studio for the Nytrox Sanity project. Two things live here: the blog posts
 * the website shows at /blog (app/data/blog.ts in the site reads them), and the
 * enquiries saved by its contact form (app/api/contact/route.ts), which are
 * read and followed up here.
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
