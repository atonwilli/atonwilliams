import Link from 'next/link'

export const metadata = {
  title: 'Notes · Aton Williams',
  description: 'Notes from the floor. Frameworks, breakdowns, and operator-only lessons. Published when there\'s something worth saying.',
}

const notes = [
  {
    slug: 'why-the-90-day-rule-is-actually-real',
    date: '2026-05-22',
    readTime: '6 min',
    title: 'Why the 90-day rule is actually real.',
    teaser: 'Every operator who ever wrote the 90-day rule was either selling a book or had never run a floor. Here is what 90 days actually means.',
    tag: 'OPERATOR PLAYBOOK',
  },
  {
    slug: 'the-comp-plan-decides-the-culture',
    date: '2026-05-18',
    readTime: '8 min',
    title: 'The comp plan decides the culture.',
    teaser: 'Pay the wrong thing, get the wrong behavior. Pay the right thing and people self-police. Most owners get this exactly backwards.',
    tag: 'COMP + PAYROLL',
  },
  {
    slug: 'mesa-the-software-the-operator-wanted',
    date: '2026-05-14',
    readTime: '5 min',
    title: 'MESA, and why the software the operator wanted didn\'t exist.',
    teaser: 'Why I built MESA, why I built it on my own floor first, and why every white-label tenant gets the version FPA actually runs on.',
    tag: 'BUILDING IN PUBLIC',
  },
  {
    slug: 'the-second-round-interview-script',
    date: '2026-05-09',
    readTime: '4 min',
    title: 'The 2nd-round interview that hires the right operator.',
    teaser: 'Most interviews try to sell. The 2nd-round filters. Here is the structure I run, what to ask, and what not to.',
    tag: 'RECRUITING',
  },
  {
    slug: 'standards-so-high-its-worthy-of-being-on-the-front-page',
    date: '2026-05-02',
    readTime: '3 min',
    title: 'Standards so high it\'s worthy of being on the front page.',
    teaser: 'The tagline isn\'t marketing. It\'s the operating standard. Here is what that actually looks like at the floor level.',
    tag: 'CULTURE',
  },
]

export default function Notes() {
  return (
    <>
      <section style={{ padding: '100px 0 60px' }}>
        <div className="container">
          <span className="eyebrow" style={{ marginBottom: 28 }}>
            <span className="dot" />
            NOTES FROM THE FLOOR
          </span>
          <h1
            className="gradient-text"
            style={{
              fontFamily: 'var(--display)',
              fontSize: 'clamp(44px, 7vw, 80px)',
              lineHeight: 1.0,
              letterSpacing: '-2px',
              fontWeight: 700,
              maxWidth: 900,
              margin: '24px 0 28px',
            }}
          >
            Written when there's something worth saying.
          </h1>
          <p style={{ fontSize: 18, color: 'var(--text-2)', maxWidth: 720, lineHeight: 1.65 }}>
            No content-calendar cadence. No fluff. Notes from the floor, frameworks I'm running this week, and the breakdowns I share with my Inner Circle before they hit the public.
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
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10, marginBottom: 10 }}>
                <span style={{ fontSize: 10, color: 'var(--accent)', fontWeight: 700, letterSpacing: 3, fontFamily: 'var(--display)' }}>
                  {n.tag}
                </span>
                <span style={{ fontSize: 11, color: 'var(--text-3)' }}>
                  {n.date} · {n.readTime}
                </span>
              </div>
              <h2 style={{ fontFamily: 'var(--display)', fontSize: 24, fontWeight: 700, marginBottom: 10, color: 'var(--text)', letterSpacing: '-0.4px' }}>
                {n.title}
              </h2>
              <p style={{ fontSize: 14.5, color: 'var(--text-2)', lineHeight: 1.6 }}>
                {n.teaser}
              </p>
              <div style={{ marginTop: 14, fontSize: 13, color: 'var(--accent)', fontWeight: 600 }}>
                Read the note →
              </div>
            </Link>
          ))}

          <div style={{ textAlign: 'center', marginTop: 48, padding: 32, background: 'var(--accent-subtle)', border: '1px solid var(--border-accent)', borderRadius: 14 }}>
            <h3 style={{ fontFamily: 'var(--display)', fontSize: 22, fontWeight: 700, marginBottom: 10, color: 'var(--text)' }}>
              Want the next note in your inbox?
            </h3>
            <p style={{ fontSize: 14, color: 'var(--text-2)', marginBottom: 18 }}>
              One email a week. Real lessons. Real numbers. No fluff.
            </p>
            <Link href="/contact" className="btn btn-primary">
              Subscribe →
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
