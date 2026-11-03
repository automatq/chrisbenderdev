import { DATA } from "@/data/resume";
import { allPosts } from "content-collections";

export const dynamic = "force-static";

const FEED_URL = `${DATA.url}/rss.xml`;
const FEED_DESCRIPTION =
  "Articles by Chris Bender about custom software, web development, product design, AI automation, and building digital products.";

/** The five characters that are not legal as literal text in XML content. */
function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function GET() {
  const posts = [...allPosts].sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  const items = posts
    .map((post) => {
      const slug = post._meta.path.replace(/\.mdx$/, "");
      const url = `${DATA.url}/blog/${slug}`;

      return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${escapeXml(post.summary)}</description>
      <pubDate>${new Date(post.publishedAt).toUTCString()}</pubDate>
      <dc:creator>${escapeXml(post.author ?? DATA.name)}</dc:creator>
    </item>`;
    })
    .join("\n");

  // An empty <channel> is still a valid feed, so readers and crawlers can
  // subscribe before the first post ships rather than hitting a 404.
  const lastBuildDate = (
    posts.length > 0 ? new Date(posts[0].publishedAt) : new Date()
  ).toUTCString();

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>${escapeXml(DATA.name)} — Blog</title>
    <link>${DATA.url}/blog</link>
    <description>${escapeXml(FEED_DESCRIPTION)}</description>
    <language>en-ca</language>
    <copyright>${new Date().getFullYear()} ${escapeXml(DATA.name)}</copyright>
    <managingEditor>${DATA.contact.email} (${escapeXml(DATA.name)})</managingEditor>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <atom:link href="${FEED_URL}" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
