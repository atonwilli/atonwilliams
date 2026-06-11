import Link from 'next/link'
import { notFound } from 'next/navigation'

type Article = {
  slug: string
  date: string
  readTime: string
  title: string
  description: string
  tag: string
  body: React.ReactNode
}

const articles: Article[] = [
  {
    slug: 'why-the-90-day-rule-is-actually-real',
    date: '2026-05-22',
    readTime: '6 min',
    tag: 'Operator Playbook',
    title: 'Why the 90-day rule is actually real.',
    description:
      'Every operator who wrote the 90-day rule was either selling a book or had never built a team. Here is what 90 days actually means when you’re inside it.',
    body: (
      <>
        <p>
          Everyone has heard some version of the 90-day rule. Ninety days to build a habit. Ninety days to prove yourself in a new role. Ninety days before you’re allowed to quit. Most of the people writing about it were either selling a book or had never run a floor in their life.
        </p>
        <p>
          Here’s the uncomfortable part: <strong>they were accidentally right.</strong> The 90-day rule is real. It’s just real for completely different reasons than the ones in the books.
        </p>
        <h2>The rule isn’t about motivation. It’s about reps.</h2>
        <p>
          A new rep on a sales floor has a fixed number of conversations they need to be bad at before they get good. Nobody skips the line. Not the naturals, not the ones with ten years of experience somewhere else. The product is new, the objections are new, the rhythm is new. At real volume — full days, real doors, real pitches — that number of conversations takes about ninety days to burn through.
        </p>
        <p>
          That’s the whole secret. Ninety days isn’t a motivational window. It’s the <strong>minimum rep count for compounding to show up</strong>, expressed in calendar time. Cut the volume in half and your “90-day rule” becomes a 180-day rule, and your rep quits at day 120 convinced the job doesn’t work.
        </p>
        <h2>The three phases inside the ninety</h2>
        <p>
          Watch any rep who eventually became great and the arc is almost always the same:
        </p>
        <ul>
          <li><strong>Days 0–30: Learn the machine.</strong> Everything is mechanical. The pitch is memorized, not owned. Numbers are bad and that is fine. The only stat I look at in this window is activity — full reps, every day.</li>
          <li><strong>Days 30–60: Produce.</strong> The pitch stops being words and starts being a conversation. Close rate climbs. This is also the most dangerous window, because early wins create false confidence and the first real slump hits here.</li>
          <li><strong>Days 60–90: Lead.</strong> The reps who are going to matter start coaching other people without being asked. They’ve survived a slump, they know why the system works, and they start compounding for the team, not just themselves.</li>
        </ul>
        <p>
          When I evaluate someone at day ninety, I’m not really grading their numbers. I’m grading which phase they’re in. A rep with average numbers who is already coaching the new class is worth more than a hot streak who never left phase two.
        </p>
        <h2>What owners get wrong</h2>
        <p>
          The most common mistake I see owners make is judging people at day thirty with day-ninety expectations. You hired someone, they’re mechanical and slow, and you start mentally writing them off. Then your skepticism leaks into your coaching, they feel it, and you’ve manufactured the exact failure you predicted.
        </p>
        <blockquote>
          The 90-day rule cuts both ways. Your rep owes you ninety days of full effort. You owe them ninety days of full belief.
        </blockquote>
        <p>
          The second mistake is letting people negotiate the volume. The rule only works at full reps. A part-time ninety days is not ninety days — it’s thirty, stretched out long enough for the person to lose faith before the compounding arrives.
        </p>
        <p>
          Run the window honestly — full volume, full belief, full ninety — and the rule holds up almost embarrassingly well. That’s why every owner I’ve promoted runs it the same way I do.
        </p>
      </>
    ),
  },
  {
    slug: 'the-comp-plan-decides-the-culture',
    date: '2026-05-18',
    readTime: '8 min',
    tag: 'Comp + Payroll',
    title: 'The comp plan decides the culture.',
    description:
      'Pay the wrong thing, get the wrong behavior. Pay the right thing and people self-police. Most owners get this exactly backwards.',
    body: (
      <>
        <p>
          Owners love to talk about culture. Core values on the wall, team dinners, Monday huddles. All fine. None of it matters if the comp plan is paying for the opposite behavior.
        </p>
        <p>
          Here is the rule I’ve never seen broken in seventeen years: <strong>whatever your comp plan pays for is what your floor becomes.</strong> Not what you say. Not what you celebrate. What you pay.
        </p>
        <h2>Culture is downstream of the pay stub</h2>
        <p>
          Pay on raw sign-ups and you will get sign-ups — including the garbage ones that churn in thirty days, burn your client relationship, and teach your team that quality is someone else’s problem. Pay on installed, retained customers and suddenly your reps start asking qualifying questions on their own. Nobody told them to. The math told them to.
        </p>
        <p>
          People read their comp plan way more carefully than they read your mission statement. Your top producers especially. They are doing exactly what you incentivized — so if you don’t like what they’re doing, the first place to look isn’t the person. It’s the plan.
        </p>
        <h2>The self-policing floor</h2>
        <p>
          The real prize of a correct comp plan is that the floor polices itself. When overrides are tied to the production of the people you develop, your leaders suddenly care a great deal about who gets hired and how they get trained. When retention math hits everyone’s check, the veteran pulls the rookie aside about sloppy sets without being asked.
        </p>
        <blockquote>
          A good comp plan turns every paycheck into a coaching conversation you didn’t have to have.
        </blockquote>
        <p>
          That’s what people mean when they say culture, whether they know it or not — what the team does when you’re not in the room. And what they do when you’re not in the room is run the math you set up.
        </p>
        <h2>The three mistakes I keep seeing</h2>
        <ul>
          <li><strong>Paying for activity instead of outcomes.</strong> Activity is a coaching metric, not a comp metric. The moment you pay for it, it gets gamed, and you’re funding theater.</li>
          <li><strong>Caps.</strong> A cap is a memo to your best people that says “stop producing after this line — or better yet, go produce for someone else.” I have never capped earnings and never will. The math has to work without a ceiling, or the plan is wrong somewhere else.</li>
          <li><strong>Comp that doesn’t change at promotion.</strong> Every seat up the ladder has to shift the money from personal production toward team production. If your “leader” still earns like a closer, you don’t have a leader. You have an expensive rep with a title.</li>
        </ul>
        <h2>How to audit your own plan</h2>
        <p>
          Take your last full payroll run. For your five highest-paid people, write down the exact behaviors that generated each dollar. Then ask one question: if everyone on the floor did precisely what these five did, would the business get better or worse?
        </p>
        <p>
          If the answer is worse — churny deals, lone-wolf production, zero recruiting, zero developing — your comp plan is actively buying your culture problem every two weeks. Fix the plan first. The culture conversation gets a lot shorter after that.
        </p>
      </>
    ),
  },
  {
    slug: 'how-i-recruited-five-owners-out-of-my-chair',
    date: '2026-05-14',
    readTime: '5 min',
    tag: 'Recruiting',
    title: 'How I recruited five owners out of my own chair.',
    description:
      'Every owner on my roster came through the same door I did. The path is teachable. The standard is not negotiable. Here is how the lattice actually works.',
    body: (
      <>
        <p>
          Every owner operating alongside Front Page Agency today started in the same seat: an account executive chair on my floor. Nobody was acquired. Nobody was poached from a competitor with a signing bonus. Five owners, one door.
        </p>
        <p>
          People hear that and assume there’s a trick. There isn’t. There’s a lattice — a visible, teachable path from the floor to ownership — and a standard that doesn’t bend for anyone. The lattice is generous. The standard is brutal. You need both.
        </p>
        <h2>The lattice</h2>
        <ul>
          <li><strong>Account Executive.</strong> Learn the playbook by running it. Personal production only. This is where the 90-day rule does its filtering for me.</li>
          <li><strong>Lead Trainer.</strong> Your first crew. Money shifts from what you close to what your people close. The question changes from “can you sell?” to “can you build someone who can?”</li>
          <li><strong>Assistant Owner.</strong> Co-run the market. Full P&amp;L exposure — payroll, vendor math, the legal side, the unglamorous everything. You graduate when the office runs the same whether or not your mentor shows up.</li>
          <li><strong>Owner.</strong> Your company, your equity, ongoing partnership with us. The fastest run on record was four months. Typical is around twelve.</li>
        </ul>
        <p>
          Notice what the lattice does: it makes the next seat <strong>visible</strong> from the current one. Every AE can see the Lead Trainer working. Every Lead Trainer is co-running deals with an Assistant Owner. Nobody is asked to believe in an invisible future. They watch the person one rung up living it.
        </p>
        <h2>The standard</h2>
        <p>
          Here’s the part that usually gets left out of promote-from-within stories: the lattice only works if climbing it is genuinely hard. The moment you promote someone because it’s “their turn,” every promotion you’ve ever made loses value, because everyone re-prices what the title means.
        </p>
        <blockquote>
          Promote on production and the title means something. Promote on tenure and it means you waited.
        </blockquote>
        <p>
          Each of my five owners hit clear, non-negotiable gates: personal production, then people developed, then a P&amp;L they ran without me. When someone misses a gate, the conversation isn’t “sorry, not yet.” It’s “here is exactly the number that gets you the seat.” Specificity is respect.
        </p>
        <h2>Why I recruit out of my own chair</h2>
        <p>
          Recruiting owners from inside costs me my best producers, over and over. Worth it every time. An internal owner already runs the system, already holds the standard, and — this is the compounding part — is walking proof for every new AE that the door is real. My best recruiting pitch isn’t me talking. It’s an owner who used to sit in the same chair the candidate is interviewing for.
        </p>
        <p>
          The seat is still open. That’s not a slogan; it’s the operating model. The next owner is on a floor somewhere right now, probably in their first ninety days.
        </p>
      </>
    ),
  },
  {
    slug: 'the-second-round-interview-script',
    date: '2026-05-09',
    readTime: '4 min',
    tag: 'Recruiting',
    title: 'The 2nd-round interview that hires the right operator.',
    description:
      'Most interviews try to sell. The 2nd-round filters. Here is the structure I run, what to ask, and what to avoid.',
    body: (
      <>
        <p>
          The first interview’s job is simple: generate enough mutual interest to justify a second conversation. Sell the vision, qualify the basics, done. The second round is where hiring actually happens — and it’s where most owners blow it, because they keep selling when they should be filtering.
        </p>
        <h2>The posture shift</h2>
        <p>
          Walk into round two with one assumption: <strong>this person is trying to join something hard, and my job is to find out if they understand that.</strong> You are not convincing them. You already did that. Now you’re letting the role’s reality do the filtering, in the room, while it’s still free.
        </p>
        <p>
          Every bad hire I’ve ever made traces back to a second round where I smoothed over the hard parts because I liked the candidate. The discomfort you skip in the interview gets delivered to your floor instead, with interest.
        </p>
        <h2>The structure I run</h2>
        <ul>
          <li><strong>Open with the honest version of the job.</strong> The hours, the rejection volume, the 90-day ramp, the performance-based pay. Stated flat, no apology. Then watch. Leaning in or flinching — both answers are useful, and you can’t get either one if you sugarcoat.</li>
          <li><strong>Make them work with real material.</strong> A piece of the actual pitch, a real objection, role-played on the spot. Not to test polish — they have none yet, that’s fine. You’re testing coachability: give one correction and see if it shows up in the second attempt. That single loop predicts the next two years.</li>
          <li><strong>Ask what they’ve quit and why.</strong> Past quitting behavior is the most underrated data in hiring. Everyone quits things. You’re listening for whether they quit at the dip — right where your 90-day ramp is going to put them.</li>
          <li><strong>Let them ask questions, and grade the questions.</strong> “What does the top performer here do differently?” is a hire signal. “How flexible is the schedule?” in round two, before they’ve produced anything, usually is not.</li>
        </ul>
        <h2>What to avoid</h2>
        <p>
          Don’t oversell at the close — a candidate who needs convincing twice will need convincing every Monday. Don’t hire on charisma; the pitch can be taught, the work ethic can’t. And don’t shorten the silence after hard questions. The pause is where the real answer lives.
        </p>
        <blockquote>
          Round one earns their interest. Round two earns your confidence. Never run them in the wrong order.
        </blockquote>
        <p>
          Run it this way and your close rate on offers drops a little — and your 90-day retention jumps a lot. That trade pays for itself every single class.
        </p>
      </>
    ),
  },
  {
    slug: 'standards-so-high-its-worthy-of-being-on-the-front-page',
    date: '2026-05-02',
    readTime: '3 min',
    tag: 'Culture',
    title: 'Standards so high it’s worthy of being on the front page.',
    description:
      'The tagline isn’t marketing. It’s the operating standard. Here is what that looks like in practice when nobody is watching.',
    body: (
      <>
        <p>
          When I named the company Front Page Agency, the tagline came with it: standards so high it’s worthy of being on the front page. People assume that’s marketing. It’s not. It’s an operating test we run constantly.
        </p>
        <h2>The test</h2>
        <p>
          The test is one question: <strong>if this exact moment ran on the front page tomorrow — this pitch, this hire, this customer interaction, this payroll decision — would I be proud of it?</strong> Not defensible. Proud.
        </p>
        <p>
          “Defensible” is the standard of people managing risk. “Proud” is the standard of people building something. The gap between those two words is where every cut corner lives — the deal that technically counts but you know shouldn’t, the hire who hit the numbers but poisons the room, the explanation to a client that’s accurate but not honest.
        </p>
        <h2>When nobody is watching</h2>
        <p>
          The standard only matters in the moments without an audience. Anyone can perform excellence in a meeting. The floor finds out who you are at 7pm on a Thursday when the rep is one deal short of bonus and the shortcut is right there and nobody would ever know.
        </p>
        <blockquote>
          Culture is what the team does when you’re not in the room. The standard is why they do it.
        </blockquote>
        <p>
          You don’t install that with a poster. You install it by being caught holding it yourself — turning down revenue that doesn’t pass the test, in front of the team, more than once. The standard becomes real the first time it costs you something and you hold it anyway.
        </p>
        <h2>Why it compounds</h2>
        <p>
          High standards are expensive on any given day and underpriced over any given decade. The BBB rating, the five-star reviews, the clients who stay for years, the owners I’ve promoted who run their floors the same way — none of that came from a growth hack. It came from eight years of one boring question, asked on thousands of unglamorous days.
        </p>
        <p>
          Set the bar where a front page would find it. Then hold it when no page is looking. That’s the whole framework.
        </p>
      </>
    ),
  },
]

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = articles.find((a) => a.slug === slug)
  if (!article) return {}
  return {
    title: `${article.title} · Aton Williams`,
    description: article.description,
    openGraph: { title: article.title, description: article.description, type: 'article' },
  }
}

