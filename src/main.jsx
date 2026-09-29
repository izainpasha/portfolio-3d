import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import App from './App.jsx'
import { initTheme } from './utils/theme'
import 'lenis/dist/lenis.css'
import './index.css'

gsap.registerPlugin(ScrollTrigger, useGSAP)
initTheme()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
