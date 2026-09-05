import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The site has no server-side features (no Route Handlers, Server Actions or
  // request-time data), so `next build` writes plain HTML/CSS/JS to `out/`.
  // That can be served straight from Plesk's document root — no Node process.
  output: "export",

  // Emits `about/index.html` rather than `about.html`, so Apache's
  // DirectoryIndex resolves /about/ with no rewrite rules on the server.
  trailingSlash: true,

  // The default next/image loader optimises on a running server, which a
  // static export doesn't have. Images are already sized for their slots.
  images: { unoptimized: true },
};

export default nextConfig;
