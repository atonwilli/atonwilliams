'use client'

import Link from 'next/link'
import { useState } from 'react'
import { usePathname } from 'next/navigation'

const links = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/work-with-me', label: 'Work With Me' },
  { href: '/notes', label: 'Notes' },
  { href: '/contact', label: 'Contact' },
]

export function Nav() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  return (
    <nav className="nav">
      <div className="nav-inner">
        <Link href="/" className="nav-brand" onClick={() => setOpen(false)}>
          <span className="nav-brand-dot" />
          <span>Aton Williams</span>
        </Link>

        <div className="nav-links">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`nav-link${pathname === l.href ? ' active' : ''}`}
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <a
            href="https://www.skool.com/operators-academy-5634"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary nav-cta"
            style={{ fontSize: 12, padding: '10px 16px' }}
          >
            Join Free
          </a>
          <button
            className="nav-toggle"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen(!open)}
          >
            <span className={`nav-toggle-bar${open ? ' open-top' : ''}`} />
            <span className={`nav-toggle-bar${open ? ' open-mid' : ''}`} />
            <span className={`nav-toggle-bar${open ? ' open-bot' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile menu panel */}
      <div className={`nav-mobile${open ? ' open' : ''}`}>
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className={`nav-mobile-link${pathname === l.href ? ' active' : ''}`}
            onClick={() => setOpen(false)}
          >
            {l.label}
          </Link>
        ))}
        <div style={{ display: 'flex', gap: 10, padding: '14px 0 6px' }}>
          <a
            href="https://www.skool.com/operators-academy-5634"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
            style={{ flex: 1, justifyContent: 'center', fontSize: 12 }}
            onClick={() => setOpen(false)}
          >
            Join Free
          </a>
          <Link
            href="/work-with-me#call"
            className="btn btn-ghost"
            style={{ flex: 1, justifyContent: 'center', fontSize: 12 }}
            onClick={() => setOpen(false)}
          >
            Book a Call
          </Link>
        </div>
      </div>
    </nav>
  )
}
