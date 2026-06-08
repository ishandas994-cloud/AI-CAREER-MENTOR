import React, { useState } from 'react'
import ResumeUploader from '../components/resume/ResumeUploader'
import ResumePreview from '../components/resume/ResumePreview'
 
const skillsList = [
  { name: 'JavaScript', level: 90 },
  { name: 'React', level: 85 },
  { name: 'Node.js', level: 70 },
  { name: 'TypeScript', level: 40 },
  { name: 'Python', level: 60 },
  { name: 'Docker', level: 20 },
  { name: 'SQL', level: 80 },
  { name: 'System Design', level: 30 },
]
 
const goals = ['Full Stack Engineer', 'Frontend Lead', 'Software Architect']
 
function SkillBar({ skill }) {
  const color = skill.level >= 70 ? 'var(--green)' : skill.level >= 50 ? 'var(--accent)' : 'var(--orange)'
  return (
    <div style={{ marginBottom: 12 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5, fontSize: 13 }}>
        <span style={{ fontWeight: 500 }}>{skill.name}</span>
        <span style={{ color: 'var(--text-muted)' }}>{skill.level}%</span>
      </div>
      <div style={{ height: 6, background: 'var(--bg-secondary)', borderRadius: 99 }}>
        <div style={{
          height: '100%', borderRadius: 99,
          width: `${skill.level}%`,
          background: `linear-gradient(90deg, ${color}, ${color}88)`,
          transition: 'width 1s ease'
        }} />
      </div>
    </div>
  )
}
 
