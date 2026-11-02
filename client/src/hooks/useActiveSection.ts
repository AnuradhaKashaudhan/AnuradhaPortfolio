import { useEffect, useState } from 'react'

const NAV_SECTIONS = ['home', 'about', 'experience', 'projects', 'certificates', 'skills', 'contact']

export function useActiveSection() {
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const observers: IntersectionObserver[] = []

    NAV_SECTIONS.forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id)
          }
        },
        { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
      )
      observer.observe(el)
      observers.push(observer)
    })

    return () => observers.forEach((o) => o.disconnect())
  }, [])

  return activeSection
}
