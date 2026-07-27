import SEO from "../components/SEO";
import { PageHeader, Section } from "../components/Common";
import { SITE } from "../lib/site";

export default function Privacy() {
  return (
    <>
      <SEO title="Privacy Policy" description="Privacy policy for Johnres Lab." path="/privacy" />
      <PageHeader eyebrow="Legal" title="Privacy Policy" />

      <Section className="max-w-2xl text-sm text-ink-muted leading-relaxed space-y-4">
        <p>Last updated: July 2026.</p>

        <h2 className="text-ink font-semibold text-base pt-4">What this site collects</h2>
        <p>
          {SITE.name} is a static site hosted on GitHub Pages. It does not run its own server and does not store any
          personal data in a database. Any analytics (if enabled) are aggregate and anonymized where the analytics
          provider supports it.
        </p>

        <h2 className="text-ink font-semibold text-base pt-4">Contact form</h2>
        <p>
          The contact form on this site opens your own email client with a pre-filled message — the message content
          is sent directly from your device to {SITE.email} via your email provider, not stored by this site.
        </p>

        <h2 className="text-ink font-semibold text-base pt-4">Third-party embeds</h2>
        <p>
          Pages that embed YouTube videos or link to Instagram/Facebook may cause those platforms to set their own
          cookies or collect data according to their own privacy policies, independent of this site.
        </p>

        <h2 className="text-ink font-semibold text-base pt-4">Changes</h2>
        <p>This policy may be updated as the site's features change. Continued use of the site after changes constitutes acceptance of the updated policy.</p>

        <h2 className="text-ink font-semibold text-base pt-4">Contact</h2>
        <p>Questions about this policy can be sent to {SITE.email}.</p>
      </Section>
    </>
  );
}
