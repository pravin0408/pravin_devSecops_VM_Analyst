import React from 'react'

const TYPE_STYLE = {
  certification: { dot: 'bg-signal-cyan shadow-glowcyan', label: 'text-signal-cyan', tag: 'CERT' },
  cve: { dot: 'bg-signal-red', label: 'text-signal-red', tag: 'CVE' },
  project: { dot: 'bg-signal-green shadow-glowgreen', label: 'text-signal-green', tag: 'PROJECT' },
}

export default function Timeline({ items }) {
  const sorted = [...(items || [])].sort((a, b) => new Date(a.date) - new Date(b.date))

  return (
    <div className="relative pl-6 sm:pl-8">
      <div className="absolute left-[7px] sm:left-[11px] top-1 bottom-1 w-px bg-void-line" />
      <div className="space-y-6">
        {sorted.map((item) => {
          const s = TYPE_STYLE[item.type] || TYPE_STYLE.project
          return (
            <div key={item.id} className="relative">
              <span className={`absolute -left-6 sm:-left-8 top-1.5 w-2.5 h-2.5 rounded-full ${s.dot}`} />
              <div className="panel p-4">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <span className={`text-[10px] font-mono uppercase tracking-widest ${s.label}`}>{s.tag}</span>
                  <span className="text-[10px] font-mono text-signal-dim">{item.date}</span>
                </div>
                <h4 className="font-display text-base font-600 text-white">{item.title}</h4>
                <p className="text-xs text-slate-400 font-mono mt-1">{item.detail}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
