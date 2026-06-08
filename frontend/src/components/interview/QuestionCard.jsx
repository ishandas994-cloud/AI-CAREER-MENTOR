import React, { useState } from 'react'
 
const difficultyColor = {
  Easy: 'var(--green)',
  Medium: 'var(--accent)',
  Hard: 'var(--orange)',
}
 
export default function QuestionCard({ data, index }) {
  const [showTip, setShowTip] = useState(false)
  const [bookmarked, setBookmarked] = useState(false)
  const [practiced, setPracticed] = useState(false)
 
  return (
    <div
      className="card fade-up"
      style={{
        animationDelay: `${index * 0.07}s`,
        border: `1px solid ${practiced ? 'var(--green)33' : 'var(--border)'}`,
        background: practiced ? 'var(--green-dim)' : 'var(--bg-card)',
        transition: 'all var(--transition)',
      }}
    >
      {/* Top row */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 12 }}>
        {/* Index badge */}
        <div style={{
          width: 28, height: 28, borderRadius: 8, flexShrink: 0,
          background: 'var(--bg-secondary)', border: '1px solid var(--border)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 13,
          color: 'var(--text-muted)'
        }}>
          {index + 1}
        </div>
 
        {/* Question text */}
        <p style={{ flex: 1, fontWeight: 500, fontSize: 15, lineHeight: 1.55, color: 'var(--text-primary)' }}>
          {data.q}
        </p>
 
        {/* Actions */}
        <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
          <button
            onClick={() => setBookmarked(b => !b)}
            title="Bookmark"
            style={{
              width: 30, height: 30, borderRadius: 8,
              background: bookmarked ? 'var(--accent-dim)' : 'var(--bg-secondary)',
              border: `1px solid ${bookmarked ? 'var(--border-accent)' : 'var(--border)'}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: bookmarked ? 'var(--accent)' : 'var(--text-muted)',
              transition: 'all var(--transition)', cursor: 'pointer'
            }}
          >
            <svg width="14" height="14" fill={bookmarked ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
            </svg>
          </button>
        </div>
      </div>
 
      {/* Footer row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
        {/* Difficulty */}
        <span className="badge" style={{
          background: difficultyColor[data.difficulty] + '22',
          color: difficultyColor[data.difficulty],
          fontSize: 10
        }}>
          {data.difficulty}
        </span>
 
        {/* Hint toggle */}
        <button
          onClick={() => setShowTip(t => !t)}
          className="badge"
          style={{
            background: showTip ? 'var(--blue-dim)' : 'var(--bg-secondary)',
            color: showTip ? 'var(--blue)' : 'var(--text-muted)',
            border: `1px solid ${showTip ? 'var(--blue)33' : 'var(--border)'}`,
            cursor: 'pointer', transition: 'all var(--transition)', fontSize: 10
          }}
        >
          {showTip ? '▲ Hide tip' : '💡 Show tip'}
        </button>
 
        {/* Mark practiced */}
        <button
          onClick={() => setPracticed(p => !p)}
          className="badge"
          style={{
            marginLeft: 'auto',
            background: practiced ? 'var(--green-dim)' : 'var(--bg-secondary)',
            color: practiced ? 'var(--green)' : 'var(--text-muted)',
            border: `1px solid ${practiced ? 'var(--green)33' : 'var(--border)'}`,
            cursor: 'pointer', transition: 'all var(--transition)', fontSize: 10
          }}
        >
          {practiced ? '✓ Practiced' : 'Mark practiced'}
        </button>
      </div>
 
      {/* Tip panel */}
      {showTip && (
        <div style={{
          marginTop: 12,
          padding: '12px 14px',
          background: 'var(--blue-dim)',
          border: '1px solid var(--blue)33',
          borderRadius: 'var(--radius-sm)',
          fontSize: 13,
          color: 'var(--text-secondary)',
          lineHeight: 1.6
        }}>
          <span style={{ color: 'var(--blue)', fontWeight: 600 }}>💡 Tip: </span>
          {data.tip}
        </div>
      )}
    </div>
  )
}