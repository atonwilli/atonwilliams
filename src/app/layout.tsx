import type { Metadata } from 'next'
import './globals.css'
import { Nav, type NavProduct } from '@/components/Nav'
import { getAgents, getAgentBundle, getLibraryPack } from '@/lib/pro'
import { Footer } from '@/components/Footer'
import { BgDepth } from '@/components/BgDepth'
import { SiteFx } from '@/components/SiteFx'

export const metadata: Metadata = {
  metadataBase: new URL('https://atonwilliams.com'),
  title: { default: 'Aton Williams | Leadership, operations, sales, and recruitment', template: '%s | Aton Williams' },
  description:
    'Aton Williams builds and runs sales organizations, develops the leaders inside them, and operates Front Page Intelligence, the AI business infrastructure his companies run on. Free guides, a free community, and coaching by application.',
  openGraph: { type: 'website', siteName: 'Aton Williams' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const team = getAgentBundle()
  const lib = getLibraryPack()
  const products: NavProduct[] = [
    ...getAgents().map((a) => ({ href: `/pro#${a.sku}`, label: a.short || a.title, price: a.price, group: 'Agents' })),
    { href: '/pro#agents', label: team.title, price: team.price, group: 'Bundles' },
    { href: '/pro#packs', label: lib.title, price: lib.price, group: 'Bundles' },
    { href: '/#work', label: 'Operators Academy Pro', priceLabel: 'from $49/mo', group: 'Membership' },
  ]
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,500;0,9..144,600;1,9..144,500&family=Inter:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <BgDepth />
        <Nav products={products} />
        {children}
        <Footer />
        <SiteFx />
      </body>
    </html>
  )
}
