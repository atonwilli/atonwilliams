export const metadata = {
  title: 'Contact · Aton Williams',
  description: 'Subscribe to the newsletter, apply for a strategy call, book me to speak, hire me for sales team training, or apply for The Inner Circle. Real responses, no auto-responder.',
}

export default function Contact() {
  return (
    <>
      <section style={{ padding: '100px 0 60px' }}>
        <div className="container">
          <span className="eyebrow" style={{ marginBottom: 28 }}>
            <span className="dot" />
            Get In Touch
          </span>
          <h1
            className="serif"
            style={{
              fontSize: 'clamp(44px, 6.5vw, 76px)',
              lineHeight: 1.0,
              letterSpacing: '-2px',
              fontWeight: 500,
              maxWidth: 880,
              margin: '24px 0 28px',
              color: 'var(--text)',
            }}
          >
            One inbox. Real responses.
          </h1>
          <p style={{ fontSize: 18, color: 'var(--text-2)', maxWidth: 720, lineHeight: 1.75 }}>
            Subscribe, apply, or send a real inquiry. Every message gets read by me. No auto-responder, no chatbot, no junior assistant filtering you out.
          </p>
        </div>
      </section>

      {/* ── FORM ── */}
      <section style={{ padding: '40px 0 80px' }}>
        <div className="container" style={{ maxWidth: 720 }}>
          <form
            action="https://formspree.io/f/REPLACE_WITH_REAL_FORM_ID"
            method="POST"
            className="card-elevated"
            style={{ padding: 36 }}
          >
            {/* Honeypot (anti-spam) */}
            <input type="text" name="_gotcha" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />

            {/* Topic — first, so the form feels relevant */}
            <FieldRow>
              <Field label="What's this about?" htmlFor="topic" required>
                <select id="topic" name="topic" defaultValue="newsletter" style={inputStyle} required>
                  <option value="newsletter">Subscribe me to the newsletter</option>
                  <option value="coaching-call">Apply for a 1:1 strategy call</option>
                  <option value="inner-circle">Apply for The Inner Circle</option>
                  <option value="speaking">Book me to speak at your event</option>
                  <option value="team-training">Sales team training (Zoom or in-person)</option>
                  <option value="business-audit">Business audit / consulting</option>
                  <option value="press">Press or podcast inquiry</option>
                  <option value="other">Other</option>
                </select>
              </Field>
            </FieldRow>

            <SectionDivider label="About you" />

            <FieldRow cols={2}>
              <Field label="Your name" htmlFor="name" required>
                <input id="name" name="name" type="text" required placeholder="Jon Doe" style={inputStyle} />
              </Field>
              <Field label="Email" htmlFor="email" required>
                <input id="email" name="email" type="email" required placeholder="jon@yourcompany.com" style={inputStyle} />
              </Field>
            </FieldRow>

            <FieldRow cols={2}>
              <Field label="Company / Organization" htmlFor="company">
                <input id="company" name="company" type="text" placeholder="Acme Inc." style={inputStyle} />
              </Field>
              <Field label="Your role" htmlFor="role">
                <input id="role" name="role" type="text" placeholder="CEO, VP Sales, Founder…" style={inputStyle} />
              </Field>
            </FieldRow>

            <FieldRow cols={2}>
              <Field label="Phone (optional)" htmlFor="phone">
                <input id="phone" name="phone" type="tel" placeholder="555-555-5555" style={inputStyle} />
              </Field>
              <Field label="Website / LinkedIn" htmlFor="website">
                <input id="website" name="website" type="url" placeholder="acme.com" style={inputStyle} />
              </Field>
            </FieldRow>

            <SectionDivider label="About the engagement" />

            <FieldRow cols={2}>
              <Field label="Team size" htmlFor="teamSize">
                <select id="teamSize" name="teamSize" defaultValue="" style={inputStyle}>
                  <option value="">Select</option>
                  <option value="solo">Just me</option>
                  <option value="2-10">2–10</option>
                  <option value="11-50">11–50</option>
                  <option value="51-200">51–200</option>
                  <option value="201-1000">201–1,000</option>
                  <option value="1000+">1,000+</option>
                </select>
              </Field>
              <Field label="Timeline" htmlFor="timeline">
                <select id="timeline" name="timeline" defaultValue="" style={inputStyle}>
                  <option value="">Select</option>
                  <option value="asap">ASAP / Urgent</option>
                  <option value="1-3-months">1–3 months</option>
                  <option value="3-6-months">3–6 months</option>
                  <option value="6-plus">6+ months</option>
                  <option value="exploring">Just exploring</option>
                </select>
              </Field>
            </FieldRow>

            <FieldRow>
              <Field label="Budget range (if applicable)" htmlFor="budget" hint="Skip this if you're subscribing to the newsletter or just exploring.">
                <select id="budget" name="budget" defaultValue="" style={inputStyle}>
                  <option value="">Select</option>
                  <option value="under-5k">Under $5K</option>
                  <option value="5k-25k">$5K – $25K</option>
                  <option value="25k-50k">$25K – $50K</option>
                  <option value="50k-100k">$50K – $100K</option>
                  <option value="100k-plus">$100K+</option>
                  <option value="not-applicable">Not applicable</option>
                </select>
              </Field>
            </FieldRow>

            <FieldRow>
              <Field
                label="Tell me what you're working on"
                htmlFor="message"
                required
                hint="The more specific you are, the faster I can help. What's the bottleneck? What have you already tried? What does a win look like in 90 days?"
              >
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  required
                  placeholder="I run a 40-person sales team in [vertical]. Our biggest bottleneck right now is closer ramp time — new reps take ~120 days to hit quota and 30% never get there. We've tried X and Y. I'd like a sharper diagnostic + a 90-day plan. Available to start within 30 days."
                  style={{ ...inputStyle, resize: 'vertical', fontFamily: 'inherit' }}
                />
              </Field>
            </FieldRow>

            <FieldRow>
              <Field label="How did you find me?" htmlFor="source">
                <select id="source" name="source" defaultValue="" style={inputStyle}>
                  <option value="">Select</option>
                  <option value="linkedin">LinkedIn</option>
                  <option value="instagram">Instagram</option>
                  <option value="youtube">YouTube</option>
                  <option value="podcast">Podcast appearance</option>
                  <option value="referral">Referral</option>
                  <option value="search">Google / search</option>
                  <option value="event">Live event</option>
                  <option value="other">Other</option>
                </select>
              </Field>
            </FieldRow>

            <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: 8 }}>
              Send
            </button>

            <p style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 18, textAlign: 'center', lineHeight: 1.6 }}>
              By submitting, you’re cool with me adding you to the newsletter. Unsubscribe anytime, every email has a link.
            </p>
          </form>

          {/* ── ALTERNATE CONTACT ── */}
          <div style={{ marginTop: 36, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 14 }}>
            <a href="https://www.skool.com/operators-academy-5634" target="_blank" rel="noopener noreferrer" className="card" style={{ textDecoration: 'none', color: 'inherit', padding: 22 }}>
              <div style={{ fontSize: 10, color: 'var(--accent)', fontWeight: 700, letterSpacing: 2.5, fontFamily: 'var(--display-sans)', marginBottom: 8, textTransform: 'uppercase' }}>Community</div>
              <div className="serif" style={{ fontWeight: 500, fontSize: 20, color: 'var(--text)', marginBottom: 6, letterSpacing: '-0.3px' }}>Operators Academy</div>
              <div style={{ fontSize: 12.5, color: 'var(--text-2)', lineHeight: 1.6 }}>Free Skool community. Frameworks + daily content.</div>
            </a>
            <a href="https://www.youtube.com/atonsworld" target="_blank" rel="noopener noreferrer" className="card" style={{ textDecoration: 'none', color: 'inherit', padding: 22 }}>
              <div style={{ fontSize: 10, color: 'var(--accent)', fontWeight: 700, letterSpacing: 2.5, fontFamily: 'var(--display-sans)', marginBottom: 8, textTransform: 'uppercase' }}>YouTube</div>
              <div className="serif" style={{ fontWeight: 500, fontSize: 20, color: 'var(--text)', marginBottom: 6, letterSpacing: '-0.3px' }}>Atonsworld</div>
              <div style={{ fontSize: 12.5, color: 'var(--text-2)', lineHeight: 1.6 }}>Long-form on operating, building, and the work.</div>
            </a>
            <a href="mailto:aton@frontpageagencyinc.com" className="card" style={{ textDecoration: 'none', color: 'inherit', padding: 22 }}>
              <div style={{ fontSize: 10, color: 'var(--accent)', fontWeight: 700, letterSpacing: 2.5, fontFamily: 'var(--display-sans)', marginBottom: 8, textTransform: 'uppercase' }}>Direct Email</div>
              <div className="serif" style={{ fontWeight: 500, fontSize: 17, color: 'var(--text)', marginBottom: 6, letterSpacing: '-0.3px', wordBreak: 'break-word' }}>aton@frontpageagencyinc.com</div>
              <div style={{ fontSize: 12.5, color: 'var(--text-2)', lineHeight: 1.6 }}>For partnerships, press, or anything urgent.</div>
            </a>
          </div>
        </div>
      </section>
    </>
  )
}

