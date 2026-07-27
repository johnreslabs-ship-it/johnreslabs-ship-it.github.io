import SEO from "../components/SEO";
import { PageHeader, Card, Badge, Section } from "../components/Common";

const SKILLS = [
  "Windows Troubleshooting",
  "Linux",
  "Ubuntu",
  "Dual Boot",
  "Printer Troubleshooting",
  "Networking",
  "Thin Clients",
  "Remote Support",
  "Active Directory Basics",
  "DNS",
  "IP Configuration",
  "VMware",
  "VirtualBox",
  "AI Tools",
  "Automation",
  "GitHub",
  "Website Development",
  "Technical Documentation",
];

const LANGUAGES = ["English", "Tamil", "Hindi"];

const TIMELINE = [
  {
    year: "Present",
    title: "Technical Support Engineer",
    body: "Providing day-to-day Windows and Linux support, remote troubleshooting, and infrastructure basics — the real-world problems that shape every tutorial on this site.",
  },
  {
    year: "6+ years",
    title: "Hands-on with OS installs, VMs, and networking",
    body: "Dual-boot setups, VirtualBox/VMware environments, thin client deployments, and networking fundamentals across many different environments and hardware.",
  },
  {
    year: "Ongoing",
    title: "Johnres Lab",
    body: "Turning day-to-day technical support experience into clear, step-by-step tutorials so the fixes that take hours to figure out only take minutes to learn.",
  },
];

export default function About() {
  return (
    <>
      <SEO
        title="About"
        description="J Antony Johnres (Tony Rex) — Technical Support Engineer with 6+ years of experience in Windows, Linux, networking, and virtual machines."
        path="/about"
      />

      <PageHeader
        eyebrow="About"
        title="J Antony Johnres"
        description="Known online as Tony Rex — Technical Support Engineer with 6+ years of experience, sharing what actually works."
      />

      <Section className="pt-0 grid md:grid-cols-3 gap-8">
        <Card className="md:col-span-1">
          <h2 className="font-mono text-sm uppercase tracking-widest text-ink-dim mb-3">Languages</h2>
          <div className="flex flex-wrap gap-2 mb-6">
            {LANGUAGES.map((l) => (
              <Badge key={l}>{l}</Badge>
            ))}
          </div>
          <h2 className="font-mono text-sm uppercase tracking-widest text-ink-dim mb-3">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {SKILLS.map((s) => (
              <Badge key={s}>{s}</Badge>
            ))}
          </div>
        </Card>

        <div className="md:col-span-2 space-y-6">
          {TIMELINE.map((item) => (
            <Card key={item.title} className="relative pl-6 before:content-[''] before:absolute before:left-0 before:top-6 before:bottom-6 before:w-px before:bg-cyan-400/20">
              <p className="font-mono text-xs text-cyan mb-1">{item.year}</p>
              <h3 className="font-semibold text-ink mb-2">{item.title}</h3>
              <p className="text-sm text-ink-muted leading-relaxed">{item.body}</p>
            </Card>
          ))}

          <a
            href="/assets/resume.pdf"
            className="inline-block px-5 py-3 rounded-lg bg-cyan text-abyss font-semibold text-sm hover:bg-cyan-bright transition-colors"
          >
            Download Resume
          </a>
          <p className="text-xs text-ink-dim">
            Add your resume file at <code>/public/assets/resume.pdf</code> to enable this link.
          </p>
        </div>
      </Section>
    </>
  );
}
