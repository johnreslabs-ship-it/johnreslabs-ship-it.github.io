import SEO from "../components/SEO";
import { PageHeader, Card, Section } from "../components/Common";
import Terminal from "../components/Terminal";

const DISTROS = ["Ubuntu", "Linux Mint", "Fedora", "Debian", "Arch", "Zorin", "Pop!_OS"];

const TOPICS = [
  { title: "Dual Boot", body: "Setting up Windows and Linux side by side — partitioning, GRUB, and avoiding the common pitfalls that break one OS while installing the other." },
  { title: "GRUB & Recovery", body: "Fixing a broken bootloader after updates, restoring GRUB from a live USB, and recovering from boot failures without reinstalling." },
  { title: "Troubleshooting", body: "Diagnosing boot errors, kernel panics, driver issues, and package conflicts using logs, journalctl, and safe-mode boots." },
  { title: "Commands & Cheat Sheets", body: "The everyday command set for file management, permissions, processes, and package management across different distros." },
];

const CHEATSHEET = [
  "sudo apt update && sudo apt upgrade",
  "df -h && du -sh *",
  "chmod 755 script.sh",
  "journalctl -xe",
];

export default function Linux() {
  return (
    <>
      <SEO title="Linux" description="Distro guides, dual boot, GRUB recovery, and Linux troubleshooting tutorials." path="/linux" />
      <PageHeader eyebrow="Topic" title="Linux" description="Distros, dual boot, GRUB, and the troubleshooting steps that actually work." />

      <Section className="pt-0 grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          {TOPICS.map((t) => (
            <Card key={t.title}>
              <h3 className="font-semibold text-ink mb-2">{t.title}</h3>
              <p className="text-sm text-ink-muted leading-relaxed">{t.body}</p>
            </Card>
          ))}
        </div>
        <div>
          <Terminal title="cheatsheet.sh" lines={CHEATSHEET} />
          <Card className="mt-4">
            <h3 className="font-semibold text-ink mb-3">Distros covered</h3>
            <div className="flex flex-wrap gap-2">
              {DISTROS.map((d) => (
                <span key={d} className="text-xs font-mono px-2 py-1 rounded-md border border-cyan-400/25 text-cyan-bright bg-cyan-400/5">
                  {d}
                </span>
              ))}
            </div>
          </Card>
        </div>
      </Section>
    </>
  );
}
