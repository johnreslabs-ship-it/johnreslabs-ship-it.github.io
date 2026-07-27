import type { ReactNode } from "react";

export function PageHeader({ eyebrow, title, description }: { eyebrow?: string; title: string; description?: string }) {
  return (
    <div className="max-w-3xl mx-auto px-5 pt-16 pb-10 text-center">
      {eyebrow && (
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-cyan mb-3">{eyebrow}</p>
      )}
      <h1 className="text-3xl sm:text-4xl font-bold font-mono text-ink glow-text">{title}</h1>
      {description && <p className="mt-4 text-ink-muted leading-relaxed">{description}</p>}
    </div>
  );
}

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`rounded-xl border border-cyan-400/15 bg-navy-soft/60 p-6 hover:border-cyan-400/40 transition-colors ${className}`}>
      {children}
    </div>
  );
}

export function Badge({ children }: { children: ReactNode }) {
  return (
    <span className="inline-block text-xs font-mono px-2 py-1 rounded-md border border-cyan-400/25 text-cyan-bright bg-cyan-400/5">
      {children}
    </span>
  );
}

export function Section({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <section className={`max-w-6xl mx-auto px-5 py-16 ${className}`}>{children}</section>;
}
