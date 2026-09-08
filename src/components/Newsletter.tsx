const FORM = 'https://formsubmit.co/aton@frontpageagencyinc.com'

export function Newsletter() {
  return (
    <form id="newsletter" action={FORM} method="POST">
      <input type="hidden" name="_subject" value="Newsletter signup: atonwilliams.com" />
      <input type="hidden" name="_template" value="table" />
      <input type="hidden" name="_captcha" value="false" />
      <input type="hidden" name="_next" value="https://atonwilliams.com/thanks?from=newsletter" />
      <input type="text" name="_honey" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />
      <div className="row">
        <input type="email" name="email" required placeholder="Your email address" aria-label="Your email address" />
        <select name="interest" aria-label="Newsletter interest" defaultValue="Sales and rep development">
          <option>Sales and rep development</option>
          <option>AI and automation</option>
          <option>Updates from Aton</option>
        </select>
      </div>
      <button className="button" type="submit">Subscribe</button>
      <p className="small">No spam. Unsubscribe any time.</p>
    </form>
  )
}
