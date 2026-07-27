import { useState } from "react";
import SEO from "../components/SEO";
import { PageHeader, Card, Section } from "../components/Common";
import SubnetCalculator from "../components/tools/SubnetCalculator";
import Base64Tool from "../components/tools/Base64Tool";
import PasswordGenerator from "../components/tools/PasswordGenerator";
import JsonFormatter from "../components/tools/JsonFormatter";
import HashGenerator from "../components/tools/HashGenerator";
import ColorPicker from "../components/tools/ColorPicker";
import QrGenerator from "../components/tools/QrGenerator";
import MarkdownPreview from "../components/tools/MarkdownPreview";

const TOOLS = [
  { id: "subnet", label: "Subnet Calculator", component: SubnetCalculator },
  { id: "base64", label: "Base64 Encoder", component: Base64Tool },
  { id: "password", label: "Password Generator", component: PasswordGenerator },
  { id: "json", label: "JSON Formatter", component: JsonFormatter },
  { id: "hash", label: "Hash Generator", component: HashGenerator },
  { id: "color", label: "Color Picker", component: ColorPicker },
  { id: "qr", label: "QR Generator", component: QrGenerator },
  { id: "markdown", label: "Markdown Preview", component: MarkdownPreview },
] as const;

const COMING_SOON = ["Ping Tool", "Port Checker"];

export default function Tools() {
  const [active, setActive] = useState<(typeof TOOLS)[number]["id"]>("subnet");
  const ActiveComponent = TOOLS.find((t) => t.id === active)!.component;

  return (
    <>
      <SEO title="Tools" description="Free browser-based tools: subnet calculator, Base64, password generator, and more." path="/tools" />

      <PageHeader eyebrow="Utilities" title="Tools" description="Small, free tools that run entirely in your browser — nothing is sent to a server." />

      <Section className="pt-0">
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {TOOLS.map((t) => (
            <button
              key={t.id}
              onClick={() => setActive(t.id)}
              className={`px-3 py-1.5 rounded-md text-xs font-mono border transition-colors ${
                active === t.id
                  ? "border-cyan-400/70 text-cyan-bright bg-cyan-400/5"
                  : "border-cyan-400/15 text-ink-muted hover:border-cyan-400/40"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <Card className="max-w-2xl mx-auto">
          <h2 className="font-semibold text-ink mb-4">{TOOLS.find((t) => t.id === active)!.label}</h2>
          <ActiveComponent />
        </Card>

        <div className="max-w-2xl mx-auto mt-8 text-center">
          <p className="text-xs text-ink-dim">
            Coming soon (require a small backend, not just the browser): {COMING_SOON.join(" · ")}
          </p>
        </div>
      </Section>
    </>
  );
}
