import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Sidebar from './components/layout/Sidebar'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Roadmap from './pages/Roadmap'
import Interview from './pages/Interview'
import Profile from './pages/Profile'
 
function Layout({ children }) {
  return (
    <>
      <Navbar />
      <Sidebar />
      <div className="page-wrapper">
        <div className="page-content">
          {children}
        </div>
      </div>
    </>
  )
}
 
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
        <Route path="/roadmap"   element={<Layout><Roadmap /></Layout>} />
        <Route path="/interview" element={<Layout><Interview /></Layout>} />
        <Route path="/profile"   element={<Layout><Profile /></Layout>} />
        <Route path="*"          element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}