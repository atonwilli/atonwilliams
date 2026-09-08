import type { Metadata } from 'next'
import { getProPacks, getLibraryPack, checkoutEnabled } from '@/lib/pro'
import { BuyButton } from '@/components/BuyButton'

export const metadata: Metadata = { title: 'Operators Academy Pro', description: 'The Pro packs: the full SOPs, templates, drills, and prompts behind every free guide.' }

export default async function ProPage({ searchParams }: { searchParams: Promise<{ unavailable?: string }> }) {
  const { unavailable } = await searchParams
  const packs = getProPacks()
  const lib = getLibraryPack()
  const live = checkoutEnabled()
  return (
    <main>
      <section className="band">
        <div className="wrap">
          <span className="eyebrow">Operators Academy Pro</span>
          <h1>The free guide teaches it. <em>The Pro pack runs it.</em></h1>
          <p className="lead">Every free guide has a Pro pack behind it: the full SOP, the templates, the drills, and every prompt written out. Buy one, or take the whole library.</p>
          {unavailable && <p className="small" style={{ marginTop: 14 }}>Checkout is not open yet. Leave your details on the contact page and you will get the link first.</p>}
        </div>
      </section>

      <section className="library">
        <div className="wrap">
          <div className="pro-library reveal in">
            <div>
              <span className="chip">Best value</span>
              <h2>{lib.title}</h2>
              <p>{lib.tagline} That is ten SOPs, more than seventy prompts and templates, and eighty pages you can hand to a leader on Monday.</p>
            </div>
            <div className="pro-buy dark">
              <strong>${lib.price}</strong>
              <span className="small">against ${packs.reduce((s, p) => s + p.price, 0)} one at a time</span>
              <BuyButton sku="library" price={lib.price} label={`Get the whole library, $${lib.price}`} />
            </div>
          </div>

          <div className="pro-grid">
            {packs.map((p, i) => (
              <article className="pro-card" key={p.sku}>
                <div className="label-row" style={{ marginBottom: 6 }}>
                  <span className="tag-id">Pack {String(i + 1).padStart(2, '0')}</span>
                </div>
                <h3>{p.title.replace(', Pro', '')}</h3>
                <p>{p.tagline}</p>
                <ul>{p.includes.slice(0, 4).map((x) => <li key={x}>{x}</li>)}</ul>
                <div className="pro-card-foot">
                  <strong>${p.price}</strong>
                  <BuyButton sku={p.sku} price={p.price} label={`Get the pack`} variant="" />
                  <a className="textlink" href={`/guides/${p.guide}`}>Read the free guide</a>
                </div>
              </article>
            ))}
          </div>

          <div className="pro-terms">
            <h3>How it works</h3>
            <ul>
              <li>Pay once through Stripe. Card, Apple Pay, or Google Pay. No account to create.</li>
              <li>The download opens the moment payment clears, and the link is on your receipt so you can come back for it.</li>
              <li>Each pack is a zip: the PDF and every prompt and template as plain text, ready to paste into any AI tool.</li>
              <li>Licensed to you for use inside your own business. Not for resale or redistribution.</li>
              <li>If a pack is not what you expected, reply to your receipt within fourteen days and you get a refund. No form, no argument.</li>
            </ul>
            {!live && <p className="small">Checkout is opening shortly. <a href="/contact?topic=membership">Leave your details</a> and you will get the link first.</p>}
          </div>
        </div>
      </section>
    </main>
  )
}
