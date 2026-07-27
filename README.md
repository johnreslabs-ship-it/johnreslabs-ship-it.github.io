# Johnres Lab — Website

Source for the Johnres Lab personal brand site: React + TypeScript + Vite + Tailwind CSS v4, deployable to GitHub Pages via GitHub Actions.

Live brand: Windows & Linux tutorials, dual boot, virtual machines, networking, tools, and downloads.

---

## What's included

- **Pages:** Home, About, YouTube (live Data API), Blog (list + post detail), Projects, Downloads, Tools (8 working browser tools), Linux, Windows, Networking, Virtual Machines, Contact, Privacy Policy, Terms, 404
- **SEO:** per-page meta tags via `react-helmet-async`, Open Graph + Twitter cards, JSON-LD structured data, `sitemap.xml`, `robots.txt`, `rss.xml`
- **Branding:** dark navy / cyan / terminal-green theme matching your YouTube avatar, banner, and watermark (already copied into `public/assets/`)
- **Deployment:** GitHub Actions workflow that builds and publishes to GitHub Pages on every push to `main`

## Not included yet (by design — see "What's next")

- Live Instagram/Facebook feed embeds (both platforms restrict this heavily — see notes below)
- Ping Tool / Port Checker (these need a small backend; browsers can't do raw network probes)

## Live content via the admin panel (optional)

Blog posts, Projects, and Downloads on this site can be edited live through a separate admin dashboard
(`johnreslab-admin`) instead of by hand-editing `src/data/*.ts`. Without any setup, this site works exactly as
before, using its built-in static content. To enable live editing:

1. Follow the **Firebase project setup** in the `johnreslab-admin` repo's README (steps 1–2) — creating a Firebase
   project, enabling Auth/Firestore/Storage, and deploying security rules.
2. Add the same six `VITE_FIREBASE_*` values to this site's `.env` (and as GitHub Actions secrets for deployment).
3. Rebuild — Blog, Projects, and Downloads will automatically start pulling from Firestore instead of static data,
   with the static content remaining as an automatic fallback if Firestore is ever empty or unreachable.

---

## 1. Local development

```bash
npm install
cp .env.example .env      # then add your YouTube API key (see below)
npm run dev
```

Visit the printed local URL (usually `http://localhost:5173`).

## 2. Getting a YouTube Data API key (for the /youtube page)

The YouTube page is already wired up to show live subscriber/view counts and your latest uploads — it just needs a free API key.

1. Go to the Google Cloud Console: https://console.cloud.google.com/apis/credentials
2. Create a project (or use an existing one).
3. Enable the **YouTube Data API v3** (APIs & Services -> Library -> search for it -> Enable).
4. Go to **Credentials -> Create Credentials -> API Key**.
5. Copy the key into your local `.env` file:
   ```
   VITE_YOUTUBE_API_KEY=your-key-here
   ```
6. Restart `npm run dev` to pick up the new env var.

**Restrict the key** (recommended): in the Cloud Console, edit the key and add an "HTTP referrers" restriction limited to `https://johnreslab.github.io/*` and `http://localhost:5173/*`, so it can't be used from anywhere else if it ever leaks.

Without a key, the page still works — it shows setup instructions instead of live data, so the site never looks broken.

## 3. Deploying to GitHub Pages

1. Create a new GitHub repository. For a root-level personal site, name it exactly `<your-username>.github.io` (e.g. `johnreslab.github.io`) — this serves it at the root domain instead of a subpath.
2. Push this project to that repository (`git init`, `git add .`, `git commit`, `git remote add origin ...`, `git push -u origin main`).
3. In the repo, go to **Settings -> Pages -> Build and deployment -> Source**, and select **GitHub Actions**.
4. Add your YouTube API key as a repository secret: **Settings -> Secrets and variables -> Actions -> New repository secret**:
   - Name: `VITE_YOUTUBE_API_KEY`
   - Value: your key from step 2 above
   - (Optional) Also add `VITE_YOUTUBE_CHANNEL_ID` if you ever change channels.
5. Push to `main` — the included workflow (`.github/workflows/deploy.yml`) builds and publishes automatically. Check the **Actions** tab for progress.

If you're deploying to a **project page** instead (`username.github.io/reponame`), update `base: '/'` in `vite.config.ts` to `base: '/reponame/'`, and update the URLs in `index.html`, `src/lib/site.ts`, `public/sitemap.xml`, and `public/rss.xml` to match.

## 4. Adding real downloadable files

The Downloads page links to files like `/downloads/linux-command-cheatsheet.pdf` that don't exist yet — they're placeholders. Drop your actual PDFs/scripts into `public/downloads/` with matching filenames (or update the paths in `src/data/downloads.ts`) to make them live.

## 5. Adding a resume

The About page links to `/assets/resume.pdf`. Add your resume there to enable the download button.

## 6. Adding blog comments (optional)

The blog post template is ready for Giscus (GitHub Discussions-based comments, https://giscus.app):

1. Enable Discussions on your GitHub repo.
2. Go to giscus.app, fill in your repo details, and copy the generated `<script>` embed.
3. Add it to `src/pages/BlogPost.tsx` where the "Comments" note currently is.

## 7. About Instagram & Facebook

Both platforms heavily restrict embedding live feed data without going through Meta's official Graph API, which requires:
- A Meta Developer App
- Business verification for some permissions
- Your Instagram account converted to a Business/Creator account linked to a Facebook Page

That's a real setup process on Meta's side, independent of this codebase. For now, the site links out to both profiles with your branded social icons (see `src/components/SocialIcons.tsx`). If you complete that Meta setup later, the Instagram/Facebook pages can be extended to pull live posts the same way the YouTube page does.

## 8. Admin dashboard

The admin dashboard described in the original brief is built and lives in a separate repo (`johnreslab-admin`) —
see its README for full setup instructions (Firebase project, security rules, first admin user, deployment). It's
intentionally not linked from anywhere on this public site.

---

## Tech stack

React 19, TypeScript, Vite, Tailwind CSS v4, React Router, react-helmet-async, marked (Markdown), qrcode

## Project structure

```
src/
  components/       shared UI (Navbar, Footer, Terminal, SEO, etc.)
  components/tools/ the 8 browser-based tools
  pages/            one file per route
  data/             blog posts, projects, downloads (static content)
  lib/              site constants + YouTube API hook
public/
  assets/           logo, banner, watermark
  downloads/        drop real downloadable files here
  robots.txt, sitemap.xml, rss.xml, 404.html
```
