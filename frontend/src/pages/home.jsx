import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  loginUser, registerUser,
  selectIsAuthenticated, selectUserLoading, selectUserErrors, clearUserErrors,
} from '../store/userslice'

const features = [
  { icon: '🔍', title: 'Resume Analyzer',  desc: 'AI scans your resume and extracts skills, experience, and education in seconds.', color: 'var(--blue)' },
  { icon: '📊', title: 'Skill Gap Finder', desc: "Compare your profile with top job requirements and see exactly what's missing.", color: 'var(--purple)' },
  { icon: '🗺️', title: 'Learning Roadmap', desc: 'Get a personalized, step-by-step plan to reach your dream job.', color: 'var(--accent)' },
  { icon: '💬', title: 'Interview Prep',   desc: "AI-generated interview questions tailored to the role you're targeting.", color: 'var(--green)' },
]

// ── Auth Modal ────────────────────────────────────────────────
function AuthModal({ onClose }) {
  const dispatch        = useDispatch()
  const navigate        = useNavigate()
  const loading         = useSelector(selectUserLoading)
  const errors          = useSelector(selectUserErrors)
  const isAuthenticated = useSelector(selectIsAuthenticated)

  const [mode, setMode]         = useState('login')   // 'login' | 'register'
  const [name, setName]         = useState('')
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [localErr, setLocalErr] = useState('')

  // Once auth succeeds, navigate to dashboard
  React.useEffect(() => {
    if (isAuthenticated) {
      onClose()
      navigate('/dashboard')
    }
  }, [isAuthenticated])

  const handleSubmit = async () => {
    setLocalErr('')
    dispatch(clearUserErrors())

    if (!email || !password) { setLocalErr('Email and password are required.'); return }
    if (mode === 'register' && !name) { setLocalErr('Name is required.'); return }
    if (password.length < 6) { setLocalErr('Password must be at least 6 characters.'); return }

    if (mode === 'login') {
      await dispatch(loginUser({ email, password }))
    } else {
      await dispatch(registerUser({ name, email, password }))
    }
  }

  const switchMode = () => {
    setMode(m => m === 'login' ? 'register' : 'login')
    setLocalErr('')
    dispatch(clearUserErrors())
  }

  const isLoading = loading.login || loading.register
  const serverErr = errors.login || errors.register

  return (
    // Backdrop
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 1000,
        background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 16,
      }}
    >
      {/* Modal box */}
      <div
        onClick={e => e.stopPropagation()}
        style={{
          width: '100%', maxWidth: 420,
          background: 'var(--bg-secondary)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius)',
          padding: 36,
          position: 'relative',
        }}
      >
        {/* Close */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute', top: 14, right: 14,
            background: 'none', border: 'none',
            color: 'var(--text-muted)', fontSize: 22, cursor: 'pointer',
            lineHeight: 1,
          }}
        >×</button>

        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 28 }}>
          <div style={{
            width: 32, height: 32, background: 'var(--accent)', borderRadius: 8,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#0F1117" strokeWidth="2.5">
              <path d="M12 2L2 19h20L12 2z"/>
              <line x1="8" y1="14" x2="16" y2="14"/>
            </svg>
          </div>
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 17 }}>CareerAI</span>
        </div>

        {/* Title */}
        <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 22, marginBottom: 4 }}>
          {mode === 'login' ? 'Welcome back' : 'Create your account'}
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: 13, marginBottom: 24 }}>
          {mode === 'login'
            ? "Sign in to your CareerAI account."
            : "Start your AI-powered career journey."}
        </p>

        {/* Fields */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {mode === 'register' && (
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: 5 }}>Full Name</label>
              <input
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Ishan Das"
                onKeyDown={e => e.key === 'Enter' && handleSubmit()}
                style={{
                  width: '100%', background: 'var(--bg-card)',
                  border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)',
                  padding: '10px 12px', color: 'var(--text-primary)', fontSize: 14,
                  boxSizing: 'border-box',
                }}
              />
            </div>
          )}

          <div>
            <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: 5 }}>Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="you@example.com"
              onKeyDown={e => e.key === 'Enter' && handleSubmit()}
              style={{
                width: '100%', background: 'var(--bg-card)',
                border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)',
                padding: '10px 12px', color: 'var(--text-primary)', fontSize: 14,
                boxSizing: 'border-box',
              }}
            />
          </div>

          <div>
            <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: 5 }}>Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Min. 6 characters"
              onKeyDown={e => e.key === 'Enter' && handleSubmit()}
              style={{
                width: '100%', background: 'var(--bg-card)',
                border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)',
                padding: '10px 12px', color: 'var(--text-primary)', fontSize: 14,
                boxSizing: 'border-box',
              }}
            />
          </div>
        </div>

        {/* Error */}
        {(localErr || serverErr) && (
          <div style={{
            marginTop: 12, padding: '10px 12px',
            background: 'var(--orange-dim)', border: '1px solid var(--orange)44',
            borderRadius: 'var(--radius-sm)', color: 'var(--orange)', fontSize: 13,
          }}>
            {localErr || serverErr}
          </div>
        )}

        {/* Submit */}
        <button
          className="btn btn-primary"
          onClick={handleSubmit}
          disabled={isLoading}
          style={{ width: '100%', justifyContent: 'center', marginTop: 20, fontSize: 15, padding: '12px' }}
        >
          {isLoading
            ? (mode === 'login' ? 'Signing in…' : 'Creating account…')
            : (mode === 'login' ? 'Sign In' : 'Create Account')}
        </button>

        {/* Switch mode */}
        <p style={{ textAlign: 'center', marginTop: 16, fontSize: 13, color: 'var(--text-secondary)' }}>
          {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
          <button
            onClick={switchMode}
            style={{ color: 'var(--accent)', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer', fontSize: 13 }}
          >
            {mode === 'login' ? 'Sign up' : 'Sign in'}
          </button>
        </p>
      </div>
    </div>
  )
}

// ── Home Page ─────────────────────────────────────────────────
export default function Home() {
  const navigate        = useNavigate()
  const isAuthenticated = useSelector(selectIsAuthenticated)
  const [showModal, setShowModal] = useState(false)

  const handleGetStarted = () => {
    if (isAuthenticated) {
      navigate('/dashboard')
    } else {
      setShowModal(true)
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', position: 'relative', overflow: 'hidden' }}>

      {showModal && <AuthModal onClose={() => setShowModal(false)} />}

      {/* Background glow */}
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
        <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '24px 0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 36, height: 36, background: 'var(--accent)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#0F1117" strokeWidth="2.5">
                <path d="M12 2L2 19h20L12 2z"/>
                <line x1="8" y1="14" x2="16" y2="14"/>
              </svg>
            </div>
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 18 }}>CareerAI</span>
          </div>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            {!isAuthenticated && (
              <button className="btn btn-ghost" style={{ fontSize: 14 }} onClick={() => setShowModal(true)}>
                Sign In
              </button>
            )}
            <button className="btn btn-primary" onClick={handleGetStarted}>
              {isAuthenticated ? 'Go to Dashboard →' : 'Get Started →'}
            </button>
          </div>
        </header>

        {/* Hero */}
        <section style={{ textAlign: 'center', padding: '80px 0 64px' }}>
          <div className="badge fade-up" style={{
            background: 'var(--accent-dim)', color: 'var(--accent)',
            border: '1px solid var(--border-accent)', marginBottom: 24, display: 'inline-flex'
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

          <div className="fade-up fade-up-3" style={{ display: 'flex', gap: 12, justifyContent: 'center', marginBottom: 72 }}>
            <button className="btn btn-primary" style={{ fontSize: 16, padding: '14px 32px' }} onClick={handleGetStarted}>
              Analyze My Resume
            </button>
            <button className="btn btn-ghost" style={{ fontSize: 16, padding: '14px 32px' }}>
              Watch Demo
            </button>
          </div>

          {/* Stats */}
          <div className="fade-up fade-up-4" style={{
            display: 'inline-flex', gap: 48, justifyContent: 'center',
            padding: '28px 48px', background: 'var(--bg-card)',
            border: '1px solid var(--border)', borderRadius: 'var(--radius)',
          }}>
            {[
              { val: '12K+', label: 'Students helped' },
              { val: '94%',  label: 'Placement rate' },
              { val: '300+', label: 'Job roles covered' },
            ].map(s => (
              <div key={s.label} style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 800, color: 'var(--accent)' }}>{s.val}</div>
                <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Features */}
        <section style={{ paddingBottom: 80 }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 36, fontWeight: 800, textAlign: 'center', marginBottom: 8 }}>
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
                <div style={{ width: 44, height: 44, borderRadius: 12, background: f.color + '20', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, marginBottom: 14 }}>{f.icon}</div>
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