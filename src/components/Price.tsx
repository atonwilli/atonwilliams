/** A price with its struck-through list price when there is one. */
export function Price({ price, compareAt, size = 'lg' }: { price: number; compareAt?: number; size?: 'lg' | 'md' }) {
  return (
    <span className={`price-tag ${size}`}>
      {compareAt && compareAt > price ? <s>${compareAt}</s> : null}
      <strong>${price}</strong>
    </span>
  )
}
