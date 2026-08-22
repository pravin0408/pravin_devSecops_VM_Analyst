import React, { Suspense } from 'react'
import ImmersiveScene from '../components/ImmersiveScene.jsx'

export default function Home() {
  return (
    <>
      {/* Loading screen while 3D loads */}
      <Suspense
        fallback={
          <div className="fixed inset-0 bg-void grid place-items-center z-50">
            <div className="text-center font-mono">
              <div className="text-signal-cyan text-sm animate-flicker mb-3">
                INITIALIZING 3D ENVIRONMENT…
              </div>
              <div className="w-48 h-0.5 bg-void-line mx-auto overflow-hidden rounded-full">
                <div className="h-full bg-signal-cyan animate-pulse" style={{ width: '60%' }} />
              </div>
              <div className="mt-4 text-[10px] text-signal-dim space-y-1">
                <p>Loading shaders…</p>
                <p>Building scene graph…</p>
                <p>Establishing secure connection…</p>
              </div>
            </div>
          </div>
        }
      >
        <ImmersiveScene />
      </Suspense>

      {/* Fixed scroll indicator at bottom */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 pointer-events-none">
        <div className="flex flex-col items-center gap-2 animate-bounce">
          <span className="font-mono text-[10px] text-signal-cyan/60 uppercase tracking-widest">
            Scroll to explore
          </span>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            className="text-signal-cyan/50"
          >
            <path
              d="M8 2v12M3 9l5 5 5-5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </>
  )
}
