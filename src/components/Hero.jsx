import { lazy, Suspense, useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { profile } from '../data/content'
import { scrollToId } from '../utils/smoothScroll'

const HeroScene = lazy(() => import('../three/HeroScene'))

const words = ['Imagine.', 'Design.', 'Develop.']

export default function Hero() {
  const root = useRef(null)

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } })
      tl.from('.hero-scene', { autoAlpha: 0, scale: 1.08, duration: 2.2, ease: 'power2.out' })
        .from('.hero-word', { yPercent: 120, rotateX: -70, autoAlpha: 0, stagger: 0.14, duration: 1.4 }, 0.3)
        .from('.hero-sub', { y: 20, autoAlpha: 0, duration: 1 }, '-=0.9')
        .from('.hero-cta', { y: 20, autoAlpha: 0, duration: 0.9 }, '-=0.7')

      // parallax out on scroll
      gsap.to('.hero-content', {
        yPercent: -40,
        autoAlpha: 0,
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true },
      })
      gsap.to('.hero-scene', {
        yPercent: 18,
        scale: 1.06,
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true },
      })
    },
    { scope: root },
  )

  return (
    <section ref={root} id="home" className="relative h-[100svh] min-h-[640px] overflow-hidden">
      {/* sky behind the transparent canvas */}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#7fb0ff_0%,#bcd4ff_40%,#e6eeff_70%,transparent_100%)] transition-opacity duration-700 dark:opacity-0" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,#1b2a8f_0%,#0d1250_45%,transparent_80%)] opacity-0 transition-opacity duration-700 dark:opacity-100" />
      <div className="hero-scene absolute inset-0">
        <Suspense fallback={null}>
          <HeroScene />
        </Suspense>
      </div>
      {/* fade into page */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-b from-transparent to-page/90" />

      <div className="hero-content pointer-events-none relative z-10 flex h-full flex-col items-center px-4 pt-[13vh] text-center sm:pt-[18vh]">
        <h1 className="flex flex-wrap justify-center gap-x-4 text-5xl font-semibold leading-tight tracking-tight text-fg dark:drop-shadow-[0_4px_30px_rgba(61,214,245,0.35)] sm:text-6xl md:text-7xl [perspective:800px]">
          {words.map((w) => (
            <span key={w} className="inline-block overflow-hidden pb-2">
              <span className="hero-word inline-block origin-bottom">{w}</span>
            </span>
          ))}
        </h1>
        <p className="hero-sub mt-4 max-w-xl text-sm text-fg-soft/80 sm:text-base">
          Hi, I'm <span className="font-medium text-accent">{profile.name}</span> — {profile.role} building
          fast, conversion-focused eCommerce experiences.
        </p>
        <div className="hero-cta pointer-events-auto mt-8 flex gap-3">
          <button
            onClick={() => scrollToId('works')}
            className="rounded-full bg-fg px-6 py-2.5 text-sm font-medium text-page transition hover:bg-accent"
          >
            View my work
          </button>
          <button
            onClick={() => scrollToId('contact')}
            className="rounded-full border border-line/30 px-6 py-2.5 text-sm font-medium text-fg backdrop-blur transition hover:border-accent hover:text-accent"
          >
            Let's talk
          </button>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-center text-[10px] uppercase tracking-[0.3em] text-fg/50">
        <span className="mx-auto mb-2 block h-10 w-px animate-pulse bg-gradient-to-b from-transparent to-accent" />
        Scroll
      </div>
    </section>
  )
}
