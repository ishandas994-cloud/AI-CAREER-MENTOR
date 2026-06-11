import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectActiveResume, selectParsedData,
  selectResumeLoading, selectResumeErrors, parseResume,
} from '../../store/resumeslice'
import { selectUser } from '../../store/userslice'

export default function ResumeParser() {
  const dispatch     = useDispatch()
  const user         = useSelector(selectUser)
  const activeResume = useSelector(selectActiveResume)
  const parsedData   = useSelector(selectParsedData)
  const loading      = useSelector(selectResumeLoading)
  const errors       = useSelector(selectResumeErrors)

  const handleParse = () => {
    if (activeResume?._id) {
      dispatch(parseResume(activeResume._id))
    }
  }

  const initials = user?.name
    ? user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    : 'U'

  // No resume uploaded yet
  if (!activeResume) {
    return (
      <div className="card" style={{ textAlign: 'center', padding: '32px', color: 'var(--text-muted)' }}>
        <div style={{ fontSize: 32, marginBottom: 10 }}>📄</div>
        <p style={{ fontSize: 14 }}>Upload a resume first to parse it.</p>
      </div>
    )
  }

  // Parsing in progress
  if (loading.parse) {
    return (
      <div className="card" style={{ textAlign: 'center', padding: '48px 32px' }}>
        <div style={{
          width: 40, height: 40, borderRadius: '50%',
          border: '3px solid var(--accent-dim)', borderTopColor: 'var(--accent)',
          animation: 'spin 0.8s linear infinite', margin: '0 auto 16px'
        }} />
        <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>Parsing resume with AI…</p>
        <p style={{ color: 'var(--text-secondary)', fontSize: 13 }}>Extracting skills, experience, education</p>
      </div>
    )
  }

  // Error
  if (errors.parse) {
    return (
      <div className="card" style={{ borderColor: 'var(--orange)', background: 'var(--orange-dim)', padding: '24px', textAlign: 'center' }}>
        <p style={{ color: 'var(--orange)', marginBottom: 12 }}>{errors.parse}</p>
        <button className="btn btn-ghost" style={{ fontSize: 13 }} onClick={handleParse}>Retry</button>
      </div>
    )
  }

  // Not yet parsed — show parse button
  if (!parsedData) {
    return (
      <div className="card" style={{ textAlign: 'center', padding: '32px' }}>
        <div style={{ fontSize: 32, marginBottom: 10 }}>🤖</div>
        <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, marginBottom: 6 }}>Ready to parse</p>
        <p style={{ color: 'var(--text-secondary)', fontSize: 13, marginBottom: 16 }}>
          {activeResume.originalName}
        </p>
        <button className="btn btn-primary" onClick={handleParse}>✦ Parse with AI</button>
      </div>
    )
  }

  // Show parsed data
  return (
    <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, paddingBottom: 16, borderBottom: '1px solid var(--border)' }}>
        <div style={{
          width: 48, height: 48, borderRadius: '50%',
          background: 'linear-gradient(135deg, var(--blue), var(--purple))',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 18, color: '#fff'
        }}>{initials}</div>
        <div>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 17 }}>{user?.name || '—'}</div>
          <div style={{ color: 'var(--text-secondary)', fontSize: 13 }}>{user?.email}</div>
        </div>
      </div>

      {/* Summary */}
      {parsedData.summary && (
        <div>
          <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '.08em', marginBottom: 8 }}>Summary</div>
          <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{parsedData.summary}</p>
        </div>
      )}

      {/* Skills */}
      {parsedData.skills?.length > 0 && (
        <div>
          <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '.08em', marginBottom: 10 }}>Extracted Skills</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {parsedData.skills.map(s => (
              <span key={s} className="badge" style={{ background: 'var(--blue-dim)', color: 'var(--blue)' }}>{s}</span>
            ))}
          </div>
        </div>
      )}

      {/* Experience */}
      {parsedData.experience?.length > 0 && (
        <div>
          <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '.08em', marginBottom: 10 }}>Experience</div>
          {parsedData.experience.map((e, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: i < parsedData.experience.length - 1 ? '1px solid var(--border)' : 'none' }}>
              <div>
                <div style={{ fontWeight: 500 }}>{e.role}</div>
                <div style={{ color: 'var(--text-secondary)', fontSize: 13 }}>{e.company}</div>
              </div>
              <div style={{ color: 'var(--text-muted)', fontSize: 13 }}>{e.duration}</div>
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {parsedData.education?.length > 0 && (
        <div>
          <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '.08em', marginBottom: 10 }}>Education</div>
          {parsedData.education.map((e, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontWeight: 500 }}>{e.degree}</div>
                <div style={{ color: 'var(--text-secondary)', fontSize: 13 }}>{e.institution}</div>
              </div>
              <div style={{ color: 'var(--text-muted)', fontSize: 13 }}>{e.year}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}