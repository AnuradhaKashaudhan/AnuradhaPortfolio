import { useEffect, useState, useRef } from 'react'

/**
 * Cycles through an array of strings with a typing/deleting effect.
 */
export function useTypingEffect(phrases: string[], typeSpeed = 80, deleteSpeed = 40, pauseMs = 1800) {
  const [displayed, setDisplayed] = useState('')
  const [phraseIdx, setPhraseIdx] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const prefersReduced = useRef(
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )

  useEffect(() => {
    if (prefersReduced.current) {
      setDisplayed(phrases[0])
      return
    }

    const current = phrases[phraseIdx % phrases.length]

    if (!isDeleting && displayed === current) {
      const t = setTimeout(() => setIsDeleting(true), pauseMs)
      return () => clearTimeout(t)
    }

    if (isDeleting && displayed === '') {
      setIsDeleting(false)
      setPhraseIdx((i) => (i + 1) % phrases.length)
      return
    }

    const speed = isDeleting ? deleteSpeed : typeSpeed
    const next = isDeleting ? displayed.slice(0, -1) : current.slice(0, displayed.length + 1)
    const t = setTimeout(() => setDisplayed(next), speed)
    return () => clearTimeout(t)
  }, [displayed, isDeleting, phraseIdx, phrases, typeSpeed, deleteSpeed, pauseMs])

  return displayed
}
