import React, { useState } from 'react'
 
const jobs = [
  { title: 'Full Stack Engineer', company: 'Stripe', match: 87, type: 'Remote', salary: '$120k–$160k', tags: ['React', 'Node.js', 'PostgreSQL'] },
  { title: 'Frontend Developer', company: 'Notion', match: 94, type: 'Hybrid', salary: '$100k–$140k', tags: ['React', 'TypeScript', 'CSS'] },
  { title: 'Software Engineer', company: 'Atlassian', match: 72, type: 'On-site', salary: '$110k–$150k', tags: ['Python', 'Java', 'AWS'] },
]
 
function MatchRing({ pct }) {
  const r = 22, c = 2 * Math.PI * r
  const color = pct >= 85 ? 'var(--green)' : pct >= 70 ? 'var(--accent)' : 'var(--orange)'
  return (
    <svg width="56" height="56" style={{ transform: 'rotate(-90deg)' }}>
      <circle cx="28" cy="28" r={r} fill="none" stroke="var(--bg-secondary)" strokeWidth="4" />
      <circle cx="28" cy="28" r={r} fill="none" stroke={color} strokeWidth="4"
        strokeDasharray={c} strokeDashoffset={c - (pct / 100) * c}
        strokeLinecap="round" style={{ transition: 'stroke-dashoffset 1s ease' }}
      />
      <text x="28" y="32" textAnchor="middle" style={{
        transform: 'rotate(90deg) translate(0, -56px)',
        fontSize: 12, fontWeight: 700, fill: color, fontFamily: 'var(--font-display)'
      }}>{pct}%</text>
    </svg>
  )
}
 
export default function JobMatchCard() {
  const [saved, setSaved] = useState({})
 
  return (
    <div className="card">
      <div style={{ marginBottom: 20 }}>
        <div className="section-title" style={{ fontSize: 16 }}>Job Matches</div>
        <div style={{ color: 'var(--text-secondary)', fontSize: 13 }}>Based on your resume & skills</div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {jobs.map((j, i) => (
          <div key={i} className="card" style={{
            padding: '14px 16px',
            background: 'var(--bg-secondary)', border: '1px solid var(--border)',
            transition: 'border-color var(--transition)',
          }}
            onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--blue)44'}
            onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
          >
            <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
              <MatchRing pct={j.match} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 2 }}>{j.title}</div>
                    <div style={{ color: 'var(--text-secondary)', fontSize: 13 }}>{j.company} · {j.type}</div>
                  </div>
                  <button onClick={() => setSaved(s => ({ ...s, [i]: !s[i] }))} style={{
                    color: saved[i] ? 'var(--accent)' : 'var(--text-muted)',
                    transition: 'color var(--transition)', flexShrink: 0
                  }}>
                    <svg width="16" height="16" fill={saved[i] ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
                    </svg>
                  </button>
                </div>
                <div style={{ marginTop: 8, display: 'flex', flexWrap: 'wrap', gap: 6, alignItems: 'center' }}>
                  <span style={{ color: 'var(--green)', fontSize: 12, fontWeight: 600 }}>{j.salary}</span>
                  {j.tags.map(t => (
                    <span key={t} className="badge" style={{ background: 'var(--bg-card)', color: 'var(--text-secondary)', fontSize: 10 }}>{t}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button className="btn btn-ghost" style={{ width: '100%', justifyContent: 'center', marginTop: 12, fontSize: 13 }}>
        View all 48 matches →
      </button>
    </div>
  )
}