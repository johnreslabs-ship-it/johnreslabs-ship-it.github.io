import SEO from "../components/SEO";
import { PageHeader, Card, Section } from "../components/Common";
import Terminal from "../components/Terminal";

const TOPICS = [
  { title: "Windows 10 & 11", body: "Installation, upgrades, activation issues, and the settings that matter most for a clean, stable setup." },
  { title: "Drivers & Registry", body: "Finding and fixing driver conflicts, safely editing the registry, and recovering from a bad driver install." },
  { title: "CMD & PowerShell", body: "The command-line tools worth learning — from basic navigation to scripts that automate repetitive support tasks." },
  { title: "Group Policy", body: "Using Group Policy Editor to manage settings across a single machine or a small network of them." },
  { title: "Printer Issues", body: "Diagnosing spooler crashes, driver mismatches, and network printer discovery problems." },
  { title: "Performance Optimization", body: "Startup programs, disk cleanup, and background services — what's safe to disable and what isn't." },
];

const CHEATSHEET = [
  "ipconfig /flushdns",
  "sfc /scannow",
  "Get-Service | Where Status -eq 'Running'",
  "shutdown /r /t 0",
];

export default function Windows() {
  return (
    <>
      <SEO title="Windows" description="Windows 10/11 troubleshooting, drivers, CMD/PowerShell, and performance tutorials." path="/windows" />
      <PageHeader eyebrow="Topic" title="Windows" description="Troubleshooting, driver fixes, and the command-line tools that save the most time." />

      <Section className="pt-0 grid md:grid-cols-2 gap-8">
        <div className="grid sm:grid-cols-2 gap-4">
          {TOPICS.map((t) => (
            <Card key={t.title}>
              <h3 className="font-semibold text-ink mb-2 text-sm">{t.title}</h3>
              <p className="text-xs text-ink-muted leading-relaxed">{t.body}</p>
            </Card>
          ))}
        </div>
        <Terminal title="powershell" lines={CHEATSHEET} />
      </Section>
    </>
  );
}
