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
 * A URL slug is a required, manually-entered CMS field. It must be lowercase
 * alphanumeric words separated by single hyphens (no leading/trailing/double
 * hyphens) — the same shape the Studio link expressions produce and match on.
 * An article is only routable when its slug passes this, it is published, and
 * its publishedDate is not in the future.
 */
const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

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

/**
 * Slugs of every routable article — for getStaticPaths. A row is routable only
 * when it is published, its slug is well-formed, and its publishedDate has
 * arrived (future-dated/scheduled articles are excluded until their date).
 */
export async function getPublishedArticleSlugs(): Promise<string[]> {
  const now = new Date();
  const rows = await cmsQuery<Pick<ArticleData, "slug" | "publishedDate">>(
    "articles",
    ARTICLES_PUBLIC_TOKEN,
    {
      where: { published: true },
      fields: ["slug", "publishedDate"],
      limit: 1000,
    },
  );
  return rows
    .filter(
      (r) =>
        SLUG_RE.test(r.data?.slug || "") &&
        new Date(r.data.publishedDate) <= now,
    )
    .map((r) => r.data.slug);
}

export interface ArticleWithAuthor {
  article: ArticleData;
  createdAt: string;
  updatedAt: string;
  author: AuthorData | null;
}

/**
 * A single routable article by slug, author resolved — or null (→ 404) when the
 * slug is malformed, unknown, unpublished, or its publishedDate is in the
 * future. The slug is matched against the CMS `slug` field directly.
 */
export async function getArticleBySlug(
  slug: string,
): Promise<ArticleWithAuthor | null> {
  // Reject anything that isn't a well-formed slug before hitting the CMS.
  if (!SLUG_RE.test(slug)) return null;

  const rows = await cmsQuery<ArticleData>("articles", ARTICLES_PUBLIC_TOKEN, {
    where: { slug, published: true },
    limit: 1,
  });
  const row = rows[0];
  if (!row) return null;

  // Scheduled articles 404 until their publishedDate arrives.
  if (new Date(row.data.publishedDate) > new Date()) return null;

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
