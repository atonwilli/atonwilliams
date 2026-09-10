'use client'

import { useEffect } from 'react'

/** Copy-the-prompt and download-my-notes buttons on guide pages. Notes never leave the browser. */
export function GuideTools() {
  useEffect(() => {
    const track = (event: string, resource: string) => {
      try { fetch('/api/events', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ event, resource }), keepalive: true }).catch(() => {}) } catch { /* ignore */ }
    }
    const slug = location.pathname.split('/').pop() || ''
    track('resource_viewed', slug)
    const onClick = async (e: MouseEvent) => {
      const dl = (e.target as HTMLElement).closest<HTMLElement>('[data-event]')
      if (dl) track(dl.dataset.event || 'download_requested', dl.dataset.resource || slug)
      const t = (e.target as HTMLElement).closest<HTMLElement>('#copy, #save-notes')
      if (!t) return
      if (t.id === 'copy') {
        const status = document.getElementById('copy-status')
        try {
          await navigator.clipboard.writeText(document.getElementById('prompt')?.textContent || '')
          if (status) status.textContent = 'Prompt copied.'
          track('prompt_copied', slug)
        } catch {
          if (status) status.textContent = 'Select the prompt text to copy it.'
        }
      } else {
        const parts = Array.from(document.querySelectorAll<HTMLTextAreaElement>('.worksheet textarea')).map((ta) => (ta.parentNode?.firstChild?.textContent || '').trim() + '\n' + ta.value)
        const title = document.title.split(' | ')[0]
        const blob = new Blob([title + '\n\n' + parts.join('\n\n')], { type: 'text/plain;charset=utf-8' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = location.pathname.split('/').pop() + '-notes.txt'
        a.click()
        setTimeout(() => URL.revokeObjectURL(url), 1000)
        const status = document.getElementById('notes-status')
        if (status) status.textContent = 'Downloaded.'
      }
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])
  return null
}
