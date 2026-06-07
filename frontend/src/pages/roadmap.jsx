
import React from 'react'
import LearningRoadmap from '../components/roadmap/LearningRoadmap'
import ProgressTracker from '../components/roadmap/ProgressTracker'
 
export default function Roadmap() {
  return (
    <div>
      <div className="fade-up" style={{ marginBottom: 32 }}>
        <h1 className="section-title" style={{ fontSize: 28 }}>Learning Roadmap</h1>
        <p className="section-subtitle">Your personalized path to Full Stack Engineer — AI-generated based on your skill gaps.</p>
      </div>
 
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 24, alignItems: 'start' }}>
        <div className="fade-up fade-up-1">
          <LearningRoadmap />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div className="fade-up fade-up-1">
            <ProgressTracker />
          </div>
 
          {/* Recommended Resources */}
          <div className="card fade-up fade-up-2">
            <div className="section-title" style={{ fontSize: 15, marginBottom: 4 }}>Top Resources</div>
            <div style={{ color: 'var(--text-secondary)', fontSize: 13, marginBottom: 14 }}>AI-recommended for you</div>
            {[
              { name: 'TypeScript Handbook', type: 'Docs', color: 'var(--blue)' },
              { name: 'Docker in 100 Seconds', type: 'Video', color: 'var(--purple)' },
              { name: 'ByteByteGo Newsletter', type: 'Blog', color: 'var(--accent)' },
              { name: 'Pramp Mock Interviews', type: 'Practice', color: 'var(--green)' },
            ].map(r => (
              <div key={r.name} style={{
                display: 'flex', alignItems: 'center', gap: 10, padding: '10px 0',
                borderBottom: '1px solid var(--border)', cursor: 'pointer'
              }}>
                <span className="badge" style={{ background: r.color + '22', color: r.color, fontSize: 9, flexShrink: 0 }}>{r.type}</span>
                <span style={{ fontSize: 13, fontWeight: 500 }}>{r.name}</span>
                <span style={{ marginLeft: 'auto', color: 'var(--text-muted)', fontSize: 12 }}>→</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}