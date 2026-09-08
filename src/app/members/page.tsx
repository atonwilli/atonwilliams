import type { Metadata } from 'next'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { readSession, getMember, isActive, includesAgents, nextCalls, callLabel, getMemberPosts, getRecordings, telegramConfigured, PRICES, SESSION_COOKIE } from '@/lib/members'
import { getProPacks, getAgents, getAgentBundle, getLibraryPack } from '@/lib/pro'
import { BuyButton } from '@/components/BuyButton'
import { formatDate } from '@/lib/content'

export const metadata: Metadata = { title: 'Members area', robots: { index: false } }
export const dynamic = 'force-dynamic'

export default async function MembersArea({ searchParams }: { searchParams: Promise<{ telegram?: string; billing?: string }> }) {
  const { telegram, billing } = await searchParams
  const email = readSession((await cookies()).get(SESSION_COOKIE)?.value)
  const member = email ? await getMember(email) : null
  if (!isActive(member)) redirect('/members/login')
  const agentsIncluded = includesAgents(member)
  const calls = nextCalls(3)
  const posts = getMemberPosts()
  const recordings = getRecordings()
  const packs = getProPacks()
  const agents = getAgents()
  const team = getAgentBundle()
  const lib = getLibraryPack()
  const memberAgentPrice = (p: number) => Math.round(p * (1 - PRICES.agentDiscount))
  const tgReady = await telegramConfigured()

  return (
    <main>
      <section className="band">
        <div className="wrap">
          <span className="eyebrow">Operators Academy Pro</span>
          <h1>{member.name ? `Welcome back, ${member.name.split(' ')[0]}.` : 'Welcome back.'}</h1>
          <p className="lead">{member.plan === 'annual' ? 'Annual member' : 'Monthly member'}{member.founding ? ', founding rate' : ''}{member.status === 'past_due' ? '. Your last payment did not go through, update your card below to keep access.' : '.'} Next live call: {callLabel(calls[0])}.</p>
          <div className="button-row">
            {tgReady
              ? <form action="/api/members/telegram" method="POST"><button className="button peach" type="submit">{member.telegram_joined_at ? 'Open the Telegram room' : 'Join the Telegram room'}</button></form>
              : <span className="chip warn">Telegram room opening shortly</span>}
            <form action="/api/members/billing" method="POST"><button className="button secondary" type="submit">Manage billing</button></form>
            <a className="button secondary" href="/api/members/logout">Sign out</a>
          </div>
          {telegram === 'soon' && <p className="small" style={{ marginTop: 12 }}>The Telegram invite is not ready yet. It will appear here the moment the room opens.</p>}
          {member.telegram_invite && !member.telegram_joined_at && (
            <p className="small" style={{ marginTop: 12 }}>
              Phone would not open it? Your invite is <a href={member.telegram_invite}>{member.telegram_invite}</a>. Paste it into any Telegram chat and tap it there, or <a href={`https://web.telegram.org/k/#?tgaddr=${encodeURIComponent(`tg://join?invite=${member.telegram_invite.split('/+')[1] || ''}`)}`} target="_blank" rel="noopener">open it in Telegram Web</a>. It is a single-use link made for you.
            </p>
          )}
          {billing === 'unavailable' && <p className="small" style={{ marginTop: 12 }}>Billing could not open. Reply to your receipt and it gets handled by hand.</p>}
        </div>
      </section>

      <section className="library">
        <div className="wrap">
          <div className="section-head"><div><span className="eyebrow">Live</span><h2>Next calls</h2></div><p className="lead">Same slot every month. The Zoom link is posted in the room the morning of the call. Guests are announced in the room ahead of time.</p></div>
          <ul className="steps-list">{calls.map((d) => <li key={d.toISOString()}>{callLabel(d)}</li>)}</ul>
        </div>
      </section>

      <section className="library" style={{ paddingTop: 0 }} id="recordings">
        <div className="wrap">
          <div className="section-head"><div><span className="eyebrow">Recordings</span><h2>Every call and every guest.</h2></div></div>
          {recordings.length === 0 ? <p className="small">The first recording lands here after the first call.</p> : (
            <div className="pro-grid">{recordings.map((r) => (
              <article className="pro-card" key={r.url}><span className="tag-id">{r.kind === 'guest' ? `Guest: ${r.guest || ''}` : r.kind === 'build' ? 'AI build' : 'Live with Aton'}</span><h3>{r.title}</h3><p className="small">{formatDate(r.date)}</p>{r.notes && <p>{r.notes}</p>}<div className="pro-card-foot"><a className="button secondary" href={r.url} target="_blank" rel="noopener">Watch</a></div></article>
            ))}</div>
          )}
        </div>
      </section>

      <section className="library" style={{ paddingTop: 0 }} id="packs">
        <div className="wrap">
          <div className="section-head"><div><span className="eyebrow">Downloads</span><h2>Every Pro pack.</h2></div><p className="lead">Yours while you are a member. Each zip has the build prompt, the PDF, and every template as plain text.</p></div>
          <div className="button-row" style={{ marginBottom: 18 }}><a className="button" href={`/api/members/download?sku=${lib.sku}`}>Download the whole library</a></div>
          <div className="pro-grid">{packs.map((p) => (
            <article className="pro-card" key={p.sku}><span className="tag-id">{p.pillar}</span><h3>{p.title}</h3><p>{p.tagline}</p><div className="pro-card-foot"><a className="button secondary" href={`/api/members/download?sku=${p.sku}`}>Download</a></div></article>
          ))}</div>
        </div>
      </section>

      <section className="library" style={{ paddingTop: 0 }} id="agents">
        <div className="wrap">
          <div className="section-head"><div><span className="eyebrow">AI agents</span><h2>{agentsIncluded ? 'Included with your annual membership.' : 'Yours at the member price.'}</h2></div><p className="lead">{agentsIncluded ? 'Every agent, and every one released while you are a member.' : `Monthly members buy agents at ${Math.round(PRICES.agentDiscount * 100)} percent off. Switch to annual from billing and they are all included.`}</p></div>
          {agentsIncluded && <div className="button-row" style={{ marginBottom: 18 }}><a className="button" href={`/api/members/download?sku=${team.sku}`}>Download the whole team</a></div>}
          <div className="pro-grid">{agents.map((a) => (
            <article className="pro-card agent" key={a.sku}><span className="tag-id">AI agent</span><h3>{a.title}</h3><p>{a.tagline}</p><div className="pro-card-foot">{agentsIncluded ? <a className="button secondary" href={`/api/members/download?sku=${a.sku}`}>Download</a> : <BuyButton sku={a.sku} price={memberAgentPrice(a.price)} label={`Get it, $${memberAgentPrice(a.price)} (was $${a.price})`} variant="secondary" />}</div></article>
          ))}</div>
        </div>
      </section>

      <section className="library" style={{ paddingTop: 0 }} id="notes">
        <div className="wrap">
          <div className="section-head"><div><span className="eyebrow">Inside Pro</span><h2>The members notes.</h2></div></div>
          {posts.length === 0 ? <p className="small">The first members note goes out the Monday after launch.</p> : posts.map((p) => (
            <article className="note-card" key={p.slug} style={{ marginBottom: 22 }}><span className="small">{formatDate(p.date)}</span><h3>{p.title}</h3><div className="note-body" dangerouslySetInnerHTML={{ __html: p.body }} /></article>
          ))}
        </div>
      </section>
    </main>
  )
}
