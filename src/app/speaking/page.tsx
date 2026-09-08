import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Speaking',
  description: 'Keynotes, workshops, virtual sessions, panels, and podcast appearances with Aton Williams on leadership, operations, sales, recruitment, and running a business on AI infrastructure.',
}

const topics = [
  ['Leadership', 'Nobody rises to low expectations.', 'Standards, gates, and belief: how a leader raises the bar and holds it when it costs something, without turning into a lecture. For managers who inherited a team and owners who built one.'],
  ['Operations', 'The number you look at daily.', 'Leading indicators versus lagging ones, one number per role, and a scoreboard the floor polices itself. How an operation runs on Tuesday, not just in the monthly report.'],
  ['Sales', 'Coach the conversation, not the result.', 'The ten-minute debrief, the pitch framework, and the objection diagnostic that turned reps with no sales background into leaders. Built for sales floors, usable by anyone who sells.'],
  ['Recruitment', 'Hire for hunger. Train for skill.', 'The job post that filters, the interview question that finds hunger, and the second week that decides whether a hire stays. How to keep a floor full without lowering the bar.'],
  ['AI business infrastructure', 'I gave my business a memory.', 'What it actually looks like to run companies on AI: the brain file, skills, build loops, and the human at the boundary. No hype, no demos of tools we do not use. The story of Front Page Intelligence, run in the open.'],
]

const formats = [
  ['Keynote', '45 to 60 minutes', 'One topic, told through the operation. A talk the room can act on Monday, with a one-page takeaway for every seat.'],
  ['Half-day workshop', 'Three to four hours', 'One pillar, worked live with your leaders: the debrief system, the recruiting funnel, the operating scoreboard, or the AI setup. Everyone leaves with something built.'],
  ['Virtual keynote or town hall', '30 to 60 minutes', 'The keynote for a distributed team or an internal all-hands, with a live Q and A.'],
  ['Panel or fireside', '20 to 45 minutes', 'A conversation, not a pitch. Best when the moderator wants direct answers about building and running teams.'],
  ['Podcast appearance', 'Your format', 'Free. Aton says yes to most shows where the listeners run or lead something. The show provides the recording and one clip.'],
]

export default function Speaking() {
  return (
    <main>
      <section className="band mint">
        <div className="wrap">
          <span className="eyebrow">Speaking and podcasts</span>
          <h1>Talks from someone <em>who still runs the thing.</em></h1>
          <p className="lead">Aton Williams builds and runs sales organizations, develops the leaders inside them, and operates Front Page Intelligence, the AI business infrastructure his companies run on. Every talk comes from work that is happening this week, not a slide deck from a decade ago.</p>
          <div className="button-row">
            <a className="button" href="/contact?topic=speaking">Book Aton to speak</a>
            <a className="button secondary" href="/contact?topic=podcast">Invite Aton on your podcast</a>
            <a className="button secondary" href="/downloads/aton-williams-speaker-sheet.pdf" download>Speaker one-sheet (PDF)</a>
          </div>
        </div>
      </section>

      <section className="library">
        <div className="wrap">
          <div className="section-head">
            <div>
              <span className="eyebrow">Topics</span>
              <h2>Five talks. One per pillar, plus the one everyone asks about.</h2>
            </div>
            <p className="lead">Each can be a keynote, a workshop, or a conversation. Titles can be tuned to the room. The substance does not change.</p>
          </div>
          <div className="pro-grid">
            {topics.map(([pillar, title, blurb]) => (
              <article className="pro-card" key={title}>
                <span className="meta-label">{pillar}</span>
                <h3>{title}</h3>
                <p>{blurb}</p>
              </article>
            ))}
          </div>

          <div className="section-head" style={{ marginTop: 64 }}>
            <div>
              <span className="eyebrow">Formats</span>
              <h2>Pick the shape that fits the room.</h2>
            </div>
            <p className="lead">Fees are shared in writing after a short fit conversation. Podcast appearances are free.</p>
          </div>
          <div className="notes-list">
            {formats.map(([name, length, blurb]) => (
              <div className="format-row" key={name}>
                <small>{length}</small>
                <span><b>{name}</b><p>{blurb}</p></span>
              </div>
            ))}
          </div>

          <div className="pro-terms" style={{ marginTop: 48 }}>
            <h3>What organizers get</h3>
            <ul>
              <li>A prep call so the talk fits the room, the audience, and the outcome you want.</li>
              <li>A one-page takeaway for every attendee, and the free guide that matches the topic.</li>
              <li>A fit answer within three business days, and the fee and terms in writing before anything is confirmed.</li>
              <li>Recording for internal use. Short clips with credit are welcome.</li>
              <li>Aton stays for the questions. The best part of every talk happens after it.</li>
            </ul>
          </div>

          <aside className="offer" style={{ marginTop: 48 }}>
            <span className="eyebrow">Book</span>
            <h2>Tell us about the room.</h2>
            <p>The date, the audience, and what you want them to leave with. That is enough to start.</p>
            <div className="button-row">
              <a className="button peach" href="/contact?topic=speaking">Book Aton to speak</a>
              <a className="button secondary" style={{ borderColor: 'rgba(255,250,240,.4)', color: 'var(--cream)' }} href="/contact?topic=podcast">Podcast invitation</a>
            </div>
          </aside>
        </div>
      </section>
    </main>
  )
}
