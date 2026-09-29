import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { PerformanceMonitor, Sparkles, Stars } from '@react-three/drei'
import * as THREE from 'three'
import { LOW_POWER } from '../utils/perf'

/* ------------------------------------------------------------------ */
/* Moon                                                                */
/* ------------------------------------------------------------------ */
function useGlowTexture(inner = 'rgba(255,244,210,0.9)') {
  return useMemo(() => {
    const c = document.createElement('canvas')
    c.width = c.height = 128
    const ctx = c.getContext('2d')
    const g = ctx.createRadialGradient(64, 64, 0, 64, 64, 64)
    g.addColorStop(0, inner)
    g.addColorStop(0.25, 'rgba(200,210,255,0.35)')
    g.addColorStop(1, 'rgba(120,140,255,0)')
    ctx.fillStyle = g
    ctx.fillRect(0, 0, 128, 128)
    return new THREE.CanvasTexture(c)
  }, [inner])
}

const moonShader = {
  vertexShader: `
    varying vec3 vN; varying vec3 vP;
    void main(){ vN = normal; vP = position; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }
  `,
  fragmentShader: `
    varying vec3 vN; varying vec3 vP;
    float hash(vec3 p){ return fract(sin(dot(p, vec3(12.9898,78.233,45.164)))*43758.5453); }
    float noise(vec3 p){
      vec3 i=floor(p), f=fract(p); f=f*f*(3.-2.*f);
      return mix(mix(mix(hash(i),hash(i+vec3(1,0,0)),f.x),mix(hash(i+vec3(0,1,0)),hash(i+vec3(1,1,0)),f.x),f.y),
                 mix(mix(hash(i+vec3(0,0,1)),hash(i+vec3(1,0,1)),f.x),mix(hash(i+vec3(0,1,1)),hash(i+vec3(1,1,1)),f.x),f.y),f.z);
    }
    void main(){
      float n = noise(vP*3.0)*0.6 + noise(vP*7.0)*0.4;
      vec3 col = mix(vec3(1.0,0.97,0.86), vec3(0.78,0.76,0.72), smoothstep(0.45,0.75,n));
      float rim = pow(1.0 - abs(vN.z), 2.0);
      col = mix(col, vec3(0.85,0.88,1.0), rim*0.5);
      gl_FragColor = vec4(col,1.0);
    }
  `,
}

function Moon() {
  const glow = useGlowTexture()
  return (
    <group position={[-15.5, 7.2, -18]}>
      <mesh>
        <sphereGeometry args={[1.1, 48, 48]} />
        <shaderMaterial args={[moonShader]} />
      </mesh>
      <sprite scale={[9, 9, 1]}>
        <spriteMaterial map={glow} transparent depthWrite={false} blending={THREE.AdditiveBlending} />
      </sprite>
    </group>
  )
}

/* ------------------------------------------------------------------ */
/* Low-poly snowy mountain                                             */
/* ------------------------------------------------------------------ */
function Mountain({ position, scale = 1, seed = 1 }) {
  const geometry = useMemo(() => {
    const height = 6
    const g = new THREE.ConeGeometry(5, height, 10, 7, true)
    const pos = g.attributes.position
    const v = new THREE.Vector3()
    for (let i = 0; i < pos.count; i++) {
      v.fromBufferAttribute(pos, i)
      const t = (v.y + height / 2) / height // 0 = base, 1 = peak
      if (t < 0.999) {
        // position-based jitter so the cone seam stays closed
        const n1 = Math.sin(v.x * 1.7 + seed) * Math.cos(v.z * 1.3 + seed * 2.0)
        const n2 = Math.sin(v.z * 2.3 + v.x * 0.7 + seed * 3.0)
        v.x += n1 * 0.5 * (1 - t)
        v.z += n2 * 0.4 * (1 - t)
        v.y += (n1 + n2) * 0.22 * t * (1 - t) * 2
      }
      pos.setXYZ(i, v.x, v.y, v.z)
    }
    const flat = g.toNonIndexed()
    const p = flat.attributes.position
    const colors = new Float32Array(p.count * 3)
    const snow = new THREE.Color('#eef3ff')
    const low = new THREE.Color('#141a52')
    const mid = new THREE.Color('#2f47b8')
    const c = new THREE.Color()
    for (let i = 0; i < p.count; i += 3) {
      // colour per face (by face centroid) for a crisp low-poly look
      const y = (p.getY(i) + p.getY(i + 1) + p.getY(i + 2)) / 3
      const x = (p.getX(i) + p.getX(i + 1) + p.getX(i + 2)) / 3
      const t = (y + height / 2) / height
      const snowLine = 0.62 + Math.sin(x * 3.1 + seed) * 0.06
      if (t > snowLine) c.copy(snow)
      else c.copy(low).lerp(mid, Math.pow(t / snowLine, 1.4))
      for (let k = 0; k < 3; k++) c.toArray(colors, (i + k) * 3)
    }
    flat.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    flat.computeVertexNormals()
    return flat
  }, [seed])

  return (
    <mesh geometry={geometry} position={position} scale={scale}>
      <meshStandardMaterial vertexColors flatShading roughness={0.85} metalness={0.05} />
    </mesh>
  )
}

