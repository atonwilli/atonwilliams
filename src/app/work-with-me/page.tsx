import Link from 'next/link'

export const metadata = {
  title: 'Work With Me · Aton Williams',
  description: 'Four ways to work with Aton. Free community, weekly newsletter, 1:1 strategy calls, and The Inner Circle private mastermind.',
}

export default function WorkWithMe() {
  return (
    <>
      <section style={{ padding: '100px 0 60px' }}>
        <div className="container">
          <span className="eyebrow" style={{ marginBottom: 28 }}>
            <span className="dot" />
            Work With Me
          </span>
          <h1
            className="serif"
            style={{
              fontSize: 'clamp(44px, 6.5vw, 80px)',
              lineHeight: 1.0,
              letterSpacing: '-2px',
              fontWeight: 500,
              maxWidth: 880,
              margin: '24px 0 28px',
              color: 'var(--text)',
            }}
          >
            Two paths. Pick the one that fits.
          </h1>
          <p style={{ fontSize: 18, color: 'var(--text-2)', maxWidth: 720, lineHeight: 1.75 }}>
            For individuals: a free community, a weekly newsletter, 1:1 strategy calls, and a private mastermind. For organizations: business audits, sales team training, and keynote speaking. Every step is real value, not a trip-wire.
          </p>

          {/* Quick jump */}
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginTop: 32 }}>
            <a href="#individuals" className="btn btn-ghost" style={{ fontSize: 12, padding: '12px 20px' }}>For Individuals →</a>
            <a href="#organizations" className="btn btn-ghost" style={{ fontSize: 12, padding: '12px 20px' }}>For Organizations →</a>
          </div>
        </div>
      </section>

      {/* ── INDIVIDUALS HEADER ── */}
      <section id="individuals" style={{ padding: '40px 0 0', scrollMarginTop: 80 }}>
        <div className="container" style={{ maxWidth: 920 }}>
          <div className="rule" />
          <div style={{ fontSize: 11, color: 'var(--accent)', fontWeight: 700, letterSpacing: 4, textTransform: 'uppercase', marginBottom: 14, fontFamily: 'var(--display-sans)' }}>
            For Individuals
          </div>
          <h2 className="serif" style={{ fontSize: 'clamp(28px, 4vw, 38px)', fontWeight: 500, letterSpacing: '-1px', color: 'var(--text)', marginBottom: 14, lineHeight: 1.15 }}>
            Four ways in for operators, owners, and the ones building toward their own seat.
          </h2>
          <p style={{ fontSize: 15, color: 'var(--text-2)', maxWidth: 660, lineHeight: 1.7, marginBottom: 40 }}>
            Free at the entry, private at the top. Pick the one that fits where you are right now.
          </p>
        </div>
      </section>

      {/* ── TIER CARDS ── */}
      <section style={{ padding: '0 0 60px' }}>
        <div className="container" style={{ maxWidth: 920 }}>
          {[
            {
              id: 'academy',
              tier: '01',
              tag: 'Free Community',
              name: 'Operators Academy',
              price: 'Free forever',
              body: 'Skool community for operators serious about the work. Frameworks, daily content, breakdowns of real situations, and the same playbook I run with my owners.',
              includes: [
                'The Front Page Playbook (full archive)',
                'Daily content on real situations',
                'Q&A threads with me + the community',
                'Live workshops monthly',
                'Free access to the resource library',
              ],
              cta: 'Join Free',
              href: 'https://www.skool.com/operators-academy-5634',
              external: true,
            },
            {
              id: 'newsletter',
              tier: '02',
              tag: 'Weekly Newsletter',
              name: 'The Newsletter',
              price: 'Free · Weekly',
              body: 'One email a week. Real lessons from the week, real numbers, what worked, what didn’t. No fluff. No content-calendar cadence. Just signal.',
              includes: [
                '1 email / week, ~5 min read',
                'Real situations, real numbers',
                'Frameworks before they hit the community',
                'First look at what I’m working on',
              ],
              cta: 'Subscribe',
              href: '/contact',
              external: false,
            },
            {
              id: 'call',
              tier: '03',
              tag: '1:1 Coaching',
              name: 'Strategy Call',
              price: 'By application',
              body: 'You bring the bottleneck. I bring the framework. Sixty minutes, recorded, walk out with a 30-day plan you can run on Monday morning.',
              includes: [
                '60-minute private session over Zoom',
                'Pre-call diagnostic intake form',
                'Recording delivered same day',
                'Written 30-day action plan within 24h',
                'Two follow-up emails over the next 30 days',
              ],
              cta: 'Apply',
              href: '/contact?topic=coaching-call',
              external: false,
            },
            {
              id: 'inner-circle',
              tier: '04',
              tag: 'Private Mastermind',
              name: 'The Inner Circle',
              price: 'Invite-only · Pricing private',
              body: 'For owners and aspiring owners running real numbers. Monthly group calls, private channel access, quarterly in-person meetups, and direct access to me. Cohort capped at twenty.',
              includes: [
                'Monthly 90-min group strategy calls',
                'Private channel with me + the cohort',
                'Quarterly in-person meetup (rotating cities)',
                'Direct line for asks between sessions',
                'Annual planning session (1:1 with me)',
                'Capped at 20 operators',
              ],
              cta: 'Apply',
              href: '/contact?topic=inner-circle',
              external: false,
              featured: true,
            },
          ].map((t) => (
            <div
              key={t.id}
              id={t.id}
              className={t.featured ? 'card-elevated' : 'card'}
              style={{
                marginBottom: 16,
                borderColor: t.featured ? 'var(--accent)' : undefined,
                boxShadow: t.featured ? '0 30px 60px -20px rgba(0,0,0,0.5), 0 0 60px -12px var(--accent-glow)' : undefined,
                position: 'relative',
                padding: 32,
              }}
            >
              {t.featured && (
                <div style={{ position: 'absolute', top: -12, left: 28, background: 'var(--accent)', color: 'var(--accent-text)', fontSize: 10, fontWeight: 700, letterSpacing: 2, padding: '5px 12px', borderRadius: 100, fontFamily: 'var(--display-sans)', textTransform: 'uppercase' }}>
                  Most Personal
                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: 12, marginBottom: 10 }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 16 }}>
                  <span className="serif" style={{ fontSize: 28, fontWeight: 500, color: 'var(--accent)', letterSpacing: '-0.8px' }}>{t.tier}</span>
                  <span style={{ fontSize: 11, color: 'var(--text-3)', letterSpacing: 2.5, fontWeight: 700, fontFamily: 'var(--display-sans)', textTransform: 'uppercase' }}>{t.tag}</span>
                </div>
                <span style={{ fontSize: 12.5, color: 'var(--text-2)', fontWeight: 600, fontFamily: 'var(--display-sans)' }}>{t.price}</span>
              </div>

              <h3 className="serif" style={{ fontSize: 34, fontWeight: 500, letterSpacing: '-1px', marginBottom: 14, color: 'var(--text)', lineHeight: 1.1 }}>
                {t.name}
              </h3>
              <p style={{ fontSize: 15, color: 'var(--text-2)', lineHeight: 1.7, marginBottom: 22, maxWidth: 720 }}>
                {t.body}
              </p>

              <ul style={{ listStyle: 'none', margin: '0 0 28px', padding: 0, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 8 }}>
                {t.includes.map((inc) => (
                  <li key={inc} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', fontSize: 13.5, color: 'var(--text-2)' }}>
                    <span style={{ color: 'var(--accent)', marginTop: 2, flexShrink: 0, fontSize: 12 }}>◆</span>
                    <span>{inc}</span>
                  </li>
                ))}
              </ul>

              {t.external ? (
                <a href={t.href} target="_blank" rel="noopener noreferrer" className={t.featured ? 'btn btn-primary' : 'btn btn-ghost'}>
                  {t.cta}
                </a>
              ) : (
                <Link href={t.href} className={t.featured ? 'btn btn-primary' : 'btn btn-ghost'}>
                  {t.cta}
                </Link>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── FOR ORGANIZATIONS ── */}
      <section id="organizations" style={{ padding: '60px 0', scrollMarginTop: 80 }}>
        <div className="container" style={{ maxWidth: 920 }}>
          <div className="rule" />
          <div style={{ fontSize: 11, color: 'var(--accent)', fontWeight: 700, letterSpacing: 4, textTransform: 'uppercase', marginBottom: 14, fontFamily: 'var(--display-sans)' }}>
            For Organizations
          </div>
          <h2 className="serif" style={{ fontSize: 'clamp(28px, 4vw, 38px)', fontWeight: 500, letterSpacing: '-1px', color: 'var(--text)', marginBottom: 14, lineHeight: 1.15 }}>
            Speaking, training, and consulting for the teams ready to move.
          </h2>
          <p style={{ fontSize: 15, color: 'var(--text-2)', maxWidth: 660, lineHeight: 1.7, marginBottom: 40 }}>
            For private companies, public companies, executive teams, and sales orgs. By application. Pricing private. All engagements scoped after a discovery conversation.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
            {[
              {
                tag: 'Speaking',
                title: 'Keynote & Fireside',
                price: 'Book me for your next event',
                body: 'Conferences, retreats, internal team events, podcast guesting. Topics around sales operations, recruiting, building from zero, and the operator playbook behind nine figures of client revenue.',
                bullets: [
                  'Keynote talks (30–60 min)',
                  'Fireside chats and panel moderation',
                  'Internal company offsites + retreats',
                  'Travel from Fort Worth, TX',
                ],
                cta: 'Inquire',
                topic: 'speaking',
              },
              {
                tag: 'Team Training',
                title: 'Sales Team Training',
                price: 'Half-day · Full-day · Multi-day',
                body: 'Custom training engagements for sales teams. Zoom or in-person, depending on what your floor needs. Built around your product, your team, your current bottleneck.',
                bullets: [
                  'Discovery call to scope the engagement',
                  'Custom curriculum (no off-the-shelf decks)',
                  'Live training: Zoom or in-person',
                  'Recording + workbook for ongoing reps',
                  'Optional 30-day follow-up coaching block',
                ],
                cta: 'Inquire',
                topic: 'team-training',
              },
              {
                tag: 'Consulting',
                title: 'Business Audit',
                price: 'Engagement-based',
                body: 'A strategic audit of your sales motion, recruiting pipeline, ops, and growth model. Surface the bottlenecks. Build the path forward. Delivered as a written report plus working sessions with leadership.',
                bullets: [
                  'Sales process + funnel audit',
                  'Recruiting + retention audit',
                  'Comp plan + ops review',
                  'Written report with prioritized roadmap',
                  'Optional retainer for execution support',
                ],
                cta: 'Inquire',
                topic: 'business-audit',
              },
            ].map((o) => (
              <div key={o.tag} className="card-elevated" style={{ padding: 30, display: 'flex', flexDirection: 'column' }}>
                <div style={{ fontSize: 10.5, color: 'var(--accent)', fontFamily: 'var(--display-sans)', fontWeight: 700, letterSpacing: 2.5, textTransform: 'uppercase', marginBottom: 12 }}>
                  {o.tag}
                </div>
                <h3 className="serif" style={{ fontSize: 26, fontWeight: 500, color: 'var(--text)', letterSpacing: '-0.5px', marginBottom: 8, lineHeight: 1.15 }}>
                  {o.title}
                </h3>
                <div style={{ fontSize: 12.5, color: 'var(--text-3)', fontFamily: 'var(--display-sans)', letterSpacing: 0.4, marginBottom: 16 }}>
                  {o.price}
                </div>
                <p style={{ fontSize: 14, color: 'var(--text-2)', lineHeight: 1.7, marginBottom: 18 }}>
                  {o.body}
                </p>
                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px', display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {o.bullets.map((b) => (
                    <li key={b} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', fontSize: 13, color: 'var(--text-2)' }}>
                      <span style={{ color: 'var(--accent)', marginTop: 1, flexShrink: 0, fontSize: 11 }}>◆</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
                <div style={{ marginTop: 'auto' }}>
                  <Link href={`/contact?topic=${o.topic}`} className="btn btn-primary" style={{ fontSize: 12, padding: '12px 22px' }}>
                    {o.cta}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section style={{ padding: '40px 0 60px' }}>
        <div className="container" style={{ maxWidth: 880 }}>
          <div className="rule" />
          <h2
            className="serif"
            style={{
              fontSize: 'clamp(32px, 4.5vw, 44px)',
              fontWeight: 500,
              letterSpacing: '-1.2px',
              marginBottom: 36,
              color: 'var(--text)',
            }}
          >
            Honest questions.
          </h2>

          {[
            {
              q: 'Which tier should I start with?',
              a: 'Start with the academy. Free. Real value. You’ll see if the way I think matches the way you operate. Climb the ladder from there only when the next tier solves something the current one doesn’t.',
            },
            {
              q: 'Is the 1:1 coaching for any operator?',
              a: 'I take a limited number of 1:1 calls per month. They’re for operators with a real, specific bottleneck — promote-out math that isn’t closing, a hire that’s failing, a comp plan that’s killing margin. If the bottleneck is "I need more clients" or "what business should I start," the academy is the right room for now.',
            },
            {
              q: 'What does The Inner Circle actually do?',
              a: 'Monthly call where every operator brings their biggest move of the month. We pressure-test it, sharpen it, and commit to it. Quarterly we meet in person. The private channel is the asynchronous version of that. Cap is twenty because that’s the room size where I can still hold every operator to their commitments.',
            },
            {
              q: 'What if I just want to read your stuff?',
              a: 'The newsletter is free. The academy is free. Both are public. I publish more there than I do on social media, and the conversations are with operators who actually do the work. That alone is worth more than most paid programs.',
            },
            {
              q: 'Are you taking new agency clients?',
              a: 'For Front Page Agency client work (campaign management, sales outsourcing, recruiting), reach out through frontpageagencyinc.com. The work I do on this site is personal — coaching, community, and the writing.',
            },
          ].map((f) => (
            <details key={f.q} className="card" style={{ marginBottom: 12 }}>
              <summary className="serif" style={{ fontSize: 19, fontWeight: 500, cursor: 'pointer', color: 'var(--text)', listStyle: 'none', letterSpacing: '-0.3px' }}>
                {f.q}
              </summary>
              <p style={{ fontSize: 14.5, color: 'var(--text-2)', marginTop: 14, lineHeight: 1.75 }}>{f.a}</p>
            </details>
          ))}
        </div>
      </section>
    </>
  )
}
