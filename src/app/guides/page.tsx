import type { Metadata } from 'next'
import { getGuides } from '@/lib/content'
import { LibraryFilters } from '@/components/LibraryFilters'

export const revalidate = 3600
export const metadata: Metadata = { title: 'Free guides', description: 'Sales frameworks and the AI methods behind the operation. Full lessons with a tool you can use the same day.' }

export default function Guides() {
  const guides = getGuides()
  return (
    <main>
      <section className="band">
        <div className="wrap">
          <span className="eyebrow">The free library</span>
          <h1>Put the ideas <em>to work.</em></h1>
          <p className="lead">Sales frameworks and the AI methods behind the operation. Each guide is a full lesson on the page with a tool you can use the same day. The deeper version of every guide is a Pro pack, <a className="textlink" href="/pro">available now</a>.</p>
        </div>
      </section>
      <section className="library">
        <div className="wrap">
          <LibraryFilters />
          <div className="grid">
            {guides.map((g) => (
              <a key={g.slug} className="card" data-topic={g.topicKey} data-keys={g.keys} href={`/guides/${g.slug}`}>
                <div>
                  <div className="label-row" style={{ marginBottom: 0 }}>
                    <span className="tag-id">Guide {g.num}</span>
                    <span className="meta">{g.topicLabel}</span>
                  </div>
                  <h2>{g.h1}</h2>
                  <p>{g.cardBlurb}</p>
                  <div className="kit-chips">{g.cardTags.map((t) => <span key={t}>{t}</span>)}</div>
                </div>
                <span className="go" aria-hidden="true">&rarr;</span>
              </a>
            ))}
          </div>
          <div className="empty" id="empty" hidden>
            <p>No guide matches that yet. Try a broader word, or ask for it in the community and it goes on the list.</p>
          </div>
        </div>
      </section>
    </main>
  )
}
