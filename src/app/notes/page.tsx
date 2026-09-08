import type { Metadata } from 'next'
import { getNotes, formatDate } from '@/lib/content'

export const revalidate = 3600
export const metadata: Metadata = { title: 'Notes', description: 'Notes from Aton Williams on leadership, operations, sales, and recruitment.' }

export default function Notes() {
  const notes = getNotes()
  return (
    <main>
      <section className="band mint">
        <div className="wrap">
          <span className="eyebrow">Notes from the floor</span>
          <h1>Short essays on how <em>the operation actually runs.</em></h1>
          <p className="lead">Leadership, operations, sales, and recruitment. Written from the floor, not about it.</p>
        </div>
      </section>
      <section className="library">
        <div className="wrap">
          <div className="notes-list">
            {notes.map((n) => (
              <a key={n.slug} href={`/notes/${n.slug}`}>
                <small>{formatDate(n.date)} &middot; {n.readTime}</small>
                <span><b>{n.title}</b><p>{n.teaser}</p></span>
                <em>{n.tag}</em>
              </a>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
