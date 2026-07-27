import { useState } from "react";

export default function JsonFormatter() {
  const [input, setInput] = useState('{"name":"Johnres Lab","topics":["Linux","Windows"]}');
  const [error, setError] = useState<string | null>(null);
  const [output, setOutput] = useState("");

  function format() {
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, 2));
      setError(null);
    } catch (e: any) {
      setError(e.message);
      setOutput("");
    }
  }

  function minify() {
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed));
      setError(null);
    } catch (e: any) {
      setError(e.message);
      setOutput("");
    }
  }

  return (
    <div className="space-y-4">
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        rows={6}
        className="w-full px-3 py-2 rounded-md bg-navy border border-cyan-400/20 text-ink font-mono text-sm focus:outline-none focus:border-cyan-400/60"
      />
      <div className="flex gap-3">
        <button onClick={format} className="px-4 py-2 rounded-lg bg-cyan text-abyss font-semibold text-sm hover:bg-cyan-bright transition-colors">
          Format
        </button>
        <button onClick={minify} className="px-4 py-2 rounded-lg border border-cyan-400/30 text-ink text-sm font-semibold hover:border-cyan-400/70 transition-colors">
          Minify
        </button>
      </div>
      {error && <p className="text-sm text-red-400">Invalid JSON: {error}</p>}
      {output && (
        <pre className="px-3 py-2 rounded-md bg-navy border border-cyan-400/10 text-cyan-bright font-mono text-sm overflow-x-auto whitespace-pre-wrap break-all">
          {output}
        </pre>
      )}
    </div>
  );
}
