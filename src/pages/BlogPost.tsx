import { Link, useParams } from "react-router-dom";
import { where } from "firebase/firestore";
import SEO from "../components/SEO";
import { Section, Badge } from "../components/Common";
import { useLiveCollection } from "../lib/useLiveCollection";
import { BLOG_POSTS, type BlogPost as BlogPostType } from "../data/blog";
import { SITE } from "../lib/site";

const FALLBACK = BLOG_POSTS.filter((p) => p.status !== "draft");

export default function BlogPost() {
  const { slug } = useParams();
  const { items: allPosts } = useLiveCollection<BlogPostType>("posts", FALLBACK, [where("status", "==", "published")]);
  const post = allPosts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <Section>
        <p className="text-center text-ink-muted">Post not found. <Link to="/blog" className="text-cyan">Back to blog</Link></p>
      </Section>
    );
  }

  const shareUrl = `${SITE.url}/blog/${post.slug}`;
  const dateLabel = post.date ?? (post.createdAt ? new Date(post.createdAt).toISOString() : undefined);
  const readingTime = post.readingTime ?? `${Math.max(1, Math.round(post.content.split(/\s+/).length / 200))} min read`;

  return (
    <>
      <SEO title={post.title} description={post.excerpt} path={`/blog/${post.slug}`} />

      <Section className="max-w-2xl">
        <Link to="/blog" className="text-sm text-cyan hover:text-cyan-bright">← Back to blog</Link>

        <div className="mt-6 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Badge>{post.category}</Badge>
            <span className="text-xs text-ink-dim">{readingTime}</span>
            {dateLabel && (
              <span className="text-xs text-ink-dim">
                {new Date(dateLabel).toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" })}
              </span>
            )}
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-mono text-ink glow-text">{post.title}</h1>
        </div>

        <article className="prose-invert max-w-none text-ink-muted leading-relaxed whitespace-pre-line">
          {post.content}
        </article>

        <div className="flex flex-wrap gap-2 mt-10">
          {post.tags.map((t) => (
            <Badge key={t}>#{t}</Badge>
          ))}
        </div>

        <div className="mt-8 pt-8 border-t border-cyan-400/10 flex items-center gap-3">
          <span className="text-xs text-ink-dim font-mono">Share:</span>
          <a
            className="text-xs text-cyan hover:text-cyan-bright"
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(shareUrl)}`}
            target="_blank" rel="noreferrer"
          >
            X / Twitter
          </a>
          <a
            className="text-xs text-cyan hover:text-cyan-bright"
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
            target="_blank" rel="noreferrer"
          >
            Facebook
          </a>
        </div>

        <div className="mt-6 text-xs text-ink-dim">
          Comments for this post can be added via{" "}
          <a href="https://giscus.app" target="_blank" rel="noreferrer" className="text-cyan">
            Giscus
          </a>{" "}
          (GitHub Discussions) — see the README for setup.
        </div>
      </Section>
    </>
  );
}
