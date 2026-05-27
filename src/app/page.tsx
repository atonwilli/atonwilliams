import Link from 'next/link'

export default function Home() {
  return (
    <>
      {/* ── HERO ── */}
      <section style={{ padding: '120px 0 80px' }}>
        <div className="container">
          <span className="eyebrow" style={{ marginBottom: 28 }}>
            <span className="dot" />
            OPERATOR · COACH · BUILDER
          </span>
          <h1
            style={{
              fontFamily: 'var(--display)',
              fontSize: 'clamp(48px, 8vw, 96px)',
              lineHeight: 0.98,
              letterSpacing: '-2.5px',
              fontWeight: 700,
              maxWidth: 980,
              margin: '24px 0 28px',
            }}
            className="gradient-text"
          >
            I built the floor. Then I built the software that runs it.
          </h1>
          <p
            style={{
              fontSize: 19,
              color: 'var(--text-2)',
              maxWidth: 680,
              lineHeight: 1.6,
              marginBottom: 40,
            }}
          >
            I'm Aton Williams. I run Front Page Agency, a direct sales firm that has generated over $312 million in revenue for clients since 2018. I built Front Page Intelligence to give operators like me the platform we wished existed. I coach the owners building what I'm building.
          </p>

          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginBottom: 56 }}>
            <a
              href="https://www.skool.com/operators-academy-5634"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              Join Operators Academy →
            </a>
            <Link href="/work-with-me" className="btn btn-ghost">
              See what I offer
            </Link>
          </div>

          {/* Proof row */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: 18,
              marginTop: 24,
            }}
          >
            {[
              { num: '$312M+', label: 'Client revenue since 2018' },
              { num: '208K+', label: 'New customers acquired' },
              { num: '8 yrs', label: 'Running the floor every day' },
              { num: '5+', label: 'Operators promoted to ownership' },
            ].map((s) => (
              <div key={s.label} className="card" style={{ padding: 22 }}>
                <div
                  style={{
                    fontFamily: 'var(--display)',
                    fontSize: 32,
                    fontWeight: 700,
                    color: 'var(--accent)',
                    letterSpacing: '-0.5px',
                    marginBottom: 6,
                  }}
                >
                  {s.num}
                </div>
                <div style={{ fontSize: 12, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: 1.2 }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHAT I ACTUALLY DO ── */}
      <section style={{ padding: '80px 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: 720, margin: '0 auto 56px' }}>
            <div style={{ fontSize: 11, color: 'var(--accent)', fontWeight: 700, letterSpacing: 4, textTransform: 'uppercase', marginBottom: 14, fontFamily: 'var(--display)' }}>
              The three things I actually do
            </div>
            <h2
              className="gradient-text"
              style={{
                fontSize: 'clamp(34px, 5vw, 52px)',
                fontFamily: 'var(--display)',
                fontWeight: 700,
                letterSpacing: '-1.2px',
                lineHeight: 1.05,
                marginBottom: 14,
              }}
            >
              I run a floor. I build software. I coach operators.
            </h2>
            <p style={{ fontSize: 16, color: 'var(--text-2)', lineHeight: 1.6 }}>
              Each one feeds the next. The floor produces what I know. The software encodes it. The coaching transfers it to the next operator.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 18 }}>
            {[
              {
                num: '01',
                title: 'Front Page Agency',
                role: 'I run the floor',
                body: 'Direct sales firm in Fort Worth, TX. Six verticals. Eight years. Every coaching framework I teach was tested here first.',
                cta: 'See FPA →',
                href: 'https://frontpageagencyinc.com',
              },
              {
                num: '02',
                title: 'MESA (FPI)',
                role: 'I build the software',
                body: 'The operator OS for direct sales orgs. CRM, ATS, AI Coach, and the platform that runs floors. Built by an operator who runs a 7-figure agency on it daily.',
                cta: 'See MESA →',
                href: 'https://mesa-crm.com',
              },
              {
                num: '03',
                title: 'Operators Academy',
                role: 'I coach the operators',
                body: 'Free community on Skool. Frameworks, breakdowns, and the same playbook I run my floor on. For the operators building toward their own seat.',
                cta: 'Join free →',
                href: 'https://www.skool.com/operators-academy-5634',
              },
            ].map((p) => (
              <a
                key={p.num}
                href={p.href}
                target={p.href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                className="card-elevated"
                style={{
                  display: 'block',
                  textDecoration: 'none',
                  color: 'inherit',
                  transition: 'transform 0.2s, border-color 0.2s',
                }}
              >
                <div style={{ fontSize: 11, color: 'var(--text-3)', fontFamily: 'var(--display)', fontWeight: 700, letterSpacing: 3, marginBottom: 18 }}>
                  {p.num}
                </div>
                <div style={{ fontSize: 11, color: 'var(--accent)', fontFamily: 'var(--display)', fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 8 }}>
                  {p.role}
                </div>
                <h3 style={{ fontSize: 24, fontFamily: 'var(--display)', fontWeight: 700, marginBottom: 12, color: 'var(--text)' }}>
                  {p.title}
                </h3>
                <p style={{ fontSize: 14, color: 'var(--text-2)', lineHeight: 1.65, marginBottom: 20 }}>
                  {p.body}
                </p>
                <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--accent)' }}>
                  {p.cta}
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW WE'D WORK TOGETHER ── */}
      <section style={{ padding: '80px 0' }}>
        <div className="container">
          <div style={{ maxWidth: 720, margin: '0 auto 56px', textAlign: 'center' }}>
            <div style={{ fontSize: 11, color: 'var(--accent)', fontWeight: 700, letterSpacing: 4, textTransform: 'uppercase', marginBottom: 14, fontFamily: 'var(--display)' }}>
              The offer ladder
            </div>
            <h2
              className="gradient-text"
              style={{
                fontSize: 'clamp(32px, 5vw, 48px)',
                fontFamily: 'var(--display)',
                fontWeight: 700,
                letterSpacing: '-1.2px',
                lineHeight: 1.05,
                marginBottom: 14,
              }}
            >
              Five ways in. Start free. Climb when ready.
            </h2>
            <p style={{ fontSize: 16, color: 'var(--text-2)', lineHeight: 1.6 }}>
              Free at the bottom. Premium at the top. Every step is real value, not a trip-wire.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, maxWidth: 880, margin: '0 auto' }}>
            {[
              { tier: '01', name: 'Operators Academy', sub: 'Free community on Skool', desc: 'Frameworks, daily content, the playbook. Free for operators serious about the work.', cta: 'Join free', href: 'https://www.skool.com/operators-academy-5634' },
              { tier: '02', name: 'Newsletter', sub: 'Weekly notes from the floor', desc: 'One email a week. Real lessons, real numbers, no corporate fluff.', cta: 'Subscribe', href: '/contact' },
              { tier: '03', name: '1:1 Coaching Call', sub: '60-minute strategy session', desc: 'You bring the bottleneck. I bring the framework. Walk out with a 30-day plan.', cta: 'Book a call', href: '/work-with-me#call' },
              { tier: '04', name: 'The Inner Circle', sub: 'Private mastermind', desc: 'Invite-only. For owners and aspiring owners running real numbers. Pricing private.', cta: 'Apply', href: '/work-with-me#inner-circle' },
              { tier: '05', name: 'MESA Self-Serve', sub: 'The platform itself', desc: 'Run your own sales org on the same software FPA runs on. Starter Lite from $39/seat/mo.', cta: 'See MESA', href: 'https://mesa-crm.com' },
            ].map((t) => (
              <a
                key={t.tier}
                href={t.href}
                target={t.href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                className="card"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 24,
                  padding: '22px 26px',
                  textDecoration: 'none',
                  color: 'inherit',
                  transition: 'border-color 0.2s, transform 0.15s',
                }}
              >
                <div style={{ fontFamily: 'var(--display)', fontSize: 28, fontWeight: 700, color: 'var(--accent)', minWidth: 56, letterSpacing: '-1px' }}>
                  {t.tier}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, flexWrap: 'wrap', marginBottom: 4 }}>
                    <span style={{ fontFamily: 'var(--display)', fontSize: 19, fontWeight: 700, color: 'var(--text)' }}>{t.name}</span>
                    <span style={{ fontSize: 12, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: 1.5 }}>{t.sub}</span>
                  </div>
                  <div style={{ fontSize: 14, color: 'var(--text-2)', lineHeight: 1.55 }}>
                    {t.desc}
                  </div>
                </div>
                <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--accent)', whiteSpace: 'nowrap' }}>
                  {t.cta} →
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section style={{ padding: '100px 0 40px', textAlign: 'center' }}>
        <div className="container">
          <h2
            className="gradient-text"
            style={{
              fontSize: 'clamp(36px, 6vw, 64px)',
              fontFamily: 'var(--display)',
              fontWeight: 700,
              letterSpacing: '-1.5px',
              lineHeight: 1.05,
              marginBottom: 16,
            }}
          >
            The work is the work.
          </h2>
          <p style={{ fontSize: 18, color: 'var(--text-2)', maxWidth: 600, margin: '0 auto 32px' }}>
            Show up. Run the playbook. Compound the wins. Everything else is noise.
          </p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a
              href="https://www.skool.com/operators-academy-5634"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              Join the academy free →
            </a>
            <Link href="/work-with-me" className="btn btn-ghost">
              Explore the ladder
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
