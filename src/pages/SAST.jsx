import React from 'react'
import { Link } from 'react-router-dom'

export default function SAST() {
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
        <div className="text-5xl mb-4">{ }</div>
        <h1 className="font-display text-4xl sm:text-5xl font-700 text-white mb-4">
          Static Application Security Testing (SAST)
        </h1>
        <p className="text-lg text-slate-400 leading-relaxed">
          SAST analyzes source code, bytecode, or binaries for security vulnerabilities without executing the application. 
          It's your first line of defense in catching security issues early in the development lifecycle.
        </p>
      </div>

      {/* What is SAST */}
      <section className="panel p-8 mb-8">
        <h2 className="font-display text-2xl font-600 text-white mb-4">What is SAST?</h2>
        <div className="space-y-4 text-slate-400 leading-relaxed">
          <p>
            SAST (Static Application Security Testing) is a white-box security testing methodology that 
            examines an application's source code, bytecode, or binary code for security vulnerabilities 
            while the application is not running.
          </p>
          <p>
            Unlike dynamic testing (DAST), SAST doesn't require a running application. It analyzes the code 
            structure, data flow, and control flow to identify potential security flaws such as SQL injection, 
            cross-site scripting (XSS), buffer overflows, and insecure cryptographic practices.
          </p>
        </div>
      </section>

      {/* How SAST Works */}
      <section className="mb-8">
        <h2 className="font-display text-2xl font-600 text-white mb-6">How SAST Works</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            {
              step: '01',
              title: 'Code Parsing',
              description: 'The tool parses source code to create an Abstract Syntax Tree (AST) representing the code structure',
            },
            {
              step: '02',
              title: 'Pattern Matching',
              description: 'Security rules and patterns are applied to identify known vulnerability patterns in the code',
            },
            {
              step: '03',
              title: 'Data Flow Analysis',
              description: 'Traces how data moves through the application to identify taint propagation and injection risks',
            },
            {
              step: '04',
              title: 'Report Generation',
              description: 'Findings are categorized by severity with exact file locations and remediation guidance',
            },
          ].map((item) => (
            <div key={item.step} className="panel p-6">
              <div className="text-signal-cyan font-mono text-sm mb-2">[{item.step}]</div>
              <h3 className="font-display text-lg font-600 text-white mb-2">{item.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Popular SAST Tools */}
      <section className="panel p-8 mb-8">
        <h2 className="font-display text-2xl font-600 text-white mb-6">Popular SAST Tools</h2>
        <div className="space-y-4">
          {[
            {
              name: 'Semgrep',
              type: 'Open Source',
              description: 'Fast, lightweight static analysis tool with customizable rules. Great for CI/CD integration.',
              languages: 'Python, JavaScript, Java, Go, Ruby, PHP, C, C++',
            },
            {
              name: 'Checkmarx',
              type: 'Commercial',
              description: 'Enterprise-grade SAST platform with comprehensive language support and detailed remediation guidance.',
              languages: 'Java, .NET, JavaScript, Python, PHP, Ruby, C/C++, and 25+ more',
            },
            {
              name: 'SonarQube',
              type: 'Open Source / Commercial',
              description: 'Code quality and security platform that identifies bugs, code smells, and security vulnerabilities.',
              languages: 'Java, C#, JavaScript, TypeScript, Python, C/C++, and more',
            },
            {
              name: 'Bandit',
              type: 'Open Source',
              description: 'Python-specific security linter that finds common security issues in Python code.',
              languages: 'Python',
            },
          ].map((tool) => (
            <div key={tool.name} className="border border-void-line rounded-sm p-4 hover:border-signal-cyan/40 transition-colors">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-display text-lg font-600 text-white">{tool.name}</h3>
                <span className="text-xs px-2 py-1 rounded-sm bg-signal-cyan/10 text-signal-cyan border border-signal-cyan/30">
                  {tool.type}
                </span>
              </div>
              <p className="text-sm text-slate-400 mb-3">{tool.description}</p>
              <div className="text-xs text-signal-dim">
                <span className="font-semibold">Languages:</span> {tool.languages}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Common Vulnerabilities Detected */}
      <section className="mb-8">
        <h2 className="font-display text-2xl font-600 text-white mb-6">Common Vulnerabilities Detected by SAST</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            { name: 'SQL Injection', owasp: 'A03:2021', severity: 'critical' },
            { name: 'Cross-Site Scripting (XSS)', owasp: 'A03:2021', severity: 'high' },
            { name: 'Hardcoded Credentials', owasp: 'A07:2021', severity: 'critical' },
            { name: 'Insecure Deserialization', owasp: 'A08:2021', severity: 'high' },
            { name: 'Path Traversal', owasp: 'A01:2021', severity: 'high' },
            { name: 'Command Injection', owasp: 'A03:2021', severity: 'critical' },
            { name: 'Weak Cryptography', owasp: 'A02:2021', severity: 'medium' },
            { name: 'Insecure Random Values', owasp: 'A02:2021', severity: 'medium' },
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

      {/* Implementing SAST */}
      <section className="panel p-8 mb-8">
        <h2 className="font-display text-2xl font-600 text-white mb-4">Implementing SAST in Your Pipeline</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-signal-cyan font-semibold mb-3">1. Choose the Right Tool</h3>
            <p className="text-sm text-slate-400 leading-relaxed mb-2">
              Select a SAST tool that supports your programming languages and integrates with your development workflow.
            </p>
          </div>
          
          <div>
            <h3 className="text-signal-cyan font-semibold mb-3">2. Integrate into CI/CD</h3>
            <p className="text-sm text-slate-400 leading-relaxed mb-3">
              Add SAST scans to your pipeline to catch vulnerabilities before code reaches production.
            </p>
            <div className="panel p-4 bg-void">
              <div className="flex items-center gap-2 mb-2 pb-2 border-b border-void-line">
                <div className="w-2 h-2 rounded-full bg-signal-red/70" />
                <div className="w-2 h-2 rounded-full bg-signal-amber/70" />
                <div className="w-2 h-2 rounded-full bg-signal-green/70" />
                <span className="ml-2 text-xs text-signal-dim">.gitlab-ci.yml</span>
              </div>
              <pre className="text-xs text-slate-300 leading-relaxed overflow-x-auto"><code>{`sast_scan:
  stage: test
  image: python:3.12-slim
  script:
    - pip install semgrep
    - semgrep ci --config=p/owasp-top-ten --error
  rules:
    - if: '$CI_PIPELINE_SOURCE == "merge_request_event"'`}</code></pre>
            </div>
          </div>

          <div>
            <h3 className="text-signal-cyan font-semibold mb-3">3. Define Security Policies</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Set severity thresholds and determine which findings should block builds vs. generate warnings.
            </p>
          </div>

          <div>
            <h3 className="text-signal-cyan font-semibold mb-3">4. Train Developers</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Ensure your team understands how to interpret SAST findings and fix vulnerabilities correctly.
            </p>
          </div>
        </div>
      </section>

      {/* Best Practices */}
      <section className="panel p-8 mb-8 bg-void-panel/50">
        <h2 className="font-display text-2xl font-600 text-white mb-6">SAST Best Practices</h2>
        <div className="grid md:grid-cols-2 gap-6 text-sm">
          <div>
            <h3 className="text-signal-green font-semibold mb-3 flex items-center gap-2">
              <span>✓</span> DO
            </h3>
            <ul className="space-y-2 text-slate-400">
              <li>• Run SAST scans early and often in the development cycle</li>
              <li>• Integrate SAST into your IDE for real-time feedback</li>
              <li>• Customize rules to match your organization's security policies</li>
              <li>• Prioritize findings based on exploitability and business impact</li>
              <li>• Track metrics: time to remediation, false positive rate, coverage</li>
            </ul>
          </div>
          <div>
            <h3 className="text-signal-red font-semibold mb-3 flex items-center gap-2">
              <span>✗</span> DON'T
            </h3>
            <ul className="space-y-2 text-slate-400">
              <li>• Don't rely solely on SAST — combine with DAST and manual testing</li>
              <li>• Don't ignore false positives — tune your tool to reduce noise</li>
              <li>• Don't wait until just before release to run SAST</li>
              <li>• Don't treat all findings equally — prioritize by risk</li>
              <li>• Don't forget to scan third-party dependencies</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Resources */}
      <section className="panel p-8">
        <h2 className="font-display text-2xl font-600 text-white mb-6">Additional Resources</h2>
        <div className="space-y-3">
          {[
            { title: 'OWASP Static Analysis Tools', url: 'https://owasp.org/www-community/Source_Code_Analysis_Tools' },
            { title: 'Semgrep Documentation', url: 'https://semgrep.dev/docs/' },
            { title: 'NIST SAST Guide', url: 'https://csrc.nist.gov/projects/ssdf' },
            { title: 'CWE - Common Weakness Enumeration', url: 'https://cwe.mitre.org/' },
          ].map((resource) => (
            <a
              key={resource.title}
              href={resource.url}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between p-3 border border-void-line hover:border-signal-cyan/40 rounded-sm transition-colors group"
            >
              <span className="text-sm text-slate-300 group-hover:text-signal-cyan">{resource.title}</span>
              <span className="text-signal-cyan text-xs">↗</span>
            </a>
          ))}
        </div>
      </section>

      {/* Next Steps */}
      <div className="mt-12 flex gap-3">
        <Link to="/learn/dast" className="btn-console">
          Next: Learn DAST →
        </Link>
        <Link to="/automation" className="btn-console !border-signal-dim/40 !text-slate-300">
          View My SAST Scripts
        </Link>
      </div>
    </main>
  )
}
