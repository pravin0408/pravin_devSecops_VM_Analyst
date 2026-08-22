import React from 'react'
import { HashRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import SecurityChatbot from './components/SecurityChatbot.jsx'
import Home from './pages/Home.jsx'
import Learn from './pages/Learn.jsx'
import SAST from './pages/SAST.jsx'
import DAST from './pages/DAST.jsx'
import Pentesting from './pages/Pentesting.jsx'
import SecurityAnalysis from './pages/SecurityAnalysis.jsx'
import Contact from './pages/Contact.jsx'
import EvidenceDashboard from './components/EvidenceDashboard.jsx'
import TerminalShowcase from './components/TerminalShowcase.jsx'

export default function App() {
  return (
    <HashRouter>
      <div className="min-h-screen bg-void">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/learn" element={<Learn />} />
          <Route path="/learn/sast" element={<SAST />} />
          <Route path="/learn/dast" element={<DAST />} />
          <Route path="/learn/pentesting" element={<Pentesting />} />
          <Route path="/security" element={<SecurityAnalysis />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/evidence" element={<EvidenceDashboard />} />
          <Route path="/automation" element={<TerminalShowcase standalone />} />
        </Routes>
        <SecurityChatbot />
      </div>
    </HashRouter>
  )
}
