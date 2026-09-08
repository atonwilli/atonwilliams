import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { readSession, getMember, isActive, telegramInvite, SESSION_COOKIE } from '@/lib/members'

/** Hands an active member their single-use Telegram invite. */
export async function POST(req: Request) {
  const email = readSession((await cookies()).get(SESSION_COOKIE)?.value)
  const member = email ? await getMember(email) : null
  if (!isActive(member)) return NextResponse.redirect(new URL('/members/login', req.url), 303)
  const link = await telegramInvite(member)
  if (!link) return NextResponse.redirect(new URL('/members?telegram=soon', req.url), 303)
  return NextResponse.redirect(link, 303)
}
