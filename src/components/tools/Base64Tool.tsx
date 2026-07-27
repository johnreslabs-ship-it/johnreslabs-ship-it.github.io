import { useState } from "react";

export default function Base64Tool() {
  const [input, setInput] = useState("Johnres Lab");
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [error, setError] = useState<string | null>(null);

  let output = "";
  try {
    output = mode === "encode" ? btoa(input) : atob(input);
    if (error) setError(null);
  } catch {
    output = "";
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        {(["encode", "decode"] as const).map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={`px-3 py-1.5 rounded-md text-xs font-mono border transition-colors ${
              mode === m ? "border-cyan-400/70 text-cyan-bright bg-cyan-400/5" : "border-cyan-400/15 text-ink-muted"
            }`}
          >
            {m === "encode" ? "Encode" : "Decode"}
          </button>
        ))}
      </div>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        rows={4}
        className="w-full px-3 py-2 rounded-md bg-navy border border-cyan-400/20 text-ink font-mono text-sm focus:outline-none focus:border-cyan-400/60"
        placeholder={mode === "encode" ? "Text to encode…" : "Base64 to decode…"}
      />
      <div>
        <span className="text-xs text-ink-dim font-mono">Result</span>
        <pre className="mt-1 px-3 py-2 rounded-md bg-navy border border-cyan-400/10 text-cyan-bright font-mono text-sm overflow-x-auto whitespace-pre-wrap break-all">
          {output || "Invalid input for this mode."}
        </pre>
      </div>
    </div>
  );
}
