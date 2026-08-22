import React, { useMemo, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Html, Line, Sparkles } from '@react-three/drei'
import * as THREE from 'three'
import { useNavigate } from 'react-router-dom'

// ---- Data nodes plotted on a sphere (lat/long -> xyz) --------------------
const NODES = [
  { id: 'evidence', label: 'Evidence Portal', sub: 'certs · CVEs · timeline', lat: 18, lon: 40, to: '/evidence' },
  { id: 'automation', label: 'AppSec Automation', sub: 'SAST · DAST · CI/CD', lat: -22, lon: -60, to: '/automation' },
  { id: 'about', label: 'Operator Profile', sub: 'scroll for briefing', lat: 55, lon: -140, to: null },
]

function toXYZ(lat, lon, r) {
  const phi = (90 - lat) * (Math.PI / 180)
  const theta = (lon + 180) * (Math.PI / 180)
  return [
    -r * Math.sin(phi) * Math.cos(theta),
    r * Math.cos(phi),
    r * Math.sin(phi) * Math.sin(theta),
  ]
}

function Globe() {
  const group = useRef()
  const mouse = useRef({ x: 0, y: 0 })
  const navigate = useNavigate()
  const [hovered, setHovered] = useState(null)

  useFrame((state, delta) => {
    mouse.current.x = state.pointer.x
    mouse.current.y = state.pointer.y
    if (group.current) {
      group.current.rotation.y += delta * 0.08
      group.current.rotation.y += (mouse.current.x * 0.3 - group.current.rotation.y * 0.02) * delta
      group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, mouse.current.y * 0.15, 0.03)
    }
  })

  const radius = 2.4
  const nodePositions = useMemo(
    () => NODES.map((n) => ({ ...n, pos: toXYZ(n.lat, n.lon, radius) })),
    []
  )

  // faint great-circle "network" arcs between nodes
  const arcs = useMemo(() => {
    const pts = []
    for (let i = 0; i < nodePositions.length; i++) {
      const a = new THREE.Vector3(...nodePositions[i].pos)
      const b = new THREE.Vector3(...nodePositions[(i + 1) % nodePositions.length].pos)
      const mid = a.clone().add(b).multiplyScalar(0.5).normalize().multiplyScalar(radius * 1.35)
      const curve = new THREE.QuadraticBezierCurve3(a, mid, b)
      pts.push(curve.getPoints(24))
    }
    return pts
  }, [nodePositions])

  return (
    <group ref={group}>
      {/* wireframe core */}
      <mesh>
        <icosahedronGeometry args={[radius, 3]} />
        <meshBasicMaterial color="#0d3b4a" wireframe transparent opacity={0.55} />
      </mesh>
      <mesh>
        <icosahedronGeometry args={[radius * 0.995, 1]} />
        <meshBasicMaterial color="#2fe0ff" wireframe transparent opacity={0.12} />
      </mesh>

      {/* inner glow core */}
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

export default function Scene3D() {
  return (
    <Canvas
      camera={{ position: [0, 0.4, 6.2], fov: 45 }}
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} intensity={40} color="#2fe0ff" />
      <pointLight position={[-5, -3, -5]} intensity={20} color="#39ff9d" />
      <Sparkles count={80} scale={[9, 9, 9]} size={1.4} speed={0.25} color="#2fe0ff" opacity={0.4} />
      <Globe />
    </Canvas>
  )
}
