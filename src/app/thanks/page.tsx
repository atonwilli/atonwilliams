import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Received', robots: { index: false } }

export default function Thanks() {
  return (
    <main className="page">
      <div className="wrap thanks">
        <div>
          <span className="eyebrow">Received</span>
          <h1>It is in my inbox.</h1>
          <p className="lead">I read every one. You will hear back directly, usually within one business day, with next steps or an honest no.</p>
          <div className="button-row" style={{ justifyContent: 'center' }}>
            <a className="button" href="https://www.skool.com/operators-academy-5634">Join the free community</a>
            <a className="button secondary" href="/guides">Read a guide while you wait</a>
          </div>
        </div>
      </div>
    </main>
  )
}
