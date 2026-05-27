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
            Subscribe to the newsletter, apply for a strategy call, or apply for The Inner Circle. Every message gets read by me. No auto-responder.
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
                <option value="newsletter">Subscribe me to the newsletter</option>
                <option value="coaching-call">Apply for a 1:1 strategy call</option>
                <option value="inner-circle">Apply for The Inner Circle</option>
                <option value="speaking">Book me to speak at your event</option>
                <option value="team-training">Sales team training (Zoom or in-person)</option>
                <option value="business-audit">Business audit / consulting</option>
                <option value="press">Press or podcast inquiry</option>
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
