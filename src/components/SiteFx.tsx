'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

/** Scroll reveal, restrained depth on scroll, and the hero footage loop. Re-runs on every route change. */
export function SiteFx() {
  const pathname = usePathname()
  useEffect(() => {
    const motion = matchMedia('(prefers-reduced-motion: reduce)')

    const video = document.getElementById('hero-video') as HTMLVideoElement | null
    const still = document.getElementById('hero-still')
    if (video && still && !motion.matches) {
      const source = video.querySelector('source')
      source?.addEventListener('error', () => video.remove())
      video.addEventListener('canplay', () => {
        video.hidden = false
        still.classList.add('behind')
        video.play().catch(() => { video.remove(); still.classList.remove('behind') })
      }, { once: true })
      video.load()
    }

    const revealEls = document.querySelectorAll('.reveal')
    let io: IntersectionObserver | undefined
    if (motion.matches || !('IntersectionObserver' in window)) {
      revealEls.forEach((el) => el.classList.add('in'))
    } else {
      io = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) { entry.target.classList.add('in'); io?.unobserve(entry.target) }
        })
      }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 })
      revealEls.forEach((el) => io?.observe(el))
    }

    const depthEls = document.querySelectorAll<HTMLElement>('.depth')
    let pending = false
    function updateDepth() {
      pending = false
      const active = !motion.matches && innerWidth > 820
      document.querySelectorAll('.reveal:not(.in)').forEach((el) => {
        const r = el.getBoundingClientRect()
        if (r.top < innerHeight * 0.96 && r.bottom > 0) el.classList.add('in')
      })
      document.querySelectorAll<HTMLElement>('.bg-depth .layer').forEach((b) => {
        b.style.transform = active ? 'translate3d(0,' + (-scrollY * parseFloat(b.dataset.rate || '0')).toFixed(1) + 'px,0)' : ''
      })
      depthEls.forEach((el) => {
        if (!active) { el.style.transform = ''; return }
        const rect = el.getBoundingClientRect()
        const centerOffset = innerHeight / 2 - (rect.top + rect.height / 2)
        const amount = parseFloat(el.dataset.depth || '0.04')
        const offset = Math.max(-24, Math.min(24, centerOffset * amount))
        el.style.transform = 'translateY(' + offset.toFixed(1) + 'px)'
      })
    }
    const onScroll = () => { if (!pending) { pending = true; requestAnimationFrame(updateDepth) } }
    addEventListener('scroll', onScroll, { passive: true })
    addEventListener('resize', updateDepth)
    motion.addEventListener('change', updateDepth)
    updateDepth()
    const t = setTimeout(updateDepth, 400)
    return () => {
      io?.disconnect()
      removeEventListener('scroll', onScroll)
      removeEventListener('resize', updateDepth)
      motion.removeEventListener('change', updateDepth)
      clearTimeout(t)
    }
  }, [pathname])
  return null
}
