/**
 * Lead routing: the rules behind the contact form and the thanks page.
 * Capture -> classify intent -> deliver the promised resource -> collect what is missing -> qualified, nurture, or human.
 * Edit the numbers here; the form and the thanks page read them.
 */
export type Track = 'individual' | 'organization'
export type Route = 'qualified' | 'nurture' | 'human'

export const REVENUE_BANDS = ['Pre-revenue', 'Under $100,000', '$100,000 to $250,000', '$250,000 to $500,000', '$500,000 to $1,000,000', '$1,000,000 to $3,000,000', '$3,000,000 to $10,000,000', '$10,000,000+'] as const
export const TEAM_SIZES = ['Just me', '2 to 10', '11 to 50', '51 to 200', '201+'] as const
export const TIMELINES = ['Exploring options', 'Within 30 days', '1 to 3 months', '3 to 6 months'] as const
export const AUTHORITY = ['I make this decision', 'I influence it', 'I am researching for someone else'] as const

/** Index in REVENUE_BANDS at or above which a band counts as $1M+ annual revenue. */
const MILLION = 5
const HALF_MILLION = 4

export type Topic = {
  key: string
  label: string
  track: Track | 'both'
  /** Minimum annual revenue band index to be qualified, or null for no floor. */
  minRevenue: number | null
  /** Shown under the form when this topic is chosen. */
  note: string
  /** The promised resource delivered on the thanks page, immediately. */
  resource: { label: string; href: string }
  /** Which calendar a qualified lead books on. */
  calendar: 'individual' | 'organization' | 'speaking' | 'none'
  /** True when every inquiry of this kind goes to a person first. */
  humanFirst?: boolean
}

export const TOPICS: Topic[] = [
  { key: 'strategy', label: 'Strategy session', track: 'individual', minRevenue: null, note: 'Ninety minutes online on one problem, with a written plan after. Credited toward anything larger within sixty days.', resource: { label: 'Read the sales debrief guide while you wait', href: '/guides/sales-debrief' }, calendar: 'individual' },
  { key: 'coaching', label: 'Private coaching', track: 'individual', minRevenue: null, note: 'A weekly call for leaders and owners working a plan. Three months to start. Applications are reviewed before anything is booked.', resource: { label: 'Read the closer’s standards', href: '/guides/closer-standards' }, calendar: 'individual' },
  { key: 'academy', label: 'Operators Academy in person', track: 'individual', minRevenue: null, note: 'Sessions run in Arizona, registered like a class. Leave your details and you get the next date and the seat price as soon as they are set.', resource: { label: 'Browse the free guides', href: '/guides' }, calendar: 'none' },
  { key: 'membership', label: 'Pro packs and membership', track: 'individual', minRevenue: null, note: 'The Pro packs and agents are available now. Membership opens later; you will hear first.', resource: { label: 'See the Pro packs and agents', href: '/pro' }, calendar: 'none' },
  { key: 'executive', label: 'Executive session, private day, or flyout', track: 'organization', minRevenue: MILLION, note: 'For executives running an operation at $1,000,000 or more in annual revenue. Below that, the strategy session or a team program is the right first step, and the form will route you there.', resource: { label: 'Run the free business audit first', href: 'https://frontpageintelligence.com/audit/' }, calendar: 'organization' },
  { key: 'advisory', label: 'Ninety-day advisory', track: 'organization', minRevenue: MILLION, note: 'Scheduled sessions with the executive and their leaders across ninety days. For operations at $1,000,000 or more in annual revenue.', resource: { label: 'Run the free business audit first', href: 'https://frontpageintelligence.com/audit/' }, calendar: 'organization' },
  { key: 'training', label: 'Team programs: sales, recruiting, leadership', track: 'organization', minRevenue: HALF_MILLION, note: 'Sales floor training, the recruiting system build, or leadership development for managers. Scoped after a call. Best fit from $500,000 in annual revenue or a team of ten or more.', resource: { label: 'Read the five seats guide', href: '/guides/five-seats' }, calendar: 'organization' },
  { key: 'inner-circle', label: 'Inner Circle', track: 'organization', minRevenue: MILLION, note: 'Eight seats. Executives and owners running operations at $1,000,000 or more. Application only, reviewed personally. Most applications are declined.', resource: { label: 'Read the notes from the floor', href: '/notes' }, calendar: 'none', humanFirst: true },
  { key: 'intelligence', label: 'Front Page Intelligence (a custom build)', track: 'organization', minRevenue: null, note: 'Custom builds, integrations, and app submissions are Front Page Intelligence engagements. Start with the free audit; a person from that team replies.', resource: { label: 'Run the free business audit', href: 'https://frontpageintelligence.com/audit/' }, calendar: 'none', humanFirst: true },
  { key: 'speaking', label: 'Speaking', track: 'organization', minRevenue: null, note: 'Tell us the event, the room, the date, and what you want the audience to leave with. Fee and terms in writing before anything is confirmed.', resource: { label: 'Download the speaker one-sheet', href: '/downloads/aton-williams-speaker-sheet.pdf' }, calendar: 'speaking' },
  { key: 'podcast', label: 'Podcast appearance', track: 'both', minRevenue: null, note: 'Podcast appearances are free. Share the show, the audience, and the topic.', resource: { label: 'See the speaking topics', href: '/speaking' }, calendar: 'speaking' },
  { key: 'partnerships', label: 'Partnerships and brand deals', track: 'both', minRevenue: null, note: 'Tell us about your organization and the collaboration you have in mind. A person replies.', resource: { label: 'See the speaking page', href: '/speaking' }, calendar: 'none', humanFirst: true },
  { key: 'other', label: 'Something else', track: 'both', minRevenue: null, note: 'Write what you need. A person reads it.', resource: { label: 'Browse the free guides', href: '/guides' }, calendar: 'none', humanFirst: true },
]

