'use client'

import { useEffect } from 'react'

/**
 * Records where a visitor came from: utm_* parameters, a ref parameter, or the referrer, plus the landing page.
 * First touch is kept for 90 days; latest touch is overwritten on every arrival with new data.
 * Stored in one cookie the server reads when a form is submitted, so every lead carries its source.
 */
export function Attribution() {
  useEffect(() => {
    try {
      const p = new URLSearchParams(location.search)
      const touch: Record<string, string> = {}
      for (const k of ['source', 'medium', 'campaign', 'content', 'term']) { const v = p.get('utm_' + k); if (v) touch[k] = v.slice(0, 120) }
      const ref = p.get('ref'); if (ref) touch.ref = ref.slice(0, 120)
      if (!touch.source && document.referrer) {
        try { const h = new URL(document.referrer).hostname; if (h && !h.endsWith(location.hostname)) touch.source = h } catch { /* ignore */ }
      }
      if (!Object.keys(touch).length) return
      touch.landing = location.pathname.slice(0, 120)
      touch.at = new Date().toISOString().slice(0, 10)
      const m = document.cookie.match(/(?:^|; )aw_attr=([^;]*)/)
      let cur: { first?: unknown; last?: unknown } = {}
      if (m) { try { cur = JSON.parse(decodeURIComponent(m[1])) } catch { cur = {} } }
      const next = { first: cur.first || touch, last: touch }
      const secure = location.protocol === 'https:' ? '; Secure' : ''
      document.cookie = `aw_attr=${encodeURIComponent(JSON.stringify(next))}; Path=/; Max-Age=${90 * 86400}; SameSite=Lax${secure}`
    } catch { /* never break the page over analytics */ }
  }, [])
  return null
}
