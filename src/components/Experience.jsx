import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { experience } from '../data/content'
import SectionHeading from './SectionHeading'

function Rocket() {
  return (
    <svg viewBox="0 0 64 64" className="h-full w-full">
      <path d="M32 4c10 8 14 20 12 34H20C18 24 22 12 32 4z" fill="#e8ecff" stroke="#1e2a78" strokeWidth="1.5" />
      <circle cx="32" cy="24" r="6" fill="#3b5bff" stroke="#0b1040" strokeWidth="2" />
      <path d="M20 38l-8 10 10-2zM44 38l8 10-10-2z" fill="#f43f5e" />
      <path d="M26 40h12l-2 8h-8z" fill="#94a3b8" />
      <path className="rocket-flame" d="M28 48h8l-4 12z" fill="#fbbf24" />
    </svg>
  )
}

function Planet() {
  return (
    <svg viewBox="0 0 80 80" className="h-full w-full">
      <defs>
        <radialGradient id="pl" cx="35%" cy="35%">
          <stop offset="0" stopColor="#fff7d6" />
          <stop offset="1" stopColor="#f5c86b" />
        </radialGradient>
      </defs>
      <circle cx="40" cy="40" r="20" fill="url(#pl)" />
      <ellipse cx="40" cy="42" rx="36" ry="8" fill="none" stroke="#a476ff" strokeWidth="3" transform="rotate(-18 40 40)" />
    </svg>
  )
}

export default function Experience() {
  const root = useRef(null)

  useGSAP(
    () => {
      gsap.fromTo(
        '.timeline-progress',
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: { trigger: '.timeline', start: 'top 70%', end: 'bottom 60%', scrub: true },
        },
      )
      gsap.utils.toArray('.timeline-item').forEach((item) => {
        const left = item.dataset.side === 'left'
        gsap.from(item.querySelector('.timeline-card'), {
          x: window.innerWidth >= 768 ? (left ? -80 : 80) : 40,
          autoAlpha: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: { trigger: item, start: 'top 80%' },
        })
        gsap.from(item.querySelector('.timeline-dot'), {
          scale: 0,
          duration: 0.6,
          ease: 'back.out(3)',
          scrollTrigger: { trigger: item, start: 'top 75%' },
        })
      })
      gsap.to('.float-rocket', { y: -30, x: 10, rotate: 8, duration: 3, ease: 'sine.inOut', yoyo: true, repeat: -1 })
      gsap.to('.float-planet', { y: 20, rotate: -10, duration: 4, ease: 'sine.inOut', yoyo: true, repeat: -1 })
      gsap.to('.rocket-flame', { scaleY: 0.6, transformOrigin: '50% 0%', duration: 0.12, yoyo: true, repeat: -1 })
    },
    { scope: root },
  )

  return (
    <section ref={root} id="experience" className="relative mx-auto max-w-6xl overflow-hidden px-4 py-28 sm:px-6">
      <SectionHeading eyebrow="What I've done so far" title="Professional Experience" />

      <div className="float-rocket pointer-events-none absolute right-6 top-60 hidden size-24 md:block lg:right-16" aria-hidden>
        <Rocket />
      </div>
      <div className="float-planet pointer-events-none absolute left-4 top-[60%] hidden size-24 md:block" aria-hidden>
        <Planet />
      </div>

      <div className="timeline relative">
        {/* line */}
        <div className="absolute left-4 top-0 h-full w-px bg-line/10 md:left-1/2" />
        <div className="timeline-progress absolute left-4 top-0 h-full w-px origin-top bg-gradient-to-b from-accent via-[#6d83ff] to-accent-2 shadow-[0_0_12px_#3dd6f5] md:left-1/2" />

        <ol className="space-y-14">
          {experience.map((job, i) => {
            const side = i % 2 === 0 ? 'left' : 'right'
            return (
              <li key={job.role} data-side={side} className="timeline-item relative grid md:grid-cols-2 md:gap-16">
                <span className="timeline-dot absolute left-4 top-6 z-10 grid size-8 -translate-x-1/2 place-items-center rounded-full border border-accent/60 bg-surface shadow-[0_0_20px_color-mix(in_srgb,var(--accent)_50%,transparent)] md:left-1/2">
                  <span className="size-2.5 rounded-full bg-accent" />
                </span>

                <div className={`pl-12 md:pl-0 ${side === 'left' ? 'md:order-1' : 'md:order-2'}`}>
                  <article className="timeline-card rounded-xl bg-white p-6 text-slate-700 shadow-[0_20px_60px_-20px_rgba(61,91,255,0.6)] ring-1 ring-indigo-100 dark:ring-0">
                    <p className="mb-2 text-xs font-medium text-[#3b5bff] md:hidden">{job.date}</p>
                    <h3 className="text-base font-semibold leading-snug text-[#2b3fd6]">{job.role}</h3>
                    <p className="mb-4 text-xs font-medium text-slate-500">{job.company}</p>
                    <ul className="space-y-2 text-xs leading-5">
                      {job.points.map((p) => (
                        <li key={p} className="flex gap-2">
                          <span className="text-[#3b5bff]">✓</span>
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>
                  </article>
                </div>

                <div
                  className={`hidden pt-7 text-sm font-medium text-accent md:block ${
                    side === 'left' ? 'md:order-2 md:text-left' : 'md:order-1 md:text-right'
                  }`}
                >
                  {job.date}
                </div>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
