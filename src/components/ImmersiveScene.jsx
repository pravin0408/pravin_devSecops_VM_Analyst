import React, { useRef, useMemo, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { ScrollControls, useScroll, Html, Sparkles, Line } from '@react-three/drei'
// Post-processing removed to avoid peer-dep conflicts with fiber v8.
// The scene gets its "glow" from emissive materials, bloom-like shader
// tricks in CyberEnvironment, and transparent additive blending.
import * as THREE from 'three'
import { useNavigate } from 'react-router-dom'
import CyberEnvironment from './CyberEnvironment.jsx'

/* ------------------------------------------------------------------ */
/*  Globe (kept from original Scene3D, adapted for immersive scene)   */
/* ------------------------------------------------------------------ */
const NODES = [
  { id: 'evidence',   label: 'Evidence Portal',   sub: 'certs · CVEs · timeline', lat: 18,  lon: 40,   to: '/evidence' },
  { id: 'automation', label: 'AppSec Automation',  sub: 'SAST · DAST · CI/CD',    lat: -22, lon: -60,  to: '/automation' },
  { id: 'about',      label: 'Operator Profile',   sub: 'scroll for briefing',     lat: 55,  lon: -140, to: null },
]

function toXYZ(lat, lon, r) {
  const phi   = (90 - lat)   * (Math.PI / 180)
  const theta = (lon + 180)  * (Math.PI / 180)
  return [
    -r * Math.sin(phi) * Math.cos(theta),
     r * Math.cos(phi),
     r * Math.sin(phi) * Math.sin(theta),
  ]
}

function Globe({ position = [0, 0, 0], scale = 1 }) {
  const group    = useRef()
  const navigate = useNavigate()
  const [hovered, setHovered] = useState(null)

  useFrame((state, delta) => {
    if (group.current) {
      group.current.rotation.y += delta * 0.08
    }
  })

  const radius = 2.4
  const nodePositions = useMemo(
    () => NODES.map((n) => ({ ...n, pos: toXYZ(n.lat, n.lon, radius) })),
    []
  )

  const arcs = useMemo(() => {
    const pts = []
    for (let i = 0; i < nodePositions.length; i++) {
      const a   = new THREE.Vector3(...nodePositions[i].pos)
      const b   = new THREE.Vector3(...nodePositions[(i + 1) % nodePositions.length].pos)
      const mid = a.clone().add(b).multiplyScalar(0.5).normalize().multiplyScalar(radius * 1.35)
      const curve = new THREE.QuadraticBezierCurve3(a, mid, b)
      pts.push(curve.getPoints(24))
    }
    return pts
  }, [nodePositions])

  return (
    <group ref={group} position={position} scale={scale}>
      <mesh>
        <icosahedronGeometry args={[radius, 3]} />
        <meshBasicMaterial color="#0d3b4a" wireframe transparent opacity={0.55} />
      </mesh>
      <mesh>
        <icosahedronGeometry args={[radius * 0.995, 1]} />
        <meshBasicMaterial color="#2fe0ff" wireframe transparent opacity={0.12} />
      </mesh>
      <mesh>
        <sphereGeometry args={[radius * 0.86, 32, 32]} />
        <meshBasicMaterial color="#03141c" transparent opacity={0.85} />
      </mesh>

      {arcs.map((points, i) => (
        <Line key={i} points={points} color="#39ff9d" transparent opacity={0.35} lineWidth={1} />
      ))}

      {nodePositions.map((n) => (
        <group key={n.id} position={n.pos}>
          <mesh
            onPointerOver={(e) => { e.stopPropagation(); setHovered(n.id) }}
            onPointerOut={() => setHovered(null)}
            onClick={() => n.to && navigate(n.to)}
          >
            <sphereGeometry args={[0.07, 16, 16]} />
            <meshBasicMaterial color={hovered === n.id ? '#39ff9d' : '#2fe0ff'} />
          </mesh>
          <Html distanceFactor={7} occlude={false} zIndexRange={[10, 0]}>
            <button
              onClick={() => n.to && navigate(n.to)}
              className={`select-none whitespace-nowrap font-mono text-[10px] sm:text-xs uppercase tracking-widest px-2.5 py-1.5 border rounded-sm transition-all duration-150 ${
                hovered === n.id
                  ? 'border-signal-green text-signal-green bg-void/90 shadow-glowgreen -translate-y-1'
                  : 'border-signal-cyan/40 text-signal-cyan/90 bg-void/80'
              }`}
              onPointerEnter={() => setHovered(n.id)}
              onPointerLeave={() => setHovered(null)}
            >
              <span className="block leading-tight">{n.label}</span>
              <span className="block text-[9px] text-signal-dim normal-case tracking-normal">{n.sub}</span>
            </button>
          </Html>
        </group>
      ))}
    </group>
  )
}

/* ------------------------------------------------------------------ */
/*  STATS strip data                                                  */
/* ------------------------------------------------------------------ */
const STATS = [
  { label: 'Certifications',        value: '04' },
  { label: 'Pipelines Hardened',     value: '14' },
  { label: 'CI/CD Gates Automated',  value: '03' },
  { label: 'Mean Time to Remediate', value: '3.2d' },
]

/* ------------------------------------------------------------------ */
/*  Floating HUD panel wrapper (glass morphism in 3D)                 */
/* ------------------------------------------------------------------ */
function FloatingPanel({ position, rotation = [0, 0, 0], width = 5, height = 3, children, glowColor = '#2fe0ff' }) {
  const ref = useRef()

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.position.y += Math.sin(clock.getElapsedTime() * 0.5 + position[0]) * 0.0008
    }
  })

  return (
    <group ref={ref} position={position} rotation={rotation}>
      {/* glass background */}
      <mesh>
        <planeGeometry args={[width, height]} />
        <meshBasicMaterial color="#0a121c" transparent opacity={0.75} side={THREE.DoubleSide} />
      </mesh>
      {/* border glow */}
      <lineSegments>
        <edgesGeometry args={[new THREE.PlaneGeometry(width, height)]} />
        <lineBasicMaterial color={glowColor} transparent opacity={0.6} />
      </lineSegments>
      {/* corner accents */}
      {[[-1, -1], [-1, 1], [1, -1], [1, 1]].map(([sx, sy], i) => (
        <mesh key={i} position={[sx * width / 2, sy * height / 2, 0.01]}>
          <circleGeometry args={[0.04, 8]} />
          <meshBasicMaterial color={glowColor} />
        </mesh>
      ))}
      {/* HTML content overlay */}
      <Html
        transform
        distanceFactor={6}
        position={[0, 0, 0.02]}
        style={{
          width: `${width * 100}px`,
          height: `${height * 100}px`,
          pointerEvents: 'auto',
        }}
      >
        {children}
      </Html>
    </group>
  )
}

