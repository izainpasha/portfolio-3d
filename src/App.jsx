import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import NebulaBackground from './components/NebulaBackground'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Tech from './components/Tech'
import Works from './components/Works'
import Impact from './components/Impact'
import Contact from './components/Contact'
import Footer from './components/Footer'
import { initSmoothScroll } from './utils/smoothScroll'

export default function App() {
  const root = useRef(null)

  useEffect(() => initSmoothScroll(), [])

  // Generic scroll reveal for anything tagged .reveal
  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.utils.toArray('.reveal').forEach((el) => {
          gsap.from(el, {
            y: 50,
            autoAlpha: 0,
            duration: 1.1,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 88%' },
          })
        })
      })
    },
    { scope: root },
  )

  return (
    <div ref={root} className="relative min-h-screen font-sans">
      <NebulaBackground />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Tech />
        <Works />
        <Impact />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
