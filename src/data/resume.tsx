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
  { name: "Cloudflare", icon: SiCloudflare },
  { name: "AWS", icon: FaAws },
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

export const DATA = {
  name: "Chris Bender",
  initials: "CB",
  url: "https://chrisbender.dev",
  location: "Kitchener-Waterloo, ON",
  locationLink: "https://www.google.com/maps/place/Kitchener-Waterloo,+ON",
  description:
    "I design and develop performant websites, applications, and custom software for founders, growing teams, and enterprise organizations.",
  summary:
    "I'm a developer and designer based in Kitchener-Waterloo, Ontario, dedicated to crafting immersive digital experiences. My work bridges the gap between creative code and functional design, focusing on performance, interaction, and clean aesthetics. I work directly with founders and teams: no hand-offs, no middlemen, fast iteration from first call to launch. Every site is handcrafted with custom design and custom code, built to feel like yours and no one else's. Through [Automatq](https://automatq.com), I create custom websites, software, applications, and AI automation systems—digital products designed around how each business works and where it wants to go. I work with clients across Canada and internationally.",
  avatarUrl: "/me.jpg",
  skills,
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
      title: "Founder, Web Development & AI Automation",
      logoUrl: "",
      start: "2025",
      end: "Present",
      description:
        "Automatq is my agency, building modern websites, AI automations, and digital systems for founders, small teams, and enterprise organizations. We pair clean code and considered design with practical automation to ship products that move metrics, not just look good.",
    },
  ],
  education,
  projects: [
    {
      title: "MarkedUp",
      href: "https://markedup-smoky.vercel.app",
      dates: "2026",
      active: true,
      description:
        "A collaborative, block-based Markdown workspace with real-time editing, backlinks, databases, wikis, whiteboards, spreadsheets, calls, publishing, and AI-powered writing and operations tools.",
      technologies: [
        "Next.js",
        "TypeScript",
        "TipTap",
        "Liveblocks",
        "Yjs",
        "Clerk",
        "Prisma",
        "Neon Postgres",
        "OpenAI",
      ],
      links: [
        {
          type: "Website",
          href: "https://markedup-smoky.vercel.app",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Source",
          href: "https://github.com/automatq/markedup",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "/projects/markedup.png",
      video: "",
    },
    {
      title: "MainTek CMMS",
      href: "https://github.com/automatq/cmms",
      dates: "2026",
      active: true,
      description:
        "A full-stack maintenance management platform for tracking assets, work orders, preventive maintenance, inventory, procurement, and operational reporting. It includes real-time updates, an AI assistant, and a mobile app for technicians in the field.",
      technologies: [
        "NestJS",
        "TypeORM",
        "PostgreSQL",
        "Redis",
        "BullMQ",
        "Next.js",
        "React",
        "Tailwind CSS",
        "shadcn/ui",
        "Recharts",
        "Expo",
        "React Native",
        "Socket.io",
        "MinIO / AWS S3",
        "AWS Bedrock / Ollama",
        "Stripe",
        "Docker Compose",
        "Terraform",
        "AWS ECS / RDS / ElastiCache",
        "Caddy",
      ],
      links: [
        {
          type: "Source",
          href: "https://github.com/automatq/cmms",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "/projects/maintek-cmms.png",
      video: "",
    },
    {
      title: "Idcibidci",
      href: "https://www.idcibidci.is/tours/std02r7",
      dates: "2026",
      active: true,
      description:
        "A trade-facing site for an Icelandic ground operator selling ready-made tour programmes to agencies and planners. Each itinerary gets a full page — day-by-day route, driving distances, highlights and an interactive regional map — so a partner can price and sell a departure without a single email back and forth.",
      technologies: ["React", "Vite", "Tailwind CSS", "Interactive Maps"],
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
      title: "Brilliant Minds Montessori",
      href: "https://brilliantmindsmontessori.com",
      dates: "2026",
      active: true,
      description:
        "A warm, photography-led site for a licensed Montessori centre running two Mississauga locations. Toddler and preschool programs, hours and contact details for each centre are split cleanly so a parent lands on the one nearest them and enquires in a couple of taps.",
      technologies: ["Next.js", "React", "Tailwind CSS", "Responsive Design"],
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
      title: "Building Blocks Nursery School",
      href: "https://buildingblocks-nine.vercel.app/",
      dates: "2026",
      active: true,
      description:
        "A playful marketing site for a licensed Brampton nursery school, built around one action: book a tour. The logo's alphabet blocks drive the whole identity, and the fee, subsidy and handbook questions parents used to phone in about all live on their own pages.",
      technologies: ["Next.js", "React", "Tailwind CSS", "Motion Design"],
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
      title: "AVS Machine & Tool",
      href: "https://www.avsmachineandtool.com/",
      dates: "2026",
      active: true,
      description:
        "A site with some shop floor grit for a family-owned Waterloo precision machining shop running since 1986. Five service lines, real capability numbers and shop-floor photography carry the credibility, with a quote request as the single call to action.",
      technologies: ["React", "Vite", "Tailwind CSS", "Custom UI Components"],
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
      technologies: ["JavaScript", "GSAP", "Scroll Animation", "Static Site"],
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
      technologies: ["HTML", "CSS", "JavaScript", "Local SEO"],
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
