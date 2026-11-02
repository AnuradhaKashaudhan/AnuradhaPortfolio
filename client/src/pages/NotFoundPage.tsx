import { Link } from 'react-router-dom'
import { Home, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'

export default function NotFoundPage() {
  return (
    <>
      <Navbar />
      <main
        id="main-content"
        className="min-h-screen flex items-center justify-center relative overflow-hidden"
      >
        {/* Glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-10 blur-3xl pointer-events-none"
          style={{ background: 'radial-gradient(circle, #8b5cf6, transparent 70%)' }}
          aria-hidden="true"
        />

        <div className="relative z-10 flex flex-col items-center gap-6 text-center px-4">
          <div
            className="text-8xl md:text-9xl font-extrabold gradient-text"
            style={{ fontFamily: 'var(--font-heading)', lineHeight: 1 }}
            aria-label="404"
          >
            404
          </div>

          <div className="flex flex-col gap-2">
            <h1
              className="text-2xl md:text-3xl font-bold text-[var(--color-text-primary)]"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Page Not Found
            </h1>
            <p className="text-[var(--color-text-secondary)] max-w-md">
              This page doesn't exist or may have been moved. Let's get you back to safety.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 justify-center">
            <Link to="/">
              <Button variant="gradient" size="lg" leftIcon={<Home size={16} />}>
                Go Home
              </Button>
            </Link>
            <button onClick={() => window.history.back()}>
              <Button variant="outline" size="lg" leftIcon={<ArrowLeft size={16} />}>
                Go Back
              </Button>
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
