'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

const links = [
  { href: '/#start', label: 'Start here' },
  { href: '/#story', label: 'My story' },
  { href: '/notes', label: 'Notes' },
  { href: '/guides', label: 'Free guides' },
  { href: '/#proof', label: 'Proof' },
]

export function Nav() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  useEffect(() => { setOpen(false) }, [pathname])

  return (
    <header className={`nav${scrolled ? ' scrolled' : ''}`} id="nav">
      <div className="wrap">
        <a className="brand" href="/">Aton Williams</a>
        <button className="nav-toggle" id="nav-toggle" aria-expanded={open} aria-controls="nav-links" onClick={() => setOpen(!open)}>
          {open ? 'Close' : 'Menu'}
        </button>
        <nav className={`nav-links${open ? ' open' : ''}`} id="nav-links" aria-label="Main" onClick={() => setOpen(false)}>
          {links.map((l) => (
            <a key={l.href} href={l.href}>{l.label}</a>
          ))}
          <a className="button" href="/#work">Work with me</a>
        </nav>
      </div>
    </header>
  )
}
