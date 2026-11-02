import { useEffect } from 'react'

export function GradientCursor() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const move = (event: PointerEvent) => document.documentElement.style.setProperty('--cursor-x', `${event.clientX}px`)
    const moveY = (event: PointerEvent) => document.documentElement.style.setProperty('--cursor-y', `${event.clientY}px`)
    window.addEventListener('pointermove', move)
    window.addEventListener('pointermove', moveY)
    return () => { window.removeEventListener('pointermove', move); window.removeEventListener('pointermove', moveY) }
  }, [])
  return null
}
