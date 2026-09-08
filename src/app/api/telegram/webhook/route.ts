import { NextResponse } from 'next/server'
import { db } from '@/lib/newsletter'

export const dynamic = 'force-dynamic'

/**
 * Telegram tells us when someone joins through an invite link. The link was named with the
 * member id, so the join is matched to the member and their Telegram user id is stored,
 * which is what lets a churned member be removed later.
 */
export async function POST(req: Request) {
  const expected = process.env.TELEGRAM_WEBHOOK_SECRET
  if (expected && req.headers.get('x-telegram-bot-api-secret-token') !== expected) return NextResponse.json({ error: 'forbidden' }, { status: 403 })
  const update = await req.json().catch(() => null) as { chat_member?: { new_chat_member?: { status?: string; user?: { id?: number } }; invite_link?: { name?: string } } } | null
  const cm = update?.chat_member
  const status = cm?.new_chat_member?.status
  const userId = cm?.new_chat_member?.user?.id
  const memberId = cm?.invite_link?.name
  const client = db()
  if (client && userId && memberId && (status === 'member' || status === 'administrator')) {
    await client.from('members').update({ telegram_user_id: userId, telegram_joined_at: new Date().toISOString() }).eq('id', memberId)
  }
  return NextResponse.json({ ok: true })
}
