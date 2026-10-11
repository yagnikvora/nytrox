import ProjectsShell from "../components/projects/ProjectsShell";
import ProjectRails from "../components/projects/ProjectRails";
import { pageMetadata } from "../data/site";

export const metadata = pageMetadata({
  title: "Projects - Nytrox",
  description:
    "Client work from the Nytrox studio, filed by service - websites for clinics, security firms, manufacturers, exporters, and retailers, with design, mobile, and marketing work alongside.",
  path: "/projects/",
});

/* The portfolio, grouped by category and then by service. */
export default function ProjectsPage() {
  return (
    <ProjectsShell>
      <ProjectRails />
    </ProjectsShell>
  );
}
