import { Helmet } from "react-helmet-async";
import { SITE } from "../lib/site";

type SEOProps = {
  title: string;
  description: string;
  path?: string;
};

export default function SEO({ title, description, path = "/" }: SEOProps) {
  const fullTitle = path === "/" ? title : `${title} — ${SITE.name}`;
  const url = `${SITE.url}${path}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
    </Helmet>
  );
}
