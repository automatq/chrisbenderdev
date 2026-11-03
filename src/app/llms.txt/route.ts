import { DATA } from "@/data/resume";
import { allPosts } from "content-collections";

export const dynamic = "force-static";

/** Turns `[label](href)` into `label (href)` so the text reads flat. */
function unlink(markdown: string) {
  return markdown.replace(/\[([^\]]+)\]\(([^)]+)\)/g, "$1 ($2)");
}

export function GET() {
  const services = DATA.services
    .map((service) => `- **${service.name}** — ${service.description}`)
    .join("\n");

  /* The per-project "Technical notes" sit behind a popover on the site, so this
     is the only place the stack behind each build is available as plain text. */
  const clientProjects = DATA.projects
    .map((project) => {
      const lines = [
        `### ${project.title} (${project.dates})`,
        project.href,
        "",
        project.description,
        "",
        `Stack and implementation: ${project.technical}`,
        `Technologies: ${project.technologies.join(", ")}`,
      ];

      if ("review" in project && project.review) {
        lines.push(
          `Client review (${project.review.rating}/5, ${project.review.author}): "${project.review.quote}"`
        );
      }

      return lines.join("\n");
    })
    .join("\n\n");

  const openSourceProjects = DATA.openSource
    .map((project) =>
      [
        `### ${project.title}`,
        `${project.href} (${project.repo})`,
        "",
        project.description,
        "",
        `Role: ${project.role}${project.license ? ` · License: ${project.license}` : ""}`,
        `Technologies: ${project.technologies.join(", ")}`,
      ].join("\n")
    )
    .join("\n\n");

  const credentials = DATA.education
    .map((entry) => `- ${entry.degree} — ${entry.school} (${entry.status})`)
    .join("\n");

  const work = DATA.work
    .map((role) =>
      [
        `### ${role.title}, ${role.company} (${role.start}–${role.end})`,
        `${role.href} · ${role.location}`,
        "",
        role.description,
      ].join("\n")
    )
    .join("\n\n");

  const posts = [...allPosts]
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    )
    .map((post) => {
      const slug = post._meta.path.replace(/\.mdx$/, "");
      return `- [${post.title}](${DATA.url}/blog/${slug}) (${post.publishedAt}): ${post.summary}`;
    })
    .join("\n");

  const content = `# ${DATA.name}

> Custom software developer and designer in ${DATA.location}, building high-performance websites, web and mobile applications, AI automation systems, and search-ready digital products. Founder of Automatq.

Canonical site: ${DATA.url}
Last updated: ${new Date().toISOString().slice(0, 10)}

## About

${unlink(DATA.summary)}

${DATA.description}

## Services

${services}

Service area: Kitchener, Waterloo, Cambridge, Guelph and the Greater Toronto Area, plus remote clients across Canada and internationally.

## Work

${work}

## Selected client work

${clientProjects}

## Open-source work

${openSourceProjects}

## Technical capabilities

${DATA.skills.map((skill) => skill.name).join(", ")}

## Certifications

${credentials}

## Writing

${posts || "- No posts published yet."}

RSS feed: ${DATA.url}/rss.xml

## Contact and identity

- Email: ${DATA.contact.email}
- GitHub: ${DATA.contact.social.GitHub.url}
- LinkedIn: ${DATA.contact.social.LinkedIn.url}
- YouTube: ${DATA.contact.social.YouTube.url}
- Instagram: ${DATA.contact.social.Instagram.url}
- Company: https://automatq.com

## Canonical pages

- [Portfolio](${DATA.url})
- [About](${DATA.url}/#about)
- [Work experience](${DATA.url}/#work)
- [Skills](${DATA.url}/#skills)
- [Projects](${DATA.url}/#projects)
- [Open source](${DATA.url}/#open-source)
- [Contact](${DATA.url}/#contact)
- [Blog](${DATA.url}/blog)
`;

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
