import React, { useState, useRef } from 'react'
 
export default function ResumeUploader({ compact = false, onUpload }) {
  const [dragging, setDragging] = useState(false)
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const inputRef = useRef()
 
  const handleDrop = e => {
    e.preventDefault()
    setDragging(false)
    const f = e.dataTransfer.files[0]
    if (f) processFile(f)
  }
 
  const processFile = f => {
    setFile(f)
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setDone(true)
      onUpload && onUpload(f)
    }, 2200)
  }
 
  return (
    <div style={{ maxWidth: compact ? 640 : '100%', margin: '0 auto' }}>
      {!file ? (
        <div
          onDragOver={e => { e.preventDefault(); setDragging(true) }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          onClick={() => inputRef.current.click()}
          style={{
            border: `2px dashed ${dragging ? 'var(--accent)' : 'var(--border)'}`,
            borderRadius: 'var(--radius)',
            padding: compact ? '40px 32px' : '64px 32px',
            textAlign: 'center',
            cursor: 'pointer',
            background: dragging ? 'var(--accent-dim)' : 'var(--bg-card)',
            transition: 'all var(--transition)',
          }}
        >
          <div style={{
            width: 56, height: 56, borderRadius: '50%',
            background: dragging ? 'var(--accent-dim)' : 'var(--bg-secondary)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 16px',
            border: `1px solid ${dragging ? 'var(--accent)' : 'var(--border)'}`,
            transition: 'all var(--transition)'
          }}>
            <svg width="24" height="24" fill="none" stroke={dragging ? 'var(--accent)' : 'var(--text-secondary)'} strokeWidth="2" viewBox="0 0 24 24">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14 2 14 8 20 8"/>
              <line x1="12" y1="18" x2="12" y2="12"/>
              <line x1="9" y1="15" x2="15" y2="15"/>
            </svg>
          </div>
          <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 17, marginBottom: 6 }}>
            {dragging ? 'Drop your resume here' : 'Upload your resume'}
          </p>
          <p style={{ color: 'var(--text-secondary)', fontSize: 13, marginBottom: 16 }}>
            Drag & drop or click to browse · PDF, DOCX (max 5MB)
          </p>
          <button className="btn btn-primary" style={{ fontSize: 14 }} onClick={e => { e.stopPropagation(); inputRef.current.click() }}>
            Choose File
          </button>
          <input ref={inputRef} type="file" accept=".pdf,.doc,.docx" style={{ display: 'none' }}
            onChange={e => e.target.files[0] && processFile(e.target.files[0])} />
        </div>
      ) : loading ? (
        <div className="card" style={{ textAlign: 'center', padding: '48px 32px' }}>
          <div style={{
            width: 48, height: 48, borderRadius: '50%',
            border: '3px solid var(--accent-dim)', borderTopColor: 'var(--accent)',
            animation: 'spin 0.8s linear infinite', margin: '0 auto 20px'
          }} />
          <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 16, marginBottom: 6 }}>
            Analyzing your resume…
          </p>
          <p style={{ color: 'var(--text-secondary)', fontSize: 13 }}>
            AI is extracting your skills and experience
          </p>
        </div>
      ) : (
        <div className="card" style={{
          display: 'flex', alignItems: 'center', gap: 16,
          borderColor: 'var(--green)', background: 'var(--green-dim)'
        }}>
          <div style={{
            width: 44, height: 44, borderRadius: '50%',
            background: 'var(--green)', display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0
          }}>
            <svg width="22" height="22" fill="none" stroke="#fff" strokeWidth="2.5" viewBox="0 0 24 24">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
          </div>
          <div>
            <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, marginBottom: 2, color: 'var(--green)' }}>
              Resume uploaded successfully!
            </p>
            <p style={{ color: 'var(--text-secondary)', fontSize: 13 }}>{file.name}</p>
          </div>
          <button className="btn btn-ghost" style={{ marginLeft: 'auto', fontSize: 13 }}
            onClick={() => { setFile(null); setDone(false) }}>
            Replace
          </button>
        </div>
      )}
    </div>
  )
}