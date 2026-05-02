'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { CardAnimation } from '@/sanity/types'

interface AnimatedCardStepProps {
  animation: CardAnimation
  active: boolean
}

const suitPairs = [
  { suit: '♠', value: 'A', red: false },
  { suit: '♥', value: 'K', red: true },
  { suit: '♦', value: 'Q', red: true },
  { suit: '♣', value: 'J', red: false },
]

export function AnimatedCardStep({ animation, active }: AnimatedCardStepProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const card1Ref = useRef<HTMLDivElement>(null)
  const card2Ref = useRef<HTMLDivElement>(null)
  const tlRef = useRef<gsap.core.Timeline | null>(null)

  useEffect(() => {
    if (!active || !containerRef.current) return
    const c1 = card1Ref.current
    const c2 = card2Ref.current
    if (!c1) return

    tlRef.current?.kill()
    gsap.set([c1, c2 ?? c1], { clearProps: 'all' })

    const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 })
    tlRef.current = tl

    switch (animation) {
      case 'flip':
        tl.to(c1, { rotateY: 90, duration: 0.4, ease: 'power2.in' })
          .set(c1, { '--face': '1' } as gsap.TweenVars)
          .to(c1, { rotateY: 0, duration: 0.4, ease: 'power2.out' })
          .to(c1, { rotateY: -90, duration: 0.4, ease: 'power2.in', delay: 1 })
          .set(c1, { '--face': '0' } as gsap.TweenVars)
          .to(c1, { rotateY: 0, duration: 0.4, ease: 'power2.out' })
        break

      case 'fan':
        if (c2) {
          tl.to(c1, { rotation: -20, x: -24, duration: 0.5, ease: 'back.out(1.5)' })
            .to(c2, { rotation: 20, x: 24, duration: 0.5, ease: 'back.out(1.5)' }, '<')
            .to([c1, c2], { rotation: 0, x: 0, duration: 0.5, ease: 'back.in(1.5)', delay: 1 })
        }
        break

      case 'shuffle':
        if (c2) {
          tl.to(c1, { x: -20, rotation: -8, duration: 0.3 })
            .to(c2, { x: 20, rotation: 8, duration: 0.3 }, '<')
            .to(c1, { x: 0, rotation: 0, duration: 0.3 }, '+=0.2')
            .to(c2, { x: 0, rotation: 0, duration: 0.3 }, '<')
        }
        break

      case 'reveal':
        tl.to(c1, { y: -28, scale: 1.08, duration: 0.5, ease: 'back.out(2)' })
          .to(c1, { boxShadow: '0 0 30px rgba(245,200,66,0.5)', duration: 0.3 }, '<')
          .to(c1, { y: 0, scale: 1, duration: 0.4, ease: 'power2.in', delay: 1 })
          .to(c1, { boxShadow: '0 0 0px transparent', duration: 0.3 }, '<')
        break

      case 'cut':
        if (c2) {
          tl.to(c1, { y: -36, duration: 0.4, ease: 'power2.out' })
            .to(c2, { y: 36, duration: 0.4, ease: 'power2.out' }, '<')
            .to(c1, { y: 0, duration: 0.4, ease: 'power2.in', delay: 0.5 })
            .to(c2, { y: 0, duration: 0.4, ease: 'power2.in' }, '<')
        }
        break

      default:
        tl.to(c1, { y: -8, duration: 1.5, ease: 'sine.inOut', yoyo: true, repeat: -1 })
    }

    return () => { tl.kill() }
  }, [animation, active])

  const cardStyle: React.CSSProperties = {
    width: 64,
    height: 90,
    borderRadius: 6,
    background: 'linear-gradient(145deg, #1e1e2e 0%, #11111a 100%)',
    border: '1px solid var(--border-mid)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: 6,
    boxShadow: '0 4px 16px rgba(0,0,0,0.5)',
  }

  const showTwo = ['fan', 'shuffle', 'cut'].includes(animation)
  const pair1 = suitPairs[0]
  const pair2 = suitPairs[1]

  return (
    <div
      ref={containerRef}
      className="flex items-center justify-center gap-2 py-6"
      style={{ perspective: 600 }}
    >
      <div ref={card1Ref} style={cardStyle}>
        <div style={{ fontSize: 12, fontWeight: 700, color: pair1.red ? '#f87171' : 'var(--text-primary)', lineHeight: 1 }}>
          {pair1.value}<br />{pair1.suit}
        </div>
        <div style={{ textAlign: 'center', fontSize: 24, color: pair1.red ? '#f87171' : 'var(--text-primary)' }}>{pair1.suit}</div>
        <div style={{ fontSize: 12, fontWeight: 700, color: pair1.red ? '#f87171' : 'var(--text-primary)', transform: 'rotate(180deg)', lineHeight: 1, alignSelf: 'flex-end' }}>
          {pair1.value}<br />{pair1.suit}
        </div>
      </div>

      {showTwo && (
        <div ref={card2Ref} style={{ ...cardStyle, position: 'absolute', zIndex: -1 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: pair2.red ? '#f87171' : 'var(--text-primary)', lineHeight: 1 }}>
            {pair2.value}<br />{pair2.suit}
          </div>
          <div style={{ textAlign: 'center', fontSize: 24, color: pair2.red ? '#f87171' : 'var(--text-primary)' }}>{pair2.suit}</div>
          <div style={{ fontSize: 12, fontWeight: 700, color: pair2.red ? '#f87171' : 'var(--text-primary)', transform: 'rotate(180deg)', lineHeight: 1, alignSelf: 'flex-end' }}>
            {pair2.value}<br />{pair2.suit}
          </div>
        </div>
      )}
    </div>
  )
}
