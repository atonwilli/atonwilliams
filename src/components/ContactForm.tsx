'use client'

import { Suspense, useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { AUTHORITY, REVENUE_BANDS, TEAM_SIZES, TIMELINES, TOPICS, decide, getTopic, topicsFor, type Track } from '@/lib/routing'

const FORM = 'https://formsubmit.co/aton@frontpageagencyinc.com'
const SITE = 'https://atonwilliams.com'

function Form() {
  const params = useSearchParams()
  const preset = params.get('topic') || ''
  const presetTopic = getTopic(preset)
  const [track, setTrack] = useState<Track | ''>(presetTopic ? (presetTopic.track === 'both' ? 'individual' : presetTopic.track) : '')
  const [topic, setTopic] = useState(presetTopic ? presetTopic.key : '')
  const [revenue, setRevenue] = useState<string>('')
  const [team, setTeam] = useState('')
  const [timeline, setTimeline] = useState<string>(TIMELINES[0])
  const [authority, setAuthority] = useState<string>(AUTHORITY[0])
  const [message, setMessage] = useState('')
  const [step, setStep] = useState(presetTopic ? 2 : 1)

  useEffect(() => {
    const t = getTopic(params.get('topic') || '')
    if (t) { setTopic(t.key); setTrack(t.track === 'both' ? 'individual' : t.track); setStep(2) }
  }, [params])

  const t = getTopic(topic)
  const topics = track ? topicsFor(track) : []
  const decision = useMemo(() => decide({ topic, revenue: revenue === '' ? undefined : Number(revenue), team, timeline, authority, message }), [topic, revenue, team, timeline, authority, message])
  const next = `${SITE}/thanks?route=${decision.route}&topic=${encodeURIComponent(topic)}${decision.redirectTo ? `&to=${decision.redirectTo}` : ''}`
  const needsRevenue = Boolean(t && t.minRevenue !== null) || track === 'organization'

  return (
    <>
      <div className="form-card">
        <form id="intake" action={FORM} method="POST">
          <input type="hidden" name="_subject" value={`New inquiry: ${t ? t.label : 'atonwilliams.com'}`} />
          <input type="hidden" name="_template" value="table" />
          <input type="hidden" name="_captcha" value="false" />
          <input type="hidden" name="_next" value={next} />
          <input type="hidden" name="route" value={decision.route} />
          <input type="hidden" name="route_reason" value={decision.reason} />
          <input type="hidden" name="track" value={track} />
          <input type="text" name="_honey" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />

          <ol className="steps-bar" aria-label="Progress">
            {['Who you are', 'What you need', 'About the business', 'The challenge'].map((s, i) => (
              <li key={s} className={step === i + 1 ? 'on' : step > i + 1 ? 'done' : ''}>{s}</li>
            ))}
          </ol>

          <fieldset className={step === 1 ? '' : 'collapsed'}>
            <legend>Who are you?</legend>
            <div className="choice-grid">
              {([['individual', 'An operator, leader, or rep', 'Building toward your own seat, or already in it.'], ['organization', 'An executive or an organization', 'Running an operation and ready to move on it.']] as const).map(([k, h, p]) => (
                <label key={k} className={`choice${track === k ? ' picked' : ''}`}>
                  <input type="radio" name="who" value={k} checked={track === k} onChange={() => { setTrack(k); setTopic(''); setStep(2) }} />
                  <b>{h}</b><span>{p}</span>
                </label>
              ))}
            </div>
          </fieldset>

          {track && (
            <fieldset className={step === 2 ? '' : step > 2 ? 'collapsed' : 'hidden-step'}>
              <legend>What would you like help with?</legend>
              <div className="choice-list">
                {topics.map((tp) => (
                  <label key={tp.key} className={`choice row${topic === tp.key ? ' picked' : ''}`}>
                    <input type="radio" name="topic" value={tp.key} checked={topic === tp.key} onChange={() => { setTopic(tp.key); setStep(3) }} />
                    <b>{tp.label}</b>
                  </label>
                ))}
              </div>
              {t && <p className="small note">{t.note}</p>}
            </fieldset>
          )}

          {topic && (
            <fieldset className={step === 3 ? '' : step > 3 ? 'collapsed' : 'hidden-step'}>
              <legend>About you and the business</legend>
              <div className="two">
                <label>Your name<input name="name" type="text" required autoComplete="name" /></label>
                <label>Email address<input name="email" type="email" required autoComplete="email" /></label>
              </div>
              <div className="two" style={{ marginTop: 18 }}>
                <label>Business name<input name="company" type="text" autoComplete="organization" /></label>
                <label>Your role<input name="role" type="text" autoComplete="organization-title" /></label>
              </div>
              <div className="two" style={{ marginTop: 18 }}>
                <label>Business website<input name="website" type="url" placeholder="https://" autoComplete="url" /></label>
                <label>Phone (optional)<input name="phone" type="tel" autoComplete="tel" /></label>
              </div>
              <div className="two" style={{ marginTop: 18 }}>
                <label>{needsRevenue ? 'Annual business revenue' : 'Annual business revenue (optional)'}
                  <select name="revenue" required={needsRevenue} value={revenue} onChange={(e) => setRevenue(e.target.value)}>
                    <option value="">Select</option>
                    {REVENUE_BANDS.map((b, i) => <option key={b} value={i}>{b}</option>)}
                  </select>
                </label>
                <label>Team size
                  <select name="team" value={team} onChange={(e) => setTeam(e.target.value)}>
                    <option value="">Select</option>
                    {TEAM_SIZES.map((s) => <option key={s}>{s}</option>)}
                  </select>
                </label>
              </div>
              <div className="two" style={{ marginTop: 18 }}>
                <label>When would you like to start?
                  <select name="timeline" value={timeline} onChange={(e) => setTimeline(e.target.value)}>
                    {TIMELINES.map((s) => <option key={s}>{s}</option>)}
                  </select>
                </label>
                <label>Your part in the decision
                  <select name="authority" value={authority} onChange={(e) => setAuthority(e.target.value)}>
                    {AUTHORITY.map((s) => <option key={s}>{s}</option>)}
                  </select>
                </label>
              </div>
              {t && t.minRevenue !== null && revenue !== '' && Number(revenue) < t.minRevenue && (
                <p className="small note warn">This engagement is for operations at {t.minRevenue === 5 ? '$1,000,000' : '$500,000'} or more in annual revenue. Send the form anyway: you will be pointed to the right first step, and nothing is lost.</p>
              )}
              <div className="button-row" style={{ marginTop: 18 }}>
                <button className="button secondary" type="button" onClick={() => setStep(4)}>Continue</button>
              </div>
            </fieldset>
          )}

          {topic && (
            <fieldset className={step === 4 ? '' : 'hidden-step'}>
              <legend>The challenge</legend>
              <label>{track === 'organization' ? 'What is the operation losing right now, and what would a successful next 90 days look like?' : 'What is your biggest challenge, and what would a successful next 90 days look like?'}
                <textarea name="message" rows={5} required value={message} onChange={(e) => setMessage(e.target.value)}></textarea>
              </label>
              <label>How did you find us?
                <select name="source" defaultValue="">
                  <option value="">Select</option>
                  {['Instagram', 'TikTok', 'YouTube', 'LinkedIn', 'Operators Academy', 'A podcast or talk', 'Referral', 'Search', 'Other'].map((s) => <option key={s}>{s}</option>)}
                </select>
              </label>
              <label className="consent"><input type="checkbox" name="newsletter" /><span>Also send me the notes and guides by email. Optional, unsubscribe anytime.</span></label>
              <p className="small">Read the <a href="/privacy">privacy policy</a> before sharing your information.</p>
              <button className="button" type="submit">Send inquiry</button>
              <p className="status">
                {decision.route === 'qualified' && 'You will get a booking link and a short briefing to fill in before the call.'}
                {decision.route === 'nurture' && 'You will get the right resource immediately, and a person will point you to the right first step.'}
                {decision.route === 'human' && 'A person reads this and replies within three business days.'}
              </p>
            </fieldset>
          )}
        </form>
      </div>
      {t && (
        <div className="aside" id="topic-aside">
          <p><strong>{t.label}</strong></p>
          <p>{t.note}</p>
          <p className="small" style={{ margin: '10px 0 0' }}>What happens next: your inquiry is classified, you get the promised resource right away, and you are either booked, sent the right first step, or read by a person. Every inquiry gets a reply.</p>
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
