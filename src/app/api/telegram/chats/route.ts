import { NextResponse } from 'next/server'
import { db } from '@/lib/newsletter'

/** Lists the chats the bot has been added to (so the group and channel ids never have to be typed by hand). Cron-secret protected. */
export async function GET(req: Request) {
  const url = new URL(req.url)
  const secret = process.env.CRON_SECRET
  if (!secret || url.searchParams.get('secret') !== secret) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const client = db()
  if (!client) return NextResponse.json({ error: 'Not configured' }, { status: 503 })
  const { data } = await client.from('telegram_chats').select('*').order('added_at', { ascending: false })
  return NextResponse.json({ chats: data || [], bot_token_set: Boolean(process.env.TELEGRAM_BOT_TOKEN), group_env: process.env.TELEGRAM_GROUP_ID || null })
}