export default async function NotePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = articles.find((a) => a.slug === slug)
  if (!article) notFound()

  const others = articles.filter((a) => a.slug !== slug).slice(0, 2)

  return (
    <>
      <section style={{ padding: '80px 0 40px' }}>
        <div className="container article" style={{ margin: '0 auto' }}>
          <Link href="/notes" style={{ fontSize: 12, color: 'var(--text-3)', fontFamily: 'var(--display-sans)', letterSpacing: 1.5, textTransform: 'uppercase' }}>
            ← All Notes
          </Link>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, flexWrap: 'wrap', margin: '28px 0 18px' }}>
            <span style={{ fontSize: 10.5, color: 'var(--accent)', fontWeight: 700, letterSpacing: 2.5, fontFamily: 'var(--display-sans)', textTransform: 'uppercase' }}>
              {article.tag}
            </span>
            <span style={{ fontSize: 11.5, color: 'var(--text-3)', fontFamily: 'var(--display-sans)', letterSpacing: 0.5 }}>
              {article.date} · {article.readTime} read
            </span>
          </div>
          <h1
            className="serif"
            style={{
              fontSize: 'clamp(34px, 5.5vw, 58px)',
              lineHeight: 1.05,
              letterSpacing: '-1.5px',
              fontWeight: 500,
              color: 'var(--text)',
              marginBottom: 22,
            }}
          >
            {article.title}
          </h1>
          <p style={{ fontSize: 17, color: 'var(--text-2)', lineHeight: 1.7, paddingBottom: 28, borderBottom: '1px solid var(--border-soft)' }}>
            {article.description}
          </p>
        </div>
      </section>

      <section style={{ padding: '20px 0 40px' }}>
        <div className="container article" style={{ margin: '0 auto' }}>
          {article.body}

          {/* Byline */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 48, paddingTop: 28, borderTop: '1px solid var(--border-soft)' }}>
            <div
              style={{
                width: 52, height: 52, borderRadius: '50%',
                background: 'url(/aton.jpg) center / cover no-repeat',
                border: '1px solid var(--border-accent)',
                flexShrink: 0,
              }}
            />
            <div>
              <div className="serif" style={{ fontSize: 17, fontWeight: 500, color: 'var(--text)' }}>Aton Williams</div>
              <div style={{ fontSize: 12, color: 'var(--text-3)', fontFamily: 'var(--display-sans)', letterSpacing: 1 }}>
                Operator · Coach · Builder — Founder, Front Page Agency
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="card-elevated" style={{ marginTop: 40, padding: 36, textAlign: 'center', borderColor: 'var(--border-accent)' }}>
            <h3 className="serif" style={{ fontSize: 26, fontWeight: 500, color: 'var(--text)', letterSpacing: '-0.5px', marginBottom: 12 }}>
              Want to run this with your team?
            </h3>
            <p style={{ fontSize: 14.5, color: 'var(--text-2)', lineHeight: 1.7, maxWidth: 520, margin: '0 auto 24px' }}>
              The full playbook — plus the breakdowns behind every note — lives free inside Operators Academy. If you have a specific bottleneck, bring it to a 1:1 strategy call.
            </p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="https://www.skool.com/operators-academy-5634" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                Join Operators Academy
              </a>
              <Link href="/work-with-me#call" className="btn btn-ghost">
                Book a Strategy Call
              </Link>
            </div>
          </div>

          {/* More notes */}
          <div style={{ marginTop: 48 }}>
            <div style={{ fontSize: 11, color: 'var(--accent)', fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', marginBottom: 18, fontFamily: 'var(--display-sans)' }}>
              Keep Reading
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 14 }}>
              {others.map((o) => (
                <Link key={o.slug} href={`/notes/${o.slug}`} className="card" style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}>
                  <div style={{ fontSize: 10, color: 'var(--accent)', fontWeight: 700, letterSpacing: 2.5, fontFamily: 'var(--display-sans)', textTransform: 'uppercase', marginBottom: 10 }}>
                    {o.tag}
                  </div>
                  <div className="serif" style={{ fontSize: 20, fontWeight: 500, color: 'var(--text)', letterSpacing: '-0.4px', lineHeight: 1.25 }}>
                    {o.title}
                  </div>
                  <div style={{ marginTop: 12, fontSize: 11.5, color: 'var(--text-3)', fontFamily: 'var(--display-sans)' }}>
                    {o.readTime} read →
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
