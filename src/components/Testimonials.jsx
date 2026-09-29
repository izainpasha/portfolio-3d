import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { testimonials } from '../data/content'
import SectionHeading from './SectionHeading'

export default function Testimonials() {
  const root = useRef(null)

  useGSAP(
    () => {
      gsap.from('.testi-card', {
        y: 60,
        autoAlpha: 0,
        rotateY: 20,
        stagger: 0.15,
        duration: 1.1,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.testi-grid', start: 'top 80%' },
      })
    },
    { scope: root },
  )

  return (
    <section ref={root} id="testimonials" className="relative mx-auto max-w-6xl px-4 py-28 sm:px-6">
      <SectionHeading eyebrow="What others say" title="Testimonials" />
      <div className="testi-grid grid gap-8 [perspective:1000px] md:grid-cols-3">
        {testimonials.map((t) => (
          <figure key={t.name} className="testi-card glass-card flex flex-col p-7">
            <span className="mb-2 font-serif text-6xl leading-none text-accent/70">“</span>
            <blockquote className="flex-1 text-sm leading-7 text-indigo-100/80">{t.quote}</blockquote>
            <figcaption className="mt-6 flex items-center gap-3">
              <span className="grid size-10 place-items-center rounded-full bg-gradient-to-br from-[#3b5bff] to-accent-2 text-sm font-semibold text-white">
                {t.name
                  .split(' ')
                  .map((p) => p[0])
                  .join('')}
              </span>
              <span>
                <span className="block text-sm font-medium text-white">{t.name}</span>
                <span className="block text-xs text-white/50">{t.title}</span>
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}
