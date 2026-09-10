# Resource catalog schema (atonwilliams.com)

Every resource on the site is a file in `content/`. The site reads the files at build and request time; there is no CMS. This is the schema the site, the newsletter, the Telegram bot, and Mesa all read from.

## Free guides: `content/guides/<slug>.json`

| Field | Type | Meaning |
|---|---|---|
| kind | "spec" or "html" | spec guides are structured (sections of blocks); html guides are prebuilt pages |
| status | "published" or "draft" | drafts never render or list |
| date | YYYY-MM-DD | visible from this date (America/Phoenix); future dates queue |
| slug | string | URL: /guides/<slug>; also the id used by Pro packs, events, and downloads |
| num | string | order within the library |
| pillar | sales, ai, recruitment, leadership, operations | library section |
| sub | string | sub-group inside the pillar (see SUB_ORDER in src/lib/content.ts) |
| keys | string | search words for the library filter; include audience and problem words here |
| audience | string | who it is for, in plain words (also appended to keys) |
| problem | string | the visitor's problem, in their words (also appended to keys) |
| cardBlurb, cardTags | string, string[] | library card copy and chips |
| title, desc, h1, em, lead, read, kit | strings, number | page head: title, meta description, headline, italic tail, lead paragraph, read minutes, kit summary |
| tiles | [label, text][] | the three tiles under the lead |
| sections | { nav, label, h2, body }[] | body blocks: p, steps, checks, said, code, linkedin |
| ws, fields | [num-label, h2, intro], [label, placeholder][] | the worksheet |
| pr, prompt | [num-label, h2, intro], string | the copyable prompt (Telegram HTML bold allowed) |
| pro_h3, pro_items | string, string[] | what the Pro companion adds (shown when a pack exists) |
| offer | [eyebrow, h2, text, href, button] | the contextual next step under the guide |

Downloads for a guide live in `public/downloads/`: `<slug>-prompt.txt` (always) and `<slug>.pdf` (when present, the page shows the PDF button on its own).

## Pro packs: `content/pro/<slug>.md`

Frontmatter: title, guide (the free guide slug), status (published or draft; drafts show as "in progress" on the guide and are never sold), price, compare_at, pillar, sub, tagline, includes[]. Body: the "Start here" build prompt in a code fence, then the chapters. `scratchpad/port/build-pro.py` turns a published pack into the zip in `private/pro/`.

## Agents: `content/agents/<slug>/`

meta.md (title, short, price, compare_at, tagline, includes, who, needs) plus the agent files. Bundle in `content/agents/BUNDLE.md`.

## Notes and members posts

`content/notes/<slug>.md` (public Friday note, date-gated) and `content/members/<slug>.md` (Monday members note). Frontmatter documented in src/lib/content.ts and src/lib/members.ts.

## Access levels

| Level | Where | Gate |
|---|---|---|
| Free | guides, notes, downloads in public/downloads, the free Telegram channel | none |
| Pro pack or agent | private/pro zips | paid Stripe session (`/api/download`) or active membership (`/api/members/download`) |
| Membership | /members, the Pro Telegram room, recordings | signed member cookie, status active |

## Events and attribution

`resource_events` (pulse database): event (resource_viewed, prompt_copied, download_requested, download_succeeded, outbound_click), resource (slug), attribution (first and last touch), meta. Attribution is captured by `<Attribution/>` from utm_* and ref parameters into the `aw_attr` cookie (90 days) and carried into leads (Mesa metadata), subscribers (`newsletter_subscribers.attribution`), and purchases.
