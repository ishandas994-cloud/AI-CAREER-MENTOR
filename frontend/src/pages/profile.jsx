import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectUser, selectUserLoading, selectUserErrors,
  updateUserProfile, clearUserErrors,
} from '../store/userslice'
import ResumeUploader from '../components/resume/ResumeUploader'
import ResumePreview  from '../components/resume/ResumePreview'

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
          height: '100%', borderRadius: 99, width: `${skill.level}%`,
          background: `linear-gradient(90deg, ${color}, ${color}88)`,
          transition: 'width 1s ease'
        }} />
      </div>
    </div>
  )
}

export default function Profile() {
  const dispatch = useDispatch()
  const user     = useSelector(selectUser)
  const loading  = useSelector(selectUserLoading)
  const errors   = useSelector(selectUserErrors)

  const [editMode, setEditMode] = useState(false)
  const [tab, setTab]           = useState('overview')
  const [name,  setName]        = useState('')
  const [title, setTitle]       = useState('')
  const [bio,   setBio]         = useState('')
  const [settings, setSettings] = useState({
    emailNotifications: true, weeklyReport: true,
    aiSuggestions: true, publicProfile: false,
  })
  const [newSkill, setNewSkill] = useState('')
  const [newGoal,  setNewGoal]  = useState('')
  const [activeGoal, setActiveGoal] = useState('')

  // Sync local form state from Redux whenever user changes
  useEffect(() => {
    if (user) {
      setName(user.name   || '')
      setTitle(user.title || '')
      setBio(user.bio     || '')
      setSettings(s => ({ ...s, ...(user.settings || {}) }))
      if (user.targetRoles?.length > 0 && !activeGoal) {
        setActiveGoal(user.targetRoles[0])
      }
    }
  }, [user])

  const initials = user?.name
    ? user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    : 'U'

  const skills      = user?.skills      || []
  const targetRoles = user?.targetRoles || []

  const handleSaveProfile = async () => {
    const res = await dispatch(updateUserProfile({ name, title, bio }))
    if (!res.error) setEditMode(false)
  }

  const handleToggleSetting = (key) => {
    const updated = { ...settings, [key]: !settings[key] }
    setSettings(updated)
    dispatch(updateUserProfile({ settings: updated }))
  }

  const handleAddSkill = () => {
    const trimmed = newSkill.trim()
    if (!trimmed) return
    if (skills.find(s => s.name.toLowerCase() === trimmed.toLowerCase())) return
    dispatch(updateUserProfile({ skills: [...skills, { name: trimmed, level: 50 }] }))
    setNewSkill('')
  }

  const handleRemoveSkill = (skillName) => {
    dispatch(updateUserProfile({ skills: skills.filter(s => s.name !== skillName) }))
  }

  const handleAddGoal = () => {
    const trimmed = newGoal.trim()
    if (!trimmed || targetRoles.includes(trimmed)) return
    dispatch(updateUserProfile({ targetRoles: [...targetRoles, trimmed] }))
    setActiveGoal(trimmed)
    setNewGoal('')
  }

  const handleRemoveGoal = (goal) => {
    const updated = targetRoles.filter(g => g !== goal)
    dispatch(updateUserProfile({ targetRoles: updated }))
    if (activeGoal === goal) setActiveGoal(updated[0] || '')
  }

  const tabs = ['overview', 'resume', 'skills', 'settings']

  return (
    <div>
      <div className="fade-up" style={{ marginBottom: 28 }}>
        <h1 className="section-title" style={{ fontSize: 28 }}>My Profile</h1>
        <p className="section-subtitle">Manage your career profile, resume and goals.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: 24, alignItems: 'start' }}>

        {/* ── Left sidebar ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div className="card fade-up" style={{ textAlign: 'center' }}>
            <div style={{
              width: 80, height: 80, borderRadius: '50%', margin: '0 auto 14px',
              background: 'linear-gradient(135deg, var(--blue), var(--purple))',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 28, color: '#fff',
              border: '3px solid var(--border)'
            }}>{initials}</div>

            {editMode ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <input value={name} onChange={e => setName(e.target.value)} placeholder="Full name"
                  style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', padding: '7px 10px', color: 'var(--text-primary)', fontSize: 14, textAlign: 'center' }} />
                <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Job title"
                  style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', padding: '7px 10px', color: 'var(--text-secondary)', fontSize: 12, textAlign: 'center' }} />
                <textarea value={bio} onChange={e => setBio(e.target.value)} rows={3} placeholder="Short bio…"
                  style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', padding: '7px 10px', resize: 'none', color: 'var(--text-secondary)', fontSize: 12 }} />
                {errors.update && <p style={{ color: 'var(--orange)', fontSize: 12 }}>{errors.update}</p>}
                <button className="btn btn-primary" style={{ justifyContent: 'center', fontSize: 13 }}
                  onClick={handleSaveProfile} disabled={loading.update}>
                  {loading.update ? 'Saving…' : 'Save Changes'}
                </button>
                <button className="btn btn-ghost" style={{ justifyContent: 'center', fontSize: 13 }}
                  onClick={() => { setEditMode(false); dispatch(clearUserErrors()) }}>
                  Cancel
                </button>
              </div>
            ) : (
              <>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 17, marginBottom: 2 }}>
                  {user?.name || '—'}
                </div>
                <div style={{ color: 'var(--text-secondary)', fontSize: 13, marginBottom: 10 }}>
                  {user?.title || 'No title set'}
                </div>
                <p style={{ color: 'var(--text-secondary)', fontSize: 12, lineHeight: 1.6, marginBottom: 14 }}>
                  {user?.bio || 'No bio yet. Click Edit to add one.'}
                </p>
                <button className="btn btn-ghost" style={{ width: '100%', justifyContent: 'center', fontSize: 13 }}
                  onClick={() => setEditMode(true)}>
                  ✎ Edit Profile
                </button>
              </>
            )}
          </div>

          {/* Career Goals */}
          <div className="card fade-up fade-up-1">
            <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '.08em', marginBottom: 12 }}>Career Goals</div>
            {targetRoles.length === 0 && (
              <p style={{ color: 'var(--text-muted)', fontSize: 12, marginBottom: 10 }}>No goals yet.</p>
            )}
            {targetRoles.map(g => (
              <div key={g} style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 4 }}>
                <button onClick={() => setActiveGoal(g)} style={{
                  flex: 1, display: 'flex', alignItems: 'center', gap: 8, padding: '9px 10px',
                  borderRadius: 'var(--radius-sm)',
                  background: activeGoal === g ? 'var(--accent-dim)' : 'transparent',
                  border: `1px solid ${activeGoal === g ? 'var(--border-accent)' : 'transparent'}`,
                  color: activeGoal === g ? 'var(--accent)' : 'var(--text-secondary)',
                  cursor: 'pointer', fontSize: 13, fontWeight: activeGoal === g ? 600 : 400,
                  transition: 'all var(--transition)', textAlign: 'left'
                }}>
                  <span>{activeGoal === g ? '✦' : '○'}</span>{g}
                </button>
                <button onClick={() => handleRemoveGoal(g)}
                  style={{ color: 'var(--text-muted)', fontSize: 16, padding: '0 4px', cursor: 'pointer', background: 'none', border: 'none' }}>×</button>
              </div>
            ))}
            <div style={{ display: 'flex', gap: 6, marginTop: 8 }}>
              <input value={newGoal} onChange={e => setNewGoal(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleAddGoal()}
                placeholder="Add a goal…"
                style={{ flex: 1, background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', padding: '6px 10px', color: 'var(--text-primary)', fontSize: 12 }} />
              <button className="btn btn-primary" style={{ fontSize: 12, padding: '6px 12px' }} onClick={handleAddGoal}>+</button>
            </div>
          </div>
        </div>

        {/* ── Right area ── */}
        <div>
          {/* Tabs */}
          <div className="fade-up" style={{
            display: 'flex', gap: 4, background: 'var(--bg-card)',
            border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)',
            padding: 4, marginBottom: 20, width: 'fit-content'
          }}>
            {tabs.map(t => (
              <button key={t} onClick={() => setTab(t)} style={{
                padding: '7px 16px', borderRadius: 6, fontSize: 13, cursor: 'pointer',
                textTransform: 'capitalize', transition: 'all var(--transition)',
                background: tab === t ? 'var(--accent)' : 'transparent',
                color: tab === t ? '#0F1117' : 'var(--text-secondary)',
                fontWeight: tab === t ? 700 : 400, border: 'none'
              }}>{t}</button>
            ))}
          </div>

          {/* Overview tab */}
          {tab === 'overview' && (
            <div className="fade-up" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div className="grid-3">
                {[
                  { label: 'Profile Completion', val: user ? '78%' : '0%', color: 'var(--accent)' },
                  { label: 'Skills Added',        val: skills.length,       color: 'var(--blue)' },
                  { label: 'Career Goals',        val: targetRoles.length,  color: 'var(--purple)' },
                ].map(s => (
                  <div key={s.label} className="card" style={{ textAlign: 'center' }}>
                    <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 26, color: s.color }}>{s.val}</div>
                    <div style={{ color: 'var(--text-secondary)', fontSize: 12 }}>{s.label}</div>
                  </div>
                ))}
              </div>
              <div className="card">
                <div className="section-title" style={{ fontSize: 15, marginBottom: 16 }}>Skill Levels</div>
                {skills.length === 0
                  ? <p style={{ color: 'var(--text-muted)', fontSize: 13 }}>No skills added yet — go to the Skills tab.</p>
                  : skills.map(s => <SkillBar key={s.name} skill={s} />)
                }
              </div>
            </div>
          )}

          {/* Resume tab */}
          {tab === 'resume' && (
            <div className="fade-up" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <ResumeUploader />
              <ResumePreview />
            </div>
          )}

          {/* Skills tab */}
          {tab === 'skills' && (
            <div className="card fade-up">
              <div className="section-title" style={{ fontSize: 15, marginBottom: 4 }}>Manage Skills</div>
              <p style={{ color: 'var(--text-secondary)', fontSize: 13, marginBottom: 20 }}>
                Add or remove skills to improve your job match accuracy.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
                {skills.map(s => (
                  <span key={s.name} className="badge"
                    style={{ background: 'var(--blue-dim)', color: 'var(--blue)', padding: '5px 12px', fontSize: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
                    {s.name}
                    <button onClick={() => handleRemoveSkill(s.name)}
                      style={{ background: 'none', border: 'none', color: 'var(--blue)', cursor: 'pointer', fontSize: 14, lineHeight: 1 }}>✕</button>
                  </span>
                ))}
                {skills.length === 0 && <p style={{ color: 'var(--text-muted)', fontSize: 13 }}>No skills yet.</p>}
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <input value={newSkill} onChange={e => setNewSkill(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleAddSkill()}
                  placeholder="Type a skill and press Enter…"
                  style={{ flex: 1, background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', padding: '8px 12px', color: 'var(--text-primary)', fontSize: 13 }} />
                <button className="btn btn-primary" onClick={handleAddSkill} style={{ fontSize: 13 }}>+ Add</button>
              </div>
            </div>
          )}

          {/* Settings tab — fixed: all toggles are now functional */}
          {tab === 'settings' && (
            <div className="card fade-up" style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              <div className="section-title" style={{ fontSize: 15, marginBottom: 4 }}>Account Settings</div>
              <p style={{ color: 'var(--text-secondary)', fontSize: 13, marginBottom: 20 }}>Changes are saved automatically when you toggle.</p>
              {[
                { key: 'emailNotifications', label: 'Email Notifications', desc: 'Get notified about new job matches' },
                { key: 'weeklyReport',       label: 'Weekly Report',       desc: 'Receive your weekly progress summary' },
                { key: 'aiSuggestions',      label: 'AI Suggestions',      desc: 'Allow AI to suggest career improvements' },
                { key: 'publicProfile',      label: 'Public Profile',      desc: 'Let recruiters find your profile' },
              ].map(s => (
                <div key={s.key} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 0', borderBottom: '1px solid var(--border)' }}>
                  <div>
                    <div style={{ fontWeight: 500, fontSize: 14 }}>{s.label}</div>
                    <div style={{ color: 'var(--text-secondary)', fontSize: 12 }}>{s.desc}</div>
                  </div>
                  <div onClick={() => handleToggleSetting(s.key)} style={{
                    width: 44, height: 24, borderRadius: 999, flexShrink: 0,
                    background: settings[s.key] ? 'var(--accent)' : 'var(--bg-secondary)',
                    border: `1px solid ${settings[s.key] ? 'var(--accent)' : 'var(--border)'}`,
                    position: 'relative', cursor: 'pointer', transition: 'background var(--transition)'
                  }}>
                    <div style={{
                      width: 18, height: 18, borderRadius: '50%', background: '#fff',
                      position: 'absolute', top: 2, left: settings[s.key] ? 22 : 2,
                      transition: 'left var(--transition)', boxShadow: '0 1px 3px rgba(0,0,0,0.3)'
                    }} />
                  </div>
                </div>
              ))}
              <button className="btn btn-ghost"
                style={{ color: 'var(--orange)', borderColor: 'var(--orange)33', alignSelf: 'flex-start', marginTop: 20 }}>
                Delete Account
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}