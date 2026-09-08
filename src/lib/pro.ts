import fs from 'node:fs'
import path from 'node:path'

/** A purchasable Pro pack. Prices are in whole US dollars. */
export type ProPack = {
  sku: string // matches the guide slug, or "library" for the bundle
  title: string
  tagline: string
  includes: string[]
  price: number
  file: string // zip file name under private/pro
  guide?: string
}

const ROOT = process.env.CONTENT_DIR || path.join(process.cwd(), 'content')
export const PRIVATE_DIR = process.env.PRIVATE_DIR || path.join(process.cwd(), 'private', 'pro')
export const LIBRARY_PRICE = 97

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

const ORDER = ['sales-debrief', 'pitch-framework', 'objections', 'brain-file', 'prompt-with-skills', 'what-is-github', 'custom-skill', 'loop-engineering', 'ai-drift', 'sales-terms']

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
        price: Number(d.price) || 29,
        file: `${slug}-pro.zip`,
      }
    })
  return packs.sort((a, b) => ORDER.indexOf(a.sku) - ORDER.indexOf(b.sku))
}

export function getLibraryPack(): ProPack {
  const packs = getProPacks()
  return {
    sku: 'library',
    title: 'The Operators Pro Library',
    tagline: `All ${packs.length} Pro packs in one download: every build prompt, SOP, template, drill, and prompt.`,
    includes: packs.map((p) => p.title),
    price: LIBRARY_PRICE,
    file: 'operators-pro-library.zip',
  }
}

export function getPack(sku: string): ProPack | undefined {
  if (sku === 'library') return getLibraryPack()
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
