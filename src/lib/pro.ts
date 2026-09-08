import fs from 'node:fs'
import path from 'node:path'

/** A purchasable Pro pack. Prices are in whole US dollars. */
export type ProPack = {
  sku: string // matches the guide slug, or "library" for the bundle
  title: string
  tagline: string
  includes: string[]
  price: number
  compareAt?: number // struck-through list price
  file: string // zip file name under private/pro
  guide?: string
  kind?: 'pack' | 'agent' | 'bundle'
  pillar?: string
  sub?: string
  short?: string
  who?: string[]
  needs?: string
}

const ROOT = process.env.CONTENT_DIR || path.join(process.cwd(), 'content')
export const PRIVATE_DIR = process.env.PRIVATE_DIR || path.join(process.cwd(), 'private', 'pro')
export const LIBRARY_PRICE = 69
export const LIBRARY_COMPARE_AT = 192

function parse(raw: string): Record<string, string | string[]> {
  const m = raw.match(/^---\n([\s\S]*?)\n---\n/)
  const data: Record<string, string | string[]> = {}
  if (!m) return data
  let key = ''
  for (const line of m[1].split('\n')) {
    if (line.startsWith('  - ') && key) (data[key] as string[]).push(line.slice(4).trim().replace(/^"|"$/g, ''))
    else if (line.includes(':')) {
      const i = line.indexOf(':')
      key = line.slice(0, i).trim()
      const v = line.slice(i + 1).trim()
      data[key] = v === '' ? [] : v.replace(/^"|"$/g, '')
    }
  }
  return data
}

const ORDER = ['sales-debrief', 'pitch-framework', 'objections', 'brain-file', 'prompt-with-skills', 'what-is-github', 'custom-skill', 'loop-engineering', 'ai-drift', 'sales-terms', 'identity-selling', 'closer-standards', 'marketing-math', 'business-math', 'five-seats', 'job-post-second-week']

export function getProPacks(): ProPack[] {
  const dir = path.join(ROOT, 'pro')
  if (!fs.existsSync(dir)) return []
  const packs = fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.md'))
    .map((f) => {
      const d = parse(fs.readFileSync(path.join(dir, f), 'utf8'))
      const slug = f.replace(/\.md$/, '')
      return {
        sku: slug,
        guide: (d.guide as string) || slug,
        title: (d.title as string) || slug,
        tagline: (d.tagline as string) || '',
        includes: (d.includes as string[]) || [],
        price: Number(d.price) || 12,
        compareAt: d.compare_at ? Number(d.compare_at) : undefined,
        file: `${slug}-pro.zip`,
        kind: 'pack' as const,
        pillar: (d.pillar as string) || 'sales',
        sub: (d.sub as string) || '',
      }
    })
  return packs.sort((a, b) => ORDER.indexOf(a.sku) - ORDER.indexOf(b.sku))
}

export function getLibraryPack(): ProPack {
  const packs = getProPacks()
  return {
    sku: 'library',
    title: 'The Operators Pro Library',
    tagline: `All ${packs.length} Pro packs in one download, across sales, AI, recruitment, leadership, and operations.`,
    includes: packs.map((p) => p.title),
    price: LIBRARY_PRICE,
    compareAt: LIBRARY_COMPARE_AT,
    file: 'operators-pro-library.zip',
    kind: 'bundle' as const,
  }
}

const AGENT_ORDER = ['strategic-cofounder', 'meta-media-buyer', 'google-media-buyer', 'email-marketing-strategist', 'creative-director']

/** AI agents: one folder each under content/agents, described by its meta.md. */
export function getAgents(): ProPack[] {
  const dir = path.join(ROOT, 'agents')
  if (!fs.existsSync(dir)) return []
  return fs
    .readdirSync(dir)
    .filter((f) => fs.existsSync(path.join(dir, f, 'meta.md')))
    .map((slug) => {
      const d = parse(fs.readFileSync(path.join(dir, slug, 'meta.md'), 'utf8'))
      return {
        sku: `agent-${slug}`,
        title: (d.title as string) || slug,
        short: (d.short as string) || (d.title as string),
        tagline: (d.tagline as string) || '',
        includes: (d.includes as string[]) || [],
        who: (d.who as string[]) || [],
        needs: (d.needs as string) || '',
        price: Number(d.price) || 38,
        compareAt: d.compare_at ? Number(d.compare_at) : undefined,
        file: `agent-${slug}.zip`,
        kind: 'agent' as const,
      }
    })
    .sort((a, b) => AGENT_ORDER.indexOf(a.sku.replace('agent-', '')) - AGENT_ORDER.indexOf(b.sku.replace('agent-', '')))
}

export function getAgentBundle(): ProPack {
  const agents = getAgents()
  const f = path.join(ROOT, 'agents', 'BUNDLE.md')
  const d = fs.existsSync(f) ? parse(fs.readFileSync(f, 'utf8')) : {}
  return {
    sku: 'agents-bundle',
    title: (d.title as string) || 'The Agent Team',
    short: (d.short as string) || 'All five agents',
    tagline: (d.tagline as string) || `All ${agents.length} agents in one download.`,
    includes: agents.map((a) => a.title),
    price: Number(d.price) || 78,
    compareAt: d.compare_at ? Number(d.compare_at) : undefined,
    file: 'agent-team.zip',
    kind: 'bundle' as const,
  }
}

export function getPack(sku: string): ProPack | undefined {
  if (sku === 'library') return getLibraryPack()
  if (sku === 'agents-bundle') return getAgentBundle()
  if (sku.startsWith('agent-')) return getAgents().find((a) => a.sku === sku)
  return getProPacks().find((p) => p.sku === sku)
}

export function packForGuide(guide: string): ProPack | undefined {
  return getProPacks().find((p) => p.guide === guide)
}

export function checkoutEnabled(): boolean {
  return Boolean(process.env.STRIPE_SECRET_KEY)
}

export function siteUrl(): string {
  if (process.env.SITE_URL) return process.env.SITE_URL
  if (process.env.VERCEL_ENV === 'production') return 'https://atonwilliams.com'
  return process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000'
}
