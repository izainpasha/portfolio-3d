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
          <p className="reveal text-sm leading-7 text-fg-soft/75 md:text-base md:leading-8">{profile.about}</p>

          <div className="reveal mt-10 grid grid-cols-3 gap-4">
            {profile.stats.map((s) => (
              <div key={s.label} className="glass-card px-4 py-5 text-center">
                <div className="text-3xl font-semibold text-fg md:text-4xl">
                  <span className="stat-num" data-value={s.value}>
                    {s.value}
                  </span>
                  <span className="text-accent">{s.suffix}</span>
                </div>
                <div className="mt-1 text-[11px] uppercase tracking-wider text-fg/50">{s.label}</div>
              </div>
            ))}
          </div>

          <ul className="reveal mt-8 space-y-3">
            {profile.education.map((e) => (
              <li key={e.degree} className="flex items-start justify-between gap-4 border-l-2 border-accent/60 pl-4">
                <span>
                  <span className="block text-sm font-medium text-fg">{e.degree}</span>
                  <span className="block text-xs text-fg/50">{e.school}</span>
                </span>
                <span className="shrink-0 text-xs text-accent">{e.years}</span>
              </li>
            ))}
          </ul>
        </div>

        <div
          className="glitch-panel relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-3xl border border-line/10"
          style={{ clipPath: 'inset(0% 0% 0% 0% round 24px)' }}
        >
          {profile.photo ? (
            <>
              <picture>
                <source srcSet={`${import.meta.env.BASE_URL}${profile.photo}.webp`} type="image/webp" />
                <img
                  src={`${import.meta.env.BASE_URL}${profile.photo}.jpg`}
                  alt={profile.name}
                  loading="lazy"
                  width="720"
                  height="1080"
                  className="absolute inset-0 h-full w-full object-cover object-top"
                />
              </picture>
              {/* glitch letters glow over the photo edge to edge, fading out around the face */}
              <div className="pointer-events-none absolute inset-0 opacity-50 mix-blend-screen [mask-image:radial-gradient(ellipse_60%_55%_at_50%_38%,transparent_35%,#000_100%)]">
                <LetterGlitch />
              </div>
            </>
          ) : (
            <LetterGlitch />
          )}
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-glitch via-glitch/80 to-transparent px-6 pb-5 pt-16 text-center">
            <div className="font-mono text-xs text-[#3dd6f5]">&lt;developer /&gt;</div>
            <div className="mt-1 text-lg font-medium text-white">{profile.name}</div>
          </div>
        </div>
      </div>
    </section>
  )
}
