/* eslint-disable @next/next/no-img-element */
import { Icons } from "@/components/icons";
import { Badge } from "@/components/ui/badge";
import { DATA } from "@/data/resume";
import { ArrowUpRight, Scale } from "lucide-react";
import Link from "next/link";

export default function OpenSourceSection() {
  return (
    <section className="overflow-hidden">
      <div className="flex min-h-0 w-full flex-col gap-y-8">
        <div className="flex flex-col items-center justify-center gap-y-4">
          <div className="flex w-full items-center">
            <div className="h-px flex-1 bg-linear-to-r from-transparent from-5% via-border via-95% to-transparent" />
            <div className="z-10 rounded-xl border bg-primary px-4 py-1">
              <span className="text-sm font-medium text-background">
                Open Source
              </span>
            </div>
            <div className="h-px flex-1 bg-linear-to-l from-transparent from-5% via-border via-95% to-transparent" />
          </div>
          <div className="flex flex-col items-center justify-center gap-y-3">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
              Built in the open
            </h2>
            <p className="text-balance text-center text-muted-foreground md:text-lg/relaxed lg:text-base/relaxed xl:text-lg/relaxed">
              Some of what I build ships with the source attached. These are the
              products and tools I maintain in public, free to read, fork or
              self-host.
            </p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {DATA.openSource.map((project) => (
            <div
              key={project.repo}
              className="flex flex-col gap-3 rounded-xl border bg-card p-5 ring-2 ring-border/20 transition-colors hover:border-foreground/20"
            >
              <div className="flex items-start gap-3">
                {project.image ? (
                  <img
                    src={project.image}
                    alt=""
                    className="size-10 shrink-0 rounded-lg border object-cover shadow"
                  />
                ) : (
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-lg border bg-background shadow">
                    <Icons.github className="size-4" />
                  </div>
                )}
                <div className="flex min-w-0 flex-1 flex-col gap-1.5">
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
                  <p className="truncate font-mono text-xs text-muted-foreground">
                    {project.repo}
                  </p>
                </div>
              </div>

              <p className="text-sm leading-relaxed text-muted-foreground wrap-break-word">
                {project.description}
              </p>

              <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted-foreground">
                <span>{project.role}</span>
                {project.license && (
                  <>
                    <span aria-hidden="true">·</span>
                    <span className="flex items-center gap-1">
                      <Scale className="size-3" aria-hidden="true" />
                      {project.license} license
                    </span>
                  </>
                )}
              </div>

              <div className="mt-auto flex flex-col gap-3 pt-1">
                <div className="flex flex-wrap gap-1.5">
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
                <div className="flex flex-wrap gap-2">
                  {project.links.map((link) => (
                    <Link
                      href={link.href}
                      key={`${project.repo}-${link.type}`}
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
            </div>
          ))}

          <Link
            href={DATA.contact.social.GitHub.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex min-h-40 flex-col items-center justify-center gap-2 rounded-xl border border-dashed p-5 text-center transition-colors hover:border-foreground/30 hover:bg-card"
          >
            <Icons.github className="size-6 text-muted-foreground transition-colors group-hover:text-foreground" />
            <span className="flex items-center gap-1.5 font-semibold leading-none">
              More on GitHub
              <ArrowUpRight
                className="size-3.5 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </span>
            <span className="font-mono text-xs text-muted-foreground">
              @automatq
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
