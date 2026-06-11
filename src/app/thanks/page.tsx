import Link from 'next/link'

export const metadata = {
  title: 'Message Received · Aton Williams',
  description: 'Your message is in. While you wait, join Operators Academy free.',
  robots: { index: false },
}

export default function Thanks() {
  return (
    <section style={{ padding: '120px 0 80px', textAlign: 'center' }}>
      <div className="container" style={{ maxWidth: 680 }}>
        <span className="eyebrow" style={{ marginBottom: 28 }}>
          <span className="dot" />
          Message Received
        </span>
        <h1
          className="serif"
          style={{
            fontSize: 'clamp(40px, 6vw, 68px)',
            lineHeight: 1.05,
            letterSpacing: '-1.8px',
            fontWeight: 500,
            margin: '24px 0 22px',
            color: 'var(--text)',
          }}
        >
          It’s in my inbox. I read every one.
        </h1>
        <p style={{ fontSize: 17, color: 'var(--text-2)', lineHeight: 1.75, maxWidth: 540, margin: '0 auto 40px' }}>
          No auto-responder, no assistant filtering — you’ll hear back from me directly, usually within one business day. If it’s an application, I’ll come back with next steps or an honest no.
        </p>

        <div className="card-elevated" style={{ padding: 36, borderColor: 'var(--border-accent)', textAlign: 'center' }}>
          <h2 className="serif" style={{ fontSize: 24, fontWeight: 500, color: 'var(--text)', letterSpacing: '-0.5px', marginBottom: 12 }}>
            While you wait, get in the room.
          </h2>
          <p style={{ fontSize: 14.5, color: 'var(--text-2)', lineHeight: 1.7, maxWidth: 480, margin: '0 auto 24px' }}>
            Operators Academy is where the frameworks, breakdowns, and daily content live. Free, no paywall, no upsell. You’ll have value in hand before I’ve even replied.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="https://www.skool.com/operators-academy-5634" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              Join Operators Academy
            </a>
            <Link href="/notes" className="btn btn-ghost">
              Read the Notes
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
