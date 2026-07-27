import { useEffect, useState } from "react";

type TerminalProps = {
  title?: string;
  lines: string[];
  className?: string;
  typing?: boolean;
};

/**
 * A terminal-window shaped card, matching the brand's signature visual device.
 * When `typing` is true, lines are revealed one character at a time and then loop.
 */
export default function Terminal({ title = "bash", lines, className = "", typing = false }: TerminalProps) {
  const [rendered, setRendered] = useState<string[]>(typing ? [] : lines);

  useEffect(() => {
    if (!typing) return;
    let cancelled = false;
    let lineIndex = 0;
    let charIndex = 0;
    const output: string[] = [];

    const tick = () => {
      if (cancelled) return;
      if (lineIndex >= lines.length) {
        // pause, then restart
        setTimeout(() => {
          if (cancelled) return;
          output.length = 0;
          lineIndex = 0;
          charIndex = 0;
          setRendered([]);
          tick();
        }, 2200);
        return;
      }
      const current = lines[lineIndex];
      charIndex += 1;
      output[lineIndex] = current.slice(0, charIndex);
      setRendered([...output]);
      if (charIndex >= current.length) {
        lineIndex += 1;
        charIndex = 0;
        setTimeout(tick, 420);
      } else {
        setTimeout(tick, 28);
      }
    };

    tick();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [typing, lines.join("|")]);

  const shown = typing ? rendered : lines;

  return (
    <div className={`terminal-chrome overflow-hidden ${className}`}>
      <div className="flex items-center gap-2 px-4 py-3 border-b border-cyan-400/10 bg-white/[0.02]">
        <span className="w-3 h-3 rounded-full" style={{ background: "var(--color-term-red)" }} />
        <span className="w-3 h-3 rounded-full" style={{ background: "var(--color-term-yellow)" }} />
        <span className="w-3 h-3 rounded-full" style={{ background: "var(--color-term-green)" }} />
        <span className="ml-3 text-xs text-ink-dim font-mono opacity-60">{title}</span>
      </div>
      <div className="p-5 font-mono text-sm leading-relaxed min-h-[10rem]">
        {shown.map((line, i) => (
          <div key={i} className="whitespace-pre-wrap break-words">
            <span style={{ color: "var(--color-term-green)" }}>$ </span>
            <span className="text-ink">{line}</span>
            {typing && i === shown.length - 1 && <span className="caret" />}
          </div>
        ))}
      </div>
    </div>
  );
}
