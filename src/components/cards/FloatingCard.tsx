'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

interface FloatingCardProps {
  suit: '♠' | '♥' | '♦' | '♣'
  value: string
  className?: string
  delay?: number
  rotateRange?: [number, number]
  scale?: number
}

const suitColor = (suit: string) =>
  suit === '♥' || suit === '♦' ? '#f87171' : 'var(--text-primary)'

export function FloatingCard({
  suit,
  value,
  className = '',
  delay = 0,
  rotateRange = [-12, 12],
  scale = 1,
}: FloatingCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = cardRef.current
    if (!el) return

    const tl = gsap.timeline({ repeat: -1, yoyo: true })
    tl.to(el, {
      y: -18,
      rotation: rotateRange[1],
      duration: 3 + Math.random() * 2,
      delay,
      ease: 'sine.inOut',
    }).to(el, {
      y: 8,
      rotation: rotateRange[0],
      duration: 3 + Math.random() * 2,
      ease: 'sine.inOut',
    })

    return () => { tl.kill() }
  }, [delay, rotateRange])

  return (
    <div
      ref={cardRef}
      className={`relative select-none ${className}`}
      style={{
        width: 80 * scale,
        height: 112 * scale,
        borderRadius: 8 * scale,
        background: 'linear-gradient(145deg, #1e1e2e 0%, #11111a 100%)',
        border: '1px solid var(--border-mid)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.6), 0 0 16px var(--gold-glow)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 6 * scale,
      }}
    >
      {/* Top-left */}
      <div style={{ lineHeight: 1 }}>
        <div style={{ fontSize: 14 * scale, fontWeight: 700, color: suitColor(suit), fontFamily: 'var(--font-display)' }}>{value}</div>
        <div style={{ fontSize: 12 * scale, color: suitColor(suit) }}>{suit}</div>
      </div>

      {/* Center suit */}
      <div style={{ textAlign: 'center', fontSize: 32 * scale, color: suitColor(suit), lineHeight: 1 }}>{suit}</div>

      {/* Bottom-right (upside down) */}
      <div style={{ lineHeight: 1, transform: 'rotate(180deg)', alignSelf: 'flex-end' }}>
        <div style={{ fontSize: 14 * scale, fontWeight: 700, color: suitColor(suit), fontFamily: 'var(--font-display)' }}>{value}</div>
        <div style={{ fontSize: 12 * scale, color: suitColor(suit) }}>{suit}</div>
      </div>

      {/* Shimmer overlay */}
      <div
        className="shimmer absolute inset-0 rounded-lg"
        style={{ borderRadius: 8 * scale }}
      />
    </div>
  )
}
