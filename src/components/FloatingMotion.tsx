'use client'

import { useEffect, useState } from 'react'

const GLYPHS = [
  // initials + name fragments
  'A', 'W', 'AW',
  // chapter ages
  '14', '20', '23', '29', '30', '31',
  // numbers from the arc
  '0', '1', '4', '7', '8', '17',
  // editorial shapes + symbols
  '◆', '◇', '●', '○', '▲', '△', '+', '×', '→', '↗',
  // signature money symbol
  '$', '§',
]

interface Particle {
  id: number
  char: string
  x: number
  delay: number
  duration: number
  size: number
  opacity: number
}

export function FloatingMotion() {
  const [particles, setParticles] = useState<Particle[]>([])

  useEffect(() => {
    const count = 26
    const next: Particle[] = Array.from({ length: count }, (_, i) => ({
      id: i,
      char: GLYPHS[Math.floor(Math.random() * GLYPHS.length)],
      x: Math.random() * 100,
      delay: Math.random() * 35,
      duration: 32 + Math.random() * 38,
      size: 11 + Math.random() * 11,
      opacity: 0.05 + Math.random() * 0.12,
    }))
    setParticles(next)
  }, [])

  return (
    <div className="floating-motion" aria-hidden="true">
      {particles.map((p) => (
        <span
          key={p.id}
          style={
            {
              left: `${p.x}%`,
              fontSize: `${p.size}px`,
              animation: `drift ${p.duration}s linear ${p.delay}s infinite`,
              '--target-opacity': p.opacity,
            } as React.CSSProperties
          }
        >
          {p.char}
        </span>
      ))}
    </div>
  )
}
