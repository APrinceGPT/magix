'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { CardAnimation } from '@/sanity/types'
import { PlayingCard, Suit, CardValue } from './PlayingCard'

interface AnimatedCardStepProps {
  animation: CardAnimation
  active: boolean
}

const CARDS: { suit: Suit; value: CardValue }[] = [
  { suit: '♠', value: 'A' },
  { suit: '♥', value: 'K' },
  { suit: '♦', value: 'Q' },
  { suit: '♣', value: 'J' },
]

export function AnimatedCardStep({ animation, active }: AnimatedCardStepProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const card1Ref = useRef<HTMLDivElement>(null)
  const card2Ref = useRef<HTMLDivElement>(null)
  const card3Ref = useRef<HTMLDivElement>(null)
  const tlRef = useRef<gsap.core.Timeline | null>(null)

  useEffect(() => {
    if (!active) return
    const c1 = card1Ref.current
    const c2 = card2Ref.current
    const c3 = card3Ref.current
    if (!c1) return

    tlRef.current?.kill()
    const allCards = [c1, c2, c3].filter(Boolean) as HTMLElement[]
    gsap.set(allCards, { clearProps: 'all' })

    const tl = gsap.timeline({ repeat: -1, repeatDelay: 1.5 })
    tlRef.current = tl

    switch (animation) {
      case 'flip':
        // Card does a full 3D flip revealing face
        tl.to(c1, { rotateY: 90, duration: 0.35, ease: 'power2.in' })
          .to(c1, { rotateY: 0, duration: 0.35, ease: 'power2.out' })
          .to(c1, { rotateY: -90, duration: 0.35, ease: 'power2.in', delay: 1.2 })
          .to(c1, { rotateY: 0, duration: 0.35, ease: 'power2.out' })
        break

      case 'fan':
        // Three cards fan out from a stack
        if (c2 && c3) {
          gsap.set([c2, c3], { x: 0, rotation: 0 })
          tl.to(c1, { rotation: -22, x: -36, y: -4, duration: 0.55, ease: 'back.out(1.4)' })
            .to(c2, { rotation: 0, x: 0, y: -8, duration: 0.55, ease: 'back.out(1.4)' }, '<0.08')
            .to(c3, { rotation: 22, x: 36, y: -4, duration: 0.55, ease: 'back.out(1.4)' }, '<0.08')
            .to([c1, c2, c3], { rotation: 0, x: 0, y: 0, duration: 0.45, ease: 'power2.inOut', delay: 1.2 })
        }
        break

      case 'shuffle':
        // Two cards riffle past each other
        if (c2) {
          tl.to(c1, { x: -28, rotation: -10, duration: 0.25, ease: 'power1.out' })
            .to(c2, { x: 28, rotation: 10, duration: 0.25, ease: 'power1.out' }, '<')
            .to(c1, { x: -14, rotation: -5, duration: 0.15 })
            .to(c2, { x: 14, rotation: 5, duration: 0.15 }, '<')
            .to(c1, { x: 0, rotation: 0, duration: 0.25, ease: 'power2.inOut', delay: 0.3 })
            .to(c2, { x: 0, rotation: 0, duration: 0.25, ease: 'power2.inOut' }, '<')
        }
        break

      case 'reveal':
        // Card rises with golden glow, glowing like a spotlight
        tl.to(c1, { y: -32, scale: 1.12, duration: 0.5, ease: 'back.out(2)' })
          .to(c1, {
            boxShadow: '0 0 0 0 transparent, 0 0 32px 8px rgba(245,200,66,0.55), 0 12px 32px rgba(0,0,0,0.4)',
            duration: 0.3,
          }, '<')
          .to(c1, { y: 0, scale: 1, duration: 0.45, ease: 'power2.inOut', delay: 1.2 })
          .to(c1, { boxShadow: 'none', duration: 0.3 }, '<')
        break

      case 'cut':
        // Deck splits cleanly into two halves
        if (c2) {
          tl.to(c1, { y: -42, duration: 0.4, ease: 'power2.out' })
            .to(c2, { y: 42, duration: 0.4, ease: 'power2.out' }, '<')
            .to(c1, { y: 0, duration: 0.4, ease: 'power2.inOut', delay: 0.8 })
            .to(c2, { y: 0, duration: 0.4, ease: 'power2.inOut' }, '<')
        }
        break

      default: {
        // Use a standalone tween — nested repeat:-1 inside repeat:-1 causes a memory leak
        tl.kill()
        tlRef.current = null
        const floatTween = gsap.to(c1, { y: -10, duration: 1.8, ease: 'sine.inOut', yoyo: true, repeat: -1 })
        return () => { floatTween.kill() }
      }
    }

    return () => { tl.kill() }
  }, [animation, active])

  const showThree = animation === 'fan'
  const showTwo = ['shuffle', 'cut'].includes(animation)

  return (
    <div
      ref={containerRef}
      className="flex items-center justify-center py-8"
      style={{ perspective: 800, minHeight: 160, position: 'relative' }}
    >
      {/* Shadow beneath cards */}
      <div
        style={{
          position: 'absolute',
          bottom: 20,
          left: '50%',
          transform: 'translateX(-50%)',
          width: showThree ? 200 : 100,
          height: 16,
          borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(0,0,0,0.5) 0%, transparent 70%)',
          filter: 'blur(6px)',
          transition: 'width 0.4s',
        }}
      />

      {/* Fan/three-card layout */}
      {showThree ? (
        <div style={{ position: 'relative', width: 160, height: 120, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div ref={card1Ref} style={{ position: 'absolute', transformOrigin: 'bottom center', zIndex: 1 }}>
            <PlayingCard suit={CARDS[0].suit} value={CARDS[0].value} scale={0.95} />
          </div>
          <div ref={card2Ref} style={{ position: 'absolute', transformOrigin: 'bottom center', zIndex: 2 }}>
            <PlayingCard suit={CARDS[1].suit} value={CARDS[1].value} scale={0.95} />
          </div>
          <div ref={card3Ref} style={{ position: 'absolute', transformOrigin: 'bottom center', zIndex: 1 }}>
            <PlayingCard suit={CARDS[2].suit} value={CARDS[2].value} scale={0.95} />
          </div>
        </div>
      ) : showTwo ? (
        <div style={{ position: 'relative', width: 180, height: 110, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0 }}>
          <div ref={card1Ref} style={{ position: 'absolute', left: '50%', marginLeft: -36, zIndex: 2 }}>
            <PlayingCard suit={CARDS[0].suit} value={CARDS[0].value} scale={0.95} />
          </div>
          <div ref={card2Ref} style={{ position: 'absolute', left: '50%', marginLeft: -36, zIndex: 1 }}>
            <PlayingCard suit={CARDS[1].suit} value={CARDS[1].value} scale={0.95} faceDown />
          </div>
        </div>
      ) : (
        /* Single card */
        <div ref={card1Ref} style={{ transformOrigin: 'center center' }}>
          <PlayingCard
            suit={CARDS[0].suit}
            value={CARDS[0].value}
            scale={1.05}
            glowing={animation === 'reveal'}
          />
        </div>
      )}
    </div>
  )
}