/* ------------------------------------------------------------------ */
/*  Scroll-driven scene content                                       */
/* ------------------------------------------------------------------ */
function SceneContent() {
  const scroll = useScroll()
  const groupRef = useRef()
  const cameraGroupRef = useRef()
  const { camera } = useThree()

  useFrame(() => {
    const offset = scroll.offset // 0 → 1
    // Move camera along Z as user scrolls, creating the journey
    const z = offset * -90
    const y = Math.sin(offset * Math.PI) * 3
    camera.position.z = 6 + z
    camera.position.y = 0.4 + y
    // subtle side-to-side sway
    camera.position.x = Math.sin(offset * Math.PI * 2) * 1.5
    camera.lookAt(camera.position.x * 0.5, camera.position.y - 0.5, camera.position.z - 10)
  })

  return (
    <>
      <CyberEnvironment />
      <Sparkles count={120} scale={[15, 15, 100]} size={1.2} speed={0.2} color="#2fe0ff" opacity={0.3} />

      {/* ========== SECTION 1: HERO ========== */}
      {/* Globe in the center of the opening view */}
      <Globe position={[0, 0.5, -2]} scale={0.9} />

      {/* Hero text panel — floating to the right */}
      <FloatingPanel position={[4.5, 0.5, -3]} rotation={[0, -0.15, 0]} width={6} height={4.5} glowColor="#2fe0ff">
        <div className="p-6 font-mono text-slate-200 flex flex-col justify-center h-full">
          <p className="text-[10px] tracking-[0.28em] uppercase text-[#2fe0ff] opacity-80 mb-2">
            DevSecOps Engineer // Offensive & Defensive Ops
          </p>
          <h1 className="font-display font-bold text-3xl text-white leading-tight">
            Securing the pipeline,<br />not just the perimeter.
          </h1>
          <p className="mt-3 text-xs text-slate-400 leading-relaxed">
            I hunt vulnerabilities, automate the guardrails, and prove it with evidence — not adjectives. Scroll to explore.
          </p>
          <div className="mt-4 flex gap-2">
            <a href="#/evidence" className="px-3 py-1.5 text-[10px] uppercase tracking-widest border border-[#2fe0ff]/40 text-[#2fe0ff] hover:bg-[#2fe0ff]/10 transition-colors rounded-sm">
              Evidence Portal
            </a>
            <a href="#/automation" className="px-3 py-1.5 text-[10px] uppercase tracking-widest border border-[#39ff9d]/40 text-[#39ff9d] hover:bg-[#39ff9d]/10 transition-colors rounded-sm">
              Automation Scripts
            </a>
          </div>
        </div>
      </FloatingPanel>

      {/* HUD labels floating near camera start */}
      <FloatingPanel position={[-5, 2.5, -1]} rotation={[0, 0.2, 0]} width={2.5} height={1.2} glowColor="#39ff9d">
        <div className="p-3 font-mono text-[9px] text-slate-400 leading-relaxed">
          <p>NODE::PORTFOLIO-01</p>
          <p>STATUS:: <span className="text-[#39ff9d]">ONLINE</span></p>
          <p>ENCRYPTION:: TLS 1.3</p>
        </div>
      </FloatingPanel>

      <FloatingPanel position={[-4, -1, -4]} rotation={[0, 0.1, 0.02]} width={2.5} height={1} glowColor="#2fe0ff">
        <div className="p-3 font-mono text-[9px] text-slate-400 text-right leading-relaxed">
          <p>SESSION:: AUTHENTICATED</p>
          <p>THREAT LEVEL:: <span className="text-[#39ff9d]">NOMINAL</span></p>
        </div>
      </FloatingPanel>

      {/* ========== SECTION 2: STATS (z = -15) ========== */}
      <FloatingPanel position={[-3, 0, -18]} rotation={[0, 0.1, 0]} width={8} height={2.5} glowColor="#2fe0ff">
        <div className="p-4 flex divide-x divide-[#16293a]">
          {STATS.map((s) => (
            <div key={s.label} className="flex-1 px-4 text-center">
              <div className="font-display text-2xl font-bold text-[#2fe0ff]">{s.value}</div>
              <div className="mt-1 text-[8px] uppercase tracking-widest text-[#5c7c8c]">{s.label}</div>
            </div>
          ))}
        </div>
      </FloatingPanel>

      {/* ========== SECTION 3: OPERATOR BRIEFING (z = -30) ========== */}
      <FloatingPanel position={[3, 1, -33]} rotation={[0, -0.12, 0]} width={7} height={4} glowColor="#39ff9d">
        <div className="p-6 font-mono text-slate-200">
          <p className="text-[10px] tracking-[0.28em] uppercase text-[#2fe0ff] opacity-80 mb-2">// Operator Briefing</p>
          <h2 className="font-display text-2xl font-semibold text-white mb-3">How I work</h2>
          <div className="space-y-3 text-xs text-slate-400 leading-relaxed">
            <p>
              I sit between the red team's instincts and the platform team's discipline: finding the
              broken access control before an attacker does, then writing the CI gate that keeps it
              from coming back.
            </p>
            <p>
              Every certification and hardening project on this site is logged in a single
              evidence registry — <code className="text-[#2fe0ff]">data.json</code> — so the
              portfolio updates the same way production does: a pull request, not a redesign.
            </p>
          </div>
        </div>
      </FloatingPanel>

      {/* decorative panel opposite */}
      <FloatingPanel position={[-4, -0.5, -35]} rotation={[0, 0.15, 0.03]} width={3} height={2} glowColor="#ffb020">
        <div className="p-4 font-mono text-[9px]">
          <p className="text-[#ffb020] uppercase tracking-widest mb-2">Core Tools</p>
          <ul className="space-y-1 text-slate-400">
            <li>→ Rapid7 InsightAppSec</li>
            <li>→ Checkmarx / Semgrep</li>
            <li>→ Burp Suite Professional</li>
            <li>→ Tenable.io / Nessus</li>
            <li>→ OWASP ZAP</li>
            <li>→ GitHub Actions CI/CD</li>
          </ul>
        </div>
      </FloatingPanel>

      {/* ========== SECTION 4: OWASP BEFORE/AFTER (z = -48) ========== */}
      <FloatingPanel position={[-2, 0.5, -50]} rotation={[0, 0.08, 0]} width={9} height={5} glowColor="#2fe0ff">
        <div className="p-5 font-mono text-slate-200">
          <p className="text-[10px] tracking-[0.28em] uppercase text-[#2fe0ff] opacity-80 mb-2">// AppSec & Automation</p>
          <h2 className="font-display text-xl font-semibold text-white mb-3">Before / After the fix</h2>

          <div className="grid grid-cols-2 gap-3">
            {/* Before */}
            <div className="border border-[#ff3b5c]/30 rounded-sm overflow-hidden">
              <div className="px-3 py-1.5 bg-[#ff3b5c]/10 text-[9px] text-[#ff3b5c] uppercase tracking-widest">
                A03:2021 — SQL Injection (Before)
              </div>
              <pre className="p-3 text-[9px] text-slate-400 leading-relaxed whitespace-pre-wrap">{`def get_user(username):
    query = (
        "SELECT * FROM users "
        "WHERE username = '"
        + username + "'"
    )
    return db.execute(query).fetchone()`}</pre>
            </div>
            {/* After */}
            <div className="border border-[#39ff9d]/30 rounded-sm overflow-hidden">
              <div className="px-3 py-1.5 bg-[#39ff9d]/10 text-[9px] text-[#39ff9d] uppercase tracking-widest">
                A03:2021 — SQL Injection (After)
              </div>
              <pre className="p-3 text-[9px] text-slate-400 leading-relaxed whitespace-pre-wrap">{`def get_user(username):
    query = "SELECT * FROM users "
            "WHERE username = %s"
    return db.execute(
        query, (username,)
    ).fetchone()
    # parameterized query`}</pre>
            </div>
          </div>

          <div className="mt-3 text-center">
            <a href="#/automation" className="text-[10px] text-[#2fe0ff] hover:underline uppercase tracking-widest">
              Open full console →
            </a>
          </div>
        </div>
      </FloatingPanel>

      {/* ========== SECTION 5: CI/CD PIPELINE PANEL (z = -63) ========== */}
      <FloatingPanel position={[3.5, 0, -65]} rotation={[0, -0.15, 0]} width={7} height={4.5} glowColor="#39ff9d">
        <div className="p-5 font-mono text-slate-200">
          <p className="text-[10px] tracking-[0.28em] uppercase text-[#39ff9d] opacity-80 mb-2">// CI/CD Pipeline</p>
          <h2 className="font-display text-xl font-semibold text-white mb-3">Automated Security Gates</h2>
          <div className="border border-[#16293a] rounded-sm overflow-hidden">
            <div className="flex items-center gap-2 px-3 py-1.5 border-b border-[#16293a] bg-[#0e1a28]">
              <span className="w-2 h-2 rounded-full bg-[#ff3b5c]/70" />
              <span className="w-2 h-2 rounded-full bg-[#ffb020]/70" />
              <span className="w-2 h-2 rounded-full bg-[#39ff9d]/70" />
              <span className="ml-2 text-[9px] text-[#5c7c8c]">.gitlab-ci.yml</span>
            </div>
            <pre className="p-3 text-[9px] text-slate-400 leading-relaxed whitespace-pre-wrap">{`stages:
  - build
  - sast
  - dast
  - deploy

sast_scan:
  stage: sast
  image: python:3.12-slim
  script:
    - pip install bandit semgrep
    - semgrep ci --config=p/owasp-top-ten
    - bandit -r ./src -f json`}</pre>
          </div>
        </div>
      </FloatingPanel>

      {/* ========== SECTION 6: CERTIFICATIONS (z = -78) ========== */}
      <FloatingPanel position={[-1, 0.5, -80]} rotation={[0, 0.05, 0]} width={9} height={4.5} glowColor="#2fe0ff">
        <div className="p-5 font-mono text-slate-200">
          <p className="text-[10px] tracking-[0.28em] uppercase text-[#2fe0ff] opacity-80 mb-2">// Certifications</p>
          <h2 className="font-display text-xl font-semibold text-white mb-3">
            Verified Credentials <span className="text-[#5c7c8c] text-sm">(4)</span>
          </h2>
          <div className="grid grid-cols-2 gap-2">
            {[
              { name: 'Website Hacking / Penetration Testing', issuer: 'Udemy', cat: 'Offensive Security', date: '2022-09-28' },
              { name: 'DevSecOps for Beginners — Hands On', issuer: 'Udemy', cat: 'DevSecOps', date: '2025-03-18' },
              { name: 'Threat Modeling using STRIDE', issuer: 'Udemy', cat: 'Threat Modeling', date: '2025-03-13' },
              { name: 'OWASP: Top 10 for Decision Makers', issuer: 'Checkmarx', cat: 'Secure Coding', date: '—' },
            ].map((cert) => (
              <div key={cert.name} className="border border-[#16293a] rounded-sm p-3 hover:border-[#2fe0ff]/50 transition-colors">
                <span className="text-[8px] uppercase tracking-widest text-[#5c7c8c] block mb-1">{cert.cat}</span>
                <h3 className="text-[11px] text-white font-semibold leading-tight">{cert.name}</h3>
                <p className="text-[8px] text-slate-500 mt-1">{cert.issuer} · {cert.date}</p>
              </div>
            ))}
          </div>
          <div className="mt-3 text-center">
            <a href="#/evidence" className="text-[10px] text-[#2fe0ff] hover:underline uppercase tracking-widest">
              View full evidence portal →
            </a>
          </div>
        </div>
      </FloatingPanel>

      {/* ========== SECTION 7: FOOTER / CONTACT (z = -90) ========== */}
      <FloatingPanel position={[0, 0, -92]} rotation={[0, 0, 0]} width={7} height={2.5} glowColor="#39ff9d">
        <div className="p-5 font-mono text-center text-slate-200">
          <p className="text-[10px] tracking-[0.28em] uppercase text-[#39ff9d] opacity-80 mb-2">// End of Transmission</p>
          <h2 className="font-display text-xl font-semibold text-white mb-2">Connect</h2>
          <div className="flex items-center justify-center gap-4 text-[10px]">
            <a href="https://www.linkedin.com/in/pravin-pp/" target="_blank" rel="noreferrer" className="text-[#2fe0ff] hover:underline">
              LinkedIn ↗
            </a>
            <a href="https://github.com/pravin0408/pravin_devsecops" target="_blank" rel="noreferrer" className="text-[#2fe0ff] hover:underline">
              GitHub ↗
            </a>
          </div>
          <p className="mt-3 text-[9px] text-[#5c7c8c]">
            © {new Date().getFullYear()} Pravin — Operations Console v2.0
          </p>
        </div>
      </FloatingPanel>
    </>
  )
}

/* ------------------------------------------------------------------ */
/*  Main Immersive Scene — single full-viewport Canvas                */
/* ------------------------------------------------------------------ */
export default function ImmersiveScene() {
  return (
    <div className="fixed inset-0 w-full h-full">
      <Canvas
        camera={{ position: [0, 0.4, 6], fov: 50, near: 0.1, far: 200 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
        style={{ background: '#05080c' }}
      >
        <ScrollControls pages={7} damping={0.25}>
          <SceneContent />
        </ScrollControls>
        {/* Glow is achieved via emissive materials and additive blending
            in the CyberEnvironment instead of post-processing bloom. */}
      </Canvas>
    </div>
  )
}
