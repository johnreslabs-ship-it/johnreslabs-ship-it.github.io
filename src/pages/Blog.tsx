import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { where } from "firebase/firestore";
import SEO from "../components/SEO";
import { PageHeader, Card, Section } from "../components/Common";
import { useLiveCollection } from "../lib/useLiveCollection";
import { BLOG_POSTS, BLOG_CATEGORIES, type BlogPost } from "../data/blog";

const FALLBACK = BLOG_POSTS.filter((p) => p.status !== "draft");

export default function Blog() {
  const [category, setCategory] = useState<string>("All");
  const [query, setQuery] = useState("");

  const { items: allPosts } = useLiveCollection<BlogPost>("posts", FALLBACK, [where("status", "==", "published")]);

  const filtered = useMemo(() => {
    return allPosts.filter((p) => {
      const matchesCategory = category === "All" || p.category === category;
      const matchesQuery =
        query.trim() === "" ||
        p.title.toLowerCase().includes(query.toLowerCase()) ||
        p.tags.some((t) => t.toLowerCase().includes(query.toLowerCase()));
      return matchesCategory && matchesQuery;
    });
  }, [allPosts, category, query]);

  return (
    <>
      <SEO title="Blog" description="Tutorials and write-ups on Linux, Windows, networking, and virtualization." path="/blog" />

      <PageHeader eyebrow="Writing" title="Blog" description="Longer write-ups that go with the videos, plus a few web-only guides." />

      <Section className="pt-0">
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search posts…"
            className="flex-1 px-4 py-2 rounded-lg bg-navy-soft border border-cyan-400/15 text-ink placeholder:text-ink-dim focus:outline-none focus:border-cyan-400/50"
          />
          <div className="flex flex-wrap gap-2">
            {BLOG_CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`px-3 py-1.5 rounded-md text-xs font-mono border transition-colors ${
                  category === c
                    ? "border-cyan-400/70 text-cyan-bright bg-cyan-400/5"
                    : "border-cyan-400/15 text-ink-muted hover:border-cyan-400/40"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {filtered.length === 0 && <p className="text-ink-muted text-center py-12">No posts match your search.</p>}

        <div className="grid md:grid-cols-2 gap-5">
          {filtered.map((post) => (
            <Link key={post.slug} to={`/blog/${post.slug}`}>
              <Card className="h-full">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-mono text-xs text-cyan">{post.category}</p>
                  <p className="text-xs text-ink-dim">{post.readingTime}</p>
                </div>
                <h2 className="font-semibold text-ink mb-2">{post.title}</h2>
                <p className="text-sm text-ink-muted leading-relaxed">{post.excerpt}</p>
              </Card>
            </Link>
          ))}
        </div>
      </Section>
    </>
  );
}
