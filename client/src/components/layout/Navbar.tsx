import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Sun, Moon, Code2, ArrowUpRight } from 'lucide-react'
import { useTheme } from '@/hooks/useTheme'
import { useActiveSection } from '@/hooks/useActiveSection'
import { useScrollProgress } from '@/hooks/useScrollProgress'
import { cn } from '@/utils/cn'

const NAV_LINKS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'certificates', label: 'Certificates' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
] as const

export function Navbar() {
  const { toggle, isDark } = useTheme()
  const activeSection = useActiveSection()
  const scrollProgress = useScrollProgress()
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const isHome = location.pathname === '/'

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  // Close drawer on route change
  useEffect(() => setDrawerOpen(false), [location.pathname])

  const handleNavClick = (id: string) => {
    setDrawerOpen(false)
    if (!isHome) {
      window.location.href = `/#${id}`
      return
    }
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      {/* Scroll Progress Bar */}
      <div
        className="scroll-progress-bar"
        style={{ width: `${scrollProgress}%` }}
        role="progressbar"
        aria-valuenow={Math.round(scrollProgress)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Page scroll progress"
      />

      <header
        className={cn(
          'fixed top-3 inset-x-0 z-50 transition-all duration-300 px-3 sm:top-4',
        )}
      >
        <nav
          className={cn('mx-auto flex h-14 max-w-5xl items-center justify-between rounded-2xl px-3 sm:px-4', scrolled ? 'glass' : 'border border-white/10 bg-black/20 backdrop-blur-xl')}
          aria-label="Main navigation"
        >
          {/* Logo */}
          <Link
            to="/"
            className="group flex items-center gap-2.5"
            aria-label="Anuradha Kashaudhan – Go to home"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center shadow-lg shadow-violet-500/30 group-hover:shadow-violet-500/50 transition-shadow">
              <Code2 size={16} className="text-white" />
            </div>
            <span
              className="font-bold text-sm tracking-tight hidden sm:block"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Anuradha<span className="gradient-text">.</span>
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <ul           className="hidden items-center gap-1 md:flex" role="list">
            {NAV_LINKS.map(({ id, label }) => (
              <li key={id}>
                <button
                  onClick={() => handleNavClick(id)}
                  className={cn(
                    'relative rounded-xl px-3 py-2 text-sm font-medium transition-all duration-200 cursor-pointer',
                    'hover:bg-white/5',
                    isHome && activeSection === id
                      ? 'text-[var(--color-text-primary)] bg-white/5'
                      : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
                  )}
                  aria-current={isHome && activeSection === id ? 'location' : undefined}
                >
                  {label}
                  {isHome && activeSection === id && (
                    <motion.div
                      layoutId="active-nav-dot"
                      className="absolute -bottom-px left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-blue-500"
                      aria-hidden="true"
                    />
                  )}
                </button>
              </li>
            ))}
          </ul>

          {/* Right controls */}
          <div className="flex items-center gap-2">
            <button type="button" onClick={() => handleNavClick('contact')} className="hidden items-center gap-1 rounded-xl bg-white px-3 py-2 text-xs font-semibold text-slate-950 transition hover:bg-blue-100 sm:flex">
              Hire me <ArrowUpRight size={13} />
            </button>
            {/* Theme toggle */}
            <button
              onClick={toggle}
              className="p-2.5 rounded-lg hover:bg-white/8 transition-colors text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              id="theme-toggle"
            >
              <AnimatePresence mode="wait" initial={false}>
                {isDark ? (
                  <motion.span
                    key="sun"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Sun size={18} />
                  </motion.span>
                ) : (
                  <motion.span
                    key="moon"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Moon size={18} />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            {/* Mobile hamburger */}
            <button
              onClick={() => setDrawerOpen((o) => !o)}
              className="md:hidden p-2.5 rounded-lg hover:bg-white/8 transition-colors text-[var(--color-text-secondary)]"
              aria-label={drawerOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={drawerOpen}
              aria-controls="mobile-drawer"
              id="mobile-menu-toggle"
            >
              {drawerOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>

        {/* Mobile Drawer */}
        <AnimatePresence>
          {drawerOpen && (
            <motion.div
              id="mobile-drawer"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="md:hidden overflow-hidden border-t border-white/6"
            >
              <nav
                className="glass px-4 py-4 flex flex-col gap-1"
                aria-label="Mobile navigation"
              >
                {NAV_LINKS.map(({ id, label }) => (
                  <button
                    key={id}
                    onClick={() => handleNavClick(id)}
                    className={cn(
                      'flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-all cursor-pointer text-left w-full',
                      isHome && activeSection === id
                        ? 'bg-blue-500/15 text-blue-400 border border-blue-500/25'
                        : 'text-[var(--color-text-secondary)] hover:bg-white/5 hover:text-[var(--color-text-primary)] border border-transparent'
                    )}
                    aria-current={isHome && activeSection === id ? 'location' : undefined}
                  >
                    {label}
                  </button>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  )
}
