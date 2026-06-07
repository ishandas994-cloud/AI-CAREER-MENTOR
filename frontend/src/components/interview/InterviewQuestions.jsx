import React, { useState } from 'react'
import QuestionCard from './QuestionCard'
 
const roles = ['Full Stack Engineer', 'Frontend Developer', 'Backend Engineer', 'Data Engineer']
const types = ['Technical', 'Behavioral', 'System Design', 'HR Round']
 
const mockQuestions = {
  'Technical': [
    { q: 'Explain the difference between useEffect and useLayoutEffect in React.', difficulty: 'Medium', tip: 'Focus on the timing: useLayoutEffect fires synchronously after DOM mutations.' },
    { q: 'How does the event loop work in JavaScript?', difficulty: 'Medium', tip: 'Walk through call stack, Web APIs, callback queue, and microtask queue.' },
    { q: 'What are the SOLID principles? Give a React example.', difficulty: 'Hard', tip: 'Pick Single Responsibility — show how to split a god component.' },
  ],
  'Behavioral': [
    { q: 'Describe a time you had a conflict with a teammate. How did you resolve it?', difficulty: 'Medium', tip: 'Use the STAR method: Situation, Task, Action, Result.' },
    { q: 'Tell me about a project you failed and what you learned.', difficulty: 'Easy', tip: 'Be honest, show self-awareness, end with growth.' },
  ],
  'System Design': [
    { q: 'Design a URL shortener like bit.ly. Walk through your architecture.', difficulty: 'Hard', tip: 'Cover: hashing, storage, redirection, caching (Redis), rate limiting.' },
    { q: 'How would you design a real-time notification system?', difficulty: 'Hard', tip: 'Consider WebSockets vs SSE, message queues (Kafka/Redis), fan-out strategies.' },
  ],
  'HR Round': [
    { q: 'Where do you see yourself in 5 years?', difficulty: 'Easy', tip: 'Align your answer with the company\'s growth and the role\'s trajectory.' },
    { q: 'Why do you want to work at our company?', difficulty: 'Easy', tip: 'Research the company — mention specific products, values, or recent news.' },
  ]
}
 
export default function InterviewQuestions() {
  const [role, setRole] = useState(roles[0])
  const [type, setType] = useState(types[0])
  const [generating, setGenerating] = useState(false)
  const [questions, setQuestions] = useState(mockQuestions['Technical'])
 
  const generate = () => {
    setGenerating(true)
    setQuestions([])
    setTimeout(() => {
      setQuestions(mockQuestions[type] || mockQuestions['Technical'])
      setGenerating(false)
    }, 1800)
  }
 
  return (
    <div>
      {/* Controls */}
      <div className="card" style={{ marginBottom: 20, display: 'flex', gap: 14, flexWrap: 'wrap', alignItems: 'flex-end' }}>
        <div style={{ flex: 1, minWidth: 180 }}>
          <label style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '.08em', display: 'block', marginBottom: 6 }}>Target Role</label>
          <select value={role} onChange={e => setRole(e.target.value)} style={{
            width: '100%', background: 'var(--bg-secondary)', color: 'var(--text-primary)',
            border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)',
            padding: '9px 12px', fontSize: 14, cursor: 'pointer'
          }}>
            {roles.map(r => <option key={r}>{r}</option>)}
          </select>
        </div>
        <div style={{ flex: 1, minWidth: 180 }}>
          <label style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '.08em', display: 'block', marginBottom: 6 }}>Question Type</label>
          <select value={type} onChange={e => setType(e.target.value)} style={{
            width: '100%', background: 'var(--bg-secondary)', color: 'var(--text-primary)',
            border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)',
            padding: '9px 12px', fontSize: 14, cursor: 'pointer'
          }}>
            {types.map(t => <option key={t}>{t}</option>)}
          </select>
        </div>
        <button className="btn btn-primary" onClick={generate} disabled={generating} style={{ padding: '10px 24px' }}>
          {generating ? '⏳ Generating…' : '✦ Generate Questions'}
        </button>
      </div>
 
      {/* Questions */}
      {generating ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {[1, 2, 3].map(i => (
            <div key={i} className="skeleton" style={{ height: 80 }} />
          ))}
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {questions.map((q, i) => <QuestionCard key={i} data={q} index={i} />)}
        </div>
      )}
    </div>
  )
}