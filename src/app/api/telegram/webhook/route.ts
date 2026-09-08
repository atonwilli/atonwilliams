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
  const update = await req.json().catch(() => null) as {
    chat_member?: { new_chat_member?: { status?: string; user?: { id?: number } }; invite_link?: { name?: string } }
    my_chat_member?: { chat?: { id?: number; title?: string; type?: string }; new_chat_member?: { status?: string } }
    message?: { chat?: { id?: number; title?: string; type?: string } }
    channel_post?: { chat?: { id?: number; title?: string; type?: string } }
  } | null
  const client = db()
  const mine = update?.my_chat_member
  if (client && mine?.chat?.id && mine.new_chat_member?.status && mine.new_chat_member.status !== 'left' && mine.new_chat_member.status !== 'kicked') {
    await client.from('telegram_chats').upsert({ chat_id: mine.chat.id, title: mine.chat.title || '', type: mine.chat.type || '', bot_status: mine.new_chat_member.status, added_at: new Date().toISOString() }, { onConflict: 'chat_id' })
  }
  // Any post in a group or channel the bot can see also registers that chat (belt to the braces above).
  const seen = update?.message?.chat || update?.channel_post?.chat
  if (client && seen?.id && seen.type && seen.type !== 'private') {
    await client.from('telegram_chats').upsert({ chat_id: seen.id, title: seen.title || '', type: seen.type, bot_status: 'seen', added_at: new Date().toISOString() }, { onConflict: 'chat_id' })
  }
  const cm = update?.chat_member
  const status = cm?.new_chat_member?.status
  const userId = cm?.new_chat_member?.user?.id
  const memberId = cm?.invite_link?.name
  if (client && userId && memberId && (status === 'member' || status === 'administrator')) {
    await client.from('members').update({ telegram_user_id: userId, telegram_joined_at: new Date().toISOString() }).eq('id', memberId)
  }
  return NextResponse.json({ ok: true })
}
