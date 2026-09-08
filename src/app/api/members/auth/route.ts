import { NextResponse } from 'next/server'
import { site } from '@/lib/newsletter'
import { consumeLogin, makeSession, SESSION_COOKIE, SESSION_MAX_AGE } from '@/lib/members'

/** The magic link lands here: one-time token becomes a signed session cookie. */
export async function GET(req: Request) {
  const token = new URL(req.url).searchParams.get('token') || ''
  const email = await consumeLogin(token)
  if (!email) return NextResponse.redirect(new URL('/members/login?error=link', site()), 303)
  const res = NextResponse.redirect(new URL('/members', site()), 303)
  res.cookies.set(SESSION_COOKIE, makeSession(email), { httpOnly: true, secure: true, sameSite: 'lax', path: '/', maxAge: SESSION_MAX_AGE })
  return res
}
