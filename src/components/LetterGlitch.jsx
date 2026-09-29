import { useEffect, useRef } from 'react'
import { LOW_POWER } from '../utils/perf'

// Canvas grid of glyphs that randomly swap and colour-blend — the #101010 panel effect.
const DEFAULT_COLORS = ['#2b4bff', '#3dd6f5', '#a476ff', '#1a1f4d']
const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$&*()-_+=/[]{};:<>,0123456789'.split('')

function hexToRgb(hex) {
  const n = parseInt(hex.slice(1), 16)
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 }
}

export default function LetterGlitch({
  colors = DEFAULT_COLORS,
  speed = 40,
  fontSize = 16,
  className = '',
}) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const palette = colors.map(hexToRgb)
    const charW = fontSize * 0.62
    const charH = fontSize * 1.2
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let cols = 0
    let rows = 0
    let cells = []
    let raf = 0
    let last = 0
    let visible = true

    const pick = (arr) => arr[(Math.random() * arr.length) | 0]

    const drawCell = (i) => {
      const c = cells[i]
      const x = (i % cols) * charW
      const y = ((i / cols) | 0) * charH
      ctx.clearRect(x, y, charW, charH)
      ctx.fillStyle = `rgb(${c.cur.r | 0},${c.cur.g | 0},${c.cur.b | 0})`
      ctx.fillText(c.ch, x, y)
    }

    const draw = () => {
      ctx.font = `${fontSize}px "JetBrains Mono", monospace`
      ctx.textBaseline = 'top'
      for (let i = 0; i < cells.length; i++) drawCell(i)
    }

    const setup = () => {
      const rect = canvas.parentElement.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio, 2)
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      canvas.style.width = `${rect.width}px`
      canvas.style.height = `${rect.height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      cols = Math.ceil(rect.width / charW)
      rows = Math.ceil(rect.height / charH)
      cells = Array.from({ length: cols * rows }, () => {
        const c = pick(palette)
        return { ch: pick(CHARS), cur: { ...c }, from: { ...c }, to: c, t: 1 }
      })
      draw()
    }

    const tick = (now) => {
      raf = requestAnimationFrame(tick)
      if (!visible) return
      if (now - last >= (LOW_POWER ? speed * 2 : speed)) {
        last = now
        const n = Math.max(1, Math.floor(cells.length * (LOW_POWER ? 0.02 : 0.04)))
        for (let k = 0; k < n; k++) {
          const c = cells[(Math.random() * cells.length) | 0]
          if (!c) continue
          c.ch = pick(CHARS)
          c.from = { ...c.cur }
          c.to = pick(palette)
          c.t = 0
        }
      }
      // only repaint cells that are mid-transition
      for (let i = 0; i < cells.length; i++) {
        const c = cells[i]
        if (c.t >= 1) continue
        c.t = Math.min(1, c.t + 0.05)
        c.cur.r = c.from.r + (c.to.r - c.from.r) * c.t
        c.cur.g = c.from.g + (c.to.g - c.from.g) * c.t
        c.cur.b = c.from.b + (c.to.b - c.from.b) * c.t
        drawCell(i)
      }
    }

    setup()
    if (!reduced) raf = requestAnimationFrame(tick)

    const ro = new ResizeObserver(setup)
    ro.observe(canvas.parentElement)
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting))
    io.observe(canvas)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
    }
  }, [colors, speed, fontSize])

  return (
    <div className={`relative h-full w-full overflow-hidden bg-glitch ${className}`}>
      <canvas ref={canvasRef} className="block" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle,rgba(16,16,16,0)_55%,rgba(16,16,16,1)_100%)]" />
    </div>
  )
}
