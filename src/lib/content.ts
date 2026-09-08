import fs from 'node:fs'
import path from 'node:path'

export type Note = {
  slug: string
  title: string
  date: string
  tag: string
  readTime: string
  teaser: string
  status: 'published' | 'draft'
  body: string
  action?: string
  hook?: string
}

export type Pillar = 'sales' | 'ai' | 'recruitment' | 'leadership' | 'operations'
export const PILLARS: { key: Pillar; label: string; blurb: string }[] = [
  { key: 'sales', label: 'Sales', blurb: 'Coaching, scripts, objections, frameworks, closing, and the terms.' },
  { key: 'ai', label: 'AI', blurb: 'Running a business on AI, sorted by the tool you use.' },
  { key: 'recruitment', label: 'Recruitment', blurb: 'Hiring for hunger and keeping the hire.' },
  { key: 'leadership', label: 'Leadership', blurb: 'Standards, seats, and the people who run the floor.' },
  { key: 'operations', label: 'Operations', blurb: 'The numbers and the systems that run the day.' },
]
export const SUBS: Record<string, string> = {
  coaching: 'Coaching', scripts: 'Scripts', objections: 'Objections by medium, industry, and niche', frameworks: 'Frameworks', closing: 'Closing', terms: 'Terms and quizzes',
  'any-model': 'Works with any model', claude: 'Claude', 'claude-code': 'Claude Code', chatgpt: 'ChatGPT', building: 'Building and shipping apps',
  hiring: 'Hiring', team: 'The team', numbers: 'The numbers', systems: 'Systems',
}
export const SUB_ORDER: Record<Pillar, string[]> = {
  sales: ['coaching', 'scripts', 'objections', 'frameworks', 'closing', 'terms'],
  ai: ['any-model', 'claude', 'claude-code', 'chatgpt', 'building'],
  recruitment: ['hiring'],
  leadership: ['team'],
  operations: ['numbers', 'systems'],
}

type GuideBase = {
  slug: string
  num: string
  date: string
  status: 'published' | 'draft'
  topicKey: string
  topicLabel: string
  pillar: Pillar
  sub: string
  keys: string
  cardBlurb: string
  cardTags: string[]
  title: string
  desc: string
  band: string
  h1: string
  em: string
  lead: string
}
export type HtmlGuide = GuideBase & { kind: 'html'; css: string; heroHtml: string; kitHtml: string; articleHtml: string }
export type SpecBlock = [string, ...unknown[]]
export type SpecSection = { nav: string; label: string; h2: string; body: SpecBlock[] }
export type SpecGuide = GuideBase & {
  kind: 'spec'
  topic: string
  read: number | string
  kit: string
  tiles: [string, string][]
  sections: SpecSection[]
  fields: [string, string][]
  prompt: string
  pro_h3: string
  pro_items: string[]
  ws: [string, string, string]
  pr: [string, string, string]
  offer: [string, string, string, string, string]
}
export type Guide = HtmlGuide | SpecGuide

const ROOT = process.env.CONTENT_DIR || path.join(process.cwd(), 'content')

/** Today's date in Arizona, as YYYY-MM-DD. Content dated after this stays hidden. */
export function today(): string {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Phoenix', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date())
}

export function isLive(item: { date: string; status: string }): boolean {
  return item.status !== 'draft' && item.date <= today()
}

export function formatDate(date: string): string {
  return new Intl.DateTimeFormat('en-US', { timeZone: 'UTC', year: 'numeric', month: 'long', day: 'numeric' }).format(new Date(date + 'T12:00:00Z'))
}

function parseFrontmatter(raw: string): { data: Record<string, string>; body: string } {
  const m = raw.match(/^---\n([\s\S]*?)\n---\n?/)
  if (!m) return { data: {}, body: raw }
  const data: Record<string, string> = {}
  for (const line of m[1].split('\n')) {
    const i = line.indexOf(':')
    if (i === -1) continue
    const key = line.slice(0, i).trim()
    let value = line.slice(i + 1).trim()
    if (value.startsWith('"')) {
      try { value = JSON.parse(value) } catch { value = value.slice(1, -1) }
    }
    data[key] = value
  }
  return { data, body: raw.slice(m[0].length) }
}

/** Markdown-lite: raw HTML passes through; plain paragraphs, ## headings, > quotes and - lists are converted. */
function toHtml(body: string): string {
  if (/<(p|h2|ul|ol|blockquote|div)[\s>]/.test(body)) return body.trim()
  return body
    .trim()
    .split(/\n\s*\n/)
    .map((block) => {
      const b = block.trim()
      if (b.startsWith('## ')) return `<h2>${b.slice(3)}</h2>`
      if (b.startsWith('> ')) return `<blockquote>${b.replace(/^> ?/gm, '')}</blockquote>`
      if (/^- /m.test(b)) return `<ul>${b.split('\n').map((l) => `<li>${l.replace(/^- /, '')}</li>`).join('')}</ul>`
      return `<p>${b.replace(/\n/g, ' ')}</p>`
    })
    .join('\n')
}

function readNotes(): Note[] {
  const dir = path.join(ROOT, 'notes')
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.md'))
    .map((f) => {
      const { data, body } = parseFrontmatter(fs.readFileSync(path.join(dir, f), 'utf8'))
      return {
        slug: f.replace(/\.md$/, ''),
        title: data.title ?? '',
        date: data.date ?? '',
        tag: data.tag ?? '',
        readTime: data.readTime ?? '',
        teaser: data.teaser ?? '',
        status: (data.status as Note['status']) ?? 'published',
        body: toHtml(body),
        action: data.action || undefined,
        hook: data.hook || undefined,
      }
    })
}

export function getNotes(): Note[] {
  return readNotes().filter(isLive).sort((a, b) => (a.date < b.date ? 1 : -1))
}
export function getNote(slug: string): Note | undefined {
  return getNotes().find((n) => n.slug === slug)
}

function readGuides(): Guide[] {
  const dir = path.join(ROOT, 'guides')
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.json'))
    .map((f) => JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8')) as Guide)
}
export function getGuides(): Guide[] {
  return readGuides().filter(isLive).sort((a, b) => a.num.localeCompare(b.num))
}
export function getGuide(slug: string): Guide | undefined {
  return getGuides().find((g) => g.slug === slug)
}
