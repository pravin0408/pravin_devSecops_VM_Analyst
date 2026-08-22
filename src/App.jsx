import React from 'react'
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Home from './pages/Home.jsx'
import EvidenceDashboard from './components/EvidenceDashboard.jsx'
import TerminalShowcase from './components/TerminalShowcase.jsx'

// HashRouter is used deliberately: GitHub Pages serves a static file tree
// with no server-side rewrite rules, so a BrowserRouter would 404 on any
// deep link or page refresh (e.g. /evidence). Hash-based routes
// (/#/evidence) always resolve to index.html first, then route client-side.

function AppLayout() {
  const location = useLocation()
  const isHome = location.pathname === '/'

  return (
    <div className="min-h-screen bg-void">
      {/* Hide the fixed navbar on the immersive home route —
          the 3D scene has its own navigation panels */}
      {!isHome && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/evidence" element={<EvidenceDashboard />} />
        <Route path="/automation" element={<TerminalShowcase standalone />} />
      </Routes>
    </div>
  )
}

export default function App() {
  return (
    <HashRouter>
      <AppLayout />
    </HashRouter>
  )
}