/* ------------------------------------------------------------------ */
/* Instanced city with pre-baked lit windows                           */
/* ------------------------------------------------------------------ */
// Windows come from one mipmapped texture drawn once at load, so they stay
// perfectly still: no per-pixel maths that can shimmer or flicker.
const WIN_CELLS = 16

function useWindowTexture() {
  const gl = useThree((s) => s.gl)
  return useMemo(() => {
    const cell = 32
    const size = WIN_CELLS * cell
    const c = document.createElement('canvas')
    c.width = c.height = size
    const ctx = c.getContext('2d')
    ctx.fillStyle = '#000'
    ctx.fillRect(0, 0, size, size)
    let seed = 42
    const rnd = () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646
    for (let y = 0; y < WIN_CELLS; y++) {
      for (let x = 0; x < WIN_CELLS; x++) {
        if (rnd() > 0.4) continue
        ctx.fillStyle = rnd() < 0.22 ? '#73d9ff' : '#ffcc73'
        ctx.fillRect(x * cell + cell * 0.28, y * cell + cell * 0.26, cell * 0.44, cell * 0.44)
      }
    }
    const tex = new THREE.CanvasTexture(c)
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping
    tex.anisotropy = Math.min(8, gl.capabilities.getMaxAnisotropy())
    return tex
  }, [gl])
}

const cityVertex = `
  attribute float aSeed;
  varying vec2 vUv;
  varying vec3 vScale;
  varying vec3 vN;
  varying float vSeed;
  varying float vH;
  void main() {
    vUv = uv;
    vSeed = aSeed;
    vN = normal;
    vH = position.y;
    vScale = vec3(length(instanceMatrix[0].xyz), length(instanceMatrix[1].xyz), length(instanceMatrix[2].xyz));
    gl_Position = projectionMatrix * viewMatrix * modelMatrix * instanceMatrix * vec4(position, 1.0);
  }
`
const cityFragment = `
  uniform sampler2D uWin;
  varying vec2 vUv;
  varying vec3 vScale;
  varying vec3 vN;
  varying float vSeed;
  varying float vH;
  void main() {
    vec3 col = mix(vec3(0.025, 0.03, 0.11), vec3(0.09, 0.11, 0.34), vH);
    if (abs(vN.y) < 0.5) {
      float w = abs(vN.x) > 0.5 ? vScale.z : vScale.x;
      vec2 cells = vec2(max(1.0, floor(w * 3.0)), floor(vScale.y * 3.2));
      // whole-cell offset into the window sheet so each face gets its own pattern
      float face = abs(vN.x) > 0.5 ? (vN.x > 0.0 ? 1.0 : 2.0) : (vN.z > 0.0 ? 3.0 : 4.0);
      vec2 offset = vec2(vSeed + face * 3.0, vSeed * 7.0 + face * 5.0);
      col += texture2D(uWin, (vUv * cells + offset) / ${WIN_CELLS}.0).rgb * 0.95;
      // side faces facing away from the moon are darker
      col *= vN.x > 0.5 ? 0.7 : 1.0;
    } else {
      col *= 1.4;
    }
    gl_FragColor = vec4(col, 1.0);
  }
`

function City({ count = LOW_POWER ? 40 : 55 }) {
  const ref = useRef(null)
  const windows = useWindowTexture()
  const { geometry, buildings } = useMemo(() => {
    const geometry = new THREE.BoxGeometry(1, 1, 1)
    geometry.translate(0, 0.5, 0)
    const seeds = new Float32Array(count)
    const buildings = []
    // seeded PRNG so the skyline is identical on every load
    let seed = 7
    const rnd = () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646
    const rand = (a, b) => a + rnd() * (b - a)
    for (let i = 0; i < count; i++) {
      seeds[i] = Math.floor(rnd() * WIN_CELLS)
      const x = rand(-16, 12)
      const z = rand(-12, -5)
      // taller skyline on the left, lower towards the mountain on the right
      const falloff = THREE.MathUtils.clamp(1 - (x + 4) / 22, 0.25, 1)
      buildings.push({ x, z, w: rand(0.7, 1.6), d: rand(0.7, 1.3), h: rand(1.0, 4.2) * falloff })
    }
    geometry.setAttribute('aSeed', new THREE.InstancedBufferAttribute(seeds, 1))
    return { geometry, buildings }
  }, [count])

  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: { uWin: { value: windows } },
        vertexShader: cityVertex,
        fragmentShader: cityFragment,
      }),
    [windows],
  )

  useLayoutEffect(() => {
    const o = new THREE.Object3D()
    buildings.forEach((b, i) => {
      o.position.set(b.x, -3.0, b.z)
      o.scale.set(b.w, b.h, b.d)
      o.updateMatrix()
      ref.current.setMatrixAt(i, o.matrix)
    })
    ref.current.instanceMatrix.needsUpdate = true
  }, [buildings])

  return <instancedMesh ref={ref} args={[geometry, material, count]} frustumCulled={false} />
}

