import { DATA } from "@/data/resume";

export const FEED_URL = `${DATA.url}/rss.xml`;

/**
 * Metadata merges one top-level key at a time, so a page that exports
 * `alternates` replaces the layout's `alternates` outright rather than adding
 * to it. Building every page's value here is what keeps the feed link from
 * disappearing on whichever page sets a canonical.
 */
export function alternates(canonical: string) {
  return {
    canonical,
    types: { "application/rss+xml": FEED_URL },
  };
}
