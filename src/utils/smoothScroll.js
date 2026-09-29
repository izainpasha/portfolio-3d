import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

let lenis = null

// Lenis driven by GSAP's ticker so ScrollTrigger animations stay in sync.
export function initSmoothScroll() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return () => {}
  lenis = new Lenis({ duration: 1.2, smoothWheel: true })
  lenis.on('scroll', ScrollTrigger.update)
  const tick = (time) => lenis.raf(time * 1000)
  gsap.ticker.add(tick)
  gsap.ticker.lagSmoothing(0)
  return () => {
    gsap.ticker.remove(tick)
    lenis.destroy()
    lenis = null
  }
}

export function scrollToId(id, offset = -70) {
  if (lenis) lenis.scrollTo(`#${id}`, { offset, duration: 1.4 })
  else document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}