/* ── Helpers ── */

function FieldRow({ children, cols = 1 }: { children: React.ReactNode; cols?: 1 | 2 }) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: cols === 2 ? 'repeat(auto-fit, minmax(220px, 1fr))' : '1fr',
        gap: 18,
        marginBottom: 18,
      }}
    >
      {children}
    </div>
  )
}

function Field({
  label,
  htmlFor,
  required,
  hint,
  children,
}: {
  label: string
  htmlFor: string
  required?: boolean
  hint?: string
  children: React.ReactNode
}) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        style={{
          display: 'block',
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: 2,
          color: 'var(--text-3)',
          textTransform: 'uppercase',
          marginBottom: 8,
          fontFamily: 'var(--display-sans)',
        }}
      >
        {label}
        {required && <span style={{ color: 'var(--accent)', marginLeft: 4 }}>*</span>}
      </label>
      {children}
      {hint && (
        <div style={{ fontSize: 11.5, color: 'var(--text-3)', marginTop: 8, lineHeight: 1.55, fontStyle: 'italic' }}>
          {hint}
        </div>
      )}
    </div>
  )
}

function SectionDivider({ label }: { label: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 14, margin: '24px 0 20px' }}>
      <span
        style={{
          fontSize: 10,
          color: 'var(--accent)',
          fontWeight: 700,
          letterSpacing: 2.5,
          textTransform: 'uppercase',
          fontFamily: 'var(--display-sans)',
        }}
      >
        {label}
      </span>
      <div style={{ flex: 1, height: 1, background: 'var(--border-soft)' }} />
    </div>
  )
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  background: 'var(--bg-base)',
  border: '1px solid var(--border-card)',
  borderRadius: 10,
  padding: '14px 16px',
  fontSize: 15,
  color: 'var(--text)',
  fontFamily: 'var(--body)',
  outline: 'none',
}
