// Rough device tier check so the WebGL scenes can scale down on machines
// without a dedicated graphics card (integrated / software rendering).
function detectLowPower() {
  if (typeof window === 'undefined') return false
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return true
  if ((navigator.hardwareConcurrency || 8) <= 4) return true
  if ((navigator.deviceMemory || 8) <= 4) return true
  try {
    const gl = document.createElement('canvas').getContext('webgl')
    if (!gl) return true
    const info = gl.getExtension('WEBGL_debug_renderer_info')
    const renderer = info ? gl.getParameter(info.UNMASKED_RENDERER_WEBGL) : ''
    gl.getExtension('WEBGL_lose_context')?.loseContext()
    return /swiftshader|llvmpipe|software|basic render|intel|mali|adreno|powervr/i.test(renderer)
  } catch {
    return true
  }
}

export const LOW_POWER = detectLowPower()
