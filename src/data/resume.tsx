import { Icons } from "@/components/icons";
import { HomeIcon, NotebookIcon, ShieldCheck } from "lucide-react";
import { ReactLight } from "@/components/ui/svgs/reactLight";
import { NextjsIconDark } from "@/components/ui/svgs/nextjsIconDark";
import { Typescript } from "@/components/ui/svgs/typescript";
import { Nodejs } from "@/components/ui/svgs/nodejs";
import { Postgresql } from "@/components/ui/svgs/postgresql";
import { Docker } from "@/components/ui/svgs/docker";
import { Csharp } from "@/components/ui/svgs/csharp";
import { FaAws } from "react-icons/fa6";
import { VscAzure } from "react-icons/vsc";
import {
  SiAnthropic,
  SiClaudecode,
  SiCloudflare,
  SiCplusplus,
  SiDotnet,
  SiExpress,
  SiFramer,
  SiGo,
  SiGreensock,
  SiKubernetes,
  SiOpenjdk,
  SiPython,
  SiRailway,
  SiSquare,
  SiSupabase,
  SiSwift,
  SiTailwindcss,
  SiThreedotjs,
  SiVercel,
} from "react-icons/si";

type Skill = {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
};

type Education = {
  school: string;
  href: string;
  degree: string;
  icon: React.ComponentType<{ className?: string }>;
  status: string;
};

type OpenSourceProject = {
  title: string;
  repo: string;
  href: string;
  description: string;
  role: string;
  license?: string;
  technologies: string[];
  image?: string;
  links: { type: string; icon: React.ReactNode; href: string }[];
};

type Hackathon = {
  title: string;
  dates: string;
  location: string;
  description: string;
  image?: string;
  mlh?: string;
  win?: string;
  links: { title: string; icon: React.ReactNode; href: string }[];
};

// Add entries here to show the Education and Hackathons sections on the home page.
const education: Education[] = [
  {
    school: "Amazon Web Services (AWS)",
    href: "https://aws.amazon.com/certification/certified-generative-ai-developer-professional/",
    degree: "AWS Certified Generative AI Developer – Professional",
    icon: FaAws,
    status: "In Progress · Exam AIP-C01",
  },
  {
    school: "CompTIA",
    href: "https://www.comptia.org/en-us/certifications/security/",
    degree: "CompTIA Security+",
    icon: ShieldCheck,
    status: "Certified",
  },
];
const hackathons: Hackathon[] = [];

