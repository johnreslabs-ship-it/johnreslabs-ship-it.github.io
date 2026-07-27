import SEO from "../components/SEO";
import { PageHeader, Card, Badge, Section } from "../components/Common";
import { useLiveCollection } from "../lib/useLiveCollection";
import { PROJECTS, type Project } from "../data/projects";

export default function Projects() {
  const { items: projects } = useLiveCollection<Project>("projects", PROJECTS);

  return (
    <>
      <SEO title="Projects" description="Open-source projects, scripts, and tools from Johnres Lab." path="/projects" />

      <PageHeader eyebrow="Work" title="Projects" description="Scripts, tools, and the source for this site itself." />

      <Section className="pt-0 grid sm:grid-cols-2 gap-5">
        {projects.map((p) => (
          <Card key={p.id} className="flex flex-col">
            <h2 className="font-semibold text-ink mb-2">{p.name}</h2>
            <p className="text-sm text-ink-muted leading-relaxed mb-4 flex-1">{p.description}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {p.tech.map((t) => (
                <Badge key={t}>{t}</Badge>
              ))}
            </div>
            <div className="flex gap-3">
              {p.repo && (
                <a href={p.repo} target="_blank" rel="noreferrer" className="text-sm text-cyan hover:text-cyan-bright">
                  GitHub →
                </a>
              )}
              {p.demo && (
                <a href={p.demo} target="_blank" rel="noreferrer" className="text-sm text-cyan hover:text-cyan-bright">
                  Live demo →
                </a>
              )}
            </div>
          </Card>
        ))}
      </Section>
    </>
  );
}
