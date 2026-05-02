'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { FloatingCard } from './FloatingCard'

const CARDS = [
  { suit: '♦' as const, value: 'K' as const, rotate: -22, x: -90, delay: 0.6, faceDown: false },
  { suit: '♥' as const, value: 'Q' as const, rotate: -10, x: -44, delay: 0.45, faceDown: false },
  { suit: '♣' as const, value: 'J' as const, rotate:  10, x:  44, delay: 0.75, faceDown: false },
  { suit: '♠' as const, value: '10' as const, rotate: 22, x:  90, delay: 0.9, faceDown: false },
]

export function HeroCardDeck() {
  const deckRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cards = deckRef.current?.querySelectorAll('.hero-card')
    if (!cards) return
    gsap.fromTo(
      cards,
      { opacity: 0, y: 50, scale: 0.85 },
      {
        opacity: 1, y: 0, scale: 1,
        duration: 0.7,
        stagger: 0.12,
        ease: 'back.out(1.5)',
        delay: 0.5,
      }
    )
  }, [])

  return (
    <div ref={deckRef} className="relative" style={{ width: 320, height: 180 }}>
      {/* Back fan cards */}
      {CARDS.map((c, i) => (
        <div
          key={i}
          className="hero-card absolute"
          style={{
            bottom: 0,
            left: '50%',
            marginLeft: -36,
            transform: `rotate(${c.rotate}deg) translateX(${c.x * 0.5}px)`,
            transformOrigin: 'bottom center',
            opacity: 0,
            zIndex: i + 1,
          }}
        >
          <FloatingCard
            suit={c.suit}
            value={c.value}
            scale={0.9}
            delay={c.delay}
            rotateRange={[c.rotate - 4, c.rotate + 4]}
          />
        </div>
      ))}

      {/* Center Ace of Spades — hero card */}
      <div
        className="hero-card absolute"
        style={{
          bottom: 12,
          left: '50%',
          marginLeft: -40,
          opacity: 0,
          zIndex: 10,
        }}
      >
        <FloatingCard
          suit="♠"
          value="A"
          scale={1.15}
          delay={0.3}
          rotateRange={[-3, 3]}
        />
      </div>

      {/* Ground glow */}
      <div
        style={{
          position: 'absolute',
          bottom: -4,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 180,
          height: 28,
          borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(245,200,66,0.3) 0%, transparent 70%)',
          filter: 'blur(10px)',
        }}
      />
    </div>
  )
}
