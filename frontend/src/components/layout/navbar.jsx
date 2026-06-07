import React, { useState } from 'react'
 
export default function Navbar() {
  const [notifs] = useState(3)
 
  return (
    <nav style={{
      position: 'fixed', top: 0, left: 'var(--sidebar-width)', right: 0,
      height: 'var(--navbar-height)', zIndex: 100,
      background: 'rgba(15,17,23,0.85)', backdropFilter: 'blur(16px)',
      borderBottom: '1px solid var(--border)',
      display: 'flex', alignItems: 'center',
      padding: '0 32px', gap: 16,
      justifyContent: 'space-between'
    }}>
      {/* Search */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 10,
        background: 'var(--bg-card)', border: '1px solid var(--border)',
        borderRadius: 'var(--radius-sm)', padding: '8px 14px',
        width: 280, transition: 'border-color var(--transition)'
      }}
        onFocus={e => e.currentTarget.style.borderColor = 'var(--border-accent)'}
        onBlur={e => e.currentTarget.style.borderColor = 'var(--border)'}
      >
        <svg width="16" height="16" fill="none" stroke="var(--text-muted)" strokeWidth="2" viewBox="0 0 24 24">
          <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
        </svg>
        <input
          placeholder="Search jobs, skills, courses…"
          style={{
            background: 'none', color: 'var(--text-primary)',
            fontSize: 14, width: '100%'
          }}
        />
      </div>
 
      {/* Right side */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        {/* Notification bell */}
        <button style={{
          position: 'relative', width: 38, height: 38,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: 'var(--bg-card)', border: '1px solid var(--border)',
          borderRadius: 'var(--radius-sm)', color: 'var(--text-secondary)',
          transition: 'all var(--transition)'
        }}
          onMouseEnter={e => { e.currentTarget.style.borderColor='var(--border-accent)'; e.currentTarget.style.color='var(--accent)' }}
          onMouseLeave={e => { e.currentTarget.style.borderColor='var(--border)'; e.currentTarget.style.color='var(--text-secondary)' }}
        >
          <svg width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
            <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
          </svg>
          {notifs > 0 && (
            <span style={{
              position: 'absolute', top: 6, right: 6,
              width: 8, height: 8, background: 'var(--accent)',
              borderRadius: '50%', border: '1.5px solid var(--bg-primary)'
            }} />
          )}
        </button>
 
        {/* Avatar */}
        <div style={{
          width: 36, height: 36, borderRadius: '50%',
          background: 'linear-gradient(135deg, var(--blue), var(--purple))',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 14,
          color: '#fff', cursor: 'pointer', border: '2px solid var(--border)'
        }}>
          JD
        </div>
      </div>
    </nav>
  )
}