// Repos I maintain in public. Client work lives in `projects` instead.
const openSource: OpenSourceProject[] = [
  {
    title: "MainTek CMMS",
    repo: "automatq/cmms",
    href: "https://github.com/automatq/cmms",
    description:
      "An open, multi-tenant maintenance management platform: assets, work orders, preventive maintenance schedules, inventory, procurement and reporting, plus an AI assistant and a technician mobile app. Built as a NestJS + Next.js + Expo monorepo that teams can self-host instead of paying per seat.",
    role: "Creator & maintainer",
    technologies: [
      "TypeScript",
      "NestJS",
      "TypeORM",
      "PostgreSQL",
      "Redis",
      "BullMQ",
      "Socket.io",
      "Next.js",
      "React",
      "Tailwind CSS",
      "shadcn/ui",
      "Recharts",
      "Expo",
      "React Native",
      "MinIO / AWS S3",
      "AWS Bedrock / Ollama",
      "Stripe",
      "Docker Compose",
      "Terraform",
      "AWS ECS / RDS / ElastiCache",
      "Caddy",
    ],
    image: "/projects/maintek-cmms.png",
    links: [
      {
        type: "Repository",
        href: "https://github.com/automatq/cmms",
        icon: <Icons.github className="size-3" />,
      },
      {
        type: "Website",
        href: "https://maintek.app",
        icon: <Icons.globe className="size-3" />,
      },
    ],
  },
  {
    title: "MarkedUp",
    repo: "automatq/markedup",
    href: "https://github.com/automatq/markedup",
    description:
      "A collaborative, block-based Markdown workspace with real-time editing, backlinks, databases, wikis, whiteboards, spreadsheets, calls, publishing and AI writing tools. The whole editor stack is public so anyone can read how the collaborative pieces fit together.",
    role: "Creator & maintainer",
    technologies: [
      "TypeScript",
      "Next.js",
      "React",
      "TipTap",
      "ProseMirror",
      "Liveblocks",
      "Yjs",
      "Prisma",
      "Neon Postgres",
      "Clerk",
      "OpenAI",
      "Tailwind CSS",
      "shadcn/ui",
      "Base UI",
      "Recharts",
      "Mermaid",
      "KaTeX",
      "Lowlight",
      "Resend",
      "Svix",
      "docx",
      "Vercel",
    ],
    image: "/projects/markedup.png",
    links: [
      {
        type: "Repository",
        href: "https://github.com/automatq/markedup",
        icon: <Icons.github className="size-3" />,
      },
      {
        type: "Website",
        href: "https://markedup-smoky.vercel.app",
        icon: <Icons.globe className="size-3" />,
      },
    ],
  },
  {
    title: "OrderTakeout",
    repo: "automatq/ordertakeout",
    href: "https://github.com/automatq/ordertakeout",
    description:
      "Online pre-ordering and pickup scheduling for a bakery's party trays, wired straight into the store's existing Square POS. Customers pick one of three Square-managed locations, see that branch's live inventory, choose a pickup slot and pay online; paid orders land in Square and in a staff dashboard, with email, SMS and chat notifications. Ships with a seeded demo that runs against any Postgres, no Square account needed.",
    role: "Creator & maintainer",
    technologies: [
      "TypeScript",
      "Next.js",
      "React",
      "Tailwind CSS",
      "Drizzle ORM",
      "PostgreSQL",
      "Square Web SDK",
      "Square Node SDK",
      "SimpleWebAuthn",
      "Sentry",
      "Zod",
      "date-fns",
      "Vercel",
    ],
    image: "/projects/ordertakeout.png",
    links: [
      {
        type: "Repository",
        href: "https://github.com/automatq/ordertakeout",
        icon: <Icons.github className="size-3" />,
      },
    ],
  },
  {
    title: "Link in Bio",
    repo: "automatq/linktree",
    href: "https://github.com/automatq/linktree",
    description:
      "A creator platform sitting behind one public profile page: links and groups, a gallery, events, a Stripe store and checkout, bookings with reminder emails, polls, reviews, a guest wall and voice rooms. The owner drives all of it from an admin workspace that also runs email campaigns against subscriber audiences, tracking pixels, per-link click tracking, and a custom domain with its own verification step.",
    role: "Creator & maintainer",
    technologies: [
      "TypeScript",
      "Next.js",
      "React",
      "Drizzle ORM",
      "Neon Postgres",
      "Clerk",
      "Stripe",
      "Vercel Blob",
      "Resend",
      "Twilio",
      "qrcode.react",
      "next-themes",
      "Vercel Cron",
      "Vercel",
    ],
    image: "/projects/link-in-bio.png",
    links: [
      {
        type: "Repository",
        href: "https://github.com/automatq/linktree",
        icon: <Icons.github className="size-3" />,
      },
    ],
  },
  {
    title: "chrisbender.dev",
    repo: "automatq/chrisbenderdev",
    href: "https://github.com/automatq/chrisbenderdev",
    description:
      "The site you are reading, MIT licensed and free to fork: a Next.js portfolio with an MDX blog, generated OG images, dark mode and a single resume file that drives every section.",
    role: "Creator & maintainer",
    license: "MIT",
    technologies: [
      "TypeScript",
      "Next.js",
      "React",
      "Tailwind CSS",
      "shadcn/ui",
      "Radix UI",
      "Magic UI",
      "Motion",
      "MDX",
      "Content Collections",
      "Shiki",
      "next-themes",
      "Lucide",
      "Vercel",
    ],
    image: "/projects/chrisbenderdev.png",
    links: [
      {
        type: "Repository",
        href: "https://github.com/automatq/chrisbenderdev",
        icon: <Icons.github className="size-3" />,
      },
    ],
  },
];

