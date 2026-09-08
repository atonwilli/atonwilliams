import type { Metadata } from 'next'
export const metadata: Metadata = { title: 'Unsubscribed', robots: { index: false } }
export default function Unsubscribed() {
  return (
    <main className="page"><div className="wrap thanks"><div>
      <span className="eyebrow">Newsletter</span>
      <h1>You are off the list.</h1>
      <p className="lead">No more emails. The notes and guides stay free on the site whenever you want them.</p>
      <div className="button-row" style={{ justifyContent: 'center' }}><a className="button secondary" href="/notes">Read the notes</a></div>
    </div></div></main>
  )
}
