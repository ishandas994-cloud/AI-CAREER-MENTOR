import React, { useState } from 'react'
 
const phases = [
  {
    phase: 'Phase 1', title: 'Strengthen Foundations', duration: '4 weeks',
    color: 'var(--blue)',
    steps: [
      { title: 'TypeScript Fundamentals', resource: 'TypeScript Docs + Scrimba', hours: 20, done: true },
      { title: 'Advanced React Patterns', resource: 'React.gg', hours: 15, done: true },
      { title: 'Git & GitHub Mastery', resource: 'Pro Git Book', hours: 8, done: false },
    ]
  },
  {
    phase: 'Phase 2', title: 'Backend & APIs', duration: '6 weeks',
    color: 'var(--purple)',
    steps: [
      { title: 'Node.js + Express Deep Dive', resource: 'The Odin Project', hours: 25, done: false },
      { title: 'RESTful API Design', resource: 'MDN + FreeCodeCamp', hours: 12, done: false },
      { title: 'PostgreSQL & Prisma ORM', resource: 'Neon Tutorial', hours: 18, done: false },
    ]
  },
  {
    phase: 'Phase 3', title: 'DevOps & Deployment', duration: '4 weeks',
    color: 'var(--accent)',
    steps: [
      { title: 'Docker & Containerization', resource: 'Docker Docs', hours: 16, done: false },
      { title: 'CI/CD with GitHub Actions', resource: 'GitHub Docs', hours: 10, done: false },
      { title: 'Cloud Deployment (AWS/Vercel)', resource: 'AWS Free Tier', hours: 14, done: false },
    ]
  },
  {
    phase: 'Phase 4', title: 'System Design', duration: '3 weeks',
    color: 'var(--green)',
    steps: [
      { title: 'System Design Fundamentals', resource: 'ByteByteGo', hours: 20, done: false },
      { title: 'Mock Design Interviews', resource: 'Pramp', hours: 8, done: false },
    ]
  },
]
 
export default function LearningRoadmap() {
  const [expanded, setExpanded] = useState({ 0: true })
  const [checked, setChecked] = useState({ '0-0': true, '0-1': true })
 
  const toggle = i => setExpanded(e => ({ ...e, [i]: !e[i] }))
  const toggleCheck = key => setChecked(c => ({ ...c, [key]: !c[key] }))
 
  const totalHours = phases.flatMap(p => p.steps).reduce((a, s) => a + s.hours, 0)
  const doneHours = phases.flatMap((p, pi) =>
    p.steps.map((s, si) => checked[`${pi}-${si}`] ? s.hours : 0)
  ).reduce((a, b) => a + b, 0)
  const progress = Math.round((doneHours / totalHours) * 100)
 
  return (
    <div>
      {/* Progress overview */}
      <div className="card" style={{ marginBottom: 20 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>Overall Progress</div>
            <div style={{ color: 'var(--text-secondary)', fontSize: 13 }}>{doneHours}h of {totalHours}h completed</div>
          </div>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 28, color: 'var(--accent)' }}>
            {progress}%
          </div>
        </div>
        <div style={{ height: 8, background: 'var(--bg-secondary)', borderRadius: 99 }}>
          <div style={{
            height: '100%', borderRadius: 99, width: `${progress}%`,
            background: 'linear-gradient(90deg, var(--blue), var(--accent))',
            transition: 'width 1s ease'
          }} />
        </div>
      </div>
 
      {/* Phases */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {phases.map((phase, pi) => (
          <div key={pi} className="card" style={{ padding: 0, overflow: 'hidden' }}>
            {/* Phase header */}
            <button onClick={() => toggle(pi)} style={{
              width: '100%', display: 'flex', alignItems: 'center', gap: 14,
              padding: '16px 20px', background: 'none', cursor: 'pointer',
              textAlign: 'left', transition: 'background var(--transition)',
              borderBottom: expanded[pi] ? '1px solid var(--border)' : 'none'
            }}
              onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-secondary)'}
              onMouseLeave={e => e.currentTarget.style.background = 'none'}
            >
              <div style={{
                width: 10, height: 10, borderRadius: '50%', flexShrink: 0,
                background: phase.color, boxShadow: `0 0 8px ${phase.color}66`
              }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '.08em' }}>
                  {phase.phase} · {phase.duration}
                </div>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 15 }}>{phase.title}</div>
              </div>
              <span style={{ color: 'var(--text-muted)', fontSize: 20, transform: expanded[pi] ? 'rotate(180deg)' : '', transition: 'transform .2s' }}>
                ⌄
              </span>
            </button>
 
            {/* Steps */}
            {expanded[pi] && (
              <div style={{ padding: '12px 20px 16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
                {phase.steps.map((step, si) => {
                  const key = `${pi}-${si}`
                  const isDone = !!checked[key]
                  return (
                    <div key={si} style={{
                      display: 'flex', alignItems: 'flex-start', gap: 12,
                      padding: '12px 14px', borderRadius: 'var(--radius-sm)',
                      background: isDone ? 'var(--green-dim)' : 'var(--bg-secondary)',
                      border: `1px solid ${isDone ? 'var(--green)22' : 'var(--border)'}`,
                      transition: 'all var(--transition)'
                    }}>
                      <button onClick={() => toggleCheck(key)} style={{
                        width: 20, height: 20, borderRadius: 6, flexShrink: 0, marginTop: 2,
                        border: `2px solid ${isDone ? 'var(--green)' : 'var(--border)'}`,
                        background: isDone ? 'var(--green)' : 'transparent',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        transition: 'all var(--transition)', cursor: 'pointer'
                      }}>
                        {isDone && <svg width="11" height="11" fill="none" stroke="#fff" strokeWidth="2.5" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>}
                      </button>
                      <div style={{ flex: 1 }}>
                        <div style={{
                          fontWeight: 500, fontSize: 14, marginBottom: 2,
                          textDecoration: isDone ? 'line-through' : 'none',
                          color: isDone ? 'var(--text-secondary)' : 'var(--text-primary)'
                        }}>{step.title}</div>
                        <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>📚 {step.resource}</div>
                      </div>
                      <span className="badge" style={{ background: 'var(--bg-card)', color: 'var(--text-secondary)', fontSize: 10, flexShrink: 0 }}>
                        {step.hours}h
                      </span>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}