import React from 'react'
 
const weeks = [
  { week: 'W1', hours: 12 },
  { week: 'W2', hours: 18 },
  { week: 'W3', hours: 8 },
  { week: 'W4', hours: 22 },
  { week: 'W5', hours: 15 },
  { week: 'W6', hours: 20 },
  { week: 'W7', hours: 5 },
]
 
const maxH = Math.max(...weeks.map(w => w.hours))
 
export default function ProgressTracker() {
  return (
    <div className="card">
      <div style={{ marginBottom: 16 }}>
        <div className="section-title" style={{ fontSize: 16 }}>Weekly Study Hours</div>
        <div style={{ color: 'var(--text-secondary)', fontSize: 13 }}>Last 7 weeks</div>
      </div>
      <div style={{ display: 'flex', gap: 8, alignItems: 'flex-end', height: 100 }}>
        {weeks.map(w => (
          <div key={w.week} style={{
            flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6
          }}>
            <div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>{w.hours}h</div>
            <div style={{
              width: '100%', borderRadius: 6,
              height: `${(w.hours / maxH) * 80}px`,
              background: w.week === 'W7'
                ? 'var(--accent)'
                : 'linear-gradient(180deg, var(--blue), var(--purple))',
              transition: 'height 0.8s ease',
              minHeight: 4
            }} />
            <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{w.week}</div>
          </div>
        ))}
      </div>
      <div style={{
        marginTop: 16, padding: '10px 12px',
        background: 'var(--accent-dim)', borderRadius: 'var(--radius-sm)',
        border: '1px solid var(--border-accent)',
        fontSize: 13, color: 'var(--accent)', fontWeight: 500
      }}>
        ⚡ You studied 100h in 6 weeks — great pace!
      </div>
    </div>
  )
}
