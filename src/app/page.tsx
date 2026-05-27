import Link from 'next/link'

export default function Home() {
  return (
    <>
      {/* ── HERO ── */}
      <section style={{ padding: '100px 0 80px' }}>
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(0, 1.35fr) minmax(0, 1fr)',
              gap: 64,
              alignItems: 'center',
            }}
            className="hero-grid"
          >
            <div>
              <span className="eyebrow" style={{ marginBottom: 28 }}>
                <span className="dot" />
                Operator · Coach · Builder
              </span>

              <h1
                className="serif"
                style={{
                  fontSize: 'clamp(48px, 6.5vw, 88px)',
                  lineHeight: 1.0,
                  letterSpacing: '-2px',
                  fontWeight: 500,
                  margin: '28px 0 28px',
                  color: 'var(--text)',
                }}
              >
                Hi, I’m Aton.
                <br />
                I help owners, executives, and the teams they lead build with leverage.
              </h1>

              <p
                style={{
                  fontSize: 18,
                  color: 'var(--text-2)',
                  maxWidth: 580,
                  lineHeight: 1.65,
                  marginBottom: 40,
                }}
              >
                Founder of Front Page Agency. Eight years running it. Seventeen years building businesses, starting at fourteen. Nine figures generated for clients. Multi-millions inside our own ecosystem. Never held a 9-to-5. Now I coach business owners and executives, train sales teams, run business audits, and speak at events for the organizations ready for that level of work.
              </p>

              <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginBottom: 48 }}>
                <a
                  href="https://www.skool.com/operators-academy-5634"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                >
                  Join Operators Academy
                </a>
                <Link href="/work-with-me" className="btn btn-ghost">
                  See How To Work With Me
                </Link>
              </div>
            </div>

            {/* Portrait */}
            <div>
              <div
                className="portrait"
                style={{
                  backgroundImage: 'url(/aton.jpg)',
                  backgroundColor: 'var(--bg-elev)',
                }}
                aria-label="Aton Williams portrait"
              />
              <div style={{ fontSize: 11, color: 'var(--text-3)', textAlign: 'right', marginTop: 12, fontFamily: 'var(--display-sans)', letterSpacing: 1.5, textTransform: 'uppercase' }}>
                Fort Worth, TX
              </div>
            </div>
          </div>

          {/* Stats row */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: 0,
              marginTop: 64,
              borderTop: '1px solid var(--border-soft)',
              borderBottom: '1px solid var(--border-soft)',
            }}
          >
            {[
              { num: '$312M+', label: 'Client revenue since 2018' },
              { num: '208K+', label: 'New customers acquired' },
              { num: '17 yrs', label: 'Building businesses' },
              { num: '0', label: '9-to-5 jobs ever held' },
            ].map((s, i) => (
              <div
                key={s.label}
                style={{
                  padding: '32px 24px',
                  borderRight: i < 3 ? '1px solid var(--border-soft)' : 'none',
                }}
              >
                <div
                  className="serif"
                  style={{
                    fontSize: 38,
                    fontWeight: 500,
                    color: 'var(--accent)',
                    letterSpacing: '-1px',
                    marginBottom: 8,
                    lineHeight: 1,
                  }}
                >
                  {s.num}
                </div>
                <div style={{ fontSize: 11.5, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: 1.5, fontFamily: 'var(--display-sans)' }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHAT I RUN ── */}
      <section style={{ padding: '96px 0' }}>
        <div className="container">
          <div style={{ maxWidth: 720, margin: '0 auto 64px', textAlign: 'center' }}>
            <div className="rule" style={{ margin: '0 auto 24px' }} />
            <div style={{ fontSize: 11, color: 'var(--accent)', fontWeight: 700, letterSpacing: 4, textTransform: 'uppercase', marginBottom: 18, fontFamily: 'var(--display-sans)' }}>
              What I run
            </div>
            <h2
              className="serif"
              style={{
                fontSize: 'clamp(34px, 5vw, 54px)',
                fontWeight: 500,
                letterSpacing: '-1.2px',
                lineHeight: 1.1,
                marginBottom: 18,
                color: 'var(--text)',
              }}
            >
              An agency. A community. A standing seat at the table.
            </h2>
            <p style={{ fontSize: 16, color: 'var(--text-2)', lineHeight: 1.7 }}>
              Three projects, one through-line. The agency proves what works. The community shares it. The consulting puts me back in the room with the operators and executives ready to use it.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
            {[
              {
                num: '01',
                title: 'Front Page Agency',
                role: 'Direct sales firm · Est. 2018',
                body: 'Multi-vertical sales organization based in Fort Worth. Consumer telecom, technology, cybersecurity, health enrollment, and emerging consumer brands. Every framework I teach was pressure-tested here first.',
                cta: 'Visit FPA',
                href: 'https://frontpageagencyinc.com',
              },
              {
                num: '02',
                title: 'Operators Academy',
                role: 'Free community on Skool',
                body: 'Frameworks, breakdowns, and the same coaching loops I run with my owners. Free for operators serious about the work. No paywall, no upsell, just a real room.',
                cta: 'Join Free',
                href: 'https://www.skool.com/operators-academy-5634',
              },
              {
                num: '03',
                title: 'Consulting & Speaking',
                role: 'For organizations · By application',
                body: 'Business audits, sales team training (Zoom or in-person), and keynote speaking for conferences and internal events. For organizations ready to put seventeen years of operating experience to work on their floor.',
                cta: 'See Details',
                href: '/work-with-me#organizations',
              },
            ].map((p) => {
              const external = p.href.startsWith('http')
              const inner = (
                <>
                  <div
                    className="serif"
                    style={{
                      fontSize: 56,
                      fontWeight: 400,
                      color: 'var(--accent-dim)',
                      letterSpacing: '-2px',
                      marginBottom: 24,
                      lineHeight: 1,
                    }}
                  >
                    {p.num}
                  </div>
                  <div style={{ fontSize: 10.5, color: 'var(--accent)', fontFamily: 'var(--display-sans)', fontWeight: 700, letterSpacing: 2.5, textTransform: 'uppercase', marginBottom: 10 }}>
                    {p.role}
                  </div>
                  <h3 className="serif" style={{ fontSize: 28, fontWeight: 500, marginBottom: 14, color: 'var(--text)', letterSpacing: '-0.6px' }}>
                    {p.title}
                  </h3>
                  <p style={{ fontSize: 14.5, color: 'var(--text-2)', lineHeight: 1.65, marginBottom: 24 }}>
                    {p.body}
                  </p>
                  <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--accent)', fontFamily: 'var(--display-sans)', letterSpacing: 0.5 }}>
                    {p.cta} →
                  </span>
                </>
              )
              return external ? (
                <a
                  key={p.num}
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card-elevated"
                  style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}
                >
                  {inner}
                </a>
              ) : (
                <Link
                  key={p.num}
                  href={p.href}
                  className="card-elevated"
                  style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}
                >
                  {inner}
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── OFFER LADDER ── */}
      <section style={{ padding: '80px 0' }}>
        <div className="container">
          <div style={{ maxWidth: 720, margin: '0 auto 56px', textAlign: 'center' }}>
            <div className="rule" style={{ margin: '0 auto 24px' }} />
            <div style={{ fontSize: 11, color: 'var(--accent)', fontWeight: 700, letterSpacing: 4, textTransform: 'uppercase', marginBottom: 18, fontFamily: 'var(--display-sans)' }}>
              Ways in
            </div>
            <h2
              className="serif"
              style={{
                fontSize: 'clamp(32px, 5vw, 48px)',
                fontWeight: 500,
                letterSpacing: '-1.2px',
                lineHeight: 1.1,
                marginBottom: 16,
                color: 'var(--text)',
              }}
            >
              Four ways to work with me.
            </h2>
            <p style={{ fontSize: 16, color: 'var(--text-2)', lineHeight: 1.7 }}>
              Free at the entry. Private at the top. Every step is real value, not a trip-wire. Pick the one that fits where you are right now.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 880, margin: '0 auto' }}>
            {[
              { tier: '01', name: 'Operators Academy', sub: 'Free community on Skool', desc: 'Frameworks, daily content, and the playbook. Free for operators serious about the work.', cta: 'Join Free', href: 'https://www.skool.com/operators-academy-5634' },
              { tier: '02', name: 'The Newsletter', sub: 'Weekly · Free', desc: 'One email a week. Real lessons, real numbers, no corporate fluff. The frameworks before they hit the public.', cta: 'Subscribe', href: '/contact' },
              { tier: '03', name: '1:1 Strategy Call', sub: '60 minutes · By application', desc: 'You bring the bottleneck. I bring the framework. Walk out with a 30-day plan you can run on Monday.', cta: 'Apply', href: '/work-with-me#call' },
              { tier: '04', name: 'The Inner Circle', sub: 'Private mastermind · Invite only', desc: 'For owners and aspiring owners running real numbers. Pricing private. Cohort capped at 20.', cta: 'Apply', href: '/work-with-me#inner-circle' },
            ].map((t) => {
              const external = t.href.startsWith('http')
              const cardContent = (
                <>
                  <div className="serif" style={{ fontSize: 32, fontWeight: 400, color: 'var(--accent)', minWidth: 60, letterSpacing: '-1px' }}>
                    {t.tier}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, flexWrap: 'wrap', marginBottom: 6 }}>
                      <span className="serif" style={{ fontSize: 22, fontWeight: 500, color: 'var(--text)' }}>{t.name}</span>
                      <span style={{ fontSize: 11, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: 1.5, fontFamily: 'var(--display-sans)' }}>{t.sub}</span>
                    </div>
                    <div style={{ fontSize: 14, color: 'var(--text-2)', lineHeight: 1.6 }}>
                      {t.desc}
                    </div>
                  </div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--accent)', whiteSpace: 'nowrap', fontFamily: 'var(--display-sans)', letterSpacing: 0.5, textTransform: 'uppercase' }}>
                    {t.cta} →
                  </div>
                </>
              )
              return external ? (
                <a
                  key={t.tier}
                  href={t.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card"
                  style={{ display: 'flex', alignItems: 'center', gap: 24, padding: '24px 28px', textDecoration: 'none', color: 'inherit' }}
                >
                  {cardContent}
                </a>
              ) : (
                <Link
                  key={t.tier}
                  href={t.href}
                  className="card"
                  style={{ display: 'flex', alignItems: 'center', gap: 24, padding: '24px 28px', textDecoration: 'none', color: 'inherit' }}
                >
                  {cardContent}
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section style={{ padding: '96px 0 32px', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: 720 }}>
          <div className="rule" style={{ margin: '0 auto 24px' }} />
          <h2
            className="serif"
            style={{
              fontSize: 'clamp(38px, 6vw, 66px)',
              fontWeight: 500,
              letterSpacing: '-1.5px',
              lineHeight: 1.05,
              marginBottom: 20,
              color: 'var(--text)',
            }}
          >
            Show up. Run the playbook. Compound the wins.
          </h2>
          <p style={{ fontSize: 17, color: 'var(--text-2)', maxWidth: 560, margin: '0 auto 36px', lineHeight: 1.7 }}>
            Everything else is noise. If that sounds like how you already think, the academy is the right room to start in.
          </p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a
              href="https://www.skool.com/operators-academy-5634"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              Join Operators Academy
            </a>
            <Link href="/contact" className="btn btn-ghost">
              Send Me A Note
            </Link>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 860px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
        }
      `}</style>
    </>
  )
}
