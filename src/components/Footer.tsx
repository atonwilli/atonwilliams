import Link from 'next/link'

export function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
              <span className="nav-brand-dot" />
              <span style={{ fontFamily: 'var(--display)', fontWeight: 700, letterSpacing: 2, fontSize: 15 }}>
                ATON WILLIAMS
              </span>
            </div>
            <p style={{ fontSize: 13, color: 'var(--text-2)', maxWidth: 320, lineHeight: 1.65 }}>
              Operator. Coach. Builder. Founder of Front Page Agency and Front Page Intelligence. I help direct sales orgs and the operators inside them turn hard work into compounding leverage.
            </p>
          </div>

          <div>
            <h4>The Path</h4>
            <ul>
              <li><Link href="/about">About</Link></li>
              <li><Link href="/work-with-me">Work With Me</Link></li>
              <li><Link href="/notes">Notes</Link></li>
              <li><Link href="/contact">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4>Where I Build</h4>
            <ul>
              <li><a href="https://frontpageagencyinc.com" target="_blank" rel="noopener noreferrer">Front Page Agency</a></li>
              <li><a href="https://mesa-crm.com" target="_blank" rel="noopener noreferrer">MESA (FPI)</a></li>
              <li><a href="https://www.skool.com/operators-academy-5634" target="_blank" rel="noopener noreferrer">Operators Academy</a></li>
            </ul>
          </div>

          <div>
            <h4>Find Me</h4>
            <ul>
              <li><a href="https://www.linkedin.com/in/atonwilliams" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
              <li><a href="https://instagram.com/atonsworld" target="_blank" rel="noopener noreferrer">Instagram</a></li>
              <li><a href="mailto:aton@frontpageagencyinc.com">Email</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Aton Williams. All rights reserved.</span>
          <span>Built by the operator.</span>
        </div>
      </div>
    </footer>
  )
}
