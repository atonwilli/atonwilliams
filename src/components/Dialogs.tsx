'use client'

import { useEffect, useRef, useState } from 'react'

type Content = { title: string; copy: string; steps: string[]; note: string; action: { label: string; href: string } }

const content: Record<string, Content> = {
  membership: {
    title: 'How membership will work',
    copy: 'Operators Academy Pro is the paid tier of the community. The flow when it opens:',
    steps: [
      'Read the membership page: what is included, who it is for, and the price and billing interval.',
      'Check out through Stripe with a card on file. Cancellation terms are shown on the checkout page.',
      'Access opens after payment is verified: the Pro classroom, the prompt vault, the SOP library, and the private Telegram group.',
      'Manage or cancel the membership from a billing portal at any time.',
    ],
    note: 'Pro is not open yet. Leave your details and you will hear first.',
    action: { label: 'Ask about membership', href: '/contact?topic=membership' },
  },
  coaching: {
    title: 'How booking works',
    copy: 'Private coaching and consulting start with an application, not a payment:',
    steps: [
      'Submit the intake form with your business stage, team size, timeline, and biggest challenge.',
      'Every application gets a reply: an invitation to book, a better-fit resource, or a follow-up question.',
      'Invited applicants see the engagement options in writing: strategy session, fly-in one-on-one, or a team program, with scope and deposit terms.',
      'Choose a time, complete the deposit through Stripe, and receive a preparation checklist before the session.',
    ],
    note: 'Nothing is booked or charged until you have the scope and terms in writing.',
    action: { label: 'Apply for private coaching', href: '/contact?topic=coaching' },
  },
}

export function Dialogs() {
  const ref = useRef<HTMLDialogElement>(null)
  const [c, setC] = useState<Content | null>(null)
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const btn = (e.target as HTMLElement).closest<HTMLElement>('[data-dialog]')
      if (!btn) return
      const next = content[btn.dataset.dialog || '']
      if (!next) return
      setC(next)
      ref.current?.showModal()
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])
  return (
    <dialog id="dialog" ref={ref} aria-labelledby="modal-title" onClick={(e) => { if (e.target === ref.current) ref.current?.close() }}>
      <div className="dialog-body">
        <span className="chip warn">How it works</span>
        <h2 id="modal-title">{c?.title}</h2>
        <p>{c?.copy}</p>
        {c && c.steps.length > 0 && <ol>{c.steps.map((s) => <li key={s}>{s}</li>)}</ol>}
        <p className="small">{c?.note}</p>
        <div className="dialog-actions">
          <a className="button" href={c?.action.href || '#'}>{c?.action.label || 'Continue'}</a>
          <button className="button secondary" type="button" onClick={() => ref.current?.close()}>Close</button>
        </div>
      </div>
    </dialog>
  )
}
