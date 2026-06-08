import React, { useState } from 'react'
 
const difficultyColor = {
  Beginner: 'var(--green)',
  Intermediate: 'var(--accent)',
  Advanced: 'var(--orange)',
}
 
const impactColor = {
  High: 'var(--purple)',
  Medium: 'var(--blue)',
  Low: 'var(--text-muted)',
}
 
export default function ProjectCard({ project, index }) {
  const [added, setAdded] = useState(false)
  const [expanded, setExpanded] = useState(false)
 
  return (
    <div
      className="card fade-up"
      style={{
        animationDelay: `${index * 0.08}s`,
        border: `1px solid ${added ? 'var(--accent)44' : 'var(--border)'}`,
        background: added ? 'var(--accent-dim)' : 'var(--bg-card)',
        transition: 'all var(--transition)',
        position: 'relative',
        overflow: 'hidden',
      }}
      onMouseEnter={e => !added && (e.currentTarget.style.borderColor = project.color + '55')}
      onMouseLeave={e => !added && (e.currentTarget.style.borderColor = 'var(--border)')}
    >
      {/* Color accent top bar */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 3,
        background: `linear-gradient(90deg, ${project.color}, transparent)`,
      }} />
 
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 10 }}>
        <div style={{
          width: 40, height: 40, borderRadius: 10, flexShrink: 0,
          background: project.color + '22',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 20
        }}>
          {project.icon}
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 15, marginBottom: 2 }}>
            {project.title}
          </div>
          <div style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.5 }}>
            {project.desc}
          </div>
        </div>
      </div>
 
      {/* Tags */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 12 }}>
        {project.tech.map(t => (
          <span key={t} className="badge" style={{
            background: 'var(--bg-secondary)', color: 'var(--text-secondary)', fontSize: 10
          }}>{t}</span>
        ))}
        <span className="badge" style={{
          background: difficultyColor[project.difficulty] + '22',
          color: difficultyColor[project.difficulty], fontSize: 10
        }}>
          {project.difficulty}
        </span>
        <span className="badge" style={{
          background: impactColor[project.impact] + '22',
          color: impactColor[project.impact], fontSize: 10
        }}>
          ✦ {project.impact} impact
        </span>
      </div>
 
      {/* Expandable steps */}
      {expanded && (
        <div style={{
          marginBottom: 14, padding: '12px 14px',
          background: 'var(--bg-secondary)', borderRadius: 'var(--radius-sm)',
          border: '1px solid var(--border)'
        }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '.08em', marginBottom: 10 }}>
            Build Steps
          </div>
          {project.steps.map((step, i) => (
            <div key={i} style={{
              display: 'flex', gap: 10, alignItems: 'flex-start',
              marginBottom: i < project.steps.length - 1 ? 10 : 0
            }}>
              <div style={{
                width: 20, height: 20, borderRadius: '50%', flexShrink: 0,
                background: project.color + '33', color: project.color,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 11, fontWeight: 700
              }}>{i + 1}</div>
              <span style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.5 }}>{step}</span>
            </div>
          ))}
        </div>
      )}
 
      {/* Footer */}
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <button
          onClick={() => setExpanded(e => !e)}
          className="btn btn-ghost"
          style={{ fontSize: 12, padding: '6px 12px' }}
        >
          {expanded ? '▲ Less' : '▼ View steps'}
        </button>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
          <span style={{ fontSize: 12, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 4 }}>
            ⏱ {project.time}
          </span>
          <button
            onClick={() => setAdded(a => !a)}
            className="btn"
            style={{
              fontSize: 12, padding: '6px 14px',
              background: added ? 'var(--accent)' : 'var(--bg-secondary)',
              color: added ? '#0F1117' : 'var(--text-primary)',
              border: `1px solid ${added ? 'var(--accent)' : 'var(--border)'}`,
              fontWeight: added ? 700 : 500,
              transition: 'all var(--transition)'
            }}
          >
            {added ? '✓ Added' : '+ Add to plan'}
          </button>
        </div>
      </div>
    </div>
  )
}