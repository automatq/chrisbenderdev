import { Timeline, TimelineConnectItem, TimelineItem } from "@/components/timeline";
import TechNote from "@/components/tech-note";
import { Badge } from "@/components/ui/badge";
import { DATA } from "@/data/resume";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function ProjectsSection() {
  return (
    <section id="projects" className="overflow-hidden">
      <div className="flex min-h-0 w-full flex-col gap-y-8">
        <div className="flex flex-col items-center justify-center gap-y-4">
          <div className="flex w-full items-center">
            <div className="h-px flex-1 bg-linear-to-r from-transparent from-5% via-border via-95% to-transparent" />
            <div className="z-10 rounded-xl border bg-primary px-4 py-1">
              <span className="text-sm font-medium text-background">Projects</span>
            </div>
            <div className="h-px flex-1 bg-linear-to-l from-transparent from-5% via-border via-95% to-transparent" />
          </div>
          <div className="flex flex-col items-center justify-center gap-y-3">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
              I like building things
            </h2>
            <p className="text-balance text-center text-muted-foreground md:text-lg/relaxed lg:text-base/relaxed xl:text-lg/relaxed">
              I&apos;ve designed and developed websites, applications, and digital
              experiences for businesses across a range of industries. Here&apos;s a
              look at what I&apos;ve built.
            </p>
          </div>
        </div>

        <Timeline>
          {DATA.projects.map((project) => (
            <TimelineItem
              key={project.title}
              className="flex w-full items-start justify-between gap-5 sm:gap-10"
            >
              <TimelineConnectItem className="flex items-start justify-center">
                {/* Length rather than truthiness: DATA is `as const`, so a bare
                    `project.image ?` makes TS treat the monogram branch as dead
                    once every project has an icon, and narrows project to never. */}
                {project.image.length > 0 ? (
                  <Image
                    src={project.image}
                    alt=""
                    width={40}
                    height={40}
                    className="z-10 size-10 shrink-0 rounded-full border bg-card object-cover shadow ring-2 ring-border"
                  />
                ) : (
                  <div className="z-10 flex size-10 shrink-0 items-center justify-center rounded-full border bg-card text-sm font-semibold shadow ring-2 ring-border">
                    {project.title.charAt(0)}
                  </div>
                )}
              </TimelineConnectItem>

              <div className="flex min-w-0 flex-1 flex-col justify-start gap-2">
                <time className="text-xs text-muted-foreground">
                  {project.dates}
                </time>
                <Link
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex w-fit items-center gap-1.5 font-semibold leading-none"
                >
                  <span>{project.title}</span>
                  <ArrowUpRight
                    className="size-3.5 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </Link>
                <p className="text-sm leading-relaxed text-muted-foreground wrap-break-word">
                  {project.description}
                </p>
                <TechNote label={project.title}>{project.technical}</TechNote>
                {"review" in project && project.review && (
                  <blockquote className="mt-1 border-l-2 border-primary/30 pl-3">
                    <p
                      className="text-xs tracking-widest text-amber-500"
                      aria-label={`${project.review.rating} out of 5 stars`}
                    >
                      {"★".repeat(project.review.rating)}
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-foreground/80">
                      “{project.review.quote}”
                    </p>
                    <Link
                      href={project.review.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group mt-1.5 flex w-fit items-center gap-1 text-xs font-medium text-muted-foreground hover:text-foreground"
                    >
                      {project.review.author} · Google review
                      <ArrowUpRight
                        className="size-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        aria-hidden="true"
                      />
                    </Link>
                  </blockquote>
                )}
                <div className="mt-1 flex flex-wrap gap-1.5">
                  {project.technologies.map((technology) => (
                    <Badge
                      key={technology}
                      variant="secondary"
                      className="text-xs font-normal"
                    >
                      {technology}
                    </Badge>
                  ))}
                </div>
                <div className="mt-1 flex flex-wrap gap-2">
                  {project.links.map((link) => (
                    <Link
                      href={link.href}
                      key={`${project.title}-${link.type}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Badge className="flex items-center gap-1.5 bg-primary text-xs text-primary-foreground">
                        {link.icon}
                        {link.type}
                      </Badge>
                    </Link>
                  ))}
                </div>
              </div>
            </TimelineItem>
          ))}
        </Timeline>
      </div>
    </section>
  );
}

