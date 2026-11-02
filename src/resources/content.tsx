import { About, Blog, Gallery, Home, Newsletter, Person, Social, Work } from "@/types";
import { Line, Row, Text } from "@once-ui-system/core";

const person: Person = {
  firstName: "Chris",
  lastName: "Bender",
  name: `Chris Bender`,
  role: "Design Engineer",
  avatar: "/images/avatar.jpg",
  email: "example@gmail.com",
  location: "America/Toronto", // Expecting the IANA time zone identifier, e.g., 'Europe/Vienna'
  languages: ["English"], // optional: Leave the array empty if you don't want to display languages
  locale: "en", // BCP 47 language tag for the HTML lang attribute, e.g., 'en', 'ja', 'zh-TW'
};

const newsletter: Newsletter = {
  display: true,
  title: <>Subscribe to {person.firstName}&apos;s Newsletter</>,
  description: <>My weekly newsletter about creativity and engineering</>,
};

const social: Social = [
  // Links are automatically displayed.
  // Import new icons in /once-ui/icons.ts
  // Set essentials: true for links you want to show on the about page
  {
    name: "GitHub",
    icon: "github",
    link: "https://github.com/once-ui-system",
    essential: true,
  },
  {
    name: "LinkedIn",
    icon: "linkedin",
    link: "https://www.linkedin.com/company/once-ui/",
    essential: true,
  },
  {
    name: "Instagram",
    icon: "instagram",
    link: "https://www.instagram.com/once_ui/",
    essential: false,
  },
  {
    name: "Threads",
    icon: "threads",
    link: "https://www.threads.com/@once_ui",
    essential: true,
  },
  {
    name: "Email",
    icon: "email",
    link: `mailto:${person.email}`,
    essential: true,
  },
];

const home: Home = {
  path: "/",
  image: "/images/og/home.jpg",
  label: "Home",
  title: `${person.name}'s Portfolio`,
  description: `Portfolio website showcasing my work as a ${person.role}`,
  headline: <>Building bridges between design and code</>,
  featured: {
    display: true,
    title: (
      <Row gap="12" vertical="center">
        <strong className="ml-4">Building Blocks</strong>{" "}
        <Line background="brand-alpha-strong" vert height="20" />
        <Text marginRight="4" onBackground="brand-medium">
          Featured work
        </Text>
      </Row>
    ),
    href: "/work/building-blocks-nursery-school",
  },
  subline: (
    <>
      I&apos;m {person.firstName}, a {person.role.toLowerCase()} at{" "}
      <Text as="span" size="xl" weight="strong">
        ONCE UI
      </Text>
      , where I craft intuitive <br /> user experiences. After hours, I build my own projects.
    </>
  ),
};

