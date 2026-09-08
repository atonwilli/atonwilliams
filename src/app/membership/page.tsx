import type { Metadata } from 'next'
import { PRICES, foundingOpen, nextCalls, callLabel } from '@/lib/members'
import { getAgents, checkoutEnabled } from '@/lib/pro'

export const metadata: Metadata = { title: 'Operators Academy Pro', description: 'The membership: a private room with Aton and the moderators, a live call and a guest every month, every Pro pack, and the agents. Monthly or annual, cancel any time.' }
export const dynamic = 'force-dynamic'

export default async function MembershipPage({ searchParams }: { searchParams: Promise<{ unavailable?: string }> }) {
  const { unavailable } = await searchParams
  const founding = await foundingOpen()
  const live = checkoutEnabled()
  const calls = nextCalls(3)
  const agentCount = getAgents().length
  const monthly = founding ? PRICES.founding : PRICES.monthly
  const annual = founding ? PRICES.foundingAnnual : PRICES.annual
  const Join = ({ plan, label }: { plan: 'monthly' | 'annual'; label: string }) => live
    ? <form action="/api/checkout/membership" method="POST"><input type="hidden" name="plan" value={plan} /><button className="button peach" type="submit">{label}</button></form>
    : <a className="button peach" href="/contact?topic=membership">{label}</a>

  return (
    <main>
      <section className="band">
        <div className="wrap">
          <span className="eyebrow">Operators Academy Pro</span>
          <h1>The room, the calls, <em>and everything we build.</em></h1>
          <p className="lead">A private Telegram room with Aton and the moderators every day. One live call with Aton and one guest speaker every month, recorded. Every Pro pack the day it ships. Annual members get every AI agent too. Cancel any time.</p>
          {unavailable && <p className="small" style={{ marginTop: 14 }}>Checkout did not open. Try again in a minute, or use the contact page and you will get the link directly.</p>}
          <div className="button-row"><a className="button" href="#plans">See the plans</a><a className="button secondary" href="#inside">What is inside</a></div>
        </div>
      </section>

      <section className="library" id="inside">
        <div className="wrap">
          <div className="section-head">
            <div><span className="eyebrow">What is inside</span><h2>Constant company. Monthly depth. A library that compounds.</h2></div>
            <p className="lead">Most memberships are a calendar you feel guilty about. This one is a room you open when you need it, two live hours a month worth showing up for, and a shelf that fills every week.</p>
          </div>
          <div className="pro-grid">
            <article className="pro-card"><span className="tag-id">The room</span><h3>Telegram, every day</h3><p>Wins, objectives, the guides as they ship, and straight answers. Aton is in it. Two moderators keep it useful. No pitching, no spam, members only.</p></article>
            <article className="pro-card"><span className="tag-id">Live with Aton</span><h3>One call a month</h3><p>The last Sunday of every month at noon Arizona. Leadership, sales, recruiting, operations, and whatever the room needs that month. Bring the real situation. Recorded the same day.</p></article>
            <article className="pro-card"><span className="tag-id">Guests</span><h3>One guest a month</h3><p>Operators, sales leaders, social media people, and bigger names as the room grows. Booked and announced ahead so you can plan to be there. Recorded.</p></article>
            <article className="pro-card"><span className="tag-id">The shelf</span><h3>Every Pro pack</h3><p>Every pack in the library, current and future, the day it ships: the build prompts, the SOPs, the scripts, the drills. Download what you need when you need it.</p></article>
            <article className="pro-card"><span className="tag-id">The agents</span><h3>{agentCount} AI agents</h3><p>Annual members download every agent and every one released while they are a member. Monthly members buy them at the member price, {Math.round(PRICES.agentDiscount * 100)} percent off.</p></article>
            <article className="pro-card"><span className="tag-id">Inside Pro</span><h3>The members note</h3><p>A short note to members each week: what shipped, what is coming, the next call, one prompt to run. Separate from the public Friday note.</p></article>
          </div>
        </div>
      </section>

      <section className="library" id="plans" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="section-head">
            <div><span className="eyebrow">Plans</span><h2>Two ways in.</h2></div>
            <p className="lead">{founding ? `Founding rate for the first ${PRICES.foundingCap} members, locked for as long as you stay.` : 'Cancel any time from the members page. Access runs to the end of the period you paid for.'}</p>
          </div>
          <div className="pro-grid">
            <article className="pro-card">
              <span className="tag-id">Monthly</span>
              <h3>${monthly} a month</h3>
              {founding && <p className="small">Founding rate. ${PRICES.monthly} a month after the founding seats are gone.</p>}
              <ul><li>The Telegram room</li><li>The monthly call and the monthly guest, recorded</li><li>Every Pro pack, current and future</li><li>AI agents at {Math.round(PRICES.agentDiscount * 100)} percent off</li><li>The weekly members note</li></ul>
              <div className="pro-card-foot"><Join plan="monthly" label={`Join monthly, $${monthly}`} /></div>
            </article>
            <article className="pro-card agent">
              <span className="tag-id">Annual</span>
              <h3>${annual} a year</h3>
              <p className="small">{founding ? `Founding rate. $${PRICES.annual} a year after the founding seats are gone. ` : ''}Twelve months at the monthly rate would be ${PRICES.annualList}.</p>
              <ul><li>Everything in monthly</li><li>Every AI agent, and every agent released while you are a member</li><li>Priority on strategy session and coaching waitlists</li></ul>
              <div className="pro-card-foot"><Join plan="annual" label={`Join annual, $${annual}`} /></div>
            </article>
          </div>
          <p className="small" style={{ marginTop: 18 }}>Card, Apple Pay, or Google Pay through Stripe. No refunds on membership payments; cancel any time and access runs to the end of the paid period. If the room is not what this page describes, reply to your receipt within 48 hours and the first payment is refunded. Full terms on the <a href="/service-terms#academy">service terms</a> page.</p>
        </div>
      </section>

      <section className="library" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="section-head">
            <div><span className="eyebrow">Next live calls</span><h2>Put them on the calendar.</h2></div>
            <p className="lead">Same slot every month so nobody has to check. Guests are announced in the room ahead of time.</p>
          </div>
          <ul className="steps-list">{calls.map((d) => <li key={d.toISOString()}>{callLabel(d)}</li>)}</ul>
          <p className="small" style={{ marginTop: 14 }}>Already a member? <a href="/members/login">Sign in</a>.</p>
        </div>
      </section>
    </main>
  )
}
