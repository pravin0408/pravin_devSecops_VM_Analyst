import React, { useState } from 'react'

// ---------------------------------------------------------------------
// Automation scripts (read-only reference files)
// ---------------------------------------------------------------------
const SCRIPTS = [
  {
    id: 'gitlab-ci',
    file: '.gitlab-ci.yml',
    lang: 'yaml',
    code: `stages:
  - build
  - sast
  - dast
  - deploy

sast_scan:
  stage: sast
  image: python:3.12-slim
  script:
    - pip install bandit semgrep
    - semgrep ci --config=p/owasp-top-ten --error
    - bandit -r ./src -f json -o bandit-report.json
  artifacts:
    when: always
    reports:
      sast: bandit-report.json
  rules:
    - if: '$CI_PIPELINE_SOURCE == "merge_request_event"'

dast_baseline:
  stage: dast
  image: owasp/zap2docker-stable
  script:
    - zap-baseline.py -t $STAGING_URL -r zap-report.html -I
  artifacts:
    when: always
    paths: [zap-report.html]
  rules:
    - if: '$CI_COMMIT_BRANCH == "staging"'`,
  },
  {
    id: 'sast-py',
    file: 'sast_scan.py',
    lang: 'python',
    code: `#!/usr/bin/env python3
"""Fail the pipeline if Semgrep finds high-confidence OWASP findings."""
import json
import subprocess
import sys

SEVERITY_GATE = {"ERROR", "WARNING"}

def run_semgrep() -> dict:
    result = subprocess.run(
        ["semgrep", "--config=p/owasp-top-ten", "--json"],
        capture_output=True, text=True, check=False,
    )
    return json.loads(result.stdout or "{}")

def main() -> None:
    report = run_semgrep()
    blocking = [
        f for f in report.get("results", [])
        if f["extra"]["severity"] in SEVERITY_GATE
    ]
    if blocking:
        print(f"::error:: {len(blocking)} blocking finding(s) detected")
        for f in blocking:
            print(f"  - {f['check_id']} @ {f['path']}:{f['start']['line']}")
        sys.exit(1)
    print("SAST gate passed — no blocking findings.")

if __name__ == "__main__":
    main()`,
  },
  {
    id: 'dast-sh',
    file: 'dast_baseline.sh',
    lang: 'bash',
    code: `#!/usr/bin/env bash
set -euo pipefail

TARGET="\${1:?usage: dast_baseline.sh <target-url>}"
REPORT="zap-report-$(date +%Y%m%d%H%M).html"

echo "[dast] launching ZAP baseline scan against \${TARGET}"

docker run --rm -v "$(pwd)":/zap/wrk/:rw owasp/zap2docker-stable \\
  zap-baseline.py \\
  -t "\${TARGET}" \\
  -r "\${REPORT}" \\
  -I

echo "[dast] report written to \${REPORT}"

if grep -q "FAIL-NEW" "\${REPORT}"; then
  echo "[dast] new high-confidence findings detected — failing build"
  exit 1
fi`,
  },
]

// ---------------------------------------------------------------------
// OWASP Top 10 — vulnerable vs. remediated code pairs
// ---------------------------------------------------------------------
const OWASP = [
  {
    id: 'a03-sqli',
    tag: 'A03:2021',
    title: 'SQL Injection',
    file: 'user_repository.py',
    before: `def get_user(username):
    query = (
        "SELECT * FROM users WHERE username = '"
        + username + "'"
    )
    return db.execute(query).fetchone()`,
    after: `def get_user(username):
    query = "SELECT * FROM users WHERE username = %s"
    return db.execute(query, (username,)).fetchone()
    # parameterized query — the driver escapes the
    # value instead of concatenating raw input`,
  },
  {
    id: 'a01-idor',
    tag: 'A01:2021',
    title: 'Broken Access Control (IDOR)',
    file: 'invoices_controller.py',
    before: `@app.get("/invoices/<id>")
def get_invoice(id):
    invoice = db.get_invoice(id)
    return jsonify(invoice)
    # any authenticated user can read
    # any invoice by guessing the id`,
    after: `@app.get("/invoices/<id>")
@require_auth
def get_invoice(id):
    invoice = db.get_invoice(id)
    if invoice.owner_id != current_user.id:
        abort(403)
    return jsonify(invoice)
    # explicit ownership check before returning data`,
  },
  {
    id: 'a07-secrets',
    tag: 'A07:2021',
    title: 'Hardcoded Credentials',
    file: 'db_config.py',
    before: `DB_HOST = "prod-db.internal"
DB_USER = "admin"
DB_PASSWORD = "Summer2023!"
# committed straight into version control`,
    after: `import os

DB_HOST = os.environ["DB_HOST"]
DB_USER = os.environ["DB_USER"]
DB_PASSWORD = os.environ["DB_PASSWORD"]
# values injected at deploy time via a secrets
# manager (e.g. AWS Secrets Manager / Vault)`,
  },
  {
    id: 'a03-xss',
    tag: 'A03:2021',
    title: 'Stored XSS',
    file: 'report_view.jsx',
    before: `function ReportTitle({ title }) {
  return (
    <h1 dangerouslySetInnerHTML={{ __html: title }} />
  );
}`,
    after: `function ReportTitle({ title }) {
  // React escapes text content by default —
  // rendering as plain text removes the sink entirely
  return <h1>{title}</h1>;
}`,
  },
]

