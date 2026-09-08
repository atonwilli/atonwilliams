# Content

Everything the site publishes lives here as files. The pages read this folder at build time and every hour after (ISR), and anything dated in the future stays hidden until its date, Arizona time.

- `notes/<slug>.md`: frontmatter (title, date, tag, readTime, teaser, status) plus the body. The body can be HTML or light markdown (paragraphs, `## headings`, `> quotes`, `- lists`).
- `guides/<slug>.json`: a guide spec (`kind: "spec"`, rendered by the site) or a hand-built guide (`kind: "html"`).

To schedule a note: add the file with a future `date`. It appears on that day. To hold one back regardless of date, set `status: "draft"`.
