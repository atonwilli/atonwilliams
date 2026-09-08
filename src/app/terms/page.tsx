import type { Metadata } from 'next'

export const metadata: Metadata = { title: "Terms and conditions", description: "Terms for using atonwilliams.com." }

export default function Page() {
  return (
    <>
      <main className="page"><div className="wrap"><article className="article"><a className="backlink" href="/">Back to home</a><span className="eyebrow">Information</span><h1>Terms and conditions</h1><div className="aside"><p>Terms draft for the website preview. Paid service terms will be completed before checkout is enabled.</p></div><h2>Resources</h2><p>The guides provide educational information. Their examples do not promise particular business or financial results.</p><h2>Membership and coaching</h2><p>This preview does not accept payment or confirm bookings. Before purchasing, you will be shown the service scope, price, billing frequency, cancellation and refund terms, and any deposit requirements.</p><h2>External destinations</h2><p>Community and social links open services governed by their own terms.</p><h2>Questions</h2><p>{"Contact "}<a href="mailto:aton@frontpageintelligence.com">aton@frontpageintelligence.com</a>.</p></article></div></main>
    </>
  )
}
