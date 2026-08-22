import React from 'react'
import { Link } from 'react-router-dom'

export default function Learn() {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-24 pb-20">
      <div className="mb-12">
        <p className="eyebrow mb-3">// Security Education</p>
        <h1 className="font-display text-4xl sm:text-5xl font-700 text-white mb-4">
          Learn Application Security Testing
        </h1>
        <p className="text-lg text-slate-400 max-w-3xl">
          Comprehensive guides on modern security testing methodologies. Whether you're a developer 
          looking to secure your code or a security professional wanting to deepen your knowledge, 
          these resources will help you understand the fundamentals and best practices.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {[
          {
            title: 'SAST',
            subtitle: 'Static Application Security Testing',
            description: 'Analyze source code for security vulnerabilities without executing the application. Learn about code scanning, security rules, and integrating SAST into your CI/CD pipeline.',
            topics: ['Code Analysis', 'Security Rules', 'CI/CD Integration', 'Tool Overview'],
            icon: '{ }',
            color: 'cyan',
            to: '/learn/sast',
          },
          {
            title: 'DAST',
            subtitle: 'Dynamic Application Security Testing',
            description: 'Test running applications for security vulnerabilities by simulating real-world attacks. Discover web app scanning, API testing, and automated security validation.',
            topics: ['Runtime Testing', 'Web App Scanning', 'API Security', 'Attack Simulation'],
            icon: '⚡',
            color: 'green',
            to: '/learn/dast',
          },
          {
            title: 'Pentesting',
            subtitle: 'Penetration Testing',
            description: 'Master ethical hacking techniques to identify and exploit security weaknesses. Learn reconnaissance, exploitation, post-exploitation, and reporting.',
            topics: ['Reconnaissance', 'Exploitation', 'Privilege Escalation', 'Reporting'],
            icon: '🔍',
            color: 'amber',
            to: '/learn/pentesting',
          },
        ].map((topic) => (
          <Link
            key={topic.title}
            to={topic.to}
            className="panel p-6 hover:border-signal-cyan/50 transition-all group"
          >
            <div className={`text-5xl mb-4`}>{topic.icon}</div>
            <h2 className="font-display text-2xl font-700 text-white mb-2 group-hover:text-signal-cyan transition-colors">
              {topic.title}
            </h2>
            <p className="text-xs uppercase tracking-widest text-signal-dim mb-4">{topic.subtitle}</p>
            <p className="text-sm text-slate-400 leading-relaxed mb-4">
              {topic.description}
            </p>
            <div className="space-y-2 mb-4">
              {topic.topics.map((t) => (
                <div key={t} className="flex items-center gap-2 text-xs text-slate-500">
                  <span className="w-1 h-1 bg-signal-cyan rounded-full" />
                  {t}
                </div>
              ))}
            </div>
            <div className="text-sm text-signal-cyan opacity-0 group-hover:opacity-100 transition-opacity">
              Start Learning →
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-16 panel p-8">
        <h2 className="font-display text-2xl font-600 text-white mb-4">Why Learn Security Testing?</h2>
        <div className="grid md:grid-cols-2 gap-8 text-slate-400">
          <div>
            <h3 className="text-signal-cyan font-semibold mb-3">For Developers</h3>
            <ul className="space-y-2 text-sm leading-relaxed">
              <li>• Write more secure code from the start</li>
              <li>• Understand common vulnerabilities (OWASP Top 10)</li>
              <li>• Integrate security testing into your workflow</li>
              <li>• Reduce vulnerabilities in production</li>
            </ul>
          </div>
          <div>
            <h3 className="text-signal-green font-semibold mb-3">For Security Professionals</h3>
            <ul className="space-y-2 text-sm leading-relaxed">
              <li>• Master both automated and manual testing techniques</li>
              <li>• Learn industry-standard tools and methodologies</li>
              <li>• Build comprehensive security testing strategies</li>
              <li>• Stay current with evolving threat landscapes</li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  )
}
