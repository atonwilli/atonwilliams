import { packForGuide, getLibraryPack, checkoutEnabled } from '@/lib/pro'
import { BuyButton } from './BuyButton'
import { Price } from './Price'

/** The paid layer under every free guide: what the Pro pack holds, its price, and the library bundle. */
export function ProBox({ guide, num }: { guide: string; num: number }) {
  const pack = packForGuide(guide)
  if (!pack) return null
  const lib = getLibraryPack()
  if (pack.status === 'draft') {
    return (
      <section className="lesson" id="pro">
        <span className="num">{num < 99 && <b>{num}</b>}The Pro companion</span>
        <h2>{pack.title.replace(/, Pro$/, '')}: in progress.</h2>
        <p>{pack.tagline} It is not for sale until every chapter is finished. Members of Operators Academy Pro get it the day it ships; everyone else hears in the Friday note.</p>
        <div className="pro-box">
          <div>
            <span className="chip">What it will hold</span>
            <ul>{pack.includes.map((x) => <li key={x}>{x}</li>)}</ul>
          </div>
          <div className="pro-buy">
            <a className="button peach" href="/membership">See Operators Academy Pro</a>
            <a className="textlink" href="/#newsletter" style={{ color: 'var(--cream)', borderColor: 'var(--peach)' }}>Get the Friday note</a>
          </div>
        </div>
      </section>
    )
  }
  return (
    <section className="lesson" id="pro">
      <span className="num">{num < 99 && <b>{num}</b>}The Pro pack</span>
      <h2>One prompt. Paste it into Claude. It builds the whole thing for your business.</h2>
      <p>The Pro pack is a build prompt with blanks for your context: your product, your medium, your team. Fill them in, answer its questions, and it produces the complete system in your words. The PDF explains the method so you can judge the output. {pack.tagline}</p>
      <div className="pro-box">
        <div>
          <span className="chip">{pack.title}</span>
          <ul>{pack.includes.map((x) => <li key={x}>{x}</li>)}</ul>
          <p className="small" style={{ color: 'rgba(255,250,240,.7)', margin: '14px 0 0' }}>
            Delivered as a zip: the build prompt as a text file, the PDF, and every prompt and template as plain text. One payment, yours to keep.
            {!checkoutEnabled() && ' Checkout is opening shortly; leave your details and you will get the link first.'}
          </p>
        </div>
        <div className="pro-buy">
          <Price price={pack.price} compareAt={pack.compareAt} />
          <BuyButton sku={pack.sku} price={pack.price} label={`Get the Pro pack, $${pack.price}`} />
          <BuyButton sku="library" price={lib.price} label={`All ${lib.includes.length} packs, $${lib.price}`} variant="light" />
          <a className="textlink" href="/pro" style={{ color: 'var(--cream)', borderColor: 'var(--peach)' }}>See everything in Pro</a>
        </div>
      </div>
    </section>
  )
}
