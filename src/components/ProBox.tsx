import { packForGuide, getLibraryPack, checkoutEnabled } from '@/lib/pro'
import { BuyButton } from './BuyButton'

/** The paid layer under every free guide: what the Pro pack holds, its price, and the library bundle. */
export function ProBox({ guide, num }: { guide: string; num: number }) {
  const pack = packForGuide(guide)
  if (!pack) return null
  const lib = getLibraryPack()
  return (
    <section className="lesson" id="pro">
      <span className="num">{num < 99 && <b>{num}</b>}The Pro pack</span>
      <h2>The free version gets you started. The Pro pack finishes the job.</h2>
      <p>{pack.tagline}</p>
      <div className="pro-box">
        <div>
          <span className="chip">{pack.title}</span>
          <ul>{pack.includes.map((x) => <li key={x}>{x}</li>)}</ul>
          <p className="small" style={{ color: 'rgba(255,250,240,.7)', margin: '14px 0 0' }}>
            Delivered as a zip: the PDF plus every prompt and template as plain text. One payment, yours to keep.
            {!checkoutEnabled() && ' Checkout is opening shortly; leave your details and you will get the link first.'}
          </p>
        </div>
        <div className="pro-buy">
          <strong>${pack.price}</strong>
          <BuyButton sku={pack.sku} price={pack.price} label={`Get the Pro pack, $${pack.price}`} />
          <BuyButton sku="library" price={lib.price} label={`All ${pack.includes.length ? lib.includes.length : 10} packs, $${lib.price}`} variant="light" />
          <a className="textlink" href="/pro" style={{ color: 'var(--cream)', borderColor: 'var(--peach)' }}>See everything in Pro</a>
        </div>
      </div>
    </section>
  )
}
