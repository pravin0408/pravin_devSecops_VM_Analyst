import React from 'react'
import { Link } from 'react-router-dom'

export default function DAST() {
  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 pt-24 pb-20">
      {/* Breadcrumb */}
      <div className="mb-8">
        <Link to="/learn" className="text-xs text-signal-cyan hover:underline">
          ← Back to Learning Hub
        </Link>
      </div>

      {/* Header */}
      <div className="mb-12">
        <div className="text-5xl mb-4">⚡</div>
        <h1 className="font-display text-4xl sm:text-5xl font-700 text-white mb-4">
          Dynamic Application Security Testing (DAST)
        </h1>
        <p className="text-lg text-slate-400 leading-relaxed">
          DAST tests running applications from the outside-in, simulating real-world attacks to identify 
          runtime vulnerabilities. It's essential for finding issues that only appear when code is executed.
        </p>
      </div>

      {/* What is DAST */}
      <section className="panel p-8 mb-8">
        <h2 className="font-display text-2xl font-600 text-white mb-4">What is DAST?</h2>
        <div className="space-y-4 text-slate-400 leading-relaxed">
          <p>
            DAST (Dynamic Application Security Testing) is a black-box security testing methodology that 
            analyzes running applications by simulating external attacks. Unlike SAST, which examines source code, 
            DAST interacts with the application through its exposed interfaces (web pages, APIs, services).
          </p>
          <p>
            DAST tools crawl the application, identify entry points, and automatically inject attack payloads 
            to discover vulnerabilities like SQL injection, XSS, authentication bypass, and configuration issues. 
            It validates vulnerabilities in the actual runtime environment, including the web server, database, 
            and application logic working together.
          </p>
        </div>
      </section>

      {/* How DAST Works */}
      <section className="mb-8">
        <h2 className="font-display text-2xl font-600 text-white mb-6">How DAST Works</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            {
              step: '01',
              title: 'Crawling & Discovery',
              description: 'The scanner crawls the application to map all pages, forms, APIs, and parameters',
            },
            {
              step: '02',
              title: 'Attack Simulation',
              description: 'Automated injection of malicious payloads to test for common vulnerabilities',
            },
            {
              step: '03',
              title: 'Response Analysis',
              description: 'Analyzes application responses to detect security flaws and misconfigurations',
            },
            {
              step: '04',
              title: 'Vulnerability Reporting',
              description: 'Generates detailed reports with proof-of-concept requests and remediation steps',
            },
          ].map((item) => (
            <div key={item.step} className="panel p-6">
              <div className="text-signal-green font-mono text-sm mb-2">[{item.step}]</div>
              <h3 className="font-display text-lg font-600 text-white mb-2">{item.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Popular DAST Tools */}
      <section className="panel p-8 mb-8">
        <h2 className="font-display text-2xl font-600 text-white mb-6">Popular DAST Tools</h2>
        <div className="space-y-4">
          {[
            {
              name: 'OWASP ZAP',
              type: 'Open Source',
              description: 'Zed Attack Proxy - world\'s most widely used web app scanner. Great for both automated and manual testing.',
              features: 'Active/Passive Scanning, API Testing, Automation Framework',
            },
            {
              name: 'Burp Suite Professional',
              type: 'Commercial',
              description: 'Industry-standard web vulnerability scanner with advanced manual testing capabilities.',
              features: 'Scanner, Intruder, Repeater, Collaborator, Extensions',
            },
            {
              name: 'Rapid7 InsightAppSec',
              type: 'Commercial',
              description: 'Cloud-based DAST platform for continuous web application security testing and monitoring.',
              features: 'Automated Scanning, CI/CD Integration, API Testing',
            },
            {
              name: 'Acunetix',
              type: 'Commercial',
              description: 'Automated web vulnerability scanner that can crawl and test thousands of pages.',
              features: 'JavaScript Rendering, Network Scanning, Compliance Reporting',
            },
          ].map((tool) => (
            <div key={tool.name} className="border border-void-line rounded-sm p-4 hover:border-signal-green/40 transition-colors">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-display text-lg font-600 text-white">{tool.name}</h3>
                <span className="text-xs px-2 py-1 rounded-sm bg-signal-green/10 text-signal-green border border-signal-green/30">
                  {tool.type}
                </span>
              </div>
              <p className="text-sm text-slate-400 mb-3">{tool.description}</p>
              <div className="text-xs text-signal-dim">
                <span className="font-semibold">Features:</span> {tool.features}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Common Vulnerabilities Detected */}
      <section className="mb-8">
        <h2 className="font-display text-2xl font-600 text-white mb-6">Common Vulnerabilities Detected by DAST</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            { name: 'SQL Injection', owasp: 'A03:2021', severity: 'critical' },
            { name: 'Cross-Site Scripting (XSS)', owasp: 'A03:2021', severity: 'high' },
            { name: 'Broken Authentication', owasp: 'A07:2021', severity: 'critical' },
            { name: 'Security Misconfiguration', owasp: 'A05:2021', severity: 'high' },
            { name: 'CSRF Vulnerabilities', owasp: 'A01:2021', severity: 'medium' },
            { name: 'Insecure Direct Object References', owasp: 'A01:2021', severity: 'high' },
            { name: 'Server-Side Request Forgery', owasp: 'A10:2021', severity: 'high' },
            { name: 'HTTP Security Headers Missing', owasp: 'A05:2021', severity: 'low' },
          ].map((vuln) => (
            <div key={vuln.name} className="panel p-4 flex items-center justify-between">
              <div>
                <h3 className="text-white font-semibold mb-1">{vuln.name}</h3>
                <p className="text-xs text-signal-dim">{vuln.owasp}</p>
              </div>
              <span className={`text-xs px-2 py-1 rounded-sm border severity-${vuln.severity}`}>
                {vuln.severity.toUpperCase()}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Implementing DAST */}
      <section className="panel p-8 mb-8">
        <h2 className="font-display text-2xl font-600 text-white mb-4">Implementing DAST in Your Pipeline</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-signal-green font-semibold mb-3">1. Set Up Target Environment</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Deploy your application to a staging or test environment that mirrors production. DAST requires 
              a running application with realistic data and configurations.
            </p>
          </div>
          
          <div>
            <h3 className="text-signal-green font-semibold mb-3">2. Configure Authentication</h3>
            <p className="text-sm text-slate-400 leading-relaxed mb-3">
              Set up test accounts and configure the scanner to authenticate. This allows testing of 
              authenticated functionality and authorized vs. unauthorized access.
            </p>
          </div>

          <div>
            <h3 className="text-signal-green font-semibold mb-3">3. Integrate into CI/CD</h3>
            <p className="text-sm text-slate-400 leading-relaxed mb-3">
              Run DAST scans automatically on every deployment to staging or as part of your release pipeline.
            </p>
            <div className="panel p-4 bg-void">
              <div className="flex items-center gap-2 mb-2 pb-2 border-b border-void-line">
                <div className="w-2 h-2 rounded-full bg-signal-red/70" />
                <div className="w-2 h-2 rounded-full bg-signal-amber/70" />
                <div className="w-2 h-2 rounded-full bg-signal-green/70" />
                <span className="ml-2 text-xs text-signal-dim">dast_scan.sh</span>
              </div>
              <pre className="text-xs text-slate-300 leading-relaxed overflow-x-auto"><code>{`#!/bin/bash
TARGET="\${1:?usage: dast_scan.sh <target-url>}"

docker run --rm owasp/zap2docker-stable \\
  zap-baseline.py \\
  -t "\${TARGET}" \\
  -r zap-report.html \\
  -I

if grep -q "FAIL-NEW" zap-report.html; then
  echo "New high-risk findings detected"
  exit 1
fi`}</code></pre>
            </div>
          </div>

          <div>
            <h3 className="text-signal-green font-semibold mb-3">4. Review and Validate Findings</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Manually verify critical findings to eliminate false positives before creating remediation tickets.
            </p>
          </div>
        </div>
      </section>

      {/* DAST vs SAST */}
      <section className="panel p-8 mb-8 bg-void-panel/50">
        <h2 className="font-display text-2xl font-600 text-white mb-6">DAST vs SAST: When to Use Each</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-void-line">
                <th className="text-left p-3 text-signal-cyan font-semibold">Aspect</th>
                <th className="text-left p-3 text-signal-green font-semibold">DAST</th>
                <th className="text-left p-3 text-signal-amber font-semibold">SAST</th>
              </tr>
            </thead>
            <tbody className="text-slate-400">
              <tr className="border-b border-void-line/50">
                <td className="p-3 font-semibold">Testing Approach</td>
                <td className="p-3">Black-box (external)</td>
                <td className="p-3">White-box (internal)</td>
              </tr>
              <tr className="border-b border-void-line/50">
                <td className="p-3 font-semibold">Code Access</td>
                <td className="p-3">Not required</td>
                <td className="p-3">Required</td>
              </tr>
              <tr className="border-b border-void-line/50">
                <td className="p-3 font-semibold">When to Run</td>
                <td className="p-3">After deployment (staging/prod)</td>
                <td className="p-3">During development (pre-commit)</td>
              </tr>
              <tr className="border-b border-void-line/50">
                <td className="p-3 font-semibold">Speed</td>
                <td className="p-3">Slower (minutes to hours)</td>
                <td className="p-3">Faster (seconds to minutes)</td>
              </tr>
              <tr className="border-b border-void-line/50">
                <td className="p-3 font-semibold">False Positives</td>
                <td className="p-3">Lower (validated in runtime)</td>
                <td className="p-3">Higher (code patterns)</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold">Best For</td>
                <td className="p-3">Runtime, auth, config issues</td>
                <td className="p-3">Code-level vulnerabilities</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-sm text-signal-cyan">
          💡 Best practice: Use both SAST and DAST together for comprehensive security coverage
        </p>
      </section>

      {/* Best Practices */}
      <section className="panel p-8 mb-8">
        <h2 className="font-display text-2xl font-600 text-white mb-6">DAST Best Practices</h2>
        <div className="grid md:grid-cols-2 gap-6 text-sm">
          <div>
            <h3 className="text-signal-green font-semibold mb-3 flex items-center gap-2">
              <span>✓</span> DO
            </h3>
            <ul className="space-y-2 text-slate-400">
              <li>• Run DAST on a non-production environment first</li>
              <li>• Configure authentication to test protected areas</li>
              <li>• Use baseline scans for regular quick checks</li>
              <li>• Schedule full scans during off-peak hours</li>
              <li>• Validate findings before filing bugs</li>
              <li>• Test APIs in addition to web interfaces</li>
            </ul>
          </div>
          <div>
            <h3 className="text-signal-red font-semibold mb-3 flex items-center gap-2">
              <span>✗</span> DON'T
            </h3>
            <ul className="space-y-2 text-slate-400">
              <li>• Don't run aggressive scans on production without permission</li>
              <li>• Don't ignore rate limits — you may trigger DoS protections</li>
              <li>• Don't scan third-party sites without authorization</li>
              <li>• Don't rely only on DAST — combine with SAST and manual testing</li>
              <li>• Don't forget to scan after infrastructure changes</li>
              <li>• Don't skip manual validation of critical findings</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Resources */}
      <section className="panel p-8">
        <h2 className="font-display text-2xl font-600 text-white mb-6">Additional Resources</h2>
        <div className="space-y-3">
          {[
            { title: 'OWASP ZAP Getting Started', url: 'https://www.zaproxy.org/getting-started/' },
            { title: 'PortSwigger Web Security Academy', url: 'https://portswigger.net/web-security' },
            { title: 'OWASP Testing Guide', url: 'https://owasp.org/www-project-web-security-testing-guide/' },
            { title: 'HackerOne Hacker101', url: 'https://www.hacker101.com/' },
          ].map((resource) => (
            <a
              key={resource.title}
              href={resource.url}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between p-3 border border-void-line hover:border-signal-green/40 rounded-sm transition-colors group"
            >
              <span className="text-sm text-slate-300 group-hover:text-signal-green">{resource.title}</span>
              <span className="text-signal-green text-xs">↗</span>
            </a>
          ))}
        </div>
      </section>

      {/* Next Steps */}
      <div className="mt-12 flex gap-3">
        <Link to="/learn/pentesting" className="btn-console">
          Next: Learn Pentesting →
        </Link>
        <Link to="/automation" className="btn-console !border-signal-dim/40 !text-slate-300">
          View My DAST Scripts
        </Link>
      </div>
    </main>
  )
}