export function topicsFor(track: Track): Topic[] {
  return TOPICS.filter((t) => t.track === track || t.track === 'both')
}
export function getTopic(key: string): Topic | undefined {
  return TOPICS.find((t) => t.key === key)
}

/** Where a qualified lead books. Set these in the environment; until then the thanks page promises a link within one business day. */
export const CALENDARS: Record<string, string | undefined> = {
  individual: process.env.NEXT_PUBLIC_CAL_INDIVIDUAL,
  organization: process.env.NEXT_PUBLIC_CAL_ORGANIZATION,
  speaking: process.env.NEXT_PUBLIC_CAL_SPEAKING,
}

export type Answers = { topic: string; revenue?: number; team?: string; timeline?: string; authority?: string; message?: string }

/** The decision in the flowchart: qualified, nurture, or a human owner. */
export function decide(a: Answers): { route: Route; reason: string; redirectTo?: string } {
  const t = getTopic(a.topic)
  if (!t) return { route: 'human', reason: 'unknown topic' }
  if (t.humanFirst) return { route: 'human', reason: 'reviewed personally' }
  if ((a.message || '').length < 20) return { route: 'human', reason: 'not enough detail' }
  if (t.minRevenue !== null) {
    if (a.revenue === undefined) return { route: 'human', reason: 'revenue not given' }
    if (a.revenue < t.minRevenue) {
      const to = t.minRevenue === MILLION ? (a.revenue >= HALF_MILLION ? 'training' : 'strategy') : 'strategy'
      return { route: 'nurture', reason: 'below the revenue floor', redirectTo: to }
    }
  }
  if (a.authority === AUTHORITY[2]) return { route: 'nurture', reason: 'researching for someone else' }
  if (a.timeline === TIMELINES[3] && t.calendar !== 'none') return { route: 'nurture', reason: 'three to six months out' }
  if (t.calendar === 'none') return { route: 'human', reason: 'no calendar for this' }
  return { route: 'qualified', reason: 'meets the floor, decides, and is ready' }
}
