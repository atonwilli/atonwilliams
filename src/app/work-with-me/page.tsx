import Link from 'next/link'

export const metadata = {
  title: 'Work With Me · Aton Williams',
  description: 'Five ways to work with Aton. Free community, newsletter, 1:1 coaching, Inner Circle mastermind, and MESA self-serve.',
}

export default function WorkWithMe() {
  return (
    <>
      <section style={{ padding: '100px 0 60px' }}>
        <div className="container">
          <span className="eyebrow" style={{ marginBottom: 28 }}>
            <span className="dot" />
            WORK WITH ME
          </span>
          <h1
            className="gradient-text"
            style={{
              fontFamily: 'var(--display)',
              fontSize: 'clamp(44px, 7vw, 76px)',
              lineHeight: 1.0,
              letterSpacing: '-2px',
              fontWeight: 700,
              maxWidth: 880,
              margin: '24px 0 28px',
            }}
          >
            Five ways in. Pick where you are.
          </h1>
          <p style={{ fontSize: 18, color: 'var(--text-2)', maxWidth: 720, lineHeight: 1.65 }}>
            Free community at the entry. Private mastermind at the top. Every step is real value, not a trip-wire. Climb when you're ready.
          </p>
        </div>
      </section>

      {/* ── TIER CARDS ── */}
      <section style={{ padding: '40px 0 60px' }}>
        <div className="container" style={{ maxWidth: 920 }}>
          {[
            {
              id: 'academy',
              tier: '01',
              tag: 'FREE COMMUNITY',
              name: 'Operators Academy',
              price: 'Free forever',
              body: 'Skool community for operators serious about the work. Frameworks, daily content, breakdowns of real floor numbers, and the same playbook I run my floor on.',
              includes: [
                'The Front Page Playbook (full archive)',
                'Daily content drops on real situations',
                'Q&A threads with me + the community',
                'Live workshops monthly',
                'Free access to the resource library',
              ],
              cta: 'Join free →',
              href: 'https://www.skool.com/operators-academy-5634',
              external: true,
            },
            {
              id: 'newsletter',
              tier: '02',
              tag: 'WEEKLY NEWSLETTER',
              name: 'Notes From the Floor',
              price: 'Free',
              body: 'One email a week. Real lessons from the floor that week, real numbers, what worked, what didn\'t. No fluff. No content-calendar cadence.',
              includes: [
                '1 email / week, ~5 min read',
                'Real situations from FPA\'s floor',
                'Frameworks before they hit the academy',
                'First look at new MESA features',
              ],
              cta: 'Subscribe →',
              href: '/contact',
              external: false,
            },
            {
              id: 'call',
              tier: '03',
              tag: '1:1 COACHING',
              name: 'Strategy Call',
              price: 'By application',
              body: 'You bring the bottleneck. I bring the framework. 60 minutes. Recorded. Walk out with a 30-day plan you can run on Monday.',
              includes: [
                '60-minute private session over Zoom',
                'Pre-call diagnostic intake form',
                'Recording delivered same day',
                'Written 30-day action plan emailed within 24h',
                'Two follow-up emails included over the next 30 days',
              ],
              cta: 'Apply →',
              href: '/contact?topic=coaching-call',
              external: false,
            },
            {
              id: 'inner-circle',
              tier: '04',
              tag: 'PRIVATE MASTERMIND',
              name: 'The Inner Circle',
              price: 'Invite-only · pricing private',
              body: 'For owners and aspiring owners running real numbers. Monthly group calls, private channel access, quarterly in-person meetups, and direct access to me. Cohort capped at 20.',
              includes: [
                'Monthly 90-min group strategy calls',
                'Private channel with me + the cohort',
                'Quarterly in-person meetup (rotating cities)',
                'Direct line for asks between sessions',
                'Annual planning session (1:1 with me)',
                'Capped at 20 operators',
              ],
              cta: 'Apply →',
              href: '/contact?topic=inner-circle',
              external: false,
              featured: true,
            },
            {
              id: 'mesa',
              tier: '05',
              tag: 'THE SOFTWARE',
              name: 'MESA Self-Serve',
              price: 'From $39/seat/mo',
              body: 'The platform itself. Run your own sales org on the same software FPA runs on. CRM, ATS, AI Coach, the works. Starter Lite for small floors, Enterprise white-label for the rest.',
              includes: [
                'Starter Lite ($39/seat) · 1–15 reps · self-serve',
                'Starter ($59/seat) · 15–30 reps · plus one add-on',
                'Pro ($99/seat) · 30–50 reps · full AI Coach',
                'Enterprise ($1,500+/mo flat) · white-label, native apps',
              ],
              cta: 'See MESA →',
              href: 'https://mesa-crm.com',
              external: true,
            },
          ].map((t) => (
            <div
              key={t.id}
              id={t.id}
              className={t.featured ? 'card-elevated' : 'card'}
              style={{
                marginBottom: 18,
                borderColor: t.featured ? 'var(--accent)' : undefined,
                boxShadow: t.featured ? '0 30px 60px -20px rgba(0,0,0,0.5), 0 0 60px -10px var(--accent-glow)' : undefined,
                position: 'relative',
              }}
            >
              {t.featured && (
                <div style={{ position: 'absolute', top: -12, left: 28, background: 'var(--grad-blue)', color: 'white', fontSize: 10, fontWeight: 700, letterSpacing: 2, padding: '5px 12px', borderRadius: 100, fontFamily: 'var(--display)' }}>
                  MOST POPULAR
                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: 12, marginBottom: 8 }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 14 }}>
                  <span style={{ fontFamily: 'var(--display)', fontSize: 24, fontWeight: 700, color: 'var(--accent)' }}>{t.tier}</span>
                  <span style={{ fontSize: 11, color: 'var(--text-3)', letterSpacing: 3, fontWeight: 700, fontFamily: 'var(--display)' }}>{t.tag}</span>
                </div>
                <span style={{ fontSize: 12, color: 'var(--text-2)', fontWeight: 600 }}>{t.price}</span>
              </div>

              <h3 style={{ fontFamily: 'var(--display)', fontSize: 32, fontWeight: 700, letterSpacing: '-0.8px', marginBottom: 12, color: 'var(--text)' }}>
                {t.name}
              </h3>
              <p style={{ fontSize: 15, color: 'var(--text-2)', lineHeight: 1.65, marginBottom: 18, maxWidth: 720 }}>
                {t.body}
              </p>

              <ul style={{ listStyle: 'none', margin: '0 0 24px', padding: 0, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 8 }}>
                {t.includes.map((inc) => (
                  <li key={inc} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', fontSize: 13.5, color: 'var(--text-2)' }}>
                    <span style={{ color: 'var(--accent)', marginTop: 5, flexShrink: 0 }}>●</span>
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

      {/* ── FAQ ── */}
      <section style={{ padding: '40px 0 60px' }}>
        <div className="container" style={{ maxWidth: 880 }}>
          <h2
            style={{
              fontFamily: 'var(--display)',
              fontSize: 'clamp(28px, 4vw, 40px)',
              fontWeight: 700,
              letterSpacing: '-1px',
              marginBottom: 32,
              color: 'var(--text)',
            }}
          >
            Honest questions.
          </h2>

          {[
            {
              q: 'Which tier should I start with?',
              a: 'Start with the academy. Free. Real value. You\'ll see if the way I think matches the way you operate. Climb the ladder from there only when the next tier solves something the current one doesn\'t.',
            },
            {
              q: 'Is the 1:1 coaching for any operator?',
              a: 'I take a limited number of 1:1 calls per month. They\'re for operators with a real, specific bottleneck — promote-out math that isn\'t closing, a hire that\'s failing, a comp plan that\'s killing margin. If the bottleneck is "I need more clients" or "what business should I start," the academy is the right room for now.',
            },
            {
              q: 'What does the Inner Circle actually do?',
              a: 'Monthly call where every operator brings their biggest move of the month. We pressure-test it, sharpen it, and commit to it. Quarterly we meet in person. The private channel is the asynchronous version of that. Cap is 20 because that\'s the room size where I can still hold every operator to their commitments.',
            },
            {
              q: 'Is MESA only for FPA-style orgs?',
              a: 'No. MESA started inside FPA, then we built the white-label layer so any direct sales org can run on it. Solar D2D, pest, B2B inside, retail kiosk, telecom — the platform adapts to your vertical. Different KPIs, different pay rules, different field views per pack.',
            },
            {
              q: 'What if I just want to read your stuff?',
              a: 'The newsletter is free. The academy is free. Both are public. I publish more there than I do on social media, and the conversations are with operators who actually do the work. That alone is worth more than most paid programs.',
            },
          ].map((f) => (
            <details key={f.q} className="card" style={{ marginBottom: 12 }}>
              <summary style={{ fontFamily: 'var(--display)', fontSize: 17, fontWeight: 600, cursor: 'pointer', color: 'var(--text)', listStyle: 'none' }}>
                {f.q}
              </summary>
              <p style={{ fontSize: 14.5, color: 'var(--text-2)', marginTop: 12, lineHeight: 1.7 }}>{f.a}</p>
            </details>
          ))}
        </div>
      </section>
    </>
  )
}
