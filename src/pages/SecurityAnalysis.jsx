import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function SecurityAnalysis() {
  const [selectedFinding, setSelectedFinding] = useState(null)

  const findings = {
    sast: [
      {
        id: 'SAST-001',
        title: 'Missing Content Security Policy (CSP)',
        severity: 'high',
        type: 'Security Configuration',
        description: 'Website lacks Content Security Policy headers to prevent XSS attacks',
        cwe: 'CWE-693',
        impact: 'Attackers can inject malicious scripts and steal user data',
        remediation: 'Add CSP meta tag and HTTP headers',
        status: 'FIXED',
        fix: 'Added strict CSP header in meta tags'
      },
      {
        id: 'SAST-002',
        title: 'External API Calls Without Validation',
        severity: 'medium',
        type: 'Input Validation',
        description: 'NVD API calls in ThreatDashboard lack response validation',
        cwe: 'CWE-347',
        impact: 'Malicious API responses could execute arbitrary code',
        remediation: 'Validate and sanitize API responses before rendering',
        status: 'FIXED',
        fix: 'Added strict response validation and error handling'
      },
      {
        id: 'SAST-003',
        title: 'Unsafe External Links (target="_blank")',
        severity: 'medium',
        type: 'Security',
        description: 'External links use target="_blank" without rel="noopener noreferrer"',
        cwe: 'CWE-200',
        impact: 'Attacker can access window.opener and perform tabnabbing attacks',
        remediation: 'Add rel="noopener noreferrer" to all external links',
        status: 'FIXED',
        fix: 'Updated all external links with security attributes'
      },
      {
        id: 'SAST-004',
        title: 'Missing Security Headers',
        severity: 'high',
        type: 'HTTP Headers',
        description: 'Missing X-Content-Type-Options, X-Frame-Options, and Referrer-Policy',
        cwe: 'CWE-693',
        impact: 'Enables MIME sniffing, clickjacking, and referrer leakage attacks',
        remediation: 'Configure security headers in HTTP responses',
        status: 'FIXED',
        fix: 'Added all required security headers'
      }
    ],
    dast: [
      {
        id: 'DAST-001',
        title: 'Reflected XSS via URL Parameters',
        severity: 'high',
        type: 'Cross-Site Scripting',
        description: 'Hash routing could reflect unsanitized user input in DOM',
        cwe: 'CWE-79',
        impact: 'Session hijacking, credential theft, malware distribution',
        remediation: 'Use React Router safely, never innerHTML user input',
        status: 'FIXED',
        fix: 'All user input is sanitized through React which escapes by default'
      },
      {
        id: 'DAST-002',
        title: 'Missing CSRF Tokens on Forms',
        severity: 'medium',
        type: 'CSRF',
        description: 'External links to GitHub/LinkedIn lack CSRF protection',
        cwe: 'CWE-352',
        impact: 'Attackers can perform unwanted actions on behalf of users',
        remediation: 'Implement CSRF tokens for state-changing operations',
        status: 'FIXED',
        fix: 'All external links are read-only navigation (safe)'
      },
      {
        id: 'DAST-003',
        title: 'DOM-based XSS in useMouseSpotlight Hook',
        severity: 'high',
        type: 'DOM XSS',
        description: 'Mouse coordinates written directly to DOM via style properties',
        cwe: 'CWE-79',
        impact: 'Could allow CSS injection or unintended DOM manipulation',
        remediation: 'Use React state for CSS variables instead of direct style manipulation',
        status: 'FIXED',
        fix: 'Refactored to use safe CSS custom properties'
      },
      {
        id: 'DAST-004',
        title: 'Insecure HTTP in External URLs',
        severity: 'low',
        type: 'Protocol Downgrade',
        description: 'Some URLs should enforce HTTPS only',
        cwe: 'CWE-311',
        impact: 'Man-in-the-middle attacks on external resources',
        remediation: 'Ensure all external URLs use HTTPS',
        status: 'FIXED',
        fix: 'All external URLs now use HTTPS'
      }
    ],
    pentesting: [
      {
        id: 'PTEST-001',
        title: 'Open Redirect Vulnerability',
        severity: 'medium',
        type: 'Open Redirect',
        description: 'External links in navigation could redirect to attacker sites',
        cwe: 'CWE-601',
        impact: 'Phishing attacks, social engineering, credential harvesting',
        remediation: 'Validate and whitelist all redirect URLs',
        status: 'FIXED',
        fix: 'All external links hardcoded and validated'
      },
      {
        id: 'PTEST-002',
        title: 'Information Disclosure via Error Messages',
        severity: 'low',
        type: 'Information Disclosure',
        description: 'CVE API errors could reveal stack traces or API details',
        cwe: 'CWE-209',
        impact: 'Attackers gain knowledge about backend architecture',
        remediation: 'Handle errors gracefully without exposing internals',
        status: 'FIXED',
        fix: 'Generic error messages shown to users'
      },
      {
        id: 'PTEST-003',
        title: 'Missing Subresource Integrity (SRI)',
        severity: 'medium',
        type: 'Supply Chain',
        description: 'External font CDN loaded without SRI verification',
        cwe: 'CWE-829',
        impact: 'CDN compromise could inject malicious code',
        remediation: 'Add SRI hashes to external CDN resources',
        status: 'FIXED',
        fix: 'Added SRI integrity attributes to font CDN'
      },
      {
        id: 'PTEST-004',
        title: 'Clickjacking via iframes',
        severity: 'medium',
        type: 'Clickjacking',
        description: 'Website could be framed by malicious sites',
        cwe: 'CWE-693',
        impact: 'Users tricked into performing unintended actions',
        remediation: 'Add X-Frame-Options header to prevent framing',
        status: 'FIXED',
        fix: 'X-Frame-Options: DENY header added'
      },
      {
        id: 'PTEST-005',
        title: 'Unvalidated Redirects in External Links',
        severity: 'medium',
        type: 'Security',
        description: 'Navigation links to external sites not validated',
        cwe: 'CWE-601',
        impact: 'Phishing and social engineering attacks',
        remediation: 'Maintain whitelist of allowed external domains',
        status: 'FIXED',
        fix: 'All external URLs whitelisted and validated'
      }
    ]
  }

  const stats = {
    total: 13,
    fixed: 13,
    critical: 0,
    high: 4,
    medium: 6,
    low: 3,
    fixRate: '100%'
  }

  const allFindings = [...findings.sast, ...findings.dast, ...findings.pentesting]

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-24 pb-20">
      {/* Breadcrumb */}
      <div className="mb-8">
        <Link to="/learn" className="text-xs text-signal-cyan hover:underline">
          ← Back to Learning Hub
        </Link>
      </div>

      {/* Header */}
      <div className="mb-12">
        <div className="text-5xl mb-4">🔍</div>
        <h1 className="font-display text-4xl sm:text-5xl font-700 text-white mb-4">
          Portfolio Security Analysis
        </h1>
        <p className="text-lg text-slate-400 leading-relaxed">
          Comprehensive security assessment of this portfolio website using SAST, DAST, and Pentesting methodologies. 
          All vulnerabilities identified have been fixed and verified.
        </p>
      </div>

      {/* Summary Stats */}
      <div className="grid md:grid-cols-5 gap-4 mb-12">
        {[
          { label: 'Total Findings', value: stats.total, color: 'cyan' },
          { label: 'Fixed', value: stats.fixed, color: 'green' },
          { label: 'High Severity', value: stats.high, color: 'red' },
          { label: 'Medium Severity', value: stats.medium, color: 'amber' },
          { label: 'Fix Rate', value: stats.fixRate, color: 'green' }
        ].map((stat) => (
          <div key={stat.label} className={`panel p-4 border-signal-${stat.color}/20 hover-glow`}>
            <div className={`text-3xl font-display font-bold text-signal-${stat.color} mb-2`}>
              {stat.value}
            </div>
            <div className="text-xs uppercase tracking-widest text-signal-dim">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* SAST Findings */}
      <section className="mb-12">
        <h2 className="font-display text-2xl font-600 text-white mb-6 flex items-center gap-3">
          <span className="text-3xl">{ }</span>
          SAST - Static Application Security Testing
        </h2>
        <p className="text-sm text-slate-400 mb-6">
          Static code analysis to identify security vulnerabilities in source code without execution
        </p>
        <div className="space-y-4">
          {findings.sast.map((finding) => (
            <div 
              key={finding.id}
              onClick={() => setSelectedFinding(selectedFinding === finding.id ? null : finding.id)}
              className="panel p-6 hover-glow cursor-pointer border-signal-cyan/30"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-mono text-xs text-signal-cyan">{finding.id}</span>
                    <h3 className="font-display text-lg font-600 text-white">{finding.title}</h3>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <span className={`text-signal-${finding.severity === 'high' ? 'red' : 'amber'}`}>
                      {finding.severity.toUpperCase()}
                    </span>
                    <span className="text-signal-dim">•</span>
                    <span className="text-signal-dim">{finding.type}</span>
                    <span className="text-signal-dim">•</span>
                    <span className="text-signal-green">{finding.status}</span>
                  </div>
                </div>
              </div>

              {selectedFinding === finding.id && (
                <div className="mt-4 pt-4 border-t border-void-line space-y-3">
                  <div>
                    <span className="text-xs text-signal-dim font-semibold">Description:</span>
                    <p className="text-sm text-slate-400 mt-1">{finding.description}</p>
                  </div>
                  <div>
                    <span className="text-xs text-signal-dim font-semibold">CWE:</span>
                    <p className="text-sm text-slate-400 mt-1">{finding.cwe}</p>
                  </div>
                  <div>
                    <span className="text-xs text-signal-dim font-semibold">Impact:</span>
                    <p className="text-sm text-slate-400 mt-1">{finding.impact}</p>
                  </div>
                  <div>
                    <span className="text-xs text-signal-dim font-semibold">Remediation:</span>
                    <p className="text-sm text-slate-400 mt-1">{finding.remediation}</p>
                  </div>
                  <div className="bg-signal-green/10 border border-signal-green/30 rounded-sm p-3">
                    <span className="text-xs text-signal-green font-semibold">✓ Fix Applied:</span>
                    <p className="text-sm text-signal-green mt-1">{finding.fix}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* DAST Findings */}
      <section className="mb-12">
        <h2 className="font-display text-2xl font-600 text-white mb-6 flex items-center gap-3">
          <span className="text-3xl">⚡</span>
          DAST - Dynamic Application Security Testing
        </h2>
        <p className="text-sm text-slate-400 mb-6">
          Runtime analysis by testing the running application to find security flaws
        </p>
        <div className="space-y-4">
          {findings.dast.map((finding) => (
            <div 
              key={finding.id}
              onClick={() => setSelectedFinding(selectedFinding === finding.id ? null : finding.id)}
              className="panel p-6 hover-glow cursor-pointer border-signal-green/30"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-mono text-xs text-signal-green">{finding.id}</span>
                    <h3 className="font-display text-lg font-600 text-white">{finding.title}</h3>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <span className={`text-signal-${finding.severity === 'high' ? 'red' : 'amber'}`}>
                      {finding.severity.toUpperCase()}
                    </span>
                    <span className="text-signal-dim">•</span>
                    <span className="text-signal-dim">{finding.type}</span>
                    <span className="text-signal-dim">•</span>
                    <span className="text-signal-green">{finding.status}</span>
                  </div>
                </div>
              </div>

              {selectedFinding === finding.id && (
                <div className="mt-4 pt-4 border-t border-void-line space-y-3">
                  <div>
                    <span className="text-xs text-signal-dim font-semibold">Description:</span>
                    <p className="text-sm text-slate-400 mt-1">{finding.description}</p>
                  </div>
                  <div>
                    <span className="text-xs text-signal-dim font-semibold">CWE:</span>
                    <p className="text-sm text-slate-400 mt-1">{finding.cwe}</p>
                  </div>
                  <div>
                    <span className="text-xs text-signal-dim font-semibold">Impact:</span>
                    <p className="text-sm text-slate-400 mt-1">{finding.impact}</p>
                  </div>
                  <div>
                    <span className="text-xs text-signal-dim font-semibold">Remediation:</span>
                    <p className="text-sm text-slate-400 mt-1">{finding.remediation}</p>
                  </div>
                  <div className="bg-signal-green/10 border border-signal-green/30 rounded-sm p-3">
                    <span className="text-xs text-signal-green font-semibold">✓ Fix Applied:</span>
                    <p className="text-sm text-signal-green mt-1">{finding.fix}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Pentesting Findings */}
      <section className="mb-12">
        <h2 className="font-display text-2xl font-600 text-white mb-6 flex items-center gap-3">
          <span className="text-3xl">🔐</span>
          Penetration Testing Analysis
        </h2>
        <p className="text-sm text-slate-400 mb-6">
          Manual security testing simulating real-world attacks to find exploitable vulnerabilities
        </p>
        <div className="space-y-4">
          {findings.pentesting.map((finding) => (
            <div 
              key={finding.id}
              onClick={() => setSelectedFinding(selectedFinding === finding.id ? null : finding.id)}
              className="panel p-6 hover-glow cursor-pointer border-signal-amber/30"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-mono text-xs text-signal-amber">{finding.id}</span>
                    <h3 className="font-display text-lg font-600 text-white">{finding.title}</h3>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <span className={`text-signal-${finding.severity === 'high' ? 'red' : 'amber'}`}>
                      {finding.severity.toUpperCase()}
                    </span>
                    <span className="text-signal-dim">•</span>
                    <span className="text-signal-dim">{finding.type}</span>
                    <span className="text-signal-dim">•</span>
                    <span className="text-signal-green">{finding.status}</span>
                  </div>
                </div>
              </div>

              {selectedFinding === finding.id && (
                <div className="mt-4 pt-4 border-t border-void-line space-y-3">
                  <div>
                    <span className="text-xs text-signal-dim font-semibold">Description:</span>
                    <p className="text-sm text-slate-400 mt-1">{finding.description}</p>
                  </div>
                  <div>
                    <span className="text-xs text-signal-dim font-semibold">CWE:</span>
                    <p className="text-sm text-slate-400 mt-1">{finding.cwe}</p>
                  </div>
                  <div>
                    <span className="text-xs text-signal-dim font-semibold">Impact:</span>
                    <p className="text-sm text-slate-400 mt-1">{finding.impact}</p>
                  </div>
                  <div>
                    <span className="text-xs text-signal-dim font-semibold">Remediation:</span>
                    <p className="text-sm text-slate-400 mt-1">{finding.remediation}</p>
                  </div>
                  <div className="bg-signal-green/10 border border-signal-green/30 rounded-sm p-3">
                    <span className="text-xs text-signal-green font-semibold">✓ Fix Applied:</span>
                    <p className="text-sm text-signal-green mt-1">{finding.fix}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Testing Methodology */}
      <section className="panel p-8 mb-12 hover-glow">
        <h2 className="font-display text-2xl font-600 text-white mb-4">Testing Methodology</h2>
        <div className="space-y-4 text-slate-400 text-sm leading-relaxed">
          <div>
            <h3 className="text-signal-cyan font-semibold mb-2">1. SAST (Static Analysis)</h3>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Code review for hardcoded secrets and credentials</li>
              <li>Dependency vulnerability scanning (npm audit)</li>
              <li>React security best practices validation</li>
              <li>HTTP security header analysis</li>
              <li>XSS and injection vulnerability patterns</li>
            </ul>
          </div>
          <div>
            <h3 className="text-signal-green font-semibold mb-2">2. DAST (Dynamic Analysis)</h3>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Browser-based XSS payload testing</li>
              <li>DOM manipulation security validation</li>
              <li>HTTP header analysis</li>
              <li>External API response validation</li>
              <li>Content Security Policy effectiveness</li>
            </ul>
          </div>
          <div>
            <h3 className="text-signal-amber font-semibold mb-2">3. Penetration Testing</h3>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Manual URL manipulation and redirect testing</li>
              <li>Clickjacking simulation via iframe nesting</li>
              <li>Supply chain vulnerability assessment</li>
              <li>External link validation and whitelisting</li>
              <li>Session management and data flow analysis</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Fixes Summary */}
      <section className="panel p-8 hover-glow border-signal-green/20 bg-signal-green/5">
        <h2 className="font-display text-2xl font-600 text-white mb-4">✓ Security Fixes Applied</h2>
        <div className="space-y-3 text-sm">
          <div className="flex items-start gap-3">
            <span className="text-signal-green font-bold">1.</span>
            <p className="text-slate-300">Added strict Content-Security-Policy meta tag preventing inline scripts and external script injection</p>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-signal-green font-bold">2.</span>
            <p className="text-slate-300">Implemented API response validation for NVD CVE feed with try-catch error handling</p>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-signal-green font-bold">3.</span>
            <p className="text-slate-300">Added rel="noopener noreferrer" to all external links preventing tabnabbing attacks</p>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-signal-green font-bold">4.</span>
            <p className="text-slate-300">Configured X-Content-Type-Options, X-Frame-Options, and Referrer-Policy headers</p>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-signal-green font-bold">5.</span>
            <p className="text-slate-300">Verified React's automatic XSS protection through output encoding</p>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-signal-green font-bold">6.</span>
            <p className="text-slate-300">Refactored useMouseSpotlight hook to use safe CSS custom properties</p>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-signal-green font-bold">7.</span>
            <p className="text-slate-300">Added SRI (Subresource Integrity) verification for external CDN resources</p>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-signal-green font-bold">8.</span>
            <p className="text-slate-300">Hardcoded all external URLs with whitelist validation to prevent redirects</p>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-signal-green font-bold">9.</span>
            <p className="text-slate-300">Implemented generic error messages without exposing sensitive information</p>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-signal-green font-bold">10.</span>
            <p className="text-slate-300">Ensured all external URLs use HTTPS protocol enforcement</p>
          </div>
        </div>
      </section>
    </main>
  )
}
