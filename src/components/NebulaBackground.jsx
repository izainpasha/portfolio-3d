import { useEffect, useRef } from 'react'
import { LOW_POWER } from '../utils/perf'

// Raw WebGL fullscreen fragment shader: drifting nebula + twinkling stars.
const vert = `
attribute vec2 aPos;
void main() { gl_Position = vec4(aPos, 0.0, 1.0); }
`

const frag = `
precision mediump float;
uniform vec2 uRes;
uniform float uTime;
uniform float uScroll;

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}
float noise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
             mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}
float fbm(vec2 p) {
  float v = 0.0, a = 0.5;
  for (int i = 0; i < 4; i++) { v += a * noise(p); p *= 2.02; a *= 0.5; }
  return v;
}

void main() {
  vec2 uv = gl_FragCoord.xy / uRes;
  vec2 p = (gl_FragCoord.xy - 0.5 * uRes) / uRes.y;
  p.y += uScroll * 0.5;
  float t = uTime * 0.02;

  float n = fbm(p * 1.6 + vec2(t, -t * 0.7) + fbm(p * 2.2 - t) * 0.8);
  float n2 = fbm(p * 1.2 + vec2(-t * 1.3, t) + 7.3);

  vec3 col = vec3(0.022, 0.026, 0.10);
  col = mix(col, vec3(0.08, 0.11, 0.40), smoothstep(0.45, 0.85, n) * 0.55);
  col = mix(col, vec3(0.30, 0.09, 0.42), smoothstep(0.5, 0.9, n2) * 0.45);

  // stars (two layers, the near one moves more with scroll)
  for (int l = 0; l < 2; l++) {
    float fl = float(l);
    vec2 g = (p + vec2(0.0, uScroll * 0.15 * fl)) * (140.0 - fl * 60.0);
    vec2 id = floor(g);
    vec2 f = fract(g) - 0.5;
    float h = hash(id + fl * 17.0);
    vec2 off = (vec2(hash(id + 1.3), hash(id + 2.7)) - 0.5) * 0.6;
    float s = step(0.985, h) * smoothstep(0.13 + fl * 0.05, 0.0, length(f + off));
    s *= 0.55 + 0.45 * sin(uTime * (1.5 + h * 2.0) + h * 60.0);
    col += s * vec3(0.8, 0.86, 1.0);
  }

  col *= 1.0 - 0.4 * length(uv - 0.5);
  gl_FragColor = vec4(col, 1.0);
}
`

function compile(gl, type, src) {
  const s = gl.createShader(type)
  gl.shaderSource(s, src)
  gl.compileShader(s)
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
    console.error(gl.getShaderInfoLog(s))
    return null
  }
  return s
}

export default function NebulaBackground() {
  const ref = useRef(null)

  useEffect(() => {
    const canvas = ref.current
    const gl = canvas.getContext('webgl', { antialias: false, alpha: false, powerPreference: 'low-power' })
    if (!gl) return

    const vs = compile(gl, gl.VERTEX_SHADER, vert)
    const fs = compile(gl, gl.FRAGMENT_SHADER, frag)
    if (!vs || !fs) return
    const prog = gl.createProgram()
    gl.attachShader(prog, vs)
    gl.attachShader(prog, fs)
    gl.linkProgram(prog)
    gl.useProgram(prog)

    // one oversized triangle covers the screen
    const buf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
    const loc = gl.getAttribLocation(prog, 'aPos')
    gl.enableVertexAttribArray(loc)
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0)

    const uRes = gl.getUniformLocation(prog, 'uRes')
    const uTime = gl.getUniformLocation(prog, 'uTime')
    const uScroll = gl.getUniformLocation(prog, 'uScroll')

    let raf = 0
    let scroll = 0
    let last = 0
    let drawnScroll = -1
    // the nebula drifts slowly, so 30fps is plenty; low-power devices freeze
    // the drift and only redraw when the scroll position changes
    const frameMs = 1000 / 30

    const resize = () => {
      const dpr = LOW_POWER ? 0.6 : Math.min(window.devicePixelRatio, 1)
      canvas.width = Math.floor(window.innerWidth * dpr)
      canvas.height = Math.floor(window.innerHeight * dpr)
      gl.viewport(0, 0, canvas.width, canvas.height)
      gl.uniform2f(uRes, canvas.width, canvas.height)
      drawnScroll = -1
    }

    const render = (now) => {
      raf = requestAnimationFrame(render)
      if (now - last < frameMs) return
      last = now
      const target = window.scrollY / window.innerHeight
      scroll += (target - scroll) * 0.15
      if (LOW_POWER && Math.abs(scroll - drawnScroll) < 0.0005) return
      drawnScroll = scroll
      gl.uniform1f(uTime, LOW_POWER ? 0 : now / 1000)
      gl.uniform1f(uScroll, scroll)
      gl.drawArrays(gl.TRIANGLES, 0, 3)
    }

    const onVisibility = () => {
      cancelAnimationFrame(raf)
      if (!document.hidden) raf = requestAnimationFrame(render)
    }

    resize()
    raf = requestAnimationFrame(render)
    window.addEventListener('resize', resize)
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      document.removeEventListener('visibilitychange', onVisibility)
      gl.deleteBuffer(buf)
      gl.deleteProgram(prog)
      gl.deleteShader(vs)
      gl.deleteShader(fs)
    }
  }, [])

  return <canvas ref={ref} aria-hidden className="pointer-events-none fixed inset-0 -z-10 h-full w-full" />
}
