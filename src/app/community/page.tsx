import type { Metadata } from 'next'
import { freeChannelLink } from '@/lib/members'
import { Newsletter } from '@/components/Newsletter'

export const metadata: Metadata = { title: 'Operators Academy, free', description: 'The free community: a Telegram channel with lessons, the guides as they release, cuts from the Pro calls, and the Friday note.' }
export const dynamic = 'force-dynamic'

export default async function CommunityPage() {
  const link = await freeChannelLink()
  return (
    <main>
      <section className="band">
        <div className="wrap">
          <span className="eyebrow">Operators Academy, free</span>
          <h1>Lessons on your phone. <em>Nothing to log into.</em></h1>
          <p className="lead">The free community is a Telegram channel. Short lessons through the week, every guide the day it releases, cuts from the Pro calls, and the Friday note. Read it, comment on it, and when you want the room and the calls, Pro is one step up.</p>
          <div className="button-row">
            {link ? <a className="button peach" href={link} target="_blank" rel="noopener">Join the free channel on Telegram</a> : <span className="chip warn">Channel opening shortly</span>}
            <a className="button secondary" href="/membership">See Operators Academy Pro</a>
          </div>
          {!link && <p className="small" style={{ marginTop: 14 }}>Join the newsletter below and you get the channel link the moment it opens.</p>}
        </div>
      </section>
      <section className="library">
        <div className="wrap">
          <div className="section-head"><div><span className="eyebrow">What lands in the channel</span><h2>Free means the lesson. Pro means the room.</h2></div></div>
          <div className="pro-grid">
            <article className="pro-card"><span className="tag-id">Lessons</span><h3>Short, through the week</h3><p>One idea at a time from the floor, the office, and the build: leadership, sales, recruiting, operations, and AI. Written to be used the same day.</p></article>
            <article className="pro-card"><span className="tag-id">Guides</span><h3>Every guide, the day it releases</h3><p>The free guides go to the channel first. What and why, in plain language, with the worksheet.</p></article>
            <article className="pro-card"><span className="tag-id">From Pro</span><h3>Cuts from the calls</h3><p>Edited pieces of the monthly live call and the guest sessions. The full recordings live inside Pro.</p></article>
          </div>
        </div>
      </section>
      <Newsletter />
    </main>
  )
}
