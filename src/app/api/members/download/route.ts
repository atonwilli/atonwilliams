import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import fs from 'node:fs'
import path from 'node:path'
import { getPack, PRIVATE_DIR } from '@/lib/pro'
import { readSession, getMember, isActive, includesAgents, SESSION_COOKIE } from '@/lib/members'

/** Member downloads: every pack for any active member; agents only for annual members. */
export async function GET(req: Request) {
  const sku = new URL(req.url).searchParams.get('sku') || ''
  const email = readSession((await cookies()).get(SESSION_COOKIE)?.value)
  const member = email ? await getMember(email) : null
  if (!isActive(member)) return NextResponse.redirect(new URL('/members/login', req.url), 303)
  const pack = getPack(sku)
  if (!pack) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  const isAgent = pack.kind === 'agent' || pack.sku === 'agents-bundle'
  if (isAgent && !includesAgents(member)) return NextResponse.redirect(new URL('/members#agents', req.url), 303)
  const file = path.join(PRIVATE_DIR, pack.file)
  if (!fs.existsSync(file)) return NextResponse.json({ error: 'File missing' }, { status: 500 })
  const data = fs.readFileSync(file)
  return new NextResponse(new Uint8Array(data), {
    headers: { 'Content-Type': 'application/zip', 'Content-Disposition': `attachment; filename="${pack.file}"`, 'Content-Length': String(data.length), 'Cache-Control': 'private, no-store' },
  })
}
