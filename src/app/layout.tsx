import type { Metadata } from 'next'
import './globals.css'
import { Nav } from '@/components/Nav'
import { Footer } from '@/components/Footer'
import { FloatingMotion } from '@/components/FloatingMotion'

export const metadata: Metadata = {
  title: 'Aton Williams · Operator. Coach. Builder.',
  description:
    "Aton Williams is the founder of Front Page Agency and Front Page Intelligence. Operator-first coaching for direct sales orgs, recruiting machines, and the operators building them.",
  openGraph: {
    title: 'Aton Williams · Operator. Coach. Builder.',
    description:
      'The operator-coach for direct sales orgs and the operators building them.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght,SOFT@9..144,300;9..144,400;9..144,500;9..144,600;9..144,700;9..144,800&family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <FloatingMotion />
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
