import { useSyncExternalStore } from 'react'

// Theme = the OS preference, unless the visitor picked the other one with the
// switcher. Picking the theme the OS already uses clears the override, so the
// site goes back to following the system.
const KEY = 'theme'
const media = window.matchMedia('(prefers-color-scheme: dark)')
const root = document.documentElement

const systemTheme = () => (media.matches ? 'dark' : 'light')

function stored() {
  try {
    return localStorage.getItem(KEY)
  } catch {
    return null
  }
}

function apply(theme) {
  root.dataset.theme = theme
  root.style.colorScheme = theme
}

export function initTheme() {
  apply(stored() || systemTheme())
  media.addEventListener('change', () => {
    if (!stored()) apply(systemTheme())
  })
}

export function toggleTheme() {
  const next = root.dataset.theme === 'dark' ? 'light' : 'dark'
  try {
    if (next === systemTheme()) localStorage.removeItem(KEY)
    else localStorage.setItem(KEY, next)
  } catch {
    // storage blocked: the switch still works for this visit
  }
  apply(next)
}

function subscribe(onChange) {
  const mo = new MutationObserver(onChange)
  mo.observe(root, { attributes: true, attributeFilter: ['data-theme'] })
  return () => mo.disconnect()
}

export function useTheme() {
  return useSyncExternalStore(subscribe, () => root.dataset.theme || 'dark')
}
