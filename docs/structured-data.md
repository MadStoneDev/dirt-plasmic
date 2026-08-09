# Structured Data (JSON-LD) — reference & roadmap

How schema is implemented on this site, and the templates for the pages we
haven't built yet.

## How it works today

All structured data is emitted **in code**, not through Plasmic. Plasmic runs in
codegen mode (`components/plasmic/dirt/Plasmic*.tsx` are regenerated on every
`plasmic sync`), so anything authored there would be overwritten. Schema lives in
the code-owned layer instead:

- **`config/seo-defaults.ts`** — site-wide values: Organization, founder (Person),
  logo, language, descriptions. Edit once; every page inherits it.
- **`components/SEO.tsx`** — assembles a single JSON-LD `@graph` and renders it in
  `<Head>`. Add `<SEO … />` to a page's `pages/*.tsx` skeleton (those files are
  "owned by you" and survive syncs).

Every page emits **one** `<script type="application/ld+json">` containing a
`@graph` with these nodes, linked by `@id`:

1. `["Organization", "ProfessionalService"]` — `@id` `…/#organization`
2. `Person` (Nikita Morell) — `@id` `…/#nikita`
3. `WebSite` — `@id` `…/#website`
4. The page node (`WebPage` / `AboutPage` / `ContactPage` / …) — `@id` `…<path>#webpage`
5. *(optional)* `FAQPage` — `@id` `…<path>#faq`

Cross-references use `{ "@id": "…" }` so entities are defined once and reused.

### `<SEO />` props that shape the graph

| Prop | Effect |
|------|--------|
| `jsonLdType` | Page node type: `WebPage` \| `AboutPage` \| `ContactPage` \| `CollectionPage` |
| `pageName` | Page node `name` (falls back to `title`, then site name) |
| `pageAbout` | What the page is about: `"organization"` (default) \| `"nikita"` \| `"none"` |
| `mainEntity` | Primary entity: `"organization"` \| `"nikita"` |
| `primaryImageOfPage` | Reference the logo as the page's primary image |
| `faqItems` | `{ question, answer }[]` → adds a `FAQPage` node |
| `datePublished` / `dateModified` | Freshness signals on the page node |

### Conventions

- **Language:** `inLanguage` is `en-AU` everywhere (the content is Australian
  English). This is *not* a targeting signal — global reach is an hreflang
  concern, and we only add hreflang if/when we publish a localised variant.
- **Logo:** `/logo.png` (stable path in `public/`, survives Plasmic syncs).
- **Reference, don't repeat:** in new nodes, point `provider` / `author` /
  `publisher` at existing `@id`s rather than re-declaring the Organization/Person.

---

## Roadmap — nodes to add as pages get built

### Phase 2 — Service pages

**Decision (confirmed): one page + one `Service` node per individual service**,
not per package. Each service page ranks for its own intent; a bundled page
can't. Show `offers` only on services with a public "starts at" price; **omit the
`offers` block entirely where there's no public number** — an invented or empty
price is worse than none.

Confirmed service set (from the Services Guide):

| Service | Public price? | Proposed slug |
|---------|---------------|---------------|
| Positioning + Messaging Strategy | starts $15,000 USD | `/services/positioning-messaging` |
| Copywriting | — | `/services/copywriting` |
| Visual Identity | — | `/services/visual-identity` |
| Website Design | — | `/services/website-design` |
| Ongoing Support (retainers) | — | `/services/ongoing-support` |
| Bundle: Full Website Copy + Visual Identity + Website Design & Build | starts $25,000 USD | `/services/website-package` |

> **Open:** confirm the slugs above (they set each `@id`). The bundle is the one
> exception to "per individual service" — it's a named package with its own price.

Template (with pricing — Positioning + the bundle):

```json
{
  "@type": "Service",
  "@id": "https://thedirtagency.com/services/positioning-messaging#service",
  "name": "Positioning + Messaging Strategy",
  "description": "In AEC software and the built environment, the product is rarely the problem — the positioning is. DIRT clarifies what you do and how to talk about it.",
  "serviceType": "Brand positioning and messaging strategy",
  "provider": { "@id": "https://thedirtagency.com/#organization" },
  "areaServed": { "@type": "Place", "name": "Worldwide" },
  "offers": {
    "@type": "Offer",
    "priceCurrency": "USD",
    "price": "15000",
    "description": "Starts at $15,000 USD"
  }
}
```

Template (no public price — Copywriting, Visual Identity, Website Design,
Ongoing Support): identical, **minus the `offers` block**.

> Note: `Service` does not produce visible Google rich results (that's `Product`).
> Its value here is GEO / AI comprehension of what DIRT offers.

### Phase 3 — Blog (Dirt Dispatch) articles

Every article uses `BlogPosting`, authored by Nikita via `@id` — that's how her
authority attaches to each post.

```json
{
  "@type": "BlogPosting",
  "@id": "https://thedirtagency.com/blog/{slug}#article",
  "headline": "{article title, under 110 chars}",
  "description": "{1–2 sentence summary}",
  "url": "https://thedirtagency.com/blog/{slug}",
  "datePublished": "{YYYY-MM-DD}",
  "dateModified": "{YYYY-MM-DD}",
  "author": { "@id": "https://thedirtagency.com/#nikita" },
  "publisher": { "@id": "https://thedirtagency.com/#organization" },
  "image": "{hero image URL}",
  "mainEntityOfPage": { "@id": "https://thedirtagency.com/blog/{slug}#article" },
  "articleSection": "{Positioning | Messaging | Branding | Winning work}",
  "inLanguage": "en-AU"
}
```

### FAQ — the biggest AI-visibility lever

Add a `FAQPage` node to service pages and key articles wherever there's **real,
visible Q&A on the page**. The `<SEO />` component already supports this via the
`faqItems` prop — no new code needed:

```tsx
<SEO
  jsonLdType="ContactPage"
  faqItems={[
    { question: "What industries does DIRT work with?", answer: "…" },
    { question: "How much does a positioning project cost?", answer: "…" },
  ]}
/>
```

**Rules:**
- Answers **must** match the visible on-page text (Google requirement, and it's
  what keeps the markup honest for AI engines too).
- **Reset expectations:** FAQ markup no longer drives Google featured snippets —
  Google restricted FAQ rich results to authoritative government/health sites in
  2023. The payoff now is **GEO / AI-answer surfaces** (which is the actual goal),
  not Google SERP snippets.

---

## Validation

After changes, sanity-check with:

- Google Rich Results Test — <https://search.google.com/test/rich-results>
- Schema Markup Validator — <https://validator.schema.org/>

Confirm every `{ "@id": … }` reference resolves to a node defined somewhere in the
document (nested definitions, like the logo `ImageObject`, count).
