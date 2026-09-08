import type { Metadata } from 'next'
import { CALENDARS, getTopic } from '@/lib/routing'

export const metadata: Metadata = { title: 'Received', robots: { index: false } }
export const dynamic = 'force-dynamic'

export default async function Thanks({ searchParams }: { searchParams: Promise<{ route?: string; topic?: string; to?: string; from?: string }> }) {
  const { route = '', topic = '', to = '', from = '' } = await searchParams
  const t = getTopic(topic)
  const redirect = getTopic(to)
  const cal = t ? CALENDARS[t.calendar] : undefined
  if (from === 'newsletter') {
    return (
      <main className="page"><div className="wrap thanks"><div>
        <span className="eyebrow">Newsletter</span>
        <h1>You are on the list.</h1>
        <p className="lead">The next note lands in your inbox on Friday. Until then, the guides are open.</p>
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
              <p className="lead">{cal ? 'Book the call now, then fill in the short briefing on the confirmation so the time is spent on your situation, not on catching up.' : 'You will get a booking link within one business day, with a short briefing to fill in before the call so the time is spent on your situation.'}</p>
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
