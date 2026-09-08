import type { Metadata } from 'next'
import { CALENDARS, getTopic } from '@/lib/routing'

export const metadata: Metadata = { title: 'Received', robots: { index: false } }
export const dynamic = 'force-dynamic'

export default async function Thanks({ searchParams }: { searchParams: Promise<{ route?: string; topic?: string; to?: string; from?: string; confirm?: string; confirmed?: string; already?: string; pending?: string; error?: string }> }) {
  const { route = '', topic = '', to = '', from = '', confirm = '', confirmed = '', already = '', pending = '', error = '' } = await searchParams
  const t = getTopic(topic)
  const redirect = getTopic(to)
  const cal = t ? CALENDARS[t.calendar] : undefined
  if (from === 'newsletter') {
    return (
      <main className="page"><div className="wrap thanks"><div>
        <span className="eyebrow">Newsletter</span>
        {confirmed ? <h1>You are on the list.</h1> : already ? <h1>You were already on the list.</h1> : error ? <h1>That did not go through.</h1> : pending ? <h1>Received.</h1> : <h1>Check your inbox.</h1>}
        <p className="lead">{confirmed ? 'The next note lands in your inbox on Friday. Until then, the guides are open.' : already ? 'Nothing to do. The next note lands on Friday.' : error === 'email' ? 'That email address did not look right. Try again from the home page.' : error === 'token' ? 'That confirmation link is not valid any more. Sign up again from the home page and use the newest email.' : error ? 'Something went wrong on our side. Try again in a minute, or write to aton@frontpageintelligence.com.' : pending ? 'You are noted. The confirmation email goes out as soon as the list is live.' : 'One email is on its way with a single button. Click it and you are on the list. If it is not there in a minute, check the promotions or spam folder.'}</p>
        <div className="button-row" style={{ justifyContent: 'center' }}><a className="button" href="/guides">Browse the free guides</a></div>
      </div></div></main>
    )
  }
  return (
    <main className="page">
      <div className="wrap thanks">
        <div>
          <span className="eyebrow">{t ? t.label : 'Received'}</span>
          {route === 'qualified' && (
            <>
              <h1>Received. Next: pick a time.</h1>
              <p className="lead">{cal ? 'Book the call now, then fill in the short briefing on the confirmation so the time is spent on your situation, not on catching up.' : 'Our team reaches out first to confirm the details, then you get the booking link for the consultation and a short briefing to fill in before it. Usually within one business day.'}</p>
              <div className="button-row" style={{ justifyContent: 'center' }}>
                {cal && <a className="button peach" href={cal}>Book the call</a>}
                {t && <a className="button secondary" href={t.resource.href}>{t.resource.label}</a>}
              </div>
            </>
          )}
          {route === 'nurture' && (
            <>
              <h1>Received. Here is the right first step.</h1>
              <p className="lead">{redirect ? `${t ? t.label : 'That engagement'} is for operations further along than the numbers you shared. The right first step is ${redirect.label.toLowerCase()}, and a person will reply with how it works. Nothing is lost.` : 'A person will reply with the right first step for where you are. In the meantime, the resource below is yours.'}</p>
              <div className="button-row" style={{ justifyContent: 'center' }}>
                {t && <a className="button peach" href={t.resource.href}>{t.resource.label}</a>}
                {redirect && <a className="button secondary" href={`/contact?topic=${redirect.key}`}>Ask about {redirect.label.toLowerCase()}</a>}
                <a className="button secondary" href="https://www.skool.com/operators-academy-5634">Join the free community</a>
              </div>
            </>
          )}
          {(route === 'human' || !route) && (
            <>
              <h1>It is in my inbox.</h1>
              <p className="lead">A person reads every one of these. You will hear back directly, usually within one business day, with next steps or an honest no.</p>
              <div className="button-row" style={{ justifyContent: 'center' }}>
                {t ? <a className="button peach" href={t.resource.href}>{t.resource.label}</a> : <a className="button" href="https://www.skool.com/operators-academy-5634">Join the free community</a>}
                <a className="button secondary" href="/guides">Read a guide while you wait</a>
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  )
}
