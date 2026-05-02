'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { PlayingCard, Suit, CardValue } from './PlayingCard'

interface FloatingCardProps {
  suit: Suit
  value: CardValue
  faceDown?: boolean
  scale?: number
  delay?: number
  rotateRange?: [number, number]
  style?: React.CSSProperties
}

export function FloatingCard({
  suit,
  value,
  faceDown = false,
  scale = 1,
  delay = 0,
  rotateRange = [-8, 8],
  style,
}: FloatingCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = cardRef.current
    if (!el) return
    const tl = gsap.timeline({ repeat: -1, yoyo: true })
    tl.to(el, {
      y: -16,
      rotation: rotateRange[1],
      duration: 2.5 + Math.random() * 1.5,
      delay,
      ease: 'sine.inOut',
    }).to(el, {
      y: 6,
      rotation: rotateRange[0],
      duration: 2.5 + Math.random() * 1.5,
      ease: 'sine.inOut',
    })
    return () => { tl.kill() }
  }, [delay, rotateRange])

  return (
    <div ref={cardRef} style={style}>
      <PlayingCard suit={suit} value={value} faceDown={faceDown} scale={scale} />
    </div>
  )
}
