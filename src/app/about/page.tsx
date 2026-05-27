import Link from 'next/link'

export const metadata = {
  title: 'About · Aton Williams',
  description:
    "Aton Williams: founder of Front Page Agency since 2018, founder of Front Page Intelligence, operator-coach for direct sales organizations.",
}

export default function About() {
  return (
    <>
      <section style={{ padding: '100px 0 60px' }}>
        <div className="container">
          <span className="eyebrow" style={{ marginBottom: 28 }}>
            <span className="dot" />
            ABOUT ATON
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
              margin: '24px 0 32px',
            }}
          >
            I built the company I wished had existed when I started.
          </h1>
          <p style={{ fontSize: 19, color: 'var(--text-2)', maxWidth: 760, lineHeight: 1.7 }}>
            Eight years ago I started Front Page Agency because the operating environment I wanted to work in didn't exist. I built it. Then I kept building. The agency grew. The software came next. The coaching came after. This page is the short version of how it all connects.
          </p>
        </div>
      </section>

      {/* ── THE THREE THINGS I RUN ── */}
      <section style={{ padding: '60px 0' }}>
        <div className="container" style={{ maxWidth: 880 }}>
          <h2
            style={{
              fontFamily: 'var(--display)',
              fontSize: 36,
              fontWeight: 700,
              letterSpacing: '-1px',
              marginBottom: 36,
              color: 'var(--text)',
            }}
          >
            What I actually run, today.
          </h2>

          {[
            {
              tag: 'OPERATING',
              name: 'Front Page Agency',
              loc: 'Fort Worth, TX · Est. 2018',
              body: 'Direct sales firm. Consumer telecom, technology, cybersecurity, health enrollment, nonprofit development, emerging consumer brands. Over $312 million in client revenue generated since we opened. We don\'t sell decks. We sell results we\'ve already delivered. BBB A+. 5-star Google.',
            },
            {
              tag: 'BUILDING',
              name: 'MESA · Front Page Intelligence',
              loc: 'Software platform · Launched 2025',
              body: 'The operator OS for direct sales orgs. CRM, ATS, AI Coach, and the platform that runs your floor. We use it every day at FPA. We license it to other direct sales organizations who want what FPA has without rebuilding it from scratch. Starter Lite from $39/seat/mo, white-label at Enterprise.',
            },
            {
              tag: 'COACHING',
              name: 'Operators Academy + Inner Circle',
              loc: 'Free community + private mastermind',
              body: 'The same frameworks I run my floor on, the same coaching loops I run with my owners, and the conversations that don\'t fit on social media. Free Skool community for operators serious about the work. Private mastermind for the ones building real numbers.',
            },
          ].map((thing) => (
            <div
              key={thing.name}
              className="card-elevated"
              style={{ marginBottom: 18 }}
            >
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 12, flexWrap: 'wrap', gap: 10 }}>
                <div style={{ fontSize: 10, color: 'var(--accent)', fontWeight: 700, letterSpacing: 3, fontFamily: 'var(--display)' }}>
                  {thing.tag}
                </div>
                <div style={{ fontSize: 11, color: 'var(--text-3)' }}>{thing.loc}</div>
              </div>
              <h3 style={{ fontFamily: 'var(--display)', fontSize: 26, fontWeight: 700, marginBottom: 14, color: 'var(--text)' }}>
                {thing.name}
              </h3>
              <p style={{ fontSize: 15, color: 'var(--text-2)', lineHeight: 1.7 }}>
                {thing.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── THE OPERATING LENS ── */}
      <section style={{ padding: '60px 0' }}>
        <div className="container" style={{ maxWidth: 880 }}>
          <span className="eyebrow" style={{ marginBottom: 24 }}>
            <span className="dot" />
            HOW I OPERATE
          </span>
          <h2
            style={{
              fontFamily: 'var(--display)',
              fontSize: 'clamp(28px, 4.5vw, 44px)',
              fontWeight: 700,
              letterSpacing: '-1.2px',
              lineHeight: 1.05,
              marginTop: 16,
              marginBottom: 32,
              color: 'var(--text)',
            }}
          >
            Operator-first. Builder-second. Consultant-always.
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 14 }}>
            {[
              {
                t: 'I still run the floor.',
                d: 'Every framework I teach was tested on my own team this week. If it doesn\'t survive contact with a real shift, it doesn\'t survive at all.',
              },
              {
                t: 'I build the systems I need.',
                d: 'When the software I wanted didn\'t exist, I built it. MESA is the operator OS I wished I\'d had on day one.',
              },
              {
                t: 'The bar is the bar.',
                d: 'Standards so high it\'s worthy of being on the front page. Hired in. Coached up. Held to it every day.',
              },
              {
                t: 'Promote from within.',
                d: 'Every owner on my roster came through this same door. The seat is open for the next operator who earns it.',
              },
              {
                t: 'Calculated risk, not gambling.',
                d: 'I commit when execution is in my control and the downside is bounded. The rest is patience and reps.',
              },
              {
                t: 'Velocity beats perfect.',
                d: 'Ship a v1 fast. Iterate. The floor doesn\'t pay you to plan. The floor pays you to produce.',
              },
            ].map((p) => (
              <div key={p.t} className="card" style={{ padding: 22 }}>
                <h4 style={{ fontFamily: 'var(--display)', fontSize: 16, fontWeight: 700, marginBottom: 8, color: 'var(--accent)' }}>
                  {p.t}
                </h4>
                <p style={{ fontSize: 13.5, color: 'var(--text-2)', lineHeight: 1.6 }}>
                  {p.d}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ padding: '80px 0 40px', textAlign: 'center' }}>
        <div className="container">
          <h2
            className="gradient-text"
            style={{
              fontSize: 'clamp(32px, 5vw, 52px)',
              fontFamily: 'var(--display)',
              fontWeight: 700,
              letterSpacing: '-1.5px',
              lineHeight: 1.05,
              marginBottom: 20,
            }}
          >
            See where the seats are.
          </h2>
          <p style={{ fontSize: 17, color: 'var(--text-2)', maxWidth: 540, margin: '0 auto 32px' }}>
            Five ways in. Free at the bottom. Premium at the top. Pick the one that fits where you are right now.
          </p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/work-with-me" className="btn btn-primary">
              See the offer ladder →
            </Link>
            <a href="https://www.skool.com/operators-academy-5634" target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
              Join the academy free
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
