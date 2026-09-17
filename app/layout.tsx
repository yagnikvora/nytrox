import type { Metadata } from "next";
import { Geist, Space_Grotesk } from "next/font/google";
import ClickSpark from "./components/ClickSpark";
import RouteFade from "./components/RouteFade";
import ScrollProgress from "./components/ScrollProgress";
import ScrollToTop from "./components/ScrollToTop";
import SmoothScroll from "./components/SmoothScroll";
import { HOME_DESCRIPTION, HOME_TITLE, SITE_NAME, SITE_URL } from "./data/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

/*
 * Site-wide defaults. Each page sets its own title, description, and canonical
 * through pageMetadata() in data/site.ts; these only show through on routes
 * that don't, such as the 404 page.
 */
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_NAME,
  title: HOME_TITLE,
  description: HOME_DESCRIPTION,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // data-scroll-behavior lets Next.js suspend the global `scroll-behavior:
    // smooth` during route transitions, so navigating to /services jumps to the
    // top instead of smooth-scrolling the whole page.
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        {/* one instance each for the whole site */}
        <ClickSpark />
        {/* eases the wheel; no-ops on touch and under reduced motion */}
        <SmoothScroll />
        <ScrollProgress />
        <ScrollToTop />
        <RouteFade>{children}</RouteFade>
      </body>
    </html>
  );
}
