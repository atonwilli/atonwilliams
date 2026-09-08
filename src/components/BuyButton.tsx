import { checkoutEnabled } from '@/lib/pro'

/** One-click Stripe Checkout. Falls back to the contact form until a Stripe key is configured. */
export function BuyButton({ sku, price, label, variant = 'peach' }: { sku: string; price: number; label?: string; variant?: 'peach' | 'secondary' | 'light' | '' }) {
  const cls = `button ${variant}`.trim()
  if (!checkoutEnabled()) {
    return <a className={cls} href={`/contact?topic=membership`}>{label || `Get it, $${price}`}</a>
  }
  return (
    <form action="/api/checkout" method="POST" style={{ display: 'inline' }}>
      <input type="hidden" name="sku" value={sku} />
      <button className={cls} type="submit">{label || `Get it, $${price}`}</button>
    </form>
  )
}
