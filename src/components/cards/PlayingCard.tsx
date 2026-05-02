'use client'

import React from 'react'

export type Suit = '♠' | '♥' | '♦' | '♣'
export type CardValue = 'A' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | 'J' | 'Q' | 'K'

interface PlayingCardProps {
  suit: Suit
  value: CardValue
  faceDown?: boolean
  scale?: number
  glowing?: boolean
  style?: React.CSSProperties
  className?: string
}

const isRed = (suit: Suit) => suit === '♥' || suit === '♦'

// Pip layout grid: each value maps to [row][col] positions (3x5 grid, 0-indexed)
// col: 0=left, 1=center, 2=right  row: 0=top ... 4=bottom
const PIP_LAYOUTS: Record<string, [number, number][]> = {
  'A':  [[2, 1]],
  '2':  [[0, 1], [4, 1]],
  '3':  [[0, 1], [2, 1], [4, 1]],
  '4':  [[0, 0], [0, 2], [4, 0], [4, 2]],
  '5':  [[0, 0], [0, 2], [2, 1], [4, 0], [4, 2]],
  '6':  [[0, 0], [0, 2], [2, 0], [2, 2], [4, 0], [4, 2]],
  '7':  [[0, 0], [0, 2], [1, 1], [2, 0], [2, 2], [4, 0], [4, 2]],
  '8':  [[0, 0], [0, 2], [1, 1], [2, 0], [2, 2], [3, 1], [4, 0], [4, 2]],
  '9':  [[0, 0], [0, 2], [1, 0], [1, 2], [2, 1], [3, 0], [3, 2], [4, 0], [4, 2]],
  '10': [[0, 0], [0, 2], [1, 0], [1, 1], [1, 2], [3, 0], [3, 1], [3, 2], [4, 0], [4, 2]],
}

function PipGrid({ suit, value, color, size }: { suit: Suit; value: CardValue; color: string; size: number }) {
  const pips = PIP_LAYOUTS[value]
  if (!pips) return null

  const pipSize = size * 0.13
  const gridW = size * 0.52
  const gridH = size * 0.62
  const colX = [0, gridW / 2, gridW]
  const rowY = [0, gridH * 0.25, gridH * 0.5, gridH * 0.75, gridH]

  return (
    <div
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: gridW,
        height: gridH,
      }}
    >
      {pips.map(([row, col], i) => {
        const shouldFlip = row > 2 || (row === 2 && col === 1 && value === 'A')
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: colX[col],
              top: rowY[row],
              transform: `translate(-50%, -50%) ${shouldFlip && row >= 3 ? 'rotate(180deg)' : ''}`,
              fontSize: pipSize,
              lineHeight: 1,
              color,
              userSelect: 'none',
            }}
          >
            {suit}
          </div>
        )
      })}
    </div>
  )
}

function FaceCard({ suit, value, color, size }: { suit: Suit; value: CardValue; color: string; size: number }) {
  const label = value === 'J' ? 'J' : value === 'Q' ? 'Q' : 'K'
  return (
    <div
      style={{
        position: 'absolute',
        inset: size * 0.07,
        border: `1px solid ${color}40`,
        borderRadius: size * 0.03,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        background: `${color}08`,
      }}
    >
      <div style={{ fontSize: size * 0.3, color, fontFamily: 'var(--font-display)', fontWeight: 900, lineHeight: 1 }}>
        {label}
      </div>
      <div style={{ fontSize: size * 0.2, color, lineHeight: 1, marginTop: 2 }}>{suit}</div>
    </div>
  )
}

export function PlayingCard({
  suit,
  value,
  faceDown = false,
  scale = 1,
  glowing = false,
  style,
  className = '',
}: PlayingCardProps) {
  const W = 72 * scale
  const H = 100 * scale
  const color = isRed(suit) ? '#dc2626' : '#1a1a2e'
  const cornerSize = W * 0.18
  const isFaceCard = ['J', 'Q', 'K'].includes(value)

  if (faceDown) {
    return (
      <div
        className={className}
        style={{
          width: W,
          height: H,
          borderRadius: W * 0.08,
          background: 'linear-gradient(135deg, #1a1a3e 0%, #0d0d1f 100%)',
          border: '1.5px solid rgba(245,200,66,0.3)',
          boxShadow: glowing
            ? '0 0 20px rgba(245,200,66,0.4), 0 8px 24px rgba(0,0,0,0.6)'
            : '0 4px 16px rgba(0,0,0,0.6)',
          position: 'relative',
          overflow: 'hidden',
          flexShrink: 0,
          ...style,
        }}
      >
        {/* Card back pattern */}
        <div
          style={{
            position: 'absolute',
            inset: W * 0.07,
            borderRadius: W * 0.04,
            border: '1px solid rgba(245,200,66,0.2)',
            background: `repeating-linear-gradient(
              45deg,
              rgba(245,200,66,0.04) 0px,
              rgba(245,200,66,0.04) 2px,
              transparent 2px,
              transparent 8px
            )`,
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: '50%',
            transform: 'translate(-50%,-50%)',
            width: W * 0.35,
            height: H * 0.35,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: W * 0.28,
            color: 'rgba(245,200,66,0.4)',
          }}
        >
          ✦
        </div>
      </div>
    )
  }

  return (
    <div
      className={className}
      style={{
        width: W,
        height: H,
        borderRadius: W * 0.08,
        background: '#ffffff',
        border: '1.5px solid #e5e7eb',
        boxShadow: glowing
          ? '0 0 24px rgba(245,200,66,0.5), 0 8px 24px rgba(0,0,0,0.5)'
          : '0 4px 20px rgba(0,0,0,0.5)',
        position: 'relative',
        overflow: 'hidden',
        flexShrink: 0,
        ...style,
      }}
    >
      {/* Inner border */}
      <div
        style={{
          position: 'absolute',
          inset: W * 0.055,
          borderRadius: W * 0.04,
          border: `0.5px solid ${color}20`,
          pointerEvents: 'none',
        }}
      />

      {/* Top-left corner */}
      <div
        style={{
          position: 'absolute',
          top: W * 0.06,
          left: W * 0.07,
          lineHeight: 1,
          textAlign: 'center',
        }}
      >
        <div style={{ fontSize: cornerSize, fontWeight: 800, color, fontFamily: 'Georgia, serif', lineHeight: 1 }}>
          {value}
        </div>
        <div style={{ fontSize: cornerSize * 0.85, color, lineHeight: 1 }}>{suit}</div>
      </div>

      {/* Bottom-right corner (rotated) */}
      <div
        style={{
          position: 'absolute',
          bottom: W * 0.06,
          right: W * 0.07,
          lineHeight: 1,
          textAlign: 'center',
          transform: 'rotate(180deg)',
        }}
      >
        <div style={{ fontSize: cornerSize, fontWeight: 800, color, fontFamily: 'Georgia, serif', lineHeight: 1 }}>
          {value}
        </div>
        <div style={{ fontSize: cornerSize * 0.85, color, lineHeight: 1 }}>{suit}</div>
      </div>

      {/* Center — pip grid or face card */}
      {isFaceCard ? (
        <FaceCard suit={suit} value={value} color={color} size={W} />
      ) : (
        <PipGrid suit={suit} value={value} color={color} size={W} />
      )}
    </div>
  )
}
