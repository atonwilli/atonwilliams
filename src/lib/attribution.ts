import { cookies } from 'next/headers'

/**
 * Where a visitor came from, carried into every lead, subscriber, purchase, and resource event.
 * The browser keeps first touch and latest touch in one cookie (set by <Attribution/>); the server reads it here.
 */
export const ATTR_COOKIE = 'aw_attr'
export type Touch = { source?: string; medium?: string; campaign?: string; content?: string; term?: string; ref?: string; landing?: string; at?: string }
export type Attribution = { first?: Touch; last?: Touch }

export async function readAttribution(): Promise<Attribution | null> {
  try {
    const raw = (await cookies()).get(ATTR_COOKIE)?.value
    if (!raw) return null
    const j = JSON.parse(decodeURIComponent(raw)) as Attribution
    return j && typeof j === 'object' ? j : null
  } catch { return null }
}

/** Flat key/value form of the attribution, for Mesa metadata and email tables. */
export function flatten(a: Attribution | null): Record<string, string> {
  const out: Record<string, string> = {}
  if (!a) return out
  for (const [k, t] of [['first', a.first], ['last', a.last]] as const) {
    if (!t) continue
    for (const f of ['source', 'medium', 'campaign', 'content', 'term', 'ref', 'landing'] as const) if (t[f]) out[`${k}_${f}`] = String(t[f]).slice(0, 200)
  }
  return out
}
