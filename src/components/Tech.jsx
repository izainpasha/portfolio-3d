import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { tech } from '../data/content'
import SectionHeading from './SectionHeading'

function TechTile({ t }) {
  return (
    <div
      className="grid size-14 place-items-center rounded-xl text-sm font-bold shadow-lg"
      style={{
        background: t.bg ?? t.color,
        color: t.bg ? t.color : t.dark ? '#0a0c2c' : '#fff',
        border: t.bg ? `1.5px solid ${t.color}` : 'none',
        boxShadow: `0 8px 30px -8px ${t.color}88`,
      }}
    >
      {t.abbr}
    </div>
  )
}

export default function Tech() {
  const root = useRef(null)
  const track = useRef(null)

  useGSAP(
    () => {
      gsap.from('.tech-item', {
        scale: 0,
        autoAlpha: 0,
        rotate: -30,
        stagger: { each: 0.04, from: 'center' },
        duration: 0.7,
        ease: 'back.out(2)',
        scrollTrigger: { trigger: '.tech-grid', start: 'top 80%' },
      })

      // infinite marquee (inspired by dark-minimal's skills strip), speeds up with scroll velocity
      const loop = gsap.to(track.current, { xPercent: -50, duration: 30, ease: 'none', repeat: -1 })
      gsap.to({}, {
        scrollTrigger: {
          trigger: root.current,
          start: 'top bottom',
          end: 'bottom top',
          onUpdate: (self) => {
            const v = Math.min(Math.abs(self.getVelocity()) / 400, 4)
            gsap.to(loop, { timeScale: 1 + v, duration: 0.2, overwrite: true })
            gsap.to(loop, { timeScale: 1, duration: 1.2, delay: 0.2 })
          },
        },
      })
    },
    { scope: root },
  )

  return (
    <section ref={root} id="tech" className="relative py-28">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <SectionHeading eyebrow="Technologies" title="List of Tech & Tools I Use" />
        <div className="tech-grid grid grid-cols-3 justify-items-center gap-y-8 sm:grid-cols-6">
          {tech.map((t) => (
            <div key={t.name} className="tech-item group flex flex-col items-center gap-2">
              <div className="transition duration-300 group-hover:-translate-y-2 group-hover:scale-110">
                <TechTile t={t} />
              </div>
              <span className="text-[11px] text-fg/55 transition group-hover:text-fg">{t.name}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="relative mt-20 overflow-hidden border-y border-line/5 py-5 [mask-image:linear-gradient(90deg,transparent,#000_15%,#000_85%,transparent)]">
        <div ref={track} className="flex w-max gap-10 whitespace-nowrap">
          {[...tech, ...tech].map((t, i) => (
            <span key={i} className="flex items-center gap-3 text-2xl font-medium text-fg/20">
              <span className="size-2 rounded-full" style={{ background: t.color }} />
              {t.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
