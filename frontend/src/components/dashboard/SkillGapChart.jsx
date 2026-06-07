import React from 'react'
 
const skills = [
  { name: 'React', yours: 90, required: 85, status: 'met' },
  { name: 'TypeScript', yours: 40, required: 80, status: 'gap' },
  { name: 'Node.js', yours: 70, required: 75, status: 'gap' },
  { name: 'Docker', yours: 20, required: 70, status: 'gap' },
  { name: 'SQL', yours: 85, required: 70, status: 'met' },
  { name: 'System Design', yours: 30, required: 80, status: 'gap' },
]
 
function Bar({ label, value, max = 100, color }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12 }}>
      <div style={{ width: 4, borderRadius: 2, height: 10, background: color }} />
      <span style={{ color: 'var(--text-secondary)', minWidth: 56 }}>{label}</span>
      <div style={{ flex: 1, height: 6, background: 'var(--bg-secondary)', borderRadius: 99 }}>
        <div style={{
          height: '100%', borderRadius: 99,
          width: `${(value / max) * 100}%`,
          background: color,
          transition: 'width 1s cubic-bezier(0.4,0,0.2,1)'
        }} />
      </div>
      <span style={{ color: 'var(--text-muted)', minWidth: 28, textAlign: 'right' }}>{value}%</span>
    </div>
  )
}
 
export default function SkillGapChart() {
  return (
    <div className="card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
        <div>
          <div className="section-title" style={{ fontSize: 16 }}>Skill Gap Analysis</div>
          <div style={{ color: 'var(--text-secondary)', fontSize: 13 }}>vs. Full Stack Engineer role</div>
        </div>
        <span className="badge" style={{ background: 'var(--orange-dim)', color: 'var(--orange)' }}>4 gaps found</span>
      </div>
 
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {skills.map(skill => (
          <div key={skill.name} style={{
            padding: '12px 14px',
            background: skill.status === 'gap' ? 'var(--orange-dim)' : 'var(--green-dim)',
            borderRadius: 'var(--radius-sm)',
            border: `1px solid ${skill.status === 'gap' ? 'var(--orange)' : 'var(--green)'}22`,
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ fontWeight: 500, fontSize: 14 }}>{skill.name}</span>
              <span className="badge" style={{
                background: skill.status === 'gap' ? 'var(--orange-dim)' : 'var(--green-dim)',
                color: skill.status === 'gap' ? 'var(--orange)' : 'var(--green)',
                fontSize: 10
              }}>
                {skill.status === 'gap' ? `▲ Need ${skill.required - skill.yours}% more` : '✓ Met'}
              </span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <Bar label="Yours" value={skill.yours} color="var(--blue)" />
              <Bar label="Required" value={skill.required} color={skill.status === 'gap' ? 'var(--orange)' : 'var(--green)'} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}