const skills: Skill[] = [
  { name: "TypeScript", icon: Typescript },
  { name: "React", icon: ReactLight },
  { name: "Next.js", icon: NextjsIconDark },
  { name: "Tailwind CSS", icon: SiTailwindcss },
  { name: "Framer Motion", icon: SiFramer },
  { name: "GSAP", icon: SiGreensock },
  { name: "Three.js", icon: SiThreedotjs },
  { name: "Node.js", icon: Nodejs },
  { name: "Express", icon: SiExpress },
  { name: "Supabase", icon: SiSupabase },
  { name: "PostgreSQL", icon: Postgresql },
  { name: "Square", icon: SiSquare },
  { name: "Vercel", icon: SiVercel },
  { name: "Railway", icon: SiRailway },
  { name: "Cloudflare", icon: SiCloudflare },
  { name: "AWS", icon: FaAws },
  { name: "Azure", icon: VscAzure },
  { name: "Anthropic SDK", icon: SiAnthropic },
  { name: "Claude Code", icon: SiClaudecode },
  { name: "Swift", icon: SiSwift },
  { name: "C#", icon: Csharp },
  { name: ".NET", icon: SiDotnet },
  { name: "Java", icon: SiOpenjdk },
  { name: "Python", icon: SiPython },
  { name: "Go", icon: SiGo },
  { name: "C++", icon: SiCplusplus },
  { name: "Docker", icon: Docker },
  { name: "Kubernetes", icon: SiKubernetes },
];

/* What Automatq actually sells. These never render as a section — they are the
   answer to "what does Chris do", and they feed the Service catalogue in the
   home page's JSON-LD and the Services block in /llms.txt from one place. */
const services: { name: string; description: string }[] = [
  {
    name: "Custom website design and development",
    description:
      "Marketing and brand sites designed and built from scratch, tuned for speed, accessibility and search, with no page builder or template underneath.",
  },
  {
    name: "Web application and SaaS development",
    description:
      "Full-stack products with authentication, payments, dashboards and admin tooling, built on Next.js, Node and Postgres and shipped with full source ownership.",
  },
  {
    name: "Mobile application development",
    description:
      "Native and cross-platform iOS and Android apps, built with Swift, React Native and Expo and shipped to the App Store and Google Play.",
  },
  {
    name: "Custom business software and workflow systems",
    description:
      "Internal tools that replace spreadsheets and per-seat SaaS: maintenance management, inventory, scheduling, quoting and reporting, self-hostable if you want it.",
  },
  {
    name: "AI automation and agent integrations",
    description:
      "Automations and assistants wired into the systems a business already runs, built on the Anthropic and OpenAI APIs with human review where it matters.",
  },
  {
    name: "Technical SEO and answer engine optimization (AEO)",
    description:
      "Structured data, Core Web Vitals, sitemaps, llms.txt and agent cards, so a site resolves correctly in both search results and AI assistant answers.",
  },
];

