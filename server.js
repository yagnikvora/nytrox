/*
 * Entry point for hosts that start a Node app from a file rather than a
 * command - Plesk's Node.js extension is one (set this as the "Application
 * Startup File"). Locally, `npm run dev` still uses `next dev`; this is what
 * `npm start` and the server run after `npm run build`.
 *
 * Plain CommonJS on purpose: this file is run by Node as it stands, without
 * going through the Next.js compiler.
 */
/* eslint-disable @typescript-eslint/no-require-imports */
const { createServer } = require("http");
const next = require("next");

// Production unless explicitly told otherwise, so a host that leaves NODE_ENV
// unset doesn't end up serving the dev build.
const dev = process.env.NODE_ENV === "development";

// Not parsed as a number: under IIS (iisnode) PORT is a named pipe, not a port.
const port = process.env.PORT || 3000;

const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => {
    handle(req, res);
  }).listen(port, () => {
    console.log(`> Nytrox ready on ${port} (${dev ? "development" : "production"})`);
  });
});
