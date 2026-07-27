import { useState } from "react";
import SEO from "../components/SEO";
import { PageHeader, Card, Section } from "../components/Common";
import SocialIcons from "../components/SocialIcons";
import { SITE } from "../lib/site";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const mailtoHref = `mailto:${SITE.email}?subject=${encodeURIComponent(
    `Message from ${form.name || "your site"}`
  )}&body=${encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`)}`;

  return (
    <>
      <SEO title="Contact" description="Get in touch with Johnres Lab." path="/contact" />
      <PageHeader eyebrow="Say hello" title="Contact" description="Questions, tutorial requests, or just want to say hi — reach out." />

      <Section className="pt-0 grid md:grid-cols-2 gap-8">
        <Card>
          <h2 className="font-semibold text-ink mb-4">Send a message</h2>
          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              window.location.href = mailtoHref;
            }}
          >
            <label className="block">
              <span className="text-xs text-ink-dim font-mono">Name</span>
              <input
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="mt-1 w-full px-3 py-2 rounded-md bg-navy border border-cyan-400/20 text-ink focus:outline-none focus:border-cyan-400/60"
              />
            </label>
            <label className="block">
              <span className="text-xs text-ink-dim font-mono">Email</span>
              <input
                required
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="mt-1 w-full px-3 py-2 rounded-md bg-navy border border-cyan-400/20 text-ink focus:outline-none focus:border-cyan-400/60"
              />
            </label>
            <label className="block">
              <span className="text-xs text-ink-dim font-mono">Message</span>
              <textarea
                required
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="mt-1 w-full px-3 py-2 rounded-md bg-navy border border-cyan-400/20 text-ink focus:outline-none focus:border-cyan-400/60"
              />
            </label>
            <button
              type="submit"
              className="px-5 py-3 rounded-lg bg-cyan text-abyss font-semibold text-sm hover:bg-cyan-bright transition-colors"
            >
              Send via Email
            </button>
            <p className="text-xs text-ink-dim">
              This opens your email client with the message pre-filled — no data is sent to a server. Swap in a form
              service (e.g. Formspree) later if you'd rather handle it in-page.
            </p>
          </form>
        </Card>

        <div className="space-y-4">
          <Card>
            <h2 className="font-semibold text-ink mb-3">Other ways to reach me</h2>
            <div className="space-y-3 text-sm">
              <a href={`mailto:${SITE.email}`} className="flex items-center gap-2 text-ink-muted hover:text-cyan-bright">
                📧 {SITE.email}
              </a>
              <a
                href="https://wa.me/00000000000"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-ink-muted hover:text-cyan-bright"
              >
                💬 WhatsApp (update with your number)
              </a>
            </div>
            <SocialIcons className="mt-5" />
          </Card>

          <Card>
            <h2 className="font-semibold text-ink mb-2">Response time</h2>
            <p className="text-sm text-ink-muted leading-relaxed">
              I read every message, but replies can take a few days depending on my support workload. For quick
              questions, the comments on a relevant YouTube video are usually the fastest way to reach me.
            </p>
          </Card>
        </div>
      </Section>
    </>
  );
}
