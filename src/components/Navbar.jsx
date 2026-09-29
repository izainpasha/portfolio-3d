import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { navLinks, profile } from '../data/content'
import { scrollToId } from '../utils/smoothScroll'
import { toggleTheme, useTheme } from '../utils/theme'

function ThemeToggle() {
  const theme = useTheme()
  const dark = theme === 'dark'
  return (
    <button
      onClick={toggleTheme}
      aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="relative grid size-9 place-items-center overflow-hidden rounded-full border border-line/15 text-fg transition hover:border-accent hover:text-accent"
    >
      {/* sun */}
      <svg
        viewBox="0 0 24 24"
        className={`absolute size-[18px] transition-all duration-500 ${dark ? 'rotate-90 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100'}`}
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
      </svg>
      {/* moon */}
      <svg
        viewBox="0 0 24 24"
        className={`absolute size-[18px] transition-all duration-500 ${dark ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-0 opacity-0'}`}
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
      </svg>
    </button>
  )
}

export default function Navbar() {
  const nav = useRef(null)
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('')

  useGSAP(() => {
    gsap.from(nav.current, { y: -80, autoAlpha: 0, duration: 1.2, ease: 'expo.out', delay: 0.8 })
  })

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })

    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' },
    )
    navLinks.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) io.observe(el)
    })
    return () => {
      window.removeEventListener('scroll', onScroll)
      io.disconnect()
    }
  }, [])

  const go = (id) => (e) => {
    e.preventDefault()
    setOpen(false)
    scrollToId(id)
  }

  return (
    <header ref={nav} className="fixed inset-x-0 top-3 z-50 flex justify-center px-4">
      {/* floating pill that tightens up once you scroll */}
      <nav
        className={`flex w-full items-center justify-between rounded-full border transition-all duration-500 ${
          scrolled
            ? 'max-w-3xl border-line/10 bg-surface/70 px-4 py-2 shadow-[0_10px_40px_-10px_var(--card-shadow)] backdrop-blur-xl'
            : 'max-w-6xl border-transparent px-2 py-3'
        }`}
      >
        <a href="#home" onClick={go('home')} className="flex items-center gap-2">
          <span className="grid size-9 place-items-center rounded-xl bg-gradient-to-br from-[#3b5bff] to-accent-2 text-sm font-bold text-white">
            {profile.initials}
          </span>
          <span className="text-xs font-semibold uppercase leading-tight tracking-wide text-fg">
            {profile.logoLines.map((p) => (
              <span key={p} className="block">
                {p}
              </span>
            ))}
          </span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {navLinks.map(({ id, label }) => (
            <li key={id}>
              <a
                href={`#${id}`}
                onClick={go(id)}
                className={`relative rounded-full px-3 py-1.5 text-xs font-medium transition ${
                  active === id ? 'text-fg' : 'text-fg/60 hover:text-fg'
                }`}
              >
                {active === id && <span className="absolute left-1/2 top-full size-1 -translate-x-1/2 rounded-full bg-accent" />}
                {label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <a
            href="#contact"
            onClick={go('contact')}
            className="hidden rounded-full bg-fg px-4 py-2 text-xs font-medium text-page transition hover:bg-accent sm:block"
          >
            Contact Me
          </a>
          <button
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
            className="grid size-9 place-items-center rounded-full border border-line/15 md:hidden"
          >
            <span className="relative block h-3 w-4">
              <span className={`absolute left-0 h-0.5 w-4 bg-fg transition ${open ? 'top-1.5 rotate-45' : 'top-0'}`} />
              <span className={`absolute left-0 top-1.5 h-0.5 w-4 bg-fg transition ${open ? 'opacity-0' : ''}`} />
              <span className={`absolute left-0 h-0.5 w-4 bg-fg transition ${open ? 'top-1.5 -rotate-45' : 'top-3'}`} />
            </span>
          </button>
        </div>
      </nav>

      {open && (
        <div className="absolute inset-x-4 top-16 rounded-2xl border border-line/10 bg-surface/95 p-4 backdrop-blur-xl md:hidden">
          {[...navLinks, { id: 'contact', label: 'Contact' }].map(({ id, label }) => (
            <a key={id} href={`#${id}`} onClick={go(id)} className="block rounded-lg px-3 py-2.5 text-sm text-fg/80 hover:bg-line/5">
              {label}
            </a>
          ))}
        </div>
      )}
    </header>
  )
}
