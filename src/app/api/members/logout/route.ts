import { NextResponse } from 'next/server'
import { site } from '@/lib/newsletter'
import { SESSION_COOKIE } from '@/lib/members'

export async function GET() {
  const res = NextResponse.redirect(new URL('/membership', site()), 303)
  res.cookies.set(SESSION_COOKIE, '', { httpOnly: true, secure: true, sameSite: 'lax', path: '/', maxAge: 0 })
  return res
}
