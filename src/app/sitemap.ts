import { DATA } from "@/data/resume";
import type { MetadataRoute } from "next";
import { allPosts } from "content-collections";
import { absoluteUrl } from "@/lib/structured-data";

const portfolioUpdatedAt = new Date("2026-11-03");

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: MetadataRoute.Sitemap = [
    {
      // No trailing slash, to match the canonical Next.js emits for "/".
      url: DATA.url,
      lastModified: portfolioUpdatedAt,
      changeFrequency: "monthly",
      priority: 1,
      images: [
        absoluteUrl(DATA.avatarUrl),
        ...DATA.projects.map((project) => absoluteUrl(project.image)),
      ],
    },
  ];

  if (allPosts.length > 0) {
    routes.push({
      url: `${DATA.url}/blog`,
      lastModified: new Date(
        Math.max(
          ...allPosts.map((post) =>
            new Date(post.updatedAt ?? post.publishedAt).getTime()
          )
        )
      ),
      changeFrequency: "weekly",
      priority: 0.7,
    });

    routes.push(
      ...allPosts.map((post) => {
        const slug = post._meta.path.replace(/\.mdx$/, "");

        return {
          url: `${DATA.url}/blog/${slug}`,
          lastModified: new Date(post.updatedAt ?? post.publishedAt),
          changeFrequency: "monthly" as const,
          priority: 0.6,
          images: [
            post.image
              ? absoluteUrl(post.image)
              : `${DATA.url}/blog/${slug}/opengraph-image`,
          ],
        };
      })
    );
  }

  return routes;
}
