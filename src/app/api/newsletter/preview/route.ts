import { NextResponse } from 'next/server'
import { noteEmail, confirmEmail } from '@/lib/newsletter'
import { getNotes, formatDate } from '@/lib/content'

export const dynamic = 'force-dynamic'

/** Renders an email as HTML in the browser so the design can be reviewed. Protected by the cron secret. */
export async function GET(req: Request) {
  const url = new URL(req.url)
  const secret = process.env.CRON_SECRET
  if (!secret || url.searchParams.get('secret') !== secret) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const kind = url.searchParams.get('kind') || 'note'
  if (kind === 'confirm') return new NextResponse(confirmEmail('preview-token', 'sales').html, { headers: { 'Content-Type': 'text/html; charset=utf-8' } })
  const slug = url.searchParams.get('slug')
  const note = slug ? getNotes().find((n) => n.slug === slug) : getNotes()[0]
  if (!note) return NextResponse.json({ error: 'No such note' }, { status: 404 })
  return new NextResponse(noteEmail(note, 'preview-token', formatDate(note.date)).html, { headers: { 'Content-Type': 'text/html; charset=utf-8' } })
}
