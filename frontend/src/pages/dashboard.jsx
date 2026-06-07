import React from 'react'
import ResumeUploader from '../components/resume/ResumeUploader'
import ResumeParser from '../components/resume/ResumeParser'
import SkillGapChart from '../components/dashboard/SkillGapChart'
import JobMatchCard from '../components/dashboard/JobMatchCard'
import ProfileSummary from '../components/dashboard/ProfileSummary'
import ProjectSuggestions from '../components/projects/ProjectSuggestions'
 
export default function Dashboard() {
  return (
    <div>
      <div className="fade-up" style={{ marginBottom: 32 }}>
        <h1 className="section-title" style={{ fontSize: 28 }}>Dashboard</h1>
        <p className="section-subtitle">Welcome back, John! Here's your career snapshot.</p>
      </div>
 
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 24 }}>
        {/* Left column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div className="fade-up fade-up-1">
            <ResumeUploader />
          </div>
          <div className="fade-up fade-up-2">
            <SkillGapChart />
          </div>
          <div className="fade-up fade-up-3">
            <ProjectSuggestions />
          </div>
        </div>
 
        {/* Right column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div className="fade-up fade-up-1">
            <ProfileSummary />
          </div>
          <div className="fade-up fade-up-2">
            <ResumeParser />
          </div>
          <div className="fade-up fade-up-3">
            <JobMatchCard />
          </div>
        </div>
      </div>
    </div>
  )
}