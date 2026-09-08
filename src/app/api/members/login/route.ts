import { NextResponse } from 'next/server'
import { mailer, FROM, site } from '@/lib/newsletter'
import { getMember, isActive, loginToken, loginEmail } from '@/lib/members'

/** Sends a sign-in link to an active member. Always answers the same way, so the form cannot be used to test emails. */
export async function POST(req: Request) {
  const form = await req.formData()
  const email = String(form.get('email') || '').trim().toLowerCase()
  const back = NextResponse.redirect(new URL('/members/login?sent=1', site()), 303)
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return NextResponse.redirect(new URL('/members/login?error=email', site()), 303)
  const member = await getMember(email)
  if (!isActive(member)) return back
  const token = await loginToken(email)
  const resend = mailer()
  if (token && resend) {
    const msg = loginEmail(token)
    await resend.emails.send({ from: FROM, to: email, subject: msg.subject, html: msg.html, text: msg.text })
  }
  return back
}
