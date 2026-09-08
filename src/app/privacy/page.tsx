import type { Metadata } from 'next'

export const metadata: Metadata = { title: "Privacy policy", description: "How atonwilliams.com handles your information." }

export default function Page() {
  return (
    <>
      <main className="page"><div className="wrap"><article className="article"><a className="backlink" href="/">Back to home</a><span className="eyebrow">Information</span><h1>Privacy policy</h1><div className="aside"><p>Policy draft for the website preview. The live policy will reflect the services and data practices confirmed before launch.</p></div><h2>This preview</h2><p>The newsletter and contact forms in this preview do not submit your details or create a subscriber. Membership and booking payments are not enabled.</p><h2>Contacting us</h2><p>If you email us, your email service and our email provider process the message. Please avoid sending passwords, payment card details, or sensitive personal information by email.</p><h2>External services</h2><p>Links to Instagram, TikTok, YouTube, LinkedIn, and Skool take you to external services with their own privacy policies.</p><h2>Privacy questions</h2><p>{"Email "}<a href="mailto:aton@frontpageintelligence.com">aton@frontpageintelligence.com</a>.</p></article></div></main>
    </>
  )
}
