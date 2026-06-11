import Link from 'next/link'

/* Sticky bottom CTA bar — mobile only (see globals.css .mobile-cta) */
export function MobileCta() {
  return (
    <div className="mobile-cta">
      <a
        href="https://www.skool.com/operators-academy-5634"
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-primary"
      >
        Join Free
      </a>
      <Link href="/work-with-me#call" className="btn btn-ghost">
        Book a Call
      </Link>
    </div>
  )
}
