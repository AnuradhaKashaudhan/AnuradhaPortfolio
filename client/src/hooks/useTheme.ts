import { useEffect, useState } from 'react'

type Theme = 'dark' | 'light'

function getInitialTheme(): Theme {
  // 1. Check localStorage
  const stored = localStorage.getItem('theme') as Theme | null
  if (stored === 'dark' || stored === 'light') return stored

  // 2. Respect prefers-color-scheme
  if (window.matchMedia('(prefers-color-scheme: light)').matches) return 'light'

  return 'dark'
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme)

  useEffect(() => {
    const root = document.documentElement
    if (theme === 'light') {
      root.classList.add('light')
    } else {
      root.classList.remove('light')
    }
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggle = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))

  return { theme, toggle, isDark: theme === 'dark' }
}
