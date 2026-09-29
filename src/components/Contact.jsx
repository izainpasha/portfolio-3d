import { useRef, useState } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { profile } from '../data/content'
import SectionHeading from './SectionHeading'
import LetterGlitch from './LetterGlitch'

const GLITCH_COLORS = ['#5e4491', '#a476ff', '#241a38']

export default function Contact() {
  const root = useRef(null)
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  useGSAP(
    () => {
      gsap.from('.contact-field', {
        y: 30,
        autoAlpha: 0,
        stagger: 0.1,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.contact-form', start: 'top 80%' },
      })
    },
    { scope: root },
  )

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  // No backend: opens the visitor's mail client. Swap for Formspree/EmailJS/your API.
  const submit = (e) => {
    e.preventDefault()
    const subject = encodeURIComponent(`Project enquiry from ${form.name}`)
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`)
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`
  }

  const input =
    'w-full rounded-xl border border-line/10 bg-page/60 px-4 py-3 text-sm text-fg placeholder:text-fg/30 outline-none transition focus:border-accent focus:shadow-[0_0_0_3px_color-mix(in_srgb,var(--accent)_20%,transparent)]'

  return (
    <section ref={root} id="contact" className="relative mx-auto max-w-6xl px-4 py-28 sm:px-6">
      <SectionHeading eyebrow="Get in touch" title="Let's build something together" />

      <div className="glass-card grid overflow-hidden md:grid-cols-2">
        <div className="relative hidden min-h-80 md:block">
          <LetterGlitch colors={GLITCH_COLORS} speed={33} />
          <div className="absolute inset-x-0 bottom-0 flex flex-col justify-end bg-gradient-to-t from-glitch via-glitch/90 to-transparent p-8 pt-24">
            <p className="font-mono text-xs text-[#a476ff]">// based in Karachi, Pakistan</p>
            <p className="mt-2 text-2xl font-medium text-white">Have a project in mind?</p>
            <a href={`mailto:${profile.email}`} className="mt-2 text-sm text-white/70 underline-offset-4 hover:text-[#3dd6f5] hover:underline">
              {profile.email}
            </a>
          </div>
        </div>

        <form onSubmit={submit} className="contact-form space-y-4 p-6 sm:p-10">
          <div className="contact-field">
            <label className="mb-1.5 block text-xs text-fg/60" htmlFor="name">
              Name
            </label>
            <input id="name" required value={form.name} onChange={update('name')} className={input} placeholder="Jane Doe" />
          </div>
          <div className="contact-field">
            <label className="mb-1.5 block text-xs text-fg/60" htmlFor="email">
              Email
            </label>
            <input id="email" type="email" required value={form.email} onChange={update('email')} className={input} placeholder="jane@company.com" />
          </div>
          <div className="contact-field">
            <label className="mb-1.5 block text-xs text-fg/60" htmlFor="message">
              Message
            </label>
            <textarea id="message" required rows={5} value={form.message} onChange={update('message')} className={input} placeholder="Tell me about your project…" />
          </div>
          {/* animate the wrapper: the button's own CSS transition would fight the GSAP tween */}
          <div className="contact-field">
            <button
              type="submit"
              className="w-full rounded-full bg-gradient-to-r from-[#3b5bff] to-accent py-3 text-sm font-medium text-white shadow-[0_10px_30px_-10px_rgba(61,214,245,0.8)] transition hover:brightness-110"
            >
              Send message
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}
