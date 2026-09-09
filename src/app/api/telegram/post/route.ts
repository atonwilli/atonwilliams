import { NextResponse } from 'next/server'
import { db } from '@/lib/newsletter'

export const dynamic = 'force-dynamic'

/**
 * Posts to the free channel or the Pro room through the bot. Cron-secret protected.
 * Body: { chat: 'channel' | 'group', text: string (Telegram HTML), pin?: boolean, silent?: boolean }
 * Used by Ghost and the Saturday task so lessons land in the channel without opening Telegram.
 */
export async function POST(req: Request) {
  const secret = process.env.CRON_SECRET
  const auth = (req.headers.get('authorization') || '').replace(/^Bearer\s+/i, '')
  if (!secret || auth !== secret) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const token = process.env.TELEGRAM_BOT_TOKEN
  const client = db()
  if (!token || !client) return NextResponse.json({ error: 'Not configured' }, { status: 503 })
  const body = await req.json().catch(() => null) as { chat?: string; text?: string; pin?: boolean; silent?: boolean } | null
  if (!body?.text) return NextResponse.json({ error: 'text required' }, { status: 400 })
  const want = body.chat === 'group' ? ['supergroup', 'group'] : ['channel']
  const { data } = await client.from('telegram_chats').select('chat_id, type').order('added_at', { ascending: false })
  const target = (data || []).find((c) => want.includes(c.type))
  if (!target) return NextResponse.json({ error: `No ${body.chat || 'channel'} registered` }, { status: 404 })
  const api = `https://api.telegram.org/bot${token}`
  const sent = await (await fetch(`${api}/sendMessage`, {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: target.chat_id, text: body.text, parse_mode: 'HTML', disable_web_page_preview: false, disable_notification: Boolean(body.silent) }),
  })).json()
  let pinned: unknown = null
  if (sent?.ok && body.pin) {
    pinned = await (await fetch(`${api}/pinChatMessage`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ chat_id: target.chat_id, message_id: sent.result.message_id, disable_notification: true }) })).json()
  }
  return NextResponse.json({ ok: Boolean(sent?.ok), message_id: sent?.result?.message_id, error: sent?.ok ? null : sent?.description, pinned })
}
