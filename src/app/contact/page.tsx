export const metadata = {
  title: 'Contact · Aton Williams',
  description: 'Subscribe to the newsletter, apply for coaching, or apply for the Inner Circle. Real responses, no auto-responder.',
}

export default function Contact() {
  return (
    <>
      <section style={{ padding: '100px 0 60px' }}>
        <div className="container">
          <span className="eyebrow" style={{ marginBottom: 28 }}>
            <span className="dot" />
            GET IN TOUCH
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
            One inbox. Real responses.
          </h1>
          <p style={{ fontSize: 18, color: 'var(--text-2)', maxWidth: 720, lineHeight: 1.65 }}>
            Subscribe to the newsletter, apply for coaching, or apply for the Inner Circle. Every message reads as a real one. No auto-responder.
          </p>
        </div>
      </section>

      {/* ── FORM ── */}
      <section style={{ padding: '40px 0 80px' }}>
        <div className="container" style={{ maxWidth: 680 }}>
          <form
            action="https://formspree.io/f/REPLACE_WITH_REAL_FORM_ID"
            method="POST"
            className="card-elevated"
            style={{ padding: 36 }}
          >
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 18, marginBottom: 18 }}>
              <div>
                <label htmlFor="name" style={{ display: 'block', fontSize: 11, fontWeight: 700, letterSpacing: 2, color: 'var(--text-3)', textTransform: 'uppercase', marginBottom: 8 }}>
                  Your name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  placeholder="Jon Doe"
                  style={inputStyle}
                />
              </div>
              <div>
                <label htmlFor="email" style={{ display: 'block', fontSize: 11, fontWeight: 700, letterSpacing: 2, color: 'var(--text-3)', textTransform: 'uppercase', marginBottom: 8 }}>
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="jon@yourcompany.com"
                  style={inputStyle}
                />
              </div>
            </div>

            <div style={{ marginBottom: 18 }}>
              <label htmlFor="topic" style={{ display: 'block', fontSize: 11, fontWeight: 700, letterSpacing: 2, color: 'var(--text-3)', textTransform: 'uppercase', marginBottom: 8 }}>
                What's this about?
              </label>
              <select id="topic" name="topic" defaultValue="newsletter" style={inputStyle}>
                <option value="newsletter">Just subscribe me to the newsletter</option>
                <option value="coaching-call">Apply for a 1:1 coaching call</option>
                <option value="inner-circle">Apply for the Inner Circle</option>
                <option value="mesa">MESA white-label / enterprise inquiry</option>
                <option value="press">Press, podcast, or speaking inquiry</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div style={{ marginBottom: 24 }}>
              <label htmlFor="message" style={{ display: 'block', fontSize: 11, fontWeight: 700, letterSpacing: 2, color: 'var(--text-3)', textTransform: 'uppercase', marginBottom: 8 }}>
                Tell me what you're working on
              </label>
              <textarea
                id="message"
                name="message"
                rows={6}
                placeholder="What's the bottleneck right now? What have you tried? Skip the small talk."
                style={{ ...inputStyle, resize: 'vertical', fontFamily: 'inherit' }}
              />
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
              Send →
            </button>

            <p style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 18, textAlign: 'center', lineHeight: 1.6 }}>
              By submitting, you're cool with me adding you to the newsletter. Unsubscribe anytime, every email has a link.
            </p>
          </form>

          {/* ── ALTERNATE CONTACT ── */}
          <div style={{ marginTop: 36, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 14 }}>
            <a href="https://www.skool.com/operators-academy-5634" target="_blank" rel="noopener noreferrer" className="card" style={{ textDecoration: 'none', color: 'inherit', padding: 22 }}>
              <div style={{ fontSize: 10, color: 'var(--accent)', fontWeight: 700, letterSpacing: 3, fontFamily: 'var(--display)', marginBottom: 8 }}>JOIN COMMUNITY</div>
              <div style={{ fontFamily: 'var(--display)', fontWeight: 700, fontSize: 17, color: 'var(--text)', marginBottom: 4 }}>Operators Academy</div>
              <div style={{ fontSize: 12.5, color: 'var(--text-2)' }}>Free Skool community → Frameworks + daily content</div>
            </a>
            <a href="https://mesa-crm.com" target="_blank" rel="noopener noreferrer" className="card" style={{ textDecoration: 'none', color: 'inherit', padding: 22 }}>
              <div style={{ fontSize: 10, color: 'var(--accent)', fontWeight: 700, letterSpacing: 3, fontFamily: 'var(--display)', marginBottom: 8 }}>SAAS PRODUCT</div>
              <div style={{ fontFamily: 'var(--display)', fontWeight: 700, fontSize: 17, color: 'var(--text)', marginBottom: 4 }}>MESA</div>
              <div style={{ fontSize: 12.5, color: 'var(--text-2)' }}>The operator OS. CRM, ATS, AI Coach.</div>
            </a>
            <a href="mailto:aton@frontpageagencyinc.com" className="card" style={{ textDecoration: 'none', color: 'inherit', padding: 22 }}>
              <div style={{ fontSize: 10, color: 'var(--accent)', fontWeight: 700, letterSpacing: 3, fontFamily: 'var(--display)', marginBottom: 8 }}>DIRECT EMAIL</div>
              <div style={{ fontFamily: 'var(--display)', fontWeight: 700, fontSize: 17, color: 'var(--text)', marginBottom: 4 }}>aton@frontpageagencyinc.com</div>
              <div style={{ fontSize: 12.5, color: 'var(--text-2)' }}>For partnerships, press, or anything urgent.</div>
            </a>
          </div>
        </div>
      </section>
    </>
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
