import React, { useState } from 'react'
import ProjectCard from './ProjectCard'
 
const allProjects = [
  {
    title: 'Full Stack Task Manager',
    icon: '✅',
    desc: 'Build a Trello-like board with React, Node.js, and PostgreSQL. Add real-time updates via WebSockets.',
    tech: ['React', 'Node.js', 'PostgreSQL', 'Socket.io'],
    difficulty: 'Intermediate',
    impact: 'High',
    time: '3–4 weeks',
    color: 'var(--blue)',
    steps: [
      'Design the database schema (users, boards, cards)',
      'Build REST API with Express & Prisma',
      'Create drag-and-drop React frontend',
      'Add JWT authentication',
      'Integrate WebSocket for real-time updates',
      'Deploy on Railway + Vercel',
    ]
  },
  {
    title: 'AI Code Review Bot',
    icon: '🤖',
    desc: 'A GitHub Action that automatically reviews PRs using the OpenAI API and posts inline comments.',
    tech: ['Node.js', 'GitHub Actions', 'OpenAI API', 'TypeScript'],
    difficulty: 'Advanced',
    impact: 'High',
    time: '2–3 weeks',
    color: 'var(--purple)',
    steps: [
      'Set up a GitHub Actions workflow',
      'Fetch PR diff via GitHub REST API',
      'Send diff to OpenAI with a review prompt',
      'Post comments back via GitHub API',
      'Add configurable ignore rules',
    ]
  },
  {
    title: 'Personal Finance Dashboard',
    icon: '💰',
    desc: 'Track income, expenses, and savings goals with beautiful charts. Practice Docker & data visualization.',
    tech: ['React', 'Recharts', 'Python', 'FastAPI', 'Docker'],
    difficulty: 'Intermediate',
    impact: 'Medium',
    time: '2–3 weeks',
    color: 'var(--green)',
    steps: [
      'Design data models for transactions & categories',
      'Build FastAPI backend with CSV import',
      'Create chart components with Recharts',
      'Add budget goal tracking logic',
      'Containerize with Docker Compose',
    ]
  },
  {
    title: 'Dev Portfolio with CMS',
    icon: '🎨',
    desc: 'A blazing-fast portfolio site powered by Next.js and a headless CMS. Showcase your projects and blog.',
    tech: ['Next.js', 'TypeScript', 'Sanity CMS', 'Tailwind CSS'],
    difficulty: 'Beginner',
    impact: 'High',
    time: '1–2 weeks',
    color: 'var(--accent)',
    steps: [
      'Set up Next.js project with TypeScript',
      'Connect Sanity CMS for content',
      'Build reusable project card components',
      'Add dark mode toggle',
      'Deploy on Vercel with custom domain',
    ]
  },
]
 
const filters = ['All', 'Beginner', 'Intermediate', 'Advanced']
 
export default function ProjectSuggestions() {
  const [active, setActive] = useState('All')
 
  const filtered = active === 'All'
    ? allProjects
    : allProjects.filter(p => p.difficulty === active)
 
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, flexWrap: 'wrap', gap: 10 }}>
        <div>
          <div className="section-title" style={{ fontSize: 16 }}>Suggested Projects</div>
          <div style={{ color: 'var(--text-secondary)', fontSize: 13 }}>Build these to fill your skill gaps</div>
        </div>
        {/* Filter tabs */}
        <div style={{ display: 'flex', gap: 6 }}>
          {filters.map(f => (
            <button
              key={f}
              onClick={() => setActive(f)}
              style={{
                padding: '5px 12px', borderRadius: 999, fontSize: 12, fontWeight: 500,
                background: active === f ? 'var(--accent)' : 'var(--bg-card)',
                color: active === f ? '#0F1117' : 'var(--text-secondary)',
                border: `1px solid ${active === f ? 'var(--accent)' : 'var(--border)'}`,
                cursor: 'pointer', transition: 'all var(--transition)'
              }}
            >{f}</button>
          ))}
        </div>
      </div>
 
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {filtered.map((p, i) => (
          <ProjectCard key={p.title} project={p} index={i} />
        ))}
      </div>
    </div>
  )
}