import React from 'react'
 
const stats = [
  { label: 'Profile Score', value: '78%', color: 'var(--accent)', icon: '⚡' },
  { label: 'Skills Matched', value: '14/22', color: 'var(--blue)', icon: '🎯' },
  { label: 'Jobs Matched', value: '48', color: 'var(--purple)', icon: '💼' },
  { label: 'Roadmap Progress', value: '32%', color: 'var(--green)', icon: '🗺️' },
]
 
export default function ProfileSummary() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {/* User card */}
      <div className="card" style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <div style={{
          width: 52, height: 52, borderRadius: '50%', flexShrink: 0,
          background: 'linear-gradient(135deg, var(--blue), var(--purple))',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 20, color: '#fff'
        }}>JD</div>
        <div>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>John Doe</div>
          <div style={{ color: 'var(--text-secondary)', fontSize: 13 }}>Aspiring Full Stack Engineer</div>
          <div style={{ display: 'flex', gap: 8, marginTop: 6 }}>
            <span className="badge" style={{ background: 'var(--green-dim)', color: 'var(--green)', fontSize: 10 }}>2 yrs experience</span>
            <span className="badge" style={{ background: 'var(--blue-dim)', color: 'var(--blue)', fontSize: 10 }}>B.Tech CS</span>
          </div>
        </div>
      </div>
 
      {/* Stats grid */}
      <div className="grid-2">
        {stats.map(s => (
          <div key={s.label} className="card" style={{ padding: '16px', textAlign: 'center' }}
            onMouseEnter={e => e.currentTarget.style.borderColor = s.color + '44'}
            onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
          >
            <div style={{ fontSize: 22, marginBottom: 4 }}>{s.icon}</div>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 22, color: s.color }}>{s.value}</div>
            <div style={{ color: 'var(--text-secondary)', fontSize: 11, marginTop: 2 }}>{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}