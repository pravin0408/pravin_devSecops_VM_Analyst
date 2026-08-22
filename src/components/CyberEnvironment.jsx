import React, { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

/* ------------------------------------------------------------------ */
/*  Infinite cyber-grid floor                                         */
/* ------------------------------------------------------------------ */
function GridFloor() {
  const ref = useRef()
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.material.uniforms.uTime.value = clock.getElapsedTime()
    }
  })

  const shader = useMemo(
    () => ({
      uniforms: {
        uTime: { value: 0 },
        uColor: { value: new THREE.Color('#2fe0ff') },
      },
      vertexShader: `
        varying vec3 vWorldPos;
        void main() {
          vec4 worldPos = modelMatrix * vec4(position, 1.0);
          vWorldPos = worldPos.xyz;
          gl_Position = projectionMatrix * viewMatrix * worldPos;
        }
      `,
      fragmentShader: `
        uniform float uTime;
        uniform vec3 uColor;
        varying vec3 vWorldPos;

        void main() {
          vec2 uv = vWorldPos.xz;

          // grid lines
          float gridSize = 2.0;
          vec2 grid = abs(fract(uv / gridSize - 0.5) - 0.5) / fwidth(uv / gridSize);
          float line = min(grid.x, grid.y);
          float gridAlpha = 1.0 - min(line, 1.0);

          // fade by distance from center
          float dist = length(uv) * 0.015;
          float fade = exp(-dist * dist);

          // pulse wave
          float pulse = sin(length(uv) * 0.3 - uTime * 1.5) * 0.5 + 0.5;
          pulse = pulse * 0.3 + 0.7;

          float alpha = gridAlpha * fade * 0.35 * pulse;
          gl_FragColor = vec4(uColor, alpha);
        }
      `,
      transparent: true,
      side: THREE.DoubleSide,
    }),
    []
  )

  return (
    <mesh ref={ref} rotation-x={-Math.PI / 2} position={[0, -4, 0]}>
      <planeGeometry args={[200, 200, 1, 1]} />
      <shaderMaterial attach="material" {...shader} />
    </mesh>
  )
}

/* ------------------------------------------------------------------ */
/*  Floating data particles throughout the scene                      */
/* ------------------------------------------------------------------ */
function DataParticles({ count = 600, spread = 60, height = 80 }) {
  const ref = useRef()

  const [positions, speeds] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const spd = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * spread
      pos[i * 3 + 1] = (Math.random() - 0.5) * height
      pos[i * 3 + 2] = (Math.random() - 0.5) * spread
      spd[i] = 0.02 + Math.random() * 0.06
    }
    return [pos, spd]
  }, [count, spread, height])

  useFrame(() => {
    if (!ref.current) return
    const posArray = ref.current.geometry.attributes.position.array
    for (let i = 0; i < count; i++) {
      posArray[i * 3 + 1] += speeds[i]
      if (posArray[i * 3 + 1] > height / 2) {
        posArray[i * 3 + 1] = -height / 2
      }
    }
    ref.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        color="#2fe0ff"
        transparent
        opacity={0.6}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  )
}

/* ------------------------------------------------------------------ */
/*  Vertical data streams (Matrix-style)                              */
/* ------------------------------------------------------------------ */
function DataStream({ position, height = 20, speed = 1 }) {
  const ref = useRef()
  const particleCount = 30
  const startPositions = useMemo(() => {
    const arr = new Float32Array(particleCount * 3)
    for (let i = 0; i < particleCount; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 0.3
      arr[i * 3 + 1] = (i / particleCount) * height
      arr[i * 3 + 2] = (Math.random() - 0.5) * 0.3
    }
    return arr
  }, [particleCount, height])

  useFrame(({ clock }) => {
    if (!ref.current) return
    const posArray = ref.current.geometry.attributes.position.array
    const t = clock.getElapsedTime() * speed
    for (let i = 0; i < particleCount; i++) {
      posArray[i * 3 + 1] = ((startPositions[i * 3 + 1] + t * 3) % height) - height / 2
    }
    ref.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <points ref={ref} position={position}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={new Float32Array(startPositions)}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        color="#39ff9d"
        transparent
        opacity={0.5}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  )
}

/* ------------------------------------------------------------------ */
/*  Holographic ring decorations                                      */
/* ------------------------------------------------------------------ */
function HoloRing({ position, radius = 2, color = '#2fe0ff', rotationSpeed = 0.3 }) {
  const ref = useRef()
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.z = clock.getElapsedTime() * rotationSpeed
      ref.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.2) * 0.3
    }
  })

  return (
    <mesh ref={ref} position={position}>
      <torusGeometry args={[radius, 0.015, 16, 100]} />
      <meshBasicMaterial color={color} transparent opacity={0.4} />
    </mesh>
  )
}

/* ------------------------------------------------------------------ */
/*  Compose the full environment                                      */
/* ------------------------------------------------------------------ */
export default function CyberEnvironment() {
  const dataStreams = useMemo(() => {
    const streams = []
    for (let i = 0; i < 12; i++) {
      streams.push({
        position: [
          (Math.random() - 0.5) * 40,
          0,
          (Math.random() - 0.5) * 40 - 20,
        ],
        speed: 0.5 + Math.random() * 1.5,
        height: 15 + Math.random() * 15,
      })
    }
    return streams
  }, [])

  return (
    <group>
      <GridFloor />
      <DataParticles />

      {dataStreams.map((s, i) => (
        <DataStream key={i} position={s.position} speed={s.speed} height={s.height} />
      ))}

      {/* decorative rings at various depths */}
      <HoloRing position={[-8, 2, -15]} radius={3} color="#2fe0ff" rotationSpeed={0.2} />
      <HoloRing position={[10, -1, -30]} radius={4} color="#39ff9d" rotationSpeed={-0.15} />
      <HoloRing position={[-5, 3, -55]} radius={2.5} color="#2fe0ff" rotationSpeed={0.3} />
      <HoloRing position={[12, 0, -75]} radius={3.5} color="#ffb020" rotationSpeed={-0.1} />

      {/* ambient lights for the environment */}
      <ambientLight intensity={0.15} />
      <pointLight position={[10, 10, 5]} intensity={30} color="#2fe0ff" distance={50} />
      <pointLight position={[-10, -5, -20]} intensity={20} color="#39ff9d" distance={40} />
      <pointLight position={[0, 5, -50]} intensity={25} color="#2fe0ff" distance={60} />
      <pointLight position={[5, -3, -80]} intensity={20} color="#39ff9d" distance={50} />

      {/* fog for depth */}
      <fog attach="fog" args={['#05080c', 15, 80]} />
    </group>
  )
}
