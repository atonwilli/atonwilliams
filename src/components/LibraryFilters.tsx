'use client'

import { useEffect, useState } from 'react'

/** Search and topic filter for the guide library. Cards are server-rendered; this only shows and hides them. */
export function LibraryFilters() {
  const [topic, setTopic] = useState('all')
  const [q, setQ] = useState('')
  const [count, setCount] = useState('')
  useEffect(() => {
    const query = q.toLowerCase().trim()
    let shown = 0
    document.querySelectorAll<HTMLElement>('.library .card').forEach((c) => {
      const ok = (topic === 'all' || c.dataset.topic === topic) && (c.dataset.keys + ' ' + c.textContent!.toLowerCase()).indexOf(query) !== -1
      c.hidden = !ok
      if (ok) shown++
    })
    const empty = document.getElementById('empty')
    if (empty) empty.hidden = shown > 0
    setCount(topic === 'all' && !query ? '' : shown + (shown === 1 ? ' guide matches' : ' guides match'))
  }, [topic, q])
  return (
    <>
      <div className="controls">
        <div>
          <label htmlFor="search">Find a guide</label>
          <input id="search" type="search" placeholder="Search by topic or tool" value={q} onChange={(e) => setQ(e.target.value)} />
        </div>
        <div>
          <label>Browse topics</label>
          <div className="filters">
            {[['all', 'All'], ['sales', 'Sales and leadership'], ['ai', 'AI and tools']].map(([k, label]) => (
              <button key={k} type="button" aria-pressed={topic === k} data-topic={k} onClick={() => setTopic(k)}>{label}</button>
            ))}
          </div>
        </div>
      </div>
      <p className="count" id="count" role="status">{count}</p>
    </>
  )
}
