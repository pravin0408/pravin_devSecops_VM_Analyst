import React, { useEffect } from 'react'

export default function CertModal({ cert, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  if (!cert) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-void/90 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={cert.name}
    >
      <div
        className="panel max-w-2xl w-full max-h-[85vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 py-3 border-b border-void-line">
          <span className="eyebrow">Certificate Record</span>
          <button
            onClick={onClose}
            className="text-signal-dim hover:text-signal-cyan font-mono text-sm"
            aria-label="Close"
          >
            [ ESC ]
          </button>
        </div>

        <div className="p-5 space-y-4">
          <div className="aspect-video w-full bg-void border border-void-line rounded-sm overflow-hidden grid place-items-center">
            <img
              src={cert.image}
              alt={`${cert.name} certificate`}
              className="w-full h-full object-contain"
              onError={(e) => {
                e.currentTarget.style.display = 'none'
                e.currentTarget.parentElement.dataset.fallback = 'true'
              }}
            />
            <div className="hidden data-[fallback=true]:flex flex-col items-center gap-2 text-signal-dim font-mono text-xs">
              <span>NO IMAGE ON FILE</span>
              <span className="text-[10px]">drop the file at {cert.image}</span>
            </div>
          </div>

          <div>
            <h3 className="font-display text-xl font-600 text-white">{cert.name}</h3>
            <p className="text-sm text-slate-400 mt-1">{cert.issuer}</p>
          </div>

          <dl className="grid grid-cols-2 gap-4 text-xs font-mono border-t border-void-line pt-4">
            <div>
              <dt className="text-signal-dim uppercase tracking-widest">Issued</dt>
              <dd className="text-slate-300 mt-1">{cert.date || 'Not listed on certificate'}</dd>
            </div>
            <div>
              <dt className="text-signal-dim uppercase tracking-widest">Category</dt>
              <dd className="text-slate-300 mt-1">{cert.category}</dd>
            </div>
            <div className="col-span-2">
              <dt className="text-signal-dim uppercase tracking-widest">Verification ID</dt>
              <dd className="text-signal-cyan mt-1">{cert.verificationId || 'Not listed on certificate'}</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  )
}
