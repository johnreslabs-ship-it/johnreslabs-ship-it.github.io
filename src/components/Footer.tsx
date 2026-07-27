import { Link } from "react-router-dom";
import { SITE, TOPIC_LINKS } from "../lib/site";
import SocialIcons from "./SocialIcons";

export default function Footer() {
  return (
    <footer className="border-t border-cyan-400/10 mt-24">
      <div className="max-w-6xl mx-auto px-5 py-12 grid gap-10 sm:grid-cols-3">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <img src="/assets/logo.png" alt="" className="w-7 h-7 rounded-md" />
            <span className="font-mono font-semibold text-ink">{SITE.name}</span>
          </div>
          <p className="text-sm text-ink-muted max-w-xs">{SITE.tagline}</p>
          <SocialIcons className="mt-4" />
        </div>

        <div>
          <h3 className="text-xs uppercase tracking-widest text-ink-dim mb-3">Topics</h3>
          <ul className="space-y-2 text-sm">
            {TOPIC_LINKS.map((t) => (
              <li key={t.to}>
                <Link to={t.to} className="text-ink-muted hover:text-cyan-bright transition-colors">
                  {t.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-xs uppercase tracking-widest text-ink-dim mb-3">Site</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/privacy" className="text-ink-muted hover:text-cyan-bright transition-colors">Privacy Policy</Link></li>
            <li><Link to="/terms" className="text-ink-muted hover:text-cyan-bright transition-colors">Terms of Use</Link></li>
            <li><Link to="/contact" className="text-ink-muted hover:text-cyan-bright transition-colors">Contact</Link></li>
            <li><a href="/rss.xml" className="text-ink-muted hover:text-cyan-bright transition-colors">RSS Feed</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-cyan-400/10 py-5 text-center text-xs text-ink-dim font-mono">
        © {new Date().getFullYear()} {SITE.name}. Built by {SITE.author}.
      </div>
    </footer>
  );
}
