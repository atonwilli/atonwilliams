import Link from 'next/link'

export const metadata = {
  title: 'Notes · Aton Williams',
  description: 'Frameworks, breakdowns, and operator-only lessons. Published when there\'s something worth saying.',
}

const notes = [
  {
    slug: 'why-the-90-day-rule-is-actually-real',
    date: '2026-05-22',
    readTime: '6 min',
    title: 'Why the 90-day rule is actually real.',
    teaser: 'Every operator who wrote the 90-day rule was either selling a book or had never built a team. Here is what 90 days actually means when you\'re inside it.',
    tag: 'Operator Playbook',
  },
  {
    slug: 'the-comp-plan-decides-the-culture',
    date: '2026-05-18',
    readTime: '8 min',
    title: 'The comp plan decides the culture.',
    teaser: 'Pay the wrong thing, get the wrong behavior. Pay the right thing and people self-police. Most owners get this exactly backwards.',
    tag: 'Comp + Payroll',
  },
  {
    slug: 'how-i-recruited-five-owners-out-of-my-chair',
    date: '2026-05-14',
    readTime: '5 min',
    title: 'How I recruited five owners out of my own chair.',
    teaser: 'Every owner on my roster came through the same door I did. The path is teachable. The standard is not negotiable. Here is how the lattice actually works.',
    tag: 'Recruiting',
  },
  {
    slug: 'the-second-round-interview-script',
    date: '2026-05-09',
    readTime: '4 min',
    title: 'The 2nd-round interview that hires the right operator.',
    teaser: 'Most interviews try to sell. The 2nd-round filters. Here is the structure I run, what to ask, and what to avoid.',
    tag: 'Recruiting',
  },
  {
    slug: 'standards-so-high-its-worthy-of-being-on-the-front-page',
    date: '2026-05-02',
    readTime: '3 min',
    title: 'Standards so high it\'s worthy of being on the front page.',
    teaser: 'The tagline isn\'t marketing. It\'s the operating standard. Here is what that looks like in practice when nobody is watching.',
    tag: 'Culture',
  },
]

export default function Notes() {
  return (
    <>
      <section style={{ padding: '100px 0 60px' }}>
        <div className="container">
          <span className="eyebrow" style={{ marginBottom: 28 }}>
            <span className="dot" />
            Writing &amp; Frameworks
          </span>
          <h1
            className="serif"
            style={{
              fontSize: 'clamp(44px, 6.5vw, 80px)',
              lineHeight: 1.0,
              letterSpacing: '-2px',
              fontWeight: 500,
              maxWidth: 900,
              margin: '24px 0 28px',
              color: 'var(--text)',
            }}
          >
            Written when there&apos;s something worth saying.
          </h1>
          <p style={{ fontSize: 18, color: 'var(--text-2)', maxWidth: 720, lineHeight: 1.75 }}>
            No content-calendar cadence. No fluff. Frameworks I&apos;m running this week, breakdowns I share with my community first, and the lessons I keep relearning. Published when one of them is ready.
          </p>
        </div>
      </section>

      {/* ── NOTES LIST ── */}
      <section style={{ padding: '40px 0 60px' }}>
        <div className="container" style={{ maxWidth: 880 }}>
          {notes.map((n) => (
            <Link
              key={n.slug}
              href={`/notes/${n.slug}`}
              className="card"
              style={{
                display: 'block',
                marginBottom: 14,
                textDecoration: 'none',
                color: 'inherit',
                transition: 'border-color 0.2s, transform 0.15s',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10, marginBottom: 14 }}>
                <span style={{ fontSize: 10, color: 'var(--accent)', fontWeight: 700, letterSpacing: 2.5, fontFamily: 'var(--display-sans)', textTransform: 'uppercase' }}>
                  {n.tag}
                </span>
                <span style={{ fontSize: 11, color: 'var(--text-3)', fontFamily: 'var(--display-sans)', letterSpacing: 0.5 }}>
                  {n.date} · {n.readTime}
                </span>
              </div>
              <h2 className="serif" style={{ fontSize: 28, fontWeight: 500, marginBottom: 12, color: 'var(--text)', letterSpacing: '-0.6px', lineHeight: 1.2 }}>
                {n.title}
              </h2>
              <p style={{ fontSize: 14.5, color: 'var(--text-2)', lineHeight: 1.7 }}>
                {n.teaser}
              </p>
              <div style={{ marginTop: 16, fontSize: 12, color: 'var(--accent)', fontWeight: 600, fontFamily: 'var(--display-sans)', textTransform: 'uppercase', letterSpacing: 1 }}>
                Read →
              </div>
            </Link>
          ))}

          <div style={{ textAlign: 'center', marginTop: 56, padding: 40, background: 'var(--accent-subtle)', border: '1px solid var(--border-accent)', borderRadius: 14 }}>
            <h3 className="serif" style={{ fontSize: 28, fontWeight: 500, marginBottom: 12, color: 'var(--text)', letterSpacing: '-0.5px' }}>
              Want the next one in your inbox?
            </h3>
            <p style={{ fontSize: 14.5, color: 'var(--text-2)', marginBottom: 22, maxWidth: 440, margin: '0 auto 22px', lineHeight: 1.7 }}>
              One email a week. Real lessons. Real numbers. No fluff.
            </p>
            <Link href="/contact" className="btn btn-primary">
              Subscribe
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
