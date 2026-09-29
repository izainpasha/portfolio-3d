import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { works } from '../data/content'
import SectionHeading from './SectionHeading'

// CSS-only mock screenshot so the template works without image assets.
// Swap for <img src=... /> once you have real screenshots.
function MockShot({ w }) {
  const line = w.dark ? 'bg-white/25' : 'bg-slate-900/15'
  return (
    <div className={`relative h-44 overflow-hidden bg-gradient-to-br ${w.gradient}`}>
      <div className={`flex items-center gap-1.5 px-3 py-2 ${w.dark ? 'bg-black/30' : 'bg-white/60'}`}>
        <span className="size-2 rounded-full bg-rose-400" />
        <span className="size-2 rounded-full bg-amber-400" />
        <span className="size-2 rounded-full bg-emerald-400" />
        <span className={`ml-3 h-2 w-24 rounded ${line}`} />
      </div>
      <div className="work-shot p-4 transition-transform duration-700 group-hover:-translate-y-6">
        <div className={`mb-2 h-3 w-2/3 rounded ${line}`} />
        <div className={`mb-4 h-2 w-1/2 rounded ${line}`} />
        <div className="grid grid-cols-3 gap-2">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <div key={i} className={`h-12 rounded ${w.dark ? 'bg-white/10' : 'bg-white/70'}`} />
          ))}
        </div>
      </div>
    </div>
  )
}

// Link when a project URL is set, plain card otherwise.
function Card({ href, ...props }) {
  return href ? <a href={href} target="_blank" rel="noreferrer" {...props} /> : <div {...props} />
}

export default function Works() {
  const root = useRef(null)

  useGSAP(
    () => {
      gsap.from('.work-card', {
        y: 100,
        autoAlpha: 0,
        stagger: { each: 0.12, grid: 'auto' },
        duration: 1.1,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.works-grid', start: 'top 80%' },
      })
    },
    { scope: root },
  )

  return (
    <section ref={root} id="works" className="relative mx-auto max-w-6xl px-4 py-28 sm:px-6">
      <SectionHeading eyebrow="What I build" title="Shopify & eCommerce Work" />
      <div className="works-grid grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {works.map((w) => (
          <div key={w.title} className="work-card">
            <Card
              href={w.href}
              className="group block h-full overflow-hidden rounded-2xl bg-white text-slate-700 shadow-[0_20px_60px_-25px_rgba(61,91,255,0.7)] transition duration-500 hover:-translate-y-2 hover:shadow-[0_30px_80px_-20px_rgba(61,214,245,0.6)]"
            >
              <MockShot w={w} />
              <div className="p-5">
                <h3 className="mb-2 font-semibold text-slate-900">{w.title}</h3>
                <p className="mb-4 text-xs leading-5 text-slate-500">{w.text}</p>
                <div className="flex flex-wrap gap-2">
                  {w.tags.map((t) => (
                    <span key={t} className="rounded-full bg-indigo-50 px-2.5 py-1 text-[10px] font-medium text-[#3b5bff]">
                      #{t}
                    </span>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        ))}
      </div>
    </section>
  )
}
