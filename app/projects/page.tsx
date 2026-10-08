import ProjectsShell from "../components/projects/ProjectsShell";
import LayoutSections from "../components/projects/LayoutSections";
import { pageMetadata } from "../data/site";

export const metadata = pageMetadata({
  title: "Projects - Nytrox",
  description:
    "Client work from the Nytrox studio, filed by service - websites for clinics, security firms, manufacturers, exporters, and retailers, with design, mobile, and marketing work alongside.",
  path: "/projects/",
});

/*
 * The portfolio, grouped by category and then by service. Layout 1 of three;
 * the other two are previewed at /projects/style/<2|3> during development.
 */
export default function ProjectsPage() {
  return (
    <ProjectsShell layout="1">
      <LayoutSections />
    </ProjectsShell>
  );
}
