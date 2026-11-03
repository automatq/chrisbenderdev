import BlurFade from "@/components/magicui/blur-fade";
import BlurFadeText from "@/components/magicui/blur-fade-text";
import { DATA } from "@/data/resume";
import Image from "next/image";
import Link from "next/link";
import Markdown from "react-markdown";
import ContactSection from "@/components/section/contact-section";
import OpenSourceSection from "@/components/section/open-source-section";
import ProjectsSection from "@/components/section/projects-section";
import WorkSection from "@/components/section/work-section";
import { ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";
import JsonLd from "@/components/json-ld";
import { alternates } from "@/lib/seo";
import {
  ID,
  absoluteUrl,
  clientWorkNode,
  graph,
  openSourceNode,
  organizationNode,
  personNode,
  websiteNode,
} from "@/lib/structured-data";

const BLUR_FADE_DELAY = 0.04;

export const metadata: Metadata = {
  alternates: alternates("/"),
};

const homepageGraph = graph([
  websiteNode(),
  {
    "@type": "ProfilePage",
    "@id": ID.profilePage,
    url: DATA.url,
    name: `${DATA.name} — Custom Software Developer & Designer`,
    description: DATA.description,
    inLanguage: "en-CA",
    isPartOf: { "@id": ID.website },
    mainEntity: { "@id": ID.person },
    about: { "@id": ID.person },
    primaryImageOfPage: absoluteUrl(DATA.avatarUrl),
    hasPart: [{ "@id": ID.clientWork }, { "@id": ID.openSource }],
  },
  personNode(),
  organizationNode(),
  clientWorkNode(),
  openSourceNode(),
]);

export default function Page() {
  return (
    <main className="min-h-dvh flex flex-col gap-14 relative">
      <JsonLd graph={homepageGraph} />
      <section id="hero">
        <div className="mx-auto w-full max-w-2xl space-y-8">
          <div className="gap-2 gap-y-6 flex flex-col md:flex-row justify-between">
            <div className="gap-2 flex flex-col order-2 md:order-1">
              {/* The page's only h1. The visible greeting is deliberately
                  short, so the full name and role ride along as screen
                  reader-only text that matches the title and description. */}
              <BlurFadeText
                as="h1"
                delay={BLUR_FADE_DELAY}
                className="text-3xl font-semibold tracking-tighter sm:text-4xl lg:text-5xl"
                yOffset={8}
                text="Hi, I'm Chris"
                srOnlyText={` Bender — custom software developer and designer in ${DATA.location}`}
              />
              <BlurFadeText
                className="text-muted-foreground max-w-[600px] md:text-lg lg:text-xl"
                delay={BLUR_FADE_DELAY}
                text={DATA.description}
              />
            </div>
            <BlurFade delay={BLUR_FADE_DELAY} className="order-1 md:order-2">
              {/* next/image rather than the Radix avatar: Radix probes the file
                  from the client and server-renders only the initials, which
                  kept the portrait out of the HTML entirely and pushed the
                  largest above-the-fold image to after hydration. `priority`
                  preloads it instead. */}
              <Image
                src={DATA.avatarUrl}
                alt={`${DATA.name} — custom software developer and designer`}
                width={128}
                height={128}
                priority
                className="size-24 shrink-0 rounded-full border object-cover shadow-lg ring-4 ring-muted md:size-32"
              />
            </BlurFade>
          </div>
        </div>
      </section>
      <section id="about">
        <div className="flex min-h-0 flex-col gap-y-4">
          <BlurFade delay={BLUR_FADE_DELAY * 3}>
            <h2 className="text-xl font-bold">About</h2>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 4}>
            <div className="prose max-w-full text-pretty font-sans leading-relaxed text-muted-foreground dark:prose-invert">
              <Markdown>
                {DATA.summary}
              </Markdown>
            </div>
          </BlurFade>
        </div>
      </section>
      <section id="work">
        <div className="flex min-h-0 flex-col gap-y-6">
          <BlurFade delay={BLUR_FADE_DELAY * 5}>
            <h2 className="text-xl font-bold">Work Experience</h2>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 6}>
            <WorkSection />
          </BlurFade>
        </div>
      </section>
      {DATA.education.length > 0 && (
      <section id="education">
        <div className="flex min-h-0 flex-col gap-y-6">
          <BlurFade delay={BLUR_FADE_DELAY * 7}>
            <h2 className="text-xl font-bold">Education &amp; Certifications</h2>
          </BlurFade>
          <div className="flex flex-col gap-8">
            {DATA.education.map((education, index) => (
              <BlurFade
                key={education.school}
                delay={BLUR_FADE_DELAY * 8 + index * 0.05}
              >
                <Link
                  href={education.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-x-3 justify-between group"
                >
                  <div className="flex items-center gap-x-3 flex-1 min-w-0">
                    <div className="flex size-8 flex-none items-center justify-center rounded-full border bg-card p-1.5 shadow ring-2 ring-border md:size-10 md:p-2">
                      <education.icon className="size-full" />
                    </div>
                    <div className="flex-1 min-w-0 flex flex-col gap-0.5">
                      <div className="font-semibold leading-none flex items-center gap-2">
                        {education.school}
                        <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" aria-hidden />
                      </div>
                      <div className="font-sans text-sm text-muted-foreground">
                        {education.degree}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-xs tabular-nums text-muted-foreground text-right flex-none">
                    <span>
                      {education.status}
                    </span>
                  </div>
                </Link>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>
      )}
      <section id="skills">
        <div className="flex min-h-0 flex-col gap-y-4">
          <BlurFade delay={BLUR_FADE_DELAY * 9}>
            <h2 className="text-xl font-bold">Skills</h2>
          </BlurFade>
          <div className="flex flex-wrap gap-2">
            {DATA.skills.map((skill, id) => (
              <BlurFade key={skill.name} delay={BLUR_FADE_DELAY * 10 + id * 0.05}>
                <div className="border bg-background border-border ring-2 ring-border/20 rounded-xl h-8 w-fit px-4 flex items-center gap-2">
                  {skill.icon && <skill.icon className="size-4 rounded overflow-hidden object-contain" />}
                  <span className="text-foreground text-sm font-medium">{skill.name}</span>
                </div>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>
      <section id="projects">
        <BlurFade delay={BLUR_FADE_DELAY * 11}>
          <ProjectsSection />
        </BlurFade>
      </section>
      {DATA.openSource.length > 0 && (
      <section id="open-source">
        <BlurFade delay={BLUR_FADE_DELAY * 13}>
          <OpenSourceSection />
        </BlurFade>
      </section>
      )}
      <section id="contact">
        <BlurFade delay={BLUR_FADE_DELAY * 16}>
          <ContactSection />
        </BlurFade>
      </section>
    </main>
  );
}