export default function Profile() {
  const [activeGoal, setActiveGoal] = useState(goals[0])
  const [editMode, setEditMode] = useState(false)
  const [name, setName] = useState('John Doe')
  const [title, setTitle] = useState('Aspiring Full Stack Engineer')
  const [bio, setBio] = useState('Computer Science graduate passionate about building user-centric applications. Actively improving my TypeScript and Docker skills.')
  const [tab, setTab] = useState('overview')
 
  const tabs = ['overview', 'resume', 'skills', 'settings']
 
  return (
    <div>
      {/* Header */}
      <div className="fade-up" style={{ marginBottom: 28 }}>
        <h1 className="section-title" style={{ fontSize: 28 }}>My Profile</h1>
        <p className="section-subtitle">Manage your career profile, resume and target goals.</p>
      </div>
 
      <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: 24, alignItems: 'start' }}>
 
        {/* Left sidebar profile card */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div className="card fade-up" style={{ textAlign: 'center' }}>
            {/* Avatar */}
            <div style={{
              width: 80, height: 80, borderRadius: '50%', margin: '0 auto 14px',
              background: 'linear-gradient(135deg, var(--blue), var(--purple))',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 28, color: '#fff',
              border: '3px solid var(--border)'
            }}>JD</div>
 
            {editMode ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <input value={name} onChange={e => setName(e.target.value)}
                  style={{
                    background: 'var(--bg-secondary)', border: '1px solid var(--border)',
                    borderRadius: 'var(--radius-sm)', padding: '7px 10px',
                    color: 'var(--text-primary)', fontSize: 14, textAlign: 'center'
                  }} />
                <input value={title} onChange={e => setTitle(e.target.value)}
                  style={{
                    background: 'var(--bg-secondary)', border: '1px solid var(--border)',
                    borderRadius: 'var(--radius-sm)', padding: '7px 10px',
                    color: 'var(--text-secondary)', fontSize: 12, textAlign: 'center'
                  }} />
                <textarea value={bio} onChange={e => setBio(e.target.value)} rows={3}
                  style={{
                    background: 'var(--bg-secondary)', border: '1px solid var(--border)',
                    borderRadius: 'var(--radius-sm)', padding: '7px 10px', resize: 'none',
                    color: 'var(--text-secondary)', fontSize: 12
                  }} />
                <button className="btn btn-primary" style={{ justifyContent: 'center', fontSize: 13 }}
                  onClick={() => setEditMode(false)}>Save Changes</button>
              </div>
            ) : (
              <>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 17, marginBottom: 2 }}>{name}</div>
                <div style={{ color: 'var(--text-secondary)', fontSize: 13, marginBottom: 10 }}>{title}</div>
                <p style={{ color: 'var(--text-secondary)', fontSize: 12, lineHeight: 1.6, marginBottom: 14 }}>{bio}</p>
                <button className="btn btn-ghost" style={{ width: '100%', justifyContent: 'center', fontSize: 13 }}
                  onClick={() => setEditMode(true)}>✎ Edit Profile</button>
              </>
            )}
          </div>
 
          {/* Career goals */}
          <div className="card fade-up fade-up-1">
            <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '.08em', marginBottom: 12 }}>
              Career Goal
            </div>
            {goals.map(g => (
              <button key={g} onClick={() => setActiveGoal(g)} style={{
                display: 'flex', alignItems: 'center', gap: 8,
                width: '100%', padding: '9px 10px', borderRadius: 'var(--radius-sm)',
                background: activeGoal === g ? 'var(--accent-dim)' : 'transparent',
                border: `1px solid ${activeGoal === g ? 'var(--border-accent)' : 'transparent'}`,
                color: activeGoal === g ? 'var(--accent)' : 'var(--text-secondary)',
                cursor: 'pointer', fontSize: 13, fontWeight: activeGoal === g ? 600 : 400,
                transition: 'all var(--transition)', marginBottom: 4, textAlign: 'left'
              }}>
                <span>{activeGoal === g ? '✦' : '○'}</span>
                {g}
              </button>
            ))}
          </div>
        </div>
 
        {/* Right main area */}
        <div>
          {/* Tabs */}
          <div className="fade-up" style={{
            display: 'flex', gap: 4, background: 'var(--bg-card)',
            border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)',
            padding: 4, marginBottom: 20, width: 'fit-content'
          }}>
            {tabs.map(t => (
              <button key={t} onClick={() => setTab(t)} style={{
                padding: '7px 16px', borderRadius: 6, fontSize: 13, fontWeight: 500,
                cursor: 'pointer', transition: 'all var(--transition)', textTransform: 'capitalize',
                background: tab === t ? 'var(--accent)' : 'transparent',
                color: tab === t ? '#0F1117' : 'var(--text-secondary)',
                fontWeight: tab === t ? 700 : 400
              }}>{t}</button>
            ))}
          </div>
 
          {/* Tab: Overview */}
          {tab === 'overview' && (
            <div className="fade-up" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {/* Stats */}
              <div className="grid-3">
                {[
                  { label: 'Profile Completion', val: '78%', color: 'var(--accent)' },
                  { label: 'Skills Matched', val: '14/22', color: 'var(--blue)' },
                  { label: 'Jobs Applied', val: '3', color: 'var(--purple)' },
                ].map(s => (
                  <div key={s.label} className="card" style={{ textAlign: 'center' }}>
                    <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 26, color: s.color }}>{s.val}</div>
                    <div style={{ color: 'var(--text-secondary)', fontSize: 12 }}>{s.label}</div>
                  </div>
                ))}
              </div>
              {/* Skill bars */}
              <div className="card">
                <div className="section-title" style={{ fontSize: 15, marginBottom: 16 }}>Skill Levels</div>
                {skillsList.map(s => <SkillBar key={s.name} skill={s} />)}
              </div>
            </div>
          )}
 
          {/* Tab: Resume */}
          {tab === 'resume' && (
            <div className="fade-up" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <ResumeUploader />
              <ResumePreview />
            </div>
          )}
 
          {/* Tab: Skills */}
          {tab === 'skills' && (
            <div className="card fade-up">
              <div className="section-title" style={{ fontSize: 15, marginBottom: 4 }}>Manage Skills</div>
              <p style={{ color: 'var(--text-secondary)', fontSize: 13, marginBottom: 20 }}>
                Add or remove skills to improve your job match accuracy.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {skillsList.map(s => (
                  <span key={s.name} className="badge" style={{
                    background: 'var(--blue-dim)', color: 'var(--blue)',
                    cursor: 'pointer', padding: '5px 12px', fontSize: 12
                  }}>
                    {s.name} ✕
                  </span>
                ))}
                <span className="badge" style={{
                  background: 'var(--bg-secondary)', color: 'var(--text-muted)',
                  border: '1px dashed var(--border)', cursor: 'pointer', fontSize: 12
                }}>+ Add skill</span>
              </div>
            </div>
          )}
 
          {/* Tab: Settings */}
          {tab === 'settings' && (
            <div className="card fade-up" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div className="section-title" style={{ fontSize: 15 }}>Account Settings</div>
              {[
                { label: 'Email Notifications', desc: 'Get notified about new job matches', enabled: true },
                { label: 'Weekly Report', desc: 'Receive your weekly progress summary', enabled: true },
                { label: 'AI Suggestions', desc: 'Allow AI to suggest career improvements', enabled: true },
                { label: 'Public Profile', desc: 'Let recruiters find your profile', enabled: false },
              ].map(setting => (
                <div key={setting.label} style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: '14px 0', borderBottom: '1px solid var(--border)'
                }}>
                  <div>
                    <div style={{ fontWeight: 500, fontSize: 14 }}>{setting.label}</div>
                    <div style={{ color: 'var(--text-secondary)', fontSize: 12 }}>{setting.desc}</div>
                  </div>
                  <div style={{
                    width: 44, height: 24, borderRadius: 999,
                    background: setting.enabled ? 'var(--accent)' : 'var(--bg-secondary)',
                    border: `1px solid ${setting.enabled ? 'var(--accent)' : 'var(--border)'}`,
                    position: 'relative', cursor: 'pointer', transition: 'background var(--transition)'
                  }}>
                    <div style={{
                      width: 18, height: 18, borderRadius: '50%', background: '#fff',
                      position: 'absolute', top: 2,
                      left: setting.enabled ? 22 : 2,
                      transition: 'left var(--transition)',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.3)'
                    }} />
                  </div>
                </div>
              ))}
              <button className="btn btn-ghost" style={{ color: 'var(--orange)', borderColor: 'var(--orange)33', alignSelf: 'flex-start' }}>
                Delete Account
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}