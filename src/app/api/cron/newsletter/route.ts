import { NextResponse } from 'next/server'
import { db, mailer, FROM, noteEmail, segmentsForTag, type Interest } from '@/lib/newsletter'
import { getNotes, formatDate, today } from '@/lib/content'

export const dynamic = 'force-dynamic'
export const maxDuration = 300

/**
 * Friday send. Vercel calls this on the schedule in vercel.json with the CRON_SECRET.
 * It finds notes dated in the last seven days that have not been sent to a segment yet, and sends each to the matching active subscribers.
 * Safe to run twice: newsletter_sends records every (note, segment) pair.
 */
export async function GET(req: Request) {
  const auth = req.headers.get('authorization') || ''
  const url = new URL(req.url)
  const secret = process.env.CRON_SECRET
  if (!secret || (auth !== `Bearer ${secret}` && url.searchParams.get('secret') !== secret)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const dryRun = url.searchParams.get('dry') === '1'

  const client = db()
  const resend = mailer()
  if (!client || !resend) return NextResponse.json({ error: 'Newsletter is not configured' }, { status: 503 })

  const t = today()
  const weekAgo = new Date(new Date(t + 'T12:00:00Z').getTime() - 7 * 86400000).toISOString().slice(0, 10)
  const notes = getNotes().filter((n) => n.date > weekAgo && n.date <= t)
  const { data: sent } = await client.from('newsletter_sends').select('note_slug, segment')
  const done = new Set((sent || []).map((s) => `${s.note_slug}:${s.segment}`))
  const results: { note: string; segment: string; count: number }[] = []

  for (const note of notes) {
    // Each subscriber gets a note at most once even if they are in several matching segments.
    const segments = segmentsForTag(note.tag) as Interest[]
    const pending = segments.filter((s) => !done.has(`${note.slug}:${s}`))
    if (!pending.length) continue
    const { data: subs } = await client.from('newsletter_subscribers').select('email, token, interests').eq('status', 'active').overlaps('interests', pending)
    const list = subs || []
    if (!dryRun && list.length) {
      const msgBase = noteEmail(note, 'TOKEN', formatDate(note.date))
      for (let i = 0; i < list.length; i += 100) {
        const batch = list.slice(i, i + 100).map((s) => ({
          from: FROM, to: s.email, subject: msgBase.subject,
          html: noteEmail(note, s.token, formatDate(note.date)).html,
          text: noteEmail(note, s.token, formatDate(note.date)).text,
          headers: { 'List-Unsubscribe': `<${process.env.SITE_URL || 'https://atonwilliams.com'}/api/newsletter/unsubscribe?token=${s.token}>` },
        }))
        await resend.batch.send(batch)
      }
      await client.from('newsletter_subscribers').update({ last_sent_at: new Date().toISOString() }).in('email', list.map((s) => s.email))
      for (const s of pending) await client.from('newsletter_sends').insert({ note_slug: note.slug, segment: s, sent_count: list.length })
    }
    for (const s of pending) results.push({ note: note.slug, segment: s, count: list.length })
  }
  return NextResponse.json({ ok: true, dryRun, window: [weekAgo, t], results })
}
