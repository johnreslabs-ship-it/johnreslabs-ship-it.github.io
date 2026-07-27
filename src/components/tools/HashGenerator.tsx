import { useState } from "react";

const ALGOS = ["SHA-1", "SHA-256", "SHA-384", "SHA-512"] as const;

export default function HashGenerator() {
  const [input, setInput] = useState("Johnres Lab");
  const [hashes, setHashes] = useState<Record<string, string>>({});

  async function computeAll() {
    const encoder = new TextEncoder();
    const data = encoder.encode(input);
    const results: Record<string, string> = {};
    for (const algo of ALGOS) {
      const buf = await crypto.subtle.digest(algo, data);
      results[algo] = Array.from(new Uint8Array(buf))
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");
    }
    setHashes(results);
  }

  return (
    <div className="space-y-4">
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        rows={3}
        className="w-full px-3 py-2 rounded-md bg-navy border border-cyan-400/20 text-ink font-mono text-sm focus:outline-none focus:border-cyan-400/60"
      />
      <button
        onClick={computeAll}
        className="px-4 py-2 rounded-lg bg-cyan text-abyss font-semibold text-sm hover:bg-cyan-bright transition-colors"
      >
        Generate Hashes
      </button>
      <div className="space-y-2">
        {ALGOS.map((algo) =>
          hashes[algo] ? (
            <div key={algo}>
              <span className="text-xs text-ink-dim font-mono">{algo}</span>
              <pre className="mt-1 px-3 py-2 rounded-md bg-navy border border-cyan-400/10 text-cyan-bright font-mono text-xs overflow-x-auto break-all whitespace-pre-wrap">
                {hashes[algo]}
              </pre>
            </div>
          ) : null
        )}
      </div>
    </div>
  );
}
