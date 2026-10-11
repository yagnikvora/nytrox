/*
 * Reads from Sanity for the pages that show its content (the blog). Server
 * only: it sends SANITY_API_TOKEN, so nothing in here may be imported by a
 * client component.
 *
 * Plain fetch against the HTTP API, like the contact route's write - no client
 * library to install or keep in step. Configuration is the same three
 * variables that route uses; see .env.example.
 */

const API_VERSION = "v2024-01-01";

/** How long to wait on Sanity before giving up. */
const TIMEOUT_MS = 10_000;

/**
 * How stale a page built from Sanity may get, in seconds. Pages are served
 * from the cache and rebuilt in the background at most this often, so an edit
 * in the Studio shows up within about a minute with no deploy.
 */
export const SANITY_REVALIDATE = 60;

/**
 * Runs a GROQ query and returns its result.
 *
 * Only published documents come back - drafts stay in the Studio.
 *
 * `fallback` is what a page gets when there is nothing to ask: the variables
 * are not set, or the query fails during `next build`. A build must not fail
 * because Sanity blinked; the page is built empty and fills in on its first
 * revalidation. Once the server is running a failed query throws instead, so
 * Next.js keeps serving the last good copy of the page rather than caching an
 * empty one over it.
 */
export async function sanityQuery<T>(
  query: string,
  params: Record<string, string | number>,
  fallback: T
): Promise<T> {
  const projectId = process.env.SANITY_PROJECT_ID;
  const token = process.env.SANITY_API_TOKEN;
  const dataset = process.env.SANITY_DATASET || "production";
  if (!projectId) {
    console.warn("[sanity] SANITY_PROJECT_ID is not set - returning no content");
    return fallback;
  }

  const search = new URLSearchParams({ query, perspective: "published" });
  // GROQ parameters travel as $name=<JSON value>
  for (const [name, value] of Object.entries(params)) {
    search.set(`$${name}`, JSON.stringify(value));
  }

  try {
    const res = await fetch(
      `https://${projectId}.api.sanity.io/${API_VERSION}/data/query/${dataset}?${search}`,
      {
        // The token is only needed while the dataset is private, but sending
        // it means the blog keeps working whichever way that is set.
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
        next: { revalidate: SANITY_REVALIDATE },
        signal: AbortSignal.timeout(TIMEOUT_MS),
      }
    );
    if (!res.ok) throw new Error(`Sanity responded ${res.status}: ${await res.text()}`);
    return ((await res.json()) as { result: T }).result ?? fallback;
  } catch (error) {
    if (process.env.NEXT_PHASE !== "phase-production-build") throw error;
    console.error("[sanity] query failed during build - continuing without it:", error);
    return fallback;
  }
}

/**
 * A Sanity image at a given width. The CDN resizes on request and `auto=format`
 * serves WebP or AVIF where the browser takes it, which is why these go out as
 * plain URLs instead of through the Next.js image optimiser (off for this
 * site - see next.config.ts).
 */
export function sanityImage(url: string, width: number, height?: number) {
  const size = height ? `w=${width}&h=${height}&fit=crop` : `w=${width}&fit=max`;
  return `${url}?${size}&auto=format&q=80`;
}