/* ------------------------------------------------------------------ */
/* Desk, monitors with animated code, developer silhouette             */
/* ------------------------------------------------------------------ */
const codeShader = {
  uniforms: { uTime: { value: 0 }, uSeed: { value: 0 } },
  vertexShader: `varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,
  fragmentShader: `
    varying vec2 vUv; uniform float uTime; uniform float uSeed;
    float hash(float n){ return fract(sin(n) * 43758.5453); }
    void main(){
      vec2 uv = vUv;
      vec3 col = vec3(0.02, 0.05, 0.13);
      float rows = 18.0;
      float y = uv.y * rows + uTime * 1.2;
      float row = floor(y) + uSeed * 100.0;
      float fy = fract(y);
      float indent = floor(hash(row * 3.1) * 4.0) * 0.07;
      float len = indent + 0.15 + hash(row * 7.7) * 0.6;
      float seg = floor(uv.x * 16.0);
      float gap = step(0.12, fract(uv.x * 16.0)) * step(0.15, hash(seg * 5.3 + row));
      float line = step(0.06 + indent, uv.x) * step(uv.x, len) * step(0.32, fy) * step(fy, 0.68) * gap;
      vec3 c = mix(vec3(0.24, 0.84, 0.96), vec3(0.8, 0.5, 1.0), step(0.6, hash(seg + row * 13.0)));
      c = mix(c, vec3(1.0, 0.82, 0.4), step(0.86, hash(seg * 3.0 + row)));
      col += line * c;
      col *= 0.92 + 0.08 * sin(uv.y * 500.0);
      float vig = smoothstep(0.0, 0.08, uv.x) * smoothstep(1.0, 0.92, uv.x) * smoothstep(0.0, 0.08, uv.y) * smoothstep(1.0, 0.92, uv.y);
      gl_FragColor = vec4(col * (0.55 + 0.45 * vig), 1.0);
    }
  `,
}

function Monitor({ position, rotation, seed }) {
  const mat = useMemo(() => {
    const m = new THREE.ShaderMaterial(codeShader)
    m.uniforms = THREE.UniformsUtils.clone(codeShader.uniforms)
    m.uniforms.uSeed.value = seed
    return m
  }, [seed])
  useFrame((s) => {
    mat.uniforms.uTime.value = s.clock.elapsedTime
  })
  return (
    <group position={position} rotation={rotation}>
      <mesh position={[0, 0, -0.04]}>
        <boxGeometry args={[2.05, 1.25, 0.06]} />
        <meshStandardMaterial color="#070a1f" roughness={0.4} metalness={0.6} />
      </mesh>
      <mesh material={mat}>
        <planeGeometry args={[1.92, 1.12]} />
      </mesh>
      <mesh position={[0, -0.85, -0.1]}>
        <boxGeometry args={[0.12, 0.5, 0.08]} />
        <meshStandardMaterial color="#0b0f2a" />
      </mesh>
    </group>
  )
}

function Workstation() {
  const dark = '#070a1f'
  return (
    <group position={[0, -2.35, 3.2]}>
      {/* desk */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[7, 0.12, 1.8]} />
        <meshStandardMaterial color="#10164a" roughness={0.6} />
      </mesh>
      <Monitor position={[-1.05, 1.1, -0.45]} rotation={[0, 0.22, 0]} seed={0.1} />
      <Monitor position={[1.05, 1.1, -0.45]} rotation={[0, -0.22, 0]} seed={0.7} />
      {/* screen glow onto the desk & person */}
      <pointLight position={[0, 1.2, 0.2]} color="#3dd6f5" intensity={6} distance={5} decay={1.6} />

      {/* mug with steam-ish sparkles */}
      <mesh position={[-2.6, 0.2, 0.2]}>
        <cylinderGeometry args={[0.14, 0.12, 0.28, 20]} />
        <meshStandardMaterial color="#e8ecff" roughness={0.3} />
      </mesh>
      {/* books */}
      <mesh position={[2.5, 0.12, 0.2]} rotation={[0, 0.3, 0]}>
        <boxGeometry args={[0.6, 0.12, 0.42]} />
        <meshStandardMaterial color="#c0392b" />
      </mesh>
      <mesh position={[2.52, 0.24, 0.2]} rotation={[0, 0.1, 0]}>
        <boxGeometry args={[0.55, 0.1, 0.4]} />
        <meshStandardMaterial color="#f5f5f5" />
      </mesh>

      {/* developer silhouette, facing the screens */}
      <group position={[0, 0.2, 1.25]}>
        <mesh position={[0, 0.55, 0]}>
          <capsuleGeometry args={[0.42, 0.55, 6, 16]} />
          <meshStandardMaterial color={dark} roughness={0.9} />
        </mesh>
        <mesh position={[0, 1.35, 0]}>
          <sphereGeometry args={[0.24, 32, 32]} />
          <meshStandardMaterial color={dark} roughness={0.8} />
        </mesh>
        {/* headphones band */}
        <mesh position={[0, 1.38, 0]} rotation={[0, 0, 0]}>
          <torusGeometry args={[0.26, 0.03, 8, 32, Math.PI]} />
          <meshStandardMaterial color="#1a2266" emissive="#1a3cff" emissiveIntensity={0.15} />
        </mesh>
        {/* chair back */}
        <mesh position={[0, 0.5, 0.45]}>
          <boxGeometry args={[1.0, 1.3, 0.12]} />
          <meshStandardMaterial color="#0a0d2a" roughness={0.7} />
        </mesh>
      </group>
    </group>
  )
}

/* ------------------------------------------------------------------ */
/* Mouse parallax camera                                               */
/* ------------------------------------------------------------------ */
function Rig() {
  useFrame((state, delta) => {
    const { camera, pointer, size } = state
    // widen the view on portrait screens so the skyline sits below the headline
    const fov = size.width / size.height < 1 ? 72 : 50
    if (camera.fov !== fov) {
      camera.fov = fov
      camera.updateProjectionMatrix()
    }
    camera.position.x = THREE.MathUtils.damp(camera.position.x, pointer.x * 0.9, 2.5, delta)
    camera.position.y = THREE.MathUtils.damp(camera.position.y, 0.8 + pointer.y * 0.45, 2.5, delta)
    camera.lookAt(0, 0.2, 0)
  })
  return null
}

// Low-power mode: render on demand at a capped frame rate instead of every vsync.
function FrameLimiter({ fps }) {
  const invalidate = useThree((s) => s.invalidate)
  useEffect(() => {
    const id = setInterval(invalidate, 1000 / fps)
    return () => clearInterval(id)
  }, [fps, invalidate])
  return null
}

export default function HeroScene() {
  const wrap = useRef(null)
  const [visible, setVisible] = useState(true)
  const [dpr, setDpr] = useState(LOW_POWER ? 1 : 1.5)

  // stop rendering when the hero is off-screen
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0 })
    io.observe(wrap.current)
    return () => io.disconnect()
  }, [])

  return (
    <div ref={wrap} className="absolute inset-0">
      <Canvas
        frameloop={!visible ? 'never' : LOW_POWER ? 'demand' : 'always'}
        dpr={dpr}
        camera={{ position: [0, 0.8, 9], fov: 50 }}
        gl={{ antialias: !LOW_POWER, alpha: true, powerPreference: 'high-performance' }}
        eventSource={document.getElementById('root')}
        eventPrefix="client"
      >
        {/* drop resolution if the frame rate sags */}
        <PerformanceMonitor onDecline={() => setDpr(1)} />
        {LOW_POWER && visible && <FrameLimiter fps={30} />}
        <fog attach="fog" args={['#0b1040', 14, 40]} />
        <ambientLight intensity={0.35} color="#8fa2ff" />
        <directionalLight position={[-6, 6, 2]} intensity={1.6} color="#c9d4ff" />
        <Stars radius={60} depth={30} count={LOW_POWER ? 1000 : 2000} factor={3} saturation={0.4} fade speed={0.6} />
        <Moon />
        <Mountain position={[10, -1.6, -22]} scale={1.8} seed={1.3} />
        <Mountain position={[17, -2.2, -25]} scale={1.3} seed={4.1} />
        <Mountain position={[-17, -2.8, -26]} scale={1.1} seed={7.7} />
        <City />
        <Workstation />
        {!LOW_POWER && <Sparkles count={40} scale={[14, 6, 6]} position={[0, 0, 0]} size={2.5} speed={0.3} color="#9fe8ff" opacity={0.7} />}
        <Rig />
      </Canvas>
    </div>
  )
}
