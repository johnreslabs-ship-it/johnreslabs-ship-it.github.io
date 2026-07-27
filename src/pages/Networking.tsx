import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import { PageHeader, Card, Section } from "../components/Common";

const TOPICS = [
  { title: "IP Addressing & Subnetting", body: "How IPv4 addressing and subnet masks work, with a calculator to check your work." },
  { title: "DNS & DHCP", body: "How name resolution and automatic address assignment work, and how to troubleshoot when either one fails." },
  { title: "Routers & Switches", body: "The difference between the two, basic configuration, and common home/small-office setups." },
  { title: "OSI Model & TCP/IP", body: "A practical, non-academic explanation of the layers — enough to reason about where a problem actually lives." },
  { title: "Active Directory Basics", body: "Users, groups, and organizational units — the fundamentals needed for basic AD administration." },
  { title: "Thin Clients & Printer Networking", body: "Deploying thin clients and diagnosing network printer discovery and connectivity issues." },
];

export default function Networking() {
  return (
    <>
      <SEO title="Networking" description="IP addressing, DNS, DHCP, routers, and Active Directory basics." path="/networking" />
      <PageHeader eyebrow="Topic" title="Networking" description="The fundamentals, explained the way I'd explain them to a new support engineer." />

      <Section className="pt-0 grid sm:grid-cols-2 gap-4">
        {TOPICS.map((t) => (
          <Card key={t.title}>
            <h3 className="font-semibold text-ink mb-2">{t.title}</h3>
            <p className="text-sm text-ink-muted leading-relaxed">{t.body}</p>
          </Card>
        ))}
      </Section>

      <Section className="pt-0 text-center">
        <Link
          to="/tools"
          className="inline-block px-5 py-3 rounded-lg bg-cyan text-abyss font-semibold text-sm hover:bg-cyan-bright transition-colors"
        >
          Try the Subnet Calculator →
        </Link>
      </Section>
    </>
  );
}
