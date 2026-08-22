import React, { useEffect, useState } from 'react'
import CertGrid from './CertGrid.jsx'
import CertModal from './CertModal.jsx'
import Timeline from './Timeline.jsx'

// import.meta.env.BASE_URL respects Vite's `base` config, so this fetch
// resolves correctly whether the site is served at the domain root or from
// a GitHub Pages project subpath (e.g. /pravin_devsecops/).
const BASE = import.meta.env.BASE_URL

export default function EvidenceDashboard() {
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [selectedCert, setSelectedCert] = useState(null)

  useEffect(() => {
    fetch(`${BASE}data.json`)
      .then((r) => {
        if (!r.ok) throw new Error('data.json not found')
        return r.json()
      })
      .then(setData)
      .catch((e) => setError(e.message))
  }, [])

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-24 pb-20">
      <div className="mb-10 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <p className="eyebrow mb-2">// Unified Evidence Portal</p>
          <h1 className="font-display text-3xl sm:text-4xl font-700 text-white">
            Evidence Console
          </h1>
          <p className="mt-2 text-sm text-slate-400 font-mono max-w-2xl">
            Certifications and shipped hardening work — pulled live from{' '}
            <code className="text-signal-cyan">data.json</code>. Update the registry, push, and
            this view rebuilds itself.
          </p>
        </div>
        {data?.profile?.links?.linkedin && (
          <a
            href={data.profile.links.linkedin}
            target="_blank"
            rel="noreferrer"
            className="btn-console shrink-0 !border-signal-cyan/40 self-start sm:self-auto"
          >
            View LinkedIn Profile ↗
          </a>
        )}
      </div>

      {error && (
        <div className="panel p-4 mb-8 border-signal-red/40 text-signal-red text-sm font-mono">
          Failed to load evidence registry: {error}
        </div>
      )}

      {!data ? (
        <div className="font-mono text-signal-cyan text-sm animate-flicker">
          LOADING EVIDENCE REGISTRY…
        </div>
      ) : (
        <div className="space-y-16">
          {/* Certifications */}
          <section>
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-display text-xl sm:text-2xl font-600 text-white">
                Certifications <span className="text-signal-dim text-sm font-mono">({data.certifications.length})</span>
              </h2>
            </div>
            <CertGrid certs={data.certifications} onSelect={setSelectedCert} />
          </section>

          {/* Timeline */}
          <section>
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-display text-xl sm:text-2xl font-600 text-white">
                Consolidated Timeline
              </h2>
            </div>
            <Timeline items={data.timeline} />
          </section>
        </div>
      )}

      <CertModal cert={selectedCert} onClose={() => setSelectedCert(null)} />
    </main>
  )
}
