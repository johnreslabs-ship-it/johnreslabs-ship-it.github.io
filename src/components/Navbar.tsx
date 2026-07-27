import { useState } from "react";
import { NavLink } from "react-router-dom";
import { NAV_LINKS, SITE } from "../lib/site";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-cyan-400/10 bg-abyss/80 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-5 flex items-center justify-between h-16">
        <NavLink to="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <img src="/assets/logo.png" alt={`${SITE.name} logo`} className="w-9 h-9 rounded-md" />
          <span className="font-mono font-semibold tracking-wide text-ink">{SITE.name}</span>
        </NavLink>

        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              className={({ isActive }) =>
                `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive ? "text-cyan-bright bg-white/5" : "text-ink-muted hover:text-ink"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <button
          className="md:hidden grid place-items-center w-9 h-9 rounded-md border border-cyan-400/20 text-ink"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle navigation menu"
          aria-expanded={open}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </div>

      {open && (
        <nav className="md:hidden border-t border-cyan-400/10 px-5 py-3 flex flex-col gap-1">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `px-3 py-2 rounded-md text-sm font-medium ${
                  isActive ? "text-cyan-bright bg-white/5" : "text-ink-muted"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      )}
    </header>
  );
}
