import Link from 'next/link'

export const metadata = {
  title: 'About · Aton Williams',
  description:
    "Aton Williams: entrepreneur since fourteen, founder of Front Page Agency, never held a 9-to-5. Seventeen years building, nine figures generated, now coaching and consulting the next wave of operators.",
}

export default function About() {
  return (
    <>
      {/* ── HERO with portrait ── */}
      <section style={{ padding: '100px 0 60px' }}>
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.2fr)',
              gap: 64,
              alignItems: 'center',
            }}
            className="about-hero-grid"
          >
            {/* Portrait left */}
            <div>
              <div
                className="portrait"
                style={{
                  backgroundImage: 'url(/aton-about.jpg)',
                  backgroundColor: 'var(--bg-elev)',
                }}
                aria-label="Aton Williams"
              />
            </div>

            {/* Content right */}
            <div>
              <span className="eyebrow" style={{ marginBottom: 28 }}>
                <span className="dot" />
                About Aton
              </span>
              <h1
                className="serif"
                style={{
                  fontSize: 'clamp(40px, 5.5vw, 68px)',
                  lineHeight: 1.0,
                  letterSpacing: '-1.8px',
                  fontWeight: 500,
                  margin: '24px 0 28px',
                  color: 'var(--text)',
                }}
              >
                Never had a 9-to-5. Never planned to.
              </h1>
              <p style={{ fontSize: 17, color: 'var(--text-2)', maxWidth: 580, lineHeight: 1.75 }}>
                I’ve been an entrepreneur since I was fourteen. Atonsworld on YouTube at fourteen. Curated ATL, a boutique, at twenty. Atonsworld Digital, a marketing agency, until twenty-three. Then I founded Front Page Agency, and I’ve been running it ever since. Seventeen years building. Nine figures generated for clients. Multi-millions across our own ecosystem. Now I’m back in the media, coaching business owners and executives, training sales teams, running business audits, and speaking at events for the organizations ready for that level of work.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── TIMELINE / THE ARC ── */}
      <section style={{ padding: '80px 0 40px' }}>
        <div className="container" style={{ maxWidth: 880 }}>
          <div className="rule" />
          <div style={{ fontSize: 11, color: 'var(--accent)', fontWeight: 700, letterSpacing: 4, textTransform: 'uppercase', marginBottom: 18, fontFamily: 'var(--display-sans)' }}>
            The arc
          </div>
          <h2
            className="serif"
            style={{
              fontSize: 'clamp(32px, 4.5vw, 44px)',
              fontWeight: 500,
              letterSpacing: '-1.2px',
              marginBottom: 16,
              color: 'var(--text)',
              lineHeight: 1.1,
            }}
          >
            Seventeen years building. The short version.
          </h2>
          <p style={{ fontSize: 16, color: 'var(--text-2)', maxWidth: 660, lineHeight: 1.75, marginBottom: 56 }}>
            I’ve never sold a course on building a business while never having built one. Every chapter below is something I actually ran. The lessons compound. The earlier ones made the later ones possible.
          </p>

          {/* Timeline */}
          <div style={{ position: 'relative', paddingLeft: 40 }} className="timeline">
            {/* Vertical line */}
            <div
              style={{
                position: 'absolute',
                left: 7,
                top: 12,
                bottom: 12,
                width: 1,
                background: 'linear-gradient(to bottom, var(--accent) 0%, var(--accent-dim) 100%)',
                opacity: 0.4,
              }}
            />

            {[
              {
                age: '14',
                year: '2008',
                title: 'Atonsworld',
                body: 'Started "atonsworld" on YouTube before "creator economy" was a phrase. Built an audience from scratch. The handle stuck — still my YouTube today.',
              },
              {
                age: '20',
                year: '2014',
                title: 'Curated ATL',
                body: 'Opened Curated ATL in Atlanta. Boutique retail. Inventory, leases, payroll, customer service, margin math. Learned operations the hard way, which is the only way that sticks.',
              },
              {
                age: '20–23',
                year: '2014–2017',
                title: 'Atonsworld Digital',
                body: 'Took the Atonsworld brand into a digital marketing agency. Sales, fulfillment, managing a small team, selling the invisible. Got my reps in on client services.',
              },
              {
                age: '23',
                year: '2018',
                title: 'Front Page Agency',
                body: 'Founded FPA in Atlanta. Multi-vertical from the start. The work I’d been preparing for without knowing it.',
              },
              {
                age: '23–31',
                year: '2018–today',
                title: 'Eight years scaling FPA',
                body: 'Built FPA into a multi-vertical sales organization across six campaign categories. Nine figures generated for clients. Multi-millions across our own ecosystem. BBB A+. Recognized as Sales Consultancy Firm of the Year. Still operating.',
              },
              {
                age: '29',
                year: '2024',
                title: 'Objection Coach',
                body: 'Shipped Objection Coach — an AI-powered training app for sales teams. Reps drill real objections, get scored, and improve before the live call. Already used inside FPA.',
                pill: 'AI Aton voice-clone role play coming soon',
              },
              {
                age: '30',
                year: '2025',
                title: 'Front Page Intelligence',
                body: 'Launched FPI, the parent for the AI products and software I’m building for sales orgs and the operators inside them. Quietly compounding. More public soon.',
              },
              {
                age: '31',
                year: '2026',
                title: 'Public again',
                body: 'Compiling seventeen years of operating into the writing, the community, the coaching, and the consulting. Taking a small number of private engagements per year. For the operators, executives, and organizations ready for that level of work.',
              },
            ].map((entry, idx, arr) => (
              <div
                key={entry.year}
                style={{
                  position: 'relative',
                  marginBottom: idx === arr.length - 1 ? 0 : 40,
                }}
              >
                {/* Dot indicator */}
                <div
                  style={{
                    position: 'absolute',
                    left: -40,
                    top: 6,
                    width: 15,
                    height: 15,
                    borderRadius: '50%',
                    background: 'var(--bg-base)',
                    border: '2px solid var(--accent)',
                    boxShadow: '0 0 0 4px var(--bg-base), 0 0 16px var(--accent-glow)',
                  }}
                />

                <div style={{ display: 'flex', gap: 28, flexWrap: 'wrap', alignItems: 'baseline', marginBottom: 10 }}>
                  <span
                    className="serif"
                    style={{
                      fontSize: 28,
                      fontWeight: 500,
                      color: 'var(--accent)',
                      letterSpacing: '-0.6px',
                      lineHeight: 1,
                      minWidth: 80,
                    }}
                  >
                    {entry.age}
                  </span>
                  <span
                    style={{
                      fontSize: 11,
                      color: 'var(--text-3)',
                      fontFamily: 'var(--display-sans)',
                      letterSpacing: 1.5,
                      textTransform: 'uppercase',
                    }}
                  >
                    {entry.year}
                  </span>
                </div>

                <h3
                  className="serif"
                  style={{
                    fontSize: 24,
                    fontWeight: 500,
                    marginBottom: 10,
                    color: 'var(--text)',
                    letterSpacing: '-0.4px',
                  }}
                >
                  {entry.title}
                </h3>
                {'pill' in entry && entry.pill && (
                  <div style={{ marginBottom: 10 }}>
                    <span className="coming-soon">{entry.pill}</span>
                  </div>
                )}
                <p
                  style={{
                    fontSize: 15,
                    color: 'var(--text-2)',
                    lineHeight: 1.75,
                    maxWidth: 680,
                  }}
                >
                  {entry.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── THE THREE THINGS ── */}
      <section style={{ padding: '80px 0' }}>
        <div className="container" style={{ maxWidth: 880 }}>
          <div className="rule" />
          <h2
            className="serif"
            style={{
              fontSize: 'clamp(32px, 4.5vw, 44px)',
              fontWeight: 500,
              letterSpacing: '-1.2px',
              marginBottom: 40,
              color: 'var(--text)',
            }}
          >
            What I actually run today.
          </h2>

          {[
            {
              tag: 'Operating',
              name: 'Front Page Agency',
              loc: 'Fort Worth, TX · Est. 2018',
              body: 'Direct sales firm. Consumer telecom, technology, cybersecurity, health enrollment, nonprofit development, emerging consumer brands. Over $312 million in client revenue generated since we opened. BBB A+. 5-star Google. We don’t sell decks. We sell results we’ve already delivered.',
            },
            {
              tag: 'Coaching',
              name: 'Operators Academy + The Inner Circle',
              loc: 'Free community + private mastermind',
              body: 'Frameworks, breakdowns, and the same coaching loops I run with my owners. Free Skool community for operators serious about the work. The Inner Circle is the invite-only room for the operators building real numbers.',
            },
            {
              tag: 'Writing',
              name: 'The Newsletter + Notes',
              loc: 'Weekly · Free',
              body: 'One email a week. Real lessons, real numbers, no fluff. Everything I learn the hard way gets written down here first. The community sees it before the public.',
            },
          ].map((thing) => (
            <div
              key={thing.name}
              className="card-elevated"
              style={{ marginBottom: 16 }}
            >
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 14, flexWrap: 'wrap', gap: 10 }}>
                <div style={{ fontSize: 10.5, color: 'var(--accent)', fontWeight: 700, letterSpacing: 3, fontFamily: 'var(--display-sans)', textTransform: 'uppercase' }}>
                  {thing.tag}
                </div>
                <div style={{ fontSize: 11, color: 'var(--text-3)', fontFamily: 'var(--display-sans)', letterSpacing: 0.5 }}>{thing.loc}</div>
              </div>
              <h3 className="serif" style={{ fontSize: 28, fontWeight: 500, marginBottom: 14, color: 'var(--text)', letterSpacing: '-0.6px' }}>
                {thing.name}
              </h3>
              <p style={{ fontSize: 15, color: 'var(--text-2)', lineHeight: 1.75 }}>
                {thing.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── HOW I OPERATE ── */}
      <section style={{ padding: '60px 0' }}>
        <div className="container" style={{ maxWidth: 880 }}>
          <div className="rule" />
          <div style={{ fontSize: 11, color: 'var(--accent)', fontWeight: 700, letterSpacing: 4, textTransform: 'uppercase', marginBottom: 18, fontFamily: 'var(--display-sans)' }}>
            How I operate
          </div>
          <h2
            className="serif"
            style={{
              fontSize: 'clamp(30px, 4.5vw, 44px)',
              fontWeight: 500,
              letterSpacing: '-1.2px',
              lineHeight: 1.1,
              marginBottom: 40,
              color: 'var(--text)',
            }}
          >
            Operator-first. Builder-second. Consultant always.
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 14 }}>
            {[
              {
                t: 'Hands-on, every day.',
                d: 'I still run the agency. Every framework I teach was pressure-tested on a real team this week. If it doesn’t survive contact with reality, it doesn’t survive at all.',
              },
              {
                t: 'Build what you need.',
                d: 'When the tools I wanted didn’t exist, I built them. Operators who can build are operators who don’t wait around for permission to grow.',
              },
              {
                t: 'The bar is the bar.',
                d: 'Standards so high it’s worthy of being on the front page. Hired in. Coached up. Held to it every day. No exceptions.',
              },
              {
                t: 'Promote from within.',
                d: 'Every owner on my roster came through this same door. The seat is open for the next operator who earns it.',
              },
              {
                t: 'Calculated risk, not gambling.',
                d: 'I commit when execution is in my control and the downside is bounded. The rest is patience and reps. Confidence comes from preparation, not hope.',
              },
              {
                t: 'Velocity beats perfect.',
                d: 'Ship a v1 fast. Iterate. Planning doesn’t pay the team. Producing does. The operator who moves first usually wins, even if the move isn’t pretty.',
              },
            ].map((p) => (
              <div key={p.t} className="card" style={{ padding: 24 }}>
                <h4 className="serif" style={{ fontSize: 19, fontWeight: 500, marginBottom: 10, color: 'var(--accent-bright)', letterSpacing: '-0.3px' }}>
                  {p.t}
                </h4>
                <p style={{ fontSize: 14, color: 'var(--text-2)', lineHeight: 1.65 }}>
                  {p.d}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ padding: '96px 0 32px', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: 720 }}>
          <div className="rule" style={{ margin: '0 auto 24px' }} />
          <h2
            className="serif"
            style={{
              fontSize: 'clamp(34px, 5vw, 56px)',
              fontWeight: 500,
              letterSpacing: '-1.5px',
              lineHeight: 1.05,
              marginBottom: 20,
              color: 'var(--text)',
            }}
          >
            See where the seats are.
          </h2>
          <p style={{ fontSize: 16, color: 'var(--text-2)', maxWidth: 560, margin: '0 auto 36px', lineHeight: 1.7 }}>
            Four ways in. Free at the bottom. Private at the top. Pick the one that fits where you are right now.
          </p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/work-with-me" className="btn btn-primary">
              See How To Work With Me
            </Link>
            <a href="https://www.skool.com/operators-academy-5634" target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
              Join Free
            </a>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 860px) {
          .about-hero-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
        }
      `}</style>
    </>
  )
}
