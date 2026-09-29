import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { skills } from '../data/content'
import SectionHeading from './SectionHeading'

const icons = {
  design: (
    <svg viewBox="0 0 120 100" className="h-full w-full">
      <defs>
        <linearGradient id="g1" x1="0" x2="1">
          <stop offset="0" stopColor="#f472b6" />
          <stop offset="1" stopColor="#a476ff" />
        </linearGradient>
      </defs>
      <rect x="22" y="30" width="62" height="42" rx="4" fill="#1e2a78" stroke="#6d83ff" />
      <rect x="28" y="36" width="50" height="30" rx="2" fill="#0b1040" />
      <circle cx="42" cy="51" r="8" fill="url(#g1)" />
      <rect x="55" y="44" width="18" height="4" rx="2" fill="#3dd6f5" />
      <rect x="55" y="52" width="12" height="4" rx="2" fill="#6d83ff" />
      <path d="M14 78h78l-6 6H20z" fill="#2b3a9e" />
      <g transform="rotate(-30 95 30)">
        <rect x="80" y="22" width="30" height="8" rx="2" fill="#fbbf24" />
        <rect x="80" y="22" width="6" height="8" fill="#f87171" />
        <path d="M110 22l8 4-8 4z" fill="#fde68a" />
      </g>
      {['#ef4444', '#f59e0b', '#22c55e', '#3b82f6', '#a855f7'].map((c, i) => (
        <rect key={c} x={4 + i * 5} y={50 - i * 4} width="10" height="26" rx="2" fill={c} transform={`rotate(${-20 + i * 8} 10 76)`} />
      ))}
    </svg>
  ),
  code: (
    <svg viewBox="0 0 120 100" className="h-full w-full">
      <path d="M60 20l44 22-44 22-44-22z" fill="#1e2a78" stroke="#6d83ff" />
      <path d="M16 42v8l44 22v-8z" fill="#141c5c" />
      <path d="M104 42v8L60 72v-8z" fill="#0e1446" />
      <rect x="40" y="10" width="40" height="28" rx="3" fill="#0b1040" stroke="#3dd6f5" />
      <path d="M50 20l-5 4 5 4M70 20l5 4-5 4M62 18l-4 12" stroke="#3dd6f5" strokeWidth="2" fill="none" strokeLinecap="round" />
      <rect x="30" y="44" width="16" height="10" rx="2" fill="#f472b6" transform="skewY(20) translate(0 -12)" />
      <rect x="72" y="46" width="18" height="10" rx="2" fill="#fbbf24" transform="skewY(-20) translate(0 26)" />
      <circle cx="60" cy="42" r="5" fill="#a476ff" />
    </svg>
  ),
  seo: (
    <svg viewBox="0 0 120 100" className="h-full w-full">
      <rect x="18" y="18" width="70" height="56" rx="5" fill="#1e2a78" stroke="#6d83ff" />
      <rect x="18" y="18" width="70" height="9" rx="5" fill="#2b3a9e" />
      {[0, 1, 2, 3].map((i) => (
        <rect key={i} x={28 + i * 14} y={64 - (i + 1) * 8} width="9" height={(i + 1) * 8} rx="2" fill={i === 3 ? '#3dd6f5' : '#6d83ff'} />
      ))}
      <circle cx="84" cy="62" r="14" fill="none" stroke="#f472b6" strokeWidth="5" />
      <path d="M94 72l12 12" stroke="#f472b6" strokeWidth="7" strokeLinecap="round" />
      <path d="M26 44l14-8 12 5 18-12" stroke="#fbbf24" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    </svg>
  ),
}

export default function Skills() {
  const root = useRef(null)

  useGSAP(
    () => {
      gsap.from('.skill-card', {
        y: 80,
        autoAlpha: 0,
        rotateX: -15,
        stagger: 0.15,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.skill-grid', start: 'top 80%' },
      })
      gsap.to('.skill-icon', { y: -8, duration: 2.4, ease: 'sine.inOut', yoyo: true, repeat: -1, stagger: 0.4 })

      // 3D tilt on hover
      const cleanups = gsap.utils.toArray('.skill-card').map((card) => {
        const rx = gsap.quickTo(card, 'rotationX', { duration: 0.5, ease: 'power3' })
        const ry = gsap.quickTo(card, 'rotationY', { duration: 0.5, ease: 'power3' })
        const move = (e) => {
          const r = card.getBoundingClientRect()
          ry(((e.clientX - r.left) / r.width - 0.5) * 14)
          rx(-((e.clientY - r.top) / r.height - 0.5) * 14)
        }
        const leave = () => {
          rx(0)
          ry(0)
        }
        card.addEventListener('pointermove', move)
        card.addEventListener('pointerleave', leave)
        return () => {
          card.removeEventListener('pointermove', move)
          card.removeEventListener('pointerleave', leave)
        }
      })
      return () => cleanups.forEach((fn) => fn())
    },
    { scope: root },
  )

  return (
    <section ref={root} id="skills" className="relative mx-auto max-w-6xl px-4 py-28 sm:px-6">
      <SectionHeading eyebrow="What I offer" title="Skills & Expertise" />
      <div className="skill-grid grid gap-8 [perspective:1000px] md:grid-cols-3">
        {skills.map((s) => (
          <article key={s.title} className="skill-card glass-card group p-7 [transform-style:preserve-3d]">
            <div className="skill-icon mx-auto mb-8 h-36 w-44 [transform:translateZ(40px)]">{icons[s.icon]}</div>
            <h3 className="mb-4 text-xl font-medium leading-snug text-white [transform:translateZ(25px)]">{s.title}</h3>
            <p className="text-sm leading-7 text-indigo-100/65">{s.text}</p>
            <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition duration-500 group-hover:opacity-100 bg-[radial-gradient(400px_circle_at_50%_0%,rgba(61,214,245,0.12),transparent_60%)]" />
          </article>
        ))}
      </div>
    </section>
  )
}
