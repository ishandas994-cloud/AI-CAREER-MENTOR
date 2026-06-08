import React, { useState } from 'react'
import InterviewQuestions from '../components/interview/InterviewQuestions'
 
const stats = [
  { label: 'Questions Practiced', value: '24', icon: '✅', color: 'var(--green)' },
  { label: 'Topics Covered', value: '3/4', icon: '📚', color: 'var(--blue)' },
  { label: 'Bookmarked', value: '7', icon: '🔖', color: 'var(--accent)' },
  { label: 'Mock Sessions', value: '2', icon: '🎤', color: 'var(--purple)' },
]
 
export default function Interview() {
  const [mockMode, setMockMode] = useState(false)
  const [timer, setTimer] = useState(120)
  const [running, setRunning] = useState(false)
 
  React.useEffect(() => {
    if (!running) return
    const id = setInterval(() => setTimer(t => t > 0 ? t - 1 : 0), 1000)
    return () => clearInterval(id)
  }, [running])
 
  const fmt = s => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`
 
  return (
    <div>
      {/* Header */}
      <div className="fade-up" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h1 className="section-title" style={{ fontSize: 28 }}>Interview Prep</h1>
          <p className="section-subtitle">AI-generated questions tailored to your target role.</p>
        </div>
        <button
          className="btn"
          onClick={() => setMockMode(m => !m)}
          style={{
            background: mockMode ? 'var(--orange)' : 'var(--bg-card)',
            color: mockMode ? '#fff' : 'var(--text-primary)',
            border: `1px solid ${mockMode ? 'var(--orange)' : 'var(--border)'}`,
            fontWeight: 600, fontSize: 14
          }}
        >
          🎤 {mockMode ? 'Exit Mock Mode' : 'Start Mock Interview'}
        </button>
      </div>
 
      {/* Mock mode banner */}
      {mockMode && (
        <div className="card fade-up" style={{
          marginBottom: 20, display: 'flex', alignItems: 'center', gap: 16,
          background: 'rgba(251,146,60,0.1)', border: '1px solid var(--orange)44'
        }}>
          <div style={{ fontSize: 28 }}>🎤</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--orange)' }}>Mock Interview Mode</div>
            <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Answer each question aloud. Use the timer to simulate real conditions.</div>
          </div>
          {/* Timer */}
          <div style={{
            fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 28,
            color: timer < 30 ? 'var(--orange)' : 'var(--text-primary)',
            minWidth: 80, textAlign: 'center'
          }}>{fmt(timer)}</div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="btn btn-primary" style={{ fontSize: 13, padding: '8px 16px' }}
              onClick={() => setRunning(r => !r)}>
              {running ? '⏸ Pause' : '▶ Start'}
            </button>
            <button className="btn btn-ghost" style={{ fontSize: 13, padding: '8px 16px' }}
              onClick={() => { setTimer(120); setRunning(false) }}>
              ↺ Reset
            </button>
          </div>
        </div>
      )}
 
      {/* Stats row */}
      <div className="grid-4 fade-up fade-up-1" style={{ marginBottom: 24 }}>
        {stats.map(s => (
          <div key={s.label} className="card" style={{ padding: '16px', display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{
              width: 40, height: 40, borderRadius: 10, fontSize: 18,
              background: s.color + '22', display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0
            }}>{s.icon}</div>
            <div>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 20, color: s.color }}>{s.value}</div>
              <div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>{s.label}</div>
            </div>
          </div>
        ))}
      </div>
 
      {/* Questions generator */}
      <div className="fade-up fade-up-2">
        <InterviewQuestions />
      </div>
    </div>
  )
}