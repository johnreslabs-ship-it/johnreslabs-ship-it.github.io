import { useState } from "react";

const SETS = {
  lower: "abcdefghijklmnopqrstuvwxyz",
  upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  digits: "0123456789",
  symbols: "!@#$%^&*()-_=+[]{}",
};

export default function PasswordGenerator() {
  const [length, setLength] = useState(16);
  const [opts, setOpts] = useState({ lower: true, upper: true, digits: true, symbols: true });
  const [password, setPassword] = useState("");

  function generate() {
    const pool = (Object.keys(opts) as (keyof typeof opts)[])
      .filter((k) => opts[k])
      .map((k) => SETS[k])
      .join("");
    if (!pool) {
      setPassword("Select at least one character set.");
      return;
    }
    const bytes = new Uint32Array(length);
    crypto.getRandomValues(bytes);
    const result = Array.from(bytes, (b) => pool[b % pool.length]).join("");
    setPassword(result);
  }

  return (
    <div className="space-y-4">
      <label className="block">
        <span className="text-xs text-ink-dim font-mono">Length: {length}</span>
        <input
          type="range"
          min={6}
          max={64}
          value={length}
          onChange={(e) => setLength(Number(e.target.value))}
          className="mt-1 w-full accent-cyan-400"
        />
      </label>

      <div className="flex flex-wrap gap-3 text-sm">
        {(Object.keys(SETS) as (keyof typeof SETS)[]).map((k) => (
          <label key={k} className="flex items-center gap-2 text-ink-muted">
            <input
              type="checkbox"
              checked={opts[k]}
              onChange={(e) => setOpts({ ...opts, [k]: e.target.checked })}
              className="accent-cyan-400"
            />
            {k}
          </label>
        ))}
      </div>

      <button
        onClick={generate}
        className="px-4 py-2 rounded-lg bg-cyan text-abyss font-semibold text-sm hover:bg-cyan-bright transition-colors"
      >
        Generate
      </button>

      {password && (
        <pre className="px-3 py-2 rounded-md bg-navy border border-cyan-400/10 text-cyan-bright font-mono text-sm break-all whitespace-pre-wrap">
          {password}
        </pre>
      )}
    </div>
  );
}
