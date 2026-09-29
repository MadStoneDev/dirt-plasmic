/**
 * Server-side helpers for reading the Plasmic CMS ("Blog" database) at build
 * time — from getStaticPaths / getStaticProps in the blog pages.
 *
 * These use the CMS PUBLIC (read-only) tokens — the same values Plasmic bakes
 * into the generated components and ships to the browser — so keeping them here
 * is safe. NEVER put the CMS *secret* (write) token in this file.
 *
 * The Studio-designed pages still fetch their own copy of the data for
 * rendering; these helpers exist so the page wrappers can populate <SEO /> (a
 * <head> concern that must be resolved before the component tree renders).
 */

const CMS_HOST = "https://data.plasmic.app";
const CMS_ID = "oddQjnTUVWDpYkuyZHTBcK";

// Public read tokens as issued by Studio (articles/categories and authors were
// given separate tokens). Both are read-only.
const ARTICLES_PUBLIC_TOKEN =
  "SEDPH2yp15PlCcWNciTlp1E5wPDR5TvMxlZienZrDz8CxW3LaZkyZan3a8SYXGum1ZR0xOLLh9KmanzfqsQ";
const AUTHORS_PUBLIC_TOKEN =
  "Oq9HoSuLbH8xdIIUvRFBwjXFzBdrqx4S2jNviKrGncu8V47IRi1QctzJsiHhRH09AZHTuxps8bHVAPU5oGMQ";

/**
 * Derive a URL slug from an article title. This MUST stay byte-for-byte
 * identical to the expression used in Plasmic (the index card links and the
 * article-template match), or URLs won't resolve:
 *
 *   title.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")
 *
 * There is no separate `slug` field in play — the slug is always derived from
 * the title, everywhere.
 */
export function slugify(title: string): string {
  return (title || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export interface CmsRow<T> {
  id: string;
  createdAt: string;
  updatedAt: string;
  identifier: string | null;
  data: T;
}

export interface ArticleData {
  title: string;
  slug: string;
  excerpt: string;
  body: string;
  /** authors-table row id */
  author: string | null;
  /** categories-table row id */
  category: string | null;
  publishedDate: string;
  published: boolean;
}

export interface AuthorData {
  name: string;
  photo?: { url: string } | null;
  linkedInLink?: string;
  website?: string;
}

interface QueryParams {
  where?: Record<string, unknown>;
  order?: { field: string; dir: "asc" | "desc" }[];
  fields?: string[];
  limit?: number;
  offset?: number;
}

async function cmsQuery<T>(
  table: string,
  token: string,
  params: QueryParams,
): Promise<CmsRow<T>[]> {
  const q = encodeURIComponent(JSON.stringify(params));
  const url = `${CMS_HOST}/api/v1/cms/databases/${CMS_ID}/tables/${table}/query?q=${q}&draft=0`;
  const res = await fetch(url, {
    headers: { "x-plasmic-api-cms-tokens": `${CMS_ID}:${token}` },
  });
  if (!res.ok) {
    throw new Error(
      `Plasmic CMS query failed (${table}): ${res.status} ${res.statusText}`,
    );
  }
  const json = (await res.json()) as { rows?: CmsRow<T>[] };
  return json.rows ?? [];
}

/** All published article slugs (derived from titles) — for getStaticPaths. */
export async function getPublishedArticleSlugs(): Promise<string[]> {
  const rows = await cmsQuery<Pick<ArticleData, "title">>(
    "articles",
    ARTICLES_PUBLIC_TOKEN,
    { where: { published: true }, fields: ["title"], limit: 1000 },
  );
  return rows
    .map((r) => slugify(r.data?.title || ""))
    .filter((s) => s.length > 0);
}

export interface ArticleWithAuthor {
  article: ArticleData;
  createdAt: string;
  updatedAt: string;
  author: AuthorData | null;
}

/** A single published article by slug (derived from title), author resolved. */
export async function getArticleBySlug(
  slug: string,
): Promise<ArticleWithAuthor | null> {
  // The slug is derived from the title, so the CMS `where` filter can't match
  // it server-side — fetch published articles and slugify their titles here,
  // using the same transform as the site's links and the Plasmic template.
  const rows = await cmsQuery<ArticleData>("articles", ARTICLES_PUBLIC_TOKEN, {
    where: { published: true },
    limit: 1000,
  });
  const row = rows.find((r) => slugify(r.data.title) === slug);
  if (!row) return null;

  const author = row.data.author
    ? await getAuthorById(row.data.author)
    : null;

  return {
    article: row.data,
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
    author,
  };
}

/**
 * The CMS `where` filter operates on data fields, not the row id, and an author
 * reference stores the row id — so fetch the (small) authors table and match by
 * id in memory.
 */
async function getAuthorById(id: string): Promise<AuthorData | null> {
  const rows = await cmsQuery<AuthorData>("authors", AUTHORS_PUBLIC_TOKEN, {
    limit: 1000,
  });
  const match = rows.find((r) => r.id === id);
  return match ? match.data : null;
}
