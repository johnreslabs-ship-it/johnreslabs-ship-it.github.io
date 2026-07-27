import SEO from "../components/SEO";
import { PageHeader, Card, Section } from "../components/Common";
import { useYouTube } from "../lib/useYouTube";
import { SITE } from "../lib/site";

function formatNumber(n?: string) {
  if (!n) return "—";
  const num = Number(n);
  if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + "M";
  if (num >= 1_000) return (num / 1_000).toFixed(1) + "K";
  return num.toString();
}

export default function YouTubePage() {
  const { loading, error, videos, stats, configured } = useYouTube(9);

  return (
    <>
      <SEO
        title="YouTube"
        description="Watch the latest Windows and Linux tutorials from Johnres Lab."
        path="/youtube"
      />

      <PageHeader
        eyebrow="Video"
        title="Latest on YouTube"
        description="New tutorials on dual boot, virtual machines, and troubleshooting — embedded straight from the channel."
      />

      {!configured && (
        <Section className="pt-0">
          <Card className="max-w-2xl mx-auto text-center">
            <h2 className="font-semibold text-ink mb-2">Live data isn't connected yet</h2>
            <p className="text-sm text-ink-muted leading-relaxed mb-4">
              This page is wired up to pull live stats and videos from the YouTube Data API v3, but no API key is
              configured yet. To enable it:
            </p>
            <ol className="text-sm text-ink-muted text-left list-decimal list-inside space-y-1 mb-4">
              <li>Get a free API key from the Google Cloud Console (enable "YouTube Data API v3").</li>
              <li>
                Add it as <code className="text-cyan-bright">VITE_YOUTUBE_API_KEY</code> in a{" "}
                <code className="text-cyan-bright">.env</code> file locally, and as a GitHub Actions secret for
                deployment.
              </li>
              <li>Rebuild and redeploy the site.</li>
            </ol>
            <a
              href={SITE.youtube}
              target="_blank"
              rel="noreferrer"
              className="inline-block px-5 py-3 rounded-lg bg-cyan text-abyss font-semibold text-sm hover:bg-cyan-bright transition-colors"
            >
              Visit the channel directly
            </a>
          </Card>
        </Section>
      )}

      {configured && (
        <>
          <Section className="pt-0 grid grid-cols-3 max-w-xl mx-auto text-center gap-4">
            <Card><p className="text-2xl font-mono text-cyan-bright">{formatNumber(stats?.subscriberCount)}</p><p className="text-xs text-ink-dim mt-1">Subscribers</p></Card>
            <Card><p className="text-2xl font-mono text-cyan-bright">{formatNumber(stats?.viewCount)}</p><p className="text-xs text-ink-dim mt-1">Views</p></Card>
            <Card><p className="text-2xl font-mono text-cyan-bright">{formatNumber(stats?.videoCount)}</p><p className="text-xs text-ink-dim mt-1">Videos</p></Card>
          </Section>

          <Section className="pt-0">
            {loading && <p className="text-center text-ink-muted">Loading latest videos…</p>}
            {error && (
              <Card className="max-w-lg mx-auto text-center">
                <p className="text-sm text-ink-muted">Couldn't load videos: {error}</p>
              </Card>
            )}
            {!loading && !error && (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {videos.map((v) => (
                  <a
                    key={v.id}
                    href={`https://www.youtube.com/watch?v=${v.id}`}
                    target="_blank"
                    rel="noreferrer"
                    className="group"
                  >
                    <div className="rounded-xl overflow-hidden border border-cyan-400/15 group-hover:border-cyan-400/40 transition-colors">
                      <img src={v.thumbnail} alt={v.title} className="w-full aspect-video object-cover" />
                      <div className="p-4 bg-navy-soft/60">
                        <h3 className="text-sm font-medium text-ink line-clamp-2">{v.title}</h3>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            )}
          </Section>
        </>
      )}
    </>
  );
}
