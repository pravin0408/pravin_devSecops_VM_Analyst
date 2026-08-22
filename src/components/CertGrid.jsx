import React from 'react'

export default function CertGrid({ certs, onSelect }) {
  if (!certs?.length) {
    return <p className="text-signal-dim font-mono text-sm">No certifications indexed yet.</p>
  }

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {certs.map((cert) => (
        <button
          key={cert.id}
          onClick={() => onSelect(cert)}
          className="group text-left panel p-4 hover:border-signal-cyan/50 hover:shadow-glowcyan transition-all duration-200"
        >
          <div className="flex items-start justify-between mb-3">
            <span className="text-[10px] font-mono uppercase tracking-widest text-signal-dim">
              {cert.category}
            </span>
            <span className="text-[10px] font-mono text-signal-green">VERIFIED</span>
          </div>
          <h3 className="font-display text-lg font-600 text-white group-hover:text-signal-cyan transition-colors leading-tight">
            {cert.name}
          </h3>
          <p className="text-xs text-slate-500 mt-1 font-mono">{cert.issuer}</p>
          <div className="flex items-center justify-between mt-4 pt-3 border-t border-void-line">
            <span className="text-[11px] font-mono text-signal-dim">{cert.date || '—'}</span>
            <span className="text-[11px] font-mono text-signal-cyan opacity-0 group-hover:opacity-100 transition-opacity">
              VIEW →
            </span>
          </div>
        </button>
      ))}
    </div>
  )
}
