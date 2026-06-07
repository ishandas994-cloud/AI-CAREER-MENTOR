import React from 'react'
import { useNavigate } from 'react-router-dom'
import ResumeUploader from '../components/resume/ResumeUploader'
 
const features = [
  {
    icon: '🔍',
    title: 'Resume Analyzer',
    desc: 'AI scans your resume and extracts skills, experience, and education in seconds.',
    color: 'var(--blue)'
  },
  {
    icon: '📊',
    title: 'Skill Gap Finder',
    desc: 'Compare your profile with top job requirements and see exactly what\'s missing.',
    color: 'var(--purple)'
  },
  {
    icon: '🗺️',
    title: 'Learning Roadmap',
    desc: 'Get a personalized, step-by-step plan to reach your dream job.',
    color: 'var(--accent)'
  },
  {
    icon: '💬',
    title: 'Interview Prep',
    desc: 'AI-generated interview questions tailored to the role you\'re targeting.',
    color: 'var(--green)'
  },
]
 
export default function Home() {
  const navigate = useNavigate()
 
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', position: 'relative', overflow: 'hidden' }}>
 
      {/* Background glow blobs */}
      <div style={{
        position: 'absolute', top: -200, left: '50%', transform: 'translateX(-50%)',
        width: 700, height: 700, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(79,142,247,0.08) 0%, transparent 70%)',
        pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute', top: 300, right: -200,
        width: 500, height: 500, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(232,255,71,0.06) 0%, transparent 70%)',
        pointerEvents: 'none'
      }} />
 
      <div style={{ maxWidth: 1080, margin: '0 auto', padding: '0 32px' }}>
 
        {/* Top nav */}
        <header style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '24px 0'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 36, height: 36, background: 'var(--accent)', borderRadius: 10,
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#0F1117" strokeWidth="2.5">
                <path d="M12 2L2 19h20L12 2z"/>
                <line x1="8" y1="14" x2="16" y2="14"/>
              </svg>
            </div>
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 18 }}>CareerAI</span>
          </div>
          <button className="btn btn-primary" onClick={() => navigate('/dashboard')}>
            Go to Dashboard →
          </button>
        </header>
 
        {/* Hero */}
        <section style={{ textAlign: 'center', padding: '80px 0 64px' }}>
          <div className="badge fade-up" style={{
            background: 'var(--accent-dim)', color: 'var(--accent)',
            border: '1px solid var(--border-accent)', marginBottom: 24,
            display: 'inline-flex'
          }}>
            ✦ AI-Powered Career Intelligence
          </div>
 
          <h1 className="fade-up fade-up-1" style={{
            fontFamily: 'var(--font-display)', fontSize: 'clamp(40px, 6vw, 72px)',
            fontWeight: 800, lineHeight: 1.05, letterSpacing: '-0.03em',
            marginBottom: 24, maxWidth: 800, margin: '0 auto 24px'
          }}>
            Your AI mentor for<br/>
            <span style={{ color: 'var(--accent)' }}>landing the right job</span>
          </h1>
 
          <p className="fade-up fade-up-2" style={{
            color: 'var(--text-secondary)', fontSize: 18, maxWidth: 520,
            margin: '0 auto 48px', lineHeight: 1.7
          }}>
            Upload your resume. Get instant skill gap analysis, a personalized learning roadmap, and AI-generated interview questions.
          </p>
 
          {/* CTA buttons */}
          <div className="fade-up fade-up-3" style={{ display: 'flex', gap: 12, justifyContent: 'center', marginBottom: 72 }}>
            <button className="btn btn-primary" style={{ fontSize: 16, padding: '14px 32px' }}
              onClick={() => navigate('/dashboard')}>
              Analyze My Resume
            </button>
            <button className="btn btn-ghost" style={{ fontSize: 16, padding: '14px 32px' }}>
              Watch Demo
            </button>
          </div>
 
          {/* Stats */}
          <div className="fade-up fade-up-4" style={{
            display: 'flex', gap: 48, justifyContent: 'center',
            padding: '28px 48px', background: 'var(--bg-card)',
            border: '1px solid var(--border)', borderRadius: 'var(--radius)',
            display: 'inline-flex'
          }}>
            {[
              { val: '12K+', label: 'Students helped' },
              { val: '94%', label: 'Placement rate' },
              { val: '300+', label: 'Job roles covered' },
            ].map(s => (
              <div key={s.label} style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 800, color: 'var(--accent)' }}>{s.val}</div>
                <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </section>
 
        {/* Upload section */}
        <section style={{ marginBottom: 80 }}>
          <ResumeUploader compact />
        </section>
 
        {/* Features */}
        <section style={{ paddingBottom: 80 }}>
          <h2 style={{
            fontFamily: 'var(--font-display)', fontSize: 36, fontWeight: 800,
            textAlign: 'center', marginBottom: 8
          }}>
            Everything you need to get hired
          </h2>
          <p style={{ color: 'var(--text-secondary)', textAlign: 'center', marginBottom: 40 }}>
            One platform — from resume to offer letter.
          </p>
          <div className="grid-4">
            {features.map((f, i) => (
              <div key={f.title} className="card fade-up" style={{ animationDelay: `${i * 0.08}s` }}
                onMouseEnter={e => e.currentTarget.style.borderColor = f.color + '55'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
              >
                <div style={{
                  width: 44, height: 44, borderRadius: 12,
                  background: f.color + '20',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 22, marginBottom: 14
                }}>{f.icon}</div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, marginBottom: 8 }}>{f.title}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.6 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </section>
 
      </div>
    </div>
  )
}