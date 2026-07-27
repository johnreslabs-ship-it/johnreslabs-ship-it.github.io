import { useMemo, useState } from "react";
import { marked } from "marked";

const DEFAULT_MD = `# Johnres Lab

Quick **markdown** preview tool.

- Works entirely in your browser
- No server round-trip
- Great for checking README formatting
`;

export default function MarkdownPreview() {
  const [md, setMd] = useState(DEFAULT_MD);
  const html = useMemo(() => marked.parse(md, { async: false }) as string, [md]);

  return (
    <div className="grid md:grid-cols-2 gap-4">
      <textarea
        value={md}
        onChange={(e) => setMd(e.target.value)}
        rows={12}
        className="w-full px-3 py-2 rounded-md bg-navy border border-cyan-400/20 text-ink font-mono text-sm focus:outline-none focus:border-cyan-400/60"
      />
      <div
        className="prose-invert px-4 py-3 rounded-md bg-navy border border-cyan-400/10 text-ink-muted overflow-y-auto max-h-[20rem]"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
