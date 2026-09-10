import fs from 'node:fs'
import path from 'node:path'
import type { SpecGuide as Spec, SpecBlock } from '@/lib/content'
import { ProBox } from './ProBox'

function esc(s: string) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}
function Html({ html, className }: { html: string; className?: string }) {
  return <p className={className} dangerouslySetInnerHTML={{ __html: html }} />
}

function Block({ b }: { b: SpecBlock }) {
  const [kind, ...rest] = b
  switch (kind) {
    case 'p': return <Html html={rest[0] as string} />
    case 'h3': return <h3>{rest[0] as string}</h3>
    case 'steps': return (
      <ol className="steps-list">
        {(rest[0] as [string, string][]).map(([a, t]) => <li key={a}><div><b>{a}</b><Html html={t} /></div></li>)}
      </ol>
    )
    case 'checks': return <ul className="checks">{(rest[0] as string[]).map((v, i) => <li key={i} dangerouslySetInnerHTML={{ __html: v }} />)}</ul>
    case 'said': return <div className="said coach"><small>{rest[0] as string}</small><Html html={rest[1] as string} /></div>
    case 'code': return <div className="code">{rest[0] as string}</div>
    case 'linkedin': return <div className="linkedin"><b>Post it on LinkedIn</b><span dangerouslySetInnerHTML={{ __html: rest[0] as string }} /></div>
    default: return null
  }
}

export function SpecGuidePage({ g }: { g: Spec }) {
  const n = g.sections.length
  const prompt = esc(g.prompt).replace(/&lt;b&gt;/g, '<b>').replace(/&lt;\/b&gt;/g, '</b>')
  return (
    <>
      <section className={`band${g.band}`}>
        <div className="wrap">
          <a className="backlink" href="/guides">&larr; All free guides</a>
          <div className="label-row">
            <span className="tag-id">Guide {g.num}</span>
            <span className="meta" style={{ color: 'var(--green-3)' }}>{g.topic}</span>
          </div>
          <h1>{g.h1}<br /><em>{g.em}</em></h1>
          <p className="lead">{g.lead}</p>
          <div className="meta-dots"><span>{g.read} minute read</span><span>{g.kit}</span><span>Free version</span></div>
          <div className="button-row">
            <a className="button" href="#lesson-1">Read the lesson</a>
            <a className="button secondary" href="#prompt-section">Get the prompt</a>
          </div>
        </div>
      </section>

      <section className="kit" aria-label="What you get">
        <div className="wrap">
          <div className="kit-grid">
            {[['Free lesson', '#lesson-1', 'Start reading'], ['Prompt', '#prompt-section', 'Copy the prompt'], ['Deeper in Pro', '#pro', 'See what is in Pro']].map(([meta, href, cta], i) => (
              <div className="tile" key={meta}>
                <span className="meta">{meta}</span>
                <h3>{g.tiles[i][0]}</h3>
                <p>{g.tiles[i][1]}</p>
                <a className="textlink" href={href}>{cta}</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <article className="article">
        <div className="wrap">
          <nav className="contents" aria-label="Guide sections">
            {g.sections.map((s, i) => <a key={s.nav} href={`#lesson-${i + 1}`}>{s.nav}</a>)}
            <a href="#worksheet">Worksheet</a><a href="#prompt-section">Prompt</a><a href="#pro">Pro</a>
          </nav>
          {g.sections.map((s, i) => (
            <section className="lesson" id={`lesson-${i + 1}`} key={s.nav}>
              <span className="num"><b>{i + 1}</b>{s.label}</span>
              <h2>{s.h2}</h2>
              {s.body.map((b, j) => <Block b={b} key={j} />)}
            </section>
          ))}

          <section className="lesson" id="worksheet">
            <span className="num"><b>{n + 1}</b>{g.ws[0]}</span>
            <h2>{g.ws[1]}</h2>
            <p>{g.ws[2]} Entries stay on this page and are not sent anywhere.</p>
            <div className="worksheet">
              {g.fields.map(([lab, ph], i) => (
                <label key={lab} htmlFor={`f-${i}`}>{lab}<textarea id={`f-${i}`} placeholder={ph}></textarea></label>
              ))}
              <div className="actions">
                <button className="button" id="save-notes" type="button">Download my notes</button>
                <p id="notes-status" role="status" className="note"></p>
              </div>
            </div>
          </section>

          <section className="lesson" id="prompt-section">
            <span className="num"><b>{n + 2}</b>{g.pr[0]}</span>
            <h2>{g.pr[1]}</h2>
            <p>{g.pr[2]}</p>
            <div className="prompt-card">
              <header>
                <span>Prompt &middot; copy and paste</span>
                <div className="actions">
                  <button className="button light" id="copy" type="button">Copy prompt</button>
                  <a className="button secondary" style={{ borderColor: 'rgba(255,250,240,.4)', color: 'var(--cream)' }} href={`/downloads/${g.slug}-prompt.txt`} download data-event="download_requested" data-resource={`${g.slug}-prompt`}>Download .txt</a>
                  {fs.existsSync(path.join(process.cwd(), 'public', 'downloads', `${g.slug}.pdf`)) && <a className="button secondary" style={{ borderColor: 'rgba(255,250,240,.4)', color: 'var(--cream)' }} href={`/downloads/${g.slug}.pdf`} download data-event="download_requested" data-resource={`${g.slug}-pdf`}>Download the PDF</a>}
                </div>
              </header>
              <pre id="prompt" dangerouslySetInnerHTML={{ __html: prompt }} />
              <p id="copy-status" role="status" className="status"></p>
            </div>
          </section>

          <ProBox guide={g.slug} num={n + 3} />

          <aside className="offer">
            <span className="eyebrow">{g.offer[0]}</span>
            <h2>{g.offer[1]}</h2>
            <p>{g.offer[2]}</p>
            <a className="button peach" href={g.offer[3].replace('../preview/', '/').replace('.html', '')}>{g.offer[4]}</a>
          </aside>
        </div>
      </article>
    </>
  )
}
