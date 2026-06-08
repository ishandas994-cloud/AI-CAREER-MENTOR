import React from 'react'
 
const MOCK = {
  name: 'John Doe',
  email: 'john@example.com',
  phone: '+1 (555) 123-4567',
  skills: ['JavaScript', 'React', 'Node.js', 'Python', 'SQL', 'Git'],
  education: [{ degree: 'B.Tech Computer Science', school: 'MIT University', year: '2022' }],
  experience: [
    { role: 'Frontend Developer', company: 'TechCorp', duration: '2022–2024' },
    { role: 'Intern', company: 'StartupXY', duration: '2021' },
  ],
}
 
export default function ResumeParser({ data = MOCK }) {
  return (
    <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, paddingBottom: 16, borderBottom: '1px solid var(--border)' }}>
        <div style={{
          width: 48, height: 48, borderRadius: '50%',
          background: 'linear-gradient(135deg, var(--blue), var(--purple))',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 18, color: '#fff'
        }}>
          {data.name.split(' ').map(n => n[0]).join('')}
        </div>
        <div>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 17 }}>{data.name}</div>
          <div style={{ color: 'var(--text-secondary)', fontSize: 13 }}>{data.email} · {data.phone}</div>
        </div>
      </div>
 
      {/* Skills */}
      <div>
        <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '.08em', marginBottom: 10 }}>
          Extracted Skills
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {data.skills.map(s => (
            <span key={s} className="badge" style={{ background: 'var(--blue-dim)', color: 'var(--blue)' }}>{s}</span>
          ))}
        </div>
      </div>
 
      {/* Experience */}
      <div>
        <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '.08em', marginBottom: 10 }}>
          Experience
        </div>
        {data.experience.map((e, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: i < data.experience.length - 1 ? '1px solid var(--border)' : 'none' }}>
            <div>
              <div style={{ fontWeight: 500 }}>{e.role}</div>
              <div style={{ color: 'var(--text-secondary)', fontSize: 13 }}>{e.company}</div>
            </div>
            <div style={{ color: 'var(--text-muted)', fontSize: 13 }}>{e.duration}</div>
          </div>
        ))}
      </div>
 
      {/* Education */}
      <div>
        <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '.08em', marginBottom: 10 }}>
          Education
        </div>
        {data.education.map((e, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontWeight: 500 }}>{e.degree}</div>
              <div style={{ color: 'var(--text-secondary)', fontSize: 13 }}>{e.school}</div>
            </div>
            <div style={{ color: 'var(--text-muted)', fontSize: 13 }}>{e.year}</div>
          </div>
        ))}
      </div>
    </div>
  )
}