import { Link } from "react-router-dom";
import { where } from "firebase/firestore";
import SEO from "../components/SEO";
import HexField from "../components/HexField";
import Terminal from "../components/Terminal";
import { Card, Section } from "../components/Common";
import { SITE } from "../lib/site";
import { useLiveCollection } from "../lib/useLiveCollection";
import { BLOG_POSTS, type BlogPost } from "../data/blog";

const FALLBACK_POSTS = BLOG_POSTS.filter((p) => p.status !== "draft");

const PILLARS = [
  { label: "Windows", to: "/windows" },
  { label: "Linux", to: "/linux" },
  { label: "Networking", to: "/networking" },
  { label: "Virtual Machines", to: "/virtual-machines" },
];

const HERO_COMMANDS = [
  "sudo fdisk -l",
  "grub-install /dev/sda && update-grub",
  "vboxmanage createvm --name lab --register",
  "echo 'ready to learn.'",
];

export default function Home() {
  const { items: posts } = useLiveCollection<BlogPost>("posts", FALLBACK_POSTS, [where("status", "==", "published")]);

  return (
    <>
      <SEO
        title="Johnres Lab — Learn Technology the Practical Way"
        description="Step-by-step Windows and Linux tutorials, dual boot guides, virtual machine setup, and networking fundamentals."
        path="/"
      />

      <section className="relative">
        <HexField />
        <div className="relative max-w-6xl mx-auto px-5 pt-24 pb-20 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-cyan mb-4">{SITE.tagline}</p>
            <h1 className="text-4xl sm:text-5xl font-bold font-mono leading-tight text-ink glow-text">
              Learn Technology<br />the Practical Way
            </h1>
            <p className="mt-5 text-ink-muted max-w-md leading-relaxed">
              Clear, step-by-step guides for Windows, Linux, networking, and virtual machines —
              taught the way I'd explain it to a colleague, not a textbook.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={SITE.youtube}
                target="_blank"
                rel="noreferrer"
                className="px-5 py-3 rounded-lg bg-cyan text-abyss font-semibold text-sm hover:bg-cyan-bright transition-colors"
              >
                Watch on YouTube
              </a>
              <Link
                to="/blog"
                className="px-5 py-3 rounded-lg border border-cyan-400/30 text-ink text-sm font-semibold hover:border-cyan-400/70 transition-colors"
              >
                Read Blogs
              </Link>
              <Link
                to="/downloads"
                className="px-5 py-3 rounded-lg border border-cyan-400/30 text-ink text-sm font-semibold hover:border-cyan-400/70 transition-colors"
              >
                Download Resources
              </Link>
            </div>
          </div>

          <Terminal title="johnreslab@lab" lines={HERO_COMMANDS} typing className="max-w-md w-full mx-auto" />
        </div>
      </section>

      <Section>
        <h2 className="font-mono text-sm uppercase tracking-widest text-ink-dim mb-6 text-center">What we cover</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {PILLARS.map((p) => (
            <Link key={p.to} to={p.to}>
              <Card className="text-center h-full flex items-center justify-center">
                <span className="font-mono text-ink">{p.label}</span>
              </Card>
            </Link>
          ))}
        </div>
      </Section>

      <Section className="pt-0">
        <div className="flex items-end justify-between mb-6">
          <h2 className="font-mono text-sm uppercase tracking-widest text-ink-dim">Latest from the blog</h2>
          <Link to="/blog" className="text-sm text-cyan hover:text-cyan-bright">View all →</Link>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {posts.slice(0, 4).map((post) => (
            <Link key={post.slug} to={`/blog/${post.slug}`}>
              <Card className="h-full">
                <p className="font-mono text-xs text-cyan mb-2">{post.category}</p>
                <h3 className="font-semibold text-ink mb-2">{post.title}</h3>
                <p className="text-sm text-ink-muted leading-relaxed">{post.excerpt}</p>
              </Card>
            </Link>
          ))}
        </div>
      </Section>
    </>
  );
}
