import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'

const links = [
  { to: '/', label: 'Console', code: '00' },
  { to: '/evidence', label: 'Evidence Portal', code: '01' },
  { to: '/automation', label: 'AppSec Automation', code: '02' },
]

export default function Navbar() {
  const [time, setTime] = useState(new Date())
  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(t)
  }, [])

  return (
    <header className="fixed top-0 inset-x-0 z-50 border-b border-void-line bg-void/85 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-signal-green shadow-glowgreen animate-blink" />
          <span className="font-display font-700 tracking-widest text-sm sm:text-base text-white">
            PRAVIN<span className="text-signal-cyan">/</span>SEC-OPS
          </span>
        </div>

        <nav className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === '/'}
              className={({ isActive }) =>
                `px-3 py-2 text-xs uppercase tracking-widest font-mono transition-colors border-b-2 ${
                  isActive
                    ? 'text-signal-cyan border-signal-cyan'
                    : 'text-slate-400 border-transparent hover:text-signal-cyan/80'
                }`
              }
            >
              <span className="text-signal-dim mr-1">{l.code}</span>
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <a
            href="https://www.linkedin.com/in/pravin-pp/"
            target="_blank"
            rel="noreferrer"
            className="hidden sm:inline-block text-[11px] font-mono uppercase tracking-widest text-signal-dim hover:text-signal-cyan transition-colors border border-void-line hover:border-signal-cyan/40 rounded-sm px-2.5 py-1"
          >
            LinkedIn ↗
          </a>
          <div className="hidden sm:block font-mono text-[11px] text-signal-dim tabular-nums">
            {time.toLocaleTimeString('en-GB', { hour12: false })}
          </div>
        </div>
      </div>

      {/* mobile nav */}
      <nav className="md:hidden flex border-t border-void-line">
        {links.map((l) => (
          <NavLink
            key={l.to}
            to={l.to}
            end={l.to === '/'}
            className={({ isActive }) =>
              `flex-1 text-center py-2 text-[10px] uppercase tracking-widest font-mono ${
                isActive ? 'text-signal-cyan bg-signal-cyan/5' : 'text-slate-500'
              }`
            }
          >
            {l.label}
          </NavLink>
        ))}
      </nav>
    </header>
  )
}
