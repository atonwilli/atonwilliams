import Link from 'next/link'

export function Nav() {
  return (
    <nav className="nav">
      <div className="nav-inner">
        <Link href="/" className="nav-brand">
          <span className="nav-brand-dot" />
          <span>Aton Williams</span>
        </Link>
        <div className="nav-links">
          <Link href="/" className="nav-link">Home</Link>
          <Link href="/about" className="nav-link">About</Link>
          <Link href="/work-with-me" className="nav-link">Work With Me</Link>
          <Link href="/notes" className="nav-link">Notes</Link>
          <Link href="/contact" className="nav-link">Contact</Link>
        </div>
        <div>
          <a
            href="https://www.skool.com/operators-academy-5634"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
            style={{ fontSize: 12, padding: '10px 16px' }}
          >
            Join Free
          </a>
        </div>
      </div>
    </nav>
  )
}
