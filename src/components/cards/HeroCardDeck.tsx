'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { FloatingCard } from './FloatingCard'

export function HeroCardDeck() {
  const deckRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cards = deckRef.current?.querySelectorAll('.hero-card')
    if (!cards) return

    gsap.fromTo(
      cards,
      { opacity: 0, y: 60, scale: 0.8 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: 'back.out(1.4)',
        delay: 0.4,
      }
    )
  }, [])

  return (
    <div ref={deckRef} className="relative w-72 h-64 md:w-96 md:h-80">
      {/* Back cards (fanned out) */}
      <div className="hero-card absolute" style={{ bottom: 20, left: '50%', transform: 'translateX(-50%) rotate(-18deg)', opacity: 0 }}>
        <FloatingCard suit="♦" value="K" scale={1.1} delay={0.5} rotateRange={[-20, -14]} />
      </div>
      <div className="hero-card absolute" style={{ bottom: 20, left: '50%', transform: 'translateX(-50%) rotate(-8deg)', opacity: 0 }}>
        <FloatingCard suit="♥" value="Q" scale={1.1} delay={0.3} rotateRange={[-10, -4]} />
      </div>
      <div className="hero-card absolute" style={{ bottom: 20, left: '50%', transform: 'translateX(-50%) rotate(8deg)', opacity: 0 }}>
        <FloatingCard suit="♣" value="J" scale={1.1} delay={0.7} rotateRange={[4, 10]} />
      </div>
      <div className="hero-card absolute" style={{ bottom: 20, left: '50%', transform: 'translateX(-50%) rotate(18deg)', opacity: 0 }}>
        <FloatingCard suit="♠" value="A" scale={1.1} delay={0.9} rotateRange={[14, 20]} />
      </div>

      {/* Center feature card */}
      <div
        className="hero-card absolute"
        style={{ bottom: 40, left: '50%', transform: 'translateX(-50%)', opacity: 0, zIndex: 10 }}
      >
        <FloatingCard suit="♠" value="A" scale={1.4} delay={0.2} rotateRange={[-4, 4]} />
      </div>

      {/* Glow beneath deck */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2"
        style={{
          width: 140,
          height: 40,
          borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(245,200,66,0.25) 0%, transparent 70%)',
          filter: 'blur(8px)',
        }}
      />
    </div>
  )
}
