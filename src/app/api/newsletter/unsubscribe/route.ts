import { NextResponse } from 'next/server'
import { db, site } from '@/lib/newsletter'

export async function GET(req: Request) {
  const token = new URL(req.url).searchParams.get('token') || ''
  const client = db()
  if (client && token.length >= 20) {
    await client.from('newsletter_subscribers').update({ status: 'unsubscribed', unsubscribed_at: new Date().toISOString() }).eq('token', token)
  }
  return NextResponse.redirect(new URL('/newsletter/unsubscribed', site()), 303)
}