const about: About = {
  path: "/about",
  label: "About",
  title: `About – ${person.name}`,
  description: `Meet ${person.name}, ${person.role} from ${person.location}`,
  tableOfContent: {
    display: true,
    subItems: false,
  },
  avatar: {
    display: true,
  },
  calendar: {
    display: true,
    link: "https://cal.com",
  },
  intro: {
    display: true,
    title: "Introduction",
    description: (
      <>
        {person.firstName} is a {person.location.split("/")[1]?.replace("_", " ")}-based{" "}
        {person.role.toLowerCase()} with a passion for transforming complex challenges into simple,
        elegant design solutions. Their work spans digital interfaces, interactive experiences, and
        the convergence of design and technology.
      </>
    ),
  },
  work: {
    display: true, // set to false to hide this section
    title: "Work Experience",
    experiences: [
      {
        company: "FLY",
        timeframe: "2022 - Present",
        role: "Senior Design Engineer",
        achievements: [
          <>
            Redesigned the UI/UX for the FLY platform, resulting in a 20% increase in user
            engagement and 30% faster load times.
          </>,
          <>
            Spearheaded the integration of AI tools into design workflows, enabling designers to
            iterate 50% faster.
          </>,
        ],
        images: [
          // optional: leave the array empty if you don't want to display images
          {
            src: "/images/projects/project-01/cover-01.jpg",
            alt: "Once UI Project",
            width: 16,
            height: 9,
          },
        ],
      },
      {
        company: "Creativ3",
        timeframe: "2018 - 2022",
        role: "Lead Designer",
        achievements: [
          <>
            Developed a design system that unified the brand across multiple platforms, improving
            design consistency by 40%.
          </>,
          <>
            Led a cross-functional team to launch a new product line, contributing to a 15% increase
            in overall company revenue.
          </>,
        ],
        images: [],
      },
    ],
  },
  studies: {
    display: true, // set to false to hide this section
    title: "Studies",
    institutions: [
      {
        name: "University of Jakarta",
        description: <>Studied software engineering.</>,
      },
      {
        name: "Build the Future",
        description: <>Studied online marketing and personal branding.</>,
      },
    ],
  },
  technical: {
    display: true, // set to false to hide this section
    title: "Technical skills",
    skills: [
      {
        title: "React & Next.js",
        description: (
          <>
            Production sites in TypeScript with React, Next.js and Tailwind CSS: marketing sites,
            small-business sites, founder portfolios and product landing pages, built on shadcn and
            Base UI components and tested with Vitest and Testing Library.
          </>
        ),
        tags: [
          { name: "TypeScript", icon: "typescript" },
          { name: "React", icon: "react" },
          { name: "Next.js", icon: "nextjs" },
          { name: "Tailwind CSS", icon: "tailwind" },
        ],
        images: [],
      },
      {
        title: "Motion & interactive design",
        description: (
          <>
            Custom UI components and immersive, performant interactions: Framer Motion and GSAP
            animation, Lenis smooth scrolling and WebGL scenes with Three.js and OGL.
          </>
        ),
        tags: [
          { name: "Framer Motion", icon: "framer" },
          { name: "GSAP", icon: "gsap" },
          { name: "Three.js", icon: "threejs" },
        ],
        images: [],
      },
      {
        title: "Backend, data & payments",
        description: (
          <>
            Supabase and Postgres on Neon, Express APIs, transactional email with Resend, Square
            payments, S3 file storage, and deployments on Vercel and Cloudflare.
          </>
        ),
        tags: [
          { name: "Supabase", icon: "supabase" },
          { name: "PostgreSQL", icon: "postgresql" },
          { name: "Express", icon: "express" },
          { name: "Square", icon: "square" },
          { name: "Vercel", icon: "vercel" },
          { name: "Cloudflare", icon: "cloudflare" },
        ],
        images: [],
      },
      {
        title: "AI automation & agents",
        description: (
          <>
            AI automation for businesses through Automatq: LLM features with the Anthropic and
            OpenAI SDKs, agent skills and workflows for Claude Code, and headless-browser
            automation with Puppeteer.
          </>
        ),
        tags: [
          { name: "Anthropic", icon: "anthropic" },
          { name: "Claude Code", icon: "claudecode" },
        ],
        images: [],
      },
      {
        title: "Native apps",
        description: (
          <>
            Swift and SwiftUI apps for macOS and iOS, including menu bar utilities, packaged with
            Swift Package Manager.
          </>
        ),
        tags: [
          { name: "Swift", icon: "swift" },
          { name: "macOS & iOS", icon: "apple" },
        ],
        images: [],
      },
      {
        title: ".NET & infrastructure",
        description: (
          <>
            C# and .NET services structured as a modular monolith with architecture decision
            records, Docker Compose for local environments and GitHub Actions for CI and deploys.
          </>
        ),
        tags: [
          { name: "C#", icon: "csharp" },
          { name: ".NET", icon: "dotnet" },
          { name: "Docker", icon: "docker" },
        ],
        images: [],
      },
    ],
  },
};

const blog: Blog = {
  path: "/blog",
  label: "Blog",
  title: "Writing about design and tech...",
  description: `Read what ${person.name} has been up to recently`,
  // Create new blog posts by adding a new .mdx file to app/blog/posts
  // All posts will be listed on the /blog route
};

const work: Work = {
  path: "/work",
  label: "Work",
  title: `Projects – ${person.name}`,
  description: `Design and dev projects by ${person.name}`,
  // Create new project pages by adding a new .mdx file to app/blog/posts
  // All projects will be listed on the /home and /work routes
};

const gallery: Gallery = {
  path: "/gallery",
  label: "Gallery",
  title: `Photo gallery – ${person.name}`,
  description: `A photo collection by ${person.name}`,
  // Project shots are from the case studies in /work
  // Remaining images by https://lorant.one – placeholders, replace with your own
  images: [
    {
      src: "/images/gallery/building-blocks-nursery-school.mp4",
      alt: "Building Blocks Nursery School – walkthrough of the live site",
      orientation: "horizontal",
      aspectRatio: "1440 / 904",
    },
    {
      src: "/images/gallery/vertical-1.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/projects/zoltanbuilds/cover-01.jpg",
      alt: "ZoltanBuilds – hero and three-step quote flow",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/vertical-4.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/projects/building-blocks/cover-01.jpg",
      alt: "Building Blocks Nursery School – home page",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/vertical-2.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/projects/zoltanbuilds/image-02.jpg",
      alt: "ZoltanBuilds – documented 3-season room project",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/vertical-3.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/projects/building-blocks/image-01.jpg",
      alt: "Building Blocks Nursery School – programs page",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/horizontal-1.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/horizontal-3.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/horizontal-2.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/horizontal-4.jpg",
      alt: "image",
      orientation: "horizontal",
    },
  ],
};

export { person, social, newsletter, home, about, blog, work, gallery };
