import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getNote, getNotes, formatDate } from '@/lib/content'

export const revalidate = 3600
export const dynamicParams = true

export function generateStaticParams() {
  return getNotes().map((n) => ({ slug: n.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const n = getNote(slug)
  return n ? { title: n.title, description: n.teaser, openGraph: { type: 'article', publishedTime: n.date } } : {}
}

export default async function NotePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const all = getNotes()
  const i = all.findIndex((n) => n.slug === slug)
  if (i === -1) notFound()
  const n = all[i]
  const newer = i > 0 ? all[i - 1] : null
  const older = i + 1 < all.length ? all[i + 1] : null
  return (
    <main>
      <section className="band mint">
        <div className="wrap">
          <a className="backlink" href="/notes">&larr; All notes</a>
          <div className="label-row">
            <span className="tag-id">{n.tag}</span>
            <span className="meta" style={{ color: 'var(--green-3)' }}>{formatDate(n.date)} &middot; {n.readTime}</span>
          </div>
          <h1>{n.title}</h1>
          <p className="lead">{n.teaser}</p>
        </div>
      </section>
      <article className="article">
        <div className="wrap">
          <div className="note-body" dangerouslySetInnerHTML={{ __html: n.body }} />
          <div className="note-nav">
            {older ? <a href={`/notes/${older.slug}`}><small>Older</small><b>{older.title}</b></a> : <a href="/notes"><small>Older</small><b>All notes</b></a>}
            {newer ? <a className="next" href={`/notes/${newer.slug}`}><small>Newer</small><b>{newer.title}</b></a> : <a className="next" href="/notes"><small>Newer</small><b>This is the latest note</b></a>}
          </div>
          <aside className="offer" style={{ maxWidth: 720 }}>
            <span className="eyebrow">Newsletter</span>
            <h2>New notes land here first, then in the newsletter.</h2>
            <p>Short notes on leadership, operations, sales, and recruitment. Pick the interest you want when you sign up.</p>
            <a className="button peach" href="/#newsletter">Get the notes by email</a>
          </aside>
        </div>
      </article>
    </main>
  )
}
