import { NextResponse } from 'next/server'
import { noteEmail, confirmEmail, deliveryEmail, mailer, FROM } from '@/lib/newsletter'
import { getPack } from '@/lib/pro'
import { getNotes, formatDate } from '@/lib/content'

export const dynamic = 'force-dynamic'

/** Renders an email as HTML in the browser so the design can be reviewed. Protected by the cron secret. */
export async function GET(req: Request) {
  const url = new URL(req.url)
  const secret = process.env.CRON_SECRET
  if (!secret || url.searchParams.get('secret') !== secret) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const kind = url.searchParams.get('kind') || 'note'
  if (kind === 'confirm') return new NextResponse(confirmEmail('preview-token', 'sales').html, { headers: { 'Content-Type': 'text/html; charset=utf-8' } })
  if (kind === 'delivery') {
    const pack = getPack(url.searchParams.get('sku') || 'sales-debrief')
    if (!pack) return NextResponse.json({ error: 'No such pack' }, { status: 404 })
    const msg = deliveryEmail(pack, 'cs_preview_sample')
    const to = url.searchParams.get('send')
    if (to) {
      const resend = mailer()
      if (!resend) return NextResponse.json({ error: 'Mail not configured' }, { status: 503 })
      const note = '<p style="font-family:sans-serif;font-size:13px;color:#8a1f1f;background:#fdecec;padding:10px 14px;border-radius:10px;margin:0 0 16px">Sample only: this is what a buyer receives. The download button here points at a placeholder session, so it will not download anything. A real purchase carries a real link.</p>'
      const sent = await resend.emails.send({ from: FROM, to, subject: `[Sample] ${msg.subject}`, html: msg.html.replace('<p style="font-family', note + '<p style="font-family'), text: 'SAMPLE ONLY, the link below is a placeholder.\n\n' + msg.text })
      return NextResponse.json({ ok: !sent.error, to, id: sent.data?.id, error: sent.error })
    }
    return new NextResponse(msg.html, { headers: { 'Content-Type': 'text/html; charset=utf-8' } })
  }
  const slug = url.searchParams.get('slug')
  const note = slug ? getNotes().find((n) => n.slug === slug) : getNotes()[0]
  if (!note) return NextResponse.json({ error: 'No such note' }, { status: 404 })
  return new NextResponse(noteEmail(note, 'preview-token', formatDate(note.date)).html, { headers: { 'Content-Type': 'text/html; charset=utf-8' } })
}
