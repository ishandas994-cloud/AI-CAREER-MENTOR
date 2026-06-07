import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
 
const navItems = [
  {
    label: 'Dashboard', path: '/dashboard',
    icon: (
      <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
        <rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
      </svg>
    )
  },
  {
    label: 'Roadmap', path: '/roadmap',
    icon: (
      <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M3 12h18M3 6l9-3 9 3M3 18l9 3 9-3"/>
      </svg>
    )
  },
  {
    label: 'Interview Prep', path: '/interview',
    icon: (
      <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
    )
  },
  {
    label: 'Profile', path: '/profile',
    icon: (
      <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
        <circle cx="12" cy="7" r="4"/>
      </svg>
    )
  },
]
 
export default function Sidebar() {
  const navigate = useNavigate()
  const location = useLocation()
  const [hovered, setHovered] = useState(null)
 
  return (
    <aside style={{
      position: 'fixed', top: 0, left: 0, bottom: 0,
      width: 'var(--sidebar-width)', zIndex: 200,
      background: 'var(--bg-secondary)',
      borderRight: '1px solid var(--border)',
      display: 'flex', flexDirection: 'column',
      padding: '0 12px 24px',
    }}>
      {/* Logo */}
      <div style={{
        height: 'var(--navbar-height)', display: 'flex',
        alignItems: 'center', gap: 10, padding: '0 8px',
        borderBottom: '1px solid var(--border)', marginBottom: 16
      }}>
        <div style={{
          width: 32, height: 32,
          background: 'var(--accent)', borderRadius: 8,
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#0F1117" strokeWidth="2.5">
            <path d="M12 2L2 19h20L12 2z"/>
            <line x1="8" y1="14" x2="16" y2="14"/>
          </svg>
        </div>
        <span style={{
          fontFamily: 'var(--font-display)', fontWeight: 800,
          fontSize: 16, color: 'var(--text-primary)', letterSpacing: '-0.02em'
        }}>
          CareerAI
        </span>
      </div>
 
      {/* Nav label */}
      <span style={{
        fontSize: 10, fontWeight: 600, letterSpacing: '.1em',
        color: 'var(--text-muted)', textTransform: 'uppercase',
        padding: '0 8px', marginBottom: 8
      }}>Navigation</span>
 
      {/* Nav items */}
      <nav style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        {navItems.map(item => {
          const isActive = location.pathname === item.path
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              onMouseEnter={() => setHovered(item.path)}
              onMouseLeave={() => setHovered(null)}
              style={{
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '10px 12px', borderRadius: 'var(--radius-sm)',
                fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: 500,
                color: isActive ? '#0F1117' : hovered === item.path ? 'var(--text-primary)' : 'var(--text-secondary)',
                background: isActive ? 'var(--accent)' : hovered === item.path ? 'var(--bg-card)' : 'transparent',
                transition: 'all var(--transition)',
                cursor: 'pointer', textAlign: 'left', width: '100%',
              }}
            >
              <span style={{ opacity: isActive ? 1 : 0.7 }}>{item.icon}</span>
              {item.label}
              {isActive && (
                <span style={{
                  marginLeft: 'auto', width: 6, height: 6,
                  background: '#0F1117', borderRadius: '50%'
                }} />
              )}
            </button>
          )
        })}
      </nav>
 
      {/* Bottom upgrade card */}
      <div style={{ marginTop: 'auto' }}>
        <div style={{
          background: 'var(--accent-dim)', border: '1px solid var(--border-accent)',
          borderRadius: 'var(--radius)', padding: 16
        }}>
          <div style={{
            fontFamily: 'var(--font-display)', fontWeight: 700,
            fontSize: 13, color: 'var(--accent)', marginBottom: 6
          }}>
            ✦ Upgrade to Pro
          </div>
          <p style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 12, lineHeight: 1.5 }}>
            Unlock unlimited AI analysis, priority job matches & mock interviews.
          </p>
          <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', fontSize: 13, padding: '8px 0' }}>
            Upgrade Now
          </button>
        </div>
      </div>
    </aside>
  )
}