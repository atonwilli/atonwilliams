import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Members sign in', robots: { index: false } }

export default async function MembersLogin({ searchParams }: { searchParams: Promise<{ sent?: string; error?: string }> }) {
  const { sent, error } = await searchParams
  return (
    <main className="page">
      <div className="wrap thanks">
        <div>
          <span className="eyebrow">Operators Academy Pro</span>
          {sent ? (
            <>
              <h1>Check your email.</h1>
              <p className="lead">If that address belongs to an active member, a sign-in link is on its way from notes@atonwilliams.com. It works for thirty minutes. Nothing arrived? Check spam or promotions, drag it to your inbox so the next one lands right, then try again.</p>
            </>
          ) : (
            <>
              <h1>Sign in to the members area.</h1>
              <p className="lead">No password. Enter the email you joined with and a one-click link comes to your inbox.</p>
              {error === 'link' && <p className="small">That link has expired or was already used. Request a fresh one below.</p>}
              {error === 'email' && <p className="small">That did not look like an email address.</p>}
              <form action="/api/members/login" method="POST" className="form-card" style={{ maxWidth: 440, margin: '22px auto 0' }}>
                <label className="small" htmlFor="email">Email</label>
                <input id="email" name="email" type="email" required placeholder="you@company.com" style={{ width: '100%', padding: '14px 16px', fontSize: 16, borderRadius: 12, border: '1px solid var(--line)', margin: '6px 0 14px' }} />
                <button className="button peach" type="submit">Send my sign-in link</button>
              </form>
              <p className="small" style={{ marginTop: 22 }}>Not a member yet? <a href="/membership">See the membership</a>.</p>
            </>
          )}
        </div>
      </div>
    </main>
  )
}
