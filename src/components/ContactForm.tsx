'use client'

import { Suspense, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'

const topics: Record<string, [string, string]> = {
  coaching: ['Private coaching', 'Applications are reviewed before anything is booked. Engagement options, scope, and deposit terms are shown in writing before you commit.'],
  training: ['Sales team training', 'Tell us about the team, the product, and where conversations are breaking down. We reply with a recommended format.'],
  consulting: ['Business consulting', 'Describe the operational challenge and what a good 90 days looks like. We reply with next steps or a better resource.'],
  intelligence: ['Front Page Intelligence', 'Inquiries about the technology are routed to the Front Page Intelligence team.'],
  academy: ['Operators Academy in person', 'Sessions run in Arizona, registered like a class. Leave your details and you get the next date and the seat price as soon as they are set.'],
  membership: ['Membership', 'Operators Academy Pro is being finalized. Leave your details and we will share pricing and what is included when they are approved.'],
  'inner-circle': ['Inner Circle', 'A small group of owners and operators with direct access to Aton. Applications are reviewed personally, and most people are pointed to coaching or the community first.'],
  partnerships: ['Partnerships', 'Tell us about your organization and the collaboration you have in mind.'],
}

const FORM = 'https://formsubmit.co/aton@frontpageagencyinc.com'

function Form() {
  const params = useSearchParams()
  const initial = params.get('topic') || 'coaching'
  const [topic, setTopic] = useState(topics[initial] ? initial : 'coaching')
  useEffect(() => { const t = params.get('topic'); if (t && topics[t]) setTopic(t) }, [params])
  const aside = topics[topic]
  return (
    <>
      <div className="form-card">
        <form id="intake" action={FORM} method="POST">
          <input type="hidden" name="_subject" value="New inquiry: atonwilliams.com" />
          <input type="hidden" name="_template" value="table" />
          <input type="hidden" name="_captcha" value="false" />
          <input type="hidden" name="_next" value="https://atonwilliams.com/thanks" />
          <input type="text" name="_honey" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />
          <label>What would you like help with?
            <select name="topic" id="topic" value={topic} onChange={(e) => setTopic(e.target.value)}>
              <option value="coaching">Private coaching</option>
              <option value="training">Sales team training</option>
              <option value="consulting">Business consulting</option>
              <option value="intelligence">Front Page Intelligence</option>
              <option value="academy">Operators Academy in person</option>
              <option value="membership">Membership</option>
              <option value="inner-circle">Inner Circle</option>
              <option value="partnerships">Partnerships</option>
              <option value="other">Other</option>
            </select>
          </label>
<fieldset><legend>About you</legend><div className="two"><label>Your name<input name="name" type="text" required autoComplete="name" /></label><label>Email address<input name="email" type="email" required autoComplete="email" /></label></div><div className="two" style={{marginTop: "18px"}}><label>Business name<input name="company" type="text" autoComplete="organization" /></label><label>Your role<input name="role" type="text" autoComplete="organization-title" /></label></div><div className="two" style={{marginTop: "18px"}}><label>Business website<input name="website" type="url" placeholder="https://" autoComplete="url" /></label><label>Phone (optional)<input name="phone" type="tel" autoComplete="tel" /></label></div></fieldset><fieldset><legend>About the business</legend><div className="two"><label>{"Current business stage "}<select name="stage"><option value="">Select</option><option>Preparing to launch</option><option>Operating independently</option><option>Building a team</option><option>Scaling an established business</option></select></label><label>{"Team size "}<select name="team"><option value="">Select</option><option>Just me</option><option>2 to 10</option><option>11 to 50</option><option>51 to 200</option><option>201+</option></select></label></div><div className="two" style={{marginTop: "18px"}}><label>{"Average monthly business revenue (USD) "}<select name="revenue"><option>Prefer not to say</option><option>Pre-revenue</option><option>Under $10,000</option><option>$10,000 to $50,000</option><option>$50,000 to $100,000</option><option>$100,000 to $500,000</option><option>$500,000+</option></select></label><label>{"When would you like to start? "}<select name="timeline"><option>Exploring options</option><option>Within 30 days</option><option>1 to 3 months</option><option>3 to 6 months</option></select></label></div></fieldset><label>{"What is your biggest challenge, and what would a successful next 90 days look like? "}<textarea name="message" rows={5} required></textarea></label><label>{"How did you find us? "}<select name="source"><option value="">Select</option><option>Instagram</option><option>TikTok</option><option>YouTube</option><option>LinkedIn</option><option>Operators Academy</option><option>Referral</option><option>Search</option><option>Other</option></select></label><label className="consent"><input type="checkbox" name="newsletter" /><span>I would also like relevant newsletter updates. Optional, unsubscribe anytime.</span></label><p className="small">{"Read the "}<a href="/privacy">privacy policy</a>{" before sharing your information."}</p><button className="button" type="submit">Send inquiry</button><p className="status">Every inquiry gets a reply with next steps or a better resource.</p>
        </form>
      </div>
      {aside && (
        <div className="aside" id="topic-aside">
          <p><strong>{aside[0]}</strong></p>
          <p>{aside[1]}</p>
        </div>
      )}
    </>
  )
}

export function ContactForm() {
  return (
    <Suspense fallback={<div className="form-card" />}>
      <Form />
    </Suspense>
  )
}
