import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProjectsShell from "../../../components/projects/ProjectsShell";
import LayoutShowcase from "../../../components/projects/LayoutShowcase";
import LayoutRails from "../../../components/projects/LayoutRails";
import { LAYOUTS, LAYOUT_PREVIEWS } from "../../../components/projects/shared";

/*
 * Preview of an alternative layout for the projects page, at
 * /projects/style/<2|3>. Layout 1 is /projects itself.
 *
 * Switched by LAYOUT_PREVIEWS: when it is off there are no params to generate,
 * so with dynamicParams off these URLs are 404s. Once a
 * layout is chosen it moves into ../../page.tsx and this route is deleted.
 */
export const dynamicParams = false;

export function generateStaticParams() {
  if (!LAYOUT_PREVIEWS) return [];
  return LAYOUTS.filter((l) => l.id !== "1").map((l) => ({ variant: l.id }));
}

export const metadata: Metadata = {
  title: "Layout preview - Nytrox",
  robots: { index: false, follow: false },
};

export default async function LayoutPreviewPage({
  params,
}: {
  params: Promise<{ variant: string }>;
}) {
  const { variant } = await params;
  if (!LAYOUT_PREVIEWS || (variant !== "2" && variant !== "3")) notFound();

  return (
    <ProjectsShell layout={variant}>
      {variant === "2" ? <LayoutShowcase /> : <LayoutRails />}
    </ProjectsShell>
  );
}
