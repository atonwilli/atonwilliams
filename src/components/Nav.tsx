'use client'

import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'

export type NavProduct = { href: string; label: string; price?: number; group?: string }

const links = [
  { href: '/#start', label: 'Start here' },
  { href: '/guides', label: 'Free guides' },
]

/**
 * Top nav. The paid products sit one click from every page: an "AI agents" menu that lists
 * every agent, the team bundle, and the library, plus "Pro packs" as its own link.
 */
export function Nav({ products = [] }: { products?: NavProduct[] }) {
  const [open, setOpen] = useState(false)
  const [menu, setMenu] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  useEffect(() => { setOpen(false); setMenu(false) }, [pathname])
  useEffect(() => {
    if (!menu) return
    const away = (e: MouseEvent) => { if (menuRef.current && !menuRef.current.contains(e.target as Node)) setMenu(false) }
    const esc = (e: KeyboardEvent) => { if (e.key === 'Escape') setMenu(false) }
    document.addEventListener('mousedown', away)
    document.addEventListener('keydown', esc)
    return () => { document.removeEventListener('mousedown', away); document.removeEventListener('keydown', esc) }
  }, [menu])

  const groups = Array.from(new Set(products.map((p) => p.group || '')))

  return (
    <header className={`nav${scrolled ? ' scrolled' : ''}`} id="nav">
      <div className="wrap">
        <a className="brand" href="/">Aton Williams</a>
        <button className="nav-toggle" id="nav-toggle" aria-expanded={open} aria-controls="nav-links" onClick={() => setOpen(!open)}>
          {open ? 'Close' : 'Menu'}
        </button>
        <nav className={`nav-links${open ? ' open' : ''}`} id="nav-links" aria-label="Main">
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}>{l.label}</a>
          ))}
          {products.length > 0 && (
            <div className={`nav-menu${menu ? ' open' : ''}`} ref={menuRef} onMouseEnter={() => setMenu(true)} onMouseLeave={() => setMenu(false)}>
              <button type="button" className="nav-menu-btn" aria-expanded={menu} aria-haspopup="true" onClick={() => setMenu(!menu)}>
                AI agents
                <svg viewBox="0 0 12 12" width="10" height="10" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M2.5 4.5 6 8l3.5-3.5" /></svg>
              </button>
              <div className="nav-menu-panel" role="menu">
                {groups.map((g) => (
                  <div className="nav-menu-group" key={g || 'main'}>
                    {g && <span className="nav-menu-label">{g}</span>}
                    {products.filter((p) => (p.group || '') === g).map((p) => (
                      <a key={p.href} href={p.href} role="menuitem" onClick={() => { setMenu(false); setOpen(false) }}>
                        <span>{p.label}</span>{p.price != null && <em>${p.price}</em>}
                      </a>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          )}
          <a href="/pro#packs" onClick={() => setOpen(false)}>Pro packs</a>
          <a href="/notes" onClick={() => setOpen(false)}>Notes</a>
          <a className="button" href="/#work" onClick={() => setOpen(false)}>Work with me</a>
        </nav>
      </div>
    </header>
  )
}
