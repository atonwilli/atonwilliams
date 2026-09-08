export function Newsletter() {
  return (
    <form id="newsletter" action="/api/newsletter/subscribe" method="POST">
      <input type="hidden" name="source" value="home" />
      <div className="row">
        <input type="email" name="email" required placeholder="Your email address" aria-label="Your email address" />
        <select name="interest" aria-label="Newsletter interest" defaultValue="Sales and rep development">
          <option>Sales and rep development</option>
          <option>AI and automation</option>
          <option>Updates from Aton</option>
        </select>
      </div>
      <button className="button" type="submit">Subscribe</button>
      <p className="small">One click to confirm, one click to leave. No spam.</p>
    </form>
  )
}