function CodeBlock({ code }) {
  return (
    <pre className="text-[12px] sm:text-[13px] leading-relaxed text-slate-300 whitespace-pre overflow-x-auto p-4 font-mono">
      <code>{code}</code>
    </pre>
  )
}

function WindowChrome({ children, title }) {
  return (
    <div className="panel overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-void-line bg-void-raised">
        <span className="w-2.5 h-2.5 rounded-full bg-signal-red/70" />
        <span className="w-2.5 h-2.5 rounded-full bg-signal-amber/70" />
        <span className="w-2.5 h-2.5 rounded-full bg-signal-green/70" />
        <span className="ml-3 text-[11px] font-mono text-signal-dim">{title}</span>
      </div>
      {children}
    </div>
  )
}

export default function TerminalShowcase({ standalone = false }) {
  const [mode, setMode] = useState('automation') // 'automation' | 'owasp'
  const [activeScript, setActiveScript] = useState(SCRIPTS[0].id)
  const [activeOwasp, setActiveOwasp] = useState(OWASP[0].id)
  const [view, setView] = useState('after') // 'before' | 'after'

  const script = SCRIPTS.find((s) => s.id === activeScript)
  const lesson = OWASP.find((o) => o.id === activeOwasp)

  return (
    <div className={standalone ? 'max-w-7xl mx-auto px-4 sm:px-6 pt-24 pb-20' : ''}>
      {standalone && (
        <div className="mb-8">
          <p className="eyebrow mb-2">// AppSec &amp; Automation</p>
          <h1 className="font-display text-3xl sm:text-4xl font-700 text-white">Operations Terminal</h1>
          <p className="mt-2 text-sm text-slate-400 font-mono max-w-2xl">
            Reference automation from real GitLab CI/CD pipelines, and side-by-side fixes for
            common OWASP Top 10 findings.
          </p>
        </div>
      )}

      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setMode('automation')}
          className={`px-3 py-1.5 text-[11px] font-mono uppercase tracking-widest border rounded-sm transition-colors ${
            mode === 'automation'
              ? 'border-signal-cyan text-signal-cyan bg-signal-cyan/10'
              : 'border-void-line text-signal-dim hover:text-slate-300'
          }`}
        >
          CI/CD Automation
        </button>
        <button
          onClick={() => setMode('owasp')}
          className={`px-3 py-1.5 text-[11px] font-mono uppercase tracking-widest border rounded-sm transition-colors ${
            mode === 'owasp'
              ? 'border-signal-green text-signal-green bg-signal-green/10'
              : 'border-void-line text-signal-dim hover:text-slate-300'
          }`}
        >
          OWASP Before / After
        </button>
      </div>

      {mode === 'automation' ? (
        <WindowChrome title="pravin@ops-console — scripts">
          <div className="flex flex-col sm:flex-row">
            <div className="sm:w-52 shrink-0 border-b sm:border-b-0 sm:border-r border-void-line bg-void-panel/50 flex sm:flex-col overflow-x-auto">
              {SCRIPTS.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setActiveScript(s.id)}
                  className={`shrink-0 text-left px-4 py-2.5 text-xs font-mono border-b border-void-line whitespace-nowrap ${
                    activeScript === s.id
                      ? 'text-signal-cyan bg-void-raised border-l-2 border-l-signal-cyan'
                      : 'text-slate-500 hover:text-slate-300 border-l-2 border-l-transparent'
                  }`}
                >
                  {s.file}
                </button>
              ))}
            </div>
            <div className="flex-1 min-w-0">
              <CodeBlock code={script.code} />
            </div>
          </div>
        </WindowChrome>
      ) : (
        <WindowChrome title="pravin@ops-console — owasp-remediation">
          <div className="flex flex-col sm:flex-row">
            <div className="sm:w-60 shrink-0 border-b sm:border-b-0 sm:border-r border-void-line bg-void-panel/50 flex sm:flex-col overflow-x-auto">
              {OWASP.map((o) => (
                <button
                  key={o.id}
                  onClick={() => setActiveOwasp(o.id)}
                  className={`shrink-0 text-left px-4 py-2.5 text-xs font-mono border-b border-void-line whitespace-nowrap ${
                    activeOwasp === o.id
                      ? 'text-signal-green bg-void-raised border-l-2 border-l-signal-green'
                      : 'text-slate-500 hover:text-slate-300 border-l-2 border-l-transparent'
                  }`}
                >
                  <span className="block text-signal-dim text-[10px]">{o.tag}</span>
                  {o.title}
                </button>
              ))}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between px-4 py-2 border-b border-void-line bg-void-panel/40">
                <span className="text-[11px] font-mono text-signal-dim">{lesson.file}</span>
                <div className="flex text-[10px] font-mono uppercase tracking-widest border border-void-line rounded-sm overflow-hidden">
                  <button
                    onClick={() => setView('before')}
                    className={`px-3 py-1 ${view === 'before' ? 'bg-signal-red/15 text-signal-red' : 'text-signal-dim'}`}
                  >
                    Before
                  </button>
                  <button
                    onClick={() => setView('after')}
                    className={`px-3 py-1 ${view === 'after' ? 'bg-signal-green/15 text-signal-green' : 'text-signal-dim'}`}
                  >
                    After
                  </button>
                </div>
              </div>
              <CodeBlock code={view === 'before' ? lesson.before : lesson.after} />
            </div>
          </div>
        </WindowChrome>
      )}
    </div>
  )
}
