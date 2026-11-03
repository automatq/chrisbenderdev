import { DATA } from "@/data/resume";
import type { MetadataRoute } from "next";

/**
 * Answer engines are listed by name even though `*` already allows them. An
 * explicit rule is what keeps a crawler allowed if the wildcard is ever
 * tightened, and it documents which assistants this site expects to be read by.
 */
const ANSWER_ENGINE_CRAWLERS = [
  "ClaudeBot",
  "Claude-User",
  "Claude-SearchBot",
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot",
  "Applebot-Extended",
  "Bingbot",
  "DuckAssistBot",
  "MistralAI-User",
  "cohere-ai",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Query strings on /blog only ever reorder the same posts, so they are
        // kept out of the index while the posts themselves stay crawlable.
        disallow: ["/blog?*"],
      },
      {
        userAgent: ANSWER_ENGINE_CRAWLERS,
        allow: "/",
      },
    ],
    sitemap: `${DATA.url}/sitemap.xml`,
    host: DATA.url,
  };
}
