import type { Metadata } from 'next'
import { ContactForm } from '@/components/ContactForm'

export const metadata: Metadata = { title: 'Contact', description: 'Tell Aton about your business. Every inquiry gets a reply with next steps or a better resource.' }

export default function Contact() {
  return (
    <main className="page"><div className="wrap page-grid"><div className="page-intro"><a className="backlink" href="/">Back to home</a><span className="eyebrow">Contact</span><h1 id="page-title">Tell me about your business.</h1><p className="lead" id="page-lead">Share where you are today and what you want help changing. Every inquiry gets a reply with next steps or a better resource.</p><p className="small" style={{marginTop: "22px"}}>{"Prefer email? Write to "}<a href="mailto:aton@frontpageintelligence.com">aton@frontpageintelligence.com</a>{". For support from Alex, our AI business assistant, email "}<a href="mailto:alex@frontpageintelligence.com">alex@frontpageintelligence.com</a>.</p></div><ContactForm /></div></main>
  )
}
