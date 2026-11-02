import { useEffect, useState, useRef } from 'react'

/**
 * Counts from 0 up to `target` when the element enters the viewport.
 */
export function useCountUp(target: number, duration = 1500, startOnView = true) {
  const [count, setCount] = useState(0)
  const [started, setStarted] = useState(false)
  const ref = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!startOnView) {
      setStarted(true)
      return
    }
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true)
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [startOnView])

  useEffect(() => {
    if (!started) return
    let startTime: number
    let raf: number

    const step = (ts: number) => {
      if (!startTime) startTime = ts
      const progress = Math.min((ts - startTime) / duration, 1)
      setCount(Math.floor(progress * target))
      if (progress < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [started, target, duration])

  return { count, ref }
}
