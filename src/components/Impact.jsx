import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { impact } from '../data/content'
import SectionHeading from './SectionHeading'

export default function Impact() {
  const root = useRef(null)

  useGSAP(
    () => {
      gsap.from('.impact-card', {
        y: 60,
        autoAlpha: 0,
        rotateY: 20,
        stagger: 0.12,
        duration: 1.1,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.impact-grid', start: 'top 80%' },
      })
      gsap.utils.toArray('.impact-num').forEach((el) => {
        const obj = { v: 0 }
        gsap.to(obj, {
          v: Number(el.dataset.value),
          duration: 2,
          ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 90%' },
          onUpdate: () => (el.textContent = Math.round(obj.v)),
        })
      })
    },
    { scope: root },
  )

  return (
    <section ref={root} id="impact" className="relative mx-auto max-w-6xl px-4 py-28 sm:px-6">
      <SectionHeading eyebrow="Results that matter" title="Impact" />
      <div className="impact-grid grid gap-6 [perspective:1000px] sm:grid-cols-2 lg:grid-cols-4">
        {impact.map((m) => (
          <div key={m.label} className="impact-card glass-card flex flex-col p-7">
            <div className="text-4xl font-semibold text-white md:text-5xl">
              {m.prefix}
              <span className="impact-num" data-value={m.value}>
                {m.value}
              </span>
              <span className="text-accent">{m.suffix}</span>
            </div>
            <p className="mt-3 text-sm font-medium text-white">{m.label}</p>
            <p className="mt-2 text-xs leading-6 text-indigo-100/60">{m.text}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
