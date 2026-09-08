import type { Metadata } from 'next'
import './globals.css'
import { Nav } from '@/components/Nav'
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
        <Nav />
        {children}
        <Footer />
        <SiteFx />
      </body>
    </html>
  )
}
