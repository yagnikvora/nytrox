import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "../../../../components/Navbar";
import SpaceBackground from "../../../../components/SpaceBackground";
import CursorFX from "../../../../components/CursorFX";
import CtaBand from "../../../../components/CtaBand";
import Footer from "../../../../components/Footer";
import DesignEditorial from "../../../../components/service-designs/DesignEditorial";
import DesignBento from "../../../../components/service-designs/DesignBento";
import DesignCinematic from "../../../../components/service-designs/DesignCinematic";
import DesignConsole from "../../../../components/service-designs/DesignConsole";
import DesignBold from "../../../../components/service-designs/DesignBold";
import DesignMission from "../../../../components/service-designs/DesignMission";
import {
  DESIGNS,
  DESIGN_PREVIEWS,
  DesignSwitcher,
  buildServiceView,
} from "../../../../components/service-designs/shared";
import { SERVICES } from "../../../../data/services";

/*
 * Preview of an alternative design for a service page, at
 * /services/<slug>/design/<2-7>. Design 1 is the live page itself.
 *
 * Switched by DESIGN_PREVIEWS: when it is off there are no params to generate,
 * so with dynamicParams off every one of these URLs is a 404. Once a design is chosen, it moves into ../../page.tsx and this route
 * is deleted.
 */
export const dynamicParams = false;

export function generateStaticParams() {
  if (!DESIGN_PREVIEWS) return [];
  return SERVICES.flatMap((s) =>
    DESIGNS.filter((d) => d.id !== "1").map((d) => ({ slug: s.slug, variant: d.id }))
  );
}

export const metadata: Metadata = {
  title: "Design preview - Nytrox",
  robots: { index: false, follow: false },
};

export default async function DesignPreviewPage({
  params,
}: {
  params: Promise<{ slug: string; variant: string }>;
}) {
  const { slug, variant } = await params;
  const service = SERVICES.find((s) => s.slug === slug);
  if (!DESIGN_PREVIEWS || !service) notFound();

  const view = buildServiceView(service);

  return (
    <div className="relative flex min-h-screen flex-col overflow-clip">
      <CursorFX />
      <SpaceBackground />

      <Navbar />

      <main className="pt-20">
        {variant === "2" && <DesignEditorial service={service} view={view} />}
        {variant === "3" && <DesignBento service={service} view={view} />}
        {variant === "4" && <DesignCinematic service={service} view={view} />}
        {variant === "5" && <DesignConsole service={service} view={view} />}
        {variant === "6" && <DesignBold service={service} view={view} />}
        {variant === "7" && <DesignMission service={service} view={view} />}

        <CtaBand />
        <Footer />
      </main>

      <DesignSwitcher slug={slug} current={variant} />
    </div>
  );
}
