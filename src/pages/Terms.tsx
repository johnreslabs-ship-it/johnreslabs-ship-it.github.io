import SEO from "../components/SEO";
import { PageHeader, Section } from "../components/Common";
import { SITE } from "../lib/site";

export default function Terms() {
  return (
    <>
      <SEO title="Terms of Use" description="Terms of use for Johnres Lab." path="/terms" />
      <PageHeader eyebrow="Legal" title="Terms of Use" />

      <Section className="max-w-2xl text-sm text-ink-muted leading-relaxed space-y-4">
        <p>Last updated: July 2026.</p>

        <h2 className="text-ink font-semibold text-base pt-4">Use of content</h2>
        <p>
          Tutorials, blog posts, and downloadable resources on {SITE.name} are provided for personal, educational use.
          Commands, scripts, and cheat sheets are shared as-is — always review a script before running it, especially
          anything that modifies partitions, the registry, or system boot configuration.
        </p>

        <h2 className="text-ink font-semibold text-base pt-4">No warranty</h2>
        <p>
          Guides are based on real troubleshooting experience but hardware, software versions, and configurations
          vary. {SITE.author} is not responsible for data loss or system issues resulting from following a tutorial —
          always back up important data before making system-level changes.
        </p>

        <h2 className="text-ink font-semibold text-base pt-4">Downloads and scripts</h2>
        <p>
          Scripts and tools linked from the Downloads and Projects pages are provided under their respective
          open-source licenses (see each GitHub repository for details).
        </p>

        <h2 className="text-ink font-semibold text-base pt-4">External links</h2>
        <p>This site links to YouTube, Instagram, Facebook, and GitHub. Those platforms' own terms of use apply once you leave this site.</p>

        <h2 className="text-ink font-semibold text-base pt-4">Contact</h2>
        <p>Questions about these terms can be sent to {SITE.email}.</p>
      </Section>
    </>
  );
}
