import React from 'react'
 
export default function ResumePreview({ data }) {
  const resume = data || {
    name: 'John Doe',
    title: 'Full Stack Developer',
    email: 'john@example.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    summary: 'Passionate developer with 2+ years building scalable web applications. Experienced in React, Node.js, and cloud deployments.',
    skills: ['JavaScript', 'React', 'Node.js', 'Python', 'PostgreSQL', 'Git', 'Docker (learning)'],
    experience: [
      {
        role: 'Frontend Developer',
        company: 'TechCorp',
        duration: 'Jun 2022 – Present',
        bullets: [
          'Built and maintained 5+ React applications serving 50k+ users',
          'Reduced page load time by 40% via code splitting and lazy loading',
          'Collaborated with design team to implement pixel-perfect UIs',
        ]
      },
      {
        role: 'Software Engineering Intern',
        company: 'StartupXY',
        duration: 'Jan 2021 – May 2022',
        bullets: [
          'Developed REST APIs using Node.js & Express',
          'Integrated third-party payment APIs (Stripe, Razorpay)',
        ]
      }
    ],
    education: [
      { degree: 'B.Tech in Computer Science', school: 'MIT University', year: '2022', gpa: '8.4/10' }
    ],
    projects: [
      { name: 'Task Manager App', desc: 'Full-stack Trello clone with real-time sync using Socket.io' },
      { name: 'Portfolio Site', desc: 'Next.js portfolio with Sanity CMS and 98 Lighthouse score' },
    ]
  }
 
  const Section = ({ title, children }) => (
    <div style={{ marginBottom: 20 }}>
      <div style={{
        fontSize: 11, fontWeight: 700, letterSpacing: '.1em',
        textTransform: 'uppercase', color: '#1a56db',
        borderBottom: '1.5px solid #1a56db', paddingBottom: 4, marginBottom: 12
      }}>{title}</div>
      {children}
    </div>
  )
 
  return (
    <div style={{ background: 'var(--bg-card)', borderRadius: 'var(--radius)', border: '1px solid var(--border)', overflow: 'hidden' }}>
      {/* Toolbar */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '12px 16px', borderBottom: '1px solid var(--border)',
        background: 'var(--bg-secondary)'
      }}>
        <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)' }}>📄 Resume Preview</span>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn btn-ghost" style={{ fontSize: 12, padding: '5px 12px' }}>
            ✎ Edit
          </button>
          <button className="btn btn-primary" style={{ fontSize: 12, padding: '5px 12px' }}>
            ↓ Download PDF
          </button>
        </div>
      </div>
 
      {/* Resume "paper" */}
      <div style={{
        margin: 16, background: '#ffffff', borderRadius: 8,
        padding: '32px 36px', color: '#1a202c',
        fontFamily: "'DM Sans', sans-serif", fontSize: 13, lineHeight: 1.6,
        boxShadow: '0 4px 24px rgba(0,0,0,0.3)'
      }}>
        {/* Header */}
        <div style={{ marginBottom: 20, borderBottom: '2px solid #e2e8f0', paddingBottom: 16 }}>
          <h1 style={{ fontSize: 26, fontFamily: 'var(--font-display)', fontWeight: 800, color: '#0f172a', marginBottom: 2 }}>
            {resume.name}
          </h1>
          <div style={{ fontSize: 14, color: '#4a5568', fontWeight: 500, marginBottom: 8 }}>{resume.title}</div>
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', fontSize: 12, color: '#64748b' }}>
            <span>✉ {resume.email}</span>
            <span>📞 {resume.phone}</span>
            <span>📍 {resume.location}</span>
          </div>
        </div>
 
        {/* Summary */}
        <Section title="Summary">
          <p style={{ color: '#4a5568', fontSize: 13 }}>{resume.summary}</p>
        </Section>
 
        {/* Skills */}
        <Section title="Technical Skills">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {resume.skills.map(s => (
              <span key={s} style={{
                background: '#eff6ff', color: '#1a56db', padding: '3px 10px',
                borderRadius: 999, fontSize: 11, fontWeight: 600
              }}>{s}</span>
            ))}
          </div>
        </Section>
 
        {/* Experience */}
        <Section title="Experience">
          {resume.experience.map((e, i) => (
            <div key={i} style={{ marginBottom: i < resume.experience.length - 1 ? 16 : 0 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 14, color: '#0f172a' }}>{e.role}</div>
                  <div style={{ fontSize: 12, color: '#64748b' }}>{e.company}</div>
                </div>
                <div style={{ fontSize: 11, color: '#94a3b8', whiteSpace: 'nowrap' }}>{e.duration}</div>
              </div>
              <ul style={{ paddingLeft: 18, margin: 0 }}>
                {e.bullets.map((b, j) => (
                  <li key={j} style={{ fontSize: 12, color: '#4a5568', marginBottom: 2 }}>{b}</li>
                ))}
              </ul>
            </div>
          ))}
        </Section>
 
        {/* Education */}
        <Section title="Education">
          {resume.education.map((e, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: 13, color: '#0f172a' }}>{e.degree}</div>
                <div style={{ fontSize: 12, color: '#64748b' }}>{e.school} · GPA: {e.gpa}</div>
              </div>
              <div style={{ fontSize: 11, color: '#94a3b8' }}>{e.year}</div>
            </div>
          ))}
        </Section>
 
        {/* Projects */}
        <Section title="Projects">
          {resume.projects.map((p, i) => (
            <div key={i} style={{ marginBottom: i < resume.projects.length - 1 ? 8 : 0 }}>
              <span style={{ fontWeight: 700, color: '#0f172a', fontSize: 13 }}>{p.name}: </span>
              <span style={{ color: '#4a5568', fontSize: 12 }}>{p.desc}</span>
            </div>
          ))}
        </Section>
      </div>
    </div>
  )
}