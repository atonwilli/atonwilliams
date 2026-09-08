import type { Metadata } from 'next'
import { getProPacks, getLibraryPack, getAgents, getAgentBundle, checkoutEnabled } from '@/lib/pro'
import { PILLARS, SUBS } from '@/lib/content'
import { BuyButton } from '@/components/BuyButton'
import { Price } from '@/components/Price'

export const metadata: Metadata = { title: 'Pro packs and AI agents', description: 'AI agents that run a job in your business, and Pro packs that build the system behind every free guide. One payment each, yours forever.' }

export default async function ProPage({ searchParams }: { searchParams: Promise<{ unavailable?: string }> }) {
  const { unavailable } = await searchParams
  const packs = getProPacks()
  const lib = getLibraryPack()
  const agents = getAgents()
  const team = getAgentBundle()
  const live = checkoutEnabled()
  return (
    <main>
      <section className="band">
        <div className="wrap">
          <span className="eyebrow">Operators Academy Pro</span>
          <h1>Agents that do the job. <em>Packs that build the system.</em></h1>
          <p className="lead">Five AI agents that run in your own Claude Code: a co-founder, two media buyers, an email strategist, and a creative director, each with memory that compounds. And a Pro pack behind every free guide, across sales, AI, recruitment, leadership, and operations: paste one prompt, fill in the blanks, and it builds the whole system. One payment each. Yours forever.</p>
          {unavailable && <p className="small" style={{ marginTop: 14 }}>Checkout is not open yet. Leave your details on the contact page and you will get the link first.</p>}
          <div className="button-row"><a className="button" href="#agents">The agents</a><a className="button secondary" href="#packs">The Pro packs</a></div>
        </div>
      </section>

      <section className="library" id="agents">
        <div className="wrap">
          <div className="section-head">
            <div>
              <span className="eyebrow">AI agents</span>
              <h2>Not a prompt. A colleague with a job, a memory, and a lane.</h2>
            </div>
            <p className="lead">Each agent is a complete Claude Code package: the agent file, its skills, its memory files, an onboarding it runs by chat, and the rituals it keeps. Ten to thirty minutes to install. No API keys required.</p>
          </div>

          <div className="pro-library">
            <div>
              <span className="chip">The whole team</span>
              <h2>{team.title}</h2>
              <p>{team.tagline} The co-founder reads the other four agents' reports and hands you one brief.</p>
            </div>
            <div className="pro-buy dark">
              <Price price={team.price} compareAt={team.compareAt} />
              <span className="small">against ${agents.reduce((s, a) => s + a.price, 0)} one at a time</span>
              <BuyButton sku="agents-bundle" price={team.price} label={`Get all five agents, $${team.price}`} />
            </div>
          </div>

          <div className="pro-grid">
            {agents.map((a) => (
              <article className="pro-card agent" key={a.sku} id={a.sku}>
                <div className="label-row" style={{ marginBottom: 6 }}><span className="tag-id">AI agent</span></div>
                <h3>{a.title}</h3>
                <p>{a.tagline}</p>
                <span className="meta-label">What is inside</span>
                <ul>{a.includes.map((x) => <li key={x}>{x}</li>)}</ul>
                <span className="meta-label">Who it is for</span>
                <ul>{a.who?.map((x) => <li key={x}>{x}</li>)}</ul>
                <span className="meta-label">What you need</span>
                <p className="small">{a.needs}</p>
                <div className="pro-card-foot">
                  <Price price={a.price} compareAt={a.compareAt} size="md" />
                  <BuyButton sku={a.sku} price={a.price} label="Get the agent" variant="" />
                </div>
              </article>
            ))}
          </div>

          <div className="pro-terms">
            <h3>How the agents work</h3>
            <ul>
              <li>Unzip, open the folder in Claude Code, say "run onboarding." The agent interviews you and fills its memory files. First real work in the same session.</li>
              <li>Memory lives in plain files you own. Every decision, every outcome, every lesson is logged. Six months in, it knows your business better than a new hire would.</li>
              <li>The media buyers and the creative director work from your platform exports. If you want live pulls, the agent writes the script with your token and you approve it before it runs.</li>
              <li>Every agent stays in its lane and never spends money or sends anything. It recommends; you click.</li>
              <li>Works without Claude Code too: each package includes project instructions for Claude Projects or ChatGPT.</li>
              <li>Updates are free for a year. Reply to your receipt to get the latest version.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="library" id="packs" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="section-head">
            <div>
              <span className="eyebrow">Pro packs</span>
              <h2>Paste one prompt. It builds the system.</h2>
            </div>
            <p className="lead">Every Pro pack is a build prompt with blanks for your business. Fill them in, answer its questions, and it produces the whole system in your words: the SOP, the templates, the drills, the prompts. The PDF explains the method behind it.</p>
          </div>

          <div className="pro-library">
            <div>
              <span className="chip">Best value</span>
              <h2>{lib.title}</h2>
              <p>{lib.tagline} A build prompt, a PDF, and every prompt as plain text, for each one.</p>
            </div>
            <div className="pro-buy dark">
              <Price price={lib.price} compareAt={lib.compareAt} />
              <span className="small">against ${packs.reduce((s, p) => s + p.price, 0)} one at a time</span>
              <BuyButton sku="library" price={lib.price} label={`Get the whole library, $${lib.price}`} />
            </div>
          </div>

          {PILLARS.map((pl) => {
            const mine = packs.filter((p) => p.pillar === pl.key)
            if (!mine.length) return null
            return (
              <div className="pillar-section" key={pl.key} id={`packs-${pl.key}`}>
                <div className="pillar-head"><h2>{pl.label}</h2><p>{pl.blurb}</p></div>
                <div className="pro-grid">
                  {mine.map((p) => (
                    <article className="pro-card" key={p.sku}>
                      <div className="label-row" style={{ marginBottom: 6 }}>
                        <span className="tag-id">Pack {packs.indexOf(p) + 1 < 10 ? '0' : ''}{packs.indexOf(p) + 1}</span>
                        <span className="meta">{SUBS[p.sub || ''] || pl.label}</span>
                      </div>
                      <h3>{p.title.replace(', Pro', '')}</h3>
                      <p>{p.tagline}</p>
                      <ul>{p.includes.slice(0, 4).map((x) => <li key={x}>{x}</li>)}</ul>
                      <div className="pro-card-foot">
                        <Price price={p.price} compareAt={p.compareAt} size="md" />
                        <BuyButton sku={p.sku} price={p.price} label="Get the pack" variant="" />
                        <a className="textlink" href={`/guides/${p.guide}`}>Read the free guide</a>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            )
          })}

          <div className="pro-terms">
            <h3>How it works</h3>
            <ul>
              <li>Pay once through Stripe. Card, Apple Pay, or Google Pay. No account to create.</li>
              <li>The download opens the moment payment clears, and the link is on your receipt so you can come back for it.</li>
              <li>Each pack is a zip: the build prompt as a text file, the PDF, and every prompt and template as plain text, ready to paste into Claude or any AI tool.</li>
              <li>Licensed to you for use inside your own business. Not for resale or redistribution.</li>
              <li>If a pack or an agent is not what you expected, reply to your receipt within fourteen days and you get a refund. No form, no argument.</li>
            </ul>
            {!live && <p className="small">Checkout is opening shortly. <a href="/contact?topic=membership">Leave your details</a> and you will get the link first.</p>}
          </div>
        </div>
      </section>
    </main>
  )
}
