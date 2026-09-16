/**
 * Post-build fixup for `output: "export"`.
 *
 * next/link prefetches a route by fetching its RSC payload. The client asks for
 * that payload at a flat, dot-separated path:
 *
 *     /services/__next.services.__PAGE__.txt
 *
 * but the export writes it as a directory:
 *
 *     out/services/__next.services/__PAGE__.txt
 *
 * The two disagree for every nested route (the home page is written flat and so
 * happens to work), which means every prefetch on the deployed site 404s. The
 * navigation still completes — the router falls back to a full document load —
 * so nothing looks broken, but the prefetch buys nothing, every hover costs a
 * wasted request, and the console fills with 404s. On this project's IIS host it
 * is worse than a plain 404: web.config maps 404 to /404.html with
 * existingResponse="Replace", so the router is handed a page of HTML where it
 * expected an RSC payload.
 *
 * This copies each nested payload to the flat name the client actually requests.
 * Both are left in place — the directory form is what Next wrote, and something
 * downstream may yet expect it.
 *
 * Runs as npm's `postbuild`, so `npm run build` picks it up with no extra step.
 */

import { readdir, copyFile, stat } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join } from "node:path";

const OUT = "out";

if (!existsSync(OUT)) {
  console.log("[rsc-payloads] no out/ directory — nothing to do");
  process.exit(0);
}

let copied = 0;

/** Walk out/, mirroring every `__next.<seg>/__PAGE__.txt` to `__next.<seg>.__PAGE__.txt`. */
async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const path = join(dir, entry.name);

    if (!entry.isDirectory()) continue;

    // Next's own asset directory holds no route payloads.
    if (entry.name === "_next") continue;

    if (entry.name.startsWith("__next.")) {
      const page = join(path, "__PAGE__.txt");
      if (existsSync(page) && (await stat(page)).isFile()) {
        const flat = join(dir, `${entry.name}.__PAGE__.txt`);
        if (!existsSync(flat)) {
          await copyFile(page, flat);
          copied++;
        }
      }
      // These directories hold only the payload; no need to descend.
      continue;
    }

    await walk(path);
  }
}

await walk(OUT);

console.log(
  copied > 0
    ? `[rsc-payloads] wrote ${copied} flat prefetch payload${copied === 1 ? "" : "s"}`
    : "[rsc-payloads] nothing to copy — payload names already match"
);