export const DATA = {
  name: "Chris Bender",
  initials: "CB",
  url: "https://chrisbender.dev",
  location: "Kitchener-Waterloo, ON",
  locationLink: "https://www.google.com/maps/place/Kitchener-Waterloo,+ON",
  description:
    "I design and develop performant websites, applications, and custom software for founders, growing teams, and enterprise organizations.",
  summary:
    "From the first conversation to launch, you work directly with me.\n\nI'm the founder of [Automatq](https://automatq.com), based in Kitchener-Waterloo, Ontario. I partner with clients across Canada and internationally, keeping communication clear, decisions simple, and projects moving fast. Every detail is tailored to your business.",
  avatarUrl: "/me.jpg",
  skills,
  services,
  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },
    { href: "/blog", icon: NotebookIcon, label: "Blog" },
  ],
  contact: {
    email: "chris@automatq.com",
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://github.com/automatq",
        icon: Icons.github,
        navbar: true,
      },
      LinkedIn: {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/chrisdbender/",
        icon: Icons.linkedin,
        navbar: true,
      },
      Instagram: {
        name: "Instagram",
        url: "https://www.instagram.com/chrisdbender",
        icon: Icons.instagram,
        navbar: false,
      },
      YouTube: {
        name: "YouTube",
        url: "https://www.youtube.com/@chrisdbender",
        icon: Icons.youtube,
        navbar: true,
      },
      email: {
        name: "Send Email",
        url: "mailto:chris@automatq.com",
        icon: Icons.email,
        navbar: false,
      },
    },
  },

  work: [
    {
      company: "Automatq",
      href: "https://automatq.com",
      badges: [],
      location: "Kitchener-Waterloo, ON",
      title: "Founder, Custom Software Development",
      logoUrl: "/automatq.svg",
      start: "2025",
      end: "Present",
      description:
        "Automatq is my custom software agency, building web applications, high-performance websites, and native iOS and Android products for founders, growing teams, and enterprise organizations. Every solution is designed around the client’s specific needs, built with clean, scalable code, and delivered with full ownership—no proprietary platforms, vendor lock-in, or dependency on us.",
    },
  ],
  education,
  openSource,
  projects: [
    {
      title: "Building Blocks Nursery School",
      href: "https://buildingblocks-nine.vercel.app/",
      dates: "2026",
      active: true,
      description:
        "A playful marketing site for a licensed Brampton nursery school, built around one action: book a tour. The logo's alphabet blocks drive the whole identity, and the fee, subsidy and handbook questions parents used to phone in about all live on their own pages.",
      technical:
        "Next.js App Router, prerendered with the same five-minute revalidation window. Tour requests run through server-only route handlers into Neon Postgres, with Resend notifications and a protected staff inbox for ownership, status and activity history. The SEO and answer engine optimization (AEO) layer carries BreadcrumbList, ChildCare, City and OpeningHoursSpecification JSON-LD, and publishes the same business facts as an llms.txt.",
      technologies: [
        "Next.js",
        "React",
        "Tailwind CSS",
        "Motion Design",
        "Neon Postgres",
        "Resend",
        "SEO & AEO",
      ],
      review: {
        quote:
          "Amazing solution and timely delivery. Will definitely use them again.",
        author: "N L",
        rating: 5,
        href: "https://share.google/qlCrZ0Yl5k7P19HII",
      },
      links: [
        {
          type: "Website",
          href: "https://buildingblocks-nine.vercel.app/",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "/projects/building-blocks.png",
      video: "",
    },
    {
      title: "Brilliant Minds Montessori",
      href: "https://brilliantmindsmontessori.com",
      dates: "2026",
      active: true,
      description:
        "A warm, photography-led site for a licensed Montessori centre running two Mississauga locations. Toddler and preschool programs, hours and contact details for each centre are split cleanly so a parent lands on the one nearest them and enquires in a couple of taps.",
      technical:
        "Next.js App Router, prerendered at build and revalidated on a five-minute stale window at the edge. Server-side route handlers validate enquiries, persist them to Neon Postgres, notify the right centre through Resend and feed a password-protected staff inbox with status history. Each centre emits ChildCare, PostalAddress and OpeningHoursSpecification JSON-LD so its hours and address resolve in local search.",
      technologies: [
        "Next.js",
        "React",
        "Tailwind CSS",
        "Responsive Design",
        "Neon Postgres",
        "Resend",
        "SEO & AEO",
      ],
      links: [
        {
          type: "Website",
          href: "https://brilliantmindsmontessori.com",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "/projects/brilliant-minds-montessori.png",
      video: "",
    },
    {
      title: "Idcibidci",
      href: "https://www.idcibidci.is/tours/std02r7",
      dates: "2026",
      active: true,
      description:
        "A trade-facing site for an Icelandic ground operator selling ready-made tour programmes to agencies and planners. Each itinerary gets a full page — day-by-day route, driving distances, highlights and an interactive regional map — so a partner can price and sell a departure without a single email back and forth.",
      technical:
        "React on Vite, code-split into app and vendor bundles and served from Vercel's edge cache. The backend runs on Vercel Functions and Neon Postgres: an authenticated admin workspace manages itinerary copy and enquiries, while Vercel Blob stores uploaded media. Every itinerary emits TouristTrip and TouristDestination JSON-LD next to the interactive regional map, and imagery ships as AVIF and WebP.",
      technologies: [
        "React",
        "Vite",
        "Tailwind CSS",
        "Interactive Maps",
        "Vercel Functions",
        "Neon Postgres",
        "Vercel Blob",
        "SEO & AEO",
      ],
      links: [
        {
          type: "Website",
          href: "https://www.idcibidci.is/tours/std02r7",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "/projects/idcibidci.png",
      video: "",
    },
    {
      title: "AVS Machine & Tool",
      href: "https://www.avsmachineandtool.com/",
      dates: "2026",
      active: true,
      description:
        "A site with some shop floor grit for a family-owned Waterloo precision machining shop running since 1986. Five service lines, real capability numbers and shop-floor photography carry the credibility, with a quote request as the single call to action.",
      technical:
        "React on Vite with no CMS behind it: public content lives in typed components and ships as one hashed JS bundle and one stylesheet from Vercel's edge cache. The backend is a focused Vercel Function that validates multipart quote requests, accepts drawing attachments, delivers them to the shop through SendGrid and sends the customer a reference-numbered confirmation.",
      technologies: [
        "React",
        "Vite",
        "Tailwind CSS",
        "Vercel Functions",
        "SendGrid",
      ],
      review: {
        quote:
          "Working with him made the entire project incredibly easy. He truly understands our needs and is fantastic to work with. Highly recommended!",
        author: "Albert Martin",
        rating: 5,
        href: "https://share.google/fZuJHrxR1iLeRfDV3",
      },
      links: [
        {
          type: "Website",
          href: "https://www.avsmachineandtool.com/",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "/projects/avs-machine-and-tool.png",
      video: "",
    },
    {
      title: "ROCA Technologies",
      href: "https://www.rocatechnologies.ca",
      dates: "2026",
      active: true,
      description:
        "A studio site for a one-person software product studio in Kitchener, built as a long-form scrolling case study for its flagship product, SAVX — a Canadian grocery savings app. Scroll-driven animation carries the narrative from the problem through the AI pipeline to pricing, without the page ever feeling like a deck.",
      technical:
        "A static document driven by GSAP timelines pinned to scroll position, with Three.js handling the dimensional moments. There is no client-side router or framework runtime, so the narrative never waits on hydration. A small Vercel serverless backend validates and stores the multi-step contract walkthrough, then exposes submissions through a protected response dashboard with CSV export.",
      technologies: [
        "JavaScript",
        "GSAP",
        "Three.js",
        "Vercel Functions",
        "Admin Dashboard",
      ],
      review: {
        quote:
          "Actually blew my mind what he could do for me, website was more than I expected. Quick communication when I needed the website updated. Deployed within minutes.",
        author: "Paul Tulai",
        rating: 5,
        href: "https://share.google/dEzpqaGctsjwF6dqY",
      },
      links: [
        {
          type: "Website",
          href: "https://www.rocatechnologies.ca",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "/projects/roca-technologies.png",
      video: "",
    },
    {
      title: "Zoltan Builds",
      href: "https://www.zoltanbuilds.ca/",
      dates: "2026",
      active: true,
      description:
        "A lead-generation site for a general contractor across Guelph, Kitchener-Waterloo and the GTA, built around a three-step quote flow: name and number, then the job and a few photos, then an estimate in 24 hours. Every service area gets a local page written for that market, and the business facts are published as an llms.txt and agent card so AI assistants answer from the source.",
      technical:
        "Hand-written HTML, CSS and JavaScript on an Express backend deployed to Vercel. Quote requests and member accounts persist to Postgres; media uploads go directly to Vercel Blob; Resend, Trello and Discord automate confirmations and lead hand-off; and protected customer and admin portals keep project activity together. The discovery layer adds service-area JSON-LD, a sitemap, llms.txt and an agent card.",
      technologies: [
        "HTML",
        "CSS",
        "JavaScript",
        "Express",
        "Postgres",
        "Vercel Blob",
        "Resend",
        "Local SEO & AEO",
      ],
      review: {
        quote:
          "Chris built my site from scratch and now handles all the hosting and ongoing maintenance. He keeps everything running smoothly so I don't have to worry about a thing.",
        author: "Zoltan Matus",
        rating: 5,
        href: "https://share.google/7wGnJev91jq5ig86l",
      },
      links: [
        {
          type: "Website",
          href: "https://www.zoltanbuilds.ca/",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "/projects/zoltan-builds.png",
      video: "",
    },
  ],
  hackathons,
} as const;
