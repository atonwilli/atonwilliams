import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

/**
 * Telegram webhook diagnostics and (re)registration, using the bot token from the server env
 * so the token never has to be pasted into a URL by hand. Cron-secret protected.
 *   GET ?secret=...            -> getWebhookInfo (pending updates, last error)
 *   GET ?secret=...&apply=1    -> setWebhook with the full allowed_updates list, then getWebhookInfo
 */
export async function GET(req: Request) {
  const url = new URL(req.url)
  const secret = process.env.CRON_SECRET
  if (!secret || url.searchParams.get('secret') !== secret) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const token = process.env.TELEGRAM_BOT_TOKEN
  if (!token) return NextResponse.json({ error: 'TELEGRAM_BOT_TOKEN not set' }, { status: 503 })
  const api = `https://api.telegram.org/bot${token}`
  const site = process.env.SITE_URL || 'https://atonwilliams.com'
  let applied: unknown = null
  if (url.searchParams.get('apply') === '1') {
    const res = await fetch(`${api}/setWebhook`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        url: `${site}/api/telegram/webhook`,
        secret_token: process.env.TELEGRAM_WEBHOOK_SECRET || undefined,
        allowed_updates: ['message', 'channel_post', 'chat_member', 'my_chat_member'],
        drop_pending_updates: false,
      }),
    })
    applied = await res.json()
  }
  const info = await (await fetch(`${api}/getWebhookInfo`)).json()
  const me = await (await fetch(`${api}/getMe`)).json()
  return NextResponse.json({ bot: me?.result?.username || null, webhook: info?.result || info, applied, secret_env_set: Boolean(process.env.TELEGRAM_WEBHOOK_SECRET) })
}
