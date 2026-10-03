import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // No `output: "export"`: the contact form posts to a Route Handler
  // (app/api/contact), which needs a running server to hold the mail and
  // Sanity keys. The site runs as a Node app - on Plesk, started from
  // server.js - and every page is still prerendered at build time.

  // Kept from the static export so every existing URL (/about/, /services/seo/)
  // stays exactly as it was.
  trailingSlash: true,

  // Images are already sized for their slots, so they are served as they are
  // rather than through the on-demand optimiser.
  images: { unoptimized: true },
};

export default nextConfig;
