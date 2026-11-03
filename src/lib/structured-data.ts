import { DATA } from "@/data/resume";

/**
 * Every node in the site's JSON-LD gets a stable `@id` so nodes can reference
 * each other instead of restating themselves. Without this, each page would
 * describe a *new* Person/Organization and search and answer engines would see
 * several loosely-related entities rather than one.
 */
export const ID = {
  person: `${DATA.url}/#person`,
  website: `${DATA.url}/#website`,
  profilePage: `${DATA.url}/#profile-page`,
  organization: "https://automatq.com/#organization",
  services: `${DATA.url}/#services`,
  clientWork: `${DATA.url}/#client-work`,
  openSource: `${DATA.url}/#open-source`,
  blog: `${DATA.url}/blog#blog`,
  blogPage: `${DATA.url}/blog#webpage`,
} as const;

/**
 * Resolves a site-relative path against the canonical origin. The home page is
 * returned without its trailing slash so it matches, byte for byte, the
 * canonical Next.js emits for "/" — the same URL spelled two ways is the usual
 * way a site ends up reported as duplicate content.
 */
export function absoluteUrl(path: string) {
  const resolved = new URL(path, `${DATA.url}/`).toString();
  return resolved === `${DATA.url}/` ? DATA.url : resolved;
}

type JsonLdNode = Record<string, unknown>;

/**
 * `</script>` inside a JSON string would end the script block early, so the
 * only character that needs escaping is `<`. JSON parsers read `<` as `<`,
 * which keeps the payload byte-identical in meaning.
 */
export function serializeJsonLd(graph: unknown) {
  return JSON.stringify(graph).replace(/</g, "\\u003c");
}

export function personNode(): JsonLdNode {
  // Only certifications actually held are claimed; anything still in progress
  // stays out of the graph rather than being asserted as earned.
  const earnedCredentials = DATA.education.filter((entry) =>
    entry.status.toLowerCase().includes("certified")
  );

  return {
    "@type": "Person",
    "@id": ID.person,
    name: DATA.name,
    url: DATA.url,
    image: absoluteUrl(DATA.avatarUrl),
    email: DATA.contact.email,
    jobTitle: "Custom Software Developer & Designer",
    description: DATA.description,
    knowsLanguage: "en",
    homeLocation: {
      "@type": "Place",
      name: DATA.location,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Kitchener-Waterloo",
        addressRegion: "ON",
        addressCountry: "CA",
      },
    },
    worksFor: { "@id": ID.organization },
    founder: { "@id": ID.organization },
    sameAs: [
      DATA.contact.social.GitHub.url,
      DATA.contact.social.LinkedIn.url,
      DATA.contact.social.Instagram.url,
      DATA.contact.social.YouTube.url,
    ],
    ...(earnedCredentials.length > 0 && {
      hasCredential: earnedCredentials.map((credential) => ({
        "@type": "EducationalOccupationalCredential",
        name: credential.degree,
        url: credential.href,
        credentialCategory: "certification",
        recognizedBy: { "@type": "Organization", name: credential.school },
      })),
    }),
    knowsAbout: [
      "Custom software development",
      "Web application development",
      "Mobile application development",
      "AI automation",
      "Technical SEO",
      "Answer engine optimization",
      ...DATA.skills.map((skill) => skill.name),
    ],
  };
}

/**
 * Automatq is the entity that actually sells the work, so the service catalogue
 * and service area hang off the organization rather than the person. This is
 * the node an answer engine reads to say what Chris offers and where.
 */
export function organizationNode(): JsonLdNode {
  const work = DATA.work[0];

  return {
    "@type": ["Organization", "ProfessionalService"],
    "@id": ID.organization,
    name: work.company,
    url: work.href,
    logo: absoluteUrl(work.logoUrl),
    image: absoluteUrl(work.logoUrl),
    description: work.description,
    email: DATA.contact.email,
    foundingDate: work.start,
    founder: { "@id": ID.person },
    employee: { "@id": ID.person },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Kitchener-Waterloo",
      addressRegion: "ON",
      addressCountry: "CA",
    },
    areaServed: [
      { "@type": "City", name: "Kitchener" },
      { "@type": "City", name: "Waterloo" },
      { "@type": "City", name: "Cambridge" },
      { "@type": "City", name: "Guelph" },
      { "@type": "AdministrativeArea", name: "Greater Toronto Area" },
      { "@type": "Country", name: "Canada" },
      { "@type": "Place", name: "Worldwide (remote)" },
    ],
    knowsLanguage: "en",
    sameAs: [DATA.contact.social.GitHub.url, DATA.contact.social.LinkedIn.url],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      "@id": ID.services,
      name: `Services — ${work.company}`,
      itemListElement: DATA.services.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.name,
          description: service.description,
          provider: { "@id": ID.organization },
          areaServed: { "@type": "Country", name: "Canada" },
        },
      })),
    },
  };
}

export function websiteNode(): JsonLdNode {
  return {
    "@type": "WebSite",
    "@id": ID.website,
    url: DATA.url,
    name: DATA.name,
    alternateName: ["chrisbender.dev"],
    description: DATA.description,
    inLanguage: "en-CA",
    publisher: { "@id": ID.person },
  };
}

/**
 * The per-project "Technical notes" live inside a popover, so that copy never
 * reaches the server-rendered DOM. Carrying it as `abstract` keeps the detail
 * machine-readable for crawlers and answer engines without changing the UI.
 */
export function clientWorkNode(): JsonLdNode {
  return {
    "@type": "ItemList",
    "@id": ID.clientWork,
    name: "Selected client work",
    itemListOrder: "https://schema.org/ItemListOrderDescending",
    numberOfItems: DATA.projects.length,
    itemListElement: DATA.projects.map((project, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "WebSite",
        name: project.title,
        url: project.href,
        description: project.description,
        abstract: project.technical,
        image: absoluteUrl(project.image),
        dateCreated: project.dates,
        keywords: project.technologies.join(", "),
        creator: { "@id": ID.person },
        provider: { "@id": ID.organization },
        ...("review" in project &&
          project.review && {
            review: {
              "@type": "Review",
              reviewBody: project.review.quote,
              url: project.review.href,
              author: { "@type": "Person", name: project.review.author },
              reviewRating: {
                "@type": "Rating",
                ratingValue: project.review.rating,
                bestRating: 5,
                worstRating: 1,
              },
            },
          }),
      },
    })),
  };
}

export function openSourceNode(): JsonLdNode {
  return {
    "@type": "ItemList",
    "@id": ID.openSource,
    name: "Open-source projects",
    numberOfItems: DATA.openSource.length,
    itemListElement: DATA.openSource.map((project, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "SoftwareSourceCode",
        name: project.title,
        description: project.description,
        codeRepository: project.href,
        url: project.href,
        ...(project.image && { image: absoluteUrl(project.image) }),
        ...(project.license && { license: project.license }),
        programmingLanguage: project.technologies[0],
        keywords: project.technologies.join(", "),
        author: { "@id": ID.person },
        maintainer: { "@id": ID.person },
      },
    })),
  };
}

/**
 * Breadcrumbs give search engines the site's shape and are what produce the
 * path shown above a result instead of a bare URL.
 */
export function breadcrumbNode(
  trail: { name: string; path: string }[]
): JsonLdNode {
  return {
    "@type": "BreadcrumbList",
    itemListElement: trail.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path),
    })),
  };
}

export function graph(nodes: JsonLdNode[]) {
  return { "@context": "https://schema.org", "@graph": nodes };
}
