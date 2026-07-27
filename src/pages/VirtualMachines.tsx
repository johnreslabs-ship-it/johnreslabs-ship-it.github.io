import SEO from "../components/SEO";
import { PageHeader, Card, Section } from "../components/Common";
import Terminal from "../components/Terminal";

const TOPICS = [
  { title: "VirtualBox", body: "Free and open-source. The best starting point for testing distros and following along with beginner tutorials." },
  { title: "VMware Workstation", body: "Better 3D acceleration and snapshot handling for heavier workloads; now free for personal use." },
  { title: "Snapshots & Cloning", body: "Using snapshots to test risky changes safely, and cloning VMs to spin up repeatable test environments." },
  { title: "Networking Modes", body: "NAT, Bridged, and Host-Only networking — what each one is for and when to use it." },
];

const CHEATSHEET = [
  "VBoxManage list vms",
  "VBoxManage snapshot lab take before-update",
  "VBoxManage startvm lab --type headless",
];

export default function VirtualMachines() {
  return (
    <>
      <SEO title="Virtual Machines" description="VirtualBox and VMware setup, snapshots, cloning, and networking modes." path="/virtual-machines" />
      <PageHeader eyebrow="Topic" title="Virtual Machines" description="VirtualBox and VMware — setup, snapshots, and networking modes explained." />

      <Section className="pt-0 grid md:grid-cols-2 gap-8">
        <div className="grid gap-4">
          {TOPICS.map((t) => (
            <Card key={t.title}>
              <h3 className="font-semibold text-ink mb-2">{t.title}</h3>
              <p className="text-sm text-ink-muted leading-relaxed">{t.body}</p>
            </Card>
          ))}
        </div>
        <Terminal title="vboxmanage" lines={CHEATSHEET} typing />
      </Section>
    </>
  );
}
