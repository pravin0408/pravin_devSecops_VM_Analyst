import React, { Suspense, useRef } from 'react'
import { Link } from 'react-router-dom'
import Scene3D from '../components/Scene3D.jsx'
import ThreatDashboard from '../components/ThreatDashboard.jsx'
import { useMouseSpotlight } from '../hooks/useMouseSpotlight.js'

const STATS = [
  { label: 'Certifications', value: '04' },
  { label: 'Pipelines Hardened', value: '14' },
  { label: 'CI/CD Gates Automated', value: '03' },
  { label: 'Mean Time to Remediate', value: '3.2d' },
]

export default function Home() {
  const mainRef = useRef(null)
  useMouseSpotlight(mainRef)

  return (
    <main ref={mainRef}>
      {/* ---------------- HERO ---------------- */}
      <section className="relative h-[85vh] min-h-[600px] w-full overflow-hidden border-b border-void-line">
        <div className="absolute inset-0">
          <Suspense fallback={<div className="w-full h-full grid place-items-center text-signal-cyan font-mono text-xs">INITIALIZING...</div>}>
            <Scene3D />
          </Suspense>
        </div>

        {/* gradient overlay */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-void/20 via-transparent to-void" />

        {/* content */}
        <div className="relative h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full">
            <div className="max-w-3xl">
              <p className="eyebrow mb-4">DevSecOps Engineer // Threat Intelligence</p>
              <h1 className="font-display font-700 text-5xl sm:text-6xl lg:text-7xl text-white leading-tight mb-6">
                Securing the pipeline, not just the perimeter
              </h1>
              <p className="text-lg text-slate-300 mb-8 leading-relaxed">
                Vulnerability research, application security automation, infrastructure hardening, and continuous security integration. 
                Real-time threat intelligence powered by live CVE feeds and Tenable.io.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link to="/evidence" className="btn-console card-shine">
                  View My Work
                </Link>
                <Link to="/learn" className="btn-console card-shine !border-signal-green/40 !text-signal-green hover:!shadow-glowgreen">
                  Learn Security Testing
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- STATS ---------------- */}
      <section className="border-b border-void-line bg-void-panel/60">
        <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-4 divide-x divide-void-line">
          {STATS.map((s) => (
            <div key={s.label} className="px-4 sm:px-6 py-8 sm:py-10 text-center hover-glow cursor-pointer">
              <div className="font-display text-4xl sm:text-5xl font-700 text-signal-cyan mb-2">{s.value}</div>
              <div className="text-xs uppercase tracking-widest text-signal-dim">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------- THREAT INTELLIGENCE DASHBOARD ---------------- */}
      <ThreatDashboard />

      {/* ---------------- ABOUT ---------------- */}
      <section className="py-20 sm:py-28 border-b border-void-line">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="eyebrow mb-3">// About Me</p>
              <h2 className="font-display text-3xl sm:text-4xl font-600 text-white mb-6">
                DevSecOps & Vulnerability Management
              </h2>
              <div className="space-y-4 text-slate-400 leading-relaxed">
                <p>
                  I'm a Cybersecurity Consultant with over 4 years of experience specializing in 
                  enterprise infrastructure and application security. My work focuses on designing, 
                  executing, and triaging vulnerabilities while building automated workflows.
                </p>
                <p>
                  I bridge the gap between security and engineering by integrating security testing 
                  directly into development pipelines using tools like Rapid7 InsightAppSec, Checkmarx, 
                  Tenable.io, and custom Python automation scripts.
                </p>
              </div>
            </div>
            <div className="panel p-6 hover-glow card-shine">
              <h3 className="font-display text-xl font-600 text-white mb-4">Core Expertise</h3>
              <div className="space-y-3">
                {[
                  { name: 'Static Application Security Testing (SAST)', to: '/learn/sast' },
                  { name: 'Dynamic Application Security Testing (DAST)', to: '/learn/dast' },
                  { name: 'Penetration Testing & Vulnerability Research', to: '/learn/pentesting' },
                  { name: 'Infrastructure Security & Tenable.io', to: '#infrastructure' },
                  { name: 'DevSecOps & CI/CD Integration', to: '/automation' },
                ].map((skill) => (
                  <Link
                    key={skill.name}
                    to={skill.to}
                    className="flex items-center justify-between p-3 border border-void-line hover:border-signal-cyan/40 rounded-sm transition-all group hover-spotlight"
                  >
                    <span className="text-sm text-slate-300 group-hover:text-signal-cyan transition-colors">{skill.name}</span>
                    <span className="text-signal-cyan opacity-0 group-hover:opacity-100 transition-opacity text-xs">
                      Learn →
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- EDUCATION SECTION ---------------- */}
      <section className="py-20 sm:py-28 border-b border-void-line bg-void-panel/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="eyebrow mb-3">// Security Education</p>
            <h2 className="font-display text-3xl sm:text-4xl font-600 text-white mb-4">
              Learn Application Security Testing
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Comprehensive guides on modern security testing methodologies, tools, and best practices
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: 'SAST',
                subtitle: 'Static Analysis',
                description: 'Learn how to analyze source code for security vulnerabilities without executing the application',
                icon: '{ }',
                color: 'cyan',
                to: '/learn/sast',
              },
              {
                title: 'DAST',
                subtitle: 'Dynamic Analysis',
                description: 'Discover runtime vulnerability testing by probing running applications for security flaws',
                icon: '⚡',
                color: 'green',
                to: '/learn/dast',
              },
              {
                title: 'Pentesting',
                subtitle: 'Penetration Testing',
                description: 'Master ethical hacking techniques to identify and exploit security weaknesses',
                icon: '🔍',
                color: 'amber',
                to: '/learn/pentesting',
              },
            ].map((topic) => (
              <Link
                key={topic.title}
                to={topic.to}
                className="panel p-6 hover:border-signal-cyan/50 transition-all group hover-glow card-shine"
              >
                <div className={`text-4xl mb-4 text-signal-${topic.color}`}>{topic.icon}</div>
                <h3 className="font-display text-2xl font-600 text-white mb-2 group-hover:text-signal-cyan transition-colors">
                  {topic.title}
                </h3>
                <p className="text-xs uppercase tracking-widest text-signal-dim mb-3">{topic.subtitle}</p>
                <p className="text-sm text-slate-400 leading-relaxed">{topic.description}</p>
                <div className="mt-4 text-xs text-signal-cyan opacity-0 group-hover:opacity-100 transition-opacity">
                  Start Learning →
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- CTA ---------------- */}
      <section className="py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="font-display text-2xl sm:text-3xl font-600 text-white mb-4">
            Ready to secure your pipeline?
          </h2>
          <p className="text-slate-400 mb-6">
            Check out my certifications, project timeline, and automation scripts
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link to="/evidence" className="btn-console card-shine">
              Evidence Portal
            </Link>
            <Link to="/automation" className="btn-console card-shine">
              Automation Scripts
            </Link>
            <a
              href="https://www.linkedin.com/in/pravin-pp/"
              target="_blank"
              rel="noreferrer"
              className="btn-console card-shine !border-signal-dim/40 !text-slate-300"
            >
              Connect on LinkedIn ↗
            </a>
          </div>
        </div>
      </section>

      <footer className="border-t border-void-line py-8 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-signal-dim">
          <span>© {new Date().getFullYear()} Pravin Pradeep Patil — DevSecOps Portfolio</span>
          <div className="flex items-center gap-4">
            <a href="https://www.linkedin.com/in/pravin-pp/" target="_blank" rel="noreferrer" className="hover:text-signal-cyan transition-colors">
              LinkedIn
            </a>
            <a href="https://github.com/pravin0408/pravin_devSecops_VM_Analyst" target="_blank" rel="noreferrer" className="hover:text-signal-cyan transition-colors">
              GitHub
            </a>
          </div>
        </div>
      </footer>
    </main>
  )
}
