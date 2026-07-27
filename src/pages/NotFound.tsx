import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import Terminal from "../components/Terminal";
import { Section } from "../components/Common";

export default function NotFound() {
  return (
    <>
      <SEO title="404 — Page Not Found" description="This page doesn't exist." path="/404" />
      <Section className="text-center max-w-lg">
        <Terminal
          title="error"
          lines={["cd /requested-page", "bash: cd: /requested-page: No such file or directory"]}
          className="text-left mb-8"
        />
        <h1 className="text-2xl font-bold font-mono text-ink mb-3">404 — Page Not Found</h1>
        <p className="text-ink-muted mb-6">The page you're looking for doesn't exist or has moved.</p>
        <Link
          to="/"
          className="inline-block px-5 py-3 rounded-lg bg-cyan text-abyss font-semibold text-sm hover:bg-cyan-bright transition-colors"
        >
          Back to Home
        </Link>
      </Section>
    </>
  );
}
