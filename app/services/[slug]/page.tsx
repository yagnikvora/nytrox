import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "../../components/Navbar";
import SpaceBackground from "../../components/SpaceBackground";
import CursorFX from "../../components/CursorFX";
import CtaBand from "../../components/CtaBand";
import Footer from "../../components/Footer";
import ServiceDetail from "../../components/service-page/ServiceDetail";
import { buildServiceView } from "../../components/service-page/shared";
import { SERVICES, serviceHref } from "../../data/services";
import { pageMetadata } from "../../data/site";

/*
 * One page per entry in SERVICES. Every page is built up front, and anything
 * that isn't a service's slug is a 404 rather than a page rendered on request.
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

const findService = (slug: string) => SERVICES.find((s) => s.slug === slug);

export async function generateMetadata({
  params,
}: PageProps<"/services/[slug]">): Promise<Metadata> {
  const service = findService((await params).slug);
  if (!service) return {};
  return pageMetadata({
    title: `${service.title} - Nytrox`,
    description: service.desc,
    path: `${serviceHref(service.slug)}/`,
  });
}

export default async function ServicePage({ params }: PageProps<"/services/[slug]">) {
  const service = findService((await params).slug);
  if (!service) notFound();

  return (
    <div className="relative flex min-h-screen flex-col overflow-clip">
      <CursorFX />
      <SpaceBackground />

      <Navbar />

      <main className="pt-20">
        <ServiceDetail service={service} view={buildServiceView(service)} />

        <CtaBand />
        <Footer />
      </main>
    </div>
  );
}
