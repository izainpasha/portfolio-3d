import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { profile } from '../data/content'
import SectionHeading from './SectionHeading'
import LetterGlitch from './LetterGlitch'

export default function About() {
  const root = useRef(null)

  useGSAP(
    () => {
      gsap.utils.toArray('.stat-num').forEach((el) => {
        const target = Number(el.dataset.value)
        const obj = { v: 0 }
        gsap.to(obj, {
          v: target,
          duration: 2,
          ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 90%' },
          onUpdate: () => (el.textContent = Math.round(obj.v)),
        })
      })
      gsap.from('.glitch-panel', {
        clipPath: 'inset(50% 50% 50% 50% round 24px)',
        duration: 1.4,
        ease: 'expo.inOut',
        scrollTrigger: { trigger: '.glitch-panel', start: 'top 80%' },
      })
    },
    { scope: root },
  )

  return (
    <section ref={root} id="about" className="relative mx-auto max-w-6xl px-4 py-28 sm:px-6">
      <SectionHeading eyebrow="Introduction" title="About Me" />

      <div className="grid items-center gap-12 md:grid-cols-[1.2fr_1fr]">
        <div>
          <p className="reveal text-sm leading-7 text-indigo-100/75 md:text-base md:leading-8">{profile.about}</p>

          <div className="reveal mt-10 grid grid-cols-3 gap-4">
            {profile.stats.map((s) => (
              <div key={s.label} className="glass-card px-4 py-5 text-center">
                <div className="text-3xl font-semibold text-white md:text-4xl">
                  <span className="stat-num" data-value={s.value}>
                    {s.value}
                  </span>
                  <span className="text-accent">{s.suffix}</span>
                </div>
                <div className="mt-1 text-[11px] uppercase tracking-wider text-white/50">{s.label}</div>
              </div>
            ))}
          </div>

          <ul className="reveal mt-8 space-y-3">
            {profile.education.map((e) => (
              <li key={e.degree} className="flex items-start justify-between gap-4 border-l-2 border-accent/60 pl-4">
                <span>
                  <span className="block text-sm font-medium text-white">{e.degree}</span>
                  <span className="block text-xs text-white/50">{e.school}</span>
                </span>
                <span className="shrink-0 text-xs text-accent">{e.years}</span>
              </li>
            ))}
          </ul>
        </div>

        <div
          className="glitch-panel relative mx-auto aspect-square w-full max-w-sm overflow-hidden rounded-3xl border border-white/10"
          style={{ clipPath: 'inset(0% 0% 0% 0% round 24px)' }}
        >
          <LetterGlitch />
          <div className="absolute inset-0 grid place-items-center">
            <div className="rounded-2xl border border-white/10 bg-glitch/80 px-6 py-4 text-center backdrop-blur-md">
              <div className="font-mono text-xs text-accent">&lt;developer /&gt;</div>
              <div className="mt-1 text-lg font-medium text-white">{profile.name}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
