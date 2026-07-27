import { useMemo, useState } from "react";
import SEO from "../components/SEO";
import { PageHeader, Card, Badge, Section } from "../components/Common";
import { useLiveCollection } from "../lib/useLiveCollection";
import { DOWNLOADS, DOWNLOAD_CATEGORIES, type DownloadItem } from "../data/downloads";

export default function Downloads() {
  const [category, setCategory] = useState<string>("All");
  const { items: allDownloads } = useLiveCollection<DownloadItem>("downloads", DOWNLOADS);

  const filtered = useMemo(
    () => allDownloads.filter((d) => category === "All" || d.category === category),
    [allDownloads, category]
  );

  return (
    <>
      <SEO title="Downloads" description="Free cheat sheets, scripts, and templates from Johnres Lab." path="/downloads" />

      <PageHeader eyebrow="Resources" title="Downloads" description="Cheat sheets, scripts, and templates — free to use." />

      <Section className="pt-0">
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {DOWNLOAD_CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`px-3 py-1.5 rounded-md text-xs font-mono border transition-colors ${
                category === c
                  ? "border-cyan-400/70 text-cyan-bright bg-cyan-400/5"
                  : "border-cyan-400/15 text-ink-muted hover:border-cyan-400/40"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          {filtered.map((d) => (
            <Card key={d.id} className="flex flex-col">
              <div className="flex items-center justify-between mb-2">
                <Badge>{d.format}</Badge>
                <span className="text-xs text-ink-dim">{d.category}</span>
              </div>
              <h2 className="font-semibold text-ink mb-2">{d.name}</h2>
              <p className="text-sm text-ink-muted leading-relaxed mb-4 flex-1">{d.description}</p>
              <a
                href={d.href}
                target="_blank"
                rel="noreferrer"
                className="text-sm text-cyan hover:text-cyan-bright"
              >
                Download →
              </a>
            </Card>
          ))}
        </div>

        <p className="text-xs text-ink-dim text-center mt-10">
          Note: file links point to <code>/public/downloads/</code> — add your actual PDFs/scripts there with matching
          filenames to make these live.
        </p>
      </Section>
    </>
  );
